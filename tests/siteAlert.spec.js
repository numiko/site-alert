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

describe('SiteAlert', () => {
  it('should have tests', () => {
    expect(true).toBeTruthy();
  });
});
