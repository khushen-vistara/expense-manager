import React, { createContext, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import * as Haptics from "expo-haptics";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Budget, QuickAddState, Transaction, TransactionDraft } from "@/types";
import { clearAllStoredData, loadBudget, loadTransactions, saveBudget, saveTransactions } from "@/storage";
import { toISODate } from "@/utils/date";

type FinanceContextValue = {
  transactions: Transaction[];
  budget: Budget;
  loading: boolean;
  quickAdd: QuickAddState;
  sheetRef: React.RefObject<BottomSheetModal | null>;
  openQuickAdd: (transaction?: Transaction) => void;
  closeQuickAdd: () => void;
  syncQuickAddClosed: () => void;
  addTransaction: (draft: TransactionDraft) => Promise<void>;
  updateTransaction: (id: string, draft: TransactionDraft) => Promise<void>;
  deleteTransaction: (id: string) => void;
  setMonthlyBudget: (amount: number) => Promise<void>;
  clearAllData: () => void;
};

export const FinanceContext = createContext<FinanceContextValue | null>(null);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<Budget>({ monthlyBudget: 25000 });
  const [loading, setLoading] = useState(true);
  const [quickAdd, setQuickAdd] = useState<QuickAddState>({ visible: false });
  const sheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    async function bootstrap() {
      try {
        const [storedTransactions, storedBudget] = await Promise.all([loadTransactions(), loadBudget()]);
        setTransactions(storedTransactions.sort((a, b) => +new Date(b.date) - +new Date(a.date)));
        setBudget(storedBudget);
      } finally {
        setLoading(false);
      }
    }

    bootstrap();
  }, []);

  const persistTransactions = async (nextTransactions: Transaction[]) => {
    setTransactions(nextTransactions);
    await saveTransactions(nextTransactions);
  };

  const openQuickAdd = (transaction?: Transaction) => {
    void Haptics.selectionAsync();
    setQuickAdd({ visible: true, editingTransactionId: transaction?.id });
    sheetRef.current?.present();
  };

  const closeQuickAdd = () => {
    setQuickAdd({ visible: false });
    sheetRef.current?.dismiss();
  };

  const syncQuickAddClosed = () => {
    setQuickAdd({ visible: false });
  };

  const addTransaction = async (draft: TransactionDraft) => {
    const now = toISODate();
    const transaction: Transaction = {
      id: `${Date.now()}`,
      title: draft.title.trim() || draft.category,
      amount: Number(draft.amount),
      type: draft.type,
      category: draft.category,
      date: draft.date,
      note: draft.note.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    };

    const next = [transaction, ...transactions].sort((a, b) => +new Date(b.date) - +new Date(a.date));
    await persistTransactions(next);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    closeQuickAdd();
  };

  const updateTransaction = async (id: string, draft: TransactionDraft) => {
    const next = transactions
      .map((item) =>
        item.id === id
          ? {
              ...item,
              title: draft.title.trim() || draft.category,
              amount: Number(draft.amount),
              type: draft.type,
              category: draft.category,
              date: draft.date,
              note: draft.note.trim() || undefined,
              updatedAt: toISODate(),
            }
          : item
      )
      .sort((a, b) => +new Date(b.date) - +new Date(a.date));

    await persistTransactions(next);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    closeQuickAdd();
  };

  const deleteTransaction = (id: string) => {
    Alert.alert("Delete transaction", "This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const next = transactions.filter((item) => item.id !== id);
          await persistTransactions(next);
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        },
      },
    ]);
  };

  const setMonthlyBudget = async (amount: number) => {
    const nextBudget = { ...budget, monthlyBudget: amount };
    setBudget(nextBudget);
    await saveBudget(nextBudget);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const clearAllData = () => {
    Alert.alert("Clear all data", "This will remove all transactions and budget settings.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          setTransactions([]);
          setBudget({ monthlyBudget: 25000 });
          await clearAllStoredData();
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        },
      },
    ]);
  };

  const value = {
    transactions,
    budget,
    loading,
    quickAdd,
    sheetRef,
    openQuickAdd,
    closeQuickAdd,
    syncQuickAddClosed,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setMonthlyBudget,
    clearAllData,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}
