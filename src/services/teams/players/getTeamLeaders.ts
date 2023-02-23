import { Document } from "mongodb";
import { mongoService } from "../../..";
import { DataType, IGetTeamLeaders } from "../../../models/teams";
import dataTypeGroup from "../../../utils/dataTypeGroup";
import { AppError, HttpCode } from "../../../expections/AppError";
import convertOrder from "../../../utils/convertSort";

const getTeamLeadersService = async (
  leagueId: number,
  teamId: number,
  dataType: DataType,
  query: IGetTeamLeaders
) => {
  const db = mongoService.db(leagueId.toString()).collection("playerstats");

  const pipeline: Document[] = [];
  const dataTypeGroupData = dataTypeGroup(dataType);

  pipeline.push({
    $match: {
      teamId,
      dataType,
      seasonIndex: query.seasonIndex,
    },
  });

  if (dataTypeGroupData) {
    pipeline.push({
      $group: {
        ...dataTypeGroupData,
        _id: {
          rosterId: "$rosterId",
          teamId: "$teamId",
          seasonIndex: "$seasonIndex",
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

  pipeline.push({
    $lookup: {
      from: "players",
      localField: "_id.rosterId",
      foreignField: "rosterId",
      as: "playerInfo",
    },
  });

  pipeline.push({
    $unwind: {
      path: "$playerInfo",
    },
  });

  if (query.include_teams) {
    pipeline.push({
      $lookup: {
        from: "teams",
        localField: "_id.teamId",
        foreignField: "teamId",
        as: "team",
      },
    });
    pipeline.push({
      $unwind: {
        path: "$team",
      },
    });
  }

  const result = await db.aggregate(pipeline).toArray();

  return { success: true, body: result };
};

export default getTeamLeadersService;
