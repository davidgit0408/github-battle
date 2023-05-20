export interface IRepo {
  id: number;
  name: string;
  owner: IOwner;
  created_at: Date;
  updated_at: Date;
  stargazers_count: number;
  language: string;
  forks: number;
  open_issues: number;
  watchers: number;
}

export interface IOwner {
  login: string;
  avatar_url: string;
  type: string;
}

export interface IPlayer {
  profile: IProfile;
  score: number;
  winner: boolean | null;
}

export interface IProfile {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  location: string;
  company: string | null;
}
