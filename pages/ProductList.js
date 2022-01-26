import React, {Component} from 'react';
import {
    SafeAreaView,
    TouchableOpacity,

    FlatList,
    StyleSheet,

    StatusBar,

    SearchBar,
    List,
    ScrollView,
    Image, Alert, RefreshControl, TextInput
} from 'react-native';
import {View,Text,Button,Input,Icon,Footer,FooterTab,Container,Form,Item,Label} from 'native-base';
import Style from "../assets/style";
import RestClient from "../RestApi/RestClient";
import AppUrl from "../RestApi/AppUrl";
import { IconButton, Colors } from 'react-native-paper';
import {Navigation} from "react-native-navigation";
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';




class ProductList extends Component {

    constructor(props) {

        super(props);
        this.state = {
            loading: false,
            product_data: [],
            error: null,
            pull_refresh:false,
        };

    }

    goEditProduct=(product_id)=>{

        Navigation.push('CenterScreen',{

            component:{
                name:'EditProduct',
                color: 'white',
                passProps: {
                    product_id: product_id,

                },
                options:{

                    sideMenu:{
                        left:{
                            visible:false,


                        }

                    },
                    topBar:{
                        title:{
                            text:'Edit Product',
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

    goAddProduct=()=>{
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

    componentDidMount(): void {



        RestClient.GetRequest(AppUrl.product_list).then(result=>{

            this.setState({
                product_data: result.response.product_list


            })


        }).catch(error=>{

        })



    }



    pullRefresh=()=>{


        this.componentDidMount();
    }


     showConfirmDialogDelete = (ProductId) => {
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to remove this product?",
            [

                {
                    text: "Yes",
                    onPress: () => {
                        this.productDelete(ProductId);
                    },
                },

                {
                    text: "No",
                },
            ]
        );
    };
    productDelete=(product_id)=> {

        RestClient.GetRequest(AppUrl.delete_product+'/?product_id='+product_id).then(result=>{

            this.componentDidMount();




        }).catch(error=>{

        })
    }

    ChildView=({ProductId,ProductName,ProductModel,ProductUnit,ProductPrice,ProductImage})=>{
        return(



            <View style={styles.container}>
                <View style={styles.item}>
                    <View style={{flex:40}}>
                        <Image style={{height:100,width:100,padding:2}} source={{uri:ProductImage}}/>

                    </View>
                    <View style={{backgroundColor:'white',flex:40}}>
                        <Text  style={[Style.text]}>{ProductName}</Text>
                        <Text style={[Style.text]}>{ProductModel}</Text>
                        <Text  style={[Style.text]}>{ProductUnit}</Text>
                        <Text style={[Style.text]}>{ProductPrice}</Text>

                    </View>
                    <View style={{flex:30,flexDirection:"row"}}>

                        {/*<View style={{flex:1,marginTop:5}}>*/}

                        {/*    <Button onPress={() => this._alertIndex(ProductName)}*/}
                        {/*        style={{width:'100%'}} danger>*/}
                        {/*        <Icon type="FontAwesome" name="trash" />*/}

                        {/*    </Button>*/}

                        {/*</View>*/}
                        <View style={{flex:1,marginTop:5,padding:2}} >
                            <IconButton
                                icon="pencil"
                                color={Colors.lightBlue500}
                                size={30}
                                onPress={() => this.goEditProduct(ProductId)}
                            />
                        </View>
                        <View style={{flex:1,marginTop:5,padding:2}} >
                            <IconButton
                                icon="delete"
                                color={Colors.red500}
                                size={30}
                                onPress={() => this.showConfirmDialogDelete(ProductId)}
                            />
                        </View>



                    </View>
                </View>




            </View>



        );


    }

    render() {


        return (

<ScrollView >

    <View style={{flex:2,flexDirection:'row',marginTop:5,marginBottom:5}}>

        <View style={{flex:1}}>
            <Button iconLeft style={{width:'100%'}}  onPress={this.goAddProduct} dark>
                <Icon type="FontAwesome" name="plus" />
                <Text style={[Style.addManageBtn]}>Add Product</Text>
            </Button>

        </View>

        <View style={{flex:1}}>
            <Button iconLeft style={{width:'100%'}}   disabled success>
                <Icon type="FontAwesome"  name="cog" />
                <Text style={[Style.addManageBtn]}>Manage Product</Text>
            </Button>

        </View>



    </View>

    <View  style={[Style.searchBG]}>
    <TextInput
        placeholder="Search..."
        style={[Style.textInputSearch]}

    />
    </View>




    <FlatList keyExtractor={item =>item.product_id}
              data={this.state.product_data}
              renderItem={({item})=><this.ChildView ProductId={item.product_id} ProductName={item.product_name}  ProductModel={item.product_model}  ProductUnit={item.unit} ProductPrice={item.price} ProductImage={item.image} />}
              onRefresh={()=>this.pullRefresh()}
              refreshing={this.state.pull_refresh}
    />

</ScrollView>









        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 7,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    item: {

        padding: 2,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor:'white',
        height:'20%',
        flexDirection:'row'

    },
    title: {
        fontSize: 32,
    },
});

export default ProductList;
