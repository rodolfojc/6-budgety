

var budgetController = (function(){
    
    var x = 23;
    
    var add = function(a) {
        return x + a;
    }
    
    return {
        publicTest : function(b){
            console.log(add(b))
        }
    }
    
})();

var UIController = (function(){
    
    // MODULE
    
})();

var controller = (function(budgetContr, UIContr){
    
    // MODULE
    var z = budgetContr.publicTest(5);
    
    return {
        anotherPublic : function(){
        console.log(z);
        }
    }
    
})(budgetController, UIController);