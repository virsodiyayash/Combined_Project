// changeStatus function Update the status in div having status class.
async function changeStatus(text, color){
    statusbox.style.color = color;
    statusbox.innerHTML = text;
    statusbox.classList.add('statusBlink');
    await delay(300);
    statusbox.classList.remove('statusBlink');
}


// The createElementWith function create element with given tag, classes, id, content and return it. 
function createElementWith(HTMLtag, allClass, id, content){
    let element = document.createElement(HTMLtag);
    for(let i = 0 ; i < allClass.length ; i++){
        element.classList.add(allClass[i]);
    }
    if(id != null) element.id = id;
    element.textContent = content;
    return element;
}



// The scrollTo function Scroll the page for the element to come in viewing screen.scrollTo
async function scrollTo(element){
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',    
        inline: 'nearest' 
    });
}


// The delay function pause the function for given ms.
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



// The two EventListeners below toggles the visibility of the 'background' element when the 'showCode' and 'close' buttons are clicked.
document.getElementById('showCode').addEventListener('click', (e)=>{
    document.getElementById('code').showModal();
});

document.getElementById('close').addEventListener('click', ()=>{
    document.getElementById('code').close();
});

// The below EventListeners is for some shortcuts.
document.addEventListener('keypress',(e) => {
    if(e.code == 'KeyF') select.focus();
    else if(e.code == 'Enter') runSelectedFunction();
});