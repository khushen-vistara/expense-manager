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
    <PressableScale onPress={onPress} style={[styles.chip, active && styles.activeChip]}>
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeChip: {
    backgroundColor: "rgba(121,168,255,0.18)",
    borderColor: "rgba(121,168,255,0.45)",
  },
  text: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.caption,
    fontWeight: "600",
  },
  activeText: {
    color: theme.colors.text,
  },
});
