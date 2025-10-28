// getElementById
// getElementsByClassName
// getElementsByTagName
// querySelector
// querySelectorAll

// getAttribute
// setAttribute
// removeAttribute

// el.classList -> get classes
// el.classList.add('new class') -> set class
// el.classList.remove('new class')
// el.classList.toggle('new class')
// el.className

// el.style
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#submit').addEventListener('click', () => {
        const text = document.querySelector('#textarea').value;

        document.querySelector('#result').textContent = text;
        
    });
});