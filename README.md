# Site Alert
Show site alerts and allow user to close them, storing which ones have been closed in sessionStorage.
based off the original code for Chatham House https://bitbucket.org/numiko/electoral-commission/src/master/docroot/themes/custom/electoralcommission/src/js/modules/alerts.js

<br />


## Installation
---
We want to install a specific tag because currently npm packages hosted privately on Bitbucket do not support semantic versioning.

`npm install ssh://git@bitbucket.org:numiko/site-alert.git#<TAG_NAME>`

<br />

## Example
---
```javascript
import SiteAlert from '@numiko/site-alert';


const numikoSiteAlerts = new siteAlerts('[data-js-alert]', {
  closeButton: '[data-js-alert-close]'
  // optional selector for close buttons
});

numikoSiteAlerts.init();


```
```html

<!-- Basic implementation -->

<!-- Its important that each Site Alert has a unique id for 'data-js-alert' -->
<div class="hidden w-full bg-color-black text-color-white flex items-start justify-between" data-js-alert="SOMEUNIQUEID" role="alert">
  <p>This is the Alert message</p>
  <button type="button" data-js-alert-close>Close alert</button>
</div>
```

<br />

## Roadmap
---
1. Tests
