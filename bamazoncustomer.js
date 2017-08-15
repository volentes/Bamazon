//Creates dependencies (npm packages)
var mysql = require("mysql");
var inquirer = require("inquirer");

//Creates the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  //Username
  user: "root",

  //Password
  password: "G1n&J00$3",
  database: "bamazon_db"
});

//Connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  
  //run the Display function and Purchase function after the connection is made to prompt the user
  DisplayItem();
  PurchaseItem();
});

//Function that prints out current items available
function DisplayItem() {

  // Always practice good, consistent formatting.
  // Others who read your code will thank you.
  // There are editor tools that can help you with hthis:
  //   see 'html/css/js-beautify'
  connection.query('SELECT * FROM products', function(err, res) {  //query all from the products table
    if (err) throw err;
    
    // A better way of creating your horizontal-rules 
    // would be to create them dynamically via a function.
    // See the `hr` function just below
    hr(80, '-')
    // I think this makes for a more readable experience
    for (var i = 0; i < res.length; i++){
      console.log(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity);
    }
    hr(80, "-");
    
  });
}

function hr(len, char) {
  let rule = "";

  for (var i = 0; i < len; i++) {
    rule += char;
  }

  console.log(rule);
}

// Series of prompts (Total of 2 prompts)

function PurchaseItem() {
  inquirer
    .prompt([
      // First Prompt - Asks the user what the id is of the product that they would like to buy
      {
        name: "itemID",
        type: "input",
        message: "What is the id of the item you would like to purchase? ",
        // Validates that the user entered a value
        // Great job including validation 👍
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      // Second prompt - Asks how many units the user would like to buy
      {
        name: "quantity",
        type: "input",
        message: "How many units of the item would you like to purchase?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      //Stores the user's itemID input in a variable
      var itemID = answer.itemID;

      //Stores the user's quantity input in a variable
      var quantity = answer.quantity;

      //Connects to bamazon_db and queries the product table for item_id that matches the user's itemid input
      // Nice job choosing to use the mysql package's escape syntax i.e. '?'
			connection.query('SELECT * FROM products WHERE item_id=?', [itemID], function(err, results){
        //Checks for errors
        if (err) throw err;
        
        //Stores stock_quantity in a varible
        var stock_quantity = results[0].stock_quantity;
        
        //If user input for requested quantity is greater than what is in stock - displays message
				if (stock_quantity < quantity) {
					console.log("Sorry! There is not enough of this item in stock to fullfill that request!");

        //The requested quantity is less than the stock_quantity and the order can be fullfilled
				} else{
          // Calculates updated stock quantity by subtracting requested quantity from stock quantity
					var newQuantity = stock_quantity - quantity;
            console.log("Remaining quantity in stock is : " + newQuantity);

          //Calculates the total price by multiplying quantity requested by price of item stored in products table and stores in a variable
          var totalPrice = quantity * results[0].price;

          //Displays total for selected item to the user
          console.log("Your total for this product is :" + "$" + (quantity * results[0].price).toFixed(2));

          //Calculates and displays the order total
          console.log("Your order total is : " + "$" + totalPrice.toFixed(2));
        };
        
        //Query database once more to update table to reflect change in stock quanity due to user purchase
        connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newQuantity},{ item_id: itemID }],function(err,res){
            if(err) throw err;
        });

  })})};
