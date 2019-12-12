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
    driver.get('https://brunoyam.com/verify');
    await page.isLoad();
    await driver.findElement(By.css('[placeholder="Фамилия, Имя, Отчество"]')).sendKeys('Шарина Юлия Валерьевна');
    await driver.findElement(By.css('[placeholder="Номер сертификата"')).sendKeys('TE250-1725');
    await driver.findElement(By.css('button.btn.btn-outline-orange.btn-lg')).click();
    await page.isLoad();
    await driver.findElement(By.css('strong'));
  });

  it("Negative test", async function() {
  debugger;
  driver.get('https://brunoyam.com/verify');
  await page.isLoad();
  await driver.findElement(By.css('[placeholder="Фамилия, Имя, Отчество"]')).sendKeys('Шарина Юлия Валерьевна');
  await driver.findElement(By.css('[placeholder="Номер сертификата"')).sendKeys('TE250-1726');
  await driver.findElement(By.css('button.btn.btn-outline-orange.btn-lg')).click();
  await page.isLoad();
  await driver.findElement(By.css('.v-alert.alert.alert-danger'), true);
   });

  after(() => driver && driver.quit());
});
