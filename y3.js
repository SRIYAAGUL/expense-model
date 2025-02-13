document.getElementById('expense-form').addEventListener('submit', addTransaction);

let transactions = [];
let balance = 0;

function addTransaction(e) {
    e.preventDefault();

    const text = document.getElementById('text').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || text === '') {
        alert('Please fill out both fields');
        return;
    }

    const transaction = {
        id: generateID(),
        text: text,
        amount: amount,
    };

    transactions.push(transaction);

    updateBalance();
    updateTransactionHistory();
    clearForm();
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function updateBalance() {
    balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;
}

function updateTransactionHistory() {
    const transactionsList = document.getElementById('transactions');
    transactionsList.innerHTML = '';

    transactions.forEach((transaction) => {
        const li = document.createElement('li');
        li.textContent = `${transaction.text} - $${transaction.amount.toFixed(2)}`;
        li.classList.add(transaction.amount > 0 ? 'income' : 'expense');
        transactionsList.appendChild(li);
    });
}

function clearForm() {
    document.getElementById('text').value = '';
    document.getElementById('amount').value = '';
}