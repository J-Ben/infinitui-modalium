declare module 'expo-blur' {
  import { ComponentType } from 'react';
  import { ViewProps } from 'react-native';

  export interface BlurViewProps extends ViewProps {
    intensity?: number;
    tint?: 'light' | 'dark' | 'default';
    experimentalBlurMethod?: string;
  }

  export const BlurView: ComponentType<BlurViewProps>;
}
