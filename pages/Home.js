import React, { Component, Fragment } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {
    AppRegistry,
    Button,
    StyleSheet,
    NativeModules,
    Platform,
    Text,
    View,
    TouchableHighlight
} from 'react-native';


//
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import {Navigation} from 'react-native-navigation';



class Home extends Component {

constructor(props) {
    super(props)
    Navigation.events().bindComponent(this);
    this.state = {
        selectedPrinter: null
    }

}

    async printHTML() {
        await RNPrint.print({
            html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>'
        })
    }

    // async printPDF() {
    //     const results = await RNHTMLtoPDF.convert({
    //         html: '<h1>Custom converted PDF Document</h1>',
    //         fileName: 'test',
    //         base64: true,
    //     })
    //
    //     await RNPrint.print({ filePath: results.filePath })
    // }

    async printRemotePDF() {
        await RNPrint.print({ filePath: 'https://swaponsworld.com/erp_swapon/Cinvoice/invoice_inserted_data/6847527463' })
    }




    navigationButtonPressed({componentId}){
        Navigation.mergeOptions(this.props.componentId,{
            sideMenu: {
                left: {
                    visible: true

                }
            }
        });

    }


    render() {


        return (

        <>

            <View style={styles.container}>

                <Button onPress={this.printHTML} title="Print HTML" />
                <Button onPress={this.printRemotePDF} title="Print Remote HTML" />

            </View>

        </>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
export default Home;
