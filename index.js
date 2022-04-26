import {Navigation} from 'react-native-navigation';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Sales from './pages/Sales';
import ManageProduct from './pages/ManageProduct';
import CartProductList from './pages/CartProductList';
import ProductList from './pages/ProductList';
import EditProduct from './pages/EditProduct';
import Product from './pages/Product';
import SideMenu from './pages/SideMenu';
import Login from "./pages/Login";
import Async from "./helper/Async";
import Nav from "./helper/Navigator";
import {Image, SafeAreaView, TextView} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import React  from 'react';
import construct from "@babel/runtime/helpers/esm/construct";




Navigation.registerComponent('LoginPage', () => Login);
Navigation.registerComponent('HomePage', () => Home);
Navigation.registerComponent('SalePage', () => Sales);
Navigation.registerComponent('ManageProduct', () => ManageProduct);
Navigation.registerComponent('ProductList', () => ProductList);
Navigation.registerComponent('CartProductList', () => CartProductList);
Navigation.registerComponent('ProductPage', () =>Product );
Navigation.registerComponent('EditProduct', () =>EditProduct );
Navigation.registerComponent('AboutPage', () => About);

Navigation.registerComponent('SideMenu', () => SideMenu);



//const user_data=[]







//And can be used later in place of AsyncStorage.getItem(""), which returns the value directly instead of promise
const loginRoot={


    id:"CenterScreen",

    children:[
        {
            component:{
                name:'LoginPage',
            },

        }


    ]

}

const log={
    root:{
        component:{
            name:'LoginPage',
        },
    }


}
const stack={


    id:"CenterScreen",

    children:[
        {
            component:{
                name:'HomePage',
                options:{
                    topBar:{
                        title:{
                            text:"Dashboard",
                            color: 'white',
                        },
                        leftButtons:{
                            icon:require('./assets/images/menu.png'),
                            color: 'white',
                        },
                        background: {
                            color:'#00cccc'
                        }



                    }
                }

            },

        }


    ]

}
const main={
    root:{
        sideMenu:{
            left:{
                component:{
                    name:"SideMenu"
                }
            },
            center:{
                stack
            }
        }
    }


}


// Navigation.setRoot({
//     root:{
//         sideMenu:{
//             left:{
//                 component:{
//                     name:"SideMenu"
//                 }
//             },
//             center:{
//                 stack
//             }
//         }
//     }
//
// });

// const isLogged=2;
Navigation.events().registerAppLaunchedListener(() => {
    AsyncStorage.getItem("user").then(value=>{


        console.log(value)
        Navigation.setRoot(value != null ? main :log);
    })




});














