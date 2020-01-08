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

menuList.map( (item, i) =>
{
    let li = document.createElement('li');
    li.className = "nav-item";

    let link = document.createElement('a');
    link.className = "nav-link";
    link.innerHTML = item.name;
    link.href = "#"+item.link;
    link.onclick = function ()
    {
        link.active();
    };

    link.active = function ()
    {
        menuList.map( (item) => { item.el.classList.remove('active') });
        link.classList.add('active');

        openTab(tabs[item.link]);
    };

    li.appendChild(link);

    if(location.hash === "#"+item.link)
        link.classList.add('active');

    menuList[i].el = link;

    if(item.menu2)
        menu2.appendChild(li);
    else
        menu.appendChild(li);
} );

if(!location.hash)
    location.hash = "XbtUsd";

openTab(tabs[location.hash.substr(1)]);

window.onhashchange = function ()
{
    menuList.map( (item) =>
    {
        item.el.classList.remove('active');

        if(item.link === location.hash.substr(1))
            item.el.active();
    });
};

function openTab(tab)
{
    row1.innerHTML = "";
    row2.innerHTML = "";
    row4.innerHTML = "";

    row1.classList.add('d-none');
    row2.classList.add('d-none');
    row3.classList.add('d-none');
    row4.classList.add('d-none');

    if(tab) tab();
}

function Block(name, icon)
{
    let node = document.createElement('div');
    node.className = "block";

    let title = document.createElement('h4');
    title.className = "block-title";
    title.innerHTML = name;

    let body = document.createElement('div');
    body.className = "block-body";

    node.append = function (elements)
    {
        elements.map( (el) =>
        {
            body.appendChild(el);
        });
    };

    node.add = function (element)
    {
        body.appendChild(element);
    };

    node.appendChild(title);
    node.appendChild(body);

    return node;
}
