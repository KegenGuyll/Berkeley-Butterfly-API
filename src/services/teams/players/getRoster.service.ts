import { prisma } from "../../..";

const getTeamRosterService = async (leagueId: number, teamId: number) => {
  const result = await prisma.players.findMany({
    where: {
      leagueId: {
        equals: leagueId,
      },
      teamId: {
        equals: teamId,
      },
    },
  });

  return { success: true, body: result };
};

export default getTeamRosterService;
