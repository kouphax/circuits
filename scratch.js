const fs = require("fs")


const exclusions = [
    "jumping-jacks", 
    "body-weight-squat", 
    "crunch",
    "mountain-climber",
    "simulated-pull-up",
    "high-knee",
    "in-and-out-push-up",
    "plank",
    "run-in-place",
    "alternating-lunge",
    "starfish-crunch",
    "towel-snatch",
    "push-up",
    "burpee",
    "bicycle",
    "jump",
    "prayer",
    "side-plank",
    "vertical-leap"].map(f => `${f}.json`)

fs.readdirSync("./src/data/exercises", { withFileTypes: "*.json" }).forEach(f => {
    if(exclusions.indexOf(f.name) === -1) {
        fs.unlinkSync(`./src/data/exercises/${f.name}`)
    }
})