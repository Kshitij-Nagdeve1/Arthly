const searchBar = document.querySelector('#search');
let typingTimer;
let timer = 600;
const expenseContainer = document.querySelector('.show-expenses-container');
const controlPannel = document.querySelector('#filter-sort-control');
const selectCategory = document.querySelector('#categories');
const sortPrice = document.querySelector('#sort')

searchBar.addEventListener('input', (e) => {

    let query = e.target.value;

    clearTimeout(typingTimer)

    typingTimer = setTimeout(() => {
        debounce(query);
    }, timer);


});

let containerLayout = async (response) => {
    const data = await response.json();

    const result = data.result;

    expenseContainer.innerHTML = "";

    for (let i = 0; i < result.length; i++) {

        let date = new Date(result[i].date)

        let formattedDate = date.toLocaleDateString('en-US', {
            month: "short",
            day: "numeric",
            year: "numeric"
        })

        expenseContainer.innerHTML += `
    
    <div class="each-expense">
    
    <span class="date-value">${formattedDate}</span>
    <span class="title-value">
    ${result[i].title}
    </span>
    <span class="category-value">${result[i].category}</span>
    <span class="amount-value">₹ ${result[i].amount.toLocaleString('en-IN')}</span>
    <a href="/api/expenses/view/${result[i]._id}">
    <div class="icon"><i class="fa-regular fa-eye"></i></div>
    <button class="view-btn">View</button>
    </a>

    </div>
    
    `

    }
}

async function debounce(query) {


    const response = await fetch(`/api/expenses/search?q=${query}`);
   await containerLayout(response);

}

controlPannel.addEventListener('change', async (e) => {
    let selectedCategory = document.querySelector('#categories');
    let selectedOrder = document.querySelector('#sort');

    const response = await fetch(`/api/expenses/filter?category=${selectCategory.value}&order=${selectedOrder.value}`);
   await containerLayout(response);


})

const msg = localStorage.getItem('flashMsg')

if (msg && msg !== 'null' && msg !== 'undefined' && msg.trim() !== '') {
    const body = document.querySelector('body');
    const containerFlash = document.createElement('div')
    containerFlash.setAttribute('class', 'flash-container');
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
    const crossMark = document.querySelector('#crossMark');
    crossMark.addEventListener('click', (e) => {
        containerFlash.classList.add('remove-flash');
    })
};

