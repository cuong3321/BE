const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    shareContact,
    getContact
} = require("../controllers/share");


//ROUTES
router
    .route("/")
    .post(protect, shareContact);

module.exports = router;


router
    .route("/:id")
    .get(protect, getContact)
