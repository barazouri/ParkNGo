import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

class Profile extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Profile</Text>
            </View>
        );
    }
}
export default Profile;