import { Request, Response } from "express";
import getLeagueStandingsService from "../../services/standings/getLeagueStandings.service";

const getLeagueStandingsController = async (req: Request, res: Response) => {
  try {
    const { leagueId } = req.params;

    const standings = await getLeagueStandingsService(
      Number(leagueId),
      req.query as any
    );

    res.send(standings);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getLeagueStandingsController;
