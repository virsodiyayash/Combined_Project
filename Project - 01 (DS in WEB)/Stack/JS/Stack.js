const select = document.getElementById('function');
const parameter = document.getElementById('parameter');
const stack = document.querySelector('.stack');
const statusbox = document.querySelector('.status');
let functionCode = 0;
let stackArray = Array().fill(null);
let count = 0;

let minHeight = stack.offsetHeight;
let currentHeight = stack.offsetHeight;

select.addEventListener('change' , (e)=>{
    parameter.innerHTML = functionParameter[select.value];
    functionCode = parseInt(select.value);
});

function runSelectedFunction(){
    switch(functionCode){
        case 0 :
            changeStatus("Select Function", 'var(--red)');
            break;
        case 1 :
            if(!true){
                changeStatus("Stack is overflow" , "var(--red)");
                return;
            }
            pushStack();
            break;
        case 2 :
            if(count - 1 < 0){
                changeStatus('stack is underflow' , 'var(--red)');
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

function pushStack(){
    let data = document.getElementById('data');

    if(data.value == ''){
        changeStatus("Enter Parameter", 'var(--red)');
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

    changeStatus('Node is Successfully Added', 'var(--darkGreen)');
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
        changeStatus('Node is successfully removed' , 'var(--darkGreen)');
        count = count - 1;
        stack.style.height = 'max(' + currentHeight + 'px' + ',' + minHeight + 'px' + ')';
    }
}

function peepStack(){
   let index = document.getElementById('index');

   if(index.value === ""){
    changeStack("Enter index" , 'var(--red)');
    return;
   }

   index = parseInt(index.value);

   if(index < 0 || index >= stackArray.length){
    changeStatus("Index is not valid please enter valid index" , "var(--red)");
    return;
   }

   const selectedElement = stack.children[stackArray.length - 1 - index];
   const data = stackArray[stackArray.length - 1 - index];

   if(selectedElement){
        selectedElement.classList.add('colorStack');
        console.log(selectedElement);
        changeStatus(`The value at the index ${index} is ${data}` , "var(--darkGreen)");
        
        setTimeout(() => {
            selectedElement.classList.remove('colorStack');
            console.log(selectedElement);
        } , 1500);
   }
} 


function changeStack(){
    let index = document.getElementById('index');
    let dataForChange = document.getElementById('data');

    if(index.value < 0 || index.value >= stackArray.length){
        changeStatus("Index is not valid please enter valid index" , "var(--red)");
    }

    if(index.value === ''){
        changeStatus("Enter index", 'var(--red)');
        return;
    }

    if (dataForChange.value === '') {
        changeStatus("Enter data", 'var(--red)');
        return;
    }

    index = parseInt(index.value);
    let dataWithChange = parseInt(dataForChange.value);

    const selectedElementForChange = stack.children[stackArray.length - 1 - index];
    const dataWithoutChange = stackArray[stackArray.length - 1 - index];

    if(selectedElementForChange){
        selectedElementForChange.classList.add('stackColor');
        changeStatus(`The value at the index ${index} is ${dataWithoutChange}` , 'var(--darkGreen)');

        setTimeout(() => {
            selectedElementForChange.classList.remove('stackColor');
        } , 1500);
    
    
    stackArray[stackArray.length - 1 - index] = dataWithChange;
    selectedElementForChange.textContent = dataWithChange;

   
        selectedElementForChange.classList.add('changeColor');

        setTimeout(() => {
            selectedElementForChange.classList.remove('changeColor');
        } , 1500);

        changeStatus(`The value at index ${index} has been changed to ${dataWithChange}` , 'var(--darkGreen)');
    }
}
