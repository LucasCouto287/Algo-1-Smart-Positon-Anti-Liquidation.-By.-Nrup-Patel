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

function makeInput(icon, name, tooltip = "")
{
    let node = document.createElement('div');
    node.className = "input-row";

    let label = document.createElement('label');
    label.innerHTML = name;

    let group = document.createElement('div');
    group.className = "input-group input-group-sm";

    let prepend = document.createElement('div');
    prepend.className = "input-group-prepend";
    prepend.innerHTML = `<div class="input-group-text"><i class="fa-fw ${icon}"></i></div>`;

    let append = document.createElement('div');
    append.className = "input-group-append";

    if(tooltip)
    {
        let icon = document.createElement('i');
        icon.className = "fa fa-question-circle ml-1";
        icon.setAttribute("title", tooltip);

        label.appendChild(icon);
    }

    let input = document.createElement('input');
    input.className = "form-control";
    input.placeholder = name;
    input.onkeypress = function(evt)
    {
        let charCode = (evt.which) ? evt.which : event.keyCode;

        let can = !(charCode > 31 && (charCode < 48 || charCode > 57));

        if(charCode === 46)
            can = true;

        return can;
    };

    let btn_up = document.createElement('div');
    btn_up.className = "input-group-text";
    btn_up.innerHTML = `<i class="fa fa-fw fa-plus"></i>`;
    btn_up.onclick = function()
    {
        let number = input.value ? input.value : 0;
        input.value = parseInt(number) + 1;
        input.dispatchEvent(event);
    };

    let btn_down = document.createElement('div');
    btn_down.className = "input-group-text";
    btn_down.innerHTML = `<i class="fa fa-fw fa-minus"></i>`;
    btn_down.onclick = function()
    {
        let number = input.value ? input.value : 0;

        if(number > 0)
            input.value = parseInt(number) - 1;
        else
            input.value = parseInt(number);

        input.dispatchEvent(event);
    };

    append.appendChild(btn_up);
    append.appendChild(btn_down);

    group.appendChild(prepend);
    group.appendChild(input);
    group.appendChild(append);

    node.appendChild(label);
    node.appendChild(group);

    node.val = function (v  = null)
    {
        if(v)
        {
            input.value = v;
            input.dispatchEvent(event);
        }
        else {
            if(input.value)
            {
                if(Number(input.value) === input.value && input.value % 1 !== 0)
                    return parseInt(input.value);
                else return parseFloat(input.value);
            }
            else return undefined;

        }

        return node;
    };

    node.input = function ()
    {
        return input;
    };

    return node;
}

function makeDate(icon, name, tooltip = "")
{
    let node = document.createElement('div');
    node.className = "input-row";

    let label = document.createElement('label');
    label.innerHTML = name;

    let group = document.createElement('div');
    group.className = "input-group input-group-sm";

    let prepend = document.createElement('div');
    prepend.className = "input-group-prepend";
    prepend.innerHTML = `<div class="input-group-text"><i class="fa-fw ${icon}"></i></div>`;

    if(tooltip)
    {
        let icon = document.createElement('i');
        icon.className = "fa fa-question-circle ml-1";
        icon.setAttribute("title", tooltip);

        label.appendChild(icon);
    }

    let input = document.createElement('input');
    input.className = "form-control";
    input.placeholder = name;
    input.onkeypress = function(evt)
    {
        let charCode = (evt.which) ? evt.which : event.keyCode;

        let can = !(charCode > 31 && (charCode < 48 || charCode > 57));

        if(charCode === 46)
            can = true;

        return can;
    };

    group.appendChild(prepend);
    group.appendChild(input);

    node.appendChild(label);
    node.appendChild(group);

    flatpickr(input, {
        onChange: function(selectedDates, dateStr, instance) {
            input.dispatchEvent(event);
        }
    });

    node.val = function (v  = null)
    {
        if(v)
        {
            input.value = v;
            input.dispatchEvent(event);
        }
        else {
            let m = Math.abs(new Date() - new Date(input.value));

            return Math.floor(m / (24*60*60*1000) ) + 1
        }

        return node;
    };

    node.input = function ()
    {
        return input;
    };

    return node;
}

function staticInput(icon, name, tooltip = "")
{
    let node = document.createElement('div');
    node.className = "input-row";

    let label = document.createElement('label');
    label.innerHTML = name;

    let group = document.createElement('div');
    group.className = "input-group input-group-sm";

    let prepend = document.createElement('div');
    prepend.className = "input-group-prepend";
    prepend.innerHTML = `<div class="input-group-text"><i class="fa-fw ${icon}"></i></div>`;

    if(tooltip)
    {
        let icon = document.createElement('i');
        icon.className = "fa fa-question-circle ml-1";
        icon.setAttribute("title", tooltip);

        label.appendChild(icon);
    }

    let input = document.createElement('input');
    input.className = "form-control";
    input.setAttribute("readonly", "true");
    input.placeholder = name;
    input.onkeypress = function(evt)
    {
        let charCode = (evt.which) ? evt.which : event.keyCode;

        return !(charCode > 31 && (charCode < 48 || charCode > 57));
    };

    group.appendChild(prepend);
    group.appendChild(input);

    node.appendChild(label);
    node.appendChild(group);

    node.val = function (v  = null)
    {
        if(v)
        {
            input.value = v;
            input.dispatchEvent(event);
        }
        else return parseInt(input.value);

        return node;
    };

    node.input = function ()
    {
        return input;
    };

    return node;
}

function slider(name)
{
    let value = 0;

    let node = document.createElement('div');
    node.className = "input-row select-group";

    let label = document.createElement('label');
    label.innerHTML = name;

    let row = document.createElement('div');
    row.className = "select-row";

    let res = document.createElement('span');

    let slider = document.createElement('input');
    slider.type = "range";
    slider.min = "1";
    slider.max = "100";
    slider.onchange = function ()
    {
        node.val(slider.value);
    };

    let listener = function()
    {
        window.requestAnimationFrame(function() {res.innerHTML = slider.value});
    };

    slider.addEventListener("mousedown", function()
    {
        listener();
        slider.addEventListener("mousemove", listener);
    });
    slider.addEventListener("mouseup", function()
    {
        slider.removeEventListener("mousemove", listener);
    });

    row.appendChild(slider);
    row.appendChild(res);

    node.val = function (v  = null)
    {
        if(v)
        {
            value = v;
            slider.value = v;

            res.innerHTML = value;

            node.dispatchEvent(event);
        }
        else {
            if(value) return value;
            else return undefined;
        }

        return node;
    };

    node.appendChild(label);
    node.appendChild(row);

    node.val(1);

    return node;
}
