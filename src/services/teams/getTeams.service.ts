import { prisma } from "../..";

const getTeamsService = async (leagueId: number) => {
  const result = await prisma.teams.findMany({
    where: {
      leagueId,
    },
  });

  return { success: true, body: result };
};

export default getTeamsService;
