import type { TouchableWithoutFeedbackProps, ViewStyle } from 'react-native';

export type ToggleProps = {
  /**
   * Indicates the current state of the toggle.
   */
  toggled: boolean;
  /**
   * Callback to be called when the toggle value changes.
   * @param value - The new value of the toggle.
   */
  onChange: (value: boolean) => void;
  /**
   * The size of the thumb
   * By default the thumb is round. If you want to change this use thumbStyle prop and define the borderRadius.
   */
  thumbSize?: number;
  /**
   * The width of the toggle container
   */
  containerWidth?: number;
  /**
   * Offset of the thumb from the left and the right side of the container.
   */
  thumbOffset?: number;
  /**
   * The style of the thumb.
   */
  thumbStyle?: ViewStyle;
  /**
   * The style of the track.
   */
  containerStyle?: ViewStyle & { width?: number; height?: number };
  /**
   * Color of the track when the toggle is active.
   */
  activeTrackColor?: string;
  /**
   * Color of the track when the toggle is inactive.
   */
  inActiveTrackColor?: string;
  /**
 Color of the thumb when the toggle is active.
   */
  activeThumbColor?: string;
  /**
   * Color of the thumb when the toggle is inactive.
   */
  inActiveThumbColor?: string;
  /**
   * Same as hitSlop of TouchableWithoutFeedback.
   */
  hitSlop?: TouchableWithoutFeedbackProps['hitSlop'];
  /**
   * Determines if the toggle is disabled.
   */
  disabled?: boolean;
  /**
   * Container styles when the toggle is disabled.
   */
  disabledContainerStyle?: ViewStyle;
  /**
   * Thumb styles when the toggle is disabled.
   */
  disabledThumbStyle?: ViewStyle;
  /**
   * Custom animation on toggle state change.
   * You can either use predefined animations from react-native-reanimated or create your own animation.
   * @param toggle
   * @return a number between 0 and 1 that represents the current progress of toggle.
   */
  toggleAnimation?: (
    toggled: boolean,
    minXDistanceValue: number,
    maxXDistanceValue: number
  ) => number;

  /**
   * Determines if the toggle should be controlled with gestures along with press
   */
  enableGestures?: boolean;
};
