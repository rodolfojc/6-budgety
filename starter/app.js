
// BUDGET CONTROLLER

var budgetController = (function(){
    
        
})();

// USER INTERFACE CONTROLLER
var UIController = (function(){
    
    // MODULE
    
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetContr, UIContr){
    
// MODULE

var controlAddItem = function(){
    
    console.log('Enter was pressed!!');
    
    // 1.- GET THE DATA
    
    // 2.- ADD THE ITEM TO THE BUDGET CONTROLLER
    
    // 3.- ADD THE ITEM TO THE USER INTERFACE
    
    // 4.- CALCULATE THE BUDGET
    
    // 5.- DISPLAY THE BUDGET
    
}    

document.querySelector('.add__btn').addEventListener('click', controlAddItem);

// GLOBAL DOCUMENT
    
document.addEventListener('keypress', function(event){
    
    if(event.keyCode === 13 || event.which === 13) {
        controlAddItem();
        
    }
    
    
});
    
    
})(budgetController, UIController);