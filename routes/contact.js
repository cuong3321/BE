const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createContact,
    getContact,
    getContacts,
    updateContact,
    deleteContact,
    getAllContacts,
} = require("../controllers/contact");

// VALIDATORS
const { contactCreateValidator } = require("../validators/contact");
const { runValidation } = require("../validators");

//ROUTES
router
    .route("/")
    .get(protect, getContacts)
    .post(protect, contactCreateValidator, runValidation, createContact);

router
    .route("/:id")
    .get(protect, getContact)
    .put(protect,contactCreateValidator, updateContact)
    .delete(protect, deleteContact);


    router
    .route("/share")
    .get(getContact)
    .put(protect,contactCreateValidator, updateContact)
    .delete(protect, deleteContact);

module.exports = router;