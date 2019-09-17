
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
    
    var calculateTotal = function(type){
        
        var sum = 0;
        
        data.allItems[type].forEach(function(current){
            sum += current.value;
        });
        
        data.totals[type] = sum;
        
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
        },
        
        budget: 0,
        porcentage: -1
    };
    
    return {
        addItem: function(type, des, val){
            var newItem;
            
            // EXAMPLE
            // [1 2 3 4 5 6], NEXT ID = 6
            // [1 4 7 9 10], NEXT ID = 11
            // COLISSION BECAUSE THE NEXT ISN'T 5 = 10
            
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
        
        calculateBudget: function(){
            
            // 1.- CALCULATE TOTAL INCOME AND EXPENSES
            calculateTotal('inc');
            calculateTotal('exp');
            
            // 2.- CALCULATE THE BUDGET INCOME - EXPENSES
            data.budget = data.totals.inc - data.totals.exp;
            
            // 3.- CALCULATE THE PORCENTAGE OF INCOME / EXPENSES
            if(data.totals.inc > 0) {
                data.porcentage = Math.round((data.totals.exp / data.totals.inc)*100);
            } else {
                data.porcentage = -1;
            }           
            
        },
        
        getBudget: function(){
            return{
              budget: data.budget,
              totalInc: data.totals.inc,
              totalExp: data.totals.exp,
              porcentage: data.porcentage
                
            };
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
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };
    
    return {
      getInput : function(){
          return {
              type: document.querySelector(DOMStrings.inputType).value, // INC OR EXP
              description: document.querySelector(DOMStrings.inputDescription).value,
              value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
          };          
      },
        
      addListItem: function(obj, type){
          
          var html, newHtml, element;
          // 1.- CREATE HTML STRING WITH PLACEHOLDER TEXT
          
          if (type === 'inc'){
              element = DOMStrings.incomeContainer;
              html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
          } else if (type === 'exp') {
             element = DOMStrings.expensesContainer;
             html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';        
          }
          
          // 2.- REPLACE THE PLACEHOLDER TEXT WITH SOME ACTUAL DATA
          newHtml = html.replace('%id%', obj.id);
          newHtml = newHtml.replace('%description%', obj.description);
          newHtml = newHtml.replace('%value%', obj.value);
          
          //console.log(newHtml);
          //console.log(element);
          
          // 3.- INSERT THE HTML INTO THE DOM
          document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
          
      },
        
      clearFields: function(){
          var fields, fieldsArray;
          
          // RETURN A LIST
          fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
          
          fieldsArray = Array.prototype.slice.call(fields);
          
          fieldsArray.forEach(function(current, index, array){
              current.value = "";
          });
          
          fieldsArray[0].focus();
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
    
    var updateBudget = function(){
        
        // 1.- CALCULATE THE BUDGET
        budgetContr.calculateBudget();
        
        // 2.- RETURN THE BUDGET
        var budget = budgetContr.getBudget();
        
        // 3.- DISPLAY THE BUDGET ON THE UI
        console.log(budget);
        
    }
    
    var controlAddItem = function(){
        
        var input, newItem;
                
        // 1.- GET THE DATA
        input = UIContr.getInput();
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0 ) {
                    
            // 2.- ADD THE ITEM TO THE BUDGET CONTROLLER
            newItem = budgetContr.addItem(input.type, input.description, input.value);

            // 3.- ADD THE ITEM TO THE USER INTERFACE
            UIContr.addListItem(newItem, input.type);

            // 4.- CLEAR FIELDS
            UIContr.clearFields();

            // 5.- CALCULATE AND UPDATE THE BUDGET
            updateBudget();
        
        }
    
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