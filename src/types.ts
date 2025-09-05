import * as React from 'react';
import { Animated } from 'react-native/Libraries/Animated/Animated';

export type AnimationType = | 'fade'
  | 'slide'
  | 'scale'
  | 'centerCircleZoom'
  | 'zoom'
  | 'waouh'
  | 'vibrate'
  | 'dancing'
  | 'centercirclezoom';


export type PresentationStyle = 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen';
export type BlurTint = 'light' | 'dark' | 'default';

export interface ModaliumProps {
  visible: boolean;
  onRequestClose?: () => void;
  onShow?: () => void;
  onDismiss?: () => void;
  duration?: number;
  children: React.ReactNode;
  transparent?: boolean;
  animationType?: AnimationType;
  statusBarTranslucent?: boolean;
  presentationStyle?: PresentationStyle;
  blockBackgroundInteraction?: boolean;
  swipeToClose?: boolean;
  barStyle?: 'light-content' | 'dark-content';
  useBlurOverlay?: boolean;
  blurIntensity?: number;
  blurTint?: BlurTint;
  circleBgColor?: string;
  circleScaleMax?: number;
  circleSize?: number;
  startX?: number;
  startY?: number;
  statusBarColor?: string;
  statusBarOpacity?: number;

}
export type ModalAnimation = {
  runEnter: (
    animation: Animated.Value,
    translateY: Animated.Value,
    opacity: Animated.Value,
    duration: number,
    onEnd?: () => void,
    circleOpacity?: Animated.Value // ✅ ajouté ici
  ) => void;
  runExit: (
    animation: Animated.Value,
    opacity: Animated.Value,
    duration: number,
    onEnd?: () => void,
    circleOpacity?: Animated.Value // ✅ ajouté ici
  ) => void;
};


export interface WaouhAnimation {
  runEnter: (
    translateX: Animated.Value,
    scale: Animated.Value,
    rotate: Animated.Value,
    opacity: Animated.Value,
    duration: number,
    onEnd?: () => void
  ) => void;
  runExit: (
    translateX: Animated.Value,
    scale: Animated.Value,
    rotate: Animated.Value,
    opacity: Animated.Value,
    duration: number,
    onEnd?: () => void
  ) => void;
}

export type AnimationRegistry = {
  [key in AnimationType]: ModalAnimation;
};