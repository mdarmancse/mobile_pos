import React, { Component, Fragment } from 'react';
import {View, Tex, Input, Button, Icon, Text} from 'native-base';
import {
    Alert,
    Image,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SideMenu from "./SideMenu";
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Cell, Row, Table, TableWrapper} from "react-native-table-component";
import RestClient from "../RestApi/RestClient";
import AppUrl from "../RestApi/AppUrl";
import {Colors, IconButton} from "react-native-paper";
import Style from "../assets/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import Error from "../components/Error";

import { Col, Row as RW, Grid } from 'react-native-easy-grid';


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

            tableHead: ['Item Name','SN','Av Qty','Qty', 'Rate','Total', 'Action'],
            widthArr: [100, 100,100, 150,100, 100,100],


            product_data:[],


            dataCart:[],
            qty:"1",
            total:"0",




        }
    }

    componentDidMount(): void {


        RestClient.GetRequest(AppUrl.product_list).then(result=>{

            this.setState({
                product_data: result.response.product_list


            })




        }).catch(error=>{

        })



        AsyncStorage.getItem('cart').then((cart)=>{
            if (cart !== null) {
                // We have data!!
                const cartfood = JSON.parse(cart)
                this.setState({dataCart:cartfood})

            }
        })
            .catch((err)=>{
                alert(err)
            })



    }

    removeValue = async (i) => {
        const dataCar = this.state.dataCart
        dataCar.splice(i,1)
        this.setState({dataCart:dataCar})

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
                            text:'Select Product',
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


    pullRefresh=()=>{
        this.componentDidMount();
    }
    qtyOnchange=(text,i)=>{
        const dataCar = this.state.dataCart
         dataCar[i].quantity = text;
        this.setState({dataCart:dataCar})
    }

    clearCart = async () => {
        try {
            await AsyncStorage.clear();
            const dataCar = this.state.dataCart
            let length=dataCar.length;
            dataCar.splice(0,length)
            this.setState({dataCart:dataCar})

        } catch(e) {

        }


    }



    render() {
        const dataCar = this.state.dataCart;
        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity >

                <IconButton
                    icon="delete"
                    color={Colors.red600}
                    size={20}
                    onPress={()=>this.removeValue(index)}
                />
            </TouchableOpacity>
        );

        const qty = (data,i) => (

            <TextInput
                style={[Style.SalestextInput]}
                keyboardType = 'numeric'
                onChangeText={text => this.qtyOnchange(text,i)}
                  value={dataCar[i].quantity}

            />
        );


        const tableData = this.state.dataCart.map((record,i)=>([record.product_name,record.product_sn,record.product_stock,'', record.product_rate,record.quantity*record.product_rate,'']));



        if (this.state.isLoading==true){

            return (
                <Loader/>
            )

        }else if (this.state.isError==true){

            return (
                <Error/>
            )

        }else{

            return (

                <ScrollView style={styles.container}

                            refreshControl={
                                <RefreshControl
                                    refreshing={false}
                                    onRefresh={this.pullRefresh}
                                />
                            }
                >
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



                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row
                            data={state.tableHead}
                            style={styles.head}
                            textStyle={styles.text}
                        />
                        {tableData.map((rowData, index) => (
                            <TableWrapper key={index} style={styles.row}>
                                {rowData.map((cellData, cellIndex) => (
                                    <Cell
                                        key={cellIndex}
                                        data={cellIndex === 6 ? element(cellData, index):cellIndex === 3 ? qty(cellData,index) : cellData}
                                        textStyle={styles.text}
                                    />

                                ))}


                            </TableWrapper>
                        ))}
                    </Table>


                    <View style={{flex: 1,flexDirection:'row',justifyContent:'flex-end',paddingTop:30}}>
                        <Button iconLeft success onPress={this.clearCart}>
                            <Icon name="trash" />
                            <Text style={[Style.addManageBtn]}>Clear</Text>

                        </Button>
                    </View>









                </ScrollView>





            )
        }



    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: "#f0f3f5"
    },
    head: { height: 40, backgroundColor: "#00cccc" },
    text: { margin: 6,fontSize:10 },
    row: { flexDirection: "row", backgroundColor: "white" },
    btn: {
        width: 58,
        height: 18,
        backgroundColor: "black",
        borderRadius: 2,
        alignSelf: "center"
    },
    btnText: { textAlign: "center", color: "#fff" }
});


const style = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
        padding: 16,
        paddingTop: 100,
        backgroundColor: '#fff',
    },
    cell: {
        borderWidth: 1,
        borderColor: '#ddd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Sales;
