const Turtle = require("./index");
const fs = require("fs");

const args = process.argv.slice(2);

function draw(turtleInstance, steps) {
    for (let step of steps) {
        if (step.length > 1) {
            let args = step
                .split("")
                .slice(1)
                .join("");

            turtleInstance.forward(args);
        } else {
            if (step === "r") {
                turtleInstance.right();
            } else if (step === "l") {
                turtleInstance.left();
            }
        }
    }

    if (turtleInstance.writeFile) {
        try {
            console.log(`Writing to file '${args[0].split("=")[1]}'...`);
            fs.writeFileSync(args[0].split("=")[1], turtleInstance.toString());
        } catch (err) {
            console.log("An error occurred while writing to the file");
        }
    } else {
        turtleInstance.print()
    }

}

function getInstructions() {
    let instructions = args[0];
    let writeFile = false

    if (args[0].includes("--output=")) {
        writeFile = true
        instructions = args[1];
    }
    

    let steps = [];
    let turtle;

    if (instructions.split(",").length != 1) {
        let origin = instructions.split("-")[0];
        turtle = new Turtle(...origin.split(","));
        steps = instructions.split("-").slice(1);
    } else {
        turtle = new Turtle(1, 1);
        steps = instructions.split("-");
    }

    turtle.steps = steps;
    turtle.writeFile = writeFile


    return turtle;
}

turtle = getInstructions();

draw(turtle, turtle.steps);
// turtle.print();
