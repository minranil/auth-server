export function validateEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

export function validatePassword(password, min = 8, max = 256) {
    const passwordRegex = new RegExp(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${min},${max}}$`);
    return passwordRegex.test(password);
}

export function validateName(name, min = 0, max = 256) {
    return typeof name === 'string'
        && name.length > min
        && name.length < max;
}