import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WalletCards } from "lucide-react-native";
import { theme } from "@/constants/theme";
import { PressableScale } from "@/components/ui/PressableScale";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <WalletCards color={theme.colors.accent} size={22} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionLabel && onAction ? (
        <PressableScale onPress={onAction} style={styles.button}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </PressableScale>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    alignItems: "center",
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(121,168,255,0.12)",
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.h3,
    fontWeight: "700",
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.text,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonText: {
    color: theme.colors.background,
    fontWeight: "700",
  },
});
