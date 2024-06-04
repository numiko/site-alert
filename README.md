# Site Alert

## Installation


`npm install ssh://git@bitbucket.org:numiko/site-alert.git#<TAG_NAME>`


## Example

```javascript
import { SiteAlert } from '@numiko/site-alert';

const siteAlerts = document.querySelectorAll('[data-js-alert-banner]');
siteAlerts.forEach( (alert) => {
  new SiteAlert(alert, {
    id: alert.dataset.jsAlertId,
    closeElement: alert.querySelector('[data-js-alert-close]'),
    cookiePrefix: 'site_alert',
    cookieExpiry: 7,
  });
});

```

```html

<!-- Basic implementation -->

<!-- Its important that each Site Alert has a unique id for 'data-js-alert' -->
<div data-js-alert-banner data-js-alert-id="1717427103" class="hidden opacity-0 w-full flex items-start gap-6 relative p-5" role="alert">
    <p>Vivamus in erat ut urna cursus vestibulum. Cras sagittis. Pellentesque auctor neque nec urna. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros.</p>
    <button data-js-alert-close class="ml-auto">Close</button>
  </div>
```

<br />

## Roadmap
---
1. Tests
