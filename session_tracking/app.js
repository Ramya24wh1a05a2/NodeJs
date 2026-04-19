const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const app = express();
let users = [];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// Session
app.use(session({
    secret: "secret123",
    resave: false,
    saveUninitialized: true
}));

// HOME
app.get("/", (req, res) => {
    res.redirect("/register");
});

// REGISTER PAGE
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
});

// REGISTER
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.send("Fill all fields");

    const exists = users.find(u => u.username === username);
    if (exists) return res.send("User already exists");

    users.push({ username, password });

    // SESSION
    req.session.user = username;
    req.session.activities = [];
    req.session.loginTime = new Date().toLocaleString();

    req.session.activities.push("Registered");

    res.redirect("/dashboard");
});

// LOGIN PAGE
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

// LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u =>
        u.username === username && u.password === password
    );

    if (!user) return res.send("Invalid credentials");

    req.session.user = username;
    req.session.activities = [];
    req.session.loginTime = new Date().toLocaleString();

    req.session.activities.push("Logged in");

    res.redirect("/dashboard");
});

// DASHBOARD
app.get("/dashboard", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    req.session.activities.push("Visited Dashboard");

    let html = fs.readFileSync(
        path.join(__dirname, "views", "dashboard.html"),
        "utf-8"
    );

    html = html.replace(/{{username}}/g, req.session.user);
    html = html.replace(/{{activityCount}}/g, req.session.activities.length);
    html = html.replace(/{{loginTime}}/g, req.session.loginTime);

    res.send(html);
});

// ACTIVITY
app.get("/activity", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    let list = req.session.activities
        .map(a => `<li>${a}</li>`)
        .join("");

    let html = fs.readFileSync(
        path.join(__dirname, "views/activity.html"),
        "utf-8"
    );

    html = html.replace("{{activities}}", list);

    req.session.activities.push("Viewed Activity Page");

    res.send(html);
});

// COOKIE
app.get("/cookie-test", (req, res) => {
    const last = req.cookies.lastVisit;
    const now = new Date().toLocaleString();

    res.cookie("lastVisit", now);

    let html = fs.readFileSync(
        path.join(__dirname, "views/cookie.html"),
        "utf-8"
    );

    html = html.replace("{{lastVisit}}", last || "First Visit");
    html = html.replace("{{currentTime}}", now);

    req.session.activities.push("Visited Cookie Page");

    res.send(html);
});

// LOGOUT
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

// START SERVER
app.listen(3000, () => {
    console.log("http://localhost:3000");
});