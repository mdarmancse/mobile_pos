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

    goSales=()=>{
        Navigation.push('CenterScreen',{

            component:{
                name:'SalePage',
                color: 'white',

                options:{

                    sideMenu:{
                        left:{
                            visible:false,


                        }

                    },
                    topBar:{
                        title:{
                            text:'Sales',
                            color: 'white',

                        },

                        background: {
                            color:'#00cccc'
                        },


                    }
                }
            }


        })



    }
    on_login=()=>{
        let formData=new FormData();
        formData.append('email',this.state.email);
        formData.append('password',this.state.password);



        RestClient.PostRequest(AppUrl.login,formData).then(result => {
            // console.log(result)
            if (result.response.status=='ok') {

                this.goSales();
            }else{

                RNToasty.Error({
                    title: 'Login Failed..! Please check your username and password!!'
                })
            }


        }).catch(error => {

        })
    }

    render() {


        return (

        <>

            <View style={styles.container}>
                <Image style={styles.image} source={require("../assets/images/log2.png")} />


                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({email:text})}

                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password."
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={text => this.setState({password:text})}

                    />
                </View>

                {/*<TouchableOpacity>*/}
                {/*    <Text style={styles.forgot_button}>Forgot Password?</Text>*/}
                {/*</TouchableOpacity>*/}

                <TouchableOpacity style={styles.loginBtn} onPress={this.on_login}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: "rgba(123,236,236,0.72)",
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
