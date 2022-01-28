import {Navigation} from 'react-native-navigation';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Sales from './pages/Sales';
import ManageProduct from './pages/ManageProduct';
import ProductList from './pages/ProductList';
import EditProduct from './pages/EditProduct';
import Product from './pages/Product';
import SideMenu from './pages/SideMenu';

import {Image,SafeAreaView} from 'react-native';



Navigation.registerComponent('HomePage', () => Home);
Navigation.registerComponent('SalePage', () => Sales);
Navigation.registerComponent('ManageProduct', () => ManageProduct);
Navigation.registerComponent('ProductList', () => ProductList);
Navigation.registerComponent('ProductPage', () =>Product );
Navigation.registerComponent('EditProduct', () =>EditProduct );
Navigation.registerComponent('AboutPage', () => About);

Navigation.registerComponent('SideMenu', () => SideMenu);


const stack={


    id:"CenterScreen",

    children:[
        {
            component:{
                name:'HomePage',
                options:{
                    topBar:{
                        title:{
                            text:"Home",
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



Navigation.events().registerAppLaunchedListener(() => {

    Navigation.setRoot({
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

    });
});


