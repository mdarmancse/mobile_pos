import axios from 'axios';

import AsyncStorage from "@react-native-async-storage/async-storage";
import {RNToasty} from "react-native-toasty";

class RestClient {


 static GetRequest=(getUrl)=>{
     return axios.get(getUrl).then(response=>{
         return response.data;

     }).catch(error=>{
         return null;
     })

 };

    static PostRequest=(postUrl,postJson)=>{
        let config={
            headers:{'content-type':'multipart/form-data'}

        }

        return axios.post(postUrl,postJson,config).then(response=>{
            return response.data;

        }).catch(error=>{
            return null;
        })

    }

    static cart_product=(data)=>{


        //console.log(data)
        const itemcart = {
            product_name: data[0],
            product_sn: data[1],
            product_model: data[2],
            product_stock: data[3],
            product_rate: data[4],
            product_id: data[5],
            total: 0,
            quantity:1,

        }

        let id=data[5];

        AsyncStorage.getItem('cart').then((datacart)=>{
            if (datacart !== null) {


                // We have data!!
                const cart = JSON.parse(datacart)

                const checkId = (cart, id) => {
                    const requiredIndex = cart.findIndex(el => {
                        return el.product_id === String(id);
                    });


                    if (requiredIndex === -1){
                        cart.push(itemcart)
                        RNToasty.Success({
                            title: 'Add to sale !'
                        })
                        //  ToastAndroid.show("Add to sale !",ToastAndroid.LONG);

                    }else{
                        RNToasty.Error({
                            title: 'Already added in Sale  !'
                        })
                        // ToastAndroid.show("Already added in Sale  !",ToastAndroid.LONG);


                    }
                };
                checkId(cart, id);
                //console.log(cart)
                //
                AsyncStorage.setItem('cart',JSON.stringify(cart));
                // this.setState({plus_btn:true})
            }
            else{
                const cart  = []
                cart.push(itemcart)
                AsyncStorage.setItem('cart',JSON.stringify(cart));
                RNToasty.Success({
                    title: 'Add to sale !'
                })
                // ToastAndroid.show("Add to sale !",ToastAndroid.LONG);
            }

        })
            .catch((err)=>{
                alert(err)
            })

    }

}
export default  RestClient;
