import React from 'react';
import { View, Image } from 'react-native';

function Obstacle({color,obstacleLeft,obstacleWidth,obstacleHeight, gap, randomBottom}) {

    return (
        <>
        <Image style={{
            position: 'absolute',
            // backgroundColor: color,
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstacleLeft,
            bottom: randomBottom + obstacleHeight + gap,
        }}
        source={require('../assets/obstacleImg2.png')}
        />
        <Image style={{
            position: 'absolute',
            // backgroundColor: color,
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstacleLeft,
            bottom: randomBottom,
        }}
        source={require('../assets/obstacleImg.png')}
        />

        </>
    );
}

export default Obstacle;