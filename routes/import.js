const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    importCSV
} = require("../controllers/import");


//ROUTES
router
    .route("/")
    .post(protect, importCSV);


module.exports = router;