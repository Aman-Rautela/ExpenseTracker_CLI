# 💰 ExpenseTracker_CLI

A simple and efficient command-line interface application to track your daily expenses. Built with Node.js, this tool helps you manage your finances by adding, viewing, updating, and analyzing your expenses.

[🗺️](https://roadmap.sh/projects/expense-tracker)

## ✨ Features

- ➕ **Add Expenses** - Record new expenses with description and amount
- 👀 **View Expenses** - Display all recorded expenses with details
- 🗑️ **Delete Expenses** - Remove expenses by ID
- ✏️ **Update Expenses** - Modify expense amounts
- 📊 **Summary** - View total expenses
- 📅 **Monthly Summary** - Get expense summary for specific months
- 📄 **Export to CSV** - Convert your expense data to CSV format

## 🚀 Installation

1. Clone the repository:
```bash
git clone git@github.com:Aman-Rautela/ExpenseTracker_CLI.git
cd ExpenseTracker_CLI
```

2. Install dependencies:
```bash
npm install
```

## 📖 Usage

### Add an Expense
```bash
node index.js add "Grocery shopping" 50
```

### View All Expenses
```bash
node index.js view
```

### Delete an Expense
```bash
node index.js delete <expense-id>
```

### Update an Expense
```bash
node index.js update <expense-id> <new-amount>
```

### View Total Summary
```bash
node index.js summary
```

### View Monthly Summary
```bash
node index.js monthSummary
node index.js monthSummary 8
```

### Export to CSV
```bash
node index.js toCsv
```

## 👨‍💻 Author

**Aman Rautela**
