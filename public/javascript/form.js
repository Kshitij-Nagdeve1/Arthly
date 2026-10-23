const errMsg = document.querySelectorAll('small');
const errContainer = document.querySelectorAll('.err-msg');
const submitBtn = document.querySelector('#submitBtn');
const formFields = document.querySelectorAll('input, select');
import { inputError, removeError } from "./utils.js";

submitBtn.addEventListener('click', (event) => {
    inputError(event, formFields, errContainer, errMsg);
});

if (errContainer.length > 0) {
    removeError(formFields, errContainer, errMsg);
};