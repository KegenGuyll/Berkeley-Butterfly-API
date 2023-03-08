import { Request, Response } from "express";
import getTeamScheduleService from "../../../services/teams/schedule/getTeamSchedule";

const getTeamScheduleController = async (req: Request, res: Response) => {
  try {
    const { leagueId, teamId } = req.params;

    const player = await getTeamScheduleService(
      Number(leagueId),
      Number(teamId),
      req.query as any
    );

    res.send(player);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getTeamScheduleController;
