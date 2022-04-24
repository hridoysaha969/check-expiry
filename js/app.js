let addBtn = document.getElementById('addBtn');
let popupPage = document.getElementById('popUp');

addBtn.addEventListener('click', () => {
    popupPage.classList.add('show__popup');
})

let timesIcon = document.getElementById('times-icon');
timesIcon.addEventListener('click', ()=> {
    popupPage.classList.remove('show__popup');
})

function removePopUp() {
    popupPage.classList.remove('show__popup');
}


/* ========== Task Form Functionality ========== */
// PD Constructor
function addPd(desc, date) {
    this.desc = desc
    this.date = date
}

let pdForm = document.getElementById('pd-form');
let desc = document.getElementById('desc');
let date = document.getElementById('date');

pdForm.addEventListener('submit', submitPdForm)

function submitPdForm(e) {
    e.preventDefault();

    // Task title validation
    let productRegx = /^[a-zA-z]([0-9a-zA-Z -]){3,40}$/;

    if(!productRegx.test(desc.value)) {
        desc.classList.add('invalid');
        onInputFunc(desc)
    } else if(date.value == '') {
        date.classList.add('invalid');
        onInputFunc(date)
    } else {
        let addNewProduct = new addPd(desc.value, date.value)
        pdForm.reset();
        removePopUp();
        managePdData(addNewProduct);
        showPdData();
    }
}

// OnInput function
function onInputFunc(inpVal) {
    inpVal.addEventListener('input', () => {
        inpVal.classList.remove('invalid');
    })
}


function managePdData(obj) {
    let productArr = JSON.parse(localStorage.getItem('productObj'));

    if(productArr == null) {
        let newArr = [obj];
        localStorage.setItem('productObj', JSON.stringify(newArr));
    } else {
        productArr.push(obj);
        localStorage.setItem('productObj', JSON.stringify(productArr));
    }
}

let displayPd = document.getElementById('display-pd');
console.log(displayPd.children.length)

let cdDate = 31;
console.log(cdDate)

function showPdData() {
    let productArr = JSON.parse(localStorage.getItem('productObj'));
    if(productArr == null) {
        displayPd.innerHTML = `<tr><td colspan="4"><h3 class="message">No Product Data</h3></td></tr>`
    } else {
        let htmlTemplate = '';
        productArr.forEach((val, ind) => {

            let inpDate = new Date(val.date).getTime();
            let inpDateDisplay = new Date(val.date);
            let currDate = new Date().getTime();
            let remainDate = inpDate - currDate;

            let monthArr = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']

            let sec = 1000;
            let min = 60 * sec;
            let hour = 60 * min;
            let day = 24 * hour;

            let ed = Math.floor(remainDate / (day));

            htmlTemplate += `<tr>
                                <td>${val.desc}</td>
                                <td class="${ed < cdDate ? 'expired' : ''}">${inpDateDisplay.getDate()} ${monthArr[inpDateDisplay.getMonth()]}, ${inpDateDisplay.getFullYear()}</td>
                                <td><button class="btn__dlt" id="${ind}" onclick="deleteTask(this.id)"><i class="fas fa-trash"></i></button></td>
                            </tr>`;
        
        })
        displayPd.innerHTML = htmlTemplate;
        console.log(cdDate)
    }
}
showPdData();

// Delete Task Function
function deleteTask(ind) {
    let productArr = JSON.parse(localStorage.getItem('productObj'));
    if(productArr == null) {
        console.log('No Data Found')
    } else {
        productArr.splice(ind, 1);
        localStorage.setItem('productObj', JSON.stringify(productArr));
        showPdData();
        msg();
    }
}

function msg() {
    let displayPdArr = [...displayPd.children];

    if(displayPdArr.length == 0) {
        displayPd.innerHTML = `<tr><td colspan="4"><h4 class="msg">No Data found</h4></td></tr>`
    }
}
msg()


let menuBar = document.getElementById('menuBar');
let sideMenu = document.getElementById('side-menu');
let cancleBtn = document.getElementById('cancle');

menuBar.addEventListener('click', ()=> {
    sideMenu.classList.add('show__sidemunu');
})

cancleBtn.addEventListener('click', ()=> {
    sideMenu.classList.remove('show__sidemunu');
})

let week = document.getElementById('week');
let month = document.getElementById('month');
let year = document.getElementById('year');

setExpires(week, 7)
setExpires(month, 31)
setExpires(year, 365)

function setExpires(dates, days) {
    dates.addEventListener('click', ()=> {
        cdDate = days;
        showPdData();
        sideMenu.classList.remove('show__sidemunu');
    })
}