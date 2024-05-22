#! /usr/bin/env node
// Adventure Game
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
// Create a Player Class
class Player {
    name;
    fuel = 200;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 50;
    }
    fuelIncrease() {
        this.fuel = 200;
    }
}
// Create an Opponent Class
class Opponent {
    name;
    fuel = 200;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 50;
    }
    fuelIncrease() {
        this.fuel = 200;
    }
}
let player = await inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: chalk.bold.italic.redBright("Please Enter Your Good Name: "),
    },
]);
let opponent = await inquirer.prompt([
    {
        name: "select",
        type: "list",
        message: chalk.bold.italic.greenBright("Select Your Opponent"),
        choices: ["Skeleton", "Alien", "Zombie"],
    },
]);
let p1 = new Player(player.name);
let o1 = new Opponent(opponent.select);
do {
    let ask = await inquirer.prompt([
        {
            name: "opt",
            type: "list",
            message: chalkAnimation.rainbow("What would you like to do?").render(),
            choices: ["Attack", "Drink Potion", "Run For Your Life.."],
        },
    ]);
    if (ask.opt === "Attack") {
        let num = Math.floor(Math.random() * 2);
        if (num > 0) {
            p1.fuelDecrease();
            console.log(chalk.bold.green(`${p1.name}'s Fuel is ${p1.fuel}`));
            console.log(chalk.bold.red(`${o1.name}'s Fuel is ${o1.fuel}`));
            if (p1.fuel <= 0) {
                console.log(chalk.bold.italic.redBright("You Lose, Better luck Next Time"));
                process.exit();
            }
        }
        else {
            o1.fuelDecrease();
            console.log(chalk.bold.green(`${p1.name}'s Fuel is ${p1.fuel}`));
            console.log(chalk.bold.red(`${o1.name}'s Fuel is ${o1.fuel}`));
            if (o1.fuel <= 0) {
                console.log(chalk.bold.italic.greenBright("You Win.."));
                process.exit();
            }
        }
    }
    else if (ask.opt === "Drink Potion") {
        p1.fuelIncrease();
        console.log(chalk.bold.cyan(`You Drink Health Potion. Your Fuel is ${p1.fuel}`));
    }
    else if (ask.opt === "Run For Your Life..") {
        console.log(chalk.bold.red("You Lose, Better luck Next Time"));
        process.exit();
    }
} while (true);
