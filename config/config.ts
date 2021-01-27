import * as path from "path";
import { browser, Config } from "protractor";
import { Reporter } from "../support/reporter";
const jsonReports = process.cwd() + "/reports/json";
const protractorReport = process.cwd() + "/reports/ProtractorReport";
// const visualTest = process.cwd() + "/reports/VisualTest";

// // set default browser
let browserValue = "chrome";
const isHeadless: boolean = process.argv.includes("--headless");
const {
  ProtractorScreenshotExtension,
} = require("protractor-screenshot-extension");

interface CapabilitiesObject {
  chrome: {};
  firefox: {};
  "internet explorer": {};
}

export const config: Config = {
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,

  baseUrl: "http://the-internet.herokuapp.com/",

  capabilities: {
    browserName: "chrome",
  },

  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),

  specs: ["../e2e/features/*.feature"],

  onPrepare: () => {
    require("ts-node").register({ project: "./tsconfig.json" });
    browser.screenshotExtension = new ProtractorScreenshotExtension(
      "visualTest"
    );
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
    Reporter.createDirectory(jsonReports);
    Reporter.createDirectory(protractorReport);
  },

  plugins: [
    {
      package: "protractor-multiple-cucumber-html-reporter-plugin",
      options: {
        // read the options part for more options
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        displayDuration: true,
        durationInMS: true,
        openReportInBrowser: true,
        pageFooter: '<h1 style="text-align:center;">Centered Heading</h1>',
        pageTitle: "Test reporter for protractor",
        reportName: "Protractor Status Report",
        reportPath: protractorReport,
        saveCollectedJSON: true,
        customData: {
          title: "Protractor Cucumber Report",
          data: [
            { label: "OS", value: "Linux" },
            { label: "Environment", value: "Staging" },
            { label: "Cycle", value: "First cycle" },
          ],
        },
        // metadata: [
        //     {name: 'Environment v.', value: '12.3'},
        //     {name: 'Plugin v.', value: '32.1'},
        //     {name: 'Variable set', value: 'Foo'}
        // ],
      },
    },
    {
      package: "protractor-axe-html-report-plugin",
      displayHelpUrl: false, // Displays the aXe help URL along with the error. Defaults to true.
      displayContext: false, // Displays the HTML of interest. Defaults to true.
      displayPasses: false, // Display pass results. Defaults to true.
      displayViolations: true, // Display violations. Defaults to true.
      standardsToReport: [
        "wcaga",
        "wcag2a",
        "wcag211",
        "wcag21aa",
        "section508",
        "cat.semantics",
        "best-practice",
      ], // A list of standards to report on. If empty, reports on all standards.
      ignoreAxeFailures: false, // If true, aXe failures won't cause the whole test to fail. Defaults to false
      htmlReportPath: `reports/accessibility`,
    },
  ],

  cucumberOpts: {
    format: [
      `json:./reports/json/cucumber_report.json`,
      "support/reporterAllure.ts",
    ],
    compiler: "ts:ts-node/register",
    require: ["../e2e/**/*.ts", "../support/*.ts"],
    strict: true,
    tags: "@Test",
  },

  onComplete: () => {
    Reporter.createHTMLReport();
  },
};
const capabilitiesMap: CapabilitiesObject = {
  firefox: {
    browserName: "firefox",
    marionette: true,
    acceptInsecureCerts: true,
    "moz:firefoxOptions": {
      w3c: false,
      args: [isHeadless ? "--headless" : "--test-type=browser"],
      prefs: {
        "browser.download.folderList": 2,
        "browser.download.dir":
          process.cwd() +
          `\\${process.env.TEST_REPORT_DIRECTORY}\\downloads\\firefox`,
        "services.sync.prefs.sync.browser.download.useDownloadDir": true,
        "browser.download.useDownloadDir": true,
        "browser.download.manager.alertOnEXEOpen": false,
        "browser.download.manager.closeWhenDone": true,
        "browser.download.manager.focusWhenStarting": false,
        "browser.download.manager.showWhenStarting": true,
        "browser.helperApps.alwaysAsk.force": false,
        "browser.download.manager.showAlertOnComplete": false,
        "browser.download.manager.useWindow": false,
        "browser.helperApps.neverAsk.saveToDisk":
          "text/plain,text/csv,application/csv;text/comma-separat‌​ed-values;application/excel;application/octet-stream;application/xlsx;application/xls;application/vnd.ms-excel;application/vnd.ms-excel.addin.macroenabled.12;application/vnd.ms-excel.sheet.binary.macroenabled.12;application/vnd.ms-excel.template.macroenabled.12;application/vnd.ms-excel.sheet.macroenabled.12;application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    },
    // to run n number of feature files in parallel, shardTestFiles -> true, maxInstances -> n
    shardTestFiles: process.env.RUN_TEST_PARALLEL === "true" ? true : false,
    maxInstances: Number(process.env.MAX_BROWSER_INSTANCE) || 1,
  },
  chrome: {
    browserName: "chrome",
    platform: "ANY",
    version: "ANY",
    "goog:chromeOptions": {
      w3c: false,
      useAutomationExtension: false,
      excludeSwitches: ["enable-automation"],
      args: [
        isHeadless ? "--headless" : "--test-type=browser",
        "--disable-gpu",
        "--test-type=browser",
        "--disable-extensions",
        "--no-sandbox",
        "--disable-infobars",
        "--window-size=1920,1080",
      ],
      prefs: {
        credentials_enable_service: false,
        profile: {
          password_manager_enabled: false,
        },
        download: {
          prompt_for_download: false,
          directory_upgrade: true,
          default_directory:
            process.cwd() +
            `\\${process.env.TEST_REPORT_DIRECTORY}\\downloads\\chrome`,
        },
      },
    },
    // to run n number of feature files in parallel, shardTestFiles -> true, maxInstances -> n
    shardTestFiles: process.env.RUN_TEST_PARALLEL === "true" ? true : false,
    maxInstances: Number(process.env.MAX_BROWSER_INSTANCE) || 1,
  },
  "internet explorer": {
    browserName: "internet explorer",
    ignoreProtectedModeSettings: true,
    platform: "ANY",
    version: "11",
    args: [
      "--silent",
      "--no-sandbox",
      "--test-type=browser",
      "--lang=US",
      "--start-maximized",
    ], //,'--headless', '--disable-gpu',
    prefs: {
      download: {
        prompt_for_download: false,
        directory_upgrade: true,
        extensions_to_open: "",
        default_directory:
          process.cwd() +
          `\\${process.env.TEST_REPORT_DIRECTORY}\\downloads\\ie`,
      },
    },
    ensureCleanSession: true,
    nativeEvents: false,
    allowBlockedContent: true,
    "allow-blocked-content": true,
    ignoreZoomSetting: true,
    // to run n number of feature files in parallel, shardTestFiles -> true, maxInstances -> n
    shardTestFiles: process.env.RUN_TEST_PARALLEL === "true" ? true : false,
    maxInstances: Number(process.env.MAX_BROWSER_INSTANCE) || 1,
  },
};

// get browser name from the CLI and set capability accordingly
process.argv.slice(3).forEach((argument) => {
  if (argument.includes("browser")) {
    const value: string = argument.split("=")[1];
    if (Object.prototype.hasOwnProperty.call(capabilitiesMap, value)) {
      browserValue = value;
      return;
    }
  }
});

config.capabilities = capabilitiesMap[browserValue];
config.directConnect = browserValue.includes("explorer") ? false : true;

exports.config = config;
