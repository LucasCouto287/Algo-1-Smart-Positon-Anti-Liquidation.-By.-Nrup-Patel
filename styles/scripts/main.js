let app = document.getElementById('app');

let menu = document.getElementById('menu1');
let menu2 = document.getElementById('menu2');

let row1 = document.getElementById('row1');
let row2 = document.getElementById('row2');
let row3 = document.getElementById('row3');
let row4 = document.getElementById('row4');

let tabsMain = {
    "BitMEX": document.getElementById('tab-BitMEX'),
    "Deribit": document.getElementById('tab-Deribit'),
    "Guide": document.getElementById('tab-Guide'),
    "Traders": document.getElementById('tab-Traders'),
};


let event = new CustomEvent("change");

function query(data)
{
    let query = [];

    Object.keys(data).map( (key) =>
    {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    } );

    return query.join('&');
}

let tabs = {
    "XbtUsd": XbtUsd,
    
    "XbtUsdLiq": XbtUsdLiq,
  
};

let menuList = [
    {
        name: "BTC S and F",
        link: "XbtUsd",
        el: undefined
    },
    {
  
        name: "BTC Liquidation",
        link: "XbtUsdLiq",
        el: undefined
    },
 
];

tabsMain['BitMEX'].active = function()
{
    menu.classList.remove('d-none');
    menu2.classList.add('d-none');

    tabsMain['BitMEX'].classList.add('active');
    tabsMain['Deribit'].classList.remove('active');
    tabsMain['Guide'].classList.remove('active');
    tabsMain['Traders'].classList.remove('active');

    document.getElementById('tab-body-Main').classList.add('d-block');
    document.getElementById('tab-body-Guide').classList.remove('d-block');
    document.getElementById('tab-body-Traders').classList.remove('d-block');
};
tabsMain['Deribit'].active = function()
{
    menu.classList.add('d-none');
    menu2.classList.remove('d-none');

    tabsMain['BitMEX'].classList.remove('active');
    tabsMain['Deribit'].classList.add('active');
    tabsMain['Guide'].classList.remove('active');
    tabsMain['Traders'].classList.remove('active');

    document.getElementById('tab-body-Main').classList.add('d-block');
    document.getElementById('tab-body-Guide').classList.remove('d-block');
    document.getElementById('tab-body-Traders').classList.remove('d-block');
};
tabsMain['Guide'].active = function()
{
    document.getElementById('tab-body-Main').classList.remove('d-block');
    document.getElementById('tab-body-Guide').classList.add('d-block');
    document.getElementById('tab-body-Traders').classList.remove('d-block');

    tabsMain['BitMEX'].classList.remove('active');
    tabsMain['Deribit'].classList.remove('active');
    tabsMain['Guide'].classList.add('active');
    tabsMain['Traders'].classList.remove('active');
};
tabsMain['Traders'].active = function()
{
    document.getElementById('tab-body-Main').classList.remove('d-block');
    document.getElementById('tab-body-Guide').classList.remove('d-block');
    document.getElementById('tab-body-Traders').classList.add('d-block');

    tabsMain['BitMEX'].classList.remove('active');
    tabsMain['Deribit'].classList.remove('active');
    tabsMain['Guide'].classList.remove('active');
    tabsMain['Traders'].classList.add('active');
};

Object.keys(tabsMain).map( (k) =>
{
    tabsMain[k].onclick = tabsMain[k].active;
} );
