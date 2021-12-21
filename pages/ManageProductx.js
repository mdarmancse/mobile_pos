import React, { useState, useEffect } from 'react';
import {DataTable, Text} from 'react-native-paper';
import RestClient from "../RestApi/RestClient";
import AppUrl from "../RestApi/AppUrl";
import * as Alert from "react-native";
import axios from 'axios';
const optionsPerPage = [2, 3, 4];

state = {

    product_data:[],
};




const ManageProductx = () => {




    const [page, setPage] = React.useState([]);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    const [data, setData] = React.useState({ hits: [] });

    useEffect(() => {
        (async () => {
            const result = await axios.get(
                AppUrl.product_list
            );
            setData(result.data.response.product_list);
        })();
    }, []);
   // console.log(data)

    this.setState({product_data: data})
    console.log(this.state.data())

    React.useEffect(() => {
        setTimeout(() => {
            setPage([0]);

           // console.log(posts);
        }, 1000);
    }, [itemsPerPage]);



    // const myProductView=data.hits.map(item=>{
    //     return(
    //
    //
    //
    //         <DataTable.Row style={{ borderWidth: 1 }}>
    //             <DataTable.Cell style={{ borderLeftWidth: 1 }}>{item.product_name}</DataTable.Cell>
    //             <DataTable.Cell style={{ borderLeftWidth: 1 }}>{item.product_model}</DataTable.Cell>
    //             <DataTable.Cell style={{ borderLeftWidth: 1 }}>{item.unit}</DataTable.Cell>
    //             <DataTable.Cell style={{ borderLeftWidth: 1 }}>{item.price}</DataTable.Cell>
    //             <DataTable.Cell style={{ borderLeftWidth: 1 }}>{item.price}</DataTable.Cell>
    //
    //         </DataTable.Row>
    //
    //
    //
    //     )}) ;




    return (


        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Dessert</DataTable.Title>
                <DataTable.Title >Calories</DataTable.Title>
                <DataTable.Title >Fat</DataTable.Title>
                <DataTable.Title >Fat</DataTable.Title>
                <DataTable.Title >Fat</DataTable.Title>
            </DataTable.Header>


                {/*{this.state.product_data.map(item => (*/}
                {/*    <DataTable.Row style={{ borderWidth: 1 }}>*/}
                {/*        <DataTable.Cell >{item.product_name}</DataTable.Cell>*/}
                {/*        <DataTable.Cell >{item.product_model}</DataTable.Cell>*/}
                {/*        <DataTable.Cell >{item.unit}</DataTable.Cell>*/}
                {/*        <DataTable.Cell >{item.price}</DataTable.Cell>*/}
                {/*        <DataTable.Cell >{idtem.price}</DataTable.Cell>*/}

                {/*    </DataTable.Row>*/}
                {/*))}*/}

            <DataTable.Pagination
                page={page}
                numberOfPages={3}
                onPageChange={(page) => setPage(page)}
                label="1-2 of 6"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={'Rows per page'}
            />
        </DataTable>


    );
}

export default ManageProductx;
