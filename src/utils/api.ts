import { IPlayer, IProfile, IRepo } from './interfaces';

export async function fetchPopularRepos(language: string): Promise<IRepo[]> {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  const response = await fetch(endpoint);
  const data = await response.json();

  if (!data.items) {
    throw new Error(data.message);
  }

  return data.items as IRepo[];
}

function getErrorMsg(message: string, username: string) {
  if (message === 'Not Found') {
    return `${username} doesn't exist`;
  }

  return message;
}

async function getProfile(username: string): Promise<IProfile> {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const profile = await response.json();

  if (profile.message) {
    throw new Error(getErrorMsg(profile.message, username));
  }

  return profile as IProfile;
}

async function getRepos(username: string): Promise<IRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );
  const repos = await response.json();

  if (repos.message) {
    throw new Error(getErrorMsg(repos.message, username));
  }

  return repos as IRepo[];
}

function getStarsCount(repos: IRepo[]) {
  return repos.reduce((count, { stargazers_count }) => {
    return count + stargazers_count;
  }, 0);
}

function calculateScore(followers: number, repos: IRepo[]) {
  return followers * 3 + getStarsCount(repos);
}

async function getUserData(player: string): Promise<IPlayer> {
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player),
  ]);

  return {
    profile,
    score: calculateScore(profile.followers, repos),
    winner: null,
  };
}

function determineWinner(players: IPlayer[]) {
  const playerOne = players[0];
  const playerTwo = players[1];

  if (playerOne.score > playerTwo.score) {
    playerOne.winner = true;
    playerTwo.winner = false;
  } else if (playerOne.score < playerTwo.score) {
    playerOne.winner = false;
    playerTwo.winner = true;
  } else {
    playerOne.winner = false;
    playerTwo.winner = false;
  }

  return players;
}

export async function battle(players: string[]) {
  const playersData = await Promise.all([
    getUserData(players[0]),
    getUserData(players[1]),
  ]);

  return determineWinner(playersData);
}
