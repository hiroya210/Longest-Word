const letters = document.querySelector(".letters");
let lettersArray = [];
let randomLetter;
let level = 10
const letterList = [];

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

lettersArray = range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map(x => String.fromCharCode(x));


for (i = 0; i < level;i++){
    randomLetter = lettersArray.splice(Math.floor(Math.random() * level), 1).join("");
    letterList.push(randomLetter);
}
console.log(letterList)