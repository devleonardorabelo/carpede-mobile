import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export default function Skeleton({ style, children }) {
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
        }),
      ])
    ).start();
  }

  useEffect(() => {
    animateBack();
  }, []);

  return (
    <Animated.View style={[style, { opacity: fade }]}>{children}</Animated.View>
  );
}
