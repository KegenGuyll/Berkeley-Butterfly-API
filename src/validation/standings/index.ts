import { param, query } from "express-validator";
import { rankList } from "../sortByLists";

const getStandingsValidation = () => {
  return [
    param("leagueId").isNumeric().exists().toInt(),
    query("include_team")
      .isBoolean()
      .withMessage("include_team must be a boolean.")
      .toBoolean()
      .optional(),
    query("include_stats")
      .isBoolean()
      .withMessage("include_stats must be a boolean.")
      .toBoolean()
      .optional(),
    query("seasonIndex")
      .isNumeric()
      .withMessage("seasonIndex must be a number.")
      .toInt(),
  ];
};

const getLeagueStandingsValidation = () => {
  return [
    param("leagueId").isNumeric().exists().toInt(),
    query("include_team")
      .isBoolean()
      .withMessage("include_team must be a boolean.")
      .toBoolean()
      .optional(),
    query("conferenceId")
      .isNumeric()
      .withMessage("conferenceId must be a number.")
      .toInt()
      .optional(),
    query("divisionId")
      .isNumeric()
      .withMessage("divisionId must be a number.")
      .toInt()
      .optional(),
    query("seasonIndex")
      .isNumeric()
      .withMessage("seasonIndex must be a number.")
      .toInt(),
  ];
};

const getRankedStandingsValidation = () => {
  return [
    param("leagueId")
      .isNumeric()
      .withMessage("leagueId must be a number.")
      .exists()
      .withMessage("leagueId must exist.")
      .toInt(),
    query("sort_by")
      .isString()
      .withMessage("sort_by must be a string.")
      .isIn(rankList)
      .withMessage(
        `sort_by can only be one of these items:${rankList.map(
          (v) => ` ${v}`
        )}.`
      )
      .optional(),
    query("include_team")
      .isBoolean()
      .withMessage("include_team must be a boolean.")
      .toBoolean()
      .optional(),
    query("seasonIndex")
      .isNumeric()
      .withMessage("seasonIndex must be a number.")
      .toInt(),
  ];
};

export {
  getStandingsValidation,
  getRankedStandingsValidation,
  getLeagueStandingsValidation,
};
