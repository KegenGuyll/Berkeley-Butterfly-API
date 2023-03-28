import { Document } from "mongodb";
import { dbName, mongoService } from "../..";
import { IGetTeamQuery } from "../../models/teams";

const getTeamService = async (
  leagueId: number,
  teamId: number,
  query: IGetTeamQuery
) => {
  const db = mongoService.db(dbName).collection("teams");

  const pipeline: Document[] = [];

  pipeline.push({
    $match: {
      teamId,
      leagueId,
    },
  });

  if (query.include_players) {
    pipeline.push({
      $lookup: {
        from: "players",
        localField: "teamId",
        pipeline: [
          {
            $match: { leagueId },
          },
        ],
        foreignField: "teamId",
        as: "players",
      },
    });
  }

  if (query.include_standings) {
    pipeline.push({
      $lookup: {
        from: "standings",
        pipeline: [
          {
            $match: { seasonIndex: query.seasonIndex, leagueId },
          },
        ],
        localField: "divName",
        foreignField: "divisionName",
        as: "confStandings",
      },
    });
  }

  if (query.include_stats) {
    pipeline.push({
      $lookup: {
        from: "teamstats",
        localField: "teamId",
        pipeline: [
          {
            $match: { seasonIndex: query.seasonIndex, leagueId },
          },
        ],
        foreignField: "teamId",
        as: "stats",
      },
    });
  }

  const result = await db.aggregate(pipeline).toArray();

  return { success: true, body: result[0] };
};

export default getTeamService;
