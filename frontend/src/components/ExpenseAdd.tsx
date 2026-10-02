import { useForm } from "react-hook-form";
import type { ExpenseInput } from "../types/Expense";

interface ExpenseAddProps {
  expenseAdd: (expense: ExpenseInput) => void;
}

type FormData = {
  payer: string;
  date: string;
  description: string;
  amount: number;
};

function ExpenseAdd({ expenseAdd }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    expenseAdd({
      payer: data.payer,
      date: data.date,
      description: data.description,
      amount: Number(data.amount),
    });
  };

  return (
    <div>
      <h2>Add a new Expense</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Payer:
          <select {...register("payer", { required: true })} defaultValue="Alice">
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
          </select>
        </label>
        <label>
          Date:
          <input type="date" {...register("date", { required: true })} />
          {errors.date && <span>Date field is required</span>}
        </label>
        <label>
          Description:
          <input type="text" {...register("description")} />
        </label>
        <label>
          Amount:
          <input
            type="number"
            step="0.01"
            placeholder="Enter amount"
            {...register("amount", { required: true })}
          />
          {errors.amount && <span>Amount field is required</span>}
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default ExpenseAdd;