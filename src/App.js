import React from 'react';
import './styles.css';
import { Component } from 'react';
import Rowscomponent from './rowsindexfile';

class App extends Component {
  state = { username: '', repos: [], errorMsg: '', forkedVal: false };

  makingAPICall = async (params) => {
    const { forkedVal } = this.state;
    const response = await fetch(`https://api.github.com/users/${params}/repos
    `);
    const data = await response.json();
    if (data.length === undefined) {
      this.setState({ errorMsg: 'No Data Found', repos: [] });
    } else {
      data.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
      this.setState({
        errorMsg: '',
        repos: data.filter((item) => item.fork === forkedVal),
      });
    }
  };

  onSubmitClick = () => {
    const { username } = this.state;
    this.makingAPICall(username);
  };

  onTypingUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onclickingCheckbox = () => {
    const { username } = this.state;
    this.setState((prevState) => ({
      forkedVal: !prevState.forkedVal,
    }));
    this.makingAPICall(username);
  };

  render() {
    const { username, repos, errorMsg, forkedVal } = this.state;

    let buttonCss;
    if (username.length === 0) {
      buttonCss = 'button1';
    } else {
      buttonCss = 'button';
    }
    return (
      <div className="App">
        <div className="input">
          <label htmlFor="username">Github username: </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={this.onTypingUsername}
          />
          <label htmlFor="fork">Include forks: </label>
          <input
            id="fork"
            type="checkbox"
            checked={!forkedVal}
            onChange={this.onclickingCheckbox}
          />
          <button className={`${buttonCss}`} onClick={this.onSubmitClick}>
            Submit
          </button>
        </div>
        <section>
          {repos.length > 1 ? (
            <header>
              <div className="col">Name</div>
              <div className="col">Language</div>
              <div className="col">Description</div>
              <div className="col">Size</div>
            </header>
          ) : null}

          {repos.length > 1
            ? repos.map((item) => <Rowscomponent rows={item} key={item.id} />)
            : null}
        </section>
        <div className="error">{errorMsg}</div>
      </div>
    );
  }
}
export default App;
