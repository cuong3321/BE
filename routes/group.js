const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createGroup,
    getGroup,
    getGroups,
    updateGroup,
    deleteGroup,
    getAllGroups,
} = require("../controllers/group");
const { groupCreateValidator } = require("../validators/group");


//ROUTES
router
    .route("/")
    .get(protect, getGroups)
    .post(protect, createGroup);

router
    .route("/:id")
    .get(protect, getGroup)
    .put(protect, groupCreateValidator, updateGroup)
    .delete(protect, deleteGroup);

module.exports = router;
