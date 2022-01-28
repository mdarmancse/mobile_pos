import React, {Component} from 'react';
import { View, ActivityIndicator } from "react-native";
class Loader extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center"}}>

                <ActivityIndicator size="large" color="#00cccc" />
            </View>
        );
    }
}

export default Loader;
