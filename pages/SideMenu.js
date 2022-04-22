import React, {Component} from 'react';
import {Button, Icon, Text, View} from 'native-base';
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {Navigation} from 'react-native-navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Async from "../helper/Async";



class SideMenu extends Component {

    constructor(props) {
        super(props);

        this.state={

            user_data:[]
        }
    }

    componentDidMount(): void {

        this._retrieveData();
    }

    goProduct=()=>{
        Navigation.push('CenterScreen',{

            component:{
                name:'ProductPage',
                color: 'white',

                options:{

                    sideMenu:{
                        left:{
                            visible:false,


                        }

                    },
                    topBar:{
                        title:{
                            text:'Products',
                            color: 'white',

                        },

                        background: {
                            color:'#00cccc'
                        },
                        backButton: { color: '#ffffff' }


                    }
                }
            }


        })



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
                        backButton: { color: '#ffffff' }


                    }
                }
            }


        })



    }
    goAbout=()=>{
        Navigation.push('CenterScreen',{

            component:{
                name:'AboutPge',
                color: 'white',

                options:{

                    sideMenu:{
                        left:{
                            visible:false,


                        }

                    },
                    topBar:{
                        title:{
                            text:'About me',
                            color: 'white',

                        },
                        background: {
                            color:'#00cccc'
                        },
                        backButton: { color: '#ffffff' }


                    }
                }
            }


        })



    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                // We have data!!


                this.setState({user_data:JSON.parse(value)})


            }
        } catch (error) {
            // Error retrieving data
        }
    };

    onLogout=()=>{

        Async.clearData();

    }

    render() {
        const state=this.state;
        return (
            <View style={{flex:2}}>



                <View style={{flex:0.40,marginRight:60,backgroundColor:'white'}}>
                    <View style={{flex:1,flexDirection:'row',backgroundColor:'#00cccc',
                        justifyContent:'center'}}>

                        <View >
                            <Image style={[styles.image]} source={{uri: state.user_data.image}}/>
                            <Text style={[styles.text]}>{state.user_data.user_name} </Text>
                            <Text style={[styles.email_text]}>{state.user_data.user_email}</Text>
                        </View>


                    </View>

                </View>
                <View style={{flex:1,marginRight:60,backgroundColor:'white'}}>
                    <View style={{flex:1,backgroundColor:'white',marginTop:40,marginLeft:5}}>


                        <View style={{flexDirection:'row',marginTop:5}}>
                            <Icon size={10} color="#4F8EF7" style = {{alignSelf:'center'}} type="FontAwesome" name="industry" />

                            <Text onPress={this.goSales} style={{marginLeft:8}}>Sales</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:20}}>
                            <Icon type="FontAwesome" name="cart-plus" />

                            <Text onPress={this.goProduct} style={{marginLeft:8}}>Products</Text>
                        </View>
                    <View style={{flexDirection:'row',marginTop:20}}>
                        <Icon type="FontAwesome" name="info-circle" />

                        <Text onPress={this.goAbout} style={{marginLeft:8}}>About Me</Text>
                    </View>
                        <View style={{marginTop:20,flexDirection:'row'}}>

                            <Icon type="FontAwesome" name="share-alt" />
                            <Text style={[styles.side_menu_text,{marginLeft:8}]}>Share</Text>
                        </View>

                        <View style={{marginTop:20,flexDirection:'row'}}>

                            <Icon type="FontAwesome" name="rocket" />
                            <Text onPress={this.onLogout}style={[styles.side_menu_text,{marginLeft:8}]}>Log Out</Text>
                        </View>

                    </View>

                </View>

            </View>
        );

    }


}
const styles = StyleSheet.create({
    profileImgContainer: {
        flex: 0.5,
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "red",
        marginTop: 17,
    },
        text: {
            color: 'white',
            fontSize: 17,
            fontWeight: 'bold',
            fontStyle: 'italic',
            padding:10

        },
        email_text: {
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            fontStyle: 'italic'
        },
        side_menu_text: {
            color: 'black',
            fontSize: 18,




        },
        wordBold: {
            fontWeight: 'bold',
            color: 'black'
        },
        italicText: {
            color: '#37859b',
            fontStyle: 'italic'
        },
        textShadow: {
            textShadowColor: 'red',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius : 5
        },
    image: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "rgba(16,0,0,0.5)"
    }



});




export default SideMenu;
