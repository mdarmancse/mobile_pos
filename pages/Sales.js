import React, { Component, Fragment,createRef} from 'react';
import {View, Tex, Input, Button, Icon, Text, Footer, FooterTab} from 'native-base';
import {
    Alert,
    Image, Picker,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ToastAndroid
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
import Async from "../helper/Async";
import {RNToasty} from "react-native-toasty";



class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
            selectedCust: [],
            customer_name:'',
            customer_id:'',

            tableHead: ['Item Name','SN','Av Qty','Qty', 'Rate','Total', 'Action'],
            widthArr: [100, 100,100, 150,100, 100,100],


            product_data:[],
            customer_data:[],


            dataCart:[],
            qty:"1",
            total:"0",

            discount:'',
            tax:'',
            paid_amount:'',
            due_amount:'',


            grand_total:'0.00',
            gg:'0.00',






        }


    }


    componentDidMount(): void {


        RestClient.GetRequest(AppUrl.product_list_drop).then(result=>{

            this.setState({
                product_data: result.response.product_list


            })


        }).catch(error=>{

        })

        RestClient.GetRequest(AppUrl.customer_list_drop).then(result=>{

            this.setState({
                customer_data: result.response.customer_list


            })

        }).catch(error=>{

        })

      this.car_data();
        this.calculation();


    }



    removeValue = async (i) => {
        const dataCar = this.state.dataCart
        dataCar.splice(i,1)
        this.setState({dataCart:dataCar})

        this.calculation()
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
        let rate=dataCar[i].product_rate
         dataCar[i].quantity = text;
         dataCar[i].total = text*rate;
        this.setState({dataCart:dataCar})
        this.calculation()
    }

    clearCart = async () => {
        try {
            await AsyncStorage.clear();
            const dataCar = this.state.dataCart
            let length=dataCar.length;
            dataCar.splice(0,length)
            this.setState({
                dataCart:dataCar,

            })
            this.calculation()

        } catch(e) {

        }


    }


    car_data=()=>{

        AsyncStorage.getItem('cart').then((cart)=>{
            if (cart !== null) {
                // We have data!!
                const cartfood = JSON.parse(cart)
                this.setState({dataCart:cartfood})

            }
        }).catch((err)=>{
            //alert(err)
        })

    }


    onClickAddCart(data){


        const item_data=[
            data.name,data.serial_no,data.product_model,data.stock,data.price,data.id,
        ]

        Async.cart_product(item_data);
       // console.log(this.state.dataCart)
        setTimeout( () => {
            this.car_data();
            this.calculation()
        },1000);


    }
    calculation=()=>{


        const dataCar = this.state.dataCart;


        let paid_amount=this.state.paid_amount;
        let due_amount=this.state.due_amount;
        let tax=this.state.tax;
        let discount=this.state.discount;
        let sum=0;
        Object.values(dataCar).forEach((x)=>sum+= parseInt(x.total));
        let grand_total=sum-discount;

        let dues=grand_total-paid_amount

        this.setState({
            due_amount:dues.toFixed(2),
            grand_total:grand_total.toFixed(2),


        });

        //   console.log(this.state.due_amount)


    }

    full_paid=()=>{

        let grand_total=this.state.grand_total;

        this.setState({
            due_amount:'0.00',
            paid_amount:grand_total,

        })

    }

    invoice_entry=()=>{

        let formData=new FormData();

        let product_data=JSON.stringify(this.state.dataCart)
        formData.append('customer_id',this.state.customer_id);
        formData.append('paid_amount',this.state.paid_amount);
        formData.append('due_amount',this.state.due_amount);
        formData.append('grand_total',this.state.grand_total);
        formData.append('total_discount',this.state.discount);
        formData.append('tax',this.state.tax);
        formData.append('product_data',product_data);


        RestClient.PostRequest(AppUrl.insert_sale,formData).then(result => {
            console.log(result)
            RNToasty.Success({
                title: 'Add sale successfully !'
            })



        }).catch(error => {
            console.log(error)
        })

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

               // value={dataCar[i].quantity}
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
                <>

                <ScrollView style={styles.container}
                            keyboardShouldPersistTaps = 'always'
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
                                multi={false}
                                selectedItems={this.state.selectedItems}
                                onItemSelect={(item) => {


                                    const items = this.state.selectedItems;
                                    items.push(item)
                                    this.setState({ selectedItems: items });
                                    this.onClickAddCart(item);

                                    //alert(item.id)
                                    //alert(item)
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
                                itemsContainerStyle={{ maxHeight: 200,zIndex:-2 }}
                                items={this.state.product_data}
                                defaultIndex={2}
                                chip={false}
                                resetValue={false}
                                textInputProps={
                                    {
                                        placeholder: "Select Product..",
                                        // underlineColorAndroid: "transparent",
                                        style: {
                                            padding: 12,
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            borderRadius: 5,
                                        },
                                        //onTextChange: text => alert(text)
                                    }
                                }
                                listProps={
                                    {
                                        nestedScrollEnabled: true,
                                    }
                                }
                            />
                        </View>

                        <View style={{flex:2}}>

                            <IconButton
                                icon="plus"
                                variant="solid"
                                color={Colors.green700}
                                size={30}
                                onPress={() => this.goProductList()}
                            />

                        </View>



                    </View>
                        <View style={{flex:10,flexDirection:'row'}}>

                            <View style={{flex:8}}>

                                {/*<TextInput*/}

                                {/*    style={[Style.textInput]}*/}
                                {/*    value={this.state.customer_id}*/}

                                {/*/>*/}
                                <SearchableDropdown
                                    selectedItems={this.state.selectedCust}
                                    onItemSelect={(item) => {
                                        const items = this.state.selectedCust;
                                        items.push(item)
                                        this.setState({ selectedCust: items,customer_name:item.name,customer_id:item.id });

                                    }}
                                    containerStyle={{ padding: 5 }}
                                    onRemoveItem={(item, index) => {
                                        const items = this.state.selectedCust.filter((sitem) => sitem.id !== item.id);
                                        this.setState({ selectedCust: items });
                                    }}
                                    itemStyle={{
                                        padding: 10,
                                        marginTop: 2,
                                        backgroundColor: '#ddd',
                                        borderColor: '#bbb',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                    itemTextStyle={{ color: '#0a0a0a' }}
                                    itemsContainerStyle={{ maxHeight: 200}}
                                    items={this.state.customer_data}
                                    defaultIndex={2}
                                    chip={false}
                                    resetValue={false}
                                    textInputProps={
                                        {
                                            placeholder: "Select Customer..",
                                            underlineColorAndroid: "transparent",
                                            style: {
                                                padding: 12,
                                                borderWidth: 1,
                                                borderColor: '#ccc',
                                                borderRadius: 5,
                                            },
                                            value:state.customer_name
                                            // onTextChange: text => alert(text)
                                        }
                                    }
                                    listProps={
                                        {
                                            nestedScrollEnabled: true,
                                        }
                                    }
                                />
                            </View>



                        </View>



                    <SafeAreaView style={{flex:100,width:'100%',height:'100%',padding: 5}}>




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
                        <Button iconLeft danger onPress={this.clearCart}>
                            <Icon name="trash" />
                            <Text style={[Style.addManageBtn]}>Clear</Text>

                        </Button>
                    </View>


                        <View style={{flex:20,flexDirection:'row'}}>

                            <View style={{flex:10,marginTop:5,marginBottom:5}}>

                                <Text style={[Style.text]}>Discount:</Text>
                                <TextInput
                                    placeholder="0.00"
                                    keyboardType='numeric'
                                    style={[Style.textInput]}
                                    onChangeText={text => this.setState({discount:text})}
                                    onEndEditing={() => this.calculation()}


                                />

                                <Text style={[Style.text]}>Tax:</Text>
                                <TextInput
                                    placeholder="0.00"
                                    keyboardType='numeric'
                                    style={[Style.textInput]}
                                    onChangeText={text => this.setState({tax:text})}
                                    onEndEditing={() => this.calculation()}

                                />







                            </View>

                            <View style={{flex:10,marginTop:5,marginBottom:5}}>

                                <Text style={[Style.text]}>Paid Amount:</Text>
                                <TextInput
                                    placeholder="0.00"
                                    keyboardType='numeric'
                                    style={[Style.textInput]}
                                    onChangeText={text => this.setState({paid_amount: text})}
                                    onEndEditing={() => this.calculation()}
                                    value={this.state.paid_amount}
                                />
                                <Text style={[Style.text]}>Due Amount:</Text>

                                <TextInput
                                    value={this.state.due_amount}
                                    keyboardType='numeric'
                                    editable = {false}
                                    style={[Style.textInput]}
                                    onChangeText={text => this.setState({due_amount:text})}
                                    onEndEditing={() => this.calculation()}

                                />


                            </View>




                        </View>






                </SafeAreaView>

                </ScrollView>


            <Footer>

                <FooterTab>
                    <Button type="submit" style={{backgroundColor:'red'}}
                            onPress={() => this.AddProduct()}>
                        <Text style={[Style.textFooterBtn]}>Submit With Print</Text>
                    </Button>
                    <Button type="submit" style={{backgroundColor:'green'}}
                            onPress={() => this.invoice_entry()}>
                        <Text style={[Style.textFooterBtn]}>Submit</Text>
                    </Button>

                    <Button  style={{backgroundColor:'black'}}
                             onPress={() => this.full_paid()}>
                        <Text style={[Style.textFooterBtn]}>Full Paid</Text>
                    </Button>
                    <View disabled style={{backgroundColor:'golden',width:100}}
                          >
                        <Text style={[Style.textFooterBtn]}>Grand Total:</Text>
                        <Text style={[Style.textFooterBtn]}>{this.state.grand_total} TK</Text>
                    </View>

                </FooterTab>
            </Footer>


            </>
            )
        }



    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",


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
        borderColor: 'blue'
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
