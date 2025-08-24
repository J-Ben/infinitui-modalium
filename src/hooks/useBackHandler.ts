import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export const useBackHandler = (visible: boolean, onRequestClose?: () => void) => {
  useEffect(() => {
    const handler = () => {
      if (visible && onRequestClose) {
        onRequestClose();
        return true;
      }
      return false;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', handler);
    return () => sub.remove();
  }, [visible, onRequestClose]);
};
