

import AsyncStorage from "@react-native-async-storage/async-storage";
import {RNToasty} from "react-native-toasty";
import {Navigation} from "react-native-navigation";
import RestClient from "../RestApi/RestClient";
import AppUrl from "../RestApi/AppUrl";

class Navigator {


    static goAddProduct=()=>{
        Navigation.push('CenterScreen',{

            component:{
                name:'ProductPage',
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
                        backButton: { color: '#ffffff' }


                    }
                }
            }


        })



    }
     static goMangeProduct=()=>{
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
                        backButton: { color: '#ffffff' }


                    }
                }
            }


        })



    }



    static goLoginPage= () => {

            Navigation.push('CenterScreen',{

                component:{
                    name:'LoginPage',
                    options: {
                        topBar: {
                            visible: false,
                            drawBehind: true,
                            animate: false,
                        },
                        sideMenu: {

                            left: {
                                visible: false,
                                enabled: false
                            }

                        },
                    }
                },




            })



        }

    static goSales=()=>{
        Navigation.push('CenterScreen',{

            component:{
                name:'SalePage',
                color: 'white',

                options:{

                    sideMenu:{
                        left:{
                            visible:false,


                        }

                    },
                    topBar:{
                        title:{
                            text:'Sales',
                            color: 'white',

                        },

                        background: {
                            color:'#00cccc'
                        },
                        backButton: { color: '#ffffff' },


                    }
                }
            }


        })

    }

     static  goHome=()=>{
        Navigation.push('CenterScreen',{

            component:{
                name:'HomePage',
                color: 'white',

                options:{

                    sideMenu:{
                        left:{
                            visible:false,


                        }

                    },
                    topBar:{
                        title:{
                            text:'Dashboard',
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

    static goEditProduct=(product_id)=>{

        Navigation.push('CenterScreen',{

            component:{
                name:'EditProduct',
                color: 'white',
                passProps: {
                    product_id: product_id,

                },
                options:{

                    sideMenu:{
                        left:{
                            visible:false,


                        }

                    },
                    topBar:{
                        title:{
                            text:'Edit Product',
                            color: 'white',

                        },

                        background: {
                            color:'#00cccc'
                        },
                        backButton: { color: '#ffffff' }


                    }
                }
            }


        })



    }

    static productDelete=(product_id)=> {

        RestClient.GetRequest(AppUrl.delete_product+'/?product_id='+product_id).then(result=>{

            this.componentDidMount();




        }).catch(error=>{

        })
    }


}
export default  Navigator;
