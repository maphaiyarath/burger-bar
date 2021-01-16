// import mysql connection
var connection = require("../config/connection.js");

// helper function for sql syntax
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// helper function to convert object key/value pairs to sql syntax
function objToSQL(obj) {
    var arr = [];

    // loop through the keys and push the key/value as an arr of strings
    for (var key in obj) {
        var val = ob[key];

        // check to skip hidden properties
        if (Object.hasOwnProperty.call(obj, key)) {
            // if it's a string with spaces, add quotes
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                val = "'" + val + "'";
            }
            arr.push(key + "=" + val);
        }
    }
    return arr.toString();
}

// object for all of our sql statement functions
var orm = {
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";

        connection.query(queryString, function(err, res) {
            if (err) throw err;
            cb(res);
        });
    },
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        console.log(queryString);

        connection.query(queryString, vals, function(err, res) {
            if (err) throw err;
            cb(res);
        });
    },
    // objColVals example -> {burger_name: Whataburger, devoured: true}
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSQL(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        console.log(queryString);

        connection.query(queryString, function(err, res) {
            if (err) throw err;
            cb(res);
        });
    },
    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, res) {
            if (err) throw err;
            cb(res);
        });
    }
}

// export the orm object for the model
module.exports = orm;