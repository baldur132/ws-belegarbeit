/* client side js for worterbuch */

// globals
let sliderButton;
let sliderValue = 0;
let sliderLength = 0;
let sliderTopOffset = 0; 
let sliderButtonOffset = 0;

function init() {
    // update globals
    updateSliderValues();
    sliderButton = document.getElementById("sliderButton")

    // set slider button to right position
    resetSlider();
    
    // set event listeners
    window.addEventListener("resize", e => {
        updateSliderValues();
    });
    window.addEventListener("mousemove", handleSlider)
    window.addEventListener("mousedown", handleSlider)
    sliderButton.addEventListener("mouseup", handleSlider)
}

function updateSliderValues() {
    let sliderBody = document.querySelector(".slider-line");
    sliderLength = sliderBody.clientHeight;
    sliderTopOffset = sliderBody.offsetTop;
}

function resetSlider() {
    sliderButton.style.setProperty("--slider-offset", `${sliderTopOffset}px`)
}

let sliderActive = false;

function handleSlider(e) {
    switch (e.type) {
        case "mousedown":
            switch (e.target) {
                case sliderButton:
                    sliderActive = true
                    break;
                case document.querySelector(".slider-container"):
                    console.log("clicked on slider container")
                    break;
            }
            break;
        case "mouseup":
            break;
        case "mousemove":
            if (sliderActive) {
                // check if user is left clicking button
                if (e.button === 0 && e.buttons === 1) {
                    // calculate new slider position, preventing OOB
                    let y = e.clientY - sliderButton.clientHeight / 2
                    y = (y <= sliderTopOffset) ? sliderTopOffset : y
                    let sliderBottom = sliderTopOffset + sliderLength 
                    let sBH = sliderButton.clientHeight
                    y = (y >= sliderBottom - sBH) ? sliderBottom - sBH : y
                    sliderButton.style.setProperty("--slider-offset", `${y}px`)

                    // calculate 0-1 slider value based on length
                    let deltaStart = (y - sliderTopOffset + sBH / 2) / sliderLength
                    let decimalPlaces = 5
                    sliderValue = Math.floor(deltaStart * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)
                } else {
                    sliderActive = false;
                }
            }
            break;
    }
}