const { BeforeAll, After, AfterAll, Status } = require("cucumber");
import { Before } from "cucumber";
import * as fs from "fs";
import { browser } from "protractor";
import { config } from "../config/config";

BeforeAll({ timeout: 100 * 1000 }, async () => {
  await browser.get(config.baseUrl);
});

Before(async function (scenario) {
  await browser.get(config.baseUrl);
  await browser.waitForAngularEnabled(false);
});

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    // screenShot is a base-64 encoded PNG
    const screenShot = await browser.takeScreenshot();
    this.attach(screenShot, "image/png");
  }
});

AfterAll({ timeout: 100 * 1000 }, async () => {
  await browser.quit();
});
