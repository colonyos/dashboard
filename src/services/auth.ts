import { removeWindowClass } from '@app/utils/helpers';

export const loginByAuth = async (email: string, password: string) => {
    console.log(email)
    console.log(password)
    if (email != "admin@colonyos.io" || password != "admin") {
        console.log("failed to login")
        throw "failed to login"
    }

    const token = "hej3"
    return token;
};
