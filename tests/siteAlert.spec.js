import { Window } from 'happy-dom';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { SiteAlert } from '../lib/SiteAlert';

/**
 * The HTML used to assert our tests against.
 * @type {string}
 */
const htmlDocumentContent = `
  <div data-js-alert-banner data-js-alert-id="1717427103" class="hidden opacity-0 w-full flex items-start gap-6 relative p-5 rounded-sm border-l-4 bg-red-100 border-red-500" role="alert">
    <p>Vivamus in erat ut urna cursus vestibulum. Cras sagittis. Pellentesque auctor neque nec urna. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros.</p>
    <button data-js-alert-close class="ml-auto">Close</button>
  </div>
`;

// Initialise Happy DOM
const window = new Window();
const document = window.document;

// Make window and document global
global.window = window;
global.document = document;

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Make sure the document is in a clear state before each test.
beforeEach(() => {
  document.body.innerHTML = htmlDocumentContent;
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
      id: ID,
      closeElement: '[data-js-alert-close]'
    });

    expect(alert.id).toBe(ID);
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

    // We grab a fresh instance because `happy-dom` caches the element.
    const alertElAfterClose = document.querySelector('[data-js-alert-banner]');
    expect(alertElAfterClose).toBe(null);
  });
});
