export const STATE_REGEX = /^\w{2}$/g;

export const ZIP_REGEX = /[0-9]{5}/g;

export const FEIN_REGEX = /^\d{2}-\d{7}$/g;

export const YEAR_REGEX = /^\d{4}$/g;

export const PERCENTAGE_REGEX = /^(\d)+(\.(\d)+)?%$/g;

export const PHONE_REGEX = /\((\d{3})\)\s\d{3}-\d{4}/g;

export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const WEBSITE_REGEX =
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
