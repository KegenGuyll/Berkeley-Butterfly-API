import { Request, Response } from "express";
import getTeamStatsService from "../../../services/stats/team/getTeamStats.service";

const getTeamStatsController = async (req: Request, res: Response) => {
  try {
    const { leagueId, teamId } = req.params;

    const teamStats = await getTeamStatsService(
      Number(leagueId),
      Number(teamId),
      req.query as any
    );

    res.send(teamStats);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getTeamStatsController;
