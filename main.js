const path = require("path");
const fs = require("fs");
const ini = require("./parseIni")
const env = require("./parseEnv")
const args = process.argv.slice(2);
if (args.length !== 1)
{
    console.log("usage: node main.js <CONFIG_FILENAME>")
    process.exit(0)
}

const filename = args[0];
const date = new Date();
//Step1 : check if extension is .env or .ini
if(!fs.existsSync(filename))
{
    console.log(`The file ${filename} does not exist`);
    process.exit(-1)
}
//Step2 : read files
else {
    const files = filename.split(".");
    const content = fs.readFileSync(filename, "utf-8");

    if (files[1] === "env") {
        config_env = env(content);
        fs.writeFile('./env'+date.getFullYear()+date.getMonth()+date.getDay()+date.getHours()+date.getMinutes()+date.getSeconds()+'.json', config_env, (err) => {
            if (err) {
                console.log('error create file .env');
            }
        });
    }
    else if (files[1] === "ini") {
        config_ini = ini(content);
        fs.writeFile('./php'+date.getFullYear()+date.getMonth()+date.getDay()+date.getHours()+date.getMinutes()+date.getSeconds()+'.json', config_ini, (err) => {
            if (err) {
                console.log('error create file .ini');
            }
        });
    } else {
        console.log("l'extension n'est pas conforme");
    }
}
