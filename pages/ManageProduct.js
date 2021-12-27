import React, {Component,useState,useEffect} from 'react';

import {View, Text, Input, Button, Icon} from 'native-base';
import {Image, TouchableOpacity, ScrollView , StyleSheet,Alert} from 'react-native';

import { Table, Row, Rows,Cell,TableWrapper } from 'react-native-table-component';
import RestClient from "../RestApi/RestClient";
import AppUrl from "../RestApi/AppUrl";
import Style from "../assets/style";




class ManageProduct extends Component {

    constructor(props) {

        super(props);


        this.state = {
            tableHead: ['Product Name', 'Model', 'Unit', 'Price', 'Action'],
            widthArr: [100, 100, 100, 100, 100],
            widthArr2: [30, 30, 40, 50, 40],

            product_data:[],
            tableHeadT: ['Head', 'Head2', 'Head3', 'Head4','Action'],
            tableData: [
                ['1', '2', '3', '4','4'],
                ['a', 'b', 'c', 'd','4'],
                ['1', '2', '3', '4','4'],
                ['a', 'b', 'c', 'd','4']
            ]
        }
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


    render() {
        const elementButton = (value) => (
            <TouchableOpacity onPress={() => this._alertIndex(value)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Delete</Text>
                </View>
            </TouchableOpacity>
        );
        const state = this.state;

        const btns = (data, index) => (
            <View style={{flex:2,flexDirection:'row'}}>

                <View style={styles.btn}>
                    <Button onPress={() => this._alertIndex(index)}
                              style={{width:'100%'}} danger>
                        <Icon name='trash' />

                    </Button>

                </View>





            </View>



        );


        const tableData = this.state.product_data.map(record=>([record.product_name, record.product_model, record.unit, record.product_name]));

        return (


            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    <View>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            {/*<Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.head_text}/>*/}
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                <Row data={state.tableHead}
                                     widthArr={state.widthArr}
                                     style={styles.header}
                                     textStyle={styles.head_text}
                                />
                                {
                                    tableData.map((rowData, index) => (
                                        <Table key={index} style={styles.row} >
                                            {

                                                <Row
                                                    key={index}

                                                    data={rowData === 3 ? btns(rowData, index) : rowData}
                                                    widthArr={state.widthArr}
                                                    style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                                                    textStyle={styles.text}
                                                />

                                            }
                                        </Table>
                                    ))
                                }
                            </Table>
                        </ScrollView>
                    </View>



                </ScrollView>
                <ScrollView horizontal={true} style={cell_styles.container}>
                    <Table borderStyle={{borderColor: 'transparent'}}>
                        <Row  data={state.tableHead} style={cell_styles.head} textStyle={styles.text}/>
                        {
                            tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={cell_styles.row}     >
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell
                                                widthArr={state.widthArr}
                                                key={cellIndex}
                                                  data={cellIndex === 3 ? elementButton(cellData, index) : cellData}
                                                  textStyle={cell_styles.text}
                                            />
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                </ScrollView>
            </View>

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

export default ManageProduct;
