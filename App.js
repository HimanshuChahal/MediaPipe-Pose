import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, useWindowDimensions, StatusBar } from 'react-native'
import { Camera } from 'expo-camera'
import Canvas from 'react-native-canvas'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import { Pose } from '@mediapipe/pose'

export default function App() {

  const [ permission, setPermission ] = useState(null)

  const cameraRef = useRef(null)

  const canvasRef = useRef(null)

  var camera = null

  const { width, height } = useWindowDimensions()

  useEffect(() => {

    (async () => {
      
      const { status } = await Camera.requestCameraPermissionsAsync()
      setPermission(status === 'granted')

    })()

  }, [])

  useEffect(() => {

    // const pose = new Pose({
    //     locateFile: (file) => {
    //       return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    //     }
    // })
    
    // pose.setOptions({
    //   modelComplexity: 1,
    //   smoothLandmarks: true,
    //   enableSegmentation: true,
    //   smoothSegmentation: true,
    //   minDetectionConfidence: 0.5,
    //   minTrackingConfidence: 0.5
    // })

    // const canvas = canvasRef.current
    // const context = canvas.getContext('2d')
    // context.fillStyle = 'red'
    // context.fillRect(100, 100, canvasRef.current.width, canvasRef.current.height)

  }, [])

  if(permission === null)
  {
    return <View/>
  }

  if(permission === false)
  {
    return <View style = {{ justifyContent: 'center' }}>

      <Text style = {{ alignSelf: 'center' }}>Permission not granted</Text>

    </View>
  }

  return (
    <View style={styles.container}>
      
      <Camera style = {{ width, height, marginRight: 'auto', marginLeft: 'auto', left: 0, right: 0, zIndex: 9 }} ref = { cameraRef } ratio = '16:9' type = { Camera.Constants.Type.front }/>

      <Canvas style = {{ position: 'absolute', width, height, elevation: 1 }} ref = { canvasRef }>



      </Canvas>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
