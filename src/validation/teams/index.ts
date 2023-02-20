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

const getTeamsLastGameValidation = () => {
  return [
    param("leagueId").isNumeric().exists().toInt(),
    param("teamId").isNumeric().exists().toInt(),
    query("include_player_stats")
      .isBoolean()
      .withMessage("include_player_stats must be a boolean.")
      .toBoolean()
      .optional(),
    query("include_teams")
      .isBoolean()
      .withMessage("include_teams must be a boolean.")
      .toBoolean()
      .optional(),
  ];
};

export { getTeamValidation, getTeamsLastGameValidation };
