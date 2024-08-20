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
            count = count + 1;
            break;
        case 2 :
            if(count - 1 < 0){
                changeStatus('stack is underflow' , 'red');
                return;
            }
            popStack();
            count = count - 1;
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
}

function popStack(){
    stackArray.pop();
    const lastElement = stack.lastElementChild;

    if(lastElement){
        lastElement.classList.add('fade-out');

        setTimeout(() => {
            stack.removeChild(lastElement);
            changeStatus('Node is successfully removed' , 'green');
        } , 400);
    }
}

function peekStack(){
    const lastElement = stack.lastElementChild;
    const data = stackArray.pop();

    if(lastElement){
        lastElement.classList.add('stackColor');
        changeStatus("The last node is " + data , 'green');

        setTimeout(() => {
            lastElement.style.backgroundColor = 'transparent';
            setTimeout(() => {
                lastElement.classList.remove('stackColor');
            } , 2000)
        } , 3000);
    } 
}

function changeStack(){

}

function sizeStack(){
    changeStatus("The size of the stack is "+count , 'green');
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
