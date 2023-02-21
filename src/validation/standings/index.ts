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
  ];
};

// eslint-disable-next-line import/prefer-default-export
export { getStandingsValidation, getRankedStandingsValidation };
