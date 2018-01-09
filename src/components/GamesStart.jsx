import React from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {
  Button,
  Header,
  Image,
  Step,
  Icon,
  Modal,
  Loader } from 'semantic-ui-react';

const countdownGif = require('-!file-loader?name=countdown!../assets/countdown.gif');
const randomselectGif = require('-!file-loader?name=random-select!../assets/random-select.gif');
const geoclickGif = require('-!file-loader?name=geoclick!../assets/geoclick.gif');
const playImgIdle = require('-!file-loader?name=start-thumb-1!../assets/start-thumb-1.png');
const playImgHover = require('-!file-loader?name=start-thumb-2!../assets/start-thumb-2.png');

  @connect((state) => {
    return {
      gameTypes: state.GamesListReducer.gameTypes,
      gameDifficulties: state.GamesListReducer.gameDifficulties,
      gameTypeSelected: state.GameReducer.gameTypeSelected,
      gameDifficultySelected: state.GameReducer.gameDifficultySelected,
      gameTypeDescription: state.GameReducer.gameDifficultySelected,
    }
  })

class GameStart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hoverPlay: false,
        backgroundGif: null,
      }


      this.changePlayImg = this.changePlayImg.bind(this);
    }

    componentWillReceiveProps(){
      if (!this.props.gameTypeSelected) {

      } else {

        if (this.props.gameTypeSelected.toLowerCase() === 'countdown') {
          this.setState({backgroundGif: countdownGif})
        } else if (this.props.gameTypeSelected.toLowerCase() === 'random select') {
          this.setState({backgroundGif: randomselectGif})
        } else {
          this.setState({backgroundGif: geoclickGif})
        }

      }
    }


    changePlayImg(bool) {
      this.setState({hoverPlay: bool})
    }


    render() {

      const loaderStyle = {
        height: '400px',
        maxHeight:'400px'
      }

      let gameDifficulty;

      this.props.gameDifficultySelected ?
      gameDifficulty = this.props.gameDifficultySelected.toUpperCase() :
      null;


        return(

            <Modal
            open={this.props.open}
            dimmer={true}
            closeOnRootNodeClick={false}>

            {

            this.props.mapLoaded

            ?

            <Step.Group ordered attached='top'>
              <Step completed>
                <Step.Content>
                  <Step.Title>Game Name</Step.Title>
                  <Step.Description>{this.props.gameTypeSelected  || "Choose a game type"}</Step.Description>
                </Step.Content>
              </Step>

              <Step completed>
                <Step.Content >
                  <Step.Title>Difficulty</Step.Title>
                  <Step.Description>{gameDifficulty || "Choose a difficulty"}</Step.Description>
                </Step.Content>
              </Step>

              <Step active>
                <Step.Content>
                  <Step.Title>Play</Step.Title>
                  <Step.Description>Start to play</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>

            :

            null

          }

          {

            this.props.mapLoaded

            ?

            <Modal.Content>
              <Modal.Description className="start-game-modal">
                  <div className="get-ready">ARE YOU READY?</div>
                  <div className="play-now"
                       onMouseOver={()=>this.changePlayImg(true)}
                       onMouseOut={()=>this.changePlayImg(false)}
                       onClick={this.props.onStart}>
                    <img src={
                      this.state.hoverPlay ? playImgHover : playImgIdle
                      }/>
                  </div>
                  <div className="play-now-bg">
                      <img src={ this.state.backgroundGif }/>
                  </div>
                  <Button
                    animated
                    className="dont-play"
                    onClick={this.props.onGoBack}>
                      <Button.Content hidden>
                        <Icon name="arrow left"/>
                      </Button.Content>
                      <Button.Content visible>
                        BACK
                      </Button.Content>
                  </Button>
              </Modal.Description>
            </Modal.Content>

            :

            <div className="loader"></div>

          }

          </Modal>
        //end render return
        )
        //end return
        }
//end class
}

export default withRouter(GameStart);
