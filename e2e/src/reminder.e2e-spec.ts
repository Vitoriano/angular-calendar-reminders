import { ExpectedConditions, browser, by, element } from 'protractor';

function getFormattedDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

describe('Creating a reminder', () => {
  it('should create a new reminder', async () => {
    await browser.get('/');

    await element(by.id('openReminderForm')).click();

    await browser.sleep(2000);

    await element(by.css('input[formControlName="text"]')).sendKeys(
      'Test Reminder'
    );

    const dateTimeInputElement = element(
      by.css('input[formControlName="dateTime"]')
    );

    const currentDateTime = getFormattedDateTime();

    await browser.executeScript(`
      const input = document.getElementById('dateTime');
      input.value = '${currentDateTime}';
      input.dispatchEvent(new Event('input'));
    `);

    await element(by.css('input[formControlName="label"]')).sendKeys('Orlando');

    const colorInputElement = element(by.css('input[formControlName="color"]'));
    const reminderColor = '#123456';

    await browser.executeScript(`
      const input = document.getElementById('color');
      input.value = '${reminderColor}';
      input.dispatchEvent(new Event('input'));
    `);

    await element(by.css('input[formControlName="label"]')).sendKeys('Orlando');

    await browser.sleep(1000);

    const citySuggestions = element.all(by.css('mat-option'));
    if ((await citySuggestions.count()) > 0) {
      await citySuggestions.first().click();
    }

    await element(by.id('btnCreateReminder')).click();
  });

  it('should create a reminder with specified title and color', async () => {
    await browser.get('/calendar');
    await browser.sleep(2000);

    await element(by.id('openReminderForm')).click();

    let reminderText = 'Test Reminder';

    await element(by.css('input[formControlName="text"]')).sendKeys(
      reminderText
    );

    const dateTimeInputElement = element(
      by.css('input[formControlName="dateTime"]')
    );

    const currentDateTime = getFormattedDateTime();

    await browser.executeScript(`
      const input = document.getElementById('dateTime');
      input.value = '${currentDateTime}';
      input.dispatchEvent(new Event('input'));
    `);

    await element(by.css('input[formControlName="label"]')).sendKeys('Orlando');

    const colorInputElement = element(by.css('input[formControlName="color"]'));
    const reminderColor = '#ff0000';

    await browser.executeScript(`
      const input = document.getElementById('color');
      input.value = '${reminderColor}';
      input.dispatchEvent(new Event('input'));
    `);

    const citySuggestions = element.all(by.css('mat-option'));
    if ((await citySuggestions.count()) > 0) {
      await citySuggestions.first().click();
    }

    await element(by.id('btnCreateReminder')).click();

    browser.sleep(3000);
  });

  it('should edit a new reminder', async () => {

    await browser.get('/calendar');
    await browser.sleep(2000);

    let reminderText = 'Test Reminder';

    let date = new Date();
    let day = date.getDate();

    let firstReminderItem = await element(by.id('reminder' + day + '_0'));

    expect(firstReminderItem.isPresent()).toBe(true);

    await firstReminderItem.click();

    const colorInputElement = element(by.css('input[formControlName="color"]'));
    const reminderColor = '#01A175';
    await browser.executeScript(`
      const input = arguments[0];
      input.value = '${reminderColor}';
      input.dispatchEvent(new Event('input'));
    `, colorInputElement.getWebElement());


    const citySuggestions = element.all(by.css('mat-option'));
    if ((await citySuggestions.count()) > 0) {
      await citySuggestions.first().click();
    }

    await element(by.id('btnEditReminder')).click();

    await browser.sleep(3000);

  });

  it('should delete a new reminder', async () => {
    await browser.get('/calendar');
    await browser.sleep(2000);

    let date = new Date();
    let day = date.getDate();

    let firstReminderItem = await element(by.id('reminder' + day + '_0'));

    expect(firstReminderItem.isPresent()).toBe(true);

    await firstReminderItem.click();

    await element(by.id('btnDeleteReminder')).click();

    await browser.sleep(3000);
  });

});
