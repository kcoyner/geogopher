/*
 * HighScores.jsx
 */

import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Icon, Label, Menu, Table, Dropdown } from 'semantic-ui-react'

class HighScores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        scores: [],
        first: {},
        selectedGameType: 1,
        selectedGame: 1,
        games: 
            [
                {text: 'World Countries', value: 1},
                {text: 'Middle East & North Africa', value: 2},
                {text: 'Europe', value: 3},
                {text: 'Sub-Saharan Africa', value: 4},
                {text: 'Carribean', value: 5},
                {text: 'South America', value: 6},
                {text: 'Russia & Central Asia', value: 7},
                {text: 'South Pacific', value: 8},
                {text: 'East Asia', value: 9},
                {text: 'North America', value: 10},
            ]
        ,
        gameTypes: [
            {text:'Countdown', value: 1},
            {text: 'Random Select', value: 2},
            { text: 'GeoClick', value: 3}
        ]
    }

    this.getScores = this.getScores.bind(this);
    this.onChangeGameType = this.onChangeGameType.bind(this);
    this.onChangeGame = this.onChangeGame.bind(this);
  }

  componentDidMount() {
      this.getScores();
  }

  onChangeGameType(e, data) {
      this.setState({ selectedGameType: data.value }, this.getScores);
  }

  onChangeGame(e, data) {
      this.setState({selectedGame: data.value}, this.getScores);
  }

  getScores() {
    axios.get('/api/scores', { params: {
        game_type_id: this.state.selectedGameType,
        game_id: this.state.selectedGame
    }})
    .then(response => {
        const arr = response.data;
        const firstScore = arr.shift();
        this.setState({
            scores: arr,
            first: firstScore,
        });
        console.log(this.state.games);
    })
  }

  render() {
    return (
      <div>
          <Dropdown value={this.selectedGameType} onChange={this.onChangeGameType} defaultValue={this.state.selectedGameType} fluid selection options={this.state.gameTypes} />
          <Dropdown value={this.selectedGame} onChange={this.onChangeGame} defaultValue={this.state.selectedGame} fluid selection options={this.state.games} />
          { this.state.first ? (
          
          <Table celled>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Place</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Game</Table.HeaderCell>
                <Table.HeaderCell>Score</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell><Label ribbon>First</Label></Table.Cell>
                    <Table.Cell>{this.state.first.user_id}</Table.Cell>
                    <Table.Cell>{this.state.first.game_id}</Table.Cell>
                    <Table.Cell>{this.state.first.count_polygons_entered}</Table.Cell>
                </Table.Row>
            {
                this.state.scores.map((score, index) => (
                <Table.Row key={index}>
                    <Table.Cell>{index + 2}</Table.Cell>
                    <Table.Cell>{score.user_id}</Table.Cell>
                    <Table.Cell>{score.game_id}</Table.Cell>
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
