const ora = require("ora")
const log = require("../utils/log")
const path = require('path');
const fs=require('fs-extra');

function downloadTemplate(templateName,localRepoPath) {
    return new Promise((resolve, reject) => {
        const destPath = `./${templateName}`
        const sourcePath = path.join(localRepoPath, 'Templates', templateName);
        const spinner = ora("Initialing template, please wait...");
        spinner.start();
        fs.pathExists(destPath).then(exists => {
            if (exists) {
                spinner.fail()
                return reject(`Template '${templateName}' already exists.`);
            }
            fs.copy(sourcePath, destPath).then(() => {

                const newDestPath = path.join(destPath, 'devops');
                const pipelineTemplateSourcePath = path.join(localRepoPath, 'pipelineTemplate');
                const pipelineTemplateDestPath = path.join(newDestPath, 'pipelineTemplate');
                fs.copy(pipelineTemplateSourcePath, pipelineTemplateDestPath)
                .then(() => {
                    const infrasModuleSourcePath = path.join(localRepoPath, 'InfrasModules');
                    const infrasModuleDestPath = path.join(newDestPath, 'modules');
                    fs.copy(infrasModuleSourcePath, infrasModuleDestPath);
                })
            })
                .then(() => {
                    spinner.succeed()
                    log.succeed("Initialing template succeed")
                    resolve()
                }).catch(err => {
                    spinner.fail()
                    console.error('Error copying template:', err);
                    reject(err)
                })
        }
        );
                
    })
}

module.exports = {downloadTemplate }