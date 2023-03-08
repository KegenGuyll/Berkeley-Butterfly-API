import { Request, Response } from "express";
import getRankedStandingsService from "../../services/standings/getRankedStandings.service";

const getRankedStandingsController = async (req: Request, res: Response) => {
  try {
    const { leagueId } = req.params;

    const standings = await getRankedStandingsService(
      Number(leagueId),
      req.query as any
    );

    res.send(standings);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getRankedStandingsController;
