const select = document.getElementById('function');
const parameter = document.getElementById('parameter');
const statusbox = document.getElementById('status');
const linkedlistBox = document.getElementById('linkedlist');
let functionCode = 0;
let linkedlist = [];

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
            insertAtEnd();
            break;
        case 2 :
            insertAtFirst();
            break;
        case 3 :
            insertAt();
            break;
        case 4 :
            deleteByIndex();
            break;
        case 5 :
            deleteByData();
            break;
    }
}

function changeStatus(text, color){
    statusbox.style.color = color;
    statusbox.innerHTML = text;
}

function insertAtEnd(){
    let data = document.getElementById('data');
    if(data.value == ''){
        changeStatus("Enter Parameter", 'red');
        return;
    }
    data = parseInt(data.value);
    linkedlist.push(data);
    text = linkedlistBox.innerHTML;
    linkedlistBox.innerHTML = text + '<div class="node"> <div class="num"> <div> ' + data + ' </div> </div> <div></div> </div> ';
    changeStatus('Node is Successfully Added', 'green');
}

function insertAtFirst(){
    let data = document.getElementById('data');
    if(data.value == ''){
        changeStatus("Enter Parameter", 'red');
        return;
    }
    data = parseInt(data.value);
    linkedlist.unshift(data);
    text = linkedlistBox.innerHTML;
    linkedlistBox.innerHTML = '<div class="node"> <div class="num"> <div> ' + data + ' </div> </div> <div></div> </div> ' + text;
    changeStatus('Node is Successfully Added', 'green');
}

function insertAt(){
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
    linkedlistBox.innerHTML = print();
    changeStatus('Node is Successfully Added', 'green');
}

function deleteByIndex(){
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
    linkedlistBox.innerHTML = print();
    changeStatus('Node is Successfully Added', 'green');
}

function deleteByData(){
    let data = document.getElementById('data');
    if(data.value == ''){
        changeStatus("Enter Parameter", 'red');
        return;
    }
    data = parseInt(data.value);
    let index = linkedlist.findIndex(value => value == data);
    if(index != -1){
        linkedlist.splice(index, 1);
        linkedlistBox.innerHTML = print();
    }
    changeStatus('Node is Successfully Added', 'green');
}


function print(){
    let text = "";
    for(let i = 0 ; i < linkedlist.length ; i++){
        text += '<div class="node"> <div class="num"> <div> ' + linkedlist[i] + ' </div> </div> <div></div> </div> ';
    }
    return text;
}

function nodeStructure(){
    let element = document.getElementById('code');
    if(element.style.visibility == 'hidden') element.style.visibility = 'visible'; 
    else element.style.visibility = 'hidden'; 
}

document.getElementById('functionCode').addEventListener('mouseenter', ()=>{
    document.querySelector('#codeOfFunction pre').innerHTML = codeOfFunction[functionCode];
    document.getElementById('codeOfFunction').style.visibility = 'visible';
});

document.getElementById('functionCode').addEventListener('mouseout', ()=>{
    document.getElementById('codeOfFunction').style.visibility = 'hidden';
});

document.getElementById('nodeStructure').addEventListener('mouseenter', ()=>{
    document.getElementById('codeOfNode').style.visibility = 'visible';
});

document.getElementById('nodeStructure').addEventListener('mouseout', ()=>{
    document.getElementById('codeOfNode').style.visibility = 'hidden';
});