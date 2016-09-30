class CarValidator {
    static CheckIfUndefined(value, paramName) {
        paramName = paramName || 'Value';

        if (value === undefined) {
            throw new Error(`${paramName} cannot be undefined!`);
        }
    }

    static CheckStringLength(value, paramName) {
        const STRING_MIN_LENGTH = 1;
        paramName = paramName || 'Value';

        this.CheckIfUndefined(value, paramName);
        if (!value.length || value.length < STRING_MIN_LENGTH) {
            throw new Error(`${paramName} must contain minimum ${STRING_MIN_LENGTH} symbols!`);
        }
    }

    static CheckIfPositiveNumber(value, paramName) {
        paramName = paramName || 'Value';

        this.CheckIfUndefined(value, paramName);

        if (value <= 0) {
            throw new Error(`${paramName} must be positive number!`);
        }
    }

    static CheckYear(value) {
        let paramName = 'Car year param',
            currentYear = new Date().getFullYear();

        this.CheckIfPositiveNumber(value, paramName);

        if (currentYear < paramName) {
            throw new Error(`This car cames from the future? Really?`);
        }
        
    }
}

export { CarValidator };