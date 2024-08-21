const select = document.getElementById('function');
const parameter = document.getElementById('parameter');
const statusbox = document.getElementById('status');
const linkedlistBox = document.getElementById('linkedlist');
let functionCode = 0;
let linkedlist = [];


print();


//The EventListener below changes the parameters as the user changes the function.
select.addEventListener('change' , (e)=>{
    parameter.innerHTML = functionParameter[select.value];
    functionCode = parseInt(select.value);
    let index = document.getElementById('index');
    if(index != null){
        index.focus();
        return;
    }
    let value = document.getElementById('data');
    value.focus();
});



// For calling different function.
async function enter(){

    switch(functionCode){
        case 0 :
            changeStatus("Select Function", 'red');
            break;
        case 1 :
            await insertAtEnd();
            break;
        case 2 :
            await insertAtFirst();
            break;
        case 3 :
            await insertAtIndex();
            break;
        case 4 :
            await deleteByIndex();
            break;
        case 5 :
            await deleteByData();
            break;
    }
    let value = document.getElementById('data');
    if(value!= null){
        value.value = '';
        value.focus();
    }
    let index = document.getElementById('index');
    if(index != null){
        index.value = '';
        index.focus();
    }
}



// changeStatus function Update the status in div having status class.
function changeStatus(text, color){
    statusbox.style.color = color;
    statusbox.innerHTML = text;
}



// The insertAtEnd function add a node to the end of the linked list 
// Also update the div with class 'linkedlist' and the div with class 'status'.
async function insertAtEnd(){
    let data = document.getElementById('data');
    if(data.value == ''){
        changeStatus("Enter Parameter", 'red');
        return;
    }
    data = parseInt(data.value);

    for(let i = 0 ; i < linkedlist.length ; i++){
        document.querySelector('._' + i).classList.add('current');
        await delay(500);
        document.querySelector('._' + i).classList.remove('current');
    }

    linkedlist.push(data);
    print();
    document.querySelector('._' + (linkedlist.length - 1) ).classList.add('fade-In');
    changeStatus('Node is Successfully Added', 'green');
}



// The insertAtFirst function adds a node at the start of the linked list
// Also update the div with class 'linkedlist' and the div with class 'status'.
async function insertAtFirst(){
    let data = document.getElementById('data');
    if(data.value == ''){
        changeStatus("Enter Parameter", 'red');
        return;
    }
    data = parseInt(data.value);
    linkedlist.unshift(data);
    print();
    document.querySelector('._0').classList.add('fade-In');
    changeStatus('Node is Successfully Added', 'green');
}



// The insertAtIndex function adds a node at the index specified by the user
// Also update the div with class 'linkedlist' and the div with class 'status'.
async function insertAtIndex(){
    let data = document.getElementById('data');
    let index = document.getElementById('index');
    if(data.value == '' || index.value == ''){
        changeStatus("Enter Parameter", 'red');
        return;
    }
    index = parseInt(index.value);

    if(index < 0){
        changeStatus('Index can\'t be negative', 'red');
        return;
    }

    for(let i = 0 ; i < index && i < linkedlist.length ; i++){
        document.querySelector('._' + i).classList.add('current');
        await delay(500);
        document.querySelector('._' + i).classList.remove('current');
    }

    if(index > linkedlist.length){
        changeStatus('Index ' + index + ' doesn\'t exist', 'red');
        return;
    }
    data = parseInt(data.value);
    linkedlist.splice( index, 0, data);
    print();
    document.querySelector('._' + index).classList.add('fade-In');
    changeStatus('Node is Successfully Added', 'green');
}



// The deleteByIndex function deletes the node at the given index
// Also update the div with class 'linkedlist' and the div with class 'status'.
async function deleteByIndex(){
    if(linkedlist.length == 0){
        changeStatus("Linked List is empty", 'red');
        return;
    }
    let index = document.getElementById('index');
    if(index.value == ''){
        changeStatus("Enter Parameter", 'red');
        return;
    }
    index = parseInt(index.value);

    if(index < 0){
        changeStatus('Index can\'t be negative', 'red');
        return;
    }

    for(let i = 0 ; i <= index && i < linkedlist.length ; i++){
        document.querySelector('._' + i).classList.add('current');
        await delay(500);
        document.querySelector('._' + i).classList.remove('current');
    }

    if(index >= linkedlist.length ){
        changeStatus('Index ' + index + ' doesn\'t exist', 'red');
        return;
    }
    document.querySelector('._' + index).classList.add('fade-Out');
    linkedlist.splice(index, 1);
    setTimeout( print , 500);
    changeStatus('Node is Successfully Deleted', 'green');
}



// The deleteByData function deletes the node that contains the specified data.
// Also update the div with class 'linkedlist' and the div with class 'status'.
async function deleteByData(){
    if(linkedlist.length == 0){
        changeStatus("Linked List is empty", 'red');
        return;
    }
    let data = document.getElementById('data');
    if(data.value == ''){
        changeStatus("Enter Parameter", 'red');
        return;
    }
    data = parseInt(data.value);
    let index = -1;

    for(let i = 0 ; i < linkedlist.length ; i++){
        document.querySelector('._' + i).classList.add('current');
        await delay(500);
        document.querySelector('._' + i).classList.remove('current');
        if(linkedlist[i] == data){
            index = i;
            break;
        }
    }

    if(index == -1){
        changeStatus('The linked list doesn\'t contain the value ' + data, 'orange');
        return;
    }

    document.querySelector('._' + index).classList.add('fade-Out');
    linkedlist.splice(index, 1);
    setTimeout( print , 500);
    changeStatus('Node is Successfully Deleted', 'green');
}



// The print function updated content of the div with class 'linkedlist'.
function print(){
    linkedlistBox.innerHTML = "";

    
    for(let i = 0 ; i < linkedlist.length ; i++){
        const node = document.createElement('div');
        const link = document.createElement('i');
        
        node.classList.add('node');
        node.textContent = linkedlist[i];
        node.classList.add('_' + i);
        
        link.classList.add('fa-solid');
        link.classList.add('fa-arrow-right-long');    

        linkedlistBox.appendChild(node);
        linkedlistBox.appendChild(link);
    }
    
    linkedlistBox.innerHTML += 'NULL';
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