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
  password: "",
  database: "bamazon_db"
});

//Connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
//run the start function after the connection is made to prompt the user
  DisplayItem();
  PurchaseItem();
});

//function that prints out current items available
function DisplayItem() {
    connection.query('SELECT * FROM products', function(err, res) {  //query all from the products table
            if (err) throw err;
        for (var i = 0; i < res.length; i++){
        console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ');
        console.log(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity);
        console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ');
    }
  });
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
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      // Second prompt - Asking how many units the user would like to buy
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
			connection.query('SELECT * FROM products WHERE item_id=?', [itemID], function(err, results){
        //Checks for errors
        if (err) throw err;
        //Stores stock_quantity in a varible
				var stock_quantity = results[0].stock_quantity;
        //If user input for requested quantity is greater than what is in stock - displays message
				if (stock_quantity < quantity) {
					console.log("Sorry! There is not enough of this item in stock, to fullfill that request!");

        //The requested quantity is less than the stock_quantity and the order can be fullfilled
				} else{
          //Subtract the requested quantity from the quantity in stock
					stock_quantity -= quantity;

          //Calculates the total price by multiplying quantity requested by price of item stored in products table and stores in a variable
          var totalPrice = quantity * results[0].price;

          //Displays total for selected item to the user
          console.log("Your total for this product is :" + "$" + (quantity * results[0].price).toFixed(2));

          //Calculates and displays the order total
          orderTotal += (parseFloat(totalPrice));
          console.log("Your order total is : " + "$" + orderTotal.toFixed(2));
        };
    /* will need to write code that queries the database and replaces the stock_quantity value with new value using the
    UPDATE method */
  };
