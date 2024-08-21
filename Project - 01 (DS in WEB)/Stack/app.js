const select = document.getElementById('function');
const parameter = document.getElementById('parameter');
const stack = document.querySelector('.stack');
const statusbox = document.getElementById('status');
let functionCode = 0;
let stackArray = Array(10).fill(null);
let count = 0;

select.addEventListener('change' , (e)=>{
    parameter.innerHTML = functionParameter[select.value];
    functionCode = parseInt(select.value);
});

function enter(){
    switch(functionCode){
        case 0 :
            changeStatus("Select Function", 'red');
            break;
        case 1 :
            if(count + 1 > 10){
                changeStatus("Stack is overflow" , "red");
                return;
            }
            pushStack();
            break;
        case 2 :
            if(count - 1 < 0){
                changeStatus('stack is underflow' , 'red');
                return;
            }
            popStack();
            break;
        case 3 :
            peekStack();
            break;
        case 4 :
            changeStack();
            break;
        case 5 :
            sizeStack();
            break;
    }
}

function changeStatus(text, color){
    statusbox.style.color = color;
    statusbox.innerHTML = text;
}

function pushStack(){
    let data = document.getElementById('data');

    if(data.value == ''){
        changeStatus("Enter Parameter", 'red');
        return;
    }

    data = parseInt(data.value);
    stackArray.push(data);
    const numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.textContent = data;
    stack.appendChild(numberElement);
    // inputNumber.value = '';
    // inputText.style.display = 'none';
    changeStatus('Node is Successfully Added', 'green');
    count = count + 1;
}

function popStack(){
    stackArray.pop();
    const lastElement = stack.lastElementChild;

    if(lastElement){
        lastElement.classList.add('fade-out');

        setTimeout(() => {
            stack.removeChild(lastElement);
            changeStatus('Node is successfully removed' , 'green');
            count = count - 1;
        } , 400);
    }
}

function peekStack(){
    const lastElement = stack.lastElementChild;

    lastElement.classList.add('stackColor');
    const data = stackArray[ stackArray.length - 1 ];

    if(lastElement){
        lastElement.classList.add('stackColor');
        changeStatus("The last node is " + data , 'green');

        setTimeout(() => {
            lastElement.classList.remove('stackColor');
            // lastElement.style.backgroundColor = 'transparent';
            // stack.removeChild(lastElement);
            // const numberElement = document.createElement('div');
            // numberElement.classList.add('number');
            // numberElement.textContent = stackArray[ stackArray.length - 1 ];
            // stack.appendChild(numberElement);
        } , 2000);
    }
} 


function changeStack(){
    
}

function sizeStack(){
    changeStatus("The size of the stack is "+ count , 'green');
}



// const inputText = document.getElementById('input_text');
// const inputNumber = document.querySelector('.input_number');
// const pushButton = document.querySelector('.button.push');
// const popButton = document.querySelector('.button.pop');
// const peekButton = document.querySelector('.button.peek');
// const sizeButton = document.querySelector('.button.size');
// const numberPushButton = document.querySelector('.number_push');
// const box = document.querySelector('.box');

// pushButton.addEventListener('click', () => {
//     inputText.style.display = 'block';
// });

// numberPushButton.addEventListener('click' , () => {
//     const numberValue = inputNumber.value;

//     if(numberValue){
//         const numberElement = document.createElement('div');
//         numberElement.classList.add('number');
//         numberElement.textContent = numberValue;
//         box.appendChild(numberElement);
//         inputNumber.value = '';
//         inputText.style.display = 'none';
//     }
// })

// popButton.addEventListener('click' , () => {
//     inputText.style.display = 'none';
// })

// peekButton.addEventListener('click' , () => {
//     inputText.style.display = 'block';
// })

// sizeButton.addEventListener('click' , () => {
//     inputText.style.display = 'block';
// })
