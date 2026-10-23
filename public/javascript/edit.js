const editBtn = document.querySelector('#editBtn');
const title = document.querySelector('#title')
const amount = document.querySelector('#amount')
const category = document.querySelector('#category')
const date = document.querySelector('#date')
const paymentMethod = document.querySelector('#paymentMethod');
const notes = document.querySelector('#note')
const errMsg = document.querySelectorAll('small')
const errContainer = document.querySelectorAll('.err-msg');
const formFields = document.querySelectorAll('input, select')
const form = document.querySelector('form');
import { inputError, removeError } from "./utils.js";


async function work (){

    let id = editBtn.dataset.editid;
    console.log(id);

    let response = await fetch(`/api/expenses/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            expense: {
                title: title.value,
                amount: amount.value,
                category: category.value,
                date: date.value,
                paymentMethod: paymentMethod.value,
                notes: notes.value
            }
        })
    })


    const data = await response.json();
    const message = data.message;
    const redirectUrl = data.redirectUrl;

    localStorage.setItem('flashMsg', message)

    window.location.href = redirectUrl;

}

form.addEventListener('submit', (e) => {

    inputError(e, formFields, errContainer, errMsg, work);

    e.preventDefault();

})

if (errContainer.length > 0) {
    removeError(formFields, errContainer, errMsg);
}