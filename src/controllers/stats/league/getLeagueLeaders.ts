import { Request, Response } from "express";
import { DataType, IGetTeamLeaders } from "../../../models/teams";
import getLeagueLeadersService from "../../../services/stats/league/getLeagueLeaders";

const getLeagueLeadersController = async (req: Request, res: Response) => {
  try {
    const { leagueId, dataType } = req.params;

    const player = await getLeagueLeadersService(
      Number(leagueId),
      dataType as DataType,
      req.query as unknown as IGetTeamLeaders
    );

    res.send(player);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getLeagueLeadersController;
