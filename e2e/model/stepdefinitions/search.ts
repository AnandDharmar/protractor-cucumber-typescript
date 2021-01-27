import { SearchPageObject } from "../pages/searchPage";
import { AddPageObject } from "../pages/addPage";
import { LoginPageObject } from "../pages/loginPage";
import { runAxeTest } from "protractor-axe-html-report-plugin";

const { Given, When, Then } = require("cucumber");
import { browser } from "protractor";
import { expect } from "../../../support/expect";

const search: SearchPageObject = new SearchPageObject();
const addAndRemove: AddPageObject = new AddPageObject();
const login: LoginPageObject = new LoginPageObject();

interface AxeResponse {
  violations: string[];
}

Given(/^I am on The Internet search page$/, async function () {
  console.log("I am on the home page");
  await browser.screenshotExtension.checkPageScreenshot("Homepage", {
    includeAA: [true],
  });
  const screenShot = await browser.takeScreenshot();
  this.attach(screenShot, "image/png");
});

When(/^^I click on Add Element$/, async () => {
  await search.addRemoveLink.click();
});

When(/^^I click on Form Authentication$/, async () => {
  await search.formAutentication.click();
});

When(/^Add Element page should be displayed$/, async () => {
  await search.addElement.isDisplayed();
});

Then(/^Add and Delete Element in the page$/, async () => {
  await addAndRemove.addAndRemove();
});

Then(/^success message is displayed$/, async () => {
  console.log("success");
});

When(
  /^user enter "(.*)" and "(.*)"$/,
  async (username: string, password: string) => {
    login.loginFuntion(username, password);
  }
);
