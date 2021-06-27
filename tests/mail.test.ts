/**
 * Copyright (C) 2020 - 2021 IKOA Business Opportunity
 *
 * All Rights Reserved
 * Author: Reinier Millo Sánchez <millo@ikoabo.com>
 *
 * This file is part of the IKOA Business Oportunity Mailer API
 * It can't be copied and/or distributed without the express
 * permission of the author.
 */
import "mocha";
import chai from "chai";
import { MailCtrl, ERRORS } from '../src';
import { HTTP_STATUS, SERVER_ERRORS } from "@ikoabo/core";
const expect = chai.expect;

describe("Mail sender", () => {
  it("Invalid mail server", () => {
    MailCtrl.setup("", "token");
    return MailCtrl.send("any", "test mail", "body", "template", null, "test@mail.com")
      .then(() => { throw new Error('was not supposed to succeed'); })
      .catch((err) => {
        expect(err.boError).to.equal(ERRORS.INVALID_MAIL_SERVER);
        expect(err.boStatus).to.equal(HTTP_STATUS.HTTP_4XX_NOT_ACCEPTABLE);
      })
  });

  it("Invalid mail receiver", async () => {
    MailCtrl.setup("server", "token");
    return MailCtrl.send("any", "test mail", "body", "template")
      .then(() => { throw new Error('was not supposed to succeed'); })
      .catch((err) => {
        expect(err.boError).to.equal(ERRORS.INVALID_MAIL_DATA);
        expect(err.boStatus).to.equal(HTTP_STATUS.HTTP_4XX_NOT_ACCEPTABLE);
      })
  });

  it("Invalid mail body", async () => {
    MailCtrl.setup("server", "token");
    return MailCtrl.send("any", "test mail", null, null, null, "sample@mail.com")
      .then(() => { throw new Error('was not supposed to succeed'); })
      .catch((err) => {
        expect(err.boError).to.equal(ERRORS.INVALID_MAIL_DATA);
        expect(err.boStatus).to.equal(HTTP_STATUS.HTTP_4XX_NOT_ACCEPTABLE);
      })
  });

  it("Unknown server", async () => {
    MailCtrl.setup("https://invalid.ikoabo.com", "token");
    return MailCtrl.send("any", "test mail", "Test mail", null, null, "sample@mail.com")
      .then(() => { throw new Error('was not supposed to succeed'); })
      .catch((err) => {
        expect(err.boError).to.equal(ERRORS.UNKNOWN_MAIL_SERVER_ERROR);
        expect(err.boStatus).to.equal(HTTP_STATUS.HTTP_4XX_FORBIDDEN);
      })
  }).timeout(10000);

  it("Try send mail with body", async () => {
    MailCtrl.setup("https://mailer.ikoabo.com", "token");
    return MailCtrl.send("any", "test mail", "Test mail", null, null, "sample@mail.com")
      .then(() => { throw new Error('was not supposed to succeed'); })
      .catch((err) => {
        expect(err.boError).to.equal(SERVER_ERRORS.UNKNOWN_ERROR);
        expect(err.boStatus).to.equal(HTTP_STATUS.HTTP_4XX_BAD_REQUEST);
      })
  }).timeout(10000);

  it("Try send mail with template", async () => {
    MailCtrl.setup("https://mailer.ikoabo.com", "token");
    return MailCtrl.send("any", "test mail", null, "custom-template", null, "sample@mail.com")
      .then(() => { throw new Error('was not supposed to succeed'); })
      .catch((err) => {
        expect(err.boError).to.equal(SERVER_ERRORS.UNKNOWN_ERROR);
        expect(err.boStatus).to.equal(HTTP_STATUS.HTTP_4XX_BAD_REQUEST);
      })
  }).timeout(10000);
});
