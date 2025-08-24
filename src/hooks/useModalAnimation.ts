import { useEffect } from 'react';
import { Animated } from 'react-native';
import { animationRegistry } from '../animations';

export const useModalAnimation = ({
  animationType,
  visible,
  shouldRender,
  animation,
  translateY,
  opacity,
  duration,
  onShow,
  onDismiss,
  setShouldRender,
  shownRef,
}: {
  animationType: string;
  visible: boolean;
  shouldRender: boolean;
  animation: Animated.Value;
  translateY: Animated.Value;
  opacity: Animated.Value;
  duration: number;
  onShow?: () => void;
  onDismiss?: () => void;
  setShouldRender: (v: boolean) => void;
  shownRef: React.MutableRefObject<boolean>;
}) => {
  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }
  }, [visible]);

  useEffect(() => {
    if (shouldRender && visible) {
      const { runEnter } = animationRegistry[animationType] || animationRegistry['fade'];
      runEnter(animation, translateY, opacity, duration, () => {
        if (!shownRef.current) {
          shownRef.current = true;
          onShow?.();
        }
      });
    }
  }, [shouldRender, visible]);

  useEffect(() => {
    if (!visible && shownRef.current) {
      const { runExit } = animationRegistry[animationType] || animationRegistry['fade'];
      runExit(animation, opacity, duration, () => {
        shownRef.current = false;
        setShouldRender(false);
        onDismiss?.();
      });
    }
  }, [visible]);
};
