export function print() {
    console.log('Hello world');
};

export function inputError(event, formFields, errContainer, errMsg, func) {

    let formValid = true;

    for (let i = 0; i < formFields.length; i++) {

        const field = formFields[i];

        if (formFields[i].checkValidity()) {
            errContainer[i].classList.add('hidden');
        } else {

            errContainer[i].classList.remove('hidden');

            if (field.validity.patternMismatch && field.title) {
                errMsg[i].innerText = field.title
            } else {

                errMsg[i].innerText = field.validationMessage
            }
            formValid = false;

            if (typeof func !== 'function') {
                event.preventDefault();
            }
        }
    }

    if (formValid && typeof func === 'function') {
        func();
    }


}


export function removeError(formFields, errContainer, errMsg) {

    formFields.forEach((field, i) => {

        field.addEventListener('input', (e) => {
            if (field.checkValidity()) {

                errContainer[i].classList.add('hidden')
            } else {
                if (field.validity.patternMismatch && field.title) {
                    errMsg[i].innerText = field.title
                } else {
                    errMsg[i].innerText = field.validationMessage;
                }
            }
        })

    })
}

export function showFlash(err, msg) {
    if (msg && msg !== 'null' && msg !== 'undefined' && msg.trim() !== '') {
        const body = document.querySelector('body');
        const containerFlash = document.createElement('div')
        containerFlash.setAttribute('class', 'flash-container');
        if (err != "") {
            containerFlash.classList.add('err');
        }
        containerFlash.innerHTML = `
            <div class="icon"><i class="fa-regular fa-circle-check"></i></div>
            <div class="msg">
                <p id="flashMsg">
${msg}
                </p>
            </div>
            <div class="cross-icon" id="crossMark">
                <i class="fa-solid fa-xmark"></i>
            </div>
`
        body.prepend(containerFlash);
        localStorage.removeItem('flashMsg');
        const crossMark = containerFlash.querySelector('#crossMark');
        crossMark.addEventListener('click', (e) => {
            containerFlash.classList.add('remove-flash');
        })
    };
}