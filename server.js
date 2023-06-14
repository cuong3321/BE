const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());
/* Routes import */
const userRoutes = require("./routes/user");
const groupRoutes = require("./routes/group");
const contactRoutes = require("./routes/contact");
const importRoutes = require("./routes/import");
const userContactRoutes = require("./routes/userContact");
/* Routes */
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/imports", importRoutes);
app.use("/api/userContacts", userContactRoutes);

const rootPath = path.resolve();

/* File folder */
app.use("/uploads", express.static(path.join(rootPath, "/uploads")));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(rootPath, "/frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(rootPath, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}

/* Error Handlers */
app.use(notFound);
app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
const PORT = 8081;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
