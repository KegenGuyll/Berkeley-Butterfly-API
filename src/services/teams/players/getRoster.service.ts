import { Document } from "mongodb";
import { mongoService } from "../../..";

const getTeamRosterService = async (leagueId: number, teamId: number) => {
  const db = mongoService.db(leagueId.toString()).collection("players");

  const pipeline: Document[] = [];

  pipeline.push({
    $match: {
      teamId,
    },
  });

  const result = await db.aggregate(pipeline).toArray();

  return { success: true, body: result };
};

export default getTeamRosterService;
