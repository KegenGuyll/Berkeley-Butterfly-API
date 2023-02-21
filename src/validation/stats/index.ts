import { param, query } from "express-validator";
import { leadersSortList, dataTypeList } from "../sortByLists";

const getLeagueLeadersValidation = () => {
  return [
    param("leagueId").isNumeric().exists().toInt(),
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

// eslint-disable-next-line import/prefer-default-export
export { getLeagueLeadersValidation };
