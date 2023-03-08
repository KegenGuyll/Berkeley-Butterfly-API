import { mongoService } from "../..";

const getTeamsService = async (leagueId: number) => {
  const db = mongoService.db(leagueId.toString()).collection("teams");

  const result = await db.find({}).toArray();

  return { success: true, body: result };
};

export default getTeamsService;
