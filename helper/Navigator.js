

import AsyncStorage from "@react-native-async-storage/async-storage";
import {RNToasty} from "react-native-toasty";
import {Navigation} from "react-native-navigation";

class Navigator {





    static goLoginPage= () => {

            Navigation.push('CenterScreen',{

                component:{
                    name:'LoginPage',
                    options: {
                        topBar: {
                            visible: false,
                            drawBehind: true,
                            animate: false,
                        }
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
                            text:'Home',
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


}
export default  Navigator;
