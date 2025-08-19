import * as React from 'react';

export type AnimationType = 'fade' | 'slide' | 'scale';
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
}