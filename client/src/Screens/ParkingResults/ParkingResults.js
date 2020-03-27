import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ParkingCardList from '../../Components/ParkingCardList/ParkingCardList'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

class ParkingResults extends React.Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <ParkingCardList></ParkingCardList>
            </View>
        );
    }
}
export default ParkingResults;