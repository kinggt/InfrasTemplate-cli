const program = require("commander");
const packageInfo = require("../package.json");
const log = require("../utils/log")
const { options } = require("../config/config")
const init = require("./init")
const download = require("./download")



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
        let infos = options.map(item => `  ${item.order}.${item.name}: ${item.description}`)
        infos.unshift("")
        infos.unshift("Available templates:")
        log.succeed(infos.join("\r\n"))
    })

program
    .command("init")
    .description("init templates")
    .alias("i")
    .action(() => {
        init().then(async (value) => {
            await download(value.template, "testTemplate");
        })
    })

program.parse(process.argv);
if (!program.args.length)
{
    program.help();
}