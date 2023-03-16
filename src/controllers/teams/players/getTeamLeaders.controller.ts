import { Request, Response } from "express";
import getTeamLeadersService from "../../../services/teams/players/getTeamLeaders.service";
import { DataType, IGetTeamLeaders } from "../../../models/teams";

const getTeamLeadersController = async (req: Request, res: Response) => {
  try {
    const { leagueId, teamId, dataType } = req.params;

    const player = await getTeamLeadersService(
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

export default getTeamLeadersController;
