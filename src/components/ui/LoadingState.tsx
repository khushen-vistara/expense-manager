import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { theme } from "@/constants/theme";

export function LoadingState({ label = "Loading your finances..." }: { label?: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.colors.accent} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 180,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
  },
});
