const inquirer = require("inquirer")
const { cloneRepoAndGetOptions } = require("../config/config")


function init() {
    return new Promise((resolve, reject) => {
        cloneRepoAndGetOptions()
            .then(({ options,localRepoPath }) => {
            const libraryChoices = options.map(item => item.name)
           inquirer.prompt(
                [
                    {
                        type: "list",
                        message: "Please select template",
                        name: "template",
                        default: libraryChoices[0],
                        choices: libraryChoices,
                    }
                ]
                ).then(answer => {
                    var template=answer.template
                    resolve({template,localRepoPath})
                }
                )
        })
        .catch(error => {
            console.error('Failed to retrieve options:', error);
            reject(error)
        });
    })

}

module.exports = {init} 