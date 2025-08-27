import { useRef } from 'react';
import { Animated, PanResponder, PanResponderGestureState } from 'react-native';

type SwipeDirection = 'down' | 'up' | 'left' | 'right';

type Options = {
  enabled?: boolean;
  onClose?: () => void;
  threshold?: number;
  direction?: SwipeDirection;
};

function getAxis(direction: SwipeDirection) {
  return direction === 'left' || direction === 'right' ? 'x' : 'y';
}

function getDelta(direction: SwipeDirection, gesture: PanResponderGestureState) {
  switch (direction) {
    case 'down':
      return gesture.dy;
    case 'up':
      return -gesture.dy;
    case 'left':
      return -gesture.dx;
    case 'right':
      return gesture.dx;
  }
}

export function useSwipeToClose({
  enabled = true,
  onClose,
  threshold = 100,
  direction = 'down',
}: Options) {
  const axis = getAxis(direction);
  const translate = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (!enabled) return false;

        const delta = getDelta(direction, gestureState);
        // seuil minimal pour commencer à prendre la main
        return delta > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        const delta = getDelta(direction, gestureState);
        if (delta > 0) {
          translate.setValue(delta);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const delta = getDelta(direction, gestureState);

        if (delta > threshold) {
          onClose?.();
        } else {
          Animated.spring(translate, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return {
    panHandlers: panResponder.panHandlers,
    translate,
    axis, // 'x' ou 'y', pour composer avec d'autres anims
  };
}
