const logSymbols = require("log-symbols")
const chalk = require("chalk")
const figlet = require("figlet")

module.exports = {
    showGraph: (message) => { 
        console.log(figlet.textSync(message));
    },
    succeed: (message) => {
        console.log(logSymbols.success, chalk.green(message))
    },
    info: (message) => {
        console.log(logSymbols.info, chalk.blue(message))
    },
    warn: (message) => {
        console.log(logSymbols.warning, chalk.yellow(message))
    },
    error: (message) => {
        console.log(logSymbols.error, chalk.red(message))
    }
}