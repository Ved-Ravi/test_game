/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Bird from './src/components/Bird';
import Obstacles from './src/components/Obstacle';

export default function App() {
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeft2, setObstaclesLeft2] = useState(
    screenWidth + screenWidth / 2 + 30,
  );
  const [obstacleNegHeight, setObstacleNegHeight] = useState(0);
  const [obstacleNegHeight2, setObstacleNegHeight2] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isObstacleCross, setIsObstacleCross] = useState(false);
  const [isObstacleCross2, setIsObstacleCross2] = useState(false);
  const obstacleWidth = 60;
  const obstacleHeight = 300;
  const gap = 200;

  const gravity = 4;
  let gameTimerId;
  let obstaclesLeftTimerId;
  let obstaclesLeftTimerId2;

  //start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [birdBottom]);
  // console.log(birdBottom);

  //start first obstacles
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 40);
      if (!isObstacleCross && obstaclesLeft < screenWidth / 2 - 60) {
        setIsObstacleCross(true);
        setScore((score) => score + 1);
      }
      return () => {
        clearInterval(obstaclesLeftTimerId);
      };
    } else {
      setObstaclesLeft(screenWidth);
      setObstacleNegHeight(-Math.random() * 100);
      setIsObstacleCross(false);
    }
  }, [obstaclesLeft]);
  // console.log(obstaclesLeft);

  useEffect(() => {
    if (obstaclesLeft2 > -obstacleWidth) {
      obstaclesLeftTimerId2 = setInterval(() => {
        setObstaclesLeft2((obstaclesLeft2) => obstaclesLeft2 - 5);
      }, 40);
      if (!isObstacleCross2 && obstaclesLeft2 < screenWidth / 2 - 60) {
        setIsObstacleCross2(true);
        setScore((score) => score + 1);
      }
      return () => {
        clearInterval(obstaclesLeftTimerId2);
      };
    } else {
      setObstaclesLeft2(screenWidth);
      setObstacleNegHeight2(-Math.random() * 100);
      setIsObstacleCross2(false);
    }
  }, [obstaclesLeft2]);

  //check for collision
  useEffect(() => {
    if (
      ((birdBottom < obstacleNegHeight + obstacleHeight ||
        birdBottom > obstacleNegHeight + obstacleHeight + gap - 60) &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 30) ||
      ((birdBottom < obstacleNegHeight2 + obstacleHeight ||
        birdBottom > obstacleNegHeight2 + obstacleHeight + gap - 60) &&
        obstaclesLeft2 > screenWidth / 2 - 30 &&
        obstaclesLeft2 < screenWidth / 2 + 30)
    ) {
      console.log('Game Over');
      console.log('birdBottom', birdBottom);
      console.log(
        'obstacleHeight',
        obstacleNegHeight + obstacleHeight + gap - 60,
      );
      gameOver();
    }
  });

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesLeftTimerId);
    clearInterval(obstaclesLeftTimerId2);
    setIsGameOver(true);
  };

  //for jumping of bird
  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom((birdBottom) => birdBottom + 50);
      // console.log('Jump');
    }
  };

  //for restart the game
  const restart = () => {
    setIsGameOver(false);
    setIsObstacleCross(false);
    setIsObstacleCross2(false);
    setBirdBottom(screenHeight / 2);
    setObstaclesLeft(screenWidth);
    setObstaclesLeft2(screenWidth + screenWidth / 2 + 30);
    setObstacleNegHeight(0);
    setObstacleNegHeight2(0);
    setScore(0);
  };

  return (
    <>
      <StatusBar backgroundColor="#01A1FF" />
      <TouchableWithoutFeedback onPress={jump} style={{flex: 1}}>
        <View style={styles.container}>
          <Image
            source={require('./src/assets/Background.jpg')}
            style={{height: '100%', width: '100%', position: 'absolute'}}
          />
          {isGameOver && (
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                alignItems: 'center',
                zIndex: 1,
                backgroundColor: '#FFD0A5',
                padding: 40,
                borderRadius: 10,
                borderColor: '#FF665B',
                borderWidth: 3,
                elevation: 7,
                bottom: 10
              }}>
              <Text style={{fontSize: 30, zIndex: 1, marginBottom: 20}}>
                Score {score}
              </Text>
              <TouchableOpacity
                onPress={restart}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                  backgroundColor: '#0026FF',
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 5,
                }}>
                <Text style={{fontSize: 25, color: '#fff'}}>Restart</Text>
              </TouchableOpacity>
            </View>
          )}

          <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
          <Obstacles
            color={'green'}
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            gap={gap}
            obstacleLeft={obstaclesLeft}
            randomBottom={obstacleNegHeight}
          />
          <Obstacles
            color={'yellow'}
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            gap={gap}
            obstacleLeft={obstaclesLeft2}
            randomBottom={obstacleNegHeight2}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
  },
});
