/**
 * Modalium Component
 * A customizable modal component for React Native applications.
 * Supports various animations, presentation styles, and blur effects.
 * @version 1.0.0
 * @date 2025-08-08
 * @author Ben-Jamin MK
 * This component is designed to be flexible and reusable across different parts of the application.
 */
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    BackHandler,
    Easing,
    PanResponder,
    Platform,
    StatusBar,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { ModaliumProps } from './types';

function Modalium({
    visible,
    onRequestClose,
    onShow,
    onDismiss,
    duration = 333,
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
}: ModaliumProps) {
    const animation = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const shownRef = useRef(false);
    const [shouldRender, setShouldRender] = useState(visible);
    const insets = useSafeAreaInsets();

    // Gestion bouton retour Android
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

    // Animation d'entrée/sortie
    useEffect(() => {
        if (visible) {
            setShouldRender(true);
            Animated.parallel([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: true,
                    easing: Easing.bezier(0.42, 0.0, 0.58, 1.0),
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true,
                    easing: Easing.bezier(0.42, 0.0, 0.58, 1.0),
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: true,
                    easing: Easing.bezier(0.42, 0.0, 0.58, 1.0),
                }),
            ]).start(() => {
                if (!shownRef.current) {
                    shownRef.current = true;
                    onShow?.();
                }
            });
        } else {
            Animated.parallel([
                Animated.timing(animation, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true,
                    easing: Easing.bezier(0.42, 0.0, 0.58, 1.0),
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true,
                    easing: Easing.bezier(0.42, 0.0, 0.58, 1.0),
                }),
            ]).start(() => {
                shownRef.current = false;
                onDismiss?.();
                setShouldRender(false);
            });
        }
    }, [visible, animation, translateY, opacity, duration, onShow, onDismiss]);

    // PanResponder pour swipe-to-close
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) =>
                swipeToClose && gestureState.dy > 10,
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

    const modalStyles = [
        styles.baseModal,
        isFullScreenLike && fullScreenStyleWithSafeArea,
        presentationStyle === 'formSheet' && { ...styles.formSheet, top: insets.top },
        presentationStyle === 'pageSheet' && styles.pageSheet,
    ];

    const translateYSlide = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [duration, 0],
    });

    const combinedTranslateY = Animated.add(translateYSlide, translateY);

    const animatedStyle = {
        opacity: opacity,
        transform:
            animationType === 'slide'
                ? [{ translateY: combinedTranslateY }]
                : animationType === 'scale'
                    ? [{ scale: animation }]
                    : [],
    };

    const modalContent = (
        <Animated.View
            style={[...modalStyles, animatedStyle]}
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
            disabled={!blockBackgroundInteraction
            }
        >
            {
                useBlurOverlay ? (
                    <BlurView
                        intensity={blurIntensity}
                        tint={blurTint}
                        style={overlayStyle}
                        experimentalBlurMethod="dimezisBlurView"
                    >
                        <StatusBar
                            animated
                            backgroundColor="transparent"
                            barStyle={barStyle}
                            translucent={statusBarTranslucent}
                        />
                        {modalContent}
                    </BlurView>
                ) : (
                    <View style={overlayStyle}>
                        <StatusBar
                            animated
                            backgroundColor={statusBarBgColor}
                            barStyle={barStyle}
                            translucent={statusBarTranslucent}
                        />
                        {modalContent}
                    </View>
                )}
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