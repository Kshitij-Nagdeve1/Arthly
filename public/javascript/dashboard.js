const date = document.querySelector('#date');
const budgetAmt = document.querySelector('#budgetAmt');
const currentDate = new Date();
const currDate = currentDate.toISOString().split('-');
const currentMonth = currDate.slice(1, 2)[0];
const currentYear = currDate.slice(0, 1)[0];
const currMonth = new Date(2000, Number(currentMonth) - 1).toLocaleString('en-US', { month: 'long' });
import { showFlash } from "./utils.js";
let msg;

function todayDate() {
    const todayDate = new Date();
    date.innerText = `Date: ${todayDate.toString().split(' ').splice(1, 3).join(' ')}`;
}

todayDate();

try {
    const setBudget = document.querySelector('#editBudgetBtn');
    const id = setBudget.dataset.budgetId;
    setBudget.addEventListener('click', () => {
        window.location.href = `/budgets/edit/${id}`;
    })
} catch (err) {
    console.log(err);
}

if (budgetAmt.innerText == 'Budget not set') {
    msg = `User must have a budget of  ${currMonth} ${currentYear}`;
    const err = 'err';
    showFlash(err, msg);
} else {
    msg = localStorage.getItem('flashMsg');
    const success = "";
    showFlash(success, msg);
}