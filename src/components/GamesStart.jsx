import React from 'react';
import {withRouter} from "react-router-dom";
import {
  Button,
  Header,
  Image,
  Modal } from 'semantic-ui-react';

class GameStart extends React.Component {

    render() {
        return(
            <Modal
            open={!this.props.open}
            closeOnRootNodeClick={false}>
                <Modal.Header>Ready?</Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    <p>Type as many countries names as you can within the time limit</p>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.props.onClose} negative>Go Back</Button>
                    <Button onClick={this.props.onStart} positive>Let's Go!</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default withRouter(GameStart);
