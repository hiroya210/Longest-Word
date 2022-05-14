const letters = document.querySelector(".letters");
const input = document.querySelector(".letter-input")
const form = document.getElementById("form")
const result = document.getElementById("result")
const shuffleBtn = document.getElementById("reshuffle-btn")
const letterList = [];
let lettersArray = [];
let temp = [];
let randomLetter;
let level = 8

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

const start = () => {
    input.style.display = "block"
    lettersArray = range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map(x => String.fromCharCode(x));
    letters.innerHTML = ""
    temp = [...lettersArray]
    shuffleBtn.innerText = "Reshuffle"
    for (i = 0; i < level; i++){
        randomLetter = temp.splice(Math.floor(Math.random() * level), 1).join("");
        letterList.push(randomLetter)
        const list = document.createElement("li");
        list.innerText = randomLetter;
        letters.append(list)
    }
}


const validAnswer = () => {
    //if player inputs "A" check it if its inside the lettersArray
    for(i = 0; i < input.value.length; i++){
        if(letterList.every(() => letterList.includes(input.value[i].toUpperCase()))){
            return true;
        } else{
            return false;
        }
    }
}

form.addEventListener("submit", (e) => {
    result.innerHTML = ""
    e.preventDefault();
    let word = input.value;
    const url = `https://wagon-dictionary.herokuapp.com/${word}`
    fetch(url)
        .then(blob => blob.json())
        .then(data => {
            console.log(data)
            if(data.found && validAnswer()){
                return result.insertAdjacentHTML("afterbegin", `<p>Nice you got it!</p>\n<p>Word: ${data.word}</p>\n<p>Length: ${data.length}</p>`)
            }
            else{
                return result.insertAdjacentHTML("afterbegin", `<p>That word doesn't exist!</p>`)
            }
        })
})

shuffleBtn.addEventListener("click",() => {
    start();
})



console.clear