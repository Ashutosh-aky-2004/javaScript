// Toggle Script with LocalStorage

const html = document.documentElement;
const toggle = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("ExpenseTrackerTheme");

if (savedTheme === "dark") {
  html.classList.add("dark");
  toggle.textContent = "🌞";
} else {
  html.classList.remove("dark");
  toggle.textContent = "🌙";
}

// Toggle and save theme
toggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  const newTheme = html.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("ExpenseTrackerTheme", newTheme);
  toggle.textContent = newTheme === "dark" ? "🌞" : "🌙";
});

const displayBalance = document.getElementById("balance");
const itemDescripton = document.getElementById("itemDescripton");
const itemAmount = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementsByClassName("deleteBtn");
const transitionHistoryDiv = document.getElementById("transitionHistory");
const selectedType = document.querySelector('input[name="type"]:checked');
const displayIncome = document.querySelector("#incomeAmount");
const displayExpense = document.querySelector("#expenseAmount");

let selectedTypeValue = "Credit";
let ExpenseTrackerArray = loadTransactions();
let totalBalance = 0;

function updateIncomeExpense() {
  let income = 0;
  let expense = 0;

  ExpenseTrackerArray.forEach((transaction) => {
    const amount = parseFloat(transaction.amount);
    if (transaction.transactionType === "Credit") {
      income += amount;
    } else {
      expense += amount;
    }
  });

  displayIncome.textContent = `₹${income.toFixed(2)}`;
  displayExpense.textContent = `₹${expense.toFixed(2)}`;
}

function addTranscation() {
  let itemTitle = itemDescripton.value.trim();
  let amountSpent = parseFloat(itemAmount.value.trim());

  if (!itemTitle || !amountSpent || amountSpent <= 0 || isNaN(amountSpent)) {
    alert("Please enter a valid description and amount greater than 0");
    return;
  }

  // Calculate current balance before adding new transaction
  let income = 0;
  let expense = 0;

  ExpenseTrackerArray.forEach((transaction) => {
    const amt = parseFloat(transaction.amount);
    if (transaction.transactionType === "Credit") {
      income += amt;
    } else {
      expense += amt;
    }
  });

  const currentBalance = income - expense;

  // If Debit and new amount causes negative balance, prevent it
  if (selectedTypeValue === "Debit" && currentBalance - amountSpent < 0) {
    alert("Insufficient balance! Cannot add this debit transaction.");
    return;
  }

  let ExpenseTrackerObject = {
    name: itemTitle,
    amount: amountSpent,
    transactionType: selectedTypeValue,
  };

  ExpenseTrackerArray.push(ExpenseTrackerObject);
  saveTransactions();
  transactionHistoryDisplay(ExpenseTrackerArray);
  totalBalanceToDisplay();

  itemDescripton.value = "";
  itemAmount.value = "";
  selectedTypeValue = "Credit";
  document.querySelector('input[name="type"][value="Credit"]').checked = true;
}

function transactionHistoryDisplay(ExpenseTrackerArray) {
  transitionHistoryDiv.innerHTML = "";
  ExpenseTrackerArray.forEach((e, index) => {
    let creditOrDebit = e.transactionType == "Credit" ? "+" : "-";
    let creditOrDebitColor = creditOrDebit == "+" ? "green-500" : "red-500";
    transitionHistoryDiv.innerHTML += `
      <div class="flex justify-between items-center my-2">
        <span>${creditOrDebit} <strong>${e.name}</strong></span>
        <div class="flex items-center gap-4">
          <span class="text-${creditOrDebitColor} font-bold">₹${e.amount}</span>
          <button class="deleteBtn" data-index="${index}" aria-label="Delete transaction">
            <i class="fa-solid fa-trash hover:text-red-600"></i>
          </button>
        </div>
      </div>
    `;
  });
}

transitionHistoryDiv.addEventListener("click", (event) => {
  if (event.target.closest(".deleteBtn")) {
    const btn = event.target.closest(".deleteBtn");
    const index = btn.getAttribute("data-index");
    if (index !== null) {
      deleteTransaction(parseInt(index));
    }
  }
});

function deleteTransaction(index) {
  ExpenseTrackerArray.splice(index, 1);
  saveTransactions();
  transactionHistoryDisplay(ExpenseTrackerArray);
  totalBalanceToDisplay();
}

function totalBalanceToDisplay() {
  let income = 0;
  let expense = 0;

  ExpenseTrackerArray.forEach((transaction) => {
    const amount = parseFloat(transaction.amount);
    if (transaction.transactionType === "Credit") {
      income += amount;
    } else {
      expense += amount;
    }
    updateIncomeExpense();
  });

  totalBalance = income - expense;

  displayBalance.innerHTML = `Balance: <span class="text-green-500">₹${totalBalance.toFixed(
    2
  )}</span>`;
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTranscation();
});

document.querySelectorAll('input[name="type"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    selectedTypeValue = document.querySelector(
      'input[name="type"]:checked'
    ).value;
  });
});

function saveTransactions() {
  localStorage.setItem(
    "ExpenseTrackerData",
    JSON.stringify(ExpenseTrackerArray)
  );
}

function loadTransactions() {
  const savedData = localStorage.getItem("ExpenseTrackerData");
  if (savedData) {
    return JSON.parse(savedData);
  } else {
    return [];
  }
}


function windowOnLoad(){
  transactionHistoryDisplay(ExpenseTrackerArray);
  totalBalanceToDisplay();
}

windowOnLoad();