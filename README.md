# IKOABO Business Opportunity Mailer API

Utility functions for IKOA Business Opportunity Mailer Service integration. This library provide the functions to trigger mail notifications to be delivered to users.

The package is developed with the aim of being used in conjunction with the rest of the packages of the platform, but it don't restrict use it as standalone package. The request validation is performed against the Identity Management Service.

[![Version npm](https://img.shields.io/npm/v/@ikoabo/mailer.svg?style=flat-square)](https://www.npmjs.com/package/@ikoabo/mailer)[![npm Downloads](https://img.shields.io/npm/dm/@ikoabo/mailer.svg?style=flat-square)](https://npmcharts.com/compare/@ikoabo/mailer?minimal=true)[![Build Status](https://gitlab.com/ikoabo/packages/mailer/badges/master/pipeline.svg)](https://gitlab.com/ikoabo/packages/mailer)[![coverage testing report](https://gitlab.com/ikoabo/packages/mailer/badges/master/coverage.svg)](https://gitlab.com/ikoabo/packages/mailer/-/commits/master)

[![NPM](https://nodei.co/npm/@ikoabo/mailer.png?downloads=true&downloadRank=true)](https://nodei.co/npm/@ikoabo/mailer/)

## Installation

```bash
npm install @ikoabo/mailer
```

## Send mail notifications

To send mail notifications first the utility must be configured with the mailer server and the access token to authenticate the request. Access token must belong to api service, users don't have allowed to send mail notifications. The used api service must be authorized to send mails.

```js
import { MailCtrl } from "@ikoabo/mailer";
MailCtrl.setup("https://myserver.com", "myaccesstoken");
```

Once the api is configured we can send mail notifications using

```js
MailCtrl.send(project: string, subject: string, body?: string, template?:string, data?: any, to?: string | string[], cc?: string | string[], bcc?: string | string[]): Promise<void>
```

Where:

- `project`: Indicate the project identifier that is triggering or requesting the notification. This is a required parameter because mail notifications are jailed by project.
- `subject`: Subject of the mail notification.
- `body`: Body of the mail message to be sent.
- `template`: The mail notification to be triggered. This identifies the mail template to be used on the notification.
- `data`: Additional data to replace in the mail template.
- `to`: List of receipts to send the notification.
- `cc`: List of receipts to send the notification as copy.
- `bcc`: List of receipts to send the notification as hidden copy.

There are some things to keep in mind:

- Parameters `body` and` template` are exclusive, with higher precedence for `body`. One of them must be set, otherwise an error will be thrown.
- In the case of `to`,` cc` or `bcc`, at least one of them must be set, otherwise an error will occur.
