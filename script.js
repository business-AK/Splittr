const button = document.getElementById("submit");
let n;

button.addEventListener("click", function () {
    console.log("button clicked!");
    const num = document.getElementById("num");

    if (num.value <= 0 || num.value == "") {
        alert("please enter valid value");
    }
    else if (num.value == 1) {
        alert("Need more than 1 person");
    }
    else {

        n = num.value;

        num.remove();
        button.remove();

        const container = document.getElementById("container");

        for (let i = 0; i < n; i++) {
            container.innerHTML += `
            <div class="person-input">
                <input type="text" id="name${i}" placeholder="Person ${i + 1}">
                <input type="number" id="spent${i}" placeholder="Amount Spent">
            </div>
            `;
        }

        container.innerHTML += `<button id="calculate"> CALCULATE EACH SHARE</button>`;

        const calculate = document.getElementById("calculate");
        const result = document.getElementById("result");

        calculate.addEventListener("click", function () {
            result.innerHTML = "";
            let spending = new Array(n);
            let names = new Array(n);
            for (let i = 0; i < n; i++) {
                spending[i] = document.getElementById(`spent${i}`).value;
                names[i] = document.getElementById(`name${i}`).value;

                if (spending[i] == "" || spending[i] < 0) {
                    alert("Please enter valid values");
                    return;
                }
                if (names[i] == "") names[i] = `Person ${i + 1}`;
            }

            let transactions = [];

            for (let i = 0; i < n; i++) {
                transactions.push(new Array(n));
            }

            for (let i = 0; i < n; i++) {

                let amtRcv = spending[i] / n;
                for (let j = 0; j < n; j++) {
                    if (i == j) continue;
                    let amtPay = spending[j] / n;
                    if (amtRcv >= amtPay) transactions[i][j] = amtRcv - amtPay;
                    else transactions[i][j] = 0;
                }
            }

            result.innerHTML += `<div id="options"> 
                <button id="receive" class="options">RECEIVE</button>
                <button id="pay" class="options">PAY</button>
            </div>
            `;

            const receive = document.getElementById("receive");
            const pay = document.getElementById("pay");

            receive.addEventListener("click", function () {
                showReceiving(transactions, names, result);
            });

            pay.addEventListener("click", function () {
                showPaying(transactions, names, result);
            })

            showReceiving(transactions, names, result);
        });
    }
});

function showReceiving(transactions, names, result) {

    document.querySelectorAll(".person-box").forEach(function (box) {
        box.remove();
    });

    for (let i = 0; i < n; i++) {
        const personBox = document.createElement("div");
        personBox.className = "person-box";

        personBox.innerHTML = `<h3>${names[i]}</h3>`;

        for (let j = 0; j < n; j++) {
            if (i == j) continue;

            if (transactions[i][j] >= 0) {
                personBox.innerHTML += `
                    <p>Receives $${transactions[i][j].toFixed(2)} from ${names[j]}</p>
                `;
            }
        }

        result.appendChild(personBox);
    }
}
function showPaying(transactions, names, result) {

    document.querySelectorAll(".person-box").forEach(function (box) {
        box.remove();
    });

    for (let i = 0; i < n; i++) {
        const personBox = document.createElement("div");
        personBox.className = "person-box";

        personBox.innerHTML = `<h3>${names[i]}</h3>`;

        for (let j = 0; j < n; j++) {
            if (i == j) continue;

            if (transactions[j][i] >= 0) {
                personBox.innerHTML += `
                    <p>Pays $${transactions[j][i].toFixed(2)} to ${names[j]}</p>
                `;
            }
        }

        result.appendChild(personBox);
    }
}
