//DISPLAY
let display = document.getElementById("display");
let output = document.getElementById("output");
let outputValues = "";
let result = [];

function allClear() {
    display.innerHTML = "0";
    output.innerHTML = "";
    outputValues = "";
    result = [];
}

/*Shows on display and output*/
function showOn(actualValue) {
    if (actualValue != ".") {
        outputValues += actualValue;
        result.push(actualValue)
    }
    output.innerHTML = outputValues;
}

function checkIfOperator(x) {
    return operators.indexOf(result[result.length - x]) != -1;
}

//NUMBERS
function showNumber(btnValue) {
    if (result[result.length - 1] == "-" && checkIfOperator(2)) {
        display.innerHTML += btnValue.value;
    } else if (checkIfOperator(1) || display.innerHTML == "0" && !(btnValue.value == ".")) {
        if (display.innerHTML == "0") {
            outputValues = "";
        }
        display.innerHTML = btnValue.value;
    } else if (btnValue.value == ".") {
        if (!/\./.test(display.innerHTML) || display.innerHTML == "0" || (!result.length > 0)) {
            display.innerHTML += btnValue.value;
            outputValues += btnValue.value;
            result.push(btnValue.value)
        }
    } else {
        display.innerHTML += btnValue.value;
    }
    showOn(btnValue.value);
}

//OPERATORS
let operators = ["+", "-", "*", "/"];
let actualOperator = "";
function showOperator(btnValue) {
    if (result.length != 0) {
        if (checkIfOperator(1)) {
            if (btnValue.value == "-") {
                display.innerHTML = btnValue.value;
                showOn(btnValue.value);
            } else {
                if (result[result.length - 1] == "-") {
                    result.pop();
                    outputValues = outputValues.substr(0, result.length - 1);
                }
                result.pop();
                outputValues = outputValues.substr(0, result.length);
                display.innerHTML = btnValue.value;
                showOn(btnValue.value);
            }
        } else {
            display.innerHTML = btnValue.value;
            showOn(btnValue.value);
        }
    }
}

//OPERATIONS && RESULT
function calculate(a, operator, b) {
    let result = "";
    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "/":
            result = a / b;
            break;
        case "*":
            result = a * b;
            break;
    }
    return result;
}

function showResult() {
    const otherOperators = ["+", "*", "/"];
    let finalResult = "";
    let counter = 0;
    let intermediate = [];
    let actualArray = [];

    function negativeNumber(value) {
        let lastOperator = operators.indexOf(result[counter - 1]) != -1;
        return lastOperator && otherOperators.indexOf(value) == -1;
    }

    while (result.length > counter - 1) {
        let value = result[counter];
        if (!negativeNumber(value) && operators.indexOf(value) != -1) {
            actualArray.push(value);
            intermediate.push(actualArray);
            actualArray = [];
        } else {
            actualArray.push(value);
            if (result.length == counter || operators.indexOf(result[counter + 1]) != -1) {
                intermediate.push(actualArray);
                actualArray = [];
            }
        }
        counter++;
        if (intermediate.length >= 3) {
            let a = Number(intermediate[0].join(''));
            let op = intermediate[1].join('');
            let b = Number(intermediate[2].join(''));
            finalResult = calculate(a, op, b);
            intermediate = [];
            actualArray.push(finalResult);
            intermediate.push(actualArray);
            actualArray = [];
        }
    }
    result = [];
    result.push(finalResult)
    outputValues = finalResult;
    output.innerHTML = finalResult;
    display.innerHTML = finalResult;
}