import { Animated, Easing } from 'react-native';

/**
 * Animation d'entrée : la bulle part du point du parent (ex: bouton) et s'étend.
 */



export const runParentZoomEnter = (
  animation: Animated.Value,
  translateY: Animated.Value,
  opacity: Animated.Value,
  duration: number,
  onEnd?: () => void,
  circleOpacity?: Animated.Value
) => {
  animation.setValue(0);
  opacity.setValue(0);
  circleOpacity?.setValue(1);

  Animated.sequence([
    // 1. La bulle scale
    Animated.timing(animation, {
      toValue: 1,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }),

    // 2. Fade out du cercle + fade in du contenu en même temps
    Animated.parallel([
      Animated.timing(circleOpacity!, {
        toValue: 0,
        duration: duration * 0.3,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: duration * 0.3,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }),
    ]),
  ]).start(() => onEnd?.());
};


export const runParentZoomExit = (
  animation: Animated.Value,
  opacity: Animated.Value,
  duration: number,
  onEnd?: () => void,
  circleOpacity?: Animated.Value
) => {
  circleOpacity?.setValue(0);
  opacity.setValue(1);
  animation.setValue(1);

  Animated.parallel([
    // 1. Le contenu fade out
    Animated.timing(opacity, {
      toValue: 0,
      duration: duration * 0.3,
      useNativeDriver: true,
      easing: Easing.in(Easing.quad),
    }),

    // 2. La bulle réapparaît
    Animated.timing(circleOpacity!, {
      toValue: 1,
      duration: duration * 0.3,
      useNativeDriver: true,
      easing: Easing.in(Easing.exp),
    }),

    // 3. La bulle scale down
    Animated.timing(animation, {
      toValue: 0,
      duration: duration * 0.7,
      useNativeDriver: true,
      easing: Easing.in(Easing.exp),
    }),
  ]).start(() => onEnd?.());
};
