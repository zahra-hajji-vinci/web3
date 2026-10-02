import { db } from './src/prisma/db.ts';

const expenses = [
  { date: '2025-01-16T00:00:00Z', description: 'Example expense #1 from Alice', payer: 'Alice', amount: 25.5 },
  { date: '2025-01-15T00:00:00Z', description: 'Example expense #2 from Bob', payer: 'Bob', amount: 35 },
  { date: '2025-01-15T00:00:00Z', description: 'Example expense #3 from Alice', payer: 'Alice', amount: 2 },
];

async function main() {
  for (const expense of expenses) {
    await db.orm.public.Expense.create(expense);
  }
  console.log('Done');
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });