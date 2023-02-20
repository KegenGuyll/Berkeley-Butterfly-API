import { Router, Request, Response, NextFunction } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import {
  getRankedStandingsValidation,
  getStandingsValidation,
} from "../../validation/standings";
import getStandingsController from "../../controllers/standings/getStandings.controller";
import getRankedStandingsController from "../../controllers/standings/getRankedStandings.controller";

const router: Router = Router();

router.get(
  "/ranked/:leagueId",
  getRankedStandingsValidation(),
  asyncMiddleware(getRankedStandingsController)
);

router.get(
  "/:leagueId/:teamId",
  getStandingsValidation(),
  asyncMiddleware(getStandingsController)
);

const standingsRouter: Router = router;

// eslint-disable-next-line no-unused-vars
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default standingsRouter;
