import * as React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { battle } from '../utils/api';
import withSearchParams, { WithSearchParams } from './withSearchParams';
import { IPlayer, IProfile } from '../utils/interfaces';

interface ICardProps {
  profile: IProfile;
}

function Card({ profile }: ICardProps) {
  const {
    login,
    avatar_url,
    html_url,
    followers,
    following,
    public_repos,
    location,
    company,
  } = profile;

  return (
    <div className="card bg-light">
      <header className="split">
        <div>
          <h4>
            <a href={html_url}>{login}</a>
          </h4>
          <p>{location || 'unknown'}</p>
        </div>
        <img
          className="avatar large"
          src={avatar_url}
          alt={`Avatar for ${login}`}
        />
      </header>
      <ul className="stack">
        <li className="split">
          <span>Name:</span> <span>{login || 'n/a'}</span>
        </li>
        <li className="split">
          <span>Company:</span> <span>{company || 'n/a'}</span>
        </li>
        <li className="split">
          <span>Followers:</span> <span>{followers}</span>
        </li>
        <li className="split">
          <span>Following:</span> <span>{following}</span>
        </li>
        <li className="split">
          <span>Repositories:</span> <span>{public_repos}</span>
        </li>
      </ul>
    </div>
  );
}

interface IResultsProps extends WithSearchParams {}

interface IResultsState {
  playerOne: IPlayer | null;
  playerTwo: IPlayer | null;
  error: string | null;
  loading: boolean;
}

class Results extends React.Component<IResultsProps, IResultsState> {
  state: IResultsState = {
    playerOne: null,
    playerTwo: null,
    error: null,
    loading: true,
  };

  componentDidMount() {
    const searchParams = this.props.searchParams;
    const playerOne = searchParams.get('playerOne')!;
    const playerTwo = searchParams.get('playerTwo')!;

    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          playerOne: players[0],
          playerTwo: players[1],
          error: null,
          loading: false,
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }

  render() {
    const { playerOne, playerTwo, error, loading } = this.state;

    if (loading === true) {
      return <Loading text="Battling" />;
    }

    if (error) {
      return <p className="text-center error">{error}</p>;
    }

    if (playerOne && playerTwo) {
      return (
        <main className="animate-in stack main-stack">
          <div className="split">
            <h1>Results</h1>
            <Link to="/battle" className="btn secondary">
              Reset
            </Link>
          </div>
          <section className="grid">
            <article className="results-container">
              <Card profile={playerOne.profile} />
              <p className="results">
                <span>
                  {playerOne.winner === true
                    ? 'Winner'
                    : playerOne.winner === false && playerTwo.winner === false
                    ? 'Tie'
                    : 'Loser'}{' '}
                  {playerOne.score.toLocaleString()}
                </span>
                {playerOne.winner === true && (
                  <img
                    width={80}
                    src="https://ui.dev/images/certificate.svg"
                    alt="Certificate"
                  />
                )}
              </p>
            </article>
            <article className="results-container">
              <Card profile={playerTwo.profile} />
              <p className="results">
                <span>
                  {playerTwo.winner === true
                    ? 'Winner'
                    : playerTwo.winner === false && playerOne.winner === false
                    ? 'Tie'
                    : 'Loser'}{' '}
                  {playerTwo.score.toLocaleString()}
                </span>
                {playerTwo.winner === true && (
                  <img
                    width={80}
                    src="https://ui.dev/images/certificate.svg"
                    alt="Certificate"
                  />
                )}
              </p>
            </article>
          </section>
        </main>
      );
    }
  }
}

export default withSearchParams(Results);
