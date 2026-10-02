import express from "express";
import { ExpensesService } from "../services/expenses.service.ts";
import { isValidNewExpense } from "../guards/expenses.guard.ts";

const expensesRouter = express.Router();

expensesRouter.get("/", async (req, res) => {
  try {
    res.json(await ExpensesService.getExpenses());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

expensesRouter.post("/", async (req, res) => {
  try {
    const expense = req.body;
    if (!isValidNewExpense(expense)) {
      return res.status(400).json({ error: "Invalid expense" });
    }
    res.status(201).json(await ExpensesService.addExpense(expense));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

expensesRouter.post("/reset", async (req, res) => {
  try {
    res.json(await ExpensesService.resetExpenses());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default expensesRouter;