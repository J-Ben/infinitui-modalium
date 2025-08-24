import { Animated, Easing } from 'react-native';

export const runSlideEnter = (
  animation: Animated.Value,
  translateY: Animated.Value,
  opacity: Animated.Value,
  duration: number,
  onEnd?: () => void
) => {
  Animated.parallel([
    Animated.timing(animation, {
      toValue: 1,
      duration,
      useNativeDriver: true,
      easing: Easing.bezier(0.42, 0.0, 0.58, 1.0),
    }),
    Animated.timing(translateY, {
      toValue: 0,
      duration,
      useNativeDriver: true,
      easing: Easing.bezier(0.42, 0.0, 0.58, 1.0),
    }),
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
      easing: Easing.bezier(0.42, 0.0, 0.58, 1.0),
    }),
  ]).start(() => onEnd?.());
};

export const runSlideExit = (
  animation: Animated.Value,
  opacity: Animated.Value,
  duration: number,
  onEnd?: () => void
) => {
  Animated.parallel([
    Animated.timing(animation, {
      toValue: 0,
      duration,
      useNativeDriver: true,
      easing: Easing.bezier(0.42, 0.0, 0.58, 1.0),
    }),
    Animated.timing(opacity, {
      toValue: 0,
      duration,
      useNativeDriver: true,
      easing: Easing.bezier(0.42, 0.0, 0.58, 1.0),
    }),
  ]).start(() => onEnd?.());
};
