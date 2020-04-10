import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

class UploadPark extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>UploadPark</Text>
            </View>
        );
    }
}
export default UploadPark;