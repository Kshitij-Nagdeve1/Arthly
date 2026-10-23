const crossMark = document.querySelector('#crossMark');
const flashContainer = document.querySelector('.flash-container');

crossMark.addEventListener('click', (e) => {
    flashContainer.classList.add('remove-flash');
})