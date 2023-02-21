import { param, query } from "express-validator";
import { leadersSortList, dataTypeList } from "../sortByLists";

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

const getTeamLeadersValidation = () => {
  return [
    param("leagueId").isNumeric().exists().toInt(),
    param("teamId").isNumeric().exists().toInt(),
    param("dataType")
      .isString()
      .withMessage("dataType must be a string.")
      .isIn(dataTypeList)
      .withMessage(
        `dataType can only be one of these items: ${dataTypeList.map(
          (v) => v
        )}.`
      ),
    query("sort_by")
      .isString()
      .withMessage("sort_by must be a string")
      .isIn(leadersSortList)
      .withMessage(
        `sort_by can only be one of these items: ${leadersSortList.map(
          (v) => v
        )}.`
      )
      .optional(),
    query("include_teams")
      .isBoolean()
      .withMessage("include_teams must be a boolean.")
      .toBoolean()
      .optional(),
    query("seasonIndex")
      .isNumeric()
      .withMessage("seasonIndex must be a number.")
      .toInt()
      .exists()
      .withMessage("seasonIndex is a required field."),
  ];
};

export {
  getTeamValidation,
  getTeamsLastGameValidation,
  getTeamLeadersValidation,
};
