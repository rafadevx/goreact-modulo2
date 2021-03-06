import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository } from './styles';

const CompareList = ({ repositories, remove, refresh }) => (
  <Container>
    {repositories.map((repo, index) => (
      <Repository key={repo.id}>
        <header>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <strong>{repo.name}</strong>
          <small>{repo.owner.login}</small>
        </header>
        <ul>
          <li>
            {repo.stargazers_count}
            <small> stars</small>
          </li>
          <li>
            {repo.forks_count}
            <small> forks</small>
          </li>
          <li>
            {repo.open_issues_count}
            <small> issues</small>
          </li>
          <li>
            {repo.lastCommit}
            <small> last commit</small>
          </li>
        </ul>
        <footer>
          <button type="button" onClick={() => refresh(`${repo.owner.login}/${repo.name}`, index)}><i className="fa fa-refresh" /></button>
          <button type="button" onClick={() => remove(index)}><i className="fa fa-trash-o" /></button>
        </footer>
      </Repository>
    ))}

  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
    }),
    stargazers_count: PropTypes.number,
    forks_count: PropTypes.number,
    open_issues_count: PropTypes.number,
    lastCommit: PropTypes.string,
  })).isRequired,
  remove: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default CompareList;
