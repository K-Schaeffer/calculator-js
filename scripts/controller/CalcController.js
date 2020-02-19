class CalcController {

    constructor() {

        /* Attributes */
        this._locale = 'pt-BR';
        /* Selecting the display features */
        this._displayCalcEl = document.querySelector("#display"); // El = Element
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        /* End of display features */
        this._currentDate; // _ is the convention to "Private"
        this.initialize();
        this.initButtonsEvents();

    }

    /* "Main" Method */
    initialize() {

        this.setDisplayDateTime(); // This is here 'cause of the 1s delay in the date/time display

        //Execute this... 
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000); // ...during this. (1000ms = 1s)

    }

    addEventListenerAll(element, events, fn){
        
        events.split(' ').forEach(event =>{

            element.addEventListener(event, fn, false); //The false is to make the click count once

        })

    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // take all the tags g which are sons of buttons (Same with parts)

        buttons.forEach(btn => { //If I add more parameters I'll have to put it inside the ()

            this.addEventListenerAll(btn, 'click drag mouseover', e => { //AddEventListenerAll its a method of the class
                console.log(btn.className.baseVal.replace("btn-","")); //Taking the className and the baseValue and "removing" the btn (I put nothing in its place)
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer"; //Adding the cursor style functionality
            });

        })

    }


    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    /* Getters and Setters */
    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(date) {
        this._currentDate = date;
    }
}