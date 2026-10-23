const errMsg = document.querySelectorAll('small')
const errContainer = document.querySelectorAll('.err-msg');
const formFields = document.querySelectorAll('input, select')
const submitBtn = document.querySelector('#submitBtn');
import { inputError, removeError } from "./utils.js";

submitBtn.addEventListener('click', (event) => {
    inputError(event, formFields, errContainer, errMsg);
});

if (errContainer.length > 0) {
    removeError(formFields, errContainer, errMsg);
};