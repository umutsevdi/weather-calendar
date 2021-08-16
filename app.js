var request = require('request');
const chalk = require('chalk');
const fs = require('fs');


const keys = fs.readFileSync("./keystore",{encoding:"utf-8",flag:"r"}).split("\n")
const weatherKey = keys[0];
const holidayKey = keys[1];

weather(process.argv[2])

function weather(location="Istanbul") {
    console.clear();
    request.get(
        'http://api.weatherstack.com/current?access_key=' + weatherKey + "&query=" + location,
        function (error, { body }) {
            console.error(chalk.whiteBright.inverse("           |     WEATHER APP                 "));
            if (error)
                console.error(chalk.red.inverse("Error      |    " + error));
            else {
                body = JSON.parse(body);
                if (body.success == false)
                    console.error(chalk.red.inverse("Error      |    " + body.error.code + "    " + body.error.info));
                else if (!body.error && body.current) {

                    console.log(chalk.bold.white("Country    |    " + body.location.country));
                    console.log(chalk.bold.white("Place      |    " + body.location.name + "  /  " + body.location.region));

                    if (body.current.temperature > 20)
                        if (body.current.temperature > 30)
                            console.log(chalk.bold.white("Temperature|    ") + chalk.red.inverse("  " + body.current.temperature + " °C  /  " + body.current.feelslike + " °C  "));
                        else
                            console.log(chalk.bold.white("Temperature|    ") + chalk.yellow.inverse("  " + body.current.temperature + " °C  /  " + body.current.feelslike + " °C  "));
                    else
                        if (body.current.temperature > 10)
                            console.log(chalk.bold.white("Temperature|    ") + chalk.yellowBright.inverse("  " + body.current.temperature + " °C  /  " + body.current.feelslike + " °C  "));
                        else if (body.current.temperature > -5)
                            console.log(chalk.bold.white("Temperature|    ") + chalk.blueBright.inverse("  " + body.current.temperature + " °C  /  " + body.current.feelslike + " °C  "));
                        else
                            console.log(chalk.bold.white("Temperature|    ") + chalk.blue.inverse("  " + body.current.temperature + " °C  /  " + body.current.feelslike + " °C  "));
                    console.log(chalk.bold.white("Weather    |    ") + chalk.cyan.inverse("  " + body.current.weather_descriptions + "  "));
                    console.log(chalk.bold.white("Humidity   |    ") + chalk.green.inverse("  " + body.current.humidity + " %  "));

                    const datetime = {
                        date: body.location.localtime.split(" ")[0].split("-"),
                        time: body.location.localtime.split(" ")[1]
                    }

                    const country = JSON.parse(fs.readFileSync("./countryNames.json").toString())[body.location.country];
                    console.error(chalk.whiteBright.inverse("           |     CALENDAR                    "));

                    console.log(chalk.bold.white("Date       |    " + datetime.date[2] + " / " + datetime.date[1] + " / " + datetime.date[0]));
                    console.log(chalk.bold.white("Time       |    " + datetime.time));
                    console.error(chalk.whiteBright.inverse("           |     HOLIDAYS                    "));
                    request.get(
                        "https://calendarific.com/api/v2/holidays?api_key=" + holidayKey + "&country=" + country + "&year=" + datetime.date[0] + "&month=" + datetime.date[1],
                        function (error, { body }) {
                            body = JSON.parse(body);
                            if (!error) {
                                const holidays = body.response.holidays;
                                Object.keys(holidays).forEach((key) => {
                                    const date = holidays[key].date.iso.split("T")[0].split("-");
                                    console.log(chalk.bold.white(date[2] + "/" + date[1] + "/" + date[0] + " |    ") + chalk.blue.inverse.bgWhite("    " + holidays[key].name + "    "));
                                    console.log(chalk.bold.white("           |    ") + chalk.cyan.inverse("    " + holidays[key].description));
                                })
                            }
                        }
                    )
                }
            }
        }
    )
}
