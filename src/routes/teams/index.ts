import { Router, Request, Response, NextFunction } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import getTeamController from "../../controllers/teams/getTeam.controller";
import {
  getTeamLeadersValidation,
  getTeamRosterValidation,
  getTeamValidation,
  getTeamsScheduleValidation,
  getTeamsValidation,
} from "../../validation/teams";
import getTeamLeadersController from "../../controllers/teams/players/getTeamLeaders.controller";
import getTeamScheduleController from "../../controllers/teams/schedule/getTeamSchedule.controller";
import getTeamPerGameStatsController from "../../controllers/stats/team/getTeamPerGameStatsService";
import getTeamsController from "../../controllers/teams/getTeams.controller";
import getTeamRosterController from "../../controllers/teams/players/getTeamRoster.controller";

const router: Router = Router();

router.get(
  "/roster/:leagueId/:teamId",
  getTeamRosterValidation(),
  asyncMiddleware(getTeamRosterController)
);

router.get(
  "/leaders/:leagueId/:teamId/:dataType",
  getTeamLeadersValidation(),
  asyncMiddleware(getTeamLeadersController)
);

router.get(
  "/per-game-stats/:leagueId/:teamId/:dataType",
  getTeamLeadersValidation(),
  asyncMiddleware(getTeamPerGameStatsController)
);

router.get(
  "/schedule/:leagueId/:teamId",
  getTeamsScheduleValidation(),
  asyncMiddleware(getTeamScheduleController)
);

router.get(
  "/:leagueId/:teamId",
  getTeamValidation(),
  asyncMiddleware(getTeamController)
);

router.get(
  "/:leagueId/",
  getTeamsValidation(),
  asyncMiddleware(getTeamsController)
);

const teamRouter: Router = router;

// eslint-disable-next-line no-unused-vars
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default teamRouter;
