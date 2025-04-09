import { verticalScale } from "react-native-size-matters";

/**
 * Constants for the ScrollPicker component configuration and animations
 */

/**
 * Default number of visible items in a row
 */
export const DEFAULT_ROW_ITEMS = 7;

/**
 * Duration of animations in milliseconds
 * Used for transitions between states and scrolling animations
 */
export const ANIMATION_DURATION = 300;

/**
 * Item height configuration for different positions
 * These values control the scaling effect of items based on their
 * distance from the center selected item
 */

/**
 * Height of the item at the center (selected item)
 */
export const CENTER_ITEM_HEIGHT = verticalScale(75);

/**
 * Height of items adjacent to the center item
 */
export const ADJACENT_ITEM_HEIGHT = verticalScale(65);

/**
 * Height of items at medium distance from the center
 */
export const MEDIUM_DISTANT_ITEM_HEIGHT = verticalScale(55);

/**
 * Height of items at the furthest visible distance from the center
 */
export const DISTANT_ITEM_HEIGHT = verticalScale(45);
