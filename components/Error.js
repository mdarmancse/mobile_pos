import React, {Component} from 'react';
import {View, ActivityIndicator, Image, SafeAreaView} from "react-native";
import error_img from '../assets/images/error.jpg'
class Error extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center"}}>

                <Image style={{height:'60%',width:'100%'}} source={require('../assets/images/error.jpg')}/>


            </View>
        );
    }
}

export default Error;
