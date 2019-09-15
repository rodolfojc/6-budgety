
// BUDGET CONTROLLER

var budgetController = (function(){
    
    // FUNCTION CONSTRUCTOR - EXPENSE
    var Expense = function (id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    // FUNCTION CONSTRUCTOR - INCOME
    var Income = function (id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    // DATA STRUCTURE
    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0
        }
        
    }
        
})();

// USER INTERFACE CONTROLLER
var UIController = (function(){
    
// MODULE
    
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    };
    
    return {
      getInput : function(){
          return {
              type: document.querySelector(DOMStrings.inputType).value, // INC OR EXP
              description: document.querySelector(DOMStrings.inputDescription).value,
              value : document.querySelector(DOMStrings.inputValue).value
          };          
      },
        
      getDOMString : function(){
          return DOMStrings;
      }
    };
    
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetContr, UIContr){
    
// MODULE
    
    var setupEventListener = function(){
        
        var DOM = UIContr.getDOMString();
        
        document.querySelector(DOM.inputButton).addEventListener('click', controlAddItem);

        // GLOBAL DOCUMENT

        document.addEventListener('keypress', function(event){

            if(event.keyCode === 13 || event.which === 13) {
                controlAddItem();

            }
        
        });
        
    };
    
    
    
    var controlAddItem = function(){

        // 1.- GET THE DATA
        var input = UIContr.getInput();
        console.log(input);

        // 2.- ADD THE ITEM TO THE BUDGET CONTROLLER

        // 3.- ADD THE ITEM TO THE USER INTERFACE

        // 4.- CALCULATE THE BUDGET

        // 5.- DISPLAY THE BUDGET
    
    }    

    // PUBLIC INICIATIZATION FUNCTION
    
    return {
        init : function (){
            console.log('APP has started!!')
            setupEventListener();
        }
    };
    
    
})(budgetController, UIController);

controller.init();