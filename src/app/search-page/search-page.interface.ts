export interface UserData {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface UserById {
  puuid: string;
  gameName: string;
  tagLine: string;
}
