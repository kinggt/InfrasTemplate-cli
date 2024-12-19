const program = require("commander");
const packageInfo = require("../package.json");
const log = require("../utils/log")
const { cloneRepoAndGetOptions } = require("../config/config")
const { init }  = require("./init")
const { downloadTemplate } = require("./download")



log.showGraph("DNV")

program
    .version(packageInfo.version)
    .alias("v")
    .option("-v,--version", "Vew version");

program
    .command("list")
    .description("Show all available templates")
    .alias("l")
    .action(() => {
        cloneRepoAndGetOptions()
            .then(({options}) => {
                let infos = options.map(item => `  ${item.name}: ${item.description}`)
                infos.unshift("")
                infos.unshift("Available templates:")
                log.succeed(infos.join("\r\n"))
            })
            .catch(error => {
                console.error('Failed to retrieve options:', error);
            });
    })

    program
    .command("init")
    .description("init templates")
    .alias("i")
        .action(() => { 
            init().then(({ template,localRepoPath}) => { 
                downloadTemplate(template,localRepoPath).then(() => {
                    log.succeed('successfully initialized the template')
                }).catch(error => {
                    log.error('Failed to init:'+error)
                })
            })
            .catch(error => {
                console.error('Failed to init:',error)
            })
        }
    );

program.parse(process.argv);
if (!program.args.length)
{
    program.help();
}