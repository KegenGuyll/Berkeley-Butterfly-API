import { Request, Response } from "express";
import getAvailableSeasonsService from "../../services/schedule/getAvailableSeasons.service";

const getAvailableSeasonsController = async (req: Request, res: Response) => {
  try {
    const { leagueId } = req.params;
    const { baseYear } = req.query;

    const seasons = await getAvailableSeasonsService(
      Number(leagueId),
      Number(baseYear)
    );

    res.send(seasons);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getAvailableSeasonsController;
