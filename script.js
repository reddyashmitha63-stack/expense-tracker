const form = document.getElementById("expense");

let expenses = [];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");

    const expenseName = expenseNameInput.value;
    const expenseAmount = expenseAmountInput.value;
    if (expenseName === "" || expenseAmount === "") {
    alert("Please fill all fields");
    return;
}
    if (expenseAmount <= 0) {
    alert("Amount must be greater than 0");
    return;
}

    const expdiv = document.getElementById("expenses");

    expdiv.innerHTML += expenseName + " - Rs " + expenseAmount + "<br>";

    const expense = {
        name: expenseName,
        amount: Number(expenseAmount)
    };

    expenses.push(expense);
    let total=0;
    for(let expense of expenses){
        total+=expense.amount;
    }

    console.log(total);
    const totalamount=document.getElementById("total");
    totalamount.textContent=total;
    
    console.log(expenses);

    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    expenseNameInput.focus();
});