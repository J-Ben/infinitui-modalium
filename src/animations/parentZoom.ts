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
    // La bulle grandit
    Animated.timing(animation, {
      toValue: 1,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }),

    // Le contenu fade in
    Animated.timing(opacity, {
      toValue: 1,
      duration: duration * 0.4,
      useNativeDriver: true,
      easing: Easing.out(Easing.quad),
    }),
  ]).start(() => onEnd?.());
};

/**
 * Animation de sortie : le contenu disparaît puis la bulle se rétracte.
 */
export const runParentZoomExit = (
  animation: Animated.Value,
  opacity: Animated.Value,
  duration: number,
  onEnd?: () => void,
  circleOpacity?: Animated.Value
) => {
  circleOpacity?.setValue(0);
  opacity.setValue(1);
  animation.setValue(1); // On part du scale max

  Animated.sequence([
    // 1. Fade out du contenu
    Animated.timing(opacity, {
      toValue: 0,
      duration: duration * 0.3,
      useNativeDriver: true,
      easing: Easing.in(Easing.quad),
    }),

    // 2. Affichage de la bulle à scale max
    Animated.timing(circleOpacity!, {
      toValue: 1,
      duration: 1,
      useNativeDriver: true,
    }),

    // 3. La bulle se scale vers 0
    Animated.timing(animation, {
      toValue: 0,
      duration: duration * 0.7,
      useNativeDriver: true,
      easing: Easing.in(Easing.exp),
    }),
  ]).start(() => onEnd?.());
};
