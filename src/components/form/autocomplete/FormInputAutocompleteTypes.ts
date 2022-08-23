export interface FormInputAutocomplete {
  /** always valid */
  section?: string;

  /** always valid */
  context?: FormInputContextTypes;

  /** mutually exclusive with {@link FormInputAutocomplete.field} */
  type?: FormInputAutocompleteTypes;

  /** mutually exclusive with {@link FormInputAutocomplete.type} */
  field?: FormInputAutocompleteFields;
  /** mutually exclusive with {@link FormInputAutocomplete.type} */
  dataType?: FormInputAutocompleteFieldDataTypes;

  webauthn?: boolean;
}

/**
 * @see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute
 */
export const enum FormInputAutocompleteTypes {
  //#region PII
  //#region Name
  /**
   * Full name, including prefix and suffix.
   * @example Sir Tim Berners-Lee, OM, KBE, FRS, FREng, FRSA
   */
  NAME = "name",
  /**
   * Prefix or title.
   * @example Sir, Mrs, Dr., etc.
   */
  HONORIFIC_PREFIX = "honorific-prefix",
  /**
   * Given name / first name.
   * @example Timothy
   */
  GIVEN_NAME = "given-name",
  /**
   * Middle name.
   * @example John
   */
  ADDITIONAL_NAME = "additional-name",
  /**
   * Family name / last name / surname.
   * @example Berners-Lee
   */
  FAMILY_NAME = "family-name",
  /**
   * Suffix, such as Jr., III, B.Sc, etc.
   * @example OM, KBE, FRS, FREng, FRSA
   */
  HONORIFIC_SUFFIX = "honorific-suffix",
  /**
   * Nickname, screen name, etc.
   * @example Tim
   */
  NICKNAME = "nickname",
  /**
   * Job title.
   * @example Chief Executive Officer
   * @example Software Engineer
   */
  ORGANIZATION_TITLE = "organization-title",
  //#endregion
  //#region Accounts
  /**
   * A username.
   * @example timbl
   */
  USERNAME = "username",
  /**
   * New password, e.g. when creating an account or changing a password.
   * @example xD8rk3y
   */
  NEW_PASSWORD = "new-password",
  /**
   * Current password, e.g. when logging in.
   * @example xD8rk3y
   */
  CURRENT_PASSWORD = "current-password",
  /**
   * One-time code used for verifying user identity
   * @example 123456
   */
  ONE_TIME_CODE = "one-time-code",
  //#endregion
  /**
   * Company or organization name.
   * @example World Wide Web Consortium
   */
  ORGANIZATION = "organization",
  LANGUAGE = "language",
  /**
   * eg. 1955-06-08
   */
  BDAY = "bday",
  BDAY_DAY = "bday-day",
  BDAY_MONTH = "bday-month",
  BDAY_YEAR = "bday-year",
  SEX = "sex",
  /**
   * Homepage
   */
  URL = "url",
  /**
   * Photo relating to the user
   */
  PHOTO = "photo",
  //#region Telephone
  TEL = "tel",
  TEL_COUNTRY_CODE = "tel-country-code",
  TEL_NATIONAL = "tel-national",
  TEL_AREA_CODE = "tel-area-code",
  TEL_LOCAL = "tel-local",
  TEL_LOCAL_PREFIX = "tel-local-prefix",
  TEL_LOCAL_SUFFIX = "tel-local-suffix",
  TEL_EXTENSION = "tel-extension",
  //#endregion
  EMAIL = "email",
  IMPP = "impp",
  //#region Address
  STREET_ADDRESS = "street-address",
  ADDRESS_LINE1 = "address-line1",
  ADDRESS_LINE2 = "address-line2",
  ADDRESS_LINE3 = "address-line3",
  ADDRESS_LEVEL4 = "address-level4",
  ADDRESS_LEVEL3 = "address-level3",
  ADDRESS_LEVEL2 = "address-level2",
  ADDRESS_LEVEL1 = "address-level1",
  COUNTRY = "country",
  COUNTRY_NAME = "country-name",
  POSTAL_CODE = "postal-code",
  //#endregion
  //#endregion
  //#region Transactions
  //#region Credit Card
  CC_NAME = "cc-name",
  CC_GIVEN_NAME = "cc-given-name",
  CC_ADDITIONAL_NAME = "cc-additional-name",
  CC_FAMILY_NAME = "cc-family-name",
  CC_NUMBER = "cc-number",
  CC_EXP = "cc-exp",
  CC_EXP_MONTH = "cc-exp-month",
  CC_EXP_YEAR = "cc-exp-year",
  CC_CSC = "cc-csc",
  CC_TYPE = "cc-type",
  //#endregion
  /**
   * The currency that the user would prefer the transaction to use
   */
  TRANSACTION_CURRENCY = "transaction-currency",
  /**
   * The amount that the user would like for the transaction (e.g. when entering a bid or sale price)
   */
  TRANSACTION_AMOUNT = "transaction-amount",
  //#endregion
}

export const enum FormInputContextTypes {
  SHIPPING = "shipping",
  BILLING = "billing",
}

export const enum FormInputAutocompleteFields {
  HOME = "home",
  WORK = "work",
  MOBILE = "mobile",
  FAX = "fax",
  PAGER = "pager",
}

export const enum FormInputAutocompleteFieldDataTypes {
  TEL = "tel",
  TEL_COUNTRY_CODE = "tel-country-code",
  TEL_NATIONAL = "tel-national",
  TEL_AREA_CODE = "tel-area-code",
  TEL_LOCAL = "tel-local",
  TEL_LOCAL_PREFIX = "tel-local-prefix",
  TEL_LOCAL_SUFFIX = "tel-local-suffix",
  TEL_EXTENSION = "tel-extension",
  EMAIL = "email",
  IMPP = "impp",
}
