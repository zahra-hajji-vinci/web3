import type { ExpenseInput } from "../types/Expense";

interface ExpenseAddProps {
  expenseAdd: (expense: ExpenseInput) => void;
}

function generateRandomExpense(): ExpenseInput {
  return {
    date: new Date().toISOString(),
    description: "New random Expense",
    payer: Math.random() < 0.5 ? "Alice" : "Bob",
    amount: Math.round(Math.random() * 10000) / 100,
  };
}

function ExpenseAdd({ expenseAdd }: ExpenseAddProps) {
  return <div>
    <h2>Add a new random Expense</h2>
    <button onClick={() => expenseAdd(generateRandomExpense())}>Add</button>
  </div>;
}

export default ExpenseAdd;