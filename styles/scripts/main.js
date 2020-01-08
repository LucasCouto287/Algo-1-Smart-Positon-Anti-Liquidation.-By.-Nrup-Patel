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
