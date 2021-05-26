import React, {Component, useState} from 'react';

import {Button, TouchableOpacity, ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import {toByteArray} from './native_modules/dataProcess'
import dgram from 'react-native-udp';
import {renderCamera} from "./native_modules/camera"
import { RNCamera } from 'react-native-camera'
import ViewShot from "react-native-view-shot";


const Buffer = global.Buffer = require('buffer').Buffer;
const client = dgram.createSocket('udp4')
const data = "Msg from UDP"
client.bind({port :3000,
            address: "192.168.0.15"})


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uri : ""
    }
   }
   
   sendData(data) {
        client.send(data.toString(),0,data.toString().length,3000,"192.168.0.16", err => {
        if(err){
          console.log(err)
          client.close()
        }
        else {
            console.log(client.address())
            console.log("msg send")
        }
    })     
   }


  componentDidMount(){
  }
  takePicture = async function() {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      //console.log('takePicture ', data);
      this.sendData(data.uri)
      this.setState({uri : data.uri})
      console.log(this.state.uri)

      this.toDataUrl(this.state.uri, function(myBase64) {
        console.log(myBase64); // myBase64 is the base64 string
    });
      //console.log(this.getBase64Image(this.state.uri))
    }
  };

  toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

  
  

  renderCamera = () =>  {
        return (
          
        <View >
            
            <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}          
          androidCameraPermissionOptions={{            
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',}}>
              <Button title="çek foto" onPress={()=> {this.takePicture()}}> </Button>
            </RNCamera>
            <View>
              <Text> Burada Olacak </Text>
            <Image style={styles.imageSide} source={{uri : this.state.uri}}/>
            </View>
            <View>
              <Button title="Test" onPress={() => {this.sendData()}} >
              </Button>
            </View>
          </View>

        
          )
    }
      
    
    
  

  render() {
    return (
      <View style={styles.container}>
        {this.renderCamera()}
          
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSide:{
    height: 100,
    height :100,
  }
  
});

