import React, { Component, Fragment } from 'react';
import {View, Tex, Input, Button, Icon, Text} from 'native-base';
import {Image, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SideMenu from "./SideMenu";
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Row, Table} from "react-native-table-component";
import RestClient from "../RestApi/RestClient";
import AppUrl from "../RestApi/AppUrl";
import {Colors, IconButton} from "react-native-paper";
import Style from "../assets/style";

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
class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],

            tableHead: ['Product Name', 'Model', 'Unit', 'Price', 'Action'],
            widthArr: [100, 100, 100, 100, 100],
            widthArr2: [30, 30, 40, 50, 40],

            product_data:[],
            tableHeadT: ['Head', 'Head2', 'Head3', 'Head4','Action'],


        }
    }

    componentDidMount(): void {


        RestClient.GetRequest(AppUrl.product_list).then(result=>{

            this.setState({
                product_data: result.response.product_list


            })

            // console.log(this.state.product_data)


        }).catch(error=>{

        })



    }

    goProductList=()=>{
        Navigation.push('CenterScreen',{

            component:{
                name:'CartProductList',
                color: 'white',

                options:{

                    sideMenu:{
                        left:{
                            visible:false,


                        }

                    },
                    topBar:{
                        title:{
                            text:'Cart Product',
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

        const tableData = this.state.product_data.map(record=>([record.product_name, record.product_model, record.unit, record.product_name]));

        return (
            <Fragment>


                <ScrollView style={{flex:1}}>
                    <View style={{flex:10,flexDirection:'row'}}>

                        <View style={{flex:8}}>


                            <SearchableDropdown
                                multi={true}
                                selectedItems={this.state.selectedItems}
                                onItemSelect={(item) => {
                                    const items = this.state.selectedItems;
                                    items.push(item)
                                    this.setState({ selectedItems: items });
                                }}
                                containerStyle={{ padding: 5 }}
                                onRemoveItem={(item, index) => {
                                    const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                                    this.setState({ selectedItems: items });
                                }}
                                itemStyle={{
                                    padding: 10,
                                    marginTop: 2,
                                    backgroundColor: '#ddd',
                                    borderColor: '#bbb',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                itemTextStyle={{ color: '#222' }}
                                itemsContainerStyle={{ maxHeight: 140 }}
                                items={items}
                                // defaultIndex={2}
                                chip={true}
                                resetValue={false}
                                textInputProps={
                                    {
                                        placeholder: "Search your product..",
                                        // underlineColorAndroid: "transparent",
                                        style: {
                                            padding: 12,
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            borderRadius: 5,
                                        },
                                        // onTextChange: text => alert(text)
                                    }
                                }
                                listProps={
                                    {
                                        // nestedScrollEnabled: true,
                                    }
                                }
                            />
                        </View>

                        <View style={{flex:2}}>
                            <IconButton
                                icon="plus"
                                color={Colors.lightBlue500}
                                size={30}
                                onPress={() => this.goProductList()}
                            />
                        </View>

                    </View>

                </ScrollView>





            </Fragment>


        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#00cccc' },
    text: { maxWidth:80,textAlign: 'center', fontWeight: '100' },
    head_text: { maxWidth:80,textAlign: 'center', fontWeight: 'bold',color:'white' },
    dataWrapper: { marginTop: -1 },
    row: { flex:2,height: 40, backgroundColor: '#E7E6E1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});


const cell_styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 50, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flex:5,flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 50, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});

export default Sales;
