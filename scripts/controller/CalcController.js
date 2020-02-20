class CalcController {

    constructor() {

        /* Attributes */
        this._operation = []; //Array of operations
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

    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false); //The false is to make the click count once

        })

    }

    clearAll() {
        this._operation = []; //Restarting the array
    }

    clearEntry() {
        this._operation.pop(); //Cleaning the last array item
    }

    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) {

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1) // Is that value in there? 0 to 4 (-1 if theres not in there)

    }

    pushOperation(value) {
        this._operation.push(value);

        if (this._operation.length > 3) { //If to check the operation so I can group three values per time
            this.calc()
        }

    }

    calc(){

        let lastOperator = this._operation.pop(); //Removing the last one (the 4th)

        let result = eval(this._operation.join("")); //Making the calc of the elements
        this._operation = [result, lastOperator]; //Inputing the last operator and the result

    }

    /*setLastNumberToDisplay(){

    }*/

    addOperation(value) {

        if (isNaN(this.getLastOperation())) { // To verify if is not a number so I can group the numbers
            //It will be a string
            if (this.isOperator(value)) {
                // If is a operator: Change it
                this.setLastOperation(value);
            } else if (isNaN(value)) {
                //Other buttons (= .)
                console.log('Other thing', value);
            } else {
                // It's a number, but its likely the first in the array
                this.pushOperation(value);
            }
        } else {
            //If to deal with the operator in the case of the last item be a numbe (So it became a new index)
            if (this.isOperator(value)) {
                this.pushOperation(value);
            } else {
                //Number
                let newValue = this.getLastOperation().toString() + value.toString(); // Grouping the numbers
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();
            }
        }
    }

    setError() {
        this.displayCalc = "Error";
    }

    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':

                break;
            case 'ponto':
                this.addOperation('.');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));  // They do the same thing
                break;

            default:
                this.setError();
                break;
        }
    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // take all the tags g which are sons of buttons (Same with parts)

        buttons.forEach(btn => { //If I add more parameters I'll have to put it inside the ()

            this.addEventListenerAll(btn, 'click drag', e => { //AddEventListenerAll its a method of the class
                let textBtn = btn.className.baseVal.replace("btn-", ""); //Taking the className and the baseValue and "removing" the btn (I put nothing in its place)

                this.execBtn(textBtn);

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