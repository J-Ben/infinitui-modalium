import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    Platform,
    StatusBar,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { ModaliumProps } from './types';
import { animationRegistry } from './animations';
import { normalizeAnimationType } from './utils/normalizeAnimationType';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

function Modalium({
    visible,
    onRequestClose,
    onShow,
    onDismiss,
    duration = 600,
    children,
    transparent = true,
    animationType = 'fade',
    statusBarTranslucent = false,
    presentationStyle = 'overFullScreen',
    blockBackgroundInteraction = true,
    swipeToClose = true,
    barStyle = 'dark-content',
    useBlurOverlay = false,
    blurIntensity = 50,
    blurTint = 'default',
    circleBgColor = 'white',
    circleScaleMax = 10,
    circleSize = 100, // ✅ nouvelle prop
    startX,
    startY,
}: ModaliumProps & {
    circleBgColor?: string;
    circleScaleMax?: number;
    circleSize?: number;
}) {
    const animation = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const circleOpacity = useRef(new Animated.Value(1)).current;
    const shownRef = useRef(false);
    const [shouldRender, setShouldRender] = useState(false);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (visible) setShouldRender(true);
    }, [visible]);

    useEffect(() => {
        if (shouldRender && visible) {
            const normalizedType = normalizeAnimationType(animationType);
            const animationEntry = animationRegistry[normalizedType] || animationRegistry['fade'];
            animationEntry.runEnter(animation, translateY, opacity, duration, () => {
                if (!shownRef.current) {
                    shownRef.current = true;
                    onShow?.();
                }
            }, circleOpacity);
        }
    }, [shouldRender, visible]);

    useEffect(() => {
        if (!visible && shownRef.current) {
            const normalizedType = normalizeAnimationType(animationType);
            const animationEntry = animationRegistry[normalizedType] || animationRegistry['fade'];
            animationEntry.runExit(animation, opacity, duration, () => {
                shownRef.current = false;
                setShouldRender(false);
                onDismiss?.();
            }, circleOpacity);
        }
    }, [visible]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) =>
                swipeToClose && gestureState.dy > 10,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) translateY.setValue(gestureState.dy);
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

    if (!shouldRender) return null;

    const isFullScreenLike = ['fullScreen', 'overFullScreen'].includes(presentationStyle);

    const fullScreenStyleWithSafeArea = {
        ...styles.fullScreen,
        paddingTop: statusBarTranslucent ? insets.top : 0,
        paddingBottom: insets.bottom,
        height: '100%' as const,
    };

    const overlayStyle = {
        ...styles.overlay,
        backgroundColor: transparent ? 'rgba(0,0,0,0.4)' : '#FFFFFF45',
        marginTop: Platform.OS === 'android' ? -insets.top : 0,
    };

    const translateYSlide = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [duration, 0],
    });

    const combinedTranslateY = Animated.add(translateYSlide, translateY);

    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, circleScaleMax],
    });

    const circleStyle: Animated.WithAnimatedObject<ViewStyle> = {
        position: 'absolute',
        top: (startY ?? screenHeight / 2) - circleSize / 2,
        left: (startX ?? screenWidth / 2) - circleSize / 2,

        width: circleSize,
        height: circleSize,
        backgroundColor: circleBgColor,
        borderRadius: circleSize / 2,
        transform: [{ scale }],
        opacity: circleOpacity,
    };



    const contentStyle: Animated.WithAnimatedObject<ViewStyle> = {
        opacity,
        transform:
            animationType === 'slide'
                ? [{ translateY: combinedTranslateY }]
                : [],
    };

    const modalStyles = [
        styles.baseModal,
        isFullScreenLike && fullScreenStyleWithSafeArea,
        presentationStyle === 'formSheet' && { ...styles.formSheet, top: insets.top },
        presentationStyle === 'pageSheet' && styles.pageSheet,
    ];

    const modalContent = (
        <Animated.View
            style={[...modalStyles, contentStyle]}
            {...(swipeToClose ? panResponder.panHandlers : {})}
        >
            {children}
        </Animated.View>
    );

    const statusBarBgColor =
        transparent && statusBarTranslucent ? 'rgba(0,0,0,0.4)' : '#fff';

    return (
        <TouchableWithoutFeedback
            onPress={onRequestClose}
            disabled={!blockBackgroundInteraction}
        >
            <View style={overlayStyle}>
                <StatusBar
                    animated
                    backgroundColor={statusBarBgColor}
                    barStyle={barStyle}
                    translucent={statusBarTranslucent}
                />
                {['centerCircleZoom', 'parentZoom'].includes(animationType) && (
                    <Animated.View style={circleStyle} />
                )}
                {modalContent}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    baseModal: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    overFullScreen: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
        justifyContent: 'center',
    },
    fullScreen: {
        width: '100%',
        height: '100%' as const,
        borderRadius: 0,
        justifyContent: 'center',
    },
    formSheet: {
        width: 320,
        alignSelf: 'center',
        height: 'auto',
    },
    pageSheet: {
        width: '90%',
        alignSelf: 'center',
    },
});

export default Modalium;
export { Modalium };
