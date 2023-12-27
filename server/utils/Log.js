const chalk = require('chalk');

const Log = (string, color, isJson) => {
  let stringValue = '';
  if (isJson) {
    stringValue = JSON.stringify(string, null, 2);
  } else {
    stringValue = string;
  }
  if (!color) {
    console.log(stringValue);
  } else if (color == 'RED') {
    console.log(chalk.red(stringValue));
  } else if (color == 'GREEN') {
    console.log(chalk.green(stringValue));
  } else if (color == 'YELLOW') {
    console.log(chalk.yellow(stringValue));
  } else if (color == 'BLUE') {
    console.log(chalk.blue(stringValue));
  } else if (color == 'MAGENTA') {
    console.log(chalk.magenta(stringValue));
  } else if (color == 'CYAN') {
    console.log(chalk.cyan(stringValue));
  } else if (color == 'GRAY') {
    console.log(chalk.gray(stringValue));
  }
};

module.exports = { Log };
