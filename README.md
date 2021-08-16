# weather-calendar
Weather App that displays weather and holiday informations about given location


<br />
<p align="center">
  <a href="https://github.com/Weather">
    <img src="https://img.icons8.com/color/80/nodejs.png" alt="Logo" width="80" height="80">
  </a>
  
  <h3 align="center">Weather Calendar</h3>
  
  <p align="center">A NodeJS application that returns the weather information and holidays of given city or country.</p>
  <p align="center"><img src="screenshots/Screenshot%20from%202021-08-16%2020-26-05.png">
</p>

## Installation
* After downloading use following command inside the directory to install required libraries.
    ```
        npm install
    ```
* Create a file with named `keystore` with no extension within the program's directory.
* Register to following websites to get your API keys.
    * http://weatherstack.com/
    * https://calendarific.com/
* Paste your API keys to the keystore file.

## Run
* To run type `node ./app.js` within the directory of the application.


## Features
* Type `--location=` while running the command to display selected city or country.
* Example : `node ./app.js --location=Ankara`
