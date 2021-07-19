const generateId = () => `Identificator${Math.round(Math.random() * 1e8).toString(16)}`

const totalBalance = document.querySelector(".total__balance");
const totalMoneyIncome = document.querySelector(".total__money-income");
const totalMoneyExpenses = document.querySelector(".total__money-expenses");
const historyList = document.querySelector(".history__list");
const form = document.getElementById("form");
const operationName = document.querySelector(".operation__name");
const operationAmount = document.querySelector(".operation__amount");

let dataBaseOperation = JSON.parse(localStorage.getItem('calc')) || []; 


const renderOperation = (operation) =>{
        
    const className = operation.amount < 0 ? 'history__item-minus' : 'history__item-plus'

    const listItem = document.createElement('li');
    listItem.classList.add('history__item');
    listItem.classList.add(className);

    listItem.innerHTML = `${operation.description}
        <span class="history__money">${operation.amount} ₽</span>
        <button class="history_delete" data-id="${operation.id}">x</button>
    `
    historyList.appendChild(listItem); 
   
}

const upDateBalance = () =>{
    const resultIncom = dataBaseOperation
        .filter((item) => item.amount > 0)
        .reduce((result, item) => result + item.amount, 0);


    const resultExpenses = dataBaseOperation
        .filter((item) => item.amount < 0)
        .reduce((result, item) => result + item.amount, 0);

        totalMoneyIncome.textContent = resultIncom  + " " + '₽';
        totalMoneyExpenses.textContent = resultExpenses  + " " + '₽';
        totalBalance.textContent = (resultIncom + resultExpenses) + " " + '₽';

}
upDateBalance()

const addOperation = (event) =>{
    event.preventDefault();
    
    const operationNameValue = operationName.value;
    const operationAmountValue = operationAmount.value;

    operationName.style.borderColor = '';
    operationAmount.style.borderColor = '';

    if(operationNameValue !== '' && operationAmountValue !== ""){
        const operation = {
            id: generateId(),
            description: operationNameValue,
            amount: +operationAmountValue,
        }

        dataBaseOperation.push(operation);
        init();
    }else{
        if(!operationNameValue) operationName.style.borderColor = 'red';
        if(!operationAmountValue) operationAmount.style.borderColor = 'red';
    }   
    operationName.value = '';
    operationAmount.value = '';
}

const deleteOperation = (event) =>{
    const target = event.target;
    if(target.classList.contains('history_delete')){
        dataBaseOperation = dataBaseOperation
            .filter(operation => operation.id !== target.dataset.id);
        init();
    }
    //console.log(event.target.dataset.id);
}

const init = () =>{
    historyList.textContent = "";
    upDateBalance();
    dataBaseOperation.forEach(renderOperation);
    localStorage.setItem('calc', JSON.stringify(dataBaseOperation));
}

form.addEventListener('submit', addOperation);
historyList.addEventListener('click', deleteOperation); 

init();