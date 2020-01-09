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

function makeResultRow(data)
{
    let node = document.createElement('div');
    node.className = "table-row";
    node.binds = {};
    node.eval = data.eval;

    let value = 0;

    let label = document.createElement('span');
    label.innerHTML = data["name"] + ":";

    if(data["tooltip"])
    {
        let icon = document.createElement('i');
        icon.className = "fa fa-question-circle ml-1";
        icon.setAttribute("title", data["tooltip"]);

        label.appendChild(icon);
    }

    let event = new CustomEvent("change");

    let result = document.createElement('span');
    let result2 = document.createElement('span');

    node.appendChild(label);
    node.appendChild(result);

    node.val = function (v, v2 = undefined)
    {
        if(v !== undefined && v2 === undefined)
        {
            value = v;

            if(Number(value) === value && value % 1 !== 0)
                value = value.toFixed( data['fix'] !== undefined ? data['fix'] : 2 );

            result.innerHTML = value;

            if(data["append"] === "$") result.innerHTML = `<small>$</small>${value}`;
            if(data["append"] === "BTC") result.innerHTML = `${value} <small>BTC</small>`;
            if(data["append"] === "%") result.innerHTML = `${value}<small>%</small>`;

            node.dispatchEvent(event);
        }
        else if(v !== undefined && v2 !== undefined)
        {
            value = [v, v2];

            if(Number(value[0]) === value[0] && value[0] % 1 !== 0)
                value[0] = value[0].toFixed( data['fix'] !== undefined ? data['fix'] : 2 );

            if(Number(value[1]) === value[1] && value[1] % 1 !== 0)
                value[1] = value[1].toFixed( data['fix'] !== undefined ? data['fix'] : 2 );

            result.innerHTML = value[0];
            result2.innerHTML = value[1];

            if(value[1])
            {
                if(data["append"] === "$") result2.innerHTML = `<small>$</small>${value[1]}`;
                if(data["append"] === "BTC") result2.innerHTML = `${value[1]} <small>BTC</small>`;
                if(data["append"] === "%") result2.innerHTML = `${value[1]}<small>%</small>`;
            }

            if(value[0])
            {
                if(data["append"] === "$") result.innerHTML = `<small>$</small>${value[0]}`;
                if(data["append"] === "BTC") result.innerHTML = `${value[0]} <small>BTC</small>`;
                if(data["append"] === "%") result.innerHTML = `${value[0]}<small>%</small>`;
            }

            node.dispatchEvent(event);
        }
        else return value;

        return node;
    };

    if(typeof data["eval"] !== "function")
    {
        if(data["twoCol"])
        {
            node.appendChild(result2);
            value = [0, 0];
            node.val(0, 0);
        }
        else node.val(0);
    }

    if(data["inner"])
        node.val(data["inner"]);

    node.calc = function (data)
    {
        Object.keys(data).map( (k) =>
        {
            let input = data[k].input ? data[k].input() : data[k];

            if(k.substr(0, 2) !== "a.")
                input.addEventListener("change", m, false);

            function m()
            {
                let can = true;
                let evl = node.eval;

                if(typeof evl === "function")
                {
                    value = evl(data).replace(`<small>$</small>`, '');
                    result.innerHTML = evl(data);
                    node.dispatchEvent(event);
                }
                else if(typeof evl !== "string")
                {
                    let e = evl["long"] && typeof evl["long"] !== "function" ? evl["long"] : '';
                    let e2 = evl["short"] && typeof evl["short"] !== "function" ? evl["short"] : '';

                    Object.keys(data).map( (key) =>
                    {
                        let s = data[key].val ? data[key].val() : data[key];

                        if(key.substr(0, 3) === "rl.")
                            s = data[key].val()[0];

                        if(key.substr(0, 3) === "rs.")
                            s = data[key].val()[1];

                        if(e) e = e.replace(new RegExp(key, 'g'), s);
                        if(e2) e2 = e2.replace(new RegExp(key, 'g'), s);

                        if(s === undefined)
                            can = false;
                    } );

                    if(can)
                    {
                        if(e) e = math.eval(e);
                        if(e2) e2 = math.eval(e2);

                        if(e !== e/0 && !isNaN(e) && e2 !== e2/0 && !isNaN(e2))
                            node.val(e, e2);

                        if(evl["long_minZero"] && e < 0)
                        {
                            result.innerHTML = "0";
                            node.val(0, 0);
                        }
                        if(evl["short_minZero"] && e2 < 0)
                        {
                            result2.innerHTML = "0";
                            node.val(0, 0);
                        }

                        if(evl["long_maxZero"] && e > 0)
                        {
                            result.innerHTML = "0";
                            node.val(0, 0);
                        }
                        if(evl["short_maxZero"] && e2 > 0)
                        {
                            result2.innerHTML = "0";
                            node.val(0, 0);
                        }

                        if(evl["short_inner"]) result2.innerHTML = evl["short_inner"];
                        if(evl["long_inner"]) result.innerHTML = evl["long_inner"];

                        if(typeof evl["short"] === "function")
                        {
                            value[1] = evl["short"](data);
                            result2.innerHTML = evl["short"](data);
                            node.dispatchEvent(event);
                        }

                        if(typeof evl["long"] === "function")
                        {
                            value[0] = evl["long"](data);
                            result.innerHTML = evl["long"](data);
                            node.dispatchEvent(event);
                        }
                    }
                }
                else
                {
                    let e = evl;

                    Object.keys(data).map( (key) =>
                    {
                        e = e.replace(new RegExp(key, 'g'), data[key].val());

                        if(data[key].val() === undefined)
                            can = false;
                    } );

                    if(can)
                    {
                        e = math.eval(e);

                        if(e !== e/0 && !isNaN(e))
                            node.val(e);
                    }
                }
            }
        } );
    };

    node.inputs = function (arg)
    {
        node.binds = arg;
        node.calc(node.binds);
    };

    return node;
}

// -------------------------------------------------

function XbtUsd()
{
    tabsMain['BitMEX'].active();

    row1.classList.remove('d-none');
    row2.classList.remove('d-none');
    row3.classList.remove('d-none');

    let i = {
        BTC_Price: makeInput("fa fa-usd", "Bitcoin Price $", ""),
        Capital: makeInput("fa fa-btc", "Capital ", ""),
        Risk_Amount: makeInput("fa fa-percent", "Risk Amount %"),
        Distance_to_Stop: makeInput("fa fa-usd", "Distance to Stop $", ""),
        Distance_to_Target: makeInput("fa fa-usd", "Distance to Target $", ""),
        Entry_Price: makeInput("fa fa-usd", "Entry Price $", "")
    };

    let r = {
        Capital: makeResultRow({
            name: "Capital",
            append: "$",
            eval: "i.Capital * i.BTC_Price"
        }),
        Position_Size: makeResultRow({
            name: "Position Size",
            append: "$",
            fix: 0,
            eval: "(r.Risk_Amount_USD / r.Margin) * 100",
            tooltip: ""
        }),
        Risk_Amount_USD: makeResultRow({
            name: "Risk Amount (USD)",
            append: "$",
            fix: 0,
            eval: "(r.Capital / 100) * i.Risk_Amount",
            tooltip: ""
        }),
        Risk_Amount_BTC: makeResultRow({
            name: "Risk Amount (BTC)",
            append: "BTC",
            fix: 3,
            eval: "(i.Capital / 100) * i.Risk_Amount"
        }),
        Margin: makeResultRow({
            name: "Margin",
            append: "%",
            eval: "(i.Distance_to_Stop / i.Entry_Price) * 100",
        }),
        Leverage: makeResultRow({
            name: "Leverage",
            append: "",
            fix: 0,
            eval: "r.Position_Size / r.Risk_Amount_USD",
            tooltip: ""
        }),
        Long_Stop: makeResultRow({
            name: "Long Stop",
            append: "$",
            eval: "i.Entry_Price - i.Distance_to_Stop"
        }),
        Short_Stop: makeResultRow({
            name: "Short Stop",
            append: "$",
            eval: "i.Entry_Price + i.Distance_to_Stop"
        }),
        Distance_to_Target: makeResultRow({
            name: "Distance to Target",
            append: "%",
            eval: "(i.Distance_to_Target / i.Entry_Price) * 100"
        }),
        Long_Target: makeResultRow({
            name: "Long Target",
            append: "$",
            eval: "i.Entry_Price + i.Distance_to_Target"
        }),
        Short_Target: makeResultRow({
            name: "Short Target",
            append: "$",
            eval: "i.Entry_Price - i.Distance_to_Target"
        }),
        Return_Risk: makeResultRow({
            name: "Return/Risk",
            append: "",
            eval: "i.Distance_to_Target / i.Distance_to_Stop",
            tooltip: ""
        })
    };

    r["Capital"].inputs({
        "i.Capital": i["Capital"],
        "i.BTC_Price": i["BTC_Price"]
    });
    r["Position_Size"].inputs({
        "r.Risk_Amount_USD": r["Risk_Amount_USD"],
        "r.Margin": r["Margin"]
    });
    r["Risk_Amount_USD"].inputs({
        "r.Capital": r["Capital"],
        "i.Risk_Amount": i["Risk_Amount"]
    });
    r["Risk_Amount_BTC"].inputs({
        "i.Capital": i["Capital"],
        "i.Risk_Amount": i["Risk_Amount"]
    });
    r["Margin"].inputs({
        "i.Distance_to_Stop": i["Distance_to_Stop"],
        "i.Entry_Price": i["Entry_Price"]
    });
    r["Leverage"].inputs({
        "r.Position_Size": r["Position_Size"],
        "r.Risk_Amount_USD": r["Risk_Amount_USD"]
    });
    r["Long_Stop"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "i.Distance_to_Stop": i["Distance_to_Stop"]
    });
    r["Short_Stop"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "i.Distance_to_Stop": i["Distance_to_Stop"]
    });
    r["Distance_to_Target"].inputs({
        "i.Distance_to_Target": i["Distance_to_Target"],
        "i.Entry_Price": i["Entry_Price"]
    });
    r["Long_Target"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "i.Distance_to_Target": i["Distance_to_Target"]
    });
    r["Short_Target"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "i.Distance_to_Target": i["Distance_to_Target"]
    });
    r["Return_Risk"].inputs({
        "i.Distance_to_Target": i["Distance_to_Target"],
        "i.Distance_to_Stop": i["Distance_to_Stop"]
    });

    let enter_block = new Block("Enter Data", "");
    enter_block.className += " enter_data";

    let result_block = new Block("Result", "");
    result_block.className += " result";

    Object.keys(i).map( (k) =>
    {
        enter_block.add(i[k])
    } );

    Object.keys(r).map( (k) =>
    {
        result_block.add(r[k])
    } );

    row1.appendChild( enter_block );
    row2.appendChild( result_block );

    $.get('https://data.messari.io/api/v1/assets/btc/metrics', resp => {
        let price = resp.data.market_data.price_usd;
        i["BTC_Price"].val( price.toFixed(0) );
    });

    tippy('[title]');
}

function EthUsd()
{
    tabsMain['BitMEX'].active();

    row1.classList.remove('d-none');
    row2.classList.remove('d-none');
    row3.classList.remove('d-none');

    let i = {
        BTC_Price: makeInput("fa fa-usd", "Bitcoin Price", ""),
        ETH_Price: makeInput("fa fa-usd", "Ethereum Price", ""),
        Capital: makeInput("fa fa-btc", "Capital", ""),
        Risk_Amount: makeInput("fa fa-percent", ""),
        Distance_to_Stop: makeInput("fa fa-usd", "Distance to Stop", ""),
        Distance_to_Target: makeInput("fa fa-usd", "Distance to Target", ""),
        Entry_Price: makeInput("fa fa-usd", "Entry Price", "")
    };

    let r = {
        ETHUSD_Swap_Contract_BTC: makeResultRow({
            name: "ETHUSD Swap Contract (BTC)",
            fix: 8,
            append: "BTC",
            eval: "i.ETH_Price * 0.000001"
        }),
        ETHUSD_Swap_Contract_USD: makeResultRow({
            name: "ETHUSD Swap Contract (USD)",
            append: "$",
            eval: "i.BTC_Price * r.ETHUSD_Swap_Contract_BTC"
        }),
        Capital: makeResultRow({
            name: "Capital (USD)",
            append: "$",
            eval: "i.Capital * i.BTC_Price"
        }),
        Position_Size_Contracts: makeResultRow({
            name: "Position Size (Contracts)",
            fix: 0,
            eval: "((r.Risk_Amount_USD / r.Margin) / r.ETHUSD_Swap_Contract_USD) * 100",
            tooltip: ""
        }),
        Position_Size: makeResultRow({
            name: "Position Size (USD)",
            append: "$",
            fix: 0,
            eval: "(r.Risk_Amount_USD / r.Margin) * 100"
        }),
        Risk_Amount_USD: makeResultRow({
            name: "Risk Amount (USD)",
            append: "$",
            fix: 0,
            eval: "(r.Capital / 100) * i.Risk_Amount",
            tooltip: ""
        }),
        Risk_Amount_BTC: makeResultRow({
            name: "Risk Amount (BTC)",
            append: "BTC",
            fix: 3,
            eval: "(i.Capital / 100) * i.Risk_Amount"
        }),
        Margin: makeResultRow({
            name: "Margin (%)",
            append: "%",
            eval: "(i.Distance_to_Stop / i.Entry_Price) * 100"
        }),
        Leverage: makeResultRow({
            name: "Leverage",
            append: "",
            eval: "r.Position_Size / r.Risk_Amount_USD",
            tooltip: ""
        }),
        Long_Stop: makeResultRow({
            name: "Long Stop",
            append: "$",
            eval: "i.Entry_Price - i.Distance_to_Stop"
        }),
        Short_Stop: makeResultRow({
            name: "Short Stop",
            append: "$",
            eval: "i.Entry_Price + i.Distance_to_Stop"
        }),
        Distance_to_Target: makeResultRow({
            name: "Distance to Target (%)",
            append: "%",
            eval: "(i.Distance_to_Target / i.Entry_Price) * 100"
        }),
        Long_Target: makeResultRow({
            name: "Long Target",
            append: "$",
            eval: "i.Entry_Price + i.Distance_to_Target"
        }),
        Short_Target: makeResultRow({
            name: "Short Target",
            append: "$",
            eval: "i.Entry_Price - i.Distance_to_Target"
        }),
        Return_Risk: makeResultRow({
            name: "Return/Risk",
            append: "",
            eval: "i.Distance_to_Target / i.Distance_to_Stop",
            tooltip: ""
        })
    };

    r["ETHUSD_Swap_Contract_BTC"].inputs({
        "i.ETH_Price": i["ETH_Price"]
    });
    r["ETHUSD_Swap_Contract_USD"].inputs({
        "i.BTC_Price": i["BTC_Price"],
        "r.ETHUSD_Swap_Contract_BTC": r["ETHUSD_Swap_Contract_BTC"]
    });
    r["Capital"].inputs({
        "i.Capital": i["Capital"],
        "i.BTC_Price": i["BTC_Price"]
    });
    r["Position_Size_Contracts"].inputs({
        "r.Risk_Amount_USD": r["Risk_Amount_USD"],
        "r.ETHUSD_Swap_Contract_USD": r["ETHUSD_Swap_Contract_USD"],
        "r.Margin": r["Margin"]
    });
    r["Position_Size"].inputs({
        "r.Risk_Amount_USD": r["Risk_Amount_USD"],
        "r.Margin": r["Margin"]
    });
    r["Risk_Amount_USD"].inputs({
        "r.Capital": r["Capital"],
        "i.Risk_Amount": i["Risk_Amount"]
    });
    r["Risk_Amount_BTC"].inputs({
        "i.Capital": i["Capital"],
        "i.Risk_Amount": i["Risk_Amount"]
    });
    r["Margin"].inputs({
        "i.Distance_to_Stop": i["Distance_to_Stop"],
        "i.Entry_Price": i["Entry_Price"]
    });
    r["Leverage"].inputs({
        "r.Position_Size": r["Position_Size"],
        "r.Risk_Amount_USD": r["Risk_Amount_USD"]
    });
    r["Long_Stop"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "i.Distance_to_Stop": i["Distance_to_Stop"]
    });
    r["Short_Stop"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "i.Distance_to_Stop": i["Distance_to_Stop"]
    });
    r["Distance_to_Target"].inputs({
        "i.Distance_to_Target": i["Distance_to_Target"],
        "i.Entry_Price": i["Entry_Price"]
    });
    r["Long_Target"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "i.Distance_to_Target": i["Distance_to_Target"]
    });
    r["Short_Target"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "i.Distance_to_Target": i["Distance_to_Target"]
    });
    r["Return_Risk"].inputs({
        "i.Distance_to_Target": i["Distance_to_Target"],
        "i.Distance_to_Stop": i["Distance_to_Stop"]
    });

    let enter_block = new Block("Enter Data", "");
    enter_block.className += " enter_data";

    let result_block = new Block("Result", "");
    result_block.className += " result";

    Object.keys(r).map( (k) =>
    {
        result_block.add(r[k])
    } );

    Object.keys(i).map( (k) =>
    {
        enter_block.add(i[k]);
    } );

    row1.appendChild( enter_block );
    row2.appendChild( result_block );



    $.get('https://data.messari.io/api/v1/assets/btc/metrics', resp => {
        let price = resp.data.market_data.price_usd;
        i["BTC_Price"].val( price.toFixed(0) );
    });

    $.get('https://data.messari.io/api/v1/assets/eth/metrics', resp => {
        let price = resp.data.market_data.price_usd;
        i["ETH_Price"].val( price.toFixed(0) );
    });

    tippy('[title]');
}

function Ethf()
{
    tabsMain['BitMEX'].active();

    row1.classList.remove('d-none');
    row2.classList.remove('d-none');
    row3.classList.remove('d-none');

    let i = {
        ETHBTC_Price: makeInput("fa fa-usd", "ETHBTC Price", ""),
        ETH_Price: makeInput("fa fa-usd", "Ethereum Price", ""),
        BTC_Price: makeInput("fa fa-usd", "Bitcoin Price", ""),
        Capital: makeInput("fa fa-btc", "Capital", ""),
        Risk_Amount: makeInput("fa fa-percent", "Risk Amount", ""),
        Distance_to_Stop: makeInput("fa fa-btc", "Distance to Stop", ""),
        Distance_to_Target: makeInput("fa fa-btc", "Distance to Target", ""),
        Entry_Price: makeInput("fa fa-btc", "Entry Price", "")
    };

    let r = {
        Capital: makeResultRow({
            name: "Capital",
            append: "$",
            eval: "i.Capital * i.BTC_Price"
        }),
        Position_Size_ETH: makeResultRow({
            name: "Position Size (ETH)",
            fix: 0,
            eval: "((r.Risk_Amount_USD / r.Margin) / i.ETH_Price) * 100",
            tooltip: ""
        }),
        Position_Size: makeResultRow({
            name: "Position Size",
            append: "$",
            fix: 0,
            eval: "(r.Risk_Amount_USD / r.Margin) * 100"
        }),
        Risk_Amount_USD: makeResultRow({
            name: "Risk Amount (USD)",
            append: "$",
            fix: 0,
            eval: "(r.Capital / 100) * i.Risk_Amount",
            tooltip: ""
        }),
        Risk_Amount_BTC: makeResultRow({
            name: "Risk Amount (BTC)",
            append: "BTC",
            fix: 3,
            eval: "(i.Capital / 100) * i.Risk_Amount"
        }),
        Margin: makeResultRow({
            name: "Margin",
            append: "%",
            eval: "(i.Distance_to_Stop / i.Entry_Price) * 100",
        }),
        Leverage: makeResultRow({
            name: "Leverage",
            append: "",
            eval: "r.Position_Size / r.Risk_Amount_USD",
            tooltip: ""
        }),
        Long_Stop: makeResultRow({
            name: "Long Stop",
            append: "BTC",
            fix: 5,
            eval: "i.Entry_Price - i.Distance_to_Stop"
        }),
        Short_Stop: makeResultRow({
            name: "Short Stop",
            append: "BTC",
            fix: 5,
            eval: "i.Entry_Price + i.Distance_to_Stop"
        }),
        Distance_to_Target: makeResultRow({
            name: "Distance to Target",
            append: "%",
            eval: "(i.Distance_to_Target / i.Entry_Price) * 100"
        }),
        Long_Target: makeResultRow({
            name: "Long Target",
            append: "BTC",
            fix: 5,
            eval: "i.Entry_Price + i.Distance_to_Target"
        }),
        Short_Target: makeResultRow({
            name: "Short Target",
            append: "BTC",
            fix: 5,
            eval: "i.Entry_Price - i.Distance_to_Target"
        }),
        Return_Risk: makeResultRow({
            name: "Return/Risk",
            fix: 2,
            eval: "i.Distance_to_Target / i.Distance_to_Stop",
            tooltip: ""
        })
    };

    r["Capital"].inputs({
        "i.Capital": i["Capital"],
        "i.BTC_Price": i["BTC_Price"]
    });
    r["Position_Size_ETH"].inputs({
        "r.Risk_Amount_USD": r["Risk_Amount_USD"],
        "r.Margin": r["Margin"],
        "i.ETH_Price": i["ETH_Price"]
    });
    r["Position_Size"].inputs({
        "r.Risk_Amount_USD": r["Risk_Amount_USD"],
        "r.Margin": r["Margin"]
    });
    r["Risk_Amount_USD"].inputs({
        "r.Capital": r["Capital"],
        "i.Risk_Amount": i["Risk_Amount"]
    });
    r["Risk_Amount_BTC"].inputs({
        "i.Capital": i["Capital"],
        "i.Risk_Amount": i["Risk_Amount"]
    });
    r["Margin"].inputs({
        "i.Distance_to_Stop": i["Distance_to_Stop"],
        "i.Entry_Price": i["Entry_Price"]
    });
    r["Leverage"].inputs({
        "r.Position_Size": r["Position_Size"],
        "r.Risk_Amount_USD": r["Risk_Amount_USD"]
    });
    r["Long_Stop"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "i.Distance_to_Stop": i["Distance_to_Stop"]
    });
    r["Short_Stop"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "i.Distance_to_Stop": i["Distance_to_Stop"]
    });
    r["Distance_to_Target"].inputs({
        "i.Distance_to_Target": i["Distance_to_Target"],
        "i.Entry_Price": i["Entry_Price"]
    });
    r["Long_Target"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "i.Distance_to_Target": i["Distance_to_Target"]
    });
    r["Short_Target"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "i.Distance_to_Target": i["Distance_to_Target"]
    });
    r["Return_Risk"].inputs({
        "i.Distance_to_Target": i["Distance_to_Target"],
        "i.Distance_to_Stop": i["Distance_to_Stop"]
    });

    let enter_block = new Block("Enter Data", "");
    enter_block.className += " enter_data";

    let result_block = new Block("Result", "");
    result_block.className += " result";

    Object.keys(r).map( (k) =>
    {
        result_block.add(r[k])
    } );

    Object.keys(i).map( (k) =>
    {
        enter_block.add(i[k]);
    } );

    row1.appendChild( enter_block );
    row2.appendChild( result_block );

    $.get('https://data.messari.io/api/v1/assets/btc/metrics', resp => {
        let price = resp.data.market_data.price_usd;
        i["BTC_Price"].val( price.toFixed(0) );
    });

    $.get('https://data.messari.io/api/v1/assets/eth/metrics', resp => {
        let price = resp.data.market_data.price_usd;
        i["ETH_Price"].val( price.toFixed(0) );
    });
    $.get('https://data.messari.io/api/v1/assets/eth/metrics', resp => {
        let price = resp.data.market_data.price_btc;
        i["ETHBTC_Price"].val( price.toFixed(6) );
    });

    tippy('[title]');
}

function XbtUsdLiq()
{
    tabsMain['BitMEX'].active();

    row1.classList.remove('d-none');
    row2.classList.remove('d-none');

    let i = {
        BTC_Price: makeInput("fa fa-usd", "Bitcoin Price", ""),
        Entry_Price: makeInput("fa fa-usd", "Entry Price", ""),
        Leverage: slider("Leverage"),
        Position_Size: makeInput("fa fa-usd", "Position Size")
    };

    let a = {
        Maintenance_Margin: makeResultRow({
            name: "Maintenance Margin",
            fix: 6,
            inner: "0.005"
        }),
        Adjusted_Long: makeResultRow({
            name: "Adjusted Long",
            fix: 6,
            eval: "a.Maintenance_Margin - (1 / i.Leverage * a.Maintenance_Margin)"
        }),
        Adjusted_Short: makeResultRow({
            name: "Adjusted Short",
            fix: 6,
            eval: "a.Maintenance_Margin + (1 / i.Leverage * a.Maintenance_Margin)"
        })
    };

    let rsm = {
        Initial_Margin: makeResultRow({
            name: "Initial Margin",
            append: "BTC",
            fix: 4,
            eval: "(i.Position_Size / i.BTC_Price) / i.Leverage"
        }),
        Taker_Fees: makeResultRow({
            name: "2 x Taker Fees",
            append: "BTC",
            fix: 4,
            eval: "(0.0015 * i.Position_Size) / i.BTC_Price"
        }),
        Cost_BTC: makeResultRow({
            name: "Cost (BTC)",
            append: "BTC",
            fix: 4,
            eval: "rsm.Initial_Margin + rsm.Taker_Fees",
            tooltip: ""
        }),
        Cost_USD: makeResultRow({
            name: "Cost (USD)",
            append: "$",
            fix: 0,
            eval: "rsm.Cost_BTC * i.BTC_Price"
        })
    };

    let r = {
        Liquidation_Price: makeResultRow({
            name: "Liquidation Price",
            append: "$",
            twoCol: true,
            eval: {
                long: "i.Entry_Price + (i.Entry_Price * rl.Change_PL_P) / 100",
                short: "i.Entry_Price + (i.Entry_Price * rs.Change_PL_P) / 100"
            },
            tooltip: ""
        }),
        Change_PL_P: makeResultRow({
            name: "Change in Price to Liquidation (%)",
            append: "%",
            twoCol: true,
            eval: {
                long: "rl.Change_PB_P + (a.Adjusted_Long * 100)",
                short: "rs.Change_PB_P - (a.Adjusted_Short * 100)"
            },
            tooltip: ""
        }),
        Change_PL_USD: makeResultRow({
            name: "Change in Price to Liquidation ($)",
            append: "$",
            twoCol: true,
            eval: {
                long: "(i.Entry_Price - rl.Liquidation_Price) * (-1)",
                short: "(i.Entry_Price - rs.Liquidation_Price) * (-1)"
            }
        }),

        Bankruptcy_Price: makeResultRow({
            name: "Bankruptcy Price",
            append: "$",
            fix: 0,
            twoCol: true,
            eval: {
                long: "i.Entry_Price + (i.Entry_Price * (rl.Change_PB_P / 100))",
                short: "i.Entry_Price + (i.Entry_Price * (rs.Change_PB_P / 100))"
            },
            tooltip: ""
        }),
        Change_PB_P: makeResultRow({
            name: "Change in Price to Bankruptcy (%)",
            append: "%",
            twoCol: true,
            eval: {
                long: "(1 / (i.Leverage + 1) * (-1)) * 100",
                short: "(1 / (i.Leverage - 1)) * 100"
            }
        }),
        Change_PB_USD: makeResultRow({
            name: "Change in Price to Bankruptcy ($)",
            append: "$",
            twoCol: true,
            eval: {
                long: "(i.Entry_Price - rl.Bankruptcy_Price) * (-1)",
                short: "(i.Entry_Price - rs.Bankruptcy_Price) * (-1)"
            }
        }),

        Total_Loss_BTC: makeResultRow({
            name: "Total Loss (BTC)",
            append: "$",
            fix: 4,
            twoCol: true,
            eval: {
                long: "rsm.Initial_Margin + (rsm.Taker_Fees / 2)",
                short: "rsm.Initial_Margin + (rsm.Taker_Fees / 2)"
            },
            tooltip: ""
        }),
        Total_Loss_USD: makeResultRow({
            name: "Total Loss ($)",
            append: "$",
            twoCol: true,
            eval: {
                long: "rl.Total_Loss_BTC * rl.Liquidation_Price",
                short: "rs.Total_Loss_BTC * rs.Liquidation_Price"
            }
        }),
        Payment_IF_BTC: makeResultRow({
            name: "Payment to Insurance Fund (BTC)",
            append: "BTC",
            fix: 4,
            twoCol: true,
            eval: {
                long: "(rsm.Cost_BTC * rl.Payment_IF_P) * 0.01",
                short: "(rsm.Cost_BTC * rs.Payment_IF_P) * 0.01"
            }
        }),
        Payment_IF_USD: makeResultRow({
            name: "Payment to Insurance Fund ($)",
            append: "$",
            twoCol: true,
            eval: {
                long: "rl.Payment_IF_BTC * rl.Liquidation_Price",
                short: "rs.Payment_IF_BTC * rs.Liquidation_Price"
            }
        }),
        Payment_IF_P: makeResultRow({
            name: "Payment to Insurance Fund <br> (% of Total Loss)",
            append: "%",
            twoCol: true,
            eval: {
                long: "(1 - (rl.Change_PL_P / rl.Change_PB_P)) * 100",
                short: "(1 - (rs.Change_PL_P / rs.Change_PB_P)) * 100"
            },
            tooltip: ""
        })
    };

    a["Adjusted_Long"].inputs({
        "a.Maintenance_Margin": a["Maintenance_Margin"],
        "i.Leverage": i["Leverage"]
    });
    a["Adjusted_Short"].inputs({
        "a.Maintenance_Margin": a["Maintenance_Margin"],
        "i.Leverage": i["Leverage"]
    });

    rsm["Initial_Margin"].inputs({
        "i.Position_Size": i["Position_Size"],
        "i.BTC_Price": i["BTC_Price"],
        "i.Leverage": i["Leverage"]
    });
    rsm["Taker_Fees"].inputs({
        "i.Position_Size": i["Position_Size"],
        "i.BTC_Price": i["BTC_Price"]
    });
    rsm["Cost_BTC"].inputs({
        "rsm.Initial_Margin": rsm["Initial_Margin"],
        "rsm.Taker_Fees": rsm["Taker_Fees"]
    });
    rsm["Cost_USD"].inputs({
        "rsm.Cost_BTC": rsm["Cost_BTC"],
        "i.BTC_Price": i["BTC_Price"]
    });

    r["Liquidation_Price"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "rl.Change_PL_P": r["Change_PL_P"],
        "rs.Change_PL_P": r["Change_PL_P"]
    });
    r["Change_PL_P"].inputs({
        "rl.Change_PB_P": r["Change_PB_P"],
        "rs.Change_PB_P": r["Change_PB_P"],
        "a.Adjusted_Long": a["Adjusted_Long"],
        "a.Adjusted_Short": a["Adjusted_Short"]
    });
    r["Change_PL_USD"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "rl.Liquidation_Price": r["Liquidation_Price"],
        "rs.Liquidation_Price": r["Liquidation_Price"]
    });

    r["Bankruptcy_Price"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "rl.Change_PB_P": r["Change_PB_P"],
        "rs.Change_PB_P": r["Change_PB_P"]
    });
    r["Change_PB_P"].inputs({
        "i.Leverage": i["Leverage"]
    });
    r["Change_PB_USD"].inputs({
        "i.Entry_Price": i["Entry_Price"],
        "rl.Bankruptcy_Price": r["Bankruptcy_Price"],
        "rs.Bankruptcy_Price": r["Bankruptcy_Price"]
    });

    r["Total_Loss_BTC"].inputs({
        "rsm.Initial_Margin": rsm["Initial_Margin"],
        "rsm.Taker_Fees": rsm["Taker_Fees"]
    });
    r["Total_Loss_USD"].inputs({
        "rl.Total_Loss_BTC": r["Total_Loss_BTC"],
        "rs.Total_Loss_BTC": r["Total_Loss_BTC"],
        "rl.Liquidation_Price": r["Liquidation_Price"],
        "rs.Liquidation_Price": r["Liquidation_Price"]
    });
    r["Payment_IF_BTC"].inputs({
        "rsm.Cost_BTC": rsm["Cost_BTC"],
        "rl.Payment_IF_P": r["Payment_IF_P"],
        "rs.Payment_IF_P": r["Payment_IF_P"]
    });
    r["Payment_IF_USD"].inputs({
        "rl.Payment_IF_BTC": r["Payment_IF_BTC"],
        "rs.Payment_IF_BTC": r["Payment_IF_BTC"],
        "rl.Liquidation_Price": r["Liquidation_Price"],
        "rs.Liquidation_Price": r["Liquidation_Price"]
    });
    r["Payment_IF_P"].inputs({
        "rl.Change_PL_P": r["Change_PL_P"],
        "rs.Change_PL_P": r["Change_PL_P"],
        "rl.Change_PB_P": r["Change_PB_P"],
        "rs.Change_PB_P": r["Change_PB_P"]
    });

    let enter_block = new Block("Enter Data", "");
    enter_block.className += " enter_data mb-3";

    let result_block = new Block("Result", "");
    result_block.className += " result";

    let result_block_s = new Block("Cost Calculator", "");
    result_block_s.className += " result";

    let result_block_a = new Block("Hidden", "");
    result_block_a.className += " result d-none mt-3";

    let h = document.createElement('div');
    h.className = 'table-row';
    h.style.fontSize = "12px";
    h.style.fontWeight = "900";
    h.innerHTML = `<span></span><span>Long</span><span>Short</span>`;
    result_block.add(h);

    Object.keys(r).map( (k) =>
    {
        result_block.add(r[k]);

        if(k === "Change_PL_USD")
        {
            let h = document.createElement('hr');
            h.style.margin = "10px 0";

            result_block.add(h);
        }

        if(k === "Change_PB_USD")
        {
            let h = document.createElement('h3');
            h.innerHTML = "At Liquidation";
            h.style.margin = "10px 0";
            h.style.padding = "10px 0 0 0";
            h.style.lineHeight = "1";
            h.style.fontSize = "12px";
            h.style.fontWeight = "900";
            h.style.letterSpacing = "1px";
            h.style.fontFamily = "'Montserrat', sans-serif";
            h.style.textTransform = "uppercase";
            h.style.borderTop = "1px solid #ddd";

            result_block.add(h);
        }
    } );

    Object.keys(rsm).map( (k) =>
    {
        result_block_s.add(rsm[k])
    } );

    Object.keys(a).map( (k) =>
    {
        result_block_a.add(a[k])
    } );

    Object.keys(i).map( (k) =>
    {
        enter_block.add(i[k]);
    } );

    row1.appendChild( enter_block );
    row1.appendChild( result_block_s );
    row1.appendChild( result_block_a );
    row2.appendChild( result_block );

    $.get('https://data.messari.io/api/v1/assets/btc/metrics', resp => {
        let price = resp.data.market_data.price_usd;
        i["BTC_Price"].val( price.toFixed(0) );
    });

    tippy('[title]');

    app.toggle_hidden = function()
    {
        result_block_a.classList.toggle('d-none');
    }
}

function Calls()
{
    tabsMain['Deribit'].active();

    row1.classList.remove('d-none');
    row2.classList.remove('d-none');
    row4.classList.remove('d-none');

    let i = {
        Btcusd: makeInput("fa fa-usd", "BTCUSD", "Enter actual Spot Bitcoin price"),
        Btc_entry: makeInput("fa fa-usd", "BTC underlying at entry", "Deribit Bitcoin Options are Options on Futures. Enter the price of the Underlying Future e.g.  BTC-29MAR19"),
        Expiry: makeDate("fa fa-calendar", "Expiry"),
        Strike: makeInput("fa fa-usd", "Strike"),
        Premium: makeInput("fa fa-usd", "Premium (BTC)", "If buying Option then enter the Ask premium. If selling/writing Option enter the Bid premium."),
        Target_Price: makeInput("fa fa-usd", "Target price at expiry", "Target price of underlying Future.")
    };

    let r1 ={
        Premium: makeResultRow({
            name: "PREMIUM ($)",
            append: "$",
            fix: 0,
            eval: "i.Premium * i.Btc_entry",
            tooltip: "This is the most the buyer of the Option can lose, and is the maximum profit of the Option seller."
        }),
        itm_otm: makeResultRow({
            name: "ITM/OTM",
            eval: (e) =>
            {
                if(e['i.Strike'].val() < e['i.Btc_entry'].val()) return "Inthemoney";
                else return "Outofthemoney";
            },
            tooltip: "ITM: Call Strike < Underlying price<br/> OTM:Call Strike > Underlying price"
        }),
        Intrinsic_usd: makeResultRow({
            name: "Intrinsic value ($)",
            eval: (e) =>
            {
                let r = e['i.Btc_entry'].val() - e['i.Strike'].val();

                if(e['i.Btc_entry'].val() !== undefined && e['i.Strike'].val() !== undefined)
                    return r < 0 ? `<small>$</small>0` : `<small>$</small>`+r;
                else return '';
            }
        }),
        Intrinsic_btc: makeResultRow({
            name: "Intrinsic value (BTC)",
            fix: 4,
            eval: "r.Intrinsic_usd / i.Btc_entry"
        }),
        Intrinsic_prc: makeResultRow({
            name: "INTRINSIC VALUE (% of premium)",
            append: "%",
            fix: 0,
            eval: "(r.Intrinsic_btc / i.Premium) * 100"
        }),
        Non_intrinsic_usd: makeResultRow({
            name: "Non-intrinsic ($) [Time + Volatility]",
            append: "$",
            eval: "r.Premium - r.Intrinsic_usd"
        }),
        Non_intrinsic_btc: makeResultRow({
            name: "Non-intrinsic (BTC)",
            append: "$",
            fix: 4,
            eval: "i.Premium - r.Intrinsic_btc"
        }),
        Non_intrinsic_prc: makeResultRow({
            name: "Non-intrinsic (% of premium)",
            append: "%",
            eval: "100 - r.Intrinsic_prc"
        }),
        Days_to_expiry: makeResultRow({
            name: "Days to expiry",
            eval: "i.Expiry"
        })
    };

    let r2 = {
        Change_in_btcusd_usd: makeResultRow({
            name: "Change in BTCUSD ($)",
            append: "$",
            eval: "i.Target_Price - i.Btc_entry"
        }),
        Change_in_btcusd_prc: makeResultRow({
            name: "Change in BTCUSD (%)",
            append: "%",
            fix: 2,
            eval: "((i.Target_Price - i.Btc_entry) / i.Btc_entry) * 100"
        }),

        Settlement_usd: makeResultRow({
            name: "Settlement ($)",
            append: "$",
            twoCol: true,
            eval: {
                long_minZero: true,
                short_maxZero: true,
                long: "i.Target_Price - i.Strike",
                short: "(i.Target_Price - i.Strike) * -1"
            },
            tooltip: "Cash flow that results at Expiry if price of underlying future is at your Target price. But settlement of Deribit (Euopean) Options happens when you close the trade which you may do at ANY time during the Option's lifetime."
        }),
        Settlement_btc: makeResultRow({
            name: "Settlement (BTC)",
            fix: 4,
            twoCol: true,
            eval: {
                long: "rl.Settlement_usd / i.Target_Price",
                short: "rs.Settlement_usd / i.Target_Price"
            }
        }),
        Pl_usd: makeResultRow({
            name: "P/L ($)",
            append: "$",
            twoCol: true,
            eval: {
                long: "rl.Settlement_usd - r.Premium",
                short: "rs.Settlement_usd + r.Premium"
            }
        }),
        Pl_usd_prc: makeResultRow({
            name: "P/L ($) %",
            append: "%",
            fix: 0,
            twoCol: true,
            eval: {
                long: "(rl.Pl_usd / r.Premium) * 100",
                short: "(rs.Pl_usd / r.Premium) * 100"
            }
        }),
        Pl_btc: makeResultRow({
            name: "P/L (BTC)",
            fix: 4,
            twoCol: true,
            eval: {
                long: "rl.Settlement_btc - i.Premium",
                short: "rs.Settlement_btc + i.Premium"
            }
        }),
        Pl_bt_prc: makeResultRow({
            name: "P/L (BTC) %",
            append: "%",
            fix: 0,
            twoCol: true,
            eval: {
                long: "(rl.Pl_btc / i.Premium) * 100",
                short: "(rs.Pl_btc / i.Premium) * 100"
            }
        }),
        Leverage: makeResultRow({
            name: "Leverage",
            fix: 2,
            twoCol: true,
            eval: {
                long: "rl.Pl_usd_prc / r.Change_in_btcusd_prc",
                short_inner: "n/a"
            }
        })
    };

    let r3 = {
        Max_gain_btc: makeResultRow({
            name: "MAX Gain (BTC)",
            fix: 4,
            twoCol: true,
            eval: {
                long: "1 - i.Premium",
                short: "i.Premium"
            }
        }),
        Max_gain_usd: makeResultRow({
            name: "MAX Gain ($)",
            append: "$",
            twoCol: true,
            eval: {
                long_inner: "Unlimited",
                short: "r.Premium"
            }
        }),
        Max_loss_btc: makeResultRow({
            name: "MAX Loss (BTC)",
            twoCol: true,
            fix: 4,
            eval: {
                long: "i.Premium",
                short: "1 - i.Premium"
            }
        }),
        Max_loss_usd: makeResultRow({
            name: "MAX Loss ($)",
            append: "$",
            twoCol: true,
            eval: {
                long: "r.Premium",
                short_inner: "Unlimited"
            },
            tooltip: "The max. loss of writing a single Bitcoin Option in USD is unlimited. New traders should NEVER write or sell options. Restrict all trading to buying Options (& you can sell those you own whenever you like)."
        }),

        Initial_margin: makeResultRow({
            name: "Initial Margin (BTC)",
            fix: 4,
            twoCol: true,
            eval: {
                long_inner: "None",
                short: (e) =>
                {
                    if(e['i.Strike'].val() < e['i.Btc_entry'].val()) return "0.1500";
                    else return "0.1000";
                }
            },
            tooltip: "For Call Option seller, Initial Margin has values:<br>ITM 0.15<br>Close to ATM Between 0.1 and 0.15<br>OTM 0.1"
        })
    };

    let r4 = {
        Break_even_btc: makeResultRow({
            name: "Break-Even in BTC",
            fix: 0,
            append: "$",
            twoCol: true,
            eval: {
                long: "i.Strike / (1 - i.Premium)",
                short: "i.Strike / (1 - i.Premium)"
            }
        }),
        Change_be_usd: makeResultRow({
            name: "Change to B/E ($)",
            fix: 0,
            append: "$",
            twoCol: true,
            eval: {
                long: "rl.Break_even_btc - i.Btc_entry",
                short: "rs.Break_even_btc - i.Btc_entry"
            }
        }),
        Change_be_prc: makeResultRow({
            name: "Change to B/E (%)",
            fix: 2,
            append: "%",
            twoCol: true,
            eval:   {
                long: "(rl.Change_be_usd / i.Btc_entry) * 100",
                short: "(rs.Change_be_usd / i.Btc_entry) * 100"
            }
        }),

        Break_even_usd: makeResultRow({
            name: "Break-Even in USD",
            fix: 2,
            append: "$",
            twoCol: true,
            eval: {
                long: "r.Premium + i.Strike",
                short: "r.Premium + i.Strike"
            }
        }),
        Change_be_usd2: makeResultRow({
            name: "Change to B/E ($)",
            fix: 0,
            append: "$",
            twoCol: true,
            eval: {
                long: "rl.Break_even_usd - i.Btc_entry",
                short: "rs.Break_even_usd - i.Btc_entry"
            }
        }),
        Change_be_prc2: makeResultRow({
            name: "Change to B/E (%)",
            fix: 2,
            append: "%",
            twoCol: true,
            eval: {
                long: "(rl.Change_be_usd2 / i.Btc_entry) * 100",
                short: "(rs.Change_be_usd2 / i.Btc_entry) * 100"
            }
        })
    };

    r1["Premium"].inputs({
        "i.Btc_entry": i["Btc_entry"],
        "i.Premium": i["Premium"]
    });
    r1["itm_otm"].inputs({
        "i.Btc_entry": i["Btc_entry"],
        "i.Strike": i["Strike"]
    });
    r1["Intrinsic_usd"].inputs({
        "i.Btc_entry": i["Btc_entry"],
        "i.Strike": i["Strike"]
    });
    r1["Intrinsic_btc"].inputs({
        "i.Btc_entry": i["Btc_entry"],
        "r.Intrinsic_usd": r1["Intrinsic_usd"]
    });
    r1["Intrinsic_prc"].inputs({
        "i.Premium": i["Premium"],
        "r.Intrinsic_btc": r1["Intrinsic_btc"]
    });
    r1["Non_intrinsic_usd"].inputs({
        "r.Premium": r1["Premium"],
        "r.Intrinsic_usd": r1["Intrinsic_usd"]
    });
    r1["Non_intrinsic_btc"].inputs({
        "i.Premium": i["Premium"],
        "r.Intrinsic_btc": r1["Intrinsic_btc"]
    });
    r1["Non_intrinsic_prc"].inputs({
        "r.Intrinsic_prc": r1["Intrinsic_prc"]
    });
    r1["Days_to_expiry"].inputs({
        "i.Expiry": i["Expiry"]
    });

    r2["Change_in_btcusd_usd"].inputs({
        "i.Btc_entry": i["Btc_entry"],
        "i.Target_Price": i["Target_Price"]
    });
    r2["Change_in_btcusd_prc"].inputs({
        "i.Btc_entry": i["Btc_entry"],
        "i.Target_Price": i["Target_Price"]
    });
    r2["Settlement_usd"].inputs({
        "i.Target_Price": i["Target_Price"],
        "i.Strike": i["Strike"]
    });
    r2["Settlement_btc"].inputs({
        "i.Target_Price": i["Target_Price"],
        "rl.Settlement_usd": r2["Settlement_usd"],
        "rs.Settlement_usd": r2["Settlement_usd"]
    });
    r2["Pl_usd"].inputs({
        "r.Premium": r1["Premium"],
        "rl.Settlement_usd": r2["Settlement_usd"],
        "rs.Settlement_usd": r2["Settlement_usd"]
    });
    r2["Pl_usd_prc"].inputs({
        "r.Premium": r1["Premium"],
        "rl.Pl_usd": r2["Pl_usd"],
        "rs.Pl_usd": r2["Pl_usd"]
    });
    r2["Pl_btc"].inputs({
        "i.Premium": i["Premium"],
        "rl.Settlement_btc": r2["Settlement_btc"],
        "rs.Settlement_btc": r2["Settlement_btc"]
    });
    r2["Pl_bt_prc"].inputs({
        "i.Premium": i["Premium"],
        "rl.Pl_btc": r2["Pl_btc"],
        "rs.Pl_btc": r2["Pl_btc"]
    });
    r2["Leverage"].inputs({
        "rl.Pl_usd_prc": r2["Pl_usd_prc"],
        "rs.Pl_usd_prc": r2["Pl_usd_prc"],
        "r.Change_in_btcusd_prc": r2["Change_in_btcusd_prc"]
    });

    r3["Max_gain_btc"].inputs({
        "i.Premium": i["Premium"]
    });
    r3["Max_gain_usd"].inputs({
        "r.Premium": r1["Premium"]
    });
    r3["Max_loss_btc"].inputs({
        "i.Premium": i["Premium"]
    });
    r3["Max_loss_usd"].inputs({
        "r.Premium": r1["Premium"]
    });
    r3["Initial_margin"].inputs({
        "i.Btc_entry": i["Btc_entry"],
        "i.Strike": i["Strike"]
    });

    r4["Break_even_btc"].inputs({
        "i.Strike": i["Strike"],
        "i.Premium": i["Premium"]
    });
    r4["Change_be_usd"].inputs({
        "i.Btc_entry": i["Btc_entry"],
        "rl.Break_even_btc": r4["Break_even_btc"],
        "rs.Break_even_btc": r4["Break_even_btc"]
    });
    r4["Change_be_prc"].inputs({
        "i.Btc_entry": i["Btc_entry"],
        "rl.Change_be_usd": r4["Change_be_usd"],
        "rs.Change_be_usd": r4["Change_be_usd"]
    });
    r4["Break_even_usd"].inputs({
        "i.Strike": i["Strike"],
        "r.Premium": r1["Premium"]
    });
    r4["Change_be_usd2"].inputs({
        "i.Btc_entry": i["Btc_entry"],
        "rl.Break_even_usd": r4["Break_even_usd"],
        "rs.Break_even_usd": r4["Break_even_usd"]
    });
    r4["Change_be_prc2"].inputs({
        "i.Btc_entry": i["Btc_entry"],
        "rl.Change_be_usd2": r4["Change_be_usd2"],
        "rs.Change_be_usd2": r4["Change_be_usd2"]
    });

    let enter_block = new Block("Enter Data", "");
    enter_block.className += " enter_data mb-3";

    let result_premium = new Block("Premium", "");
    result_premium.className += " result";

    let result_pl = new Block("P/L at expiry", "");
    result_pl.className += " result mb-3";

    let result_mgml = new Block("Max gain & max loss", "");
    result_mgml.className += " result";

    let result_be = new Block("Break-even", "");
    result_be.className += " result";

    Object.keys(r1).map( (k) =>
    {
        result_premium.add(r1[k]);
    } );

    Object.keys(r2).map( (k) =>
    {
        result_pl.add(r2[k]);

        if(k === "Change_in_btcusd_prc")
        {
            let h = document.createElement('div');
            h.className = 'table-row';
            h.style.fontSize = "12px";
            h.style.fontWeight = "900";
            h.innerHTML = "<span></span><span>Long Call</span><span>Short Call</span>";
            result_pl.add(h);
        }
    } );

    let h = document.createElement('div');
    h.className = 'table-row';
    h.style.fontSize = "12px";
    h.style.fontWeight = "900";
    h.innerHTML = `<span></span><span>Long Call</span><span>Short Call</span>`;
    result_mgml.add(h);

    Object.keys(r3).map( (k) =>
    {
        result_mgml.add(r3[k]);

        if(k === "Max_loss_usd")
        {
            let h = document.createElement('h3');
            h.innerHTML = "Initial margin";
            h.style.margin = "10px 0";
            h.style.padding = "10px 0 0 0";
            h.style.lineHeight = "1";
            h.style.fontSize = "12px";
            h.style.fontWeight = "900";
            h.style.letterSpacing = "1px";
            h.style.fontFamily = "'Montserrat', sans-serif";
            h.style.textTransform = "uppercase";
            h.style.borderTop = "1px solid #ddd";

            result_mgml.add(h);
        }
    } );

    let h1 = document.createElement('div');
    h1.className = 'table-row';
    h1.style.fontSize = "12px";
    h1.style.fontWeight = "900";
    h1.innerHTML = `<span></span><span>Long Call</span><span>Short Call</span>`;
    result_be.add(h1);

    Object.keys(r4).map( (k) =>
    {
        result_be.add(r4[k]);
    } );

    Object.keys(i).map( (k) =>
    {
        enter_block.add(i[k]);
    } );

    row1.appendChild( enter_block );
    row1.appendChild( result_premium );

    row2.appendChild( result_pl );
    row2.appendChild( result_mgml );

    row4.appendChild( result_be );

    $.get('https://data.messari.io/api/v1/assets/btc/metrics', resp => {
        let price = resp.data.market_data.price_usd;
        i["Btcusd"].val( price.toFixed(0) );
    });
    tippy('[title]');
}

function Puts()
{
    tabsMain['Deribit'].active();

    row1.classList.remove('d-none');
    row2.classList.remove('d-none');
    row4.classList.remove('d-none');

    let i = {
        Btcusd: makeInput("fa fa-usd", "BTCUSD", "Enter actual Spot Bitcoin price"),
        Btc_entry: makeInput("fa fa-usd", "BTC underlying at entry", "Deribit Bitcoin Options are Options on Futures. Enter the price of the Underlying Future e.g.  BTC-29MAR19"),
        Expiry: makeDate("fa fa-calendar", "Expiry"),
        Strike: makeInput("fa fa-usd", "Strike"),
        Premium: makeInput("fa fa-usd", "Premium (BTC)", "If buying Option then enter the Ask premium. If selling/writing Option enter the Bid premium."),
        Target_Price: makeInput("fa fa-usd", "Target price at expiry", "Target price of underlying Future.")
    };

    let r1 ={
        Premium: makeResultRow({
            name: "PREMIUM ($)",
            append: "$",
            fix: 0,
            eval: "i.Premium * i.Btc_entry",
            tooltip: "This is the most the buyer of the Option can lose, and is the maximum profit of the Option seller."
        }),
        itm_otm: makeResultRow({
            name: "ITM/OTM",
            eval: (e) =>
            {
                if(e['i.Strike'].val() < e['i.Btc_entry'].val()) return "Outofthemoney";
                else return "Inthemoney";
            },
            tooltip: "ITM: Put Strike > Underlying price<br/> OTM: Put Strike < Underlying price"
        }),
        Intrinsic_usd: makeResultRow({
            name: "Intrinsic value ($)",
            eval: (e) =>
            {
                let r = e['i.Strike'].val() - e['i.Btc_entry'].val();

                if(e['i.Btc_entry'].val() !== undefined && e['i.Strike'].val() !== undefined)
                    return r < 0 ? `<small>$</small>0` : `<small>$</small>`+r;
                else return '';
            }
        }),
        Intrinsic_btc: makeResultRow({
            name: "Intrinsic value (BTC)",
            fix: 4,
            eval: "r.Intrinsic_usd / i.Btc_entry"
        }),
        Intrinsic_prc: makeResultRow({
            name: "INTRINSIC VALUE (% of premium)",
            append: "%",
            fix: 0,
            eval: "(r.Intrinsic_btc / i.Premium) * 100"
        }),
        Non_intrinsic_usd: makeResultRow({
            name: "Non-intrinsic ($) [Time + Volatility]",
            append: "$",
            eval: "r.Premium - r.Intrinsic_usd"
        }),
        Non_intrinsic_btc: makeResultRow({
            name: "Non-intrinsic (BTC)",
            append: "$",
            fix: 4,
            eval: "i.Premium - r.Intrinsic_btc"
        }),
        Non_intrinsic_prc: makeResultRow({
            name: "Non-intrinsic (% of premium)",
            append: "%",
            eval: "100 - r.Intrinsic_prc"
        }),
        Days_to_expiry: makeResultRow({
            name: "Days to expiry",
            eval: "i.Expiry"
        })
    };

    let r2 ={
        Change_in_btcusd_usd: makeResultRow({
            name: "Change in BTCUSD ($)",
            append: "$",
            eval: "i.Target_Price - i.Btc_entry"
        }),
        Change_in_btcusd_prc: makeResultRow({
            name: "Change in BTCUSD (%)",
            append: "%",
            fix: 2,
            eval: "((i.Target_Price - i.Btc_entry) / i.Btc_entry) * 100"
        }),

        Settlement_usd: makeResultRow({
            name: "Settlement ($)",
            append: "$",
            twoCol: true,
            eval: {
                long_minZero: true,
                long: "i.Strike - i.Target_Price",
                short: "(i.Strike - i.Target_Price) * -1"
            },
            tooltip: "Cash flow that results at Expiry if price of underlying future is at your Target price. But settlement of Deribit (Euopean) Options happens when you close the trade which you may do at ANY time during the Option's lifetime."
        }),
        Settlement_btc: makeResultRow({
            name: "Settlement (BTC)",
            fix: 4,
            twoCol: true,
            eval: {
                long: "rl.Settlement_usd / i.Target_Price",
                short: "rs.Settlement_usd / i.Target_Price"
            }
        }),
        Pl_usd: makeResultRow({
            name: "P/L ($)",
            append: "$",
            twoCol: true,
            eval: {
                long: "rl.Settlement_usd - r.Premium",
                short: "rs.Settlement_usd + r.Premium"
            }
        }),
        Pl_usd_prc: makeResultRow({
            name: "P/L ($) %",
            append: "%",
            fix: 0,
            twoCol: true,
            eval: {
                long: "(rl.Pl_usd / r.Premium) * 100",
                short: "(rs.Pl_usd / r.Premium) * 100"
            }
        }),
        Pl_btc: makeResultRow({
            name: "P/L (BTC)",
            fix: 4,
            twoCol: true,
            eval: {
                long: "rl.Settlement_btc - i.Premium",
                short: "rs.Settlement_btc + i.Premium"
            }
        }),
        Pl_bt_prc: makeResultRow({
            name: "P/L (BTC) %",
            append: "%",
            fix: 0,
            twoCol: true,
            eval: {
                long: "(rl.Pl_btc / i.Premium) * 100",
                short: "(rs.Pl_btc / i.Premium) * 100"
            }
        }),
        Leverage: makeResultRow({
            name: "Leverage",
            fix: 2,
            twoCol: true,
            eval: {
                long_minZero: true,
                long: "(rl.Pl_usd_prc * -1) / r.Change_in_btcusd_prc",
                short_inner: "n/a"
            }
        })
    };

    let r3 ={
        Max_gain_btc: makeResultRow({
            name: "MAX Gain (BTC)",
            fix: 4,
            twoCol: true,
            eval: {
                long_inner: "Infinite",
                short: "i.Premium"
            }
        }),
        Max_gain_usd: makeResultRow({
            name: "MAX Gain ($)",
            append: "$",
            twoCol: true,
            eval: {
                long: "i.Strike - r.Premium",
                short: "r.Premium"
            }
        }),
        Max_loss_btc: makeResultRow({
            name: "MAX Loss (BTC)",
            twoCol: true,
            fix: 4,
            eval: {
                long: "i.Premium",
                short_inner: "Infinite",
            },
            tooltip: "The max. loss of writing a single Bitcoin Put Option in BTC is unlimited. New traders should NEVER write or sell options. Restrict all trading to buying Options (& you can sell those you own whenever you like)."
        }),
        Max_loss_usd: makeResultRow({
            name: "MAX Loss ($)",
            append: "$",
            twoCol: true,
            eval: {
                long: "r.Premium",
                short: "i.Strike - r.Premium"
            }
        }),

        Initial_margin: makeResultRow({
            name: "Initial Margin (BTC)",
            fix: 4,
            twoCol: true,
            eval: {
                long_inner: "None",
                short: (e) =>
                {
                    if(e['i.Strike'].val() > e['i.Btc_entry'].val()) return "0.1500";
                    else return "0.1000";
                }
            },
            tooltip: "For Put Option seller, Initial Margin has values:<br>ITM 0.15<br>Very close to ATM Between 0.1 and 0.15<br>OTM Between 0 and 0.1"
        })
    };
