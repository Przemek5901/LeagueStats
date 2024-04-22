export interface ChampionData {
    puuid: string;
    championId: number;
    championLevel: number;
    championPoints: number;
    lastPlayTime: number;
    championPointsSinceLastLevel: number;
    championPointsUntilNextLevel: number;
    chestGranted: boolean;
    tokensEarned: number;
    summonerId: string;
  }
  
  export interface FavouriteChampion {
    id: string;
    name: string;
    chest: boolean;
  }