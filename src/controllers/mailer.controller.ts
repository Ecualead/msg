/**
 * Copyright (C) 2020-2022 ECUALEAD
 * All Rights Reserved
 * Author: Reinier Millo Sánchez <rmillo@ecualead.com>
 *
 * This file is part of the ECUALEAD Message Server API.
 * It can't be copied and/or distributed without the express
 * permission of the author.
 */
import { SERVER_ERRORS, HTTP_STATUS, Objects } from "@ecualead/server";
import { ERRORS } from "../constants/errors.enum";
import axios, { AxiosError, AxiosResponse } from "axios";
import fs from "fs";
import { basename } from "path";
import { AuthenticationCtrl } from "@ecualead/auth";

export interface IMailAttachment {
  filename: string;
  content: string;
  encoding?: string;
}

class Mails {
  private static _instance: Mails;
  private _service: string;

  /**
   * Private constructor to allow singleton instance
   */
  private constructor() {
    /* Do nothing on constructor */
  }

  /**
   * Retrieve singleton class instance
   */
  public static get shared(): Mails {
    if (!Mails._instance) {
      Mails._instance = new Mails();
    }
    return Mails._instance;
  }

  public setup(service: string) {
    this._service = service;
  }

  public send(
    subject: string,
    body?: string,
    template?: string,
    data?: any,
    to?: string | string[],
    cc?: string | string[],
    bcc?: string | string[],
    attachments?: IMailAttachment[]
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      /* Check mail service settings */
      if (!this._service || this._service.length <= 0) {
        return reject({
          boError: ERRORS.INVALID_MAIL_SERVER,
          boStatus: HTTP_STATUS.HTTP_4XX_NOT_ACCEPTABLE
        });
      }

      /* Check the mail receiver */
      if (
        (!to || (Array.isArray(to) && to.length === 0)) &&
        (!cc || (Array.isArray(cc) && cc.length === 0)) &&
        (!bcc || (Array.isArray(bcc) && bcc.length === 0))
      ) {
        return reject({
          boError: ERRORS.INVALID_MAIL_DATA,
          boStatus: HTTP_STATUS.HTTP_4XX_NOT_ACCEPTABLE
        });
      }

      /* Prepare the mail body */
      const bodyObj: any = {
        subject: subject,
        payload: data,
        to: to,
        cc: cc,
        bcc: bcc,
        attachments: attachments
      };
      if (body) {
        bodyObj["body"] = body;
      } else if (template) {
        bodyObj["template"] = template;
      } else {
        return reject({
          boError: ERRORS.INVALID_MAIL_DATA,
          boStatus: HTTP_STATUS.HTTP_4XX_NOT_ACCEPTABLE
        });
      }

      /* Send the mail notification */
      axios
        .post(`${this._service}/v1/mail/send`, bodyObj, {
          headers: {
            Authorization: `Bearer ${AuthenticationCtrl.token}`
          }
        })
        .then((response: AxiosResponse) => {
          try {
            /* Try to convert response body to JSON */
            JSON.parse(response.data);
            resolve();
          } catch {
            reject({
              boError: ERRORS.UNKNOWN_MAIL_SERVER_ERROR,
              boStatus: HTTP_STATUS.HTTP_4XX_FORBIDDEN
            });
            return;
          }
        })
        .catch((err: AxiosError) => {
          if (Objects.get(err, "response.data.error", null)) {
            return reject({
              boStatus: err.response.status,
              boError: {
                value: Objects.get(err, "response.data.error", SERVER_ERRORS.UNKNOWN_ERROR.value),
                str: Objects.get(err, "response.data.description", SERVER_ERRORS.UNKNOWN_ERROR.str)
              },
              boData: Objects.get(err, "response.data.data", null)
            });
          }

          reject({
            boError: ERRORS.UNKNOWN_MAIL_SERVER_ERROR,
            boStatus: HTTP_STATUS.HTTP_4XX_FORBIDDEN
          });
        });
    });
  }

  public attachmentFromFile(filepath: string, filename?: string): IMailAttachment {
    const fileBuff = fs.readFileSync(filepath);
    return {
      filename: filename || basename(filepath),
      content: fileBuff.toString("base64"),
      encoding: "base64"
    };
  }
}

export const MailCtrl: Mails = Mails.shared;
