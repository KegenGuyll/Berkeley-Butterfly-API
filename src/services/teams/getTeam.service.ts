import { prisma } from "../..";
import { IGetTeamQuery } from "../../models/teams";

const getTeamService = async (
  leagueId: number,
  teamId: number,
  query: IGetTeamQuery
) => {
  const result = await prisma.teams.findUnique({
    where: {
      leagueId_teamId: {
        leagueId,
        teamId,
      },
    },
    include: {
      players: !!query.include_players,
      standings: !!query.include_standings ?? {
        where: {
          seasonIndex: query.seasonIndex,
        },
      },
      teamStats: !!query.include_stats ?? {
        where: {
          seasonIndex: query.seasonIndex,
        },
      },
    },
  });

  return { success: true, body: result };
};

export default getTeamService;
