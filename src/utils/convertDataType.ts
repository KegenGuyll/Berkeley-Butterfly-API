import { DataType } from "../models/teams";
import { firstCharCap } from "./common";

const convertDataType = (dataType: DataType) => {
  return `stats${firstCharCap(dataType)}`;
};

export default convertDataType;
