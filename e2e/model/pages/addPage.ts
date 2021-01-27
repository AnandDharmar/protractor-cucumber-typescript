import { $, by, element, ElementFinder, promise } from "protractor";

export class AddPageObject {
  public addElement: ElementFinder;
  public deleteElement: ElementFinder;

  constructor() {
    this.addElement = $("button");
    this.deleteElement = $(".added-manually");
  }

  async addAndRemove(): Promise<any> {
    await this.addElement.click();
    await this.deleteElement.click();
  }
}
