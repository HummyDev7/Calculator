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

const add = function( numOne, numTwo ) { return numOne + numTwo };

const subtract = function( numOne, numTwo ) { return numOne - numTwo };

const divide = function( numOne, numTwo ) { return numOne / numTwo };

const multiply = function( numOne, numTwo ) { return numOne * numTwo };

const modulus = function( numOne, numTwo ) { return numOne % numTwo };

const roundResult = function(number) { return Math.round(number * 1000) / 1000 };

const clear = function() {
  currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1);
};

const allClear = function() {
  currentScreen.textContent = '';
  firstOperand = '';
  secondOperand = '';
  previousScreen.textContent = '';
};

const setOperator = function( gettedOp ) {
  if ( currentScreen.textContent != '0' ) firstOperand = currentScreen.textContent;
  operator = gettedOp;
  removeFirstOperand = true;
  if ( currentScreen.textContent != '' ) previousScreen.textContent = `${ firstOperand } ${ gettedOp }`;
}

const appendDecimal = function() {
  if ( currentScreen.textContent.indexOf('.') == -1) {
    currentScreen.textContent += '.';
  }
}

const appendNumber = function(number) {
  if ( removeFirstOperand ) {
    currentScreen.textContent = currentScreen.textContent.slice(1, 0);
    removeFirstOperand = false;
  }
  currentScreen.textContent = currentScreen.textContent + number.toString();  
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

const checkOp = function( opToConvert ) {
  if ( opToConvert == "*") return "×";
  if ( opToConvert == "/") return "÷";
  if ( opToConvert == "-") return "−"
  if ( opToConvert == "+") return "+";
  if ( opToConvert == "%") return "%";
}

const keyboardSupport = function( keyCode ) {

  const keyId = keyCode.key;
  if ( keyId >= 0 && keyId <= 9 ) appendNumber( keyId );

  if ( keyId == "+" || keyId == "/" || keyId == "-" || keyId == "*" || keyId == "%" ) setOperator(checkOp(keyId));
  
  switch( keyId ) {

    case "Backspace":
      clear();
      break;

    case "c":
      allClear();
      break;

    case "=":
      evaluate();
      break;

    case ".":
      appendDecimal();
      break;   
    
    case "Enter":
      evaluate();
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

darkLightMode.addEventListener('input', function() {
  document.body.classList.toggle('light');
});

//Keyboard support 
document.addEventListener('keydown', ( e ) => keyboardSupport( e ) );