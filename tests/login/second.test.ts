import { Builder, WebDriver, Capabilities } from "selenium-webdriver";
import { LoginPage } from "../../pagesObject/login.po";
import { CalendarPage } from "../../pagesObject//calendar.po";
import { App } from "../../pagesObject/config.po";
import { SeleniumUtils } from "../../utils/se.utils";

interface IAssert {
  equal: (actual: Object, expected: Object) => void;
}

require("chromedriver");
const assert: IAssert = require("assert");

let capabilities = Capabilities.chrome();

capabilities.set("goog:chromeOptions", {
  args: ["--lang=en", "disable-infobars", "--disable-plugins", "--headless"]
});

describe("Login form", function() {
  let driver: WebDriver;
  let page: LoginPage;
  let calendarPage: CalendarPage;
  let browser: SeleniumUtils;

  before(async function() {
    driver = await new Builder().withCapabilities(capabilities).build();
    page = new LoginPage(driver);
    calendarPage = new CalendarPage(driver);
    browser = new SeleniumUtils(driver);
  });

  it("Positive test", async function() {
    //driver.get('https://www.mail.ru');
    browser.go('https://www.mail.ru');
    await driver.sleep(2000);
    await driver.findElement(By.css('#PH_authLink')).click();
    await driver.findElement(By.css('[placeholder="Имя аккаунта"]')).sendKeys('vip.juvefan');
    await driver.sleep(2000);
    await driver.findElement(By.css('.c01102.c0177.c01103.c0178.c01116.c0192')).click();
    await driver.sleep(2000);
    await driver.findElement(By.css('.c0147.c0152.c0153')).sendKeys('Ter090978ter');
    await driver.findElement(By.css('.c01148.c0179.c01146.c0177')).click();
    await driver.sleep(2000);
    // browser.go(App.url);
    // await page.isLoad();
    // await browser.keys(page.email(), App.user.login);
    // await browser.keys(page.password(), App.user.password);
    // await browser.click(page.submit());
    // await calendarPage.isLoad();
    // await assert.equal(await calendarPage.isPage(), true);
  });

  // it("Negative test", async function() {
  //   debugger;
  //   browser.go(App.url);
  //   await page.isLoad();
  //   await browser.keys(page.email(), App.user.login);
  //   await browser.keys(page.password(), "qweqweqweqwe");
  //   await browser.click(page.submit());
  //   await page.isLoad();
  //   await assert.equal(await page.isPage(), true);
  });

  after(() => driver && driver.quit());
});
