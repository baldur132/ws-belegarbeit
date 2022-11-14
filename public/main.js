/* client side js for worterbuch */

// globals
let sliderButton;
let sliderValue = 0;
let sliderLength = 0;
let sliderTopOffset = 0;
let sliderButtonOffset = 0;
let wordList = []
let activeWord = "";

function init() {
    // update globals
    updateSliderValues();
    sliderButton = document.getElementById("sliderButton")

    // set slider button to right position
    //resetSlider();

    // set event listeners
    window.addEventListener("resize", e => {
        updateSliderValues();
    });
    window.addEventListener("mousemove", handleSlider)
    window.addEventListener("mousedown", handleSlider)
    window.addEventListener("mouseup", handleSlider)

    // load words for scrolling
    getWordList()
}

function updateSliderValues() {
    let sliderBody = document.querySelector(".slider-line");
    sliderLength = sliderBody.clientHeight;
    sliderTopOffset = sliderBody.offsetTop;
}

function resetSlider() {
    let bHalf = 0.707106781 * sliderButton.clientHeight
    let y = sliderTopOffset - bHalf
    sliderButton.style.setProperty("--slider-offset", `${y}px`)
}

function moveSlidertoWord(word) {
    let pos = wordList.indexOf(word)
    let perc = pos / (wordList.length - 1)
    console.log(perc)

    /*let bHalf = 0.707106781 * sliderButton.clientHeight
    let y = e.clientY - bHalf 
    y = (y <= sliderTopOffset - bHalf) ? sliderTopOffset - bHalf : y
    let sliderBottom = sliderTopOffset + sliderLength
    y = (y >= sliderBottom - bHalf) ? sliderBottom - bHalf : y
    sliderButton.style.setProperty("--slider-offset", `${y}px`)*/
}

let sliderActive = false;

function handleSlider(e) {
    switch (e.type) {
        case "mousedown":
            switch (e.target) {
                case sliderButton:
                    hideDef()
                    sliderActive = true
                    break;
                case document.querySelector(".slider-container"):
                    console.log("clicked on slider container")
                    break;
            }
            break;
        case "mouseup":
            if (sliderActive) {
                window.location.href = `${window.location.origin}/word/${activeWord}`
                sliderActive = false
            }
            break;
        case "mousemove":
            if (sliderActive) {
                // check if user is left clicking button
                if (e.button === 0 && e.buttons === 1) {
                    // calculate new slider position, preventing OoB
                    // because the indicator is rotated 45deg, height/2 becomes cos(45) * height
                    let bHalf = 0.707106781 * sliderButton.clientHeight
                    let y = e.clientY - bHalf 
                    y = (y <= sliderTopOffset - bHalf) ? sliderTopOffset - bHalf : y
                    let sliderBottom = sliderTopOffset + sliderLength
                    y = (y >= sliderBottom - bHalf) ? sliderBottom - bHalf : y
                    sliderButton.style.setProperty("--slider-offset", `${y}px`)

                    // calculate 0-1 slider value based on length
                    let deltaStart = (y - sliderTopOffset + bHalf) / sliderLength
                    //let decimalPlaces = 5
                    //sliderValue = Math.floor(deltaStart * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)
                    sliderValue = deltaStart

                    // call update for scroll display
                    updateScrollWords()
                } else {
                    sliderActive = false;
                }
            }
            break;
    }
}

function hideDef() {
    document.getElementById('wordWrapper').classList.add('hidden')
    document.getElementById('defs').classList.add('hidden')
}
function showDef() {
    document.getElementById('wordWrapper').classList.remove('hidden')
    document.getElementById('defs').classList.remove('hidden')

    //remove words
    document.getElementById('wordScrollPrev2').innerText = ''
    document.getElementById('wordScrollPrev1').innerText = ''
    document.getElementById('wordScrollMain').innerText = ''
    document.getElementById('wordScrollNext1').innerText = ''
    document.getElementById('wordScrollNext2').innerText = ''
}

function updateScrollWords() {
    let arrayPos = Math.floor((wordList.length - 1) * sliderValue)
    arrayPos = (sliderValue < 0) ? 0 : arrayPos
    arrayPos = (sliderValue >= 1) ? wordList.length - 1 : arrayPos
    //console.log(`value ${sliderValue} gives arraypos ${arrayPos} where the word is ${wordList[arrayPos]}`)
    activeWord = wordList[arrayPos]

    document.getElementById('wordScrollPrev2').innerText = wordList[arrayPos - 2]
    document.getElementById('wordScrollPrev1').innerText = wordList[arrayPos - 1]
    document.getElementById('wordScrollMain').innerText = wordList[arrayPos]
    document.getElementById('wordScrollNext1').innerText = wordList[arrayPos + 1]
    document.getElementById('wordScrollNext2').innerText = wordList[arrayPos + 2]
}

function getWordList() {
    fetch('/wordlist.json', {
        method: "GET",
    })
    .then((response) => response.body)
    .then((rb) => {
        const reader = rb.getReader();

        return new ReadableStream({
            start(controller) {
                // The following function handles each data chunk
                function push() {
                    // "done" is a Boolean and value a "Uint8Array"
                    reader.read().then(({ done, value }) => {
                        // If there is no more data to read
                        if (done) {
                            //console.log('done', done)
                            controller.close()
                            return
                        }
                        // Get the data and send it to the browser via the controller
                        controller.enqueue(value)
                        // Check chunks by logging to the console
                        //console.log(done, value)
                        push()
                    })
                }

                push()
            },
        })
    })
    .then((stream) =>
        // Respond with our stream
        new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text()
    )
    .then((result) => {
        // Do things with result
        wordList = JSON.parse(result)
        moveSlidertoWord(document.getElementById('word').innerText)
    });
}
