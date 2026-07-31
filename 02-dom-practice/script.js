const changeButton = document.getElementById('changeBtn');
const title = document.querySelector("#title");
const input = document.querySelector('#nameInput');
const showButton = document.getElementById('showBtn');
changeButton.addEventListener("click", () => {
    console.log("changeButton clicked");
    title.textContent = "Welcome Sasha";
});
showButton.addEventListener('click', () => { 
    console.log("showButton clicked");
    if (input.value.trim() === "") {
        alert("Please enter your name.");
        return;
    }
    title.textContent = `Hello ${input.value}`;
});
const p = document.createElement('p');
p.textContent = "Today's lesson: DOM";
document.body.appendChild(p);
const buttonRemove = document.createElement('button');
buttonRemove.textContent = "Remove Paragraph";
document.body.appendChild(buttonRemove);

buttonRemove.addEventListener('click', () => { 
    if (document.body.contains(p)) { 
        document.body.removeChild(p);
    }
});