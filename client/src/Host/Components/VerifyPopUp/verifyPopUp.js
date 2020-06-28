import React from 'react'
import {
    StyleSheet,
    Text,
} from 'react-native'
import Dialog from "react-native-dialog";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        position: 'relative',
    },
})


class VerifyPopUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogVisible: this.props.dialogVisible
        }

        this.handleApprove = this.handleApprove.bind(this)
        this.sendApprovedData = this.sendApprovedData.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.sendCancelData = this.sendCancelData.bind(this)
        this.handleDecline = this.handleDecline.bind(this)
        this.sendDeclineData = this.sendDeclineData.bind(this)
    }

    handleApprove() {
        this.setState({ dialogVisible: false });
        this.sendApprovedData()
    }

    handleCancel() {
        this.setState({ dialogVisible: false });
        this.sendCancelData()
    }

    handleDecline() {
        this.setState({ dialogVisible: false });
        this.sendDeclineData()
    }

    sendApprovedData() {
        this.props.closePopUp(this.state.dialogVisible, true);
    }

    sendCancelData() {
        this.props.closePopUp(this.state.dialogVisible, 'cancel');
    }

    sendDeclineData() {
        this.props.closePopUp(this.state.dialogVisible, false);
    }

    render() {
        return (
            <Dialog.Container visible={this.props.dialogVisible}>
                <Dialog.Title>{this.props.subject}</Dialog.Title>
                <Dialog.Description>
                    <Text>{this.props.topTitle}{"\n"}</Text>
                    {this.props.topExplain}{"\n"}{"\n"}
                    <Text>{this.props.midTitle}{"\n"}</Text>
                    {this.props.midExplain}{"\n"}{"\n"}
                    <Text>{this.props.bottomTitle}{"\n"}</Text>
                    {this.props.bottomExplain}
                </Dialog.Description>
                <Dialog.Button label="Approve" onPress={this.handleApprove} />
                <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                {this.props.decline ?
                    <Dialog.Button label="Decline" onPress={this.handleDecline} />
                    : null}
            </Dialog.Container>
        )
    }


}
export default VerifyPopUp
