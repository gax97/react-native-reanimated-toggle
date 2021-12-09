import React, { useCallback, useLayoutEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Extrapolate,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import type { ToggleProps } from './types';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { clamp, snapPoint } from 'react-native-redash';

const defaultAnimation = (
  toggled: boolean,
  minXDistanceValue: number,
  maxXDistanceValue: number
) => {
  'worklet';

  return withTiming(toggled ? maxXDistanceValue : minXDistanceValue, {
    duration: 300,
  });
};

export const Toggle: React.FC<ToggleProps> = ({
  toggled,
  onChange,
  thumbSize = 14,
  thumbOffset = 6,
  activeTrackColor = '#48BD4f',
  inActiveTrackColor = '#dcdada',
  activeThumbColor = '#ffffff',
  inActiveThumbColor = '#ffffff',
  containerStyle,
  hitSlop,
  disabled,
  thumbStyle,
  disabledContainerStyle,
  disabledThumbStyle,
  toggleAnimation,
  enableGestures = false,
}) => {
  const thumbXPosition = useSharedValue(thumbOffset);

  const containerWidth: number = containerStyle?.width ?? 42;
  const containerHeight: number = containerStyle?.height ?? 2 * thumbSize;
  const borderRadius: number = containerStyle?.borderRadius ?? 11;
  const minXDistanceValue = thumbOffset;
  const maxXDistanceValue = containerWidth - thumbOffset - thumbSize;

  const progress = useDerivedValue(() => {
    return interpolate(
      thumbXPosition.value,
      [minXDistanceValue, maxXDistanceValue],
      [0, 1],
      Extrapolate.CLAMP
    );
  }, []);

  useLayoutEffect(() => {
    const animateFunction = toggleAnimation ?? defaultAnimation;
    thumbXPosition.value = animateFunction(
      toggled,
      minXDistanceValue,
      maxXDistanceValue
    );
  }, [
    toggled,
    toggleAnimation,
    thumbXPosition,
    maxXDistanceValue,
    minXDistanceValue,
  ]);

  const handleChange = useCallback(() => {
    onChange(!toggled);
  }, [onChange, toggled]);

  const animatedContainerStyles = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [inActiveTrackColor, activeTrackColor],
        'RGB'
      ),
    }),
    [activeTrackColor, inActiveTrackColor]
  );
  const animatedThumbStyles = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [inActiveThumbColor, activeThumbColor],
        'RGB'
      ),
      transform: [
        {
          translateX: thumbXPosition.value,
        },
      ],
    }),
    [
      thumbOffset,
      containerWidth,
      thumbSize,
      progress.value,
      inActiveThumbColor,
      activeThumbColor,
    ]
  );

  const styles = {
    wrapper: {
      height: containerHeight,
      width: containerWidth,
      borderRadius,
    },
    thumb: {
      height: thumbSize,
      width: thumbSize,
      borderRadius: thumbSize,
    },
  };

  const animatedGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >(
    {
      onStart: (_, ctx) => {
        ctx.startX = thumbXPosition.value;
      },
      onActive: (event, ctx) => {
        thumbXPosition.value = clamp(
          ctx.startX + event.translationX,
          minXDistanceValue,
          maxXDistanceValue
        );
      },
      onEnd: (event) => {
        const snapPointValue = snapPoint(
          thumbXPosition.value,
          event.velocityX,
          [minXDistanceValue, maxXDistanceValue]
        );
        thumbXPosition.value = withTiming(snapPointValue);
        runOnJS(onChange)(snapPointValue > minXDistanceValue);
      },
    },
    [minXDistanceValue, maxXDistanceValue]
  );
  return (
    <TouchableWithoutFeedback
      hitSlop={hitSlop}
      onPress={disabled ? undefined : handleChange}
      accessibilityState={{ disabled, checked: toggled }}
    >
      <Animated.View
        style={[
          { justifyContent: 'center' },
          animatedContainerStyles,
          styles.wrapper,
          containerStyle,
          disabled && disabledContainerStyle,
        ]}
      >
        <PanGestureHandler
          onGestureEvent={
            enableGestures && !disabled ? animatedGestureHandler : undefined
          }
        >
          <Animated.View
            style={[
              styles.thumb,
              animatedThumbStyles,
              thumbStyle,
              disabled && disabledThumbStyle,
            ]}
          />
        </PanGestureHandler>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
