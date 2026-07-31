const avatar = document.querySelector('#avatar');
const name  = document.querySelector('#name');
const email = document.querySelector('#email');
const country = document.querySelector('#country');
const button = document.querySelector('#loadBtn');

async function getUser() {
    try {
        name.textContent = "Loading...";
        avatar.src = "";
        country.textContent = "";
        email.textContent = "";
        button.disabled = true;
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        const user = data.results[0];
        avatar.src = user.picture.large;
        name.textContent = `${user.name.title} ${user.name.first} ${user.name.last}`;
        email.textContent = user.email
        country.textContent = user.location.country;
        
    } catch (error) {
        name.textContent = "Failed to load user";
        console.log(error);
    } finally { 
        button.disabled = false; 
    }
}

button.addEventListener('click', getUser);
getUser();