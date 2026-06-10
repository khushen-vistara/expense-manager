import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "@/constants/theme";
import { formatCurrency } from "@/utils/currency";

type Props = {
  availableBalance: number;
  income: number;
  expenses: number;
  remainingBudget: number;
  savingsRate: number;
};

export function BalanceCard(props: Props) {
  const stats = [
    { label: "Income", value: formatCurrency(props.income) },
    { label: "Expenses", value: formatCurrency(props.expenses) },
    { label: "Budget Left", value: formatCurrency(props.remainingBudget) },
    { label: "Saved", value: `${Math.round(props.savingsRate)}%` },
  ];

  return (
    <Animated.View entering={FadeInDown.duration(400)}>
      <LinearGradient colors={["#1A2340", "#10192D", "#0D1322"]} style={styles.card}>
        <Text style={styles.eyebrow}>Available balance</Text>
        <Text style={styles.balance}>{formatCurrency(props.availableBalance)}</Text>
        <View style={styles.grid}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.stat}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    ...theme.shadow.card,
  },
  eyebrow: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.caption,
    marginBottom: 8,
  },
  balance: {
    color: theme.colors.text,
    fontSize: theme.typography.hero,
    fontWeight: "800",
    marginBottom: theme.spacing.lg,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: theme.spacing.lg,
  },
  stat: {
    width: "50%",
    gap: 6,
  },
  statLabel: {
    color: theme.colors.textSoft,
    fontSize: theme.typography.caption,
  },
  statValue: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: theme.typography.body,
  },
});
