// w3c regex
const validateEmailDefault = (value: string) =>
  /^[\w!#$%&*+./=?^`{|}~’-]+@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*$/.test(value) || 'Enter valid email';

const validateNumDefault = (value: string) =>
  (!Number.isNaN(Number.parseFloat(value)) && Number.isFinite(Number(value))) ||
  'Enter correct number (12.345)';

const validatePassDefault = (value: string) =>
  (value.length > 6 && value.length < 24 && /^[\w!#$%&*@^-]+$/.test(value)) ||
  'Enter valid password (6-24 chars [A-Za-z0-9!@#$%^&*_-])';

export { validateEmailDefault, validateNumDefault, validatePassDefault };
