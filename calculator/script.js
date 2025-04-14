// decleration of the Variables for all the button including the display

let btnAllclear = document.getElementById('btn-value-ac');
let btnDeleteButton = document.getElementById('btn-value-del');
let btnPercentage = document.getElementById('btn-value-percentage');
let btnDivision = document.getElementById('btn-value-division');
let btn7 = document.getElementById('btn-value-7');
let btn8 = document.getElementById('btn-value-8');
let btn9 = document.getElementById('btn-value-9');
let btnMultiply = document.getElementById('btn-value-multiply');
let btn4 = document.getElementById('btn-value-4');
let btn5 = document.getElementById('btn-value-5');
let btn6 = document.getElementById('btn-value-6');
let btnSubtract = document.getElementById('btn-value-subtract');
let btn1 = document.getElementById('btn-value-1');
let btn2 = document.getElementById('btn-value-2');
let btn3 = document.getElementById('btn-value-3');
let btnAddition = document.getElementById('btn-value-addition');
let btnDoubleZero = document.getElementById('btn-value-doubleZero');
let btnZero = document.getElementById('btn-value-zero');
let btnDecimal = document.getElementById('btn-value-decimal');
let btnEqual = document.getElementById('btn-value-equal');
let display = document.getElementById('display');

let answer = display.innerHTML;
display.innerHTML = 0;
// adding eventListners

btnAllclear.addEventListener('click', (e)=>{
    display.innerHTML = "0";
    
    console.log(answer);
    answer.length = 0;
    answer = "";
    count = 0;
    console.log(answer.length);
});

btnDoubleZero.addEventListener('click',(e)=>{
    if(answer.length == 0){}
    else{
        answer += "00";
        display.innerHTML = answer;
    }
});

btn1.addEventListener('click',(e)=>{
    answer += "1";
    display.innerHTML = answer;
});

btn2.addEventListener('click',(e)=>{
    answer += "2";
    display.innerHTML = answer;
});

btn3.addEventListener('click',(e)=>{
    answer += "3";
    display.innerHTML = answer;
});

btn4.addEventListener('click',(e)=>{
    answer += "4";
    display.innerHTML = answer;
});

btn5.addEventListener('click',(e)=>{
    answer += "5";
    display.innerHTML = answer;
});

btn6.addEventListener('click',(e)=>{
    answer += "6";
    display.innerHTML = answer;
});

btn7.addEventListener('click',(e)=>{
    answer += "7";
    display.innerHTML = answer;
});

btn8.addEventListener('click',(e)=>{
    answer += "8";
    display.innerHTML = answer;
});

btn9.addEventListener('click',(e)=>{
    answer += "9";
    display.innerHTML = answer;
});

btnZero.addEventListener('click',(e)=>{
    if(answer.length == 0){}
    else{
        answer += "0";
        display.innerHTML = answer;
    }
});

// to handle multiple decimal
let count = 0;

btnDecimal.addEventListener('click',(e) => {
    if(count > 0){}
    else if(answer.length == 0){
        answer += "0.";
        count++;
        display.innerHTML = answer;
    }
    else{
        answer += ".";
        count++;
        display.innerHTML = answer;
    }
});

btnAddition.addEventListener('click',(e)=>{
    let lastvariable = answer[answer.length -1];
    if(answer.length == 0){
        display.innerHTML = 0;
    }
    //handling of the cases where multiple operators come together and after decimal there should be no operator present
    else if(lastvariable != '+' && lastvariable != '.'){
        answer += "+";
        display.innerHTML = answer;
    } 
});

btnSubtract.addEventListener('click',(e)=>{
    let lastvariable = answer[answer.length -1];
    if(answer.length == 0){
        display.innerHTML = 0;
    }
    //handling of the cases where multiple operators come together and after decimal there should be no operator present
    else if(lastvariable != '-' && lastvariable != '.'){
        answer += "-";
        display.innerHTML = answer;
    }
    
});

btnDivision.addEventListener('click',(e)=>{
    let lastvariable = answer[answer.length -1];
    if(answer.length == 0){
        display.innerHTML = 0;
    }
    //handling of the cases where multiple operators come together and after decimal there should be no operator present
    else if(lastvariable != '/' && lastvariable != '.'){
        answer += "/";
        display.innerHTML = answer;
    }
    
});

btnMultiply.addEventListener('click',(e)=>{
    let lastvariable = answer[answer.length -1];
    if(answer.length == 0){
        display.innerHTML = 0;
    }
    //handling of the cases where multiple operators come together and after decimal there should be no operator present
    else if(lastvariable != '*' && lastvariable != '.'){
        answer += "*";
        display.innerHTML = answer;
    }
    
});
console.log("answer: "+answer.length);

btnPercentage.addEventListener('click',(e)=>{
    let lastvariable = answer[answer.length -1];
    if(answer.length == 0){
        display.innerHTML = 0;
    }
    //handling of the cases where multiple operators come together and after decimal there should be no operator present
    else if(lastvariable != '%' && lastvariable != '.'){
        answer += "%";
        display.innerHTML = answer;
    }
    
});

btnDeleteButton.addEventListener('click',(e)=>{
    if(answer.length == 0){
        display.innerHTML = 0;
    }
    else if(answer.length == 1){
        display.innerHTML = 0;
        answer = "";
    }
    else{
        answer = answer.substring(0,answer.length-1);
        console.log(answer);
        display.innerHTML = answer; 
    }
});

btnEqual.addEventListener('click',(e) => {
    let lastvariable = answer[answer.length -1];
    if(answer.length == 0 || lastvariable == '0'){
        display.innerHTML = 0;
    }
    else{
        answer = eval(answer);
        display.innerHTML = answer;
    }
}); 