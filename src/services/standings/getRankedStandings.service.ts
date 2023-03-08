import { Document } from "mongodb";
import { mongoService } from "../..";
import { IGetRankedStandingsQuery } from "../../models/standings";
import getCurrentYear from "../../utils/getCurrentYear";
import getCurrentWeek from "../../utils/getCurrentWeek";
import convertOrder from "../../utils/convertSort";

const getRankedStandingsService = async (
  leagueId: number,
  query: IGetRankedStandingsQuery
) => {
  const db = mongoService.db(leagueId.toString()).collection("standings");

  const currYear = await getCurrentYear(leagueId);
  const currWeek = await getCurrentWeek(leagueId, currYear);

  const pipeline: Document[] = [];

  pipeline.push({
    $match: {
      seasonIndex: query.seasonIndex,
      weekIndex: currWeek,
    },
  });

  pipeline.push({
    $project: {
      defTotalYdsRank: "$defTotalYdsRank",
      offTotalYdsRank: "$offTotalYdsRank",
      defPassYdsRank: "$defPassYdsRank",
      defRushYdsRank: "$defRushYdsRank",
      offPassYdsRank: "$offPassYdsRank",
      offRushYdsRank: "$offRushYdsRank",
      prevRank: "$prevRank",
      ptsAgainstRank: "$ptsAgainstRank",
      seed: "$seed",
      tODiff: "$tODiff",
      teamOvr: "$teamOvr",
      winPct: "$winPct",
      rank: "$rank",
      teamId: "$teamId",
      week: "$weekIndex",
      wins: "$totalWins",
      losses: "$totalLosses",
    },
  });

  if (query.sort_by) {
    const [name, order] = query.sort_by.split(".");
    pipeline.push({
      $sort: {
        [name]: convertOrder(order),
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

  return { success: true, body: result };
};

export default getRankedStandingsService;
