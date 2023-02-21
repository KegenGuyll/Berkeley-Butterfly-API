/* eslint-disable indent */
import {
  defenseObj,
  kickingObj,
  passingObj,
  puntingObj,
  receivingObj,
  rushingObj,
} from "../data/teamLeaders";
import { DataType } from "../models/teams";

const dataTypeGroup = (dataType: DataType) => {
  switch (dataType) {
    case "passing":
      return { ...passingObj };
    case "defense":
      return { ...defenseObj };
    case "kicking":
      return { ...kickingObj };
    case "receiving":
      return { ...receivingObj };
    case "punting":
      return { ...puntingObj };
    case "rushing":
      return { ...rushingObj };
    default:
      return null;
  }
};

export default dataTypeGroup;
