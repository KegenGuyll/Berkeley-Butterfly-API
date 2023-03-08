import { param, query } from "express-validator";

const getAvailableSeasonsValidation = () => {
  return [
    param("leagueId").isNumeric().exists().toInt(),
    query("baseYear")
      .isNumeric()
      .withMessage("baseYear must be a boolean.")
      .toBoolean()
      .optional(),
  ];
};

// eslint-disable-next-line import/prefer-default-export
export { getAvailableSeasonsValidation };
