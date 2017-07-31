//Creates dependencies (npm packages)
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

//Connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
//run the start function after the connection is made to prompt the user
  DisplayItem();
  // SelectItem();
});

//function that prints a table of current items available
function DisplayItem() {
    connection.query('SELECT * FROM products', function(err, res) {  //query all from the products table
            if (err) throw err;
        for (var i = 0; i < res.length; i++){
        console.log('_______________________________________________________________________________________________________');
        console.log(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity);
        console.log('_______________________________________________________________________________________________________');
    }
  });
}
