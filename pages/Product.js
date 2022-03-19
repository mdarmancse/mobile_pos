import React, {Component } from 'react';
import axios from "axios";
import  {useState, useEffect} from 'react';
import {View,Text,Button,Input,Icon,Footer,FooterTab,Container,Form,Item,Label} from 'native-base';
import {Image, SafeAreaView, TextInput, Picker, StatusBar, Alert, ScrollView} from 'react-native';
import {Navigation} from 'react-native-navigation';
import RestClient from "../RestApi/RestClient";
import AppUrl from "../RestApi/AppUrl";

import Loader from '../components/Loader';
import Error from '../components/Error';



import Style from '../assets/style'
// import {Form} from "react-native-form-component";





class About extends Component {
    state = {
        category_id: '',
        ptype_id: '',
        supplier_id: '',
        product_name: '',
        barcode: '',
        sn: '',
        unit: '',
        category_name: '',
        product_type: '',
        product_model: '',
        vat: '',
        sale_price: '',
        supplier_name: '',
        supplier_price: '',


        categoryData:[],
        ptypeData:[],
        supplierData:[],

        isLoading:true,
        isError:false,
    };

    componentDidMount(): void {


        RestClient.GetRequest(AppUrl.category_list).then(result=>{

                this.setState({categoryData: result.response.categories})



        }).catch(error=>{

        })
        RestClient.GetRequest(AppUrl.ptype_list).then(result=>{

                this.setState({ptypeData: result.response.product_type})

        }).catch(error=>{

        })
        RestClient.GetRequest(AppUrl.supplier_list).then(result=>{

                this.setState({supplierData: result.response.suppliers})

        }).catch(error=>{

        })


    }

    goMangeProduct=()=>{
        Navigation.push('CenterScreen',{

            component:{
                name:'ProductList',
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


    nameOnchange=(text)=>{

        this.setState({product_name:text});

    }
    barcodeOnchange=(text)=>{

        this.setState({barcode:text});

    }

    snOnchange=(text)=>{

        this.setState({sn:text});

    }

    unitOnchange=(text)=>{

        this.setState({unit:text});

    }
    modelOnchange=(text)=>{

        this.setState({product_model:text});

    }

    taxOnchange=(text)=>{

        this.setState({vat:text});

    }
    salePriceOnchange=(text)=>{

        this.setState({sale_price:text});

    }

    supplierPriceOnchange=(text)=>{

        this.setState({supplier_price:text});

    }

    AddProduct=()=>{
        let formData=new FormData();
        formData.append('product_id',this.state.barcode);
        formData.append('product_name',this.state.product_name);
        formData.append('model',this.state.product_model);
        formData.append('price',this.state.sale_price);
        formData.append('tax',this.state.vat);
        formData.append('serial_no',this.state.sn);
        formData.append('unit',this.state.unit);
        formData.append('ptype_id',this.state.ptype_id);
        formData.append('category_id',this.state.category_id);
        formData.append('supplier_id',this.state.supplier_id);
        formData.append('supplier_price',this.state.supplier_price);


        RestClient.PostRequest(AppUrl.insert_product,formData).then(result => {
            console.log(result)

            Alert.alert('Product Inserted');

        }).catch(error => {

        })
    }


    render() {

        const categoryData=this.state.categoryData;
        const myCatView=categoryData.map(categoryData=>{
            return(

             <Picker.Item label={categoryData.category_name} value={categoryData.category_id} />
        )}) ;

        const ptypeData=this.state.ptypeData;
        const ptypeView=ptypeData.map(ptypeData=>{
            return(

             <Picker.Item label={ptypeData.ptype_name} value={ptypeData.ptype_id} />
        )}) ;

        const supplierData=this.state.supplierData;
        const supplierView=supplierData.map(supplierData=>{
            return(

             <Picker.Item label={supplierData.supplier_name} value={supplierData.supplier_id} />
        )})

        return (
            <>
            <ScrollView>
            <SafeAreaView style={{flex:100,width:'100%',height:'100%'}}>
                <View style={{flex:2,flexDirection:'row'}}>

                    <View style={{flex:1,marginTop:5,marginBottom:5}}>
                        <Button iconLeft style={{width:'100%'}} disabled dark>
                            <Icon type="FontAwesome" name="plus" />
                            <Text style={[Style.addManageBtn]}>Add Product</Text>
                        </Button>

                    </View>
                    <View style={{flex:1,marginTop:5,marginBottom:5}}>
                        <Button onPress={this.goMangeProduct}
                            iconLeft  style={{width:'100%'}} success>
                            <Icon name='cog' />
                            <Text style={[Style.addManageBtn]}>Manage Product</Text>
                        </Button>

                    </View>






                </View>




                <View style={{flex:20,flexDirection:'row'}}>

                    <View style={{flex:10,marginTop:5,marginBottom:5}}>

                        <Text style={[Style.text]}>Product:</Text>
                        <TextInput
                            placeholder="Product Name"
                            style={[Style.textInput]}
                            onChangeText={text => this.nameOnchange(text)}
                        />
                        <Text style={[Style.text]}>SN:</Text>
                        <TextInput
                            placeholder="SN"
                            style={[Style.textInput]}
                            onChangeText={text => this.snOnchange(text)}
                        />
                        <Text style={[Style.text]}>Category:</Text>
                        <View
                            style={[Style.textInput]}>
                        <Picker
                            selectedValue={this.state.category_id}
                            style={{ height: 40,color:'grey' }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({category_id: itemValue})

                            }


                        >
                            {myCatView}
                        </Picker>
                        </View>

                        <Text style={[Style.text]}>Model:</Text>
                        <TextInput
                            placeholder="Model"
                            style={[Style.textInput]}
                            onChangeText={text => this.modelOnchange(text)}
                        />

                        <Text style={[Style.text]}>Sale Price:</Text>
                        <TextInput
                            placeholder="Sale Price"
                            style={[Style.textInput]}
                            onChangeText={text => this.salePriceOnchange(text)}
                        />
                        <Text style={[Style.text]}>Supplier Name:</Text>
                        <View
                            style={[Style.textInput]}>
                            <Picker
                                selectedValue={this.state.supplier_id}
                                style={{ height: 40,color:'grey' }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({supplier_id: itemValue})

                                }


                            >
                                {supplierView}
                            </Picker>
                        </View>
                        {/*{myView}*/}



                    </View>

                    <View style={{flex:10,marginTop:5,marginBottom:5}}>

                        <Text style={[Style.text]}>Barcode:</Text>
                        <TextInput
                            placeholder="Barcode"
                            style={[Style.textInput]}
                            onChangeText={text => barcodeOnchange(text)}
                        />
                        <Text style={[Style.text]}>Unit:</Text>
                        <TextInput
                            placeholder="Unit"
                            style={[Style.textInput]}
                            onChangeText={text => this.unitOnchange(text)}
                        />
                        <Text style={[Style.text]}>Product Type:</Text>
                        <View
                            style={[Style.textInput]}>
                            <Picker
                                selectedValue={this.state.ptype_id}
                                style={{ height: 40,color:'grey' }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ptype_id: itemValue})

                                }


                            >
                                {ptypeView}
                            </Picker>
                        </View>
                        <Text style={[Style.text]}>VAT/TAX:</Text>
                        <TextInput
                            placeholder="VAT/TAX"
                            style={[Style.textInput]}
                            onChangeText={text => this.taxOnchange(text)}
                        />

                        <Text style={[Style.text]}>Supplier Price:</Text>
                        <TextInput
                            placeholder="Supplier Price"
                            style={[Style.textInput]}
                            onChangeText={text => this.supplierPriceOnchange(text)}
                        />


                    </View>




                </View>














            </SafeAreaView>

    </ScrollView>
                <Footer >
                    <FooterTab>
                        <Button type="submit" style={{backgroundColor:'#00cccc'}}
                                onPress={() => this.AddProduct()}>
                            <Text style={[Style.textBtn]}>Add Product</Text>
                        </Button>
                    </FooterTab>
                </Footer>
</>
        );
    }
}

export default About;
