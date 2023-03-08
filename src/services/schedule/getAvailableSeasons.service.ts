import { mongoService } from "../..";

const getAvailableSeasonsService = async (
  leagueId: number,
  baseYear?: number
) => {
  const db = mongoService.db(leagueId.toString()).collection("schedules");

  const results = await db
    .aggregate([
      {
        $group: {
          _id: {
            seasonIndex: "$seasonIndex",
          },
          seasonIndex: {
            $first: "$seasonIndex",
          },
        },
      },
      {
        $project: {
          seasonIndex: "$seasonIndex",
          year: {
            $add: [baseYear || 2022, "$seasonIndex"],
          },
        },
      },
    ])
    .toArray();

  return { success: true, body: results };
};

export default getAvailableSeasonsService;
