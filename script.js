const form = document.getElementById("expense");
const budgetButton = document.getElementById("set-budget");

let expenses = [];
let budget = 0;
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateBudget() {

    let total = 0;

    for (let expense of expenses) {
        total += expense.amount;
    }

    let remaining = budget - total;

    const budgetStatus = document.getElementById("budget-status");

    budgetStatus.innerHTML = `
        <p>Budget: Rs ${budget}</p>
        <p>Spent: Rs ${total}</p>
        <p>Remaining: Rs ${remaining}</p>
    `;
    if (budget > 0) {

    let percentageUsed = (total / budget) * 100;

    if (percentageUsed >= 100) {

        budgetStatus.innerHTML += `
            <p>🚨 Budget Exceeded!</p>
        `;

    } else if (percentageUsed >= 80) {

        budgetStatus.innerHTML += `
            <p>⚠ Warning: You have used ${percentageUsed.toFixed(0)}% of your budget.</p>
        `;

    }

}
}

function updateTotal() {

    let total = 0;

    for (let expense of expenses) {
        total += expense.amount;
    }

    document.getElementById("total").textContent = total;
}

function deleteExpense(id) {

    expenses = expenses.filter(expense => expense.id !== id);

    renderExpenses();
    updateTotal();
    updateAnalytics();
    updateBudget();
    saveExpenses();
}

function updateAnalytics() {

    const analyticsDiv = document.getElementById("analytics");

    let categoryTotals = {};

    for (let expense of expenses) {

        if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += expense.amount;
        } else {
            categoryTotals[expense.category] = expense.amount;
        }
    }

    analyticsDiv.innerHTML = "";

    for (let category in categoryTotals) {
        analyticsDiv.innerHTML += `
            <p>${category}: Rs ${categoryTotals[category]}</p>
        `;
    }

    let highestCategory = "";
    let highestAmount = 0;

    for (let category in categoryTotals) {

        if (categoryTotals[category] > highestAmount) {
            highestAmount = categoryTotals[category];
            highestCategory = category;
        }
    }

    analyticsDiv.innerHTML += `
        <h4>Highest Spending Category: ${highestCategory}</h4>
    `;

    let total = 0;

    for (let expense of expenses) {
        total += expense.amount;
    }

    let average = 0;

    if (expenses.length > 0) {
        average = total / expenses.length;
    }

    analyticsDiv.innerHTML += `
        <h4>Average Expense: Rs ${average.toFixed(2)}</h4>
    `;
}

function renderExpenses() {

    const expdiv = document.getElementById("expenses");

    expdiv.innerHTML = "";

    for (let expense of expenses) {

        expdiv.innerHTML += `
<div>
    <span>
        ${expense.name} - Rs ${expense.amount}
<span class="category-badge">
    ${expense.category}
</span>
    </span>
    <button onclick="deleteExpense(${expense.id})">
        Delete
    </button>
</div>
`;
    }
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");

    const expenseName = expenseNameInput.value;
    const expenseAmount = expenseAmountInput.value;
    const category = document.getElementById("category").value;

    if (category === "") {
        alert("Please select a category");
        return;
    }

    if (expenseName === "" || expenseAmount === "") {
        alert("Please fill all fields");
        return;
    }

    if (Number(expenseAmount) <= 0) {
        alert("Amount must be greater than 0");
        return;
    }

    const expense = {
        id: Date.now(),
        name: expenseName,
        amount: Number(expenseAmount),
        category: category
    };

    expenses.push(expense);
    saveExpenses();
    renderExpenses();
    updateTotal();
    updateAnalytics();
    updateBudget();

    console.log(expenses);

    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    expenseNameInput.focus();
});

budgetButton.addEventListener("click", function() {

    const budgetInput = document.getElementById("budget");

    budget = Number(budgetInput.value);

    if (budget <= 0) {
        alert("Please enter a valid budget");
        return;
    }
    localStorage.setItem("budget", budget);
    updateBudget();
});
const savedBudget = localStorage.getItem("budget");

if (savedBudget) {

    budget = Number(savedBudget);

}
const savedExpenses = localStorage.getItem("expenses");
if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
    renderExpenses();
    updateTotal();
    updateAnalytics();
    updateBudget();
}