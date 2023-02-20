import { Document } from "mongodb";
import { mongoService } from "../..";
import { IGetPlayerQuery } from "../../models/players";

const getPlayerService = async (
  leagueId: number,
  rosterId: number,
  query: IGetPlayerQuery
) => {
  const db = mongoService.db(leagueId.toString()).collection("players");

  const pipeline: Document[] = [];

  pipeline.push({
    $match: {
      rosterId,
    },
  });

  if (query.include_stats) {
    pipeline.push({
      $lookup: {
        from: "playerstats",
        localField: "rosterId",
        foreignField: "rosterId",
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
    pipeline.push({
      $unwind: {
        path: "$team",
      },
    });
  }

  const result = await db.aggregate(pipeline).toArray();

  return { success: true, body: result[0] };
};

export default getPlayerService;
