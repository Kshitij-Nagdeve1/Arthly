const deleteBtn = document.querySelector('#deleteBtn');
const msg = localStorage.getItem('flashMsg')
import { showFlash } from "./utils.js";
const success = '';
showFlash(success, msg)

deleteBtn.addEventListener('click', async () => {

    let id = deleteBtn.dataset.deleteid;

    let response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE'
    })

    const data = await response.json();
    const msg = data.message;
    const redirectUrl = data.redirectUrl;

    localStorage.setItem('flashMsg', msg);

    window.location.href = redirectUrl;

})