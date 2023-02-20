import { param, query } from "express-validator";

const getPlayerValidation = () => {
  return [
    param("leagueId").isNumeric().exists().toInt(),
    param("rosterId").isNumeric().exists().toInt(),
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

// eslint-disable-next-line import/prefer-default-export
export { getPlayerValidation };
