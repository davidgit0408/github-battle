import * as React from 'react';
import Table from './Table';
import { fetchPopularRepos } from '../utils/api';
import { IRepo } from '../utils/interfaces';

interface PopularState {
  selectedLanguage: string;
  repos: IRepo[] | null;
  error: string | null;
}

export default class Popular extends React.Component<{}, PopularState> {
  state: PopularState = {
    selectedLanguage: 'All',
    repos: null,
    error: null,
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = (selectedLanguage: string) => {
    this.setState({
      selectedLanguage,
      error: null,
    });

    fetchPopularRepos(selectedLanguage)
      .then((repos) =>
        this.setState({
          repos,
          error: null,
        })
      )
      .catch((error) => {
        console.warn('Error fetching repos: ', error);

        this.setState({
          error: 'There was an error fetching the repositories!',
        });
      });
  };

  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Popular</h1>
          <LanguageNav
            selected={selectedLanguage}
            onUpdateLanguage={this.updateLanguage}
          />
        </div>

        {error && <p className="text-center error">{error}</p>}
        {repos && <Table repos={repos} />}
      </main>
    );
  }
}

interface LanguageNavProps {
  selected: string;
  onUpdateLanguage: (selectedLanguage: string) => void;
}

function LanguageNav({ selected, onUpdateLanguage }: LanguageNavProps) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <select onChange={(e) => onUpdateLanguage(e.target.value)} value={selected}>
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
}
