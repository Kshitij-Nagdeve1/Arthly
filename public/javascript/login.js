import { inputError, removeError } from "./utils.js";
const errMsg = document.querySelectorAll('small');
const errContainer = document.querySelectorAll('.err-msg');
const formFields = document.querySelectorAll('input');
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    inputError(event, formFields, errContainer, errMsg);
});

if (errContainer.length > 0) {
    removeError(formFields, errContainer, errMsg);
};