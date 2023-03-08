import { Request, Response } from "express";
import getTeamsService from "../../services/teams/getTeams.service";

const getTeamsController = async (req: Request, res: Response) => {
  try {
    const { leagueId } = req.params;

    const team = await getTeamsService(Number(leagueId));

    res.send(team);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getTeamsController;
