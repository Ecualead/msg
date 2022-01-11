/**
 * Copyright (C) 2020-2022 ECUALEAD
 * All Rights Reserved
 * Author: Reinier Millo Sánchez <rmillo@ecualead.com>
 *
 * This file is part of the ECUALEAD Message Server API.
 * It can't be copied and/or distributed without the express
 * permission of the author.
 */

/**
 * Predefined errors
 */
export const ERRORS = {
  UNKNOWN_MAIL_SERVER_ERROR: {
    value: 1500,
    str: "unknown-mail-server-error"
  },
  NOT_AUTHORIZED: {
    value: 1501,
    str: "not-authorized"
  },
  INVALID_MAIL_TEMPLATE: {
    value: 1520,
    str: "invalid-mail-template"
  },
  INVALID_MAIL_SETTINGS: {
    value: 1521,
    str: "invalid-mail-settings"
  },
  INVALID_MAIL_SERVER: {
    value: 1522,
    str: "invalid-mail-server"
  },
  INVALID_MAIL_DATA: {
    value: 1523,
    str: "invalid-mail-data"
  },
  MAIL_SERVER_ERROR: {
    value: 1524,
    str: "mail-server-error"
  },
};
