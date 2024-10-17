const ora = require("ora")
const log = require("../utils/log")
const fs = require("fs")
const download = require("download-git-repo")
const { gitRepoUrl } = require("../config/const.js")

module.exports = (branch, projectName) => { 
    return new Promise((resolve, reject) => { 
        fs.exists(projectName, exist => { 
            if (exist) { 
                log.error(
                    `Folder ${projectName} already exists, please delete it before creating`
                );
                return;
            }
            const spinner = ora("Initialing template, please wait...");
            const gitUrl = `${gitRepoUrl}#${branch}`
            console.log(`Fetching git url: ${gitUrl}`)
            spinner.start();
            download(`direct:${gitUrl}`, projectName, {clone:true}, err => {
                if (err) { 
                    spinner.fail();
                    log.error("Initialing template failed: "+err);
                    reject(err);
                    return;
                }
                spinner.succeed()
                log.succeed("Initialing template succeed")
                resolve();
            })
        })
    })
}