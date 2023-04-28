export { getContactsQuantity } from './contact/getContactsQuantity';
export { getGroupsQuantity } from './getGroupsQuantity';
export { renderIcons } from './renderIcons';
export { getCurrentTime } from './getCurrentTime';
export { getRandomColors } from './getRandomColors';
export { getModalMessage } from './getModalMessage';
export { makeSlug } from './makeSlug';
export { removeExtraWhitespace } from './removeExtraWhitespace';
export { convertHyphenatedString } from './convertHyphenatedString';
export {
  isExistByName,
  isExistByNumber,
  checkForDuplicateContact,
} from './contact/checkContactExistence';
export {
  CONTACT_NAME_VALIDATION_SCHEMA,
  validateContactData,
  validateName,
} from './contact/validation';
export * as Notifications from './notifications';
export { checkContactUpdateSpecialCases } from './contact/checkContactUpdate';
export { getExclusiveContact } from './contact/getExclusiveContact';
export { findGroupsForContact } from './contact/findGroupsForContact';
export { findContactGroupsChanges } from './contact/findContactGroupsChanges';
export { renderDropdownButton } from './renderDropdownButton';
