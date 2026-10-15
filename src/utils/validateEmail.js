export function validateEmail(email) {

    if(typeof email !== "string") {
        return false;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}

