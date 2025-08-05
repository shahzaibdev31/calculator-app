// Get Input Box 
const expDisplay = document.querySelector('#operation-display');
const display = document.querySelector('#display');

// Get Operation Buttons
const Btns = document.querySelectorAll('[data-role]');

// Variable For Evaluation 
let evaluated = false;

// Operators Array
const operators = ['+', '-', '*', '/', '^'];

Btns.forEach(btn => {
    btn.addEventListener('click', () => {

        // ------ Operation Buttons

        // For Button AC
        if (btn.dataset.role === 'clear') {
            display.textContent = expDisplay.textContent = '0';
            evaluated = false;
            return;
        }

        // For Button DEL
        if (btn.dataset.role === 'delete') {
            if (display.textContent.length > 1) {
                display.textContent = display.textContent.slice(0, -1);
            } else {
                display.textContent = '0';
            }
            return;
        }

        // For Button Equal
        if (btn.dataset.value === '=') {
            expDisplay.textContent = display.textContent.trim();
            try {
                if (operators.some(op => expDisplay.textContent.includes(op))) {
                    display.textContent = eval(expDisplay.textContent);
                } else {
                    display.textContent = expDisplay.textContent;
                }
                evaluated = true;
            } catch (e) {
                display.textContent = 'SYNTAX ERROR';
            }
            return;
        }

        // ------ Numeric and Operator Buttons

        if (display.textContent === '0' && !operators.includes(btn.dataset.value) && btn.dataset.value !== '.') {
            display.textContent = btn.dataset.value;
            return;
        }

        if (evaluated) {
            if (!operators.includes(btn.dataset.value)) {
                display.textContent = btn.dataset.value;
            } else {
                display.textContent += btn.dataset.value;
            }
            evaluated = false;
            return;
        }

        const lastEntry = display.textContent.slice(-1);
        if (operators.includes(btn.dataset.value) || btn.dataset.value === '.') {
            if (operators.includes(lastEntry) || lastEntry === '.')
                return;
        }

        const secLastEntry = display.textContent.slice(-2, -1);
        if (lastEntry === '0' && operators.includes(secLastEntry)) {
            display.textContent = display.textContent.slice(0, -1) + btn.dataset.value;
            return;
        }

        display.textContent += btn.dataset.value;
    });
});
