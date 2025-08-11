class PasswordValidator {
  constructor() {
    this.minLength = 6;
    this.hasUpperCase = /[A-Z]/;
    this.hasLowerCase = /[a-z]/;
    this.hasNumber = /[0-9]/;
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]|[-_+=]/;
  }

  /**
   * @param {string} password 
   * @returns {{isValid: boolean, validations: object, strength: number}}
   */

  validate(password) {
    const isValidLength = password.length >= this.minLength;
    const hasUpperCase = this.hasUpperCase.test(password);
    const hasLowerCase = this.hasLowerCase.test(password);
    const hasNumber = this.hasNumber.test(password);
    const hasSpecialChar = this.hasSpecialChar.test(password);

    const validations = {
      length: isValidLength,
      uppercase: hasUpperCase,
      lowercase: hasLowerCase,
      number: hasNumber,
      specialChar: hasSpecialChar
    };

    let strength = 0;
    if (isValidLength) strength += 20;
    if (hasUpperCase && hasLowerCase) strength += 20;
    else if (hasUpperCase || hasLowerCase) strength += 10;
    if (hasNumber) strength += 20;
    if (hasSpecialChar) strength += 20;

    if (isValidLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
      strength = 100;
    }

    return {
      isValid: Object.values(validations).every(v => v),
      validations: validations,
      strength: strength
    };
  }

  /**
   * 
   * @param {number} strength 
   * @returns {string} (red, orange, green)
   */

  getStrengthColor(strength) {
    if (strength < 40) return 'red';
    if (strength < 70) return 'orange';
    return 'green';
  }
}

export default new PasswordValidator();