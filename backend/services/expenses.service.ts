import fs from "fs";
import { db } from "../src/prisma/db.ts";
import type { Expense, NewExpense } from "../types/expense.ts";

const Expenses = db.orm.public.Expense;

export class ExpensesService {
  public static async getExpenses(): Promise<Expense[]> {
    return await Expenses.orderBy((e) => e.id.asc()).all();
  }

  public static async addExpense(newExpense: NewExpense): Promise<Expense[]> {
    await Expenses.create({
      date: newExpense.date,
      description: newExpense.description,
      payer: newExpense.payer,
      amount: newExpense.amount,
    });
    return await this.getExpenses();
  }

  public static async resetExpenses(): Promise<Expense[]> {
    const initial: NewExpense[] = JSON.parse(
      fs.readFileSync("./data/expenses.init.json", "utf-8")
    );
    await Expenses.where((e) => e.id.gte(0)).deleteAndCount();
    for (const e of initial) {
      await Expenses.create({
        date: e.date,
        description: e.description,
        payer: e.payer,
        amount: e.amount,
      });
    }
    return await this.getExpenses();
  }
}