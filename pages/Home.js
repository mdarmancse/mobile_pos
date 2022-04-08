import React, { Component, Fragment } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {ImageBackground,SafeAreaView} from 'react-native'
import {Navigation} from 'react-native-navigation';

var items = [
    {
        id: 1,
        name: 'JavaScript',
    },
    {
        id: 2,
        name: 'Java',
    },
    {
        id: 3,
        name: 'Ruby',
    },
    {
        id: 4,
        name: 'React Native',
    },
    {
        id: 5,
        name: 'PHP',
    },
    {
        id: 6,
        name: 'Python',
    },
    {
        id: 7,
        name: 'Go',
    },
    {
        id: 8,
        name: 'Swift',
    },
];
class Home extends Component {

constructor(props) {
    super(props)
    Navigation.events().bindComponent(this);
    this.state = {
        selectedItems: [
            {
                id: 7,
                name: 'Go',
            },
            {
                id: 8,
                name: 'Swift',
            }
        ]
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


    render() {
        return (

        <>
        </>
        );
    }
}

export default Home;
