class CalcController {

    constructor() {

        /* Attributes */
        this._operation = []; //Array of operations
        this._audio = new Audio('click.mp3'); /* Audio features */
        this._audioOnOff = false;             /*                */
        this._locale = 'pt-BR';
        this._lastOperator = '';
        this._lastNumber = '';
        /* Selecting the display features */
        this._displayCalcEl = document.querySelector("#display"); // El = Element
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        /* End of display features */
        this._currentDate; // _ is the convention to "Private"
        /* Calling methods */
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();

    }

    /* "Main" Method */
    initialize() {

        this.setDisplayDateTime(); // This is here 'cause of the 1s delay in the date/time display
        console.log("Press AC twice to activate the audio");

        //Execute this... 
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000); // ...during this. (1000ms = 1s)

        this.setLastNumberToDisplay();
        this.pasteFromClipBoard();

        document.querySelectorAll('.btn-ac').forEach(btn=>{
            btn.addEventListener('dblclick', e=>{
                this.toggleAudio();
            });
        });
    }

    toggleAudio(){
        this._audioOnOff = !this._audioOnOff;
    }

    playAudio(){
        if(this._audioOnOff){
            this._audio.currentTime = 0; //It will make the audio "reset" every time, so I can press whenever I want
            this._audio.play();          // without buging the audio
        }
    }

    initKeyboard() {

        document.addEventListener('keyup', e => {

            this.playAudio();

            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                    break;
                case 'Enter':
                case '=':
                    this.calc();
                    break;
                case '.':
                case ',':
                    this.addDot('.');
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
                    this.addOperation(parseInt(e.key));
                    break;
                case 'c':
                    if(e.ctrlKey) this.copyToClipBoard();
                    break;

            }
        });

    }

    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false); //The false is to make the click count once

        })

    }

    pasteFromClipBoard(){

        document.addEventListener('paste', e => { //The paste listener which will wait for the paste action

            let text =  e.clipboardData.getData('Text'); //It's not a image/binary,etc... It's a text. The clipboardData and getData are native.
           
            this.displayCalc = parseFloat(text); //Parsing and making it appears

        });

    }

    copyToClipBoard(){

        let input = document.createElement('input'); // Creating element in the screen

        input.value = this.displayCalc; // To make the input recieve the displayCalc

        document.body.appendChild(input); // Making the input part of the document body (child)

        input.select(); //Selecting the input

        document.execCommand("Copy"); //Executing the Windows command

        input.remove(); //Removing it (Because this calculator uses SVG)
    }

    clearAll() {
        this._operation = []; //Restarting the array
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operation.pop(); //Cleaning the last array item
        this.setLastNumberToDisplay();
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

    getResult() {
        return eval(this._operation.join(""));
    }

    calc() {

        let last = '';
        this._lastOperator = this.getLastItem(); //True is default

        if (this._operation.length < 3) {

            let firstNumber = this._operation[0];
            this._operation = [firstNumber, this._lastOperator, this._lastNumber];

        }

        if (this._operation.length > 3) {

            last = this._operation.pop(); //Removing the last one (the 4th)
            this._lastNumber = this.getResult(); //Making the calc so I can storage the result

        } else
            if (this._operation.length == 3) {

                this._lastNumber = this.getLastItem(false);

            }

        let result = this.getResult(); //Making the calc of the elements

        if (last == '%') {
            result /= 100;
            this._operation = [result];
        } else {
            this._operation = [result]; //Inputing the the result

            if (last) {
                this._operation.push(last);
            }

        }

        this.setLastNumberToDisplay(result);

    }

    getLastItem(isOperator = true) {

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) { //Going through the array to take items

            if (this.isOperator(this._operation[i]) == isOperator) { //If it's a operator it will return operator (true) 
                lastItem = this._operation[i];                       //on the contrary it will return the last number
                break;
            }

        }

        if (!lastItem) { //If we didn't find a lastItem
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber; //Is there any operator?
        }
        return lastItem;

    }

    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) {
            lastNumber = 0;
        }

        this.displayCalc = lastNumber;

    }

    addOperation(value) {

        if (isNaN(this.getLastOperation())) { // To verify if is not a number so I can group the numbers
            //It will be a string
            if (this.isOperator(value)) {
                // If is a operator: Change it
                this.setLastOperation(value);
            } else {
                // It's a number, but its likely the first in the array
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        } else {
            //If to deal with the operator in the case of the last item be a numbe (So it became a new index)
            if (this.isOperator(value)) {
                this.pushOperation(value);
            } else {
                //Number
                let newValue = this.getLastOperation().toString() + value.toString(); // Grouping the numbers
                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();
            }
        }
    }

    setError() {
        this.displayCalc = "Error";
    }

    addDot() {

        let lastOperation = this.getLastOperation();

        if (typeof lastOperation == 'string' && lastOperation.split('').indexOf('.' > -1)) { //Is it a string? / Is there any dot?
            return;
        }

        if (this.isOperator(lastOperation) || !lastOperation) { //If its undefined or a operation add "0.something"
            this.pushOperation('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + '.'); //Ading the . after the last number
        }

        this.setLastNumberToDisplay();

    }

    execBtn(value) {

        this.playAudio();

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
                this.calc();
                break;
            case 'ponto':
                this.addDot('.');
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

        if(value.toString().length > 10){
            this.setError();
            return;
        }

        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(date) {
        this._currentDate = date;
    }
}