const select = document.getElementById('function');
const parameter = document.getElementById('parameter');
const statusbox = document.querySelector('.status');
const queueBox = document.getElementById('queue');
let functionCode = 0;
let queuelist = [];
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
async function runSelectedFunction(){
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
        // case 2 :
        //     await insertAtFirst();
        //     break;
        // case 3 :
        //     await insertAtIndex();
        //     break;
        // case 4 :
        //     await deleteByIndex();
        //     break;
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

    if(data < -999 || data > 999){
        changeStatus("Range of value is -999 to 999", 'red');
        return;
    }

    await travelToIndex(queuelist.length);

    queuelist.push(data);
    print();
    scrollTo( document.querySelector('._' + (queuelist.length - 1) ) );
    document.querySelector('._' + (queuelist.length - 1) ).classList.add('fade-In');
    changeStatus('Node is Successfully Added', 'green');
    await delay(500);
    document.querySelector('._' + (queuelist.length - 1)).classList.remove('fade-In');
}


// The deleteByData function deletes the node that contains the specified data.
// Also update the div with class 'linkedlist' and the div with class 'status'.
async function deleteByData(){
    if(queuelist.length == 0){
        changeStatus("Linked List is empty", 'red');
        return;
    }
    let data = document.getElementById('data');
    if(data.value == ''){
        changeStatus("Enter Parameter", 'red');
        return;
    }
    data = parseInt(data.value);

    if(data < -999 || data > 999){
        changeStatus("Range of value is -999 to 999", 'red');
        return;
    }

    let index = queuelist.findIndex(d => d == data);

    if(index == -1){
        await travelToIndex(queuelist.length);
        changeStatus('The linked list doesn\'t contain the value ' + data, 'orange');
        return;
    }

    await travelToIndex(index);
    scrollTo( document.querySelector('._' + index) );
    document.querySelector('._' + index).classList.add('fade-Out');
    queuelist.splice(index, 1);
    setTimeout( print , 500);
    changeStatus('Node is Successfully Deleted', 'green');
}


async function travelToIndex(index){
    for(let i = 0 ; i < index && i < linkedlist.length ; i++){
        scrollTo( document.querySelector('._' + i) );
        document.querySelector('._' + i).classList.add('current');
        await delay(150);
        document.querySelector('._' + i).classList.remove('current');
        document.querySelector('.a' + i).classList.add('currentArrow');
        await delay(150);
        document.querySelector('.a' + i).classList.remove('currentArrow');
    }
}


async function scrollTo(element){
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',    
        inline: 'nearest' 
    });
}


// The createElementWith function create element with given tag, classes, id, content and return it. 
function createElementWith(HTMLtag, allClass, id, content){
    let element = document.createElement(HTMLtag);
    for(let i = 0 ; i < allClass.length ; i++){
        element.classList.add(allClass[i]);
    }
    element.id = id;
    element.textContent = content;
    return element;
}


// The createRow function create row with default parameters and return it. 
function createRow(count , current){
    const row = createElementWith('div', ['row'], null, "");
    row.style.flexDirection = ( (current / count) % 2 == 0 ) ? "row" : "row-reverse" ;
    row.style.padding = ( (current / count) % 2 == 0 ) ? "0px " + innerHeight / 2 + "px 0px 0px" : "0px 0px 0px " + innerHeight / 2 + "px" ;
    return row;
}

// The print function updated content of the div with class 'linkedlist'.
function print(){
    queueBox.innerHTML = "";
    let current = 0;
    let count = nodeCountInRow;

    while(current < queuelist.length){
        const row = createRow(count , current);
        var arrowClass = ( (current / count) % 2  == 0 ) ? 'fa-arrow-right-long' : 'fa-arrow-left-long';
        let i;
        for(i = 0 ; current < queuelist.length && i < count ; i++){
            const node = createElementWith('div', ['node', '_' + current], null, queuelist[current]);
            const link = createElementWith('i', ['fa-solid', arrowClass, 'a' + current], null, "");   
            
            row.appendChild(node);
            row.appendChild(link);
            current++;
        }
        if(i == count){
            row.lastChild.remove();
            if((current / count) % 2 == 1) row.innerHTML += '<i class="fa-solid fa-arrow-turn-down ' + 'a' + (current - 1) + '" style=" transform: translateY(50%) "></i>';
            else row.innerHTML += '<i class="fa-solid fa-arrow-turn-up ' + 'a' + (current - 1) + '" style=" transform: translateY(50%) rotateZ(180deg) "></i>';
        }
        queueBox.appendChild(row);
    }   
    
    if(current % count == 0) {
        const row = createRow(count , current);
        queueBox.appendChild(row);
    }
    
    const node = createElementWith('div', ['node', 'null'], null, "Null");
    queueBox.lastChild.appendChild(node);
    current++;
    
    while(current % count != 0){
        const node = createElementWith('div', ['node', 'null'], null, "");
        queueBox.lastChild.appendChild(node);
        current++;
    }
    
    width = queueBox.clientWidth;
    innerHeight = document.querySelector('.row').clientHeight;
    nodeCountInRow = Math.floor( (width - (innerHeight) ) / ( (innerHeight * 1.5 ) ) );
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

// The below EventListeners is for some shortcuts.
document.addEventListener('keypress',(e) => {
    if(e.code == 'KeyF') select.focus();
    else if(e.code == 'Enter') runSelectedFunction();
});