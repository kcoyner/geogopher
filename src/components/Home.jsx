import React from 'react';
import {withRouter} from "react-router-dom";
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


class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    componentWillReceiveProps(){

    }

    render() {


        return(

            <div>assah</div>
        )
        //end return
        }
//end class
}

export default withRouter(Home);
