import React, {Component} from 'react';
import {Button, Icon, Text, View} from 'native-base';
import {Image,StyleSheet} from "react-native";
import {Navigation} from 'react-native-navigation';



class SideMenu extends Component {

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


                    }
                }
            }


        })



    }


    render() {
        return (
            <View style={{flex:2}}>



                <View style={{flex:0.27,marginRight:60,backgroundColor:'white'}}>
                    <View style={{flex:1,flexDirection:'row',backgroundColor:'#00cccc',
                        justifyContent:'center'}}>

                        <View style={[styles.profileImgContainer,{ borderColor: 'black', borderWidth:2 }]}>
                            <Image source={require("../images/dp.png")}/>
                        </View>
                        <View style={{flex:0.5,justifyContent:'center'}}>

                                <Text style={[styles.text]}>Md Arman Ullah </Text>
                            <Text style={[styles.email_text]}>amd55077@gmail.com</Text>


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
        }



});




export default SideMenu;
