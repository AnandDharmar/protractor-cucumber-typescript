import { $, browser, by, element, ElementFinder, promise } from "protractor";

export class LoginPageObject {
  public username: ElementFinder;
  public password: ElementFinder;
  public login: ElementFinder;
  public secureArea: ElementFinder;

  constructor() {
    this.username = $("#username");
    this.password = $("#password");
    this.login = $(".fa");
    this.secureArea = $("//h2[normalize-space()='Secure Area']");
  }

  async loginFuntion(userName: string, password: string) {
    this.username.sendKeys(userName);
    this.password.sendKeys(password);
    this.login.click();
  }

  async getSecureAreaText() {
    this.secureArea.getText();
  }
}
