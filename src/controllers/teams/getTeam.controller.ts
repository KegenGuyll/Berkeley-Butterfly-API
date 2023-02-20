import { Request, Response } from "express";
import getTeamService from "../../services/teams/getTeam.service";

const getTeamController = async (req: Request, res: Response) => {
  try {
    const { leagueId, teamId } = req.params;

    const player = await getTeamService(
      Number(leagueId),
      Number(teamId),
      req.query
    );

    res.send(player);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getTeamController;
