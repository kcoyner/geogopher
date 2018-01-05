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
    let query = new URLSearchParams(location.search)
    this.state = {
        scores: null,
        first: null,
        selectedGameType: Number(props.match.params.gameTypeId) || 1,
        selectedGame: Number(props.match.params.gameId) || 1,
        selectedDifficulty: Number(props.match.params.gameDiffId) || 1,
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
        const arr = response.data;
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
                <Table.HeaderCell>Time</Table.HeaderCell>
                <Table.HeaderCell>Score</Table.HeaderCell>
                <Table.HeaderCell>Hints Used</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell><Label ribbon>First</Label></Table.Cell>
                    <Table.Cell>{this.state.first.user.username }</Table.Cell>
                    <Table.Cell>{this.state.first.game_timer_start - this.state.first.game_timer_remaining }</Table.Cell>
                    <Table.Cell>{this.state.first.count_polygons_entered + "/" + this.state.first.count_polygons_entered + JSON.parse(this.state.first.polygons_unanswered).length }</Table.Cell>
                    <Table.Cell>{this.state.first.count_total_hints }</Table.Cell>
                </Table.Row>
            {
                this.state.scores.map((score, index) => (
                    
                <Table.Row key={index}>
                    <Table.Cell>{index + 2}</Table.Cell>
                    <Table.Cell>{score.user.username}</Table.Cell>
                    <Table.Cell>{score.game_timer_start - score.game_timer_remaining }</Table.Cell>
                    <Table.Cell>{score.count_polygons_entered + "/"}</Table.Cell>
                    <Table.Cell>{score.count_total_hints }</Table.Cell>
                </Table.Row>
                ))
            }
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='5'>
                    <Menu floated='right' pagination>
                        <Menu.Item as='a' icon>
                        <Icon name='left chevron' />
                        </Menu.Item>
                        <Menu.Item as='a'>1</Menu.Item>
                        <Menu.Item as='a'>2</Menu.Item>
                        <Menu.Item as='a'>3</Menu.Item>
                        <Menu.Item as='a'>4</Menu.Item>
                        <Menu.Item as='a' icon>
                        <Icon name='right chevron' />
                        </Menu.Item>
                    </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table> ) :
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
