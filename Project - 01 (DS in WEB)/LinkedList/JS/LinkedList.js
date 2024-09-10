const darkGreen = '#4f9503';
const red = '#a00909';
const orange = '#8d5b00';

const select = document.getElementById('function');
const parameter = document.getElementById('parameter');
const statusbox = document.querySelector('.status');
const linkedlistBox = document.getElementById('linkedlist');

let functionCode = 0;
let linkedlist = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
// let linkedlist = [];
let nodeCountInRow = 5;
let width = 0;
let innerHeight = 20;
let functionWorking = false;

const {row, namingBox} = createRow(nodeCountInRow , 0);
const node = createElementWith('div', ['node'], null, '');
row.appendChild(node);
linkedlistBox.appendChild(row);
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
async function runSelectedFunction(){
    if( functionWorking ) return;
    functionWorking = true;

    let value = document.getElementById('data');
    if(value != null) value.blur();
    let index = document.getElementById('index');
    if(index != null) index.blur();

    let isSuccessfull;

    switch(functionCode){
        case 0 :
            changeStatus("Select Function", red);
            break;
        case 1 :
            isSuccessfull = await insertAtEnd();
            break;
        case 2 :
            isSuccessfull = await insertAtFirst();
            break;
        case 3 :
            isSuccessfull = await insertAtIndex();
            break;
        case 4 :
            isSuccessfull = await deleteByIndex();
            break;
        case 5 :
            isSuccessfull = await deleteByData();
            break;
    }
    
    if(value != null){
        if(isSuccessfull) value.value = '';
        value.focus();
    }
    if(index != null){
        if(isSuccessfull) index.value = '';
        index.focus();
    }
    functionWorking = false;
}


// The insertAtEnd function add a node to the end of the linked list 
// Also update the div with class 'linkedlist' and the div with class 'status'.
async function insertAtEnd(){
    let data = document.getElementById('data');
    if(data.value == ''){
        changeStatus("Enter Parameter", red);
        return false;
    }
    data = parseInt(data.value);

    if(data < -999 || data > 999){
        changeStatus("Range of value is -999 to 999", red);
        return false;
    }

    await travelToIndex(linkedlist.length);

    linkedlist.push(data);
    print();
    scrollTo( document.querySelector('._' + (linkedlist.length - 1) ) );
    document.querySelector('._' + (linkedlist.length - 1) ).classList.add('fade-In');
    changeStatus('Node is Successfully Added', darkGreen);
    await delay(500);
    document.querySelector('._' + (linkedlist.length - 1)).classList.remove('fade-In');
    return true;
}



// The insertAtFirst function adds a node at the start of the linked list
// Also update the div with class 'linkedlist' and the div with class 'status'.
async function insertAtFirst(){
    let data = document.getElementById('data');
    if(data.value == ''){
        changeStatus("Enter Parameter", red);
        return false;
    }
    data = parseInt(data.value);

    if(data < -999 || data > 999){
        changeStatus("Range of value is -999 to 999", red);
        return false;
    }

    linkedlist.unshift(data);
    print();
    scrollTo( document.querySelector('._0') ); 
    document.querySelector('._0').classList.add('fade-In');
    await delay(500);
    document.querySelector('._0').classList.remove('fade-In');
    changeStatus('Node is Successfully Added', darkGreen);
    return true;
}



// The insertAtIndex function adds a node at the index specified by the user
// Also update the div with class 'linkedlist' and the div with class 'status'.
async function insertAtIndex(){
    let data = document.getElementById('data');
    let index = document.getElementById('index');
    if(data.value == '' || index.value == ''){
        changeStatus("Enter Parameter", red);
        return false;
    }
    index = parseInt(index.value);
    data = parseInt(data.value);

    if(data < -999 || data > 999){
        changeStatus("Range of value is -999 to 999", red);
        return false;
    }

    if(index < 0){
        changeStatus('Index can\'t be negative', red);
        return false;
    }

    await travelToIndex(index);

    if(index > linkedlist.length){
        changeStatus('Index ' + index + ' doesn\'t exist', red);
        return false;
    }

    linkedlist.splice( index, 0, data);
    print();
    scrollTo( document.querySelector('._' + index) );
    document.querySelector('._' + index).classList.add('fade-In');
    await delay(500);
    document.querySelector('._' + index).classList.remove('fade-In');
    changeStatus('Node is Successfully Added', darkGreen);
    return true;
}



// The deleteByIndex function deletes the node at the given index
// Also update the div with class 'linkedlist' and the div with class 'status'.
async function deleteByIndex(){
    if(linkedlist.length == 0){
        changeStatus("Linked List is empty", red);
        return false;
    }
    let index = document.getElementById('index');
    if(index.value == ''){
        changeStatus("Enter Parameter", red);
        return false;
    }
    index = parseInt(index.value);

    if(index < 0){
        changeStatus('Index can\'t be negative', red);
        return false;
    }

    await travelToIndex(index);

    if(index >= linkedlist.length ){
        changeStatus('Index ' + index + ' doesn\'t exist', red);
        return false;
    }
    scrollTo( document.querySelector('._' + index) );
    document.querySelector('._' + index).classList.add('fade-Out');
    linkedlist.splice(index, 1);
    setTimeout( print , 500);
    changeStatus('Node is Successfully Deleted', darkGreen);
    return true;
}



// The deleteByData function deletes the node that contains the specified data.
// Also update the div with class 'linkedlist' and the div with class 'status'.
async function deleteByData(){
    if(linkedlist.length == 0){
        changeStatus("Linked List is empty", red);
        return false;
    }
    let data = document.getElementById('data');
    if(data.value == ''){
        changeStatus("Enter Parameter", red);
        return false;
    }
    data = parseInt(data.value);

    if(data < -999 || data > 999){
        changeStatus("Range of value is -999 to 999", red);
        return false;
    }

    let index = linkedlist.findIndex(d => d == data);

    if(index == -1){
        await travelToIndex(linkedlist.length);
        changeStatus('The linked list doesn\'t contain the value ' + data, orange);
        return false;
    }

    await travelToIndex(index);
    scrollTo( document.querySelector('._' + index) );
    document.querySelector('._' + index).classList.add('fade-Out');
    linkedlist.splice(index, 1);
    setTimeout( print , 500);
    changeStatus('Node is Successfully Deleted', darkGreen);
    return true;
}


// The travelToIndex travel the linked list from 0 to given index with some animation.
async function travelToIndex(index){
    for(let i = 0 ; i < index && i < linkedlist.length ; i++){
        scrollTo( document.querySelector('._' + i) );
        document.querySelector('._' + i).classList.add('current');
        document.querySelector('#_' + i).innerHTML = 'Current';
        document.querySelector('#_' + i).style.transform = 'scale(1)';
        // document.querySelector('#_' + i).style.top = '0';
        await delay(150);
        setTimeout( () => { 
            document.querySelector('._' + i).classList.remove('current');
            document.querySelector('#_' + i).style.transform = 'scale(0)';
            // document.querySelector('#_' + i).style.top = '100%';
            // document.querySelector('#_' + i).innerHTML = ''; 
        }, 200);
        document.querySelector('.a' + i).classList.add('currentArrow');
        await delay(150);
        document.querySelector('.a' + i).classList.remove('currentArrow');
    }
}




// The createRow function create row with default parameters and return it. 
function createRow(count , current){
    const row = createElementWith('div', ['row'], null, "");
    const namingBox = createElementWith('div', ['naming'], null, "");
    row.style.flexDirection = ( (current / count) % 2 == 0 ) ? "row" : "row-reverse" ;
    namingBox.style.flexDirection = ( (current / count) % 2 == 0 ) ? "row" : "row-reverse" ;
    row.style.padding = ( (current / count) % 2 == 0 ) ? "0px " + innerHeight / 2 + "px 0px 0px" : "0px 0px 0px " + innerHeight / 2 + "px" ;
    namingBox.style.padding = ( (current / count) % 2 == 0 ) ? "0px " + innerHeight / 3 + "px" : "0px " + innerHeight / 3 + "px" ;
    row.appendChild(namingBox);
    return {row, namingBox};
}

// The print function updated content of the div with class 'linkedlist'.
function print(){

    width = linkedlistBox.clientWidth;
    innerHeight = document.querySelector('.row').clientHeight;
    nodeCountInRow = Math.floor( (width - (innerHeight) ) / ( (innerHeight * 1.5) ) );

    linkedlistBox.innerHTML = "";
    let current = 0;
    let count = nodeCountInRow;

    while(current < linkedlist.length){
        const {row, namingBox} = createRow(count , current);
        var arrowClass = ( (current / count) % 2  == 0 ) ? 'fa-arrow-right-long' : 'fa-arrow-left-long';
        let i;
        for(i = 0 ; current < linkedlist.length && i < count ; i++){
            const node = createElementWith('div', ['node', '_' + current], null, linkedlist[current]);
            const name = createElementWith('div', ['node'], '_' + current, '');

            const link = createElementWith('i', ['fa-solid', arrowClass, 'a' + current], null, "");   
            const link2 = createElementWith('i', ['fa-solid', arrowClass], null, "");   
            
            row.appendChild(node);
            row.appendChild(link);

            namingBox.appendChild(name);
            namingBox.appendChild(link2);
            current++;
        }
        if(i == count){
            row.lastChild.remove();
            if((current / count) % 2 == 1) row.innerHTML += '<i class="fa-solid fa-arrow-turn-down ' + 'a' + (current - 1) + '" style=" transform: translateY(50%) "></i>';
            else row.innerHTML += '<i class="fa-solid fa-arrow-turn-up ' + 'a' + (current - 1) + '" style=" transform: translateY(50%) rotateZ(180deg) "></i>';
        }
        linkedlistBox.appendChild(row);
    }   
    
    if(current % count == 0) {
        const {row, namingBox} = createRow(count , current);
        linkedlistBox.appendChild(row);
    }
    
    const node = createElementWith('div', ['node', 'null'], null, "Null");
    linkedlistBox.lastChild.appendChild(node);
    const name = createElementWith('div', ['node'], null, '');
    linkedlistBox.lastChild.firstChild.appendChild(name);
    current++;
    
    while(current % count != 0){
        const node = createElementWith('div', ['node', 'null'], null, "");
        linkedlistBox.lastChild.appendChild(node);
        const name = createElementWith('div', ['node'], null, '');
        linkedlistBox.lastChild.firstChild.appendChild(name);
        current++;
    }

}

