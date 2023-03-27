import { Document } from "mongodb";
import { mongoService, dbName } from "..";

interface CurrentYear {
  _id: string;
  currYear: number;
}

const getCurrentYear = async (leagueId: number): Promise<number> => {
  const db = mongoService.db(dbName).collection("standings");

  const pipeline: Document[] = [
    {
      $match: {
        leagueId,
      },
    },
    {
      $sort: {
        calendarYear: -1,
      },
    },
    {
      $project: {
        currYear: "$calendarYear",
      },
    },
    {
      $limit: 1,
    },
  ];

  const result = (await db.aggregate(pipeline).toArray()) as CurrentYear[];

  return result[0].currYear;
};

export default getCurrentYear;
