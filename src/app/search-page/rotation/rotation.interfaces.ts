export interface ChampionAbilities {
    
    id: string;
    key: number;
    name: string;
    title: string;
    tags: string[];
  }
  
  export interface ChampionList {
    [championName: string]: ChampionAbilities;
  }
  
 export interface ChampionsData {
    type: string;
    format: string;
    version: string;
    data: ChampionList[];
  }