import { Document } from "mongodb";
import { mongoService, dbName } from "..";

interface CurrentYear {
  _id: string;
  currWeek: number;
}

const getCurrentWeek = async (
  leagueId: number,
  currYear: number
): Promise<number> => {
  const db = mongoService.db(dbName).collection("standings");

  const pipeline: Document[] = [
    {
      $match: {
        calendarYear: currYear,
        leagueId,
      },
    },
    {
      $sort: {
        weekIndex: -1,
      },
    },
    {
      $project: {
        currWeek: "$weekIndex",
      },
    },
    {
      $limit: 1,
    },
  ];

  const result = (await db.aggregate(pipeline).toArray()) as CurrentYear[];

  return result[0].currWeek;
};

export default getCurrentWeek;
