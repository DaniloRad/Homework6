incomeMjesecni();
ExspensesPerMonth();
var StorageIncome = localStorage.getItem('income');
var StorageExspenses = localStorage.getItem("exspenses");

if (StorageIncome !== null) {
    document.getElementsByClassName("income-list")[0].innerHTML = "<h3>Income</h3>" + StorageIncome;
} else if (StorageExspenses !== null) {
    document.getElementsByClassName("exspenses-list")[0].innerHTML = "<h3>Exspenses</h3>" + StorageExspenses;

}



var Month = document.getElementById("month");
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const d = new Date();
Month.append(monthNames[d.getMonth()]);

var AddInList = document.getElementById("add");
var Remove = document.getElementsByClassName("container_2")[0];
AddInList.addEventListener("click", addInList);
Remove.addEventListener("click", removeItem);



function removeItem(e) {

    if (e.target.classList.contains("button_1")) {

        var ToRemove = e.target.parentNode;
        e.target.parentNode.parentNode.removeChild(ToRemove);

    }

    IncomePerMonth();
    ExspensesPerMonth();
    CheckStorage();

}

function addInList(e) {
    e.preventDefault();


    var Operator = document.querySelector('input[name="same"]:checked');
    console.log(Operator.value);
    var Description = document.getElementById("description");
    var Value = document.getElementById("value_1");
    var ListP1 = document.createElement("p");
    var ListP2 = document.createElement("p");
    var ListP3 = document.createElement("p");
    var ButtonX = document.createElement("button");
    ButtonX.setAttribute("class", "button_1");
    ButtonX.innerHTML = "X";
    if (Operator.value === "+") {
        ListP1.setAttribute("class", "income-description");
        ListP2.setAttribute("class", "income-value")
        ListP1.innerHTML = Description.value;
        ListP2.innerHTML = "+" + parseInt(Value.value).toFixed(2);
        ListP3.setAttribute("class", "income-procentage");
        var IncomeList = document.getElementsByClassName("income-list")[0];
        var income = document.createElement("div");
        income.setAttribute("class", "income");


        income.append(ListP1);
        income.append(ListP2);
        income.append(ListP3);
        income.append(ButtonX);


        IncomeList.append(income);


    } else if (Operator.value === "-") {
        ListP3.setAttribute("class", "exspenses-procentage");

        ListP1.setAttribute("class", "exspenses-description");
        ListP2.setAttribute("class", "exspenses-value")
        ListP1.innerHTML = Description.value;
        ListP2.innerHTML = "-" + parseInt(Value.value).toFixed(2);
        var ExspensesList = document.getElementsByClassName("exspenses-list")[0];
        var exspenses = document.createElement("div");
        exspenses.setAttribute("class", "exspenses");


        exspenses.append(ListP1);
        exspenses.append(ListP2);
        exspenses.append(ListP3);

        exspenses.append(ButtonX);

        ExspensesList.append(exspenses);
    } else {

        alert("Neispravan unos")

    }

    IncomePerMonth();
    ExspensesPerMonth();
    CheckStorage();
}


//ove funkcije se pozivaju kod add i remove kako bi se racunalo stalno


function IncomePerMonth() {



    var Income_Value = document.getElementsByClassName("income-value");
    var Sum = 0;


    for (let i = 0; i < Income_Value.length; i++) {

        Sum = Sum + parseInt(Income_Value[i].innerHTML);

    }
    var IncomeFinal = document.getElementById("income");
    IncomeFinal.innerHTML = Sum.toFixed(2);

    var SumProcentege = document.getElementsByClassName("income-procentage");
    for (let i = 0; i < SumProcentege.length; i++) {

        SumProcentege[i].innerHTML = (100 * parseInt(Income_Value[i].innerHTML) / Sum).toFixed(2) + "%";

    }

    Budget();
}

function ExspensesPerMonth() {

    var Exspenses_Value = document.getElementsByClassName("exspenses-value");
    var Sum = 0;


    for (let i = 0; i < Exspenses_Value.length; i++) {

        Sum = Sum + parseInt(Exspenses_Value[i].innerHTML);

    }
    var ExspensesFinal = document.getElementById("exspenses");
    ExspensesFinal.innerHTML = Math.abs(Sum).toFixed(2);
    var SumProcentege = document.getElementsByClassName("exspenses-procentage");
    for (let i = 0; i < SumProcentege.length; i++) {

        SumProcentege[i].innerHTML = (Math.abs(parseInt(Exspenses_Value[i].innerHTML)) * 100 / Math.abs(Sum)).toFixed(2) + "%";


    }
    Budget();

}

function Budget() {

    var Budget = document.getElementById("budget");
    var income = document.getElementById("income");
    var exspenses = document.getElementById("exspenses");
    Budget.innerHTML = (income.innerHTML - exspenses.innerHTML).toFixed(2);

}

function CheckStorage() {

    var income = document.getElementsByClassName("income");

    var TextForIncomeStorage = "";
    for (let i = 0; i < income.length; i++) {

        TextForIncomeStorage = TextForIncomeStorage + income[i].outerHTML;

    }

    var exspenses = document.getElementsByClassName("exspenses");

    var TextForExspensesStorage = "";
    for (let i = 0; i < exspenses.length; i++) {

        TextForExspensesStorage = TextForExspensesStorage + exspenses[i].outerHTML;

    }

    if (typeof (Storage) !== "undefined") {

        localStorage.setItem("income", TextForIncomeStorage);
        localStorage.setItem("exspenses", TextForExspensesStorage);
    } else {
        alert("browser ne podrzava");
    }
}