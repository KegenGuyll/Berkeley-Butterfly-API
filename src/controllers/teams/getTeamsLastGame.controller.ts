import { Request, Response } from "express";
import getTeamsLastGameService from "../../services/teams/getTeamsLastGame.service";

const getTeamsLastGameController = async (req: Request, res: Response) => {
  try {
    const { leagueId, teamId } = req.params;

    const player = await getTeamsLastGameService(
      Number(leagueId),
      Number(teamId),
      req.query
    );

    res.send(player);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getTeamsLastGameController;
