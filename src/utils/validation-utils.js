import { isEmpty } from "lodash";

const validationUtils = {
    validateEmail: (email) => {
        if (isEmpty(email?.trim()) || typeof email !== 'string') return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

export default validationUtils;