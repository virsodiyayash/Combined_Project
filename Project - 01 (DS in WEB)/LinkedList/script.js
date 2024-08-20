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
function enter(){
    switch(functionCode){
        case 0 :
            changeStatus("Select Function", 'red');
            break;
        case 1 :
            insertAtEnd();
            break;
        case 2 :
            insertAtFirst();
            break;
        case 3 :
            insertAtIndex();
            break;
        case 4 :
            deleteByIndex();
            break;
        case 5 :
            deleteByData();
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
function insertAtEnd(){
    let data = document.getElementById('data');
    if(data.value == ''){
        changeStatus("Enter Parameter", 'red');
        return;
    }
    data = parseInt(data.value);
    linkedlist.push(data);
    print();
    changeStatus('Node is Successfully Added', 'green');
}


// The insertAtFirst function adds a node at the start of the linked list
// Also update the div with class 'linkedlist' and the div with class 'status'.
function insertAtFirst(){
    let data = document.getElementById('data');
    if(data.value == ''){
        changeStatus("Enter Parameter", 'red');
        return;
    }
    data = parseInt(data.value);
    linkedlist.unshift(data);
    print();
    changeStatus('Node is Successfully Added', 'green');
}


// The insertAtIndex function adds a node at the index specified by the user
// Also update the div with class 'linkedlist' and the div with class 'status'.
function insertAtIndex(){
    let data = document.getElementById('data');
    let index = document.getElementById('index');
    if(data.value == '' || index.value == ''){
        changeStatus("Enter Parameter", 'red');
        return;
    }
    index = parseInt(index.value);
    if(index < 0 || index > linkedlist.length){
        changeStatus('Index ' + index + ' doesn\'t exist', 'red');
        return;
    }
    data = parseInt(data.value);
    linkedlist.splice( index, 0, data);
    print();
    changeStatus('Node is Successfully Added', 'green');
}


// The deleteByIndex function deletes the node at the given index
// Also update the div with class 'linkedlist' and the div with class 'status'.
function deleteByIndex(){
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
    if(index < 0 || index >= linkedlist.length ){
        changeStatus('Index ' + index + ' doesn\'t exist', 'red');
        return;
    }
    linkedlist.splice(index, 1);
    print();
    changeStatus('Node is Successfully Deleted', 'green');
}


// The deleteByData function deletes the node that contains the specified data.
// Also update the div with class 'linkedlist' and the div with class 'status'.
function deleteByData(){
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
    let index = linkedlist.findIndex(value => value == data);
    if(index == -1){
        changeStatus('Linked list doesn\'t have value ' + data, 'orange');
        return;
    }
    linkedlist.splice(index, 1);
    print();
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
        
        link.classList.add('fa-solid')
        link.classList.add('fa-arrow-right-long');    

        linkedlistBox.appendChild(node);
        linkedlistBox.appendChild(link);
    }
    
    linkedlistBox.innerHTML += 'NULL';
}


// The two EventListeners below toggles the visibility of the 'background' element when the 'showCode' and 'close' buttons are clicked.
document.getElementById('showCode').addEventListener('click', (e)=>{
    document.getElementById('background').style.visibility = 'visible';
});

document.getElementById('close').addEventListener('click', ()=>{
    document.getElementById('background').style.visibility = 'hidden';
});