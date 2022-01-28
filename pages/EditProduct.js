import React, {Component} from 'react';
import axios from 'axios';

import {View, Text, Button, Input, Icon, Footer, FooterTab, Container} from 'native-base';
import {Image, SafeAreaView, TextInput, Picker, StatusBar, Alert, ScrollView, FlatList} from 'react-native';

import RestClient from "../RestApi/RestClient";
import AppUrl from "../RestApi/AppUrl";
import { FormItem } from 'react-native-form-component';

import Style from '../assets/style'
import Loader from '../components/Loader';
import Error from '../components/Error';

class About extends Component {


    constructor(props) {
        super(props)
        this.state = {
            category_id: '',
            ptype_id: '',
            supplier_id: '',
            categoryData: [],
            ptypeData: [],
            supplierData: [],
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
            selected_supplier_id: '',
            selected_cat_id: '',
            selected_ptype_id: '',


            isLoading:true,
            isError:false,
        };
    }

    componentDidMount(): void {


        var product_id = this.props.product_id;
        RestClient.GetRequest(AppUrl.product_editdata + '/?product_id=' + product_id).then(result => {
            //  console.log(result.response.productinfo.product_data.product_id)

            let data = result.response.productinfo.product_data;
            let success=result.response.status;

            if (success=='ok'){
                this.setState({
                    product_name: data.product_name,
                    barcode: data.product_id,
                    unit: data.unit,
                    sn: data.serial_no,
                    product_model: data.product_model,
                    sale_price: data.price,
                    vat: data.tax,

                    selected_cat_id: data.category_id,
                    category_name: data.category_name,
                    selected_ptype_id: data.ptype_id,
                    product_type: data.ptype_name,


                    selected_supplier_id: result.response.productsupplier.supplier_id,
                    supplier_name: result.response.productsupplier.supplier_name,
                    supplier_price: result.response.productsupplier.supplier_price,

                    isLoading:false,isError:false


                })

            }else{
                this.setState({isLoading:false,isError:true});

            }


        }).catch(error => {
            this.setState({isLoading:false,isError:true});
        })

        RestClient.GetRequest(AppUrl.category_list).then(result => {

            this.setState({categoryData: result.response.categories})

        }).catch(error => {

        })
        RestClient.GetRequest(AppUrl.ptype_list).then(result => {

            this.setState({ptypeData: result.response.product_type})

        }).catch(error => {

        })
        RestClient.GetRequest(AppUrl.supplier_list).then(result => {

            this.setState({supplierData: result.response.suppliers})

        }).catch(error => {

        })


    }
    updateProduct=(productId)=>{


        let formData=new FormData();
        formData.append('product_id',productId);
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


        RestClient.PostRequest(AppUrl.Update_product,formData).then(result => {
            console.log(result)

            Alert.alert('Product Updated');

        }).catch(error => {

        })
    }

    nameOnchange=(text)=>{

        this.setState({product_name:text});

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





    render() {

        const categoryData = this.state.categoryData;
        const myCatView = categoryData.map(categoryData => {
            return (

                <Picker.Item label={categoryData.category_name} value={categoryData.category_id}/>
            )
        });

        const ptypeData = this.state.ptypeData;
        const ptypeView = ptypeData.map(ptypeData => {
            return (

                <Picker.Item label={ptypeData.ptype_name} value={ptypeData.ptype_id}/>
            )
        });

        const supplierData = this.state.supplierData;
        const supplierView = supplierData.map(supplierData => {
            return (


                <Picker.Item label={supplierData.supplier_name} value={supplierData.supplier_id}/>
            )
        })



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

                <ScrollView>
                    <SafeAreaView style={{flex: 100, width: '100%', height: '100%'}}>


                        <View style={{flex: 20, flexDirection: 'row'}}>

                            <View style={{flex: 10, marginTop: 5, marginBottom: 5}}>

                                <Text style={[Style.text]}>Product:</Text>
                                <TextInput
                                    placeholder="Product Name"
                                    style={[Style.textInput]}
                                    value={this.state.product_name}
                                    onChangeText={text => this.nameOnchange(text)}

                                />
                                <Text style={[Style.text]}>SN:</Text>
                                <TextInput
                                    placeholder="SN"
                                    style={[Style.textInput]}
                                    value={this.state.sn}
                                    onChangeText={text => this.snOnchange(text)}
                                />
                                <Text style={[Style.text]}>Category:</Text>
                                <View
                                    style={[Style.textInput]}>
                                    <Picker
                                        selectedValue={this.state.category_id}
                                        style={{height: 40, color: 'grey'}}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({category_id: itemValue})

                                        }


                                    >
                                        <Picker.Item label={this.state.category_name} value={this.state.selected_cat_id}/>
                                        {myCatView}
                                    </Picker>
                                </View>

                                <Text style={[Style.text]}>Model:</Text>
                                <TextInput
                                    placeholder="Model"
                                    style={[Style.textInput]}
                                    value={this.state.product_model}
                                    onChangeText={text => this.modelOnchange(text)}
                                />

                                <Text style={[Style.text]}>Sale Price:</Text>
                                <TextInput
                                    placeholder="Sale Price"
                                    style={[Style.textInput]}
                                    value={this.state.sale_price}
                                    onChangeText={text => this.salePriceOnchange(text)}
                                />
                                <Text style={[Style.text]}>Supplier Name:</Text>
                                <View
                                    style={[Style.textInput]}>
                                    <Picker
                                        selectedValue={this.state.supplier_id}
                                        style={{height: 40, color: 'grey'}}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({supplier_id: itemValue})

                                        }


                                    >
                                        <Picker.Item label={this.state.supplier_name}
                                                     value={this.state.selected_supplier_id}/>
                                        {supplierView}
                                    </Picker>
                                </View>
                                {/*{myView}*/}


                            </View>

                            <View style={{flex: 10, marginTop: 5, marginBottom: 5}}>

                                <Text style={[Style.text]}>Barcode:</Text>
                                <TextInput
                                    placeholder="Barcode"
                                    style={[Style.textInput]}
                                    value={this.state.barcode}
                                />
                                <Text style={[Style.text]}>Unit:</Text>
                                <TextInput
                                    placeholder="Unit"
                                    style={[Style.textInput]}
                                    value={this.state.unit}
                                    onChangeText={text => this.unitOnchange(text)}
                                />
                                <Text style={[Style.text]}>Product Type:</Text>
                                <View
                                    style={[Style.textInput]}>
                                    <Picker
                                        selectedValue={this.state.ptype_id}
                                        style={{height: 40, color: 'grey'}}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ptype_id: itemValue})

                                        }


                                    >
                                        <Picker.Item label={this.state.product_type} value={this.state.selected_ptype_id}/>
                                        {ptypeView}
                                    </Picker>
                                </View>
                                <Text style={[Style.text]}>VAT/TAX:</Text>
                                <TextInput
                                    placeholder="VAT/TAX"
                                    style={[Style.textInput]}
                                    value={this.state.vat}
                                    onChangeText={text => this.taxOnchange(text)}
                                />

                                <Text style={[Style.text]}>Supplier Price:</Text>
                                <TextInput
                                    placeholder="Supplier Price"
                                    style={[Style.textInput]}
                                    value={this.state.supplier_price}
                                    onChangeText={text => this.supplierPriceOnchange(text)}
                                />




                            </View>


                        </View>

                        <Footer>
                            <FooterTab>
                                <Button style={{backgroundColor: '#00cccc'}}

                                        onPress={() => this.updateProduct(this.state.barcode)}>
                                    <Text style={[Style.textBtn]}>Update</Text>
                                </Button>
                            </FooterTab>
                        </Footer>

                    </SafeAreaView>

                </ScrollView>

            )
        }



    }
}

export default About;
