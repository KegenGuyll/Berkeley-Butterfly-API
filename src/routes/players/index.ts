import { Router, Request, Response, NextFunction } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import getPlayerController from "../../controllers/players/getPlayer.controller";
import errorHandler from "../../expections/ErrorHandler";
import { getPlayerValidation } from "../../validation/players";

const router: Router = Router();

router.get(
  "/:leagueId/:rosterId",
  getPlayerValidation(),
  asyncMiddleware(getPlayerController)
);

const playerRouter: Router = router;

// eslint-disable-next-line no-unused-vars
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default playerRouter;
