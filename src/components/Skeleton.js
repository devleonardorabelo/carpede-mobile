import React,{ useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export default function Skeleton(props) {

  const fade = useRef(new Animated.Value(0)).current;

  function animateBack() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fade, {
          toValue: 1,
          duration: 500, 
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        })
      ]),
      {
        //iterations: 10
      }
    ).start();
  }

  useEffect(() => {
    animateBack();
  },[])

  return (
    <Animated.View
      style={[props.style, {opacity: fade}]}
    >
      {props.children}
    </Animated.View>
  );
}
