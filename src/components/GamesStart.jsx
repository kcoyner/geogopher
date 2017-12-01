import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {withRouter} from "react-router-dom";

class GameStart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true
        };

        this.handleStart = this.handleStart.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleStart() {
        this.setState({ open: false });
        // Function to start timer
    }

    handleClose(){
        this.setState({ open: false });
        this.props.history.push('/');
    }

    render() {
        return(
            <Modal
            open={this.state.open}
            closeOnRootNodeClick={false}
            onClose={this.onClose}>
                <Modal.Header>Ready?</Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    <p>Type as many countries names as you can within the time limit</p>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.handleClose} negative>Go Back</Button>
                    <Button onClick={this.handleStart} positive>Let's Go!</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default withRouter(GameStart);