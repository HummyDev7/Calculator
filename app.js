let numBtn = document.querySelectorAll('[data-number]');
let opBtn = document.querySelectorAll('[data-operator]');
let acBtn = document.querySelector('[data-all-clear]');
let clearBtn = document.querySelector('[data-clear]');
let currentScreen = document.querySelector('.current-operation');
let equalBtn = document.querySelector('[data-equal-btn]');
let previousScreen = document.querySelector('.previous-operation');
let decimal = document.querySelector('[data-decimal]');
let darkLightMode = document.querySelector('.switch-dark-light');

let firstOperand = '';
let secondOperand = '';
let operator = null;
let removeFirstOperand = false;

let btnSoundEffect = new Audio('assets/buttonSoundEffect.wav');

const add = function( numOne, numTwo ) { return numOne + numTwo };

const subtract = function( numOne, numTwo ) { return numOne - numTwo };

const divide = function( numOne, numTwo ) { return numOne / numTwo };

const multiply = function( numOne, numTwo ) { return numOne * numTwo };

const remainder = function( numOne, numTwo ) { return numOne % numTwo };

const roundResult = function(number) { return Math.round(number * 1000) / 1000 };

const clear = function() {
  currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1);
  btnSoundEffect.play();
  btnSoundEffect.playbackRate = 1.8;
};

const allClear = function() {
  currentScreen.textContent = '';
  firstOperand = '';
  secondOperand = '';
  previousScreen.textContent = '';
  btnSoundEffect.play();
};

const setOperator = function( gettedOp ) {
  if ( currentScreen.textContent != '0' ) firstOperand = currentScreen.textContent;
  operator = gettedOp;
  removeFirstOperand = true;
  if ( currentScreen.textContent != '' ) previousScreen.textContent = `${ firstOperand } ${ gettedOp }`;
  btnSoundEffect.play();
}

const appendDecimal = function() {
  if ( currentScreen.textContent.indexOf('.') == -1) {
    currentScreen.textContent += '.';
  }
  btnSoundEffect.play();
}

const appendNumber = function(number) {
  if ( removeFirstOperand ) {
    currentScreen.textContent = currentScreen.textContent.slice(1, 0);
    removeFirstOperand = false;
  }
  currentScreen.textContent = currentScreen.textContent + number.toString();  
  btnSoundEffect.play();
  btnSoundEffect.playbackRate = 1.8;
};

const evaluate = function() {
  if ( currentScreen.textContent == '' || firstOperand == '') return
  secondOperand = currentScreen.textContent;
  currentScreen.textContent = roundResult(operate(operator, firstOperand, secondOperand));
  previousScreen.textContent = `${ firstOperand } ${ operator } ${ secondOperand } =`;
  //Check if user are dividing 1 with 0 
  if ( firstOperand == '1' && secondOperand == '0') {
    currentScreen.textContent = "Error";
    console.warn('Error you cannot divide 1 and 0');
  }
  btnSoundEffect.play();
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
      result = remainder( nOne, nTwo );
    
    default:
      console.error("Symbol is invalid!!!");
      break;
  }

  return result;
};

//Responsible for converting the operator to proper symbol to match the symbol on the calculator
const checkOp = function( opToConvert ) {

  switch ( opToConvert ) {
    case "*":
      return "x";
    case "/":
      return "÷";
    case "-":
      return "−";
    case "+":
      return "+";
    case "%":
      return "%";
    default:
      alert('Error invalid operator');
  }
}

const keyboardSupport = function( keyCode ) {

  const keyId = keyCode.key;
  
  if ( keyId >= 0 && keyId <= 9 ) appendNumber( keyId )

  switch ( keyId ) {

    case "+":
    case "/":
    case "-":
    case "*":
    case "%":
      setOperator( checkOp(keyId) );
      break;

    case "Backspace":
      clear();
      break;

    case "c":
      allClear();
      break;

    case "=":
    case "Enter":
      evaluate();
      break;

    case ".":
      appendDecimal();
      break;   
  }
}

//*EventListners
numBtn.forEach( ( numButtons ) => {
  numButtons.addEventListener('click', ( e ) => {
    appendNumber(e.target.textContent);
  });
});

opBtn.forEach( ( opButtons ) => {
  opButtons.addEventListener('click', ( e ) => {
    setOperator(e.target.textContent);
  });
});

clearBtn.addEventListener('click', clear);

acBtn.addEventListener('click', allClear);

equalBtn.addEventListener('click', evaluate);

decimal.addEventListener('click', appendDecimal)

darkLightMode.addEventListener('input', () => document.body.classList.toggle('light') );

//Keyboard support 
document.addEventListener('keydown', ( e ) => keyboardSupport( e ) );