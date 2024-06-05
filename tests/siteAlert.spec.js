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
  // For some reason, using `document.write` throws an error where it is unable to
  // fetch external scripts. This is why we are using `document.innerHTML` instead.
  document.innerHTML = htmlDocumentContent;
});

afterEach(()=> {
  vi.restoreAllMocks();
});

describe('Site alert initialisation', () => {
  it('should correctly initialise the alert element when passed a string', () => {
    const alertElSelector = '[data-js-alert-banner]';
    const alertEl = document.querySelector(alertElSelector);

    const alert = new SiteAlert(alertElSelector);

    expect(alert.alert).toBe(alertEl);
  });

  it('should correctly initialise the alert element when passed an element', () => {
    const alertEl = document.querySelector('[data-js-alert-banner]');

    const alert = new SiteAlert(alertEl);

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
      id: ID
    });

    expect(alert.id).toBe(ID);
  });

  it('should initialise the cookie prefix when a custom value', () => {
    const COOKIE_PREFIX = 'cookie_prefix';

    const alert = new SiteAlert('[data-js-alert-banner]', {
      cookiePrefix: COOKIE_PREFIX
    });

    expect(alert.cookiePrefix).toBe(COOKIE_PREFIX);
  });

  it('should initialise the cookie expiry when using a custom value', () => {
    const COOKIE_EXPIRY = 2;

    const alert = new SiteAlert('[data-js-alert-banner]', {
      cookieExpiry: COOKIE_EXPIRY
    });

    expect(alert.cookieExpiryInDays).toBe(COOKIE_EXPIRY);
  });
});
