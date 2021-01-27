const { CucumberJSAllureFormatter } = require("allure-cucumberjs");
const { AllureRuntime } = require("allure-cucumberjs");

class Reporter extends CucumberJSAllureFormatter {
  constructor(options) {
    super(options, new AllureRuntime({ resultsDir: "./allure-results" }), {
      labels: {
        // issue: [/@bug_(.*)/],
        // epic: [/@feature:(.*)/],
        feature: [/sprint-(\d*)/, /release-(\d)/, /area-(.*)/],
        issue: [/(bug-\d*)/],
      },
    });
  }
}

exports.default = Reporter;
