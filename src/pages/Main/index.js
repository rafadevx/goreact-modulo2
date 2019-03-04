import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';
import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

import logo from '../../assets/logo.png';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  }

  componentDidMount() {
    this.setState({ repositories: JSON.parse(localStorage.getItem('@repos')) });
  }

  handleAddRepo = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    const { repositoryInput, repositories } = this.state;
    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();
      const repos = repositories;
      repos.push(repository);
      localStorage.setItem('@repos', JSON.stringify(repos));

      this.setState({
        repositoryInput: '',
        repositories: repos,
        repositoryError: false,
      });
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleRemoveRepo = (index) => {
    const repos = JSON.parse(localStorage.getItem('@repos'));
    if (index > -1) {
      repos.splice(index, 1);
    }
    localStorage.setItem('@repos', JSON.stringify(repos));
    this.setState({
      repositories: repos,
    });
  }

  handleRefreshRepo = async (repoName, index) => {
    const { data: repository } = await api.get(`/repos/${repoName}`);
    repository.lastCommit = moment(repository.pushed_at).fromNow();

    const repos = JSON.parse(localStorage.getItem('@repos'));
    repos[index] = repository;

    localStorage.setItem('@repos', JSON.stringify(repos));
    this.setState({
      repositories: repos,
    });
  }

  render() {
    const {
      repositoryError, repositoryInput, repositories, loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepo}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>
        <CompareList
          repositories={repositories}
          remove={this.handleRemoveRepo}
          refresh={this.handleRefreshRepo}
        />
      </Container>
    );
  }
}
