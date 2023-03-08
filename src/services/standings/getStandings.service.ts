import { Document } from "mongodb";
import { mongoService } from "../..";
import { IGetStandingsQuery } from "../../models/standings";

const getStandingsService = async (
  leagueId: number,
  teamId: number,
  query: IGetStandingsQuery
) => {
  const db = mongoService.db(leagueId.toString()).collection("standings");

  const pipeline: Document[] = [];

  pipeline.push({
    $match: {
      teamId,
      seasonIndex: query.seasonIndex,
    },
  });

  if (query.include_stats) {
    pipeline.push({
      $lookup: {
        from: "teamstats",
        localField: "teamId",
        foreignField: "teamId",
        as: "stats",
      },
    });
  }

  if (query.include_team) {
    pipeline.push({
      $lookup: {
        from: "teams",
        localField: "teamId",
        foreignField: "teamId",
        as: "team",
      },
    });
  }

  pipeline.push({
    $sort: {
      seasonIndex: -1,
      weekIndex: 1,
      calendarYear: -1,
    },
  });

  const result = await db.aggregate(pipeline).toArray();

  return { success: true, body: result };
};

export default getStandingsService;
