//*Selectors
let numBtn = document.querySelectorAll('[data-number]');
let opBtn = document.querySelectorAll('[data-operator]');
let acBtn = document.querySelector('[data-all-clear]');
let clearBtn = document.querySelector('[data-clear]');
let displayScreen = document.querySelector('.result-dis');
let equalBtn = document.querySelector('[data-equal-btn]');

let firstNumber = [];
let secondNumber = [];
let operator;
let opClicked = false;
let shouldClear = false;
let currentAnswer;

//*Functions
const chooseOperator = function( opVal ) { operator = opVal; console.log( `operator: ${ operator } `);};

function getFirstNum( firstNumVal ) { firstNumber.push(firstNumVal); console.log(`First number: ${ +firstNumber }`)};
function getSecondNum ( secondNumVal ) { secondNumber.push(secondNumVal); console.log(`Second number: ${ +secondNumber }`)};

const addOperation = function( numOne, numTwo ) { return numOne + numTwo };

const subtractOperation = function( numOne, numTwo ) { return numOne - numTwo };

const divideOperation = function( numOne, numTwo ) { return numOne / numTwo };

const multiplyOperation = function( numOne, numTwo ) { return numOne * numTwo };

const modulusOperation = function( numOne, numTwo ) { return numOne % numTwo };

const clear = function() {};

const Allclear = function() { 
  let x = [];
  displayScreen.textContent = '';
  firstNumber = x;
  secondNumber = x;
};

const calculation = function( op, noOne, noTwo ) {

  let result;
  let numOne = Number(noOne);
  let numTwo = Number(noTwo);

  switch( op ) {

    case '+':
      result = addOperation( numOne, numTwo );
      break;
    
    case '−':
      result = subtractOperation( numOne, numTwo );
      break;
    
    case '÷':
      result= divideOperation( numOne, numTwo );
      break;
    
    case '×':
      result = multiplyOperation( numOne, numTwo );
      break;
    
    case '%':
      result = modulusOperation( numOne, numTwo );
    
    default:
      console.error("Symbol is invalid!!!");
      break;
  }

  return result;
};

const updateDisplay = function( value ) {
  let screenPopulate = displayScreen.textContent;

  if ( screenPopulate.length < 11 ) {
    if ( value >= 1 ) {
      displayScreen.textContent = value;
    } else {
      displayScreen.textContent = value.join('');
    }
  }

};

//*EventListners
numBtn.forEach( ( numButtons ) => {
  
  numButtons.addEventListener('click', ( e ) => {
    if ( opClicked ) {
      secondNumber.push( e.target.value );
      console.log(secondNumber);
      updateDisplay(secondNumber);

    } else if ( opClicked == false ) {
      firstNumber.push( e.target.value );
      console.log(firstNumber);
      updateDisplay(firstNumber);
    }
  });
});

opBtn.forEach( ( opButtons ) => {

  opButtons.addEventListener('click', ( e ) => {
    opClicked = true;
    shouldClear = true;
    chooseOperator(e.target.value);
  });
});

clearBtn.addEventListener('click', () => {});

acBtn.addEventListener('click', () => Allclear() );

equalBtn.addEventListener('click', () => { 
    opClicked = false;
    currentAnswer = calculation(operator, firstNumber.join(''), secondNumber.join('') );
    updateDisplay(currentAnswer);
});