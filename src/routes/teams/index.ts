import { Router, Request, Response, NextFunction } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import getTeamController from "../../controllers/teams/getTeam.controller";
import { getTeamValidation } from "../../validation/teams";

const router: Router = Router();

router.get(
  "/:leagueId/:teamId",
  getTeamValidation(),
  asyncMiddleware(getTeamController)
);

const teamRouter: Router = router;

// eslint-disable-next-line no-unused-vars
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default teamRouter;