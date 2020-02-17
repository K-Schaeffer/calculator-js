class CalcController{
 
    constructor(){

        /* Attributes */
        this._displayCalc = "0"; //_ Underline is the private convention
        this._currentDate;
        this.initialize;

    }
    
    /* Main Method */
    initialize(){
        
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