var express = require("express");

var router = express.Router(); //middleware

// Import the model (cat.js) to use its database functions.
var ramenModel = require("../models/ramenModel");
 //
router.get("/", function(req, res) {
    //ramen.selectAll takes only one argument, cb a call back function, so following function is feed to model to process res which is also result from orm.selectAll == query result
    ramenModel.selectAll(
        // data is query result [{name: tongkasu, made: false},{...},{...}]
        function (data) {
           
            //send to front end as a obj to index.
            var hbsObject = {
                ramens: data
              };
              res.render("index", hbsObject);

        }
    );
})

router.post("/api/ramens", function (req, res) {
    console.log(req.body);
    // req.body will be a obj sent from front end js which is ramens.js with a click listner {ramen: tonkaku, made: 0}
    // function(result) {} is sb in controller to process result from orm
    
    ramenModel.insertOne(["name", "made"], [req.body.ramen, req.body.made], function (result) {
    //because it is an insert action so not result is needed for the front end, we can consol out a ramen is being added
    // Send back the ID of the new quote
        res.json({id: result.insertId});
    })
});
//change made status in database
router.put("/api/ramens/:id", function (req, res) {
    console.log(req.body);
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    ramenModel.updateOne(
        {
            made: req.body.made
        },
        condition,
        function (result) {  //there is no actual column value coming back so send status to front must
            if (result.changeRow === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

//delete
router.delete("/api/ramens/:id", function(req, res) {
    var val = req.params.id;
  
    ramenModel.deleteOne(val, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });


module.exports = router;
