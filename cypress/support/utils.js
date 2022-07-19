import faker from '@faker-js/faker';

export function generatedNewUser(userValid) {

    userValid.name = faker.name.firstName();
    userValid.lastname = faker.name.lastName();
    userValid.email = faker.internet.email();
    userValid.password = faker.internet.password();
    return userValid;
}
export function generatedRandomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz  ';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}



export function generatedRandomInvalidString(length) {
    let result = '';
    let characters = '!@#$%¨&*()@##$¹²³£¹²³£¬';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


export function generatedEmailAddress(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result + "@email.com";
}