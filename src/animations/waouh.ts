import { Animated, Dimensions } from 'react-native';
import { Easing, Keyframe } from 'react-native-reanimated';

// On récupère la largeur de l'écran pour que l'animation soit responsive.
const { width } = Dimensions.get('window');
 
export const runWaouhEnter = (
  translateX: Animated.Value,
  scale: Animated.Value,
  rotate: Animated.Value,
  opacity: Animated.Value,
  duration: number,
  onEnd?: () => void
) => {
  translateX.setValue(-300); // arrive de la gauche
  scale.setValue(0.4);       // dézoomé
  rotate.setValue(-25);      // rotation arrière
  opacity.setValue(0);

  Animated.sequence([
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: duration * 0.6,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(scale, {
        toValue: 1.1,
        duration: duration * 0.6,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(rotate, {
        toValue: 0,
        duration: duration * 0.6,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: duration * 0.4,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }),
    ]),
    Animated.timing(scale, {
      toValue: 0.95,
      duration: duration * 0.2,
      useNativeDriver: true,
      easing: Easing.out(Easing.elastic(1)),
    }),
    Animated.timing(scale, {
      toValue: 1,
      duration: duration * 0.2,
      useNativeDriver: true,
      easing: Easing.out(Easing.elastic(1)),
    }),
  ]).start(() => onEnd?.());
};


export const runWaouhExit = (
  translateX: Animated.Value,
  scale: Animated.Value,
  rotate: Animated.Value,
  opacity: Animated.Value,
  duration: number,
  onEnd?: () => void
) => {
  Animated.parallel([
    Animated.timing(opacity, {
      toValue: 0,
      duration: duration * 0.4,
      useNativeDriver: true,
      easing: Easing.in(Easing.quad),
    }),
    Animated.timing(scale, {
      toValue: 0.7,
      duration: duration * 0.6,
      useNativeDriver: true,
      easing: Easing.in(Easing.exp),
    }),
    Animated.timing(translateX, {
      toValue: 200, // sort vers la droite
      duration: duration * 0.6,
      useNativeDriver: true,
      easing: Easing.in(Easing.exp),
    }),
    Animated.timing(rotate, {
      toValue: 15,
      duration: duration * 0.6,
      useNativeDriver: true,
      easing: Easing.in(Easing.exp),
    }),
  ]).start(() => onEnd?.());
};
