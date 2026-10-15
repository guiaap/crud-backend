export function validateName(name) {

    if(typeof name !== "string") {
        return false;
    }

    const containsNumbers = /\d/.test(name);

    if(!name.trim() || containsNumbers || name.trim().length < 2) {
        return false;
    }

    return true;
}

