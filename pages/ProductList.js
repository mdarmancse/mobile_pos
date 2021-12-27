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
    Image, Alert
} from 'react-native';
import {View,Text,Button,Input,Icon,Footer,FooterTab,Container} from 'native-base';
import Style from "../assets/style";
import RestClient from "../RestApi/RestClient";
import AppUrl from "../RestApi/AppUrl";




class ProductList extends Component {

    constructor(props) {

        super(props);
        this.state = {
            loading: false,
            product_data: [],
            error: null,
        };

    }


    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
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


    ChildView=({ProductId,ProductName,ProductModel,ProductUnit,ProductPrice,ProductImage})=>{
        return(



            <View style={styles.container}>
                <View style={styles.item}>
                    <View style={{flex:40}}>
                        <Image style={{flex:40,height:130,width:110,padding:2}} source={{uri:ProductImage}}/>

                    </View>
                    <View style={{backgroundColor:'white',flex:50}}>
                        <Text  style={[Style.text]}>{ProductName}</Text>
                        <Text style={[Style.text]}>{ProductModel}</Text>
                        <Text  style={[Style.text]}>{ProductUnit}</Text>
                        <Text style={[Style.text]}>{ProductPrice}</Text>

                    </View>
                    <View style={{flex:20,flexDirection:'column'}}>
                        <View style={{flex:1,marginTop:5}}>
                            <Button onPress={() => this._alertIndex(ProductId)}
                                style={{width:'100%'}} info>
                                <Icon type="FontAwesome" name="edit" />

                            </Button>

                        </View>
                        <View style={{flex:1,marginTop:5}}>
                            <Button onPress={() => this._alertIndex(ProductId)}
                                    style={{width:'100%'}} danger>
                                <Icon type="FontAwesome" name="trash" />

                            </Button>

                        </View>

                    </View>
                </View>




            </View>



        );


    }

    render() {


        return (

<SafeAreaView style={{flex:1}}>
    <FlatList keyExtractor={item =>item.product_id}  data={this.state.product_data} renderItem={({item})=><this.ChildView ProductId={item.product_id} ProductName={item.product_name}  ProductModel={item.product_model}  ProductUnit={item.unit} ProductPrice={item.price} ProductImage={item.image} />}/>

</SafeAreaView>








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
