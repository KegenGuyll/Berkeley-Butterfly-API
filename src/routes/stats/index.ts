import { Router, Request, Response, NextFunction } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import { getLeagueLeadersValidation } from "../../validation/stats";
import getLeagueLeadersController from "../../controllers/stats/league/getLeagueLeaders";

const router: Router = Router();

router.get(
  "/league-leaders/:leagueId/:dataType",
  getLeagueLeadersValidation(),
  asyncMiddleware(getLeagueLeadersController)
);

const statsRouter: Router = router;

// eslint-disable-next-line no-unused-vars
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default statsRouter;
