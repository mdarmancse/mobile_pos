import React, { Component, Fragment } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";

import {Navigation} from 'react-native-navigation';
import RestClient from "../RestApi/RestClient";
import AppUrl from "../RestApi/AppUrl";
import {RNToasty} from "react-native-toasty";
import {Button,Icon} from 'native-base';
import Style from "../assets/style";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Async from "../helper/Async";
import Nav from "../helper/Navigator";

class Home extends Component {

constructor(props) {
    super(props)
    Navigation.events().bindComponent(this);
    this.state = {

        email:'',
        password:''

    }

}

    navigationButtonPressed({componentId}){
        Navigation.mergeOptions(this.props.componentId,{
            sideMenu: {
                left: {
                    visible: true

                }
            }
        });

    }

    componentDidMount(): void {

        this.retrieveData()

    }

    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value== null) {
                Nav.goLoginPage();
            }
        } catch (error) {
            // Error retrieving data
        }
    };









    render() {


        return (

        <>
            <Text>Home Page</Text>

        </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 60,
        width:200,
        height:70
    },

    inputView: {
        backgroundColor: "rgba(236,204,123,0.65)",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#00cccc",
    },
});
export default Home;
