const totalBudget = document.querySelector('#budget');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const editBtn = document.querySelector('#submitBtn');
const errMsg = document.querySelectorAll('small')
const errContainer = document.querySelectorAll('.err-msg');
const formFields = document.querySelectorAll('input, select');
import { inputError, removeError } from "./utils.js";


async function work() {
 
    let id = editBtn.dataset.editId;

    let response = await fetch(`/budgets/edit/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            budget: {
                totalBudget: totalBudget.value,
                month: month.value,
                year: year.value
            }
        })
    });

    const data = await response.json();
    const msg = data.message;
    const redirectUrl = data.redirectUrl;
    

    localStorage.setItem('flashMsg', msg);
    window.location.href = redirectUrl;

};


editBtn.addEventListener('click', (e) => {
    inputError(e, formFields, errContainer, errMsg, work);
    e.preventDefault();
})

if (errContainer.length > 0) {
    removeError();
}