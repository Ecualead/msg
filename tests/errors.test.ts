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
import { ERRORS } from '../src';
const expect = chai.expect;

describe("Testing errors definition", () => {
    it("Ammount of errors", (done) => {
        expect(Object.keys(ERRORS).length).to.be.equal(12);
        done();
    });

    it("General errors", (done) => {
        expect(ERRORS.UNKNOWN_MAIL_SERVER_ERROR.value).to.be.equal(1500);
        expect(ERRORS.UNKNOWN_MAIL_SERVER_ERROR.str).to.be.equal("unknown-mail-server-error");

        expect(ERRORS.NOT_AUTHORIZED.value).to.be.equal(1501);
        expect(ERRORS.NOT_AUTHORIZED.str).to.be.equal("not-authorized");

        done();
    });

    it("Mail errors", (done) => {
        expect(ERRORS.INVALID_MAIL_TEMPLATE.value).to.be.equal(1520);
        expect(ERRORS.INVALID_MAIL_TEMPLATE.str).to.be.equal("invalid-mail-template");

        expect(ERRORS.INVALID_MAIL_SETTINGS.value).to.be.equal(1521);
        expect(ERRORS.INVALID_MAIL_SETTINGS.str).to.be.equal("invalid-mail-settings");

        expect(ERRORS.INVALID_MAIL_SERVER.value).to.be.equal(1522);
        expect(ERRORS.INVALID_MAIL_SERVER.str).to.be.equal("invalid-mail-server");

        expect(ERRORS.INVALID_MAIL_DATA.value).to.be.equal(1523);
        expect(ERRORS.INVALID_MAIL_DATA.str).to.be.equal("invalid-mail-data");

        expect(ERRORS.MAIL_SERVER_ERROR.value).to.be.equal(1524);
        expect(ERRORS.MAIL_SERVER_ERROR.str).to.be.equal("mail-server-error");

        done();
    });
});
