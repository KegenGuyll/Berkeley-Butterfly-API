import { Request, Response } from "express";
import { DataType, IGetTeamLeaders } from "../../../models/teams";
import getTeamPerGameStatsService from "../../../services/stats/team/getTeamPerGameStats.service";

const getTeamPerGameStatsController = async (req: Request, res: Response) => {
  try {
    const { leagueId, teamId, dataType } = req.params;

    const player = await getTeamPerGameStatsService(
      Number(leagueId),
      Number(teamId),
      dataType as DataType,
      req.query as unknown as IGetTeamLeaders
    );

    res.send(player);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getTeamPerGameStatsController;
