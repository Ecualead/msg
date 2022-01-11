# ECUALEAD Message API

Utility functions for ECUALEAD Message API integration. This library provide the functions to trigger mail notifications to be delivered to users.

The package is developed with the aim of being used in conjunction with the rest of the packages of the platform, but it don't restrict use it as standalone package. The request validation is performed against the Identity Management Service.

[![Version npm](https://img.shields.io/npm/v/@ecualead/msg.svg?style=flat-square)](https://www.npmjs.com/package/@ecualead/msg)[![npm Downloads](https://img.shields.io/npm/dm/@ecualead/msg.svg?style=flat-square)](https://npmcharts.com/compare/@ecualead/msg?minimal=true)[![Build Status](https://gitlab.com/ecualead/msg/badges/master/pipeline.svg)](https://gitlab.com/iecualead/msg)[![coverage testing report](https://gitlab.com/ecualead/msg/badges/master/coverage.svg)](https://gitlab.com/ecualead/msg/-/commits/master)

[![NPM](https://nodei.co/npm/@ecualead/msg.png?downloads=true&downloadRank=true)](https://nodei.co/npm/@ecualead/msg/)

## Installation

```bash
npm install @ecualead/msg
```

## Send mail notifications

To send mail notifications first the utility must be configured with the mailer server and the access token to authenticate the request. Access token must belong to api service, users don't have allowed to send mail notifications. The used api service must be authorized to send mails.

```js
import { MailCtrl } from "@ecualead/msg";
MailCtrl.setup("https://myserver.com", "myaccesstoken");
```

Once the api is configured we can send mail notifications using

```js
MailCtrl.send(subject: string, body?: string, template?:string, data?: any, to?: string | string[], cc?: string | string[], bcc?: string | string[], attachments?: IMailAttachment[]): Promise<void>
```

Where:

- `subject`: Subject of the mail notification.
- `body`: Body of the mail message to be sent.
- `template`: The mail notification to be triggered. This identifies the mail template to be used on the notification.
- `data`: Additional data to replace in the mail template.
- `to`: List of receipts to send the notification.
- `cc`: List of receipts to send the notification as copy.
- `bcc`: List of receipts to send the notification as hidden copy.
- `attachments`: List of base64 files to be included as attachments to the mail.

There are some things to keep in mind:

- Parameters `body` and` template` are exclusive, with higher precedence for `body`. One of them must be set, otherwise an error will be thrown.
- In the case of `to`,` cc` or `bcc`, at least one of them must be set, otherwise an error will occur.

Attachments are defined as

```js
interface IMailAttachment {
  filename: string;
  content: string;
  encoding?: string;
}
```

Attachment can be loaded using

```js
MailCtrl.attachmentFromFile(filepath: string, filename?: string): IMailAttachment;
```
