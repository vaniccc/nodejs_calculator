let currentInput = '';

function calculate() {
    currentInput = eval(currentInput);
    updateDisplay();
}

function clearInput() {
    currentInput = '1';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = currentInput;
}

function appendToDisplay() {

}