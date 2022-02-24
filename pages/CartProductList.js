import React, {Component} from 'react';
import {
    SafeAreaView,
    TouchableOpacity,

    FlatList,
    StyleSheet,
    StatusBar,


    List,
    ScrollView,
    Image, Alert, RefreshControl, TextInput
} from 'react-native';
import {View,Text,Button,Input,Icon,Footer,FooterTab,Container,Form,Item,Label} from 'native-base';
import Style from "../assets/style";
import RestClient from "../RestApi/RestClient";
import Loader from '../components/Loader';
import Error from '../components/Error';
import AppUrl from "../RestApi/AppUrl";
import { IconButton, Colors } from 'react-native-paper';


import {SearchBar} from 'react-native-elements';

import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {datetime} from "react-table/src/sortTypes";
// import { AsyncStorage } from 'react-native';


class CartProductList extends Component {

    constructor(props) {

        super(props);
        const elementButton = (value) => (
            <TouchableOpacity onPress={() => this._alertIndex(value)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>{value}</Text>
                </View>
            </TouchableOpacity>
        );
        this.state = {
            loading: false,
            product_data: [],
            error: null,
            pull_refresh:false,
            isLoading:true,
            isError:false,

            searchTerm: "",


            search:"",

            tableHead: ["Item Name", "Model", "Stock", "Price","Status"],
            tableData1: [
                ["T. Walker", "870", "3", "d","ad"],
                ["S. Weintraub", "650", "c", "d","ad"],
                ["M. Clingan", "320", "3", "4","ad"],
                ["S. Lucy", "1010", "c", "d","ad"]
            ]





        };

    }

    static navigationOptions = {
        header: null
    };
    _alertIndex(data,index) {
        console.log(data);
         Alert.alert(`This is row ${data + 1}`);
    }
    componentDidMount(): void {



    const api=    RestClient.GetRequest(AppUrl.product_list).then(result=>{


            let success=result.response.status;
            if (success=='ok'){
                this.setState({
                    product_data: result.response.product_list,isLoading:false,isError:false


                })



            }else {
                this.setState({isLoading:false,isError:true});
            }

        }).catch(error=>{
            this.setState({isLoading:false,isError:true});
        })



    }



    pullRefresh=()=>{


        this.componentDidMount();
    }







    renderHeader=()=>{
        const { search } = this.state;
        return(
            <View  style={[Style.searchBG]}>
            <SearchBar
                placeholder="Search..."
                inputStyle={{backgroundColor: 'white'}}
                containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                // inputContainerStyle={{backgroundColor: '#00cccc'}}
                placeholderTextColor={'#g5g5g5'}
                onChangeText={text=>this.searchAction(text)}
                autoCorrect={false}
                value={search}
                round


            />
            </View>
        )
    }
    searchAction=(text)=>{

        if(text){

            const newData=this.state.product_data.filter(item=>{
                const itemData=`${item.product_name.toUpperCase()}`;
                const textData=text.toUpperCase();
                return itemData.indexOf(textData) > -1;

            });
            this.setState({
                product_data:newData,
                search:text
            });
        }else{

            RestClient.GetRequest(AppUrl.product_list).then(result=>{


                let success=result.response.status;
                if (success=='ok'){
                    this.setState({
                        product_data: result.response.product_list,isLoading:false,isError:false,search:''


                    })



                }else {
                    this.setState({isLoading:false,isError:true});
                }

            }).catch(error=>{
                this.setState({isLoading:false,isError:true});
            })


        }

    }



    renderItem=(item)=>{

        return(
            <View style={styles.container}>

                <View style={styles.item}>

                    <View style={{backgroundColor:'white',flex:85}}>
                        <Text  style={[Style.text]}>{item.product_name} | ৳ {item.price}</Text>
                    </View>



                        <View style={{flex:15,marginTop:5,padding:2}} >
                            <IconButton
                                icon="plus"
                                color={Colors.red500}
                                size={30}
                                onPress={() => this.showConfirmDialogDelete(item.product_id)}
                            />
                        </View>




                </View>




            </View>
            )

    }

    onClickAddCart(data){

        const itemcart = {
            data: data,

        }

        AsyncStorage.getItem('cart').then((datacart)=>{
            if (datacart !== null) {
                // We have data!!
                const cart = JSON.parse(datacart)
                cart.push(itemcart)
                AsyncStorage.setItem('cart',JSON.stringify(cart));
            }
            else{
                const cart  = []
                cart.push(itemcart)
                AsyncStorage.setItem('cart',JSON.stringify(cart));
            }
            alert("Add Cart")
        })
            .catch((err)=>{
                alert(err)
            })
    }



    render() {




        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity >

                <IconButton
                    icon="plus"
                    color={Colors.lightBlue500}
                    size={30}
                    onPress={()=>this._alertIndex(data,index)}
                />
            </TouchableOpacity>
        );
        const tableData = this.state.product_data.map(record=>([record.product_name, record.product_model, record.stock,record.price,'']));



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

                <ScrollView style={styles.container} >
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
                                        data={cellIndex === 4 ? element(cellData, index) : cellData}
                                        textStyle={styles.text}
                                    />
                                ))}
                            </TableWrapper>
                        ))}
                    </Table>


                    {/*<View style={{flex:2}}>*/}
                    {/*    <IconButton*/}
                    {/*        icon="cog"*/}
                    {/*        color={Colors.red600}*/}
                    {/*        size={30}*/}
                    {/*        onPress={() => storeData()}*/}
                    {/*    />*/}
                    {/*</View>*/}
                </ScrollView>



                // <ScrollView >
                //
                //     <FlatList
                //         data={this.state.product_data}
                //         renderItem={({item})=>this.renderItem(item)}
                //         keyExtractor={item =>item.product_id}
                //         ListHeaderComponent={this.renderHeader}
                //         onRefresh={()=>this.pullRefresh()}
                //         refreshing={this.state.pull_refresh}
                //     />
                //
                // </ScrollView>

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
    text: { margin: 6 },
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



export default CartProductList;
