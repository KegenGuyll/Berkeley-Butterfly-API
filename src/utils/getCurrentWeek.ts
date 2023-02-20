import { Document } from "mongodb";
import { mongoService } from "..";

interface CurrentYear {
  _id: string;
  currWeek: number;
}

const getCurrentWeek = async (
  leagueId: number,
  currYear: number
): Promise<number> => {
  const db = mongoService.db(leagueId.toString()).collection("standings");

  const pipeline: Document[] = [
    {
      $match: {
        calendarYear: currYear,
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
