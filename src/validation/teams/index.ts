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
      .optional()
      .custom((value: boolean, { req }) => {
        if (value) {
          if (req.query && req.query.seasonIndex) return true;

          return false;
        }

        return true;
      })
      .withMessage("seasonIndex must be present in query"),
    query("seasonIndex")
      .isNumeric()
      .withMessage("seasonIndex must be a number.")
      .toInt()
      .optional(),
  ];
};

const getTeamsValidation = () => {
  return [param("leagueId").isNumeric().exists().toInt()];
};

const getTeamsScheduleValidation = () => {
  return [
    param("leagueId").isNumeric().exists().toInt(),
    param("teamId").isNumeric().exists().toInt(),
    query("include_team_stats")
      .isBoolean()
      .withMessage("include_team_stats must be a boolean.")
      .toBoolean()
      .optional(),
    query("include_teams")
      .isBoolean()
      .withMessage("include_teams must be a boolean.")
      .toBoolean()
      .optional(),
    query("season_type")
      .isString()
      .isIn(["reg", "pre"])
      .withMessage("season_type can only be reg or pre")
      .optional(),
    query("seasonIndex")
      .isNumeric()
      .withMessage("seasonIndex must be a number.")
      .toInt(),
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

const getTeamRosterValidation = () => {
  return [
    param("leagueId").isNumeric().exists().toInt(),
    param("teamId").isNumeric().exists().toInt(),
  ];
};

export {
  getTeamValidation,
  getTeamLeadersValidation,
  getTeamsScheduleValidation,
  getTeamsValidation,
  getTeamRosterValidation,
};
