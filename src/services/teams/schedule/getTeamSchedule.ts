import { Document } from "mongodb";
import { mongoService } from "../../..";
import { IGetTeamSchedule } from "../../../models/teams";

const getTeamScheduleService = async (
  leagueId: number,
  teamId: number,
  query: IGetTeamSchedule
) => {
  const db = mongoService.db(leagueId.toString()).collection("schedules");

  const pipeline: Document[] = [];

  pipeline.push({
    $match: {
      $or: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
      weekType: query.season_type || "reg",
      weekIndex: { $lt: 20 },
      seasonIndex: query.seasonIndex,
    },
  });

  if (query.include_teams) {
    pipeline.push({
      $lookup: {
        from: "teams",
        localField: "homeTeamId",
        foreignField: "teamId",
        as: "homeTeam",
      },
    });
    pipeline.push({
      $lookup: {
        from: "teams",
        localField: "awayTeamId",
        foreignField: "teamId",
        as: "awayTeam",
      },
    });
    pipeline.push({
      $unwind: {
        path: "$homeTeam",
      },
    });
    pipeline.push({
      $unwind: {
        path: "$awayTeam",
      },
    });
  }

  if (query.include_team_stats) {
    pipeline.push({
      $lookup: {
        from: "teamstats",
        localField: "scheduleId",
        foreignField: "scheduleId",
        as: "teamstats",
      },
    });
  }

  const result = await db.aggregate(pipeline).toArray();

  return { success: true, body: result };
};

export default getTeamScheduleService;
