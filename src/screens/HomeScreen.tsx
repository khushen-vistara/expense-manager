import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ArrowRight } from "lucide-react-native";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BalanceCard } from "@/components/cards/BalanceCard";
import { InsightCard } from "@/components/cards/InsightCard";
import { TransactionItem } from "@/components/transactions/TransactionItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { useFinance } from "@/hooks/useFinance";
import { theme } from "@/constants/theme";
import { getAvailableBalance, getMonthlySummary, getWeeklyFoodInsight } from "@/utils/finance";
import { PressableScale } from "@/components/ui/PressableScale";

export function HomeScreen() {
  const { transactions, budget, loading, openQuickAdd, deleteTransaction } = useFinance();
  const summary = getMonthlySummary(transactions, budget);
  const availableBalance = getAvailableBalance(transactions);
  const recentTransactions = transactions.slice(0, 4);

  return (
    <Screen>
      <Animated.View entering={FadeInDown.duration(350)} style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Good evening</Text>
          <Text style={styles.heading}>Your money, at a glance.</Text>
        </View>
        <PressableScale onPress={() => openQuickAdd()} style={styles.quickPill}>
          <Text style={styles.quickPillText}>Quick add</Text>
          <ArrowRight size={16} color={theme.colors.background} />
        </PressableScale>
      </Animated.View>

      <BalanceCard
        availableBalance={availableBalance}
        income={summary.income}
        expenses={summary.expenses}
        remainingBudget={summary.remainingBudget}
        savingsRate={summary.savingsRate}
      />

      {loading ? <LoadingState /> : <InsightCard message={getWeeklyFoodInsight(transactions)} />}

      <SectionHeader title="Recent transactions" />
      {loading ? (
        <LoadingState label="Fetching recent transactions..." />
      ) : recentTransactions.length === 0 ? (
        <EmptyState
          title="No transactions yet"
          description="Start with your first expense or income entry. The app is tuned for speed."
          actionLabel="Add transaction"
          onAction={() => openQuickAdd()}
        />
      ) : (
        <View style={styles.list}>
          {recentTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={() => openQuickAdd(transaction)}
              onDelete={() => deleteTransaction(transaction.id)}
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  eyebrow: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
  },
  heading: {
    color: theme.colors.text,
    fontSize: theme.typography.h1,
    fontWeight: "800",
    maxWidth: 220,
    lineHeight: 34,
    marginTop: 6,
  },
  quickPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.text,
    borderRadius: theme.radius.pill,
  },
  quickPillText: {
    color: theme.colors.background,
    fontWeight: "800",
  },
  list: {
    gap: theme.spacing.md,
  },
});
