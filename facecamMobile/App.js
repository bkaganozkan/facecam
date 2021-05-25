import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';

import dgram from 'react-native-udp';




const client = dgram.createSocket('udp4')
const data = "Msg from UDP"
client.bind({port :3000,
            address: "192.168.0.15"})


export default class App extends React.Component {
  constructor(props) {
    super(props);

   }

   sendData() {
     client.send(data,0,data.length,3000,"192.168.0.16", err => {
       if(err){
         console.log(err)
         client.close()

       }
       else {
         console.log(client.address())
         console.log("msg send")
       }
     } )
   }

  componentDidMount(){
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Selam</Text>
        <Button title="Bas Buna" onPress={() => {this.sendData()}}></Button>
      </View>
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

