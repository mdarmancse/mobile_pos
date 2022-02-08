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
import {Navigation} from "react-native-navigation";
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';

 // import SearchableFlatlist from "searchable-flatlist";
import {SearchBar} from 'react-native-elements';

class CartProductList extends Component {

    constructor(props) {

        super(props);
        this.state = {
            loading: false,
            product_data: [],
            error: null,
            pull_refresh:false,
            isLoading:true,
            isError:false,

            searchTerm: "",


            search:"",



        };

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

    render() {


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

                <ScrollView >






                    <FlatList
                        data={this.state.product_data}
                        renderItem={({item})=>this.renderItem(item)}
                        keyExtractor={item =>item.product_id}
                        ListHeaderComponent={this.renderHeader}
                        onRefresh={()=>this.pullRefresh()}
                        refreshing={this.state.pull_refresh}
                    />







                </ScrollView>

            )
        }


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

    sContainer: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },

});

export default CartProductList;
