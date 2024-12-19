const simpleGit = require('simple-git');
const temp = require('temp');
const path = require('path');
const constant = require("./const.js")

console.log('start')
function cloneRepoAndGetOptions() {
    return new Promise((resolve, reject) => {
        temp.mkdir('template-repo', (error, dirPath) => { 
            if (error) {
                console.error('Error creating temp directory:', error);
                return reject(error);
            }

            const repoUrl = constant.AzureRepoUrl;
            const localRepoPath = path.join(dirPath, 'repo');
            const git = simpleGit();

            git.clone(repoUrl, localRepoPath, ['--branch', 'develop'], (error) => {
                if (error) {
                    console.error('Error cloning repository:', error);
                    return reject(error);
                }

                const repoGit = simpleGit(localRepoPath);
                repoGit.raw(['ls-tree', '-r', '--name-only', 'HEAD:Templates'], (error, result) => {
                    if (error) {
                        console.error('Error getting folders:', error);
                        return reject(error);
                    }

                    const folders = result.trim().split('\n').filter(folder => folder);
                    console.log('All folders:', folders);
                    const topLevelFolders = [...new Set(folders.map(folderPath => folderPath.split('/')[0]))];

                    const options = topLevelFolders.map(folder => ({
                        name: folder,
                        description: `Template for ${folder} pipeline`,
                    }));

                    console.log('Options:', options);
                    resolve({ options, localRepoPath });  // Resolve the promise with options
                });
            });
        });
    });
}

module.exports = { cloneRepoAndGetOptions };