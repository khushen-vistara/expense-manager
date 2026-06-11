import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Sparkles } from "lucide-react-native";
import { theme } from "@/constants/theme";

export function InsightCard({ message }: { message: string }) {
  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <Sparkles color={theme.colors.warning} size={18} />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Smart insight</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surfaceSoft,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.soft,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(253,186,116,0.12)",
  },
  content: {
    flex: 1,
    gap: 6,
  },
  label: {
    color: theme.colors.warning,
    fontSize: theme.typography.tiny,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  message: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    lineHeight: 23,
    fontWeight: "500",
  },
});
