import React from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "@/constants/theme";
import { PressableScale } from "@/components/ui/PressableScale";

type Props = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function Chip({ label, active, onPress }: Props) {
  return (
    <PressableScale haptic="selection" onPress={onPress} style={[styles.chip, active && styles.activeChip]}>
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeChip: {
    backgroundColor: "rgba(121,168,255,0.16)",
    borderColor: "rgba(121,168,255,0.5)",
  },
  text: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.caption,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  activeText: {
    color: theme.colors.text,
  },
});
