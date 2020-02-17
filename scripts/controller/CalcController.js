class CalcController{
 
    constructor(){

        /* Declarando os atributos */
        this._displayCalc = "0"; //_ é o private, uma convensão
        this._dataAtual;

    }
    
    /* Getters e Setters */

    get displayCalc(){
        return this._displayCalc;
    }

    set dislpayCalc(valor){
        this._dislpayCalc = valor; 
    }

    get dataAtual(){
        return this._dataAtual;
    }

    set dataAtual(data){
        this._dataAtual = data;
    }

}