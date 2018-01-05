/*
 * HighScores.jsx
 */

import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Icon, Label, Menu, Table, Dropdown } from 'semantic-ui-react';

class HighScores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        scores: null,
        first: null,
        selectedGameType: 1,
        selectedGame: 1,
        selectedDifficulty: 1,
        games: null,
        gameTypes: null,
        gameDifficulties: null
    }
    this.getScores = this.getScores.bind(this);;
    this.getGameAttributes = this.getGameAttributes.bind(this);
    this.onChange = this.onChange.bind(this);
  }

    componentDidMount() {
      this.getGameAttributes();
      this.getScores();
  }

  onChange(e, data) {
      const obj = {}
      obj[data.name] = data.value;
      this.setState(obj, this.getScores)
  }
  getGameAttributes() {
      axios.get('/api/gameslist')
      .then(response => {
          console.log(response.data);
          let games = [];
          response.data.forEach(element => {
              let game = Object.assign({}, { value: element.game_id, text: element.game_name });
              games.push(game);
          })
          this.setState({ games: games });
      })
      axios.get('/api/gameSettings')
      .then(response => {
          let difficulties = [];
          let types = [];
          response.data.game_difficulties.forEach(element => {
                let difficulty = Object.assign({}, { value: element.game_difficulty_id, text: element.game_difficulty_name });
                difficulties.push(difficulty);
          });
          response.data.game_types.forEach(element => {
            let type = Object.assign({}, { value: element.game_type_id, text: element.game_type_name });
            types.push(type);
          })
          this.setState({
              gameDifficulties: difficulties,
              gameTypes: types
          })
      })
  }

  getScores() {
    axios.get('/api/scores', { params: {
        game_type_id: this.state.selectedGameType,
        game_id: this.state.selectedGame,
        game_difficulty_id: this.state.selectedDifficulty
    }})
    .then(response => {
        // const arr = response.data;
        const arr = response.data.filter(score => score.count_polygons_entered > 0);
        const firstScore = arr.shift();
        this.setState({
            scores: arr,
            first: firstScore,
        });
    })
  }

  render() {
    return (
      <div>
          <Dropdown name="selectedGameType" value={this.selectedGameType} onChange={this.onChange} defaultValue={this.state.selectedGameType} fluid selection options={this.state.gameTypes} />
          <Dropdown name="selectedGame" value={this.selectedGame} onChange={this.onChange} defaultValue={this.state.selectedGame} fluid selection options={this.state.games} />
          <Dropdown name="selectedDifficulty" value={this.selectedDifficulty} onChange={this.onChange} defaultValue={this.state.selectedDifficulty} fluid selection options={this.state.gameDifficulties} />

          { this.state.first ? (

          <Table celled>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Place</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Score</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell><Label ribbon>First</Label></Table.Cell>
                    <Table.Cell>{this.state.first.user.username || null}</Table.Cell>
                    <Table.Cell>{this.state.first.count_polygons_entered}</Table.Cell>
                </Table.Row>
            {
                this.state.scores.map((score, index) => (
                <Table.Row key={index}>
                    <Table.Cell>{index + 2}</Table.Cell>
                    <Table.Cell>{score.user.username}</Table.Cell>
                    <Table.Cell>{score.count_polygons_entered}</Table.Cell>
                </Table.Row>
                ))
            }
            </Table.Body>
        </Table>) :
        (<div>no scores yet</div>)
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(HighScores);
