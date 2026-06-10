import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ArrowDownLeft, ArrowUpRight, Pencil, Trash2 } from "lucide-react-native";
import { theme } from "@/constants/theme";
import { Transaction } from "@/types";
import { formatCurrency } from "@/utils/currency";
import { formatFriendlyDate } from "@/utils/date";
import { PressableScale } from "@/components/ui/PressableScale";

type Props = {
  transaction: Transaction;
  onEdit: () => void;
  onDelete: () => void;
};

export function TransactionItem({ transaction, onEdit, onDelete }: Props) {
  const isIncome = transaction.type === "income";

  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, isIncome ? styles.iconIncome : styles.iconExpense]}>
        {isIncome ? (
          <ArrowDownLeft size={18} color={theme.colors.success} />
        ) : (
          <ArrowUpRight size={18} color={theme.colors.danger} />
        )}
      </View>

      <View style={styles.main}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.title}>
            {transaction.title}
          </Text>
          <Text style={[styles.amount, isIncome ? styles.amountIncome : styles.amountExpense]}>
            {isIncome ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.meta}>
            {transaction.category} • {formatFriendlyDate(transaction.date)}
          </Text>
          <View style={styles.actions}>
            <PressableScale onPress={onEdit} style={styles.actionButton}>
              <Pencil size={14} color={theme.colors.textMuted} />
            </PressableScale>
            <PressableScale onPress={onDelete} style={styles.actionButton}>
              <Trash2 size={14} color={theme.colors.danger} />
            </PressableScale>
          </View>
        </View>

        {transaction.note ? <Text style={styles.note}>{transaction.note}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  iconIncome: {
    backgroundColor: "rgba(51,214,159,0.1)",
  },
  iconExpense: {
    backgroundColor: "rgba(255,107,129,0.1)",
  },
  main: {
    flex: 1,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  title: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  amount: {
    fontSize: 16,
    fontWeight: "800",
  },
  amountIncome: {
    color: theme.colors.success,
  },
  amountExpense: {
    color: theme.colors.text,
  },
  meta: {
    flex: 1,
    color: theme.colors.textMuted,
    fontSize: theme.typography.caption,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surfaceMuted,
  },
  note: {
    color: theme.colors.textSoft,
    fontSize: theme.typography.caption,
    lineHeight: 18,
  },
});
