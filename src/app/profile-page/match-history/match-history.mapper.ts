import { MatchData, MatchDataDTO, PlayerStats } from './match-data.interface';

export function mapMatchHistory(
  gameDataArray: MatchDataDTO[],
  userPuuid: string
): MatchData[] {
  return gameDataArray.map((gameData) => ({
    gameTime: calculeTime(
      gameData.info.gameStartTimestamp,
      gameData.info.gameEndTimestamp
    ),
    gameDaysAgo: daysAgo(gameData.info.gameEndTimestamp),
    gameMode: getMatchType(gameData.info.gameMode),
    searchedPlayer: getSearchedPlayer(gameData.info.participants, userPuuid),
    champions: getAllChampionsNames(gameData.info.participants),
    players: getAllPlayersNames(gameData.info.participants),
    searchedPlayerWon: getSeatchedPlayerMatchResult(
      getSearchedPlayer(gameData.info.participants, userPuuid)
    ),
  }));
}

function getSeatchedPlayerMatchResult(player: PlayerStats): string {
  if (player.win) {
    return 'Wygrana';
  } else {
    return 'Porażka';
  }
}

function getAllChampionsNames(players: PlayerStats[]): string[] {
  return players.map((champion) => champion.championName);
}

function getAllPlayersNames(players: PlayerStats[]): string[] {
  return players.map((champion) => champion.riotIdGameName);
}

function getMatchType(matchType: string): string {
  if (matchType === 'CLASSIC') {
    return 'Solo/Duo';
  } else if ('ARAM') {
    return 'Aram';
  } else {
    return 'Summoners rift';
  }
}

function getSearchedPlayer(
  players: PlayerStats[],
  userPuuid: string
): PlayerStats {
  return players.find((playerStats) => playerStats.puuid === userPuuid);
}

function calculeTime(gameStartTimestamp: number, gameEndTimestamp: number) {
  const gameStartTime = gameStartTimestamp;
  const gameEndTime = gameEndTimestamp;

  const timeDifference = gameEndTime - gameStartTime;

  const seconds = Math.floor(timeDifference / 1000);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;
}

function daysAgo(gameEndTime: number) {
  const now = new Date();
  const end = new Date(gameEndTime);
  const differenceInTime = now.getTime() - end.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
}
