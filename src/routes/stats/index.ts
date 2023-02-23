import { Router, Request, Response, NextFunction } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import {
  getLeagueLeadersValidation,
  getTeamStatsValidation,
} from "../../validation/stats";
import getLeagueLeadersController from "../../controllers/stats/league/getLeagueLeaders";
import getTeamStatsController from "../../controllers/stats/team/getTeamStats.controller";

const router: Router = Router();

router.get(
  "/league-leaders/:leagueId/:dataType",
  getLeagueLeadersValidation(),
  asyncMiddleware(getLeagueLeadersController)
);

router.get(
  "/team/:leagueId/:teamId",
  getTeamStatsValidation(),
  asyncMiddleware(getTeamStatsController)
);

const statsRouter: Router = router;

// eslint-disable-next-line no-unused-vars
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default statsRouter;
