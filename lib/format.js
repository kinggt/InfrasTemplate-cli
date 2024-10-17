const handlebars = require("handlebars")
const fs = require("fs")

module.exports = (projectName,answer)=>{
    return new Promise(resolve => { 
        const files = [];
        files.forEach(path => { 
            const content = fs.readFileSync(path, "utf8")
            const result = handlebars.compile(content)({ data: answer })
            fs.writeFileSync(path, result)
        })
        resolve()
    })
}