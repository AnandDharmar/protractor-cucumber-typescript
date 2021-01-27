import { $, by, element, ElementFinder } from "protractor";

export class SearchPageObject {
  public addRemoveLink: ElementFinder;
  public addElement: ElementFinder;
  public logo: ElementFinder;
  public formAutentication: ElementFinder;
  constructor() {
    this.addRemoveLink = element(
      by.xpath('//a[contains(text(),"Add/Remove Elements")]')
    );
    this.addElement = $(" button[onclick='addElement()']");
    this.logo = $("div.logo img");
    this.formAutentication = element(
      by.xpath('//a[contains(text(),"Form Authentication")]')
    );
  }
}
