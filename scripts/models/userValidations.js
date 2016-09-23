class UserValidator {
    static validateIfUndefined(value) {
        if (value === undefined) {
            return true;
        }

        return false;
    }

    static validateStringLength(value, minLength) {
        if (typeof value !== 'string' || value.length < minLength) {
            return true;
        }

        return false;
    }

    static validateName(name, paramName) {
        paramName = paramName || 'Value';

        if (this.validateIfUndefined(name)) {
            throw new Error(`${paramName} cannot be undefined!`);
        }

        if (this.validateStringLength(name, 2)) {
            throw new Error(`${paramName} must be a string with minimum 2 letters!`);
        }

        if (!/^[a-zA-Z]+$/.test(name)) {
            throw new Error(`${paramName} can only contain latin letters!`);
        }
    }

    static validatePassword(value) {
        if (this.validateIfUndefined(value)) {
            throw new Error(`User password cannot be undefined!`);
        }

        if (this.validateStringLength(value, 40)) {
            throw new Error(`Password must be a string with minimum 40 symbols!`);
        }
    }
}

export {UserValidator};