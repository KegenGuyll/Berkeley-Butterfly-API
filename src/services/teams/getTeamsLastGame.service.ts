import { Document } from "mongodb";
import { mongoService } from "../..";
import { IGetLastGameQuery } from "../../models/teams";

const getTeamsLastGameService = async (
  leagueId: number,
  teamId: number,
  query: IGetLastGameQuery
) => {
  const db = mongoService.db(leagueId.toString()).collection("schedules");

  const pipeline: Document[] = [];

  pipeline.push({
    $match: {
      $or: [
        {
          homeTeamId: teamId,
        },
        {
          awayTeamId: teamId,
        },
      ],
    },
  });

  pipeline.push({
    $sort: {
      weekIndex: -1,
    },
  });

  pipeline.push({
    $limit: 1,
  });

  if (query.include_player_stats) {
    pipeline.push({
      $lookup: {
        from: "playerstats",
        localField: "scheduleId",
        foreignField: "scheduleId",
        as: "playerstats",
      },
    });
  }

  if (query.include_teams) {
    pipeline.push(
      {
        $lookup: {
          from: "teams",
          localField: "homeTeamId",
          foreignField: "teamId",
          as: "homeTeam",
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "awayTeamId",
          foreignField: "teamId",
          as: "awayTeam",
        },
      }
    );
  }

  const result = await db.aggregate(pipeline).toArray();

  return { success: true, body: result[0] };
};

export default getTeamsLastGameService;
