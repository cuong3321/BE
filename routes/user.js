const express = require("express");
const {
    registerUser,
    getUsers,
    login,
    getUser,
    deleteUser,
    updateUser,
    updateProfile,
    signupUser
} = require("../controllers/user");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

// VALIDATORS
const { runValidation } = require("../validators");
const {
    userRegisterValidator,
    userSigninValidator,
} = require("../validators/user");

// ROUTES
router
    .route("/")
    .post(protect, userRegisterValidator, runValidation, registerUser)
    .get(protect , getUsers);

router
    .route("/:id")
    .get(protect, getUser)
    .put(protect,  updateUser)
    .delete(protect, deleteUser);

router.post("/login", userSigninValidator, runValidation, login);
router.post("/signup", userRegisterValidator, runValidation, signupUser);

router.route("/profile/:id").put(protect, updateProfile);

module.exports = router;
