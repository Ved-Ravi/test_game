import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

function Bird({birdBottom, birdLeft}) {
  const birdWidth = 60;
  const birdHeight = 60
  return (
    <Image
      style={{
        position: 'absolute',
        // backgroundColor: 'blue',
        width: birdWidth,
        height: birdHeight,
        left: birdLeft - (birdWidth / 2),
        bottom: birdBottom,
        borderRadius: 30,
      }}
      source={require('../assets/macaw.png')}
      />
  );
}

export default Bird;
