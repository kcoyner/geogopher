/*
 * HighScores.jsx
 */

import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Icon, Label, Menu, Table, Dropdown } from 'semantic-ui-react';
import { capitalizeWords } from '../utils/capitalizeFirst';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

class HighScores extends React.Component {
  constructor(props) {
    super(props);
    let query = new URLSearchParams(location.search)
    this.state = {
        scores: null,
        first: null,
        selectedGameType: Number(props.match.params.gameTypeId) || 1,
        selectedGame: Number(props.match.params.gameId) || null,
        selectedDifficulty: Number(props.match.params.gameDiffId) || 1,
        games: null,
        gameTypes: null,
        gameDifficulties: null,
        total: null,
        activeItem: 0
    }
    this.getScores = this.getScores.bind(this);;
    this.getGameAttributes = this.getGameAttributes.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onPageClick = this.onPageClick.bind(this);
    this.getGameTotal = this.getGameTotal.bind(this);
  }

    componentDidMount() {
      this.getGameAttributes();


  }

  onChange(e, data) {
      if(data.name === "selectedGame") {
          const gameTotal = this.getGameTotal(this.state.games, data.value);
          this.setState({
              selectedGame: data.value,
              total: gameTotal,
              activeItem: 0
          }, this.getScores)
      } else {
        const obj = {}
        obj[data.name] = data.value;
        obj['activeItem'] = 0;
        this.setState(obj, this.getScores);
      }
  }

  onChangePage(e, { name }) {
      if( name === "increment" && this.state.activeItem < this.state.scores.length){
        const increment = this.state.activeItem + 1;
        this.setState({ activeItem: increment });
      }
      if(name === "decrement" && this.state.activeItem >  0){
        const decrement = this.state.activeItem - 1;
        this.setState({ activeItem: decrement });
      }
  }

  onPageClick(e, { value }) {
    this.setState({ activeItem: value })
  }

  getGameTotal(gameArr, gameId) {
    for(let i in gameArr) {
        if(gameArr[i].value === gameId) {
            return gameArr[i].total;
        }
    }
  }

  getGameAttributes() {
      axios.get('/api/gameslist')
      .then(response => {
          let games = [];
          response.data.forEach(element => {
              let values = {};
              values['game_id'] = element.game_id;
              values['max_count_polygons'] = element.max_count_polygons;
              let game = Object.assign({}, { value: element.game_id, text: element.game_name, total: element.max_count_polygons });
              games.push(game);
          })
          if(this.state.selectedGame === null) {
            this.setState({
                games: games,
                selectedGame: games[0].value,
                total: games[0].total
            });
          } else {
              const gametotal = this.getGameTotal(games, this.state.selectedGame);
              this.setState({
                games: games,
                total: gametotal
            })
          }
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
            const gameName = capitalizeWords(element.game_type_name)
            const type = Object.assign({}, { value: element.game_type_id, text: gameName });
            types.push(type);
          })
          this.setState({
              gameDifficulties: difficulties,
              gameTypes: types
          })
          this.getScores();
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
        const firstScore = arr.length > 0 ? arr[0].shift() : null;
        this.setState({
            scores: arr,
            first: firstScore,
        });
    })

  }

  render() {
    const { activeItem } = this.state.activeItem;
    return (
      <div className="hs-container">
        <div className="gap"></div>
        <div className="hs-title">HIGH SCORES<br/>Create an account to see your high scores</div>
        <div className="dropdowns">
          <Dropdown name="selectedGameType" onChange={this.onChange} defaultValue={this.state.selectedGameType} fluid selection options={this.state.gameTypes} />
          <Dropdown name="selectedGame" onChange={this.onChange} value={this.state.selectedGame} fluid selection options={this.state.games} />
          <Dropdown name="selectedDifficulty" onChange={this.onChange} defaultValue={this.state.selectedDifficulty} fluid selection options={this.state.gameDifficulties} />
        </div>

          { this.state.first ? (

          <Table className="hs-table" celled>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Place</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Score</Table.HeaderCell>
                <Table.HeaderCell>Time Remaining</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
                { this.state.activeItem === 0 ? (
                <Table.Row>
                    <Table.Cell><Label ribbon>First</Label></Table.Cell>
                    <Table.Cell>{this.state.first.user.username }</Table.Cell>
                    <Table.Cell>{this.state.first.count_polygons_entered + "/" + this.state.total }</Table.Cell>
                    <Table.Cell>{ moment.duration(this.state.first.game_timer_remaining, "seconds").format() }</Table.Cell>
                </Table.Row>
                ) : (null)

                }

            {
                this.state.scores[this.state.activeItem].map((score, index) => (
                <Table.Row key={index}>
                    <Table.Cell>{(this.state.activeItem === 0) ? index + 2 : this.state.activeItem * 10 + index + 1}</Table.Cell>
                    <Table.Cell>{score.user.username}</Table.Cell>
                    <Table.Cell>{score.count_polygons_entered + "/" + this.state.total}</Table.Cell>
                    <Table.Cell>{ moment.duration(score.game_timer_remaining, "seconds").format() }</Table.Cell>
                </Table.Row>
                ))
            }
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='5'>
                    <Menu floated='right' pagination>
                        <Menu.Item name="decrement" onClick={this.onChangePage} as='a' icon>
                        <Icon name='left chevron' />
                        </Menu.Item>
                        {
                             this.state.scores.map((scoreArr, index) => (
                                <Menu.Item
                                onClick={this.onPageClick}
                                active={this.state.activeItem === index}
                                value={index}
                                key={index}
                                as='a'>{index + 1}
                                </Menu.Item>
                            ))
                        }
                        <Menu.Item name="increment" as='a' icon onClick={this.onChangePage}>
                        <Icon name='right chevron' />
                        </Menu.Item>
                    </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table> ) :
        (<div className="no-scores">No scores yet! <br/> Make an account and get high scores!</div>)
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
