import React, { useCallback, useLayoutEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Extrapolate,
  useDerivedValue,
} from 'react-native-reanimated';
import type { ToggleProps } from './types';

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
  thumbSize = 32,
  thumbOffset = 2,
  activeTrackColor = 'black',
  inActiveTrackColor = 'rgb(200, 200, 200)',
  activeThumbColor = '#ffffff',
  inActiveThumbColor = '#ffffff',
  trackStyle,
  hitSlop,
  disabled,
  thumbStyle,
  disabledTrackStyle,
  disabledThumbStyle,
  toggleAnimation,
}) => {
  const thumbXPosition = useSharedValue(thumbOffset);

  const containerWidth: number = trackStyle?.width ?? 72;
  const containerHeight: number = trackStyle?.height ?? 36;
  const borderRadius: number = trackStyle?.borderRadius ?? 32;
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

  const animatedTrackStyles = useAnimatedStyle(
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

  return (
    <TouchableWithoutFeedback
      hitSlop={hitSlop}
      onPress={disabled ? undefined : handleChange}
      accessibilityState={{ disabled, checked: toggled }}
    >
      <Animated.View
        style={[
          { justifyContent: 'center' },
          animatedTrackStyles,
          styles.wrapper,
          trackStyle,
          disabled && disabledTrackStyle,
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            animatedThumbStyles,
            thumbStyle,
            disabled && disabledThumbStyle,
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
