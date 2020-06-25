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


class ExplanationPopUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogVisible: this.props.dialogVisible
        }

        this.handleCancel = this.handleCancel.bind(this)
        this.sendData = this.sendData.bind(this)
    }

    handleCancel() {
        this.setState({ dialogVisible: false });
        this.sendData()
    }

    sendData() {
        this.props.closePopUp(this.state.dialogVisible);
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
                <Dialog.Button label="OK" onPress={this.handleCancel} />
            </Dialog.Container>
        )
    }


}
export default ExplanationPopUp
