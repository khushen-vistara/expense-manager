import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { useFinance } from "@/hooks/useFinance";
import { theme } from "@/constants/theme";
import { PressableScale } from "@/components/ui/PressableScale";
import { LoadingState } from "@/components/ui/LoadingState";

export function SettingsScreen() {
  const { budget, loading, setMonthlyBudget, clearAllData } = useFinance();
  const [monthlyBudgetInput, setMonthlyBudgetInput] = useState(String(budget.monthlyBudget));

  useEffect(() => {
    setMonthlyBudgetInput(String(budget.monthlyBudget));
  }, [budget.monthlyBudget]);

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.heading}>Settings</Text>
        <Text style={styles.subheading}>Keep the essentials quiet, useful, and easy to trust.</Text>
      </View>

      {loading ? <LoadingState label="Loading preferences..." /> : null}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly budget</Text>
        <TextInput
          value={monthlyBudgetInput}
          onChangeText={(value) => setMonthlyBudgetInput(value.replace(/[^0-9]/g, ""))}
          keyboardType="number-pad"
          style={styles.input}
          placeholder="25000"
          placeholderTextColor={theme.colors.textSoft}
        />
        <PressableScale
          style={styles.primaryButton}
          onPress={() => setMonthlyBudget(Number(monthlyBudgetInput) || 0)}
        >
          <Text style={styles.primaryButtonText}>Save budget</Text>
        </PressableScale>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Future features</Text>
        <Text style={styles.listItem}>PIN / biometric lock</Text>
        <Text style={styles.listItem}>Private backup sync</Text>
        <Text style={styles.listItem}>CSV export</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>App info</Text>
        <Text style={styles.meta}>Expense Manager v1.0.0</Text>
        <Text style={styles.meta}>Local-first storage with AsyncStorage</Text>
      </View>

      <PressableScale style={styles.destructiveButton} onPress={clearAllData}>
        <Text style={styles.destructiveText}>Clear all data</Text>
      </PressableScale>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 8,
  },
  heading: {
    color: theme.colors.text,
    fontSize: theme.typography.h1,
    fontWeight: "800",
  },
  subheading: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.md,
    ...theme.shadow.soft,
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.h3,
    fontWeight: "700",
  },
  input: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: theme.colors.text,
    fontSize: theme.typography.body,
  },
  primaryButton: {
    backgroundColor: theme.colors.text,
    borderRadius: theme.radius.pill,
    alignItems: "center",
    paddingVertical: 15,
    ...theme.shadow.soft,
  },
  primaryButtonText: {
    color: theme.colors.background,
    fontWeight: "800",
  },
  listItem: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
  },
  meta: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
  },
  destructiveButton: {
    backgroundColor: "rgba(255,107,129,0.12)",
    borderRadius: theme.radius.pill,
    alignItems: "center",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "rgba(255,107,129,0.28)",
    ...theme.shadow.soft,
  },
  destructiveText: {
    color: theme.colors.danger,
    fontWeight: "800",
  },
});
