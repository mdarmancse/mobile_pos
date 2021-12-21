import React, {Component} from 'react';
import {Text, View,Button} from 'native-base';
import {ImageBackground,SafeAreaView} from 'react-native'
import {Navigation} from 'react-native-navigation';

class Home extends Component {

constructor(props) {
    super(props)
    Navigation.events().bindComponent(this);

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


    render() {
        return (
            <SafeAreaView style={{flex:1}}>

            </SafeAreaView>
        );
    }
}

export default Home;
