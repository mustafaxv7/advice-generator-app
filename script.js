console.log("Script loaded");  

const diceButton = document.getElementById('dice-button');
const adviceNumber = document.getElementById('advice-number');
const quote = document.querySelector('.advice-quote');

diceButton.addEventListener("click", function(event) {
    console.log("Button clicked"); 
    console.log(showQuote()); // it is for me just to test the state of the promise 
    showQuote();
});

window.onload = function() {
    console.log("Window loaded");  
    showQuote().catch(error => console.error(error));
}

function showQuote() {
     const timestamp = new Date().getTime();  // trick to make the advice unique
     const apiUrl = `https://api.adviceslip.com/advice?timestamp=${timestamp}`;
     return fetch(apiUrl)
    .then(response => response.json())
    .then((data) => data.slip)
    .then((data) => {
        adviceNumber.textContent = data.id;
        quote.textContent = data.advice;
    })
    .catch(error => {
        console.error("Error fetching advice:", error);
    });
}


