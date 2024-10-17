const inquirer = require("inquirer")
const { options } = require("../config/config")


module.exports = ()=> {
    const libraryChoices = options.map(item => item.name)
    return inquirer.prompt(
        [
            {
                type: "list",
                message: "Please select template",
                name: "template",
                default: libraryChoices[0],
                choices: libraryChoices,
                filter: (template) => {
                    const option = options.filter(item => item.name === template)
                    return option[0].branch
                }
            }
        ]
    )
}