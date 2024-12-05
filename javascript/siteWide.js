// DOM Elements
const glamourButton = document.getElementById("glamourIcon");
const body = document.body;

let glamourMode = false;

glamourButton.addEventListener("click", () => {
    if (glamourMode) {
        body.className = null;
        glamourMode = false;
    } else {
        body.className = "glamourBody"
        glamourMode = true;
    }
})