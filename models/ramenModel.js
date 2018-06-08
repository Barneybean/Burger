var orm = require("../config/orm");
//this is a middle man deciding which service (table) to use, and what to do with the result form orm query 

var ramen = {
    selectAll: function (cb) {
        //orm.all takes two arguments first is table name  then a cb function
        //res === result from orm all
        // "ramens" is hard coded because we are not using multiple table, in this case "ramen can be moved to orm query string"
        orm.selectAll("ramens", function(res){ cb(res); } );
    },
    insertOne: function(cols, vals, cb) {
        orm.insertOne('ramens', cols, vals, function(res) {
            cb(res);
        });
    },
    updateOne: function(objColVals, condition, cb) {
        orm.updateOne("ramens", objColVals, condition, function(res) {
            cb(res);
          });
    },
    deleteOne: function(val,cb) {
        orm.deleteOne("ramens", val, function (result) {
            cb(result);
        });
    }
};
module.exports = ramen;