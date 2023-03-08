import { Request, Response } from "express";
import getStandingsService from "../../services/standings/getStandings.service";

const getStandingsController = async (req: Request, res: Response) => {
  try {
    const { leagueId, teamId } = req.params;

    const standings = await getStandingsService(
      Number(leagueId),
      Number(teamId),
      req.query as any
    );

    res.send(standings);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getStandingsController;
