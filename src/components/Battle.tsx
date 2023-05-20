import * as React from 'react';
import { Link } from 'react-router-dom';
import { close } from '../utils/icons';

function Instructions() {
  return (
    <section className="instructions-container">
      <h2>Instructions</h2>
      <ol>
        <li>Enter 2 Github users</li>
        <li>Battle</li>
        <li>See the winners</li>
      </ol>
    </section>
  );
}

interface PlayerInputProps {
  label: string;
  onSubmit: (player: string) => void;
}

interface PlayerInputState {
  username: string;
}

class PlayerInput extends React.Component<PlayerInputProps, PlayerInputState> {
  state: PlayerInputState = {
    username: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  };

  render() {
    return (
      <form className="card" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="player-label">
          {this.props.label}
        </label>
        <div className="input-row">
          <input
            type="text"
            id="username"
            placeholder="github username"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            className="btn link"
            type="submit"
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

interface PlayerPreviewProps {
  label: string;
  username: string;
  onReset: () => void;
}

function PlayerPreview({ label, username, onReset }: PlayerPreviewProps) {
  return (
    <article className="card">
      <h3 className="player-label">{label}</h3>
      <div className="split">
        <div className="row gap-md">
          <img
            width={32}
            height={32}
            className="avatar"
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a href={`https://github.com/${username}`} className="link">
            {username}
          </a>
        </div>
        <button onClick={onReset} className="btn secondary icon">
          {close}
        </button>
      </div>
    </article>
  );
}

interface BattleProps {}

interface BattleState {
  playerOne: string | null;
  playerTwo: string | null;
}

export default class Battle extends React.Component<BattleProps, BattleState> {
  state: BattleState = {
    playerOne: null,
    playerTwo: null,
  };

  handleReset = (id: string) => {
    this.setState({
      [id]: null,
    } as Pick<BattleState, keyof BattleState>);
  };

  handleSubmit = (id: string, player: string) => {
    this.setState({
      [id]: player,
    } as Pick<BattleState, keyof BattleState>);
  };

  render() {
    const { playerOne, playerTwo } = this.state;
    const disabled = !playerOne || !playerTwo;

    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Players</h1>
          <Link
            to={{
              pathname: '/results',
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
            }}
            className={`btn primary ${disabled ? 'disabled' : ''}`}
          >
            Battle
          </Link>
        </div>
        <section className="grid">
          {playerOne === null ? (
            <PlayerInput
              label="Player One"
              onSubmit={(player) => this.handleSubmit('playerOne', player)}
            />
          ) : (
            <PlayerPreview
              label="Player One"
              username={playerOne}
              onReset={() => this.handleReset('playerOne')}
            />
          )}
          {playerTwo === null ? (
            <PlayerInput
              label="Player Two"
              onSubmit={(player) => this.handleSubmit('playerTwo', player)}
            />
          ) : (
            <PlayerPreview
              label="Player Two"
              username={playerTwo}
              onReset={() => this.handleReset('playerTwo')}
            />
          )}
        </section>
        <Instructions />
      </main>
    );
  }
}
