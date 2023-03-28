import { Document } from "mongodb";
import { mongoService, dbName } from "../../..";
import { IGetTeamStatsQuery } from "../../../models/teams";

const getTeamStatsService = async (
  leagueId: number,
  teamId: number,
  query: IGetTeamStatsQuery
) => {
  const db = mongoService.db(dbName).collection("teamstats");

  const pipeline: Document[] = [];

  pipeline.push({
    $match: {
      teamId,
      weekType: query.season_type,
      seasonIndex: query.seasonIndex,
      leagueId,
    },
  });

  pipeline.push({
    $sort: {
      weekIndex: 1,
    },
  });

  const result = await db.aggregate(pipeline).toArray();

  return { success: true, body: result };
};

export default getTeamStatsService;
