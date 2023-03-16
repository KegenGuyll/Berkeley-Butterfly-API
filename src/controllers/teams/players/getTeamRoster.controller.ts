import { Request, Response } from "express";
import getTeamRosterService from "../../../services/teams/players/getRoster.service";

const getTeamRosterController = async (req: Request, res: Response) => {
  try {
    const { leagueId, teamId } = req.params;

    const player = await getTeamRosterService(Number(leagueId), Number(teamId));

    res.send(player);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getTeamRosterController;
