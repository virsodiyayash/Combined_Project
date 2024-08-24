const select = document.getElementById('function');
const parameter = document.getElementById('parameter');
const statusbox = document.getElementById('status');
const linkedlistBox = document.getElementById('linkedlist');
let functionCode = 0;
let linkedlist = [];
let nodeCountInRow = 5;
let width = 0;
let innerHeight = 20;
let functionWorking = false;

print();

//The EventListener below changes the parameters as the user changes the function.
select.addEventListener('change' , (e)=>{
    parameter.innerHTML = functionParameter[select.value];
    functionCode = parseInt(select.value);
    let value = document.getElementById('data');
    if(value != null){
        value.focus();
    }
    let index = document.getElementById('index');
    if(index != null){
        index.focus();
    }
});



// For calling different function.
async function enter(){
    if( functionWorking ) return;
    functionWorking = true;

    let value = document.getElementById('data');
    if(value != null) value.blur();
    let index = document.getElementById('index');
    if(index != null) index.blur();

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
    
    if(value != null){
        value.value = '';
        value.focus();
    }
    if(index != null){
        index.value = '';
        index.focus();
    }
    functionWorking = false;
}



// changeStatus function Update the status in div having status class.
async function changeStatus(text, color){
    statusbox.style.color = color;
    statusbox.innerHTML = text;
    statusbox.classList.add('statusBlink');
    await delay(300);
    statusbox.classList.remove('statusBlink');
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
        await delay(250);
        document.querySelector('._' + i).classList.remove('current');
    }
    linkedlist.push(data);
    print();
    document.querySelector('._' + (linkedlist.length - 1) ).classList.add('fade-In');
    changeStatus('Node is Successfully Added', 'green');
    await delay(500);
    document.querySelector('._' + (linkedlist.length - 1)).classList.remove('fade-In');
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
    await delay(500);
    document.querySelector('._0').classList.remove('fade-In');
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
        await delay(250);
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
    await delay(500);
    document.querySelector('._' + index).classList.remove('fade-In');
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

    for(let i = 0 ; i < index && i < linkedlist.length ; i++){
        document.querySelector('._' + i).classList.add('current');
        await delay(250);
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
    // linkedlistBox.scrollTop = linkedlistBox.scrollHeight;
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
        await delay(250);
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
    let current = 0;
    let count = nodeCountInRow
    while(current < linkedlist.length){
        const row = document.createElement('div');
        row.classList.add('row');
        row.style.flexDirection = ( (current / count) % 2 == 0 ) ? "row" : "row-reverse" ;
        row.style.padding = ( (current / count) % 2 == 0 ) ? "0px " + innerHeight / 2 + "px 0px 0px" : "0px 0px 0px " + innerHeight / 2 + "px" ;
        var arrowClass = ( (current / count) % 2  == 0 ) ? 'fa-arrow-right-long' : 'fa-arrow-left-long';
        let i;
        for(i = 0 ; current < linkedlist.length && i < count ; i++){
            const node = document.createElement('div');
            const link = document.createElement('i');
            
            node.classList.add('node');
            node.textContent = linkedlist[current];
            node.classList.add('_' + current);
            
            link.classList.add('fa-solid');
            link.classList.add(arrowClass);    
            
            row.appendChild(node);
            row.appendChild(link);
            current++;
        }
        if(i == count){
            row.lastChild.remove();
            if((current / count) % 2 == 1) row.innerHTML += '<i class="fa-solid fa-arrow-turn-down" style=" transform: translateY(50%) "></i>';
            else row.innerHTML += '<i class="fa-solid fa-arrow-turn-up" style=" transform: translateY(50%) rotateZ(180deg) "></i>';
        }
        linkedlistBox.appendChild(row);
    }   
    
    if(current % count == 0) {
        const row = document.createElement('div');
        row.classList.add('row');
        row.style.flexDirection = ( (current / count) % 2 == 0 ) ? "row" : "row-reverse" ;
        row.style.padding = ( (current / count) % 2 == 0 ) ? "0px " + innerHeight / 2 + "px 0px 0px" : "0px 0px 0px " + innerHeight / 2 + "px" ;
        linkedlistBox.appendChild(row);
    }
    
    const node = document.createElement('div');
    node.classList.add('node');
    node.classList.add('null');
    node.textContent = 'Null';
    linkedlistBox.lastChild.appendChild(node);
    current++;

    while(current % count != 0){
        const node = document.createElement('div');
        node.classList.add('node');
        node.classList.add('null');
        linkedlistBox.lastChild.appendChild(node);
        current++;
    }

    
    width = linkedlistBox.clientWidth;
    innerHeight = document.querySelector('.row').clientHeight;
    nodeCountInRow = Math.floor( (width - (innerHeight) ) / ( (innerHeight * 1.5 ) ) );
    console.log(width, innerHeight, nodeCountInRow);
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

document.addEventListener('keypress',(e) => {
    // console.log(e);
    if(e.code == 'Enter') enter();
})