class Turtle {
    constructor(x, y) {
        if (x == 0 || y == 0) {
            throw "Grid starts at one, not zero";
        }

        // trueX and trueY start at 1
        // Where x and y start at 0
        this.trueX = x;
        this.trueY = y;

        // angle % 4    1           2           3          0       1
        // angle (1 => up, 2 => right, 3 => down, 4 => left, 5 => up)
        this.angle = 1;

        // The character to draw
        this.fillChar = "█";

        this.grid = this.constructGrid(10, 10);
        this.points = [];
    }

    get x() {
        return this.trueX - 1;
    }

    get y() {
        return this.trueY - 1;
    }

    get turtlePosition() {
        return { x: this.x, y: this.y, angle: this.angle };
    }

    get stats() {
        console.log(this.grid);
        return this.turtlePosition;
    }

    constructGrid(width, height) {
        let grid = [];
        for (let height_i = 0; height_i < height; height_i++) {
            grid.push(" ".repeat(width).split(""));
        }
        return grid;
    }

    draw(xSub, ySub, last) {
        this.grid[this.y][this.x] = this.fillChar;
        this.points.push([this.x, this.y]);

        this.addMore(xSub, ySub, last);

        if (!last) {
            this.trueX -= xSub;
            this.trueY -= ySub;
        }
    }

    addMore(xSub, ySub, last) {
        let nextX = this.x - xSub;
        let nextY = this.y - ySub;

        if (!last) {
            if (nextX === -1) {
                throw "Can't go further left!";
            } else if (nextX > this.grid[0].length - 1) {
                // Need more columns to the right
                for (let row of this.grid) {
                    row.push(" ");
                }
            }
            if (nextY === -1) {
                throw "Can't go further up!";
            } else if (nextY > this.grid.length - 1) {
                // Need more row down below
                this.grid.push(" ".repeat(this.grid[0].length).split(""));
            }
        }
    }

    forward(distance) {
        for (let i = 0; i < distance; i++) {
            let isLast = i === distance - 1;
            try {
                switch (this.angle % 4) {
                    case 1: // Up
                        this.draw(0, 1, isLast);
                        break;
                    case 2: // Right
                        this.draw(-1, 0, isLast);
                        break;
                    case 3: // Down
                        this.draw(0, -1, isLast);
                        break;
                    case 0: // Left
                        this.draw(1, 0, isLast);
                        break;
                    default:
                        console.log("An error occurred with the angle.");
                        break;
                }
            } catch (err) {
                console.log(err);
                return this;
            }
        }

        return this;
    }

    right() {
        this.angle += 1;
        return this;
    }

    left() {
        this.angle += 3;
        return this;
    }

    print() {
        for (let row of this.grid) {
            console.log(row.join(""));
        }
    }

    toString() {
        return this.grid.reduce((acc, val) => {
            return acc + val.join("") + "\n";
        }, "");
    }
}

module.exports = Turtle;

// const turtle = new Turtle(1, 1);
// turtle.angle = 3;
// turtle
//     .forward(5)
//     .left()
//     .forward(5)
//     .left()
//     .forward(5)
//     .left()
//     .forward(5)
//     .print();
