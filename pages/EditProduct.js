import React, {Component } from 'react';
import axios from "axios";
import  {useState, useEffect} from 'react';
import {View,Text,Button,Input,Icon,Footer,FooterTab,Container} from 'native-base';
import {Image, SafeAreaView, TextInput, Picker, StatusBar, Alert} from 'react-native';
import {Navigation} from 'react-native-navigation';
import RestClient from "../RestApi/RestClient";
import AppUrl from "../RestApi/AppUrl";





import Style from '../assets/style'



class About extends Component {



    constructor(props) {
        super(props)
        this.state = {
            category_id: '',
            ptype_id: '',
            supplier_id: '',
            categoryData:[],
            ptypeData:[],
            supplierData:[],
            barcode:''

        };
    }

    componentDidMount(): void {



        var product_id=this.props.product_id;
        RestClient.GetRequest(AppUrl.product_editdata+'/?product_id='+product_id).then(result=>{
          //  console.log(result.response.productinfo.product_data.product_id)

            this.setState({barcode: result.response.productinfo.product_data.product_id})

        }).catch(error=>{

        })

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

            <Container>
            <SafeAreaView style={{flex:100,width:'100%',height:'100%'}}>


                <View style={{flex:20,flexDirection:'row'}}>

                    <View style={{flex:10,marginTop:5,marginBottom:5}}>

                        <Text style={[Style.text]}>Product:</Text>
                        <TextInput
                            placeholder="Product Name"
                            style={[Style.textInput]}

                        />
                        <Text style={[Style.text]}>SN:</Text>
                        <TextInput
                            placeholder="SN"
                            style={[Style.textInput]}
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
                        />

                        <Text style={[Style.text]}>Sale Price:</Text>
                        <TextInput
                            placeholder="Sale Price"
                            style={[Style.textInput]}
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
                            value={this.state.barcode}
                        />
                        <Text style={[Style.text]}>Unit:</Text>
                        <TextInput
                            placeholder="Unit"
                            style={[Style.textInput]}
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
                        />
                        <Text style={[Style.text]}>Image:</Text>
                        <TextInput
                            placeholder="Image"
                            style={[Style.textInput]}
                        />
                        <Text style={[Style.text]}>Supplier Price:</Text>
                        <TextInput
                            placeholder="Supplier Price"
                            style={[Style.textInput]}
                        />


                    </View>




                </View>

                        <Footer >
                            <FooterTab>
                                <Button style={{backgroundColor:'#00cccc'}}>
                                    <Text style={[Style.textBtn]}>Update</Text>
                                </Button>
                            </FooterTab>
                        </Footer>

            </SafeAreaView>

    </Container>


        );
    }
}

export default About;
