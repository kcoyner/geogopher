import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {withRouter} from "react-router-dom";

class GameOver extends React.Component {

    render() {
        return(
            <Modal
            open={this.props.open}
            closeOnRootNodeClick={false}>
                <Modal.Header>Game Over</Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    <p>Your score will appear here!</p>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.props.onClose} positive>Play Different Game</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default withRouter(GameOver);