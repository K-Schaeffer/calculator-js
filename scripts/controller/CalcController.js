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

    }

    /* "Main" Method */
    initialize() {

        this.setDisplayDateTime(); // This is here 'cause of the 1s delay in the date/time display

        //Execute this... 
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000); // ...during this. (1000ms = 1s)

    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
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