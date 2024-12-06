// DOM Elements
const glamourButton = document.getElementById("glamourIcon");
const body = document.body;

let glamourMode = false;

glamourButton.addEventListener("click", () => {
    if (glamourMode) {
        body.className = "glamourFadeOut"

        setTimeout(() => {
            body.className = null
        }, 500)

        glamourMode = false;
    } else {
        body.className = "glamourTransition"

        setTimeout(() => {
            body.className = "glamourBody"
        }, 500) // Transition to the glamourBody after transition done

        glamourMode = true;
    }
})