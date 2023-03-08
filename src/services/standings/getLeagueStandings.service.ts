import { Document } from "mongodb";
import { mongoService } from "../..";
import { IGetLeagueStandingsQuery } from "../../models/standings";

const getLeagueStandingsService = async (
  leagueId: number,
  query: IGetLeagueStandingsQuery
) => {
  const db = mongoService.db(leagueId.toString()).collection("standings");

  const pipeline: Document[] = [];

  if (query.conferenceId) {
    pipeline.push({
      $match: {
        conferenceId: query.conferenceId,
        seasonIndex: query.seasonIndex,
      },
    });
  } else if (query.divisionId) {
    pipeline.push({
      $match: {
        divisionId: query.divisionId,
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
    pipeline.push({
      $unwind: {
        path: "$team",
      },
    });
  }

  pipeline.push({
    $sort: {
      seed: 1,
    },
  });

  const result = await db.aggregate(pipeline).toArray();

  return { success: true, body: result };
};

export default getLeagueStandingsService;
