let numBtn = document.querySelectorAll('[data-number]');
let opBtn = document.querySelectorAll('[data-operator]');
let acBtn = document.querySelector('[data-all-clear]');
let clearBtn = document.querySelector('[data-clear]');
let displayScreen = document.querySelector('.current-operation');
let equalBtn = document.querySelector('[data-equal-btn]');
let decimal = document.querySelector('[data-decimal]');
let previousOperation = document.querySelector('.previous-operation');

let firstOperand = '';
let secondOperand = '';
let operator = null;
let removeFirstOperand = false;

const add = function( numOne, numTwo ) { return numOne + numTwo };

const subtract = function( numOne, numTwo ) { return numOne - numTwo };

const divide = function( numOne, numTwo ) { return numOne / numTwo };

const multiply = function( numOne, numTwo ) { return numOne * numTwo };

const modulus = function( numOne, numTwo ) { return numOne % numTwo };

const roundResult = function(number) { return Math.round(number * 1000) / 1000 };

const clear = function() {
  displayScreen.textContent = displayScreen.textContent.toString().slice(0, -1);
};

const allClear = function() {
  displayScreen.textContent = '0';
  firstOperand = '';
  secondOperand = '';
  previousOperation.textContent = '';
};

const setOperator = function( gettedOp ) {
  operator = gettedOp;
  removeFirstOperand = true;
}

const updateDisplay = function(number) {
  if ( removeFirstOperand ) {
    displayScreen.textContent = displayScreen.textContent.slice(1, 0);
    removeFirstOperand = false;
  }
  displayScreen.textContent = parseInt(displayScreen.textContent + number).toString();
};

const evaluate = function() {
  secondOperand = displayScreen.textContent;
  displayScreen.textContent = roundResult(operate(operator, firstOperand, secondOperand));
  previousOperation.textContent = `${ firstOperand } ${ operator } ${ secondOperand } =`;
  //Check if user are dividing 1 with 0 
  if ( firstOperand == '1' && secondOperand == '0') {
    displayScreen.textContent = "Error";
    console.warn('Error');
  }
}

const operate = function( op, noOne, noTwo ) {

  let nOne = Number(noOne);
  let nTwo = Number(noTwo);

  let result;

  switch( op ) {

    case '+':
      result = add( nOne, nTwo );
      break;
    
    case '−':
      result = subtract( nOne, nTwo );
      break;
    
    case '÷':
      result = divide( nOne, nTwo );
      break;
    
    case '×':
      result = multiply( nOne, nTwo );
      break;
    
    case '%':
      result = modulus( nOne, nTwo );
    
    default:
      console.error("Symbol is invalid!!!");
      break;
  }

  return result;
};

//*EventListners
numBtn.forEach( ( numButtons ) => {
  numButtons.addEventListener('click', ( e ) => {
    updateDisplay(e.target.textContent);
  });
});

opBtn.forEach( ( opButtons ) => {
  opButtons.addEventListener('click', ( e ) => {
    setOperator(e.target.textContent);
    if ( displayScreen.textContent != '0' ) firstOperand = displayScreen.textContent;
    if ( displayScreen.textContent != '' ) previousOperation.textContent = `${ firstOperand } ${ operator }`
  });
});

clearBtn.addEventListener('click', () => { clear() } );

acBtn.addEventListener('click', () => { allClear() });

equalBtn.addEventListener('click', () => { 
  //Check if the display screen is empty if empty don't evaluate if 
  if ( displayScreen.textContent != '' ) evaluate();
});