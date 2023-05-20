import Tooltip from './Tooltip';
import { hashtag } from '../utils/icons';
import { IRepo } from '../utils/interfaces';

interface MoreInfoProps {
  login: string;
  language: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  watchers: number;
  forks: number;
}

function MoreInfo({
  created_at,
  forks,
  language,
  updated_at,
  watchers,
  login,
  type,
}: MoreInfoProps) {
  return (
    <ul className="tooltip stack">
      <li className="split">
        <span>By:</span> <span>{login}</span>
      </li>
      {language && (
        <li className="split">
          <span>Language:</span> <span>{language}</span>
        </li>
      )}
      <li className="split">
        <span>Type:</span>
        <span>{type}</span>
      </li>
      <li className="split">
        <span>Created:</span>{' '}
        <span>{new Date(created_at).toLocaleDateString()}</span>
      </li>
      <li className="split">
        <span>Updated:</span>{' '}
        <span>{new Date(updated_at).toLocaleDateString()}</span>
      </li>
      <li className="split">
        <span>Watchers:</span>
        <span>{watchers.toLocaleString()}</span>
      </li>
      {forks && (
        <li className="split">
          <span>Forked:</span> <span>{forks.toLocaleString()}</span>
        </li>
      )}
    </ul>
  );
}

function TableHead() {
  return (
    <thead>
      <tr>
        <th style={{ width: '5%' }}>{hashtag}</th>
        <th style={{ width: '50%' }}>Repository</th>
        <th style={{ width: '15%' }}>Stars</th>
        <th style={{ width: '15%' }}>Forks</th>
        <th style={{ width: '15%' }}>Open Issue</th>
      </tr>
    </thead>
  );
}

interface TableRowProps {
  index: number;
  repo: IRepo;
}

function TableRow({ repo, index }: TableRowProps) {
  const {
    owner,
    stargazers_count,
    forks,
    open_issues,
    name,
    created_at,
    updated_at,
    language,
    watchers,
  } = repo;
  const { login, avatar_url, type } = owner;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Tooltip
          element={
            <MoreInfo
              login={login}
              created_at={created_at}
              type={type}
              language={language}
              updated_at={updated_at}
              watchers={watchers}
              forks={forks}
            />
          }
        >
          <div className="row gap-md">
            <img
              width={32}
              height={32}
              className="avatar"
              src={avatar_url}
              alt={`Avatar for ${login}`}
            />
            <a href={`https://github.com/${login}/${name}`} target="_blank">
              {name}
            </a>
          </div>
        </Tooltip>
      </td>
      <td>{stargazers_count}</td>
      <td>{forks}</td>
      <td>{open_issues}</td>
    </tr>
  );
}

interface TableProps {
  repos: IRepo[];
}

export default function Table({ repos }: TableProps) {
  return (
    <table>
      <TableHead />
      <tbody>
        {repos.map((repo, index) => {
          return <TableRow key={repo.id} index={index} repo={repo} />;
        })}
      </tbody>
    </table>
  );
}
