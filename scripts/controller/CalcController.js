class CalcController{
 
    constructor(){

        /* Attributes */
        this._displayCalc = "0"; //_ Underline is the private convention
        this._currentDate;
        this.initialize();

    }
    
    /* Main Method */
    initialize(){
        
        /* Selecting the display features */
        let displayCalcEl = document.querySelector("#display"); // El = Element
        let dateEl = document.querySelector("#data");
        let timeEl = document.querySelector("#hora");

        // DOM properties to input in HTML format
        displayCalcEl.innerHTML = "Display"; 
        dateEl.innerHTML = "18/02/2020"; 
        timeEl.innerHTML = "10:30"; 
    
    }

    /* Getters and Setters */

    get displayCalc(){
        return this._displayCalc;
    }

    set dislpayCalc(valor){
        this._dislpayCalc = valor; 
    }

    get dataAtual(){
        return this._currentDate;
    }

    set dataAtual(data){
        this._currentDate = data;
    }

}