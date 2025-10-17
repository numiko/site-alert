# Site Alert

The Site Alert package allows developers to easily render alerts on a page with the ability to dismiss.

## Features

- The ability to hide the alert once closed for a given amount of time
- Animation on dismiss

## Installation

The package can be installed from BitBucket. If the package has reached version 1, installing
by the semver method is recommended. If the package has not reached version 1, it is
possible to install using the tag.

`npm install ssh://git@bitbucket.org:numiko/site-alert.git#<TAG_NAME>`

`npm install ssh://git@bitbucket.org:numiko/site-alert.git##semver:<VERSION>`

## Usage

```html
<div data-js-alert-banner data-js-alert-id="1717427103" class="hidden opacity-0 w-full flex" role="alert">
  <p>Vivamus in erat ut urna cursus vestibulum. Cras sagittis.</p>
  <button data-js-alert-close class="ml-auto">Close</button>
</div>
```

```js
const siteAlertEl = document.querySelector('[data-js-alert-banner]');
new SiteAlert(siteAlertEl, {
  closeElement: siteAlertEl.querySelector('[data-js-alert-close]'),
  cookieExpiry: 7,
  cookieId: 'id',
});
```

## API

See [documentation](https://v1-1-0--numiko-site-alert.netlify.app) for more detail on how to use package.
