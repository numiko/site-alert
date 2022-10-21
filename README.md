# Site Alert
Show site alerts and allow user to close them, storing which ones have been closed in sessionStorage.
based off the original code for Chatham House https://bitbucket.org/numiko/electoral-commission/src/master/docroot/themes/custom/electoralcommission/src/js/modules/alerts.js

<br />


## Installation
---
`npm install bitbucket:numiko/@numiko/site-alert`

`npm install bitbucket:numiko/@numiko/site-alert#<TAG_NAME>`

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
