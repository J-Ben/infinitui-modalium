import { Animated, Easing } from 'react-native';

export const runCenterCircleZoomEnter = (
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

        // 2. Le contenu fade in
        Animated.timing(opacity, {
            toValue: 1,
            duration: duration * 0.4,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
        }),

        // 3. La bulle fade out
        circleOpacity
            ? Animated.timing(circleOpacity, {
                toValue: 0,
                duration: duration * 0.4,
                useNativeDriver: true,
                easing: Easing.out(Easing.quad),
            })
            : Animated.delay(0),
    ]).start(() => onEnd?.());
};

export const runCenterCircleZoomExit = (
    animation: Animated.Value,
    opacity: Animated.Value,
    duration: number,
    onEnd?: () => void,
    circleOpacity?: Animated.Value
) => {
    circleOpacity?.setValue(0);           // On commence avec la bulle cachée
    opacity.setValue(1);                  // Le contenu est visible
    animation.setValue(1);                // La bulle est déjà à scaleMax

    Animated.sequence([
        // 1. Le contenu fade out
        Animated.timing(opacity, {
            toValue: 0,
            duration: duration * 0.4,
            useNativeDriver: true,
        }),

        // 2. La bulle réapparaît instantanément à scaleMax
        Animated.timing(circleOpacity!, {
            toValue: 1,
            duration: 1,
            useNativeDriver: true,
        }),

        // 3. La bulle se scale vers 0
        Animated.timing(animation, {
            toValue: 0,
            duration: duration * 0.6,
            useNativeDriver: true,
        }),
    ]).start(() => {
        onEnd?.();
    });
};

