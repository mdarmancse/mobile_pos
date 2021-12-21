import React, {Component} from 'react';
import {View,Text} from 'native-base';
import {Image} from 'react-native';
import {Navigation} from 'react-native-navigation';

class About extends Component {


    render() {
        return (
            <View >

                <Image style={{padding:10,marginRight:50,margin:10,height:'50%',width:'90%'}} source={require('../images/Arman.jpeg')}/>



            </View>
        );
    }
}

export default About;
