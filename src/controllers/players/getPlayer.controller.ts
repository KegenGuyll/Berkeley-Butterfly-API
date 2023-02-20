import { Request, Response } from "express";
import getPlayerService from "../../services/players/getPlayer.service";

const getPlayerController = async (req: Request, res: Response) => {
  try {
    const { leagueId, rosterId } = req.params;

    const player = await getPlayerService(
      Number(leagueId),
      Number(rosterId),
      req.query
    );

    res.send(player);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getPlayerController;
