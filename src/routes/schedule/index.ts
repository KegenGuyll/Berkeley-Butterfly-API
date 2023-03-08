import { Router, Request, Response, NextFunction } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import { getAvailableSeasonsValidation } from "../../validation/schedule";
import getAvailableSeasonsController from "../../controllers/schedule/getAvailableSeasons.controller";

const router: Router = Router();

router.get(
  "/availableSeasons/:leagueId",
  getAvailableSeasonsValidation(),
  asyncMiddleware(getAvailableSeasonsController)
);

const scheduleRouter: Router = router;

// eslint-disable-next-line no-unused-vars
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default scheduleRouter;
