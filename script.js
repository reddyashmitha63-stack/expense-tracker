const form = document.getElementById("expense");

let expenses = [];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");

    const expenseName = expenseNameInput.value;
    const expenseAmount = expenseAmountInput.value;

    const expdiv = document.getElementById("expenses");

    expdiv.innerHTML += expenseName + " - Rs " + expenseAmount + "<br>";

    const expense = {
        name: expenseName,
        amount: Number(expenseAmount)
    };

    expenses.push(expense);

    console.log(expenses);

    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    expenseNameInput.focus();
});