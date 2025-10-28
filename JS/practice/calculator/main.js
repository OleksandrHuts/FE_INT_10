const OPERATIONS = {
    divide: {
        label: '÷',
        showResult: function (a, b) {
            return a / b
        }
    },
    multiply: {
        label: '*',
        showResult: function (a, b) {
            return a * b
        }
    },
    minus: {
        label: '-',
        showResult: function (a, b) {
            return a - b
        }
    },
    plus: {
        label: '+',
        showResult: function (a, b) {
            return a + b
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    //get operands from user input
    let operand1 = null;
    let operand2 = null;
    let action = null; // +, -

    function setOperand(event) {
        const num = +event.target.dataset.value;
        !operand1 ? operand1 = num : operand2 = num;

        renderUserView();
    }

    function addButtonsClick() {
        // Numbers btns
        const numberButtons = document.querySelectorAll('.number');
        if (numberButtons.length < 1) return false;

        [...numberButtons].forEach(button => {
            button.addEventListener('click', setOperand)
        });

        // CLEAR button
        document.querySelector('.clear')?.addEventListener('click', reset);

        //Operations btns
        const operationsButtons = document.querySelectorAll('.operation');
        if (operationsButtons.length < 1) return false;

        [...operationsButtons].forEach(button => {
            button.addEventListener('click', (event) => {
                action = event.target.dataset.value;
                renderUserView();
            })
        });

        document.querySelector('.equals').addEventListener('click', () => {
            if (!operand1 || !operand2 || !action) return false;
            document.querySelector('#result').textContent = OPERATIONS[action].showResult(operand1, operand2);
        });
    }

    function reset() {
        operand1 = null;
        operand2 = null;
        action = null;
        document.querySelector('#result').textContent = 0;
        renderUserView();
    }

    function renderUserView() {
        const po = document.querySelector('#previous-operand');
        const co = document.querySelector('#current-operand');
        const ov = document.querySelector('#operation-value');

        po.textContent = operand1;
        co.textContent = operand2;
        ov.textContent = OPERATIONS[action]?.label;
    }

    addButtonsClick();
});