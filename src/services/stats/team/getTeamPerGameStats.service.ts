import { Document } from "mongodb";
import { mongoService, dbName } from "../../..";
import { DataType, IGetTeamLeaders } from "../../../models/teams";
import dataTypeGroup from "../../../utils/dataTypeGroup";
import { AppError, HttpCode } from "../../../expections/AppError";
import convertOrder from "../../../utils/convertSort";
import convertDataType from "../../../utils/convertDataType";

const getTeamPerGameStatsService = async (
  leagueId: number,
  teamId: number,
  dataType: DataType,
  query: IGetTeamLeaders
) => {
  const db = mongoService.db(dbName).collection(convertDataType(dataType));

  const pipeline: Document[] = [];
  const dataTypeGroupData = dataTypeGroup(dataType);

  pipeline.push({
    $match: {
      teamId,
      dataType,
      seasonIndex: query.seasonIndex || 0,
      weekType: query.season_type || "reg",
      leagueId,
    },
  });

  if (dataTypeGroupData) {
    pipeline.push({
      $group: {
        ...dataTypeGroupData,
        _id: {
          teamId: "$teamId",
          dataType: "$dataType",
          seasonIndex: "$seasonIndex",
          weekIndex: "$weekIndex",
          weekType: "$seasonType",
        },
        weekIndex: { $first: "$weekIndex" },
      },
    });
    pipeline.push({
      $sort: {
        weekIndex: 1,
      },
    });
    pipeline.push({
      $lookup: {
        from: "schedules",
        localField: "scheduleId",
        foreignField: "scheduleId",
        as: "game",
      },
    });
    pipeline.push({
      $unwind: {
        path: "$game",
      },
    });
    pipeline.push({
      $addFields: {
        isHomeTeam: {
          $cond: {
            if: {
              $eq: ["$game.homeTeamId", "$_id.teamId"],
            },
            then: true,
            else: false,
          },
        },
        didHomeWin: {
          $cond: {
            if: {
              $gte: ["$game.homeScore", "$game.awayScore"],
            },
            then: true,
            else: false,
          },
        },
      },
    });
  } else {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: "dataType is an invalid type.",
    });
  }

  if (query.sort_by) {
    const [name, order] = query.sort_by.split(".");
    pipeline.push({
      $sort: {
        [name]: convertOrder(order),
      },
    });
  }

  const result = await db.aggregate(pipeline).toArray();

  return { success: true, body: result };
};

export default getTeamPerGameStatsService;
