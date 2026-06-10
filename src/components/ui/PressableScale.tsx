import React from "react";
import * as Haptics from "expo-haptics";
import { Pressable, PressableProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type HapticKind = "selection" | "light" | "medium";

type Props = PressableProps & {
  haptic?: HapticKind;
};

async function triggerHaptic(kind?: HapticKind) {
  if (!kind) {
    return;
  }

  if (kind === "selection") {
    await Haptics.selectionAsync();
    return;
  }

  await Haptics.impactAsync(
    kind === "medium" ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light
  );
}

export function PressableScale(props: Props) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      {...props}
      style={[props.style, animatedStyle]}
      onPressIn={async (event) => {
        scale.value = withSpring(0.985, { damping: 20, stiffness: 280 });
        opacity.value = withSpring(0.92, { damping: 20, stiffness: 280 });
        await triggerHaptic(props.haptic);
        props.onPressIn?.(event);
      }}
      onPressOut={(event) => {
        scale.value = withSpring(1, { damping: 18, stiffness: 260 });
        opacity.value = withSpring(1, { damping: 18, stiffness: 260 });
        props.onPressOut?.(event);
      }}
    />
  );
}
