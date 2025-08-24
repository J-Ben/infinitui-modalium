import { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

export const useSwipeToClose = (
  enabled: boolean,
  translateY: Animated.Value,
  onRequestClose?: () => void
) => {
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        enabled && gestureState.dy > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 && onRequestClose) {
          onRequestClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return panResponder;
};
