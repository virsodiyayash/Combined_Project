const inputText = document.getElementById('input_text');
const inputNumber = document.querySelector('.input_number');
const pushButton = document.querySelector('.button.push');
const popButton = document.querySelector('.button.pop');
const peekButton = document.querySelector('.button.peek');
const sizeButton = document.querySelector('.button.size');
const numberPushButton = document.querySelector('.number_push');
const box = document.querySelector('.box');

pushButton.addEventListener('click', () => {
    inputText.style.display = 'block';
});

numberPushButton.addEventListener('click' , () => {
    const numberValue = inputNumber.value;

    if(numberValue){
        const numberElement = document.createElement('div');
        numberElement.classList.add('number');
        numberElement.textContent = numberValue;
        box.appendChild(numberElement);
        inputNumber.value = '';
        inputText.style.display = 'none';
    }
})

popButton.addEventListener('click' , () => {
    inputText.style.display = 'none';
})

peekButton.addEventListener('click' , () => {
    inputText.style.display = 'block';
})

sizeButton.addEventListener('click' , () => {
    inputText.style.display = 'block';
})
