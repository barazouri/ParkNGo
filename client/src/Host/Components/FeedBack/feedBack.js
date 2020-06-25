import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Dialog from "react-native-dialog"
import { AntDesign } from '@expo/vector-icons'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        position: 'relative',
        textAlign: 'center'
    }
})


class FeedBack extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogVisible: this.props.dialogVisible,
        }

        this.handleCancel = this.handleCancel.bind(this)
        this.sendData = this.sendData.bind(this)
    }

    handleCancel() {
        this.setState({ dialogVisible: false });
        this.sendData()
    }

    sendData() {
        this.props.closePopUp(this.state.dialogVisible, true);
    }

    render() {
        return (
            <View style={styles.container}>
                <Dialog.Container visible={this.props.dialogVisible}>
                    <Dialog.Title>{this.props.subject}</Dialog.Title>
                    <Dialog.Description>
                        <Text>{this.props.topTitle}{"\n"}</Text>
                        <AntDesign name="checkcircleo" size={70} color="#adebad" />
                    </Dialog.Description>
                    <Dialog.Button label="OK" onPress={this.handleCancel} />
                </Dialog.Container>
            </View>
        )
    }
}
export default FeedBack
