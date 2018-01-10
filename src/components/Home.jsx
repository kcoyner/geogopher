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

const ctaImg = require('-!file-loader?name=geogopher-cta!../assets/geogopher-cta.png');



class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
      this.goGamesList = this.goGamesList.bind(this);
    }

    componentWillReceiveProps(){

    }

    goGamesList(){
      this.props.history.push('/')
    }

    render() {


        return(
          <div className="home-container">
            <div className="gutter-right"/>
            <div className="gutter-left"/>
            <div className="cta-container">
              <div className="cta-text">
                {'Know the'} <br/> {'world that'} <br/> {'surrounds'} <br/> {'you.'}
              </div>
              <div className="cta-play-now" onClick={this.goGamesList}>PLAY NOW</div>
              <div className="cta-img-overlay">
                <img src={ctaImg} alt=""/>
              </div>
              <div className="geogopher-title">
                GEOGOPHER
              </div>
              <div className="cta-map">
                <div id="finland"></div>
                <div id="germany"></div>
                <div id="mali"></div>
                <div id="cameroon"></div>
                <div id="albania"></div>
                <div id="romania"></div>
                <div id="syria"></div>
                <div id="kazakhstan"></div>
              </div>
            </div>
            <div className="transition-stripe"></div>
            <div className="transition-stripe-2"></div>

            <div className="about-container">




            </div>
        </div>
        )
        //end return
        }
//end class
}

export default withRouter(Home);
