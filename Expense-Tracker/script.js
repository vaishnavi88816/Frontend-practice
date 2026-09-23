const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");

const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const transactionCount = document.getElementById("transactionCount");
const emptyMessage = document.getElementById("emptyMessage");
const filterCategory = document.getElementById("filterCategory");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateSummary() {
    const total = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    totalAmount.textContent = `₹${total.toFixed(2)}`;
    transactionCount.textContent = expenses.length;
}

function displayExpenses() {
    expenseList.innerHTML = "";

    const selectedCategory = filterCategory.value;

    const filteredExpenses = expenses.filter(expense => {
        return (
            selectedCategory === "All" ||
            expense.category === selectedCategory
        );
    });

    if (filteredExpenses.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    filteredExpenses.forEach(expense => {
        const expenseItem = document.createElement("div");
        expenseItem.className = "expense-item";

        expenseItem.innerHTML = `
            <div class="expense-info">
                <h3>${expense.name}</h3>
                <p>${expense.category} • ${expense.date}</p>
            </div>

            <div class="expense-right">
                <div class="expense-amount">
                    ₹${Number(expense.amount).toFixed(2)}
                </div>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})"
                >
                    Delete
                </button>
            </div>
        `;

        expenseList.appendChild(expenseItem);
    });

    updateSummary();
}

expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newExpense = {
        id: Date.now(),
        name: expenseName.value.trim(),
        amount: Number(amount.value),
        category: category.value,
        date: date.value
    };

    expenses.push(newExpense);

    saveExpenses();
    displayExpenses();

    expenseForm.reset();
});

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);

    saveExpenses();
    displayExpenses();
}

filterCategory.addEventListener("change", displayExpenses);

displayExpenses();