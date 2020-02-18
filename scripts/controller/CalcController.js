class CalcController{
 
    constructor(){

        /* Attributes */

        /* Selecting the display features */
        this._displayCalcEl = document.querySelector("#display"); // El = Element
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate; // _ is the convention to "Private"
        this.initialize();

    }
    
    /* Main Method */
    initialize(){
        
        // DOM properties to input in HTML format (Not used because of the getters and setters)
        /**this._timeEl.innerHTML = "00:00"; 
         * this._dateEl.innerHTML = "00/00/0000"; 
         */
    
         


    }

    /* Getters and Setters */


    get displayTime(){
        return this._dateEl.innerHTML;
    }

    set displayTime(value){
        this._dateEl.innerHTML = value;
    }

    get displayDate(){
        return this._timeEl.innerHTML;
    }

    set displayDate(value){
        this._timeEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value; 
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(date){
        this._currentDate = date;
    }

}