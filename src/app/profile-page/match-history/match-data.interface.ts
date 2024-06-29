export interface PlayerStats {
  assists: number;
  champLevel: number;
  championId: number;
  championName: string;
  deaths: number;
  doubleKills: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  kills: number;
  participantId: number;
  pentaKills: number;
  perks: Perks;
  profileIcon: number;
  puuid: string;
  quadraKills: number;
  riotIdGameName: string;
  riotIdTagline: string;
  role: string;
  summoner1Id: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  summonerName: string;
  timePlayed: number;
  totalMinionsKilled: number;
  totalTimeCCDealt: number;
  totalTimeSpentDead: number;
  totalUnitsHealed: number;
  tripleKills: number;
  visionScore: number;
  wardsPlaced: number;
  win: boolean;
}

export interface Perks {
  statPerks: StatPerks;
  styles: Style[];
}

export interface StatPerks {
  defense: number;
  flex: number;
  offense: number;
}

export interface Style {
  description: string;
  selections: Selection[];
  style: number;
}

export interface Selection {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}

export interface MatchInfo {
  gameStartTimestamp: number;
  gameMode: string;
  gameCreation: number;
  gameDuration: number;
  gameEndTimestamp: number;
  participants: PlayerStats[];
}

export interface MatchDataDTO {
  info: MatchInfo;
}

export interface MatchData {
  gameTime: string;
  gameDaysAgo: number;
  gameMode: string;
  searchedPlayer: PlayerStats;
  champions: string[];
  players: string[];
  searchedPlayerWon: string;
}
