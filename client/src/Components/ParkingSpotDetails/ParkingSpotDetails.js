import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

class ParkingSpotDetails extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>ParkingSpotDetails</Text>
            </View>
        );
    }
}
export default ParkingSpotDetails;


// function ParkingSpotDetails({ navigation }) {
//         return (
//             <View style={styles.container}>
//                 <Text>Profile screen</Text>
//             </View>
//         );
// }
// export default ParkingSpotDetails;
