const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");

// Helper functions
const dbInterface = require("./helpers/dbInterface");
const generateTeams = require("./helpers/generateTeam");

const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "jade");
app.use(express.urlencoded({ extended: true }));
app.use(
    methodOverride((req, res) => {
        if (req.body && req.body._method) {
            const method = req.body._method;
            return method;
        }
    })
);

const PORT = 3333;
const ADDRESS = "localhost";

app.get("/cohorts", (req, res) => {
    dbInterface.fetch("*").then(data => {
        res.render("cohorts/home", {
            cohorts: data
        });
    });
});

app.get("/cohorts/new", (req, res) => {
    res.render("cohorts/new");
});

app.get("/cohort/:id", (req, res) => {
    dbInterface.fetch(req.params.id).then(data => {
        res.render("cohorts/show", {
            cohort: data
        });
    });
});

app.post("/cohort/:id", (req, res) => {
    dbInterface.fetch(req.params.id).then(data => {
        res.render("cohorts/show", {
            cohort: data,
            params: req.body,
            teams: generateTeams(
                data.members,
                req.body.method,
                parseInt(req.body.quantity)
            )
        });
    });
});

app.post("/cohorts/new", (req, res) => {
    console.log(req.body);
    dbInterface.save(req.body).then(data => {
        res.redirect(`/cohort/${data.id}`);
    });
});

app.get("/cohort/:id/edit", (req, res) => {
    dbInterface.fetch(req.params.id).then(data => {
        res.render("cohorts/edit", {
            cohort: data
        });
    });
});

app.patch("/cohort/:id", (req, res) => {
    dbInterface
        .update(
            {
                name: req.body.name,
                members: req.body.members,
                logo_url: req.body.logo_url
            },
            req.params.id
        )
        .then(() => {
            res.redirect(`/cohort/${req.params.id}`);
        });
});

app.delete("/cohort/:id", (req, res) => {
    dbInterface.delete(req.params.id).then(() => {
        res.redirect("/cohorts");
    });
});

app.listen(PORT, ADDRESS, () => {
    console.log(`Listening on port ${PORT} and ${ADDRESS}`);
});
