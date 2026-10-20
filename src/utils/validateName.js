function validateName(name) {

    if(typeof name !== "string") {
        return false;
    }

    const containsNumbers = /\d/.test(name);

    if(containsNumbers || name.trim().length < 2) {
        return false;
    }

    return true;
}

export default validateName;


