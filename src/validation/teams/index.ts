import { param, query } from "express-validator";

const getTeamValidation = () => {
  return [
    param("leagueId").isNumeric().exists().toInt(),
    param("teamId").isNumeric().exists().toInt(),
    query("include_players")
      .isBoolean()
      .withMessage("include_players must be a boolean.")
      .toBoolean()
      .optional(),
    query("include_stats")
      .isBoolean()
      .withMessage("include_stats must be a boolean.")
      .toBoolean()
      .optional(),
    query("include_standings")
      .isBoolean()
      .withMessage("include_stats must be a boolean.")
      .toBoolean()
      .optional(),
  ];
};

// eslint-disable-next-line import/prefer-default-export
export { getTeamValidation };
