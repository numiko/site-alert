import { Browser } from 'happy-dom';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { SiteAlert } from '../lib/SiteAlert';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * The HTML used to assert our tests against.
 * @type {string}
 */
const htmlDocumentContent = `
<html>
  <head>
    <title>Site Alert</title>
  </head>

  <body>
    <div data-js-alert-banner data-js-alert-id="1" class="hidden opacity-0 w-full flex items-start gap-6 relative p-5 rounded-sm border-l-4 bg-red-100 border-red-500" role="alert">
      <p>Vivamus in erat ut urna cursus vestibulum. Cras sagittis. Pellentesque auctor neque nec urna. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros.</p>
      <button data-js-alert-close class="ml-auto">Close</button>
    </div>
  </body>
</html>
`;

let browser;
let page;
let document;

// Make sure the document is in a clear state before each test.
beforeEach(() => {
  browser = new Browser({
    settings: {

    }
  });
  page = browser.newPage();
  page.url = 'http://localhost:8080/';
  page.content = htmlDocumentContent;
  document = page.mainFrame.document;

  global.document = document;
});

afterEach(()=> {
  vi.restoreAllMocks();
});

describe('Site alert initialisation', () => {
  it('should correctly initialise the alert element when passed a string', () => {
    const alertElSelector = '[data-js-alert-banner]';
    const alertEl = document.querySelector(alertElSelector);

    const alert = new SiteAlert(alertElSelector, {
      closeElement: '[data-js-alert-close]'
    });

    expect(alert.alert).toBe(alertEl, {
      closeElement: '[data-js-alert-close]'
    });
  });

  it('should correctly initialise the alert element when passed an element', () => {
    const alertEl = document.querySelector('[data-js-alert-banner]');

    const alert = new SiteAlert(alertEl, {
      closeElement: '[data-js-alert-close]'
    });

    expect(alert.alert).toBe(alertEl);
  });

  it('should correctly initialise the close element when passed a string', () => {
    const alertEl = document.querySelector('[data-js-alert-banner]');
    const closeElSelector = '[data-js-alert-close]';
    const closeEl = document.querySelector(closeElSelector);

    const alert = new SiteAlert(alertEl, {
      closeElement: closeElSelector
    });

    expect(alert.closeElement).toBe(closeEl);
  });

  it('should correctly initialise the close element when passed an element', () => {
    const alertEl = document.querySelector('[data-js-alert-banner]');
    const closeEl = document.querySelector('[data-js-alert-close]');

    const alert = new SiteAlert(alertEl, {
      closeElement: closeEl
    });

    expect(alert.closeElement).toBe(closeEl);
  });

  it('should initialise the ID when using a custom value', () => {
    const ID = 'test-id';

    const alert = new SiteAlert('[data-js-alert-banner]', {
      cookieId: ID,
      closeElement: '[data-js-alert-close]'
    });

    expect(alert.cookieId).toBe(ID);
  });

  it('should initialise the cookie prefix when a custom value', () => {
    const COOKIE_PREFIX = 'cookie_prefix';

    const alert = new SiteAlert('[data-js-alert-banner]', {
      cookiePrefix: COOKIE_PREFIX,
      closeElement: '[data-js-alert-close]'
    });

    expect(alert.cookiePrefix).toBe(COOKIE_PREFIX);
  });

  it('should initialise the cookie expiry when using a custom value', () => {
    const COOKIE_EXPIRY = 2;

    const alert = new SiteAlert('[data-js-alert-banner]', {
      cookieExpiry: COOKIE_EXPIRY,
      closeElement: '[data-js-alert-close]'
    });

    expect(alert.cookieExpiryInDays).toBe(COOKIE_EXPIRY);
  });
});

describe('Site alert behaviour', () => {
  it('should hide the alert when the close button is clicked', async () => {
    const alertEl = document.querySelector('[data-js-alert-banner]');
    const closeEl = document.querySelector('[data-js-alert-close]');

    new SiteAlert(alertEl, {
      closeElement: closeEl
    });

    closeEl.click();

    await delay(400);

    // We grab a fresh instance because the element is cached.
    const alertElAfterClose = document.querySelector('[data-js-alert-banner]');
    expect(alertElAfterClose).toBe(null);
  });

  it('should set a cookie when the alert has been closed', () => {
    const alertEl = document.querySelector('[data-js-alert-banner]');
    const closeEl = document.querySelector('[data-js-alert-close]');

    new SiteAlert(alertEl, {
      cookieId: '1',
      closeElement: closeEl,
    });

    closeEl.click();

    expect(document.cookie).toBe('1=true');
  });

  it('should remove the alert if it has already been closed', async () => {
    const ALERT_ID = '1';
    const ALERT_PREFIX = 'alert';

    const alertEl = document.querySelector('[data-js-alert-banner]');
    const closeEl = document.querySelector('[data-js-alert-close]');

    new SiteAlert(alertEl, {
      closeElement: closeEl,
      cookiePrefix: ALERT_PREFIX,
      cookieId: ALERT_ID
    });

    closeEl.click();

    // Create a new page with a fresh document
    page = browser.newPage();
    page.url = 'http://localhost:8080/';
    document = page.mainFrame.document;
    page.content = htmlDocumentContent;

    const alertElOnNewPage = document.querySelector('[data-js-alert-banner]');
    new SiteAlert(alertElOnNewPage, {
      closeElement: closeEl,
      cookiePrefix: ALERT_PREFIX,
      cookieId: ALERT_ID
    });

    // We grab a fresh instance because the element is cached.
    const alertElAfterInit = document.querySelector('[data-js-alert-banner]');
    expect(alertElAfterInit).toBe(null);
  });

  it('should not set a cookie if no cookieId is passed', () => {
    const alertEl = document.querySelector('[data-js-alert-banner]');
    const closeEl = document.querySelector('[data-js-alert-close]');

    new SiteAlert(alertEl, {
      closeElement: closeEl,
    });

    closeEl.click();

    expect(document.cookie).toBe('');
  });
});
