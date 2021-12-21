import React, {Component} from 'react';
import {View,Tex,Input} from 'native-base';
import {Image,SafeAreaView} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SideMenu from "./SideMenu";

class Sales extends Component {




    render() {
        return (


            <SafeAreaView >

                <Image style={{padding:10,marginRight:50,margin:10,height:'50%',width:'90%'}} source={require('../images/Arman.jpeg')}/>



            </SafeAreaView>
        );
    }
}

export default Sales;
