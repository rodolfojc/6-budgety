
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
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
        
    };
    
    return {
        addItem: function(type, des, val){
            var newItem;
            
            // EXAMPLE
            // [1 2 3 4 5 6], NEXT ID = 6
            // [1 4 7 9 10], NEXT ID = 11
            // COLISION BECAUSE THE NEXT ISN'T 5 = 10
            
            // CREATE NEW ID
            if(data.allItems[type].length > 0){
               ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            } else {
               ID = 0;
            }
            
            
            // CREATE NEW ITEM BASED ON 'INC' OR 'EXP' 
            if(type === 'exp'){
                newItem = new Expense (ID, des, val);
            } else if (type === 'inc'){
                newItem = new Income (ID, des, val);
            }
            
            // PUSH 
            data.allItems[type].push(newItem);
            
            // RETURN OBJECT
            return newItem;
                        
        },
        
        testing: function (){
            console.log(data);
        }
        
    };
        
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
        
        var input, newItem;
                
        // 1.- GET THE DATA
        input = UIContr.getInput();
        
        // 2.- ADD THE ITEM TO THE BUDGET CONTROLLER
        newItem = budgetContr.addItem(input.type, input.description, input.value);

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