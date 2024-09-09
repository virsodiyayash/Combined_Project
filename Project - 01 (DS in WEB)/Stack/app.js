const select = document.getElementById('function');
const parameter = document.getElementById('parameter');
const stack = document.querySelector('.stack');
const statusbox = document.getElementById('status');
let functionCode = 0;
let stackArray = Array().fill(null);
let count = 0;

let minHeight = stack.offsetHeight;
let currentHeight = stack.offsetHeight;

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
            if(!true){
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
            peepStack();
            break;
        case 4 :
            changeStack();
            break;
        // case 5 :
        //     sizeStack();
        //     break;
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

    // Add the 'moving' class to trigger the animation
    numberElement.classList.add('moving-in');

    changeStatus('Node is Successfully Added', 'green');
    count = count + 1;

    currentHeight += numberElement.offsetHeight;
    stack.style.height = 'max(' + currentHeight + 'px' + ',' + minHeight + 'px' + ')';

    setTimeout(() => {
        numberElement.classList.remove('moving-in');
    } , 100);
}

async function popStack(){
    stackArray.pop();
    const lastElement = stack.lastElementChild;

    if(lastElement){
        lastElement.classList.add('moving-out');
        await delay(700);
        currentHeight -= lastElement.offsetHeight;
        stack.removeChild(lastElement);
        changeStatus('Node is successfully removed' , 'green');
        count = count - 1;
        stack.style.height = 'max(' + currentHeight + 'px' + ',' + minHeight + 'px' + ')';
    }
}

function peepStack(){
   let index = document.getElementById('index');

   if(index.value === ""){
    changeStack("Enter index" , 'red');
    return;
   }

   index = parseInt(index.value);

   if(index < 0 || index >= stackArray.length){
    changeStatus("Index is not valid please enter valid index" , "red");
    return;
   }

   console.log(index.value);

   const selectedElement = stack.children[stackArray.length - 1 - index];
   const data = stackArray[stackArray.length - 1 - index];

   if(selectedElement){
        selectedElement.classList.add('colorStack');
        changeStatus(`The value at the index ${index} is ${data}` , "green");

        setTimeout(() => {
            selectedElement.classList.remove('colorStack');
        } , 1500);
   }
} 


function changeStack(){
    let index = document.getElementById('index');
    let dataForChange = document.getElementById('data');

    if(index.value < 0 || index.value >= stackArray.length){
        changeStatus("Index is not valid please enter valid index" , "red");
    }

    if(index.value === ''){
        changeStatus("Enter index", 'red');
        return;
    }

    if (dataForChange.value === '') {
        changeStatus("Enter data", 'red');
        return;
    }

    index = parseInt(index.value);
    let dataWithChange = parseInt(dataForChange.value);

    const selectedElementForChange = stack.children[stackArray.length - 1 - index];
    const dataWithoutChange = stackArray[stackArray.length - 1 - index];

    if(selectedElementForChange){
        selectedElementForChange.classList.add('stackColor');
        changeStatus(`The value at the index ${index} is ${dataWithoutChange}` , 'green');

        setTimeout(() => {
            selectedElementForChange.classList.remove('stackColor');
        } , 1500);
    
    
    stackArray[stackArray.length - 1 - index] = dataWithChange;
    selectedElementForChange.textContent = dataWithChange;

   
        selectedElementForChange.classList.add('changeColor');

        setTimeout(() => {
            selectedElementForChange.classList.remove('changeColor');
        } , 1500);

        changeStatus(`The value at index ${index} has been changed to ${dataWithChange}` , 'green');
    }
}


// The delay function pause the function for given ms.
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// The two EventListeners below toggles the visibility of the 'background' element when the 'showCode' and 'close' buttons are clicked.
document.getElementById('showCode').addEventListener('click', (e)=>{
    document.getElementById('background').style.visibility = 'visible';
});

document.getElementById('close').addEventListener('click', ()=>{
    document.getElementById('background').style.visibility = 'hidden';
});
