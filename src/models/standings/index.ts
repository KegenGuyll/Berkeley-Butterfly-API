export type Standings = {
  _id: string;
  awayLosses: number;
  awayTies: number;
  awayWins: number;
  calendarYear: number;
  capAvailable: number;
  capRoom: number;
  capSpent: number;
  confLosses: number;
  confTies: number;
  confWins: number;
  conferenceId: number;
  conferenceName: string;
  defPassYds: number;
  defPassYdsRank: number;
  defRushYds: number;
  defRushYdsRank: number;
  defTotalYds: number;
  defTotalYdsRank: number;
  divLosses: number;
  divTies: number;
  divWins: number;
  divisionId: number;
  divisionName: string;
  homeLosses: number;
  homeTies: number;
  homeWins: number;
  netPts: number;
  offPassYds: number;
  offPassYdsRank: number;
  offRushYds: number;
  offRushYdsRank: number;
  offTotalYds: number;
  offTotalYdsRank: number;
  playoffStatus: number;
  prevRank: number;
  ptsAgainst: number;
  ptsAgainstRank: number;
  ptsFor: number;
  ptsForRank: number;
  rank: number;
  seasonIndex: number;
  seed: number;
  stageIndex: number;
  tODiff: number;
  teamId: number;
  teamName: string;
  teamOvr: number;
  totalLosses: number;
  totalTies: number;
  totalWins: number;
  weekIndex: number;
  winLossStreak: number;
  winPct: number;
};

export interface IStandingsResponse {
  body: Standings[];
  success: boolean;
}

export interface IGetStandingsQuery {
  include_stats?: boolean;
  include_team?: boolean;
  seasonIndex: number;
}

export interface IGetLeagueStandingsQuery {
  conferenceId?: number;
  divisionId?: number;
  include_team?: boolean;
  seasonIndex: number;
}

export interface IGetRankedStandingsQuery {
  include_team?: boolean;
  seasonIndex: number;
  sort_by?: string;
}
