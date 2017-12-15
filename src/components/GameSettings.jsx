import React from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {
  Button,
  Header,
  Image,
  Checkbox,
  Modal,
  Dropdown } from 'semantic-ui-react';

@connect((state) => {
  return {
    gameTypes: state.GamesListReducer.gameTypes,
    gameDifficulties: state.GamesListReducer.gameDifficulties,
  }
})


class GameStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTypeChoices: null,
      gameDifficultyChoices: null,
      gameTypeDescription: null,
    };
    this.getDifficulties = this.getDifficulties.bind(this);
  }

  componentDidMount() {
    let gameTypeChoices = this.props.gameTypes.map((el)=>{
      let obj = {};
      obj.text = el.game_type_name;
      obj.value = el.game_type_id;
      return obj
    })

    this.setState({gameTypeChoices: gameTypeChoices});
  }

  getDifficulties(e, {value}) {
    this.props.gameTypes.forEach((el) => {
      if (el.game_type_id === value) {
        this.setState({gameTypeDescription: el.game_type_description});
      }
    });


  }
    render() {
        return(
            <Modal
            open={!this.props.open}
            closeOnRootNodeClick={false}>
                <Modal.Header>GAME SETTINGS</Modal.Header>
                <Modal.Content>
                <Modal.Description className="game-settings">
                    <div className="game-type-title">
                      <h2>Select the type of game you want to play</h2>
                    </div>
                    <Dropdown className="game-type-dropdown" placeholder='Select Game Type' fluid selection options={this.state.gameTypeChoices} onChange={this.getDifficulties} />
                    <div className="setting-description">
                      <h3>{this.state.gameTypeDescription}</h3>
                    </div>
                    <div className="game-difficulty-title">
                      <h2>Select a difficulty or play on a fixed time limit</h2>
                    </div>

                      <Button.Group className="game-difficulty-setting">
                        <Button color='green'>Easy</Button>
                        <Button color='grey'>Medium</Button>
                        <Button color='red'>Hard</Button>
                        <Button.Or />
                        <Button color='blue'>1 min</Button>
                        <Button color='blue'>3 min</Button>
                        <Button color='blue'>5 min</Button>
                        <Button color='blue'>10 min</Button>
                      </Button.Group>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.props.onClose} negative>Go Back</Button>
                    <Button onClick={this.props.onStart} positive>Continue</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default withRouter(GameStart);
