import React, { Component, Fragment } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity, ScrollView,
} from "react-native";
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Text,
    Body,
} from 'native-base';

import {Navigation} from 'react-native-navigation';
import RestClient from "../RestApi/RestClient";
import AppUrl from "../RestApi/AppUrl";
import {RNToasty} from "react-native-toasty";
import {Button,Icon} from 'native-base';
import Style from "../assets/style";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Async from "../helper/Async";
import Nav from "../helper/Navigator";
import Loader from "../components/Loader";
import Error from "../components/Error";

class Home extends Component {

constructor(props) {
    super(props)
    Navigation.events().bindComponent(this);
    this.state = {

        email:'',
        password:'',

        count_data:[],

        pull_refresh:false,
        isLoading:true,
        isError:false,

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

    retrieveData =() => {
        RestClient.GetRequest(AppUrl.dashboard_content,).then(result => {

            let success=result.response.status;
            if (success==200){
                this.setState({
                    count_data: result.response,isLoading:false,isError:false


                })



            }else {
                this.setState({isLoading:false,isError:true});
            }



        }).catch(error => {
            this.setState({isLoading:false,isError:true});
        })
    };









    render() {

        const count_data = this.state.count_data;


        if (this.state.isLoading == true) {

            return (
                <Loader/>
            )

        } else if (this.state.isError == true) {

            return (
                <Error/>
            )

        } else {

            return (

                <>
                    <ScrollView>
                        <Container>
                            <Content padder>
                                <Card>
                                    <CardItem header bordered style={{backgroundColor: "rgba(123,236,155,0.65)"}}>
                                        <Text style={[Style.cardHead]}>Total Product</Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Body style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                            <Text style={[Style.cardFont]}> {count_data.total_product}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem footer bordered>
                                        <Text onPress={Nav.goMangeProduct} style={[Style.cardHead]}>Manage
                                            Product</Text>
                                    </CardItem>
                                </Card>

                                <Card>
                                    <CardItem header bordered style={{backgroundColor: "rgba(224,227,95,0.65)"}}>
                                        <Text style={[Style.cardHead]}>Total Sales</Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Body style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                            <Text style={[Style.cardFont]}> {count_data.total_sale}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem footer bordered>
                                        <Text style={[Style.cardHead]}>Manage Sales</Text>
                                    </CardItem>
                                </Card>

                                <Card>
                                    <CardItem header bordered style={{backgroundColor: "rgba(239,171,144,0.65)"}}>
                                        <Text style={[Style.cardHead]}>Total Customer</Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Body style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                            <Text style={[Style.cardFont]}> {count_data.total_customer}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem footer bordered>
                                        <Text style={[Style.cardHead]}>Manage Customer</Text>
                                    </CardItem>
                                </Card>
                                <Card>
                                    <CardItem header bordered style={{backgroundColor: "rgba(86,229,214,0.65)"}}>
                                        <Text style={[Style.cardHead]}>Total Supplier</Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Body style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                            <Text style={[Style.cardFont]}> {count_data.total_supplier}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem footer bordered>
                                        <Text style={[Style.cardHead]}>Manage Supplier</Text>
                                    </CardItem>
                                </Card>
                            </Content>
                        </Container>
                    </ScrollView>
                </>
            );
        }
    }
}


export default Home;
