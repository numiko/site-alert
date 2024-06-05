import { Window } from 'happy-dom';
import fs from 'fs';
import path from 'path';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { SiteAlert } from '../lib/SiteAlert';

// Read the HTML document content
const htmlDocumentContent = fs.readFileSync(path.join(process.cwd(), 'index.html')).toString();

// Initialise Happy DOM
const window = new Window();
const document = window.document;

// Make window and document global
global.window = window;
global.document = document;

// Make sure the document is in a clear state before each test.
beforeEach(() => {
  document.body.innerHTML = '';
  document.write(htmlDocumentContent);
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

// describe('Site alert behaviour', () => {
//   it('should hide the alert when the close button is clicked', () => {
//     const alertEl = document.querySelector('[data-js-alert-banner]');
//     const closeEl = document.querySelector('[data-js-alert-close]');

//     new SiteAlert(alertEl, {
//       closeElement: closeEl
//     });

//     console.log(closeEl);
//   });
// });
