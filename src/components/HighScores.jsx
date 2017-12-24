/*
 * HighScores.jsx
 */

import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

class HighScores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        scores: [],
        first: {}

    }

    this.getScores = this.getScores.bind(this);
  }

  componentDidMount() {
      this.getScores();
  }

  getScores() {
    axios.get('/api/scores')
    .then(response => {
        const arr = response.data;
        const firstScore = arr.shift();
        console.log(arr, firstScore);
        this.setState({
            scores: arr,
            first: firstScore
        });
        console.log(this.state.scores);
    })
  }

  render() {
    return (
      <div>
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
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(HighScores);
