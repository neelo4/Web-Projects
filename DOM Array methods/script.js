const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn  = document.getElementById('double');
const showMillionareBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser()
getRandomUser()



//fetch random user
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    console.log(data);
   
    const user  = data.results[0];

    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

function doubleMoney(){
    data = data.map((user) => {
        return {...user, money  : user.money * 2}
    });

    updateDOM();
}

function sortByRichest(){
    data = data.sort( (a,b) => b.money-a.money);
    updateDOM();
}

function showMill() {
    data = data.filter( user => user.money > 1000000);
       
    updateDOM()
}
function wealthCalc(){
    const wealth = data.reduce( (acc, user) => (acc +=user.money),0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total wealth  : <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

//add new obj to data arr
function addData(obj){
data.push(obj);

updateDOM();
}

function updateDOM(providedData = data){
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach( item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element)
    })


}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  //Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click',sortByRichest ) ;
showMillionareBtn.addEventListener('click' , showMill);
calculateBtn.addEventListener('click', wealthCalc)


// function getValue (e){
//   const val = e.value;
//   console.log(val);
// }




  
  




