let header = document.querySelector('.header')
let main = document.querySelector('.main')
let bar = document.querySelector('.bar')

header.classList.add('headerAnimation')

document.addEventListener('DOMContentLoaded', () => {
    const waveText = document.querySelector('.header');
    waveText.innerHTML = waveText.textContent
        .trim()
        .split('')
        .map((char, index) => `<span style="--i:${index}">${char}</span>`)
        .join('');
});


// header.addEventListener('animationend', (e) => {
//     if(e.animationName == 'header') header.style.transition = '';
// });






