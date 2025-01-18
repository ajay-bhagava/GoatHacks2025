import PocketBase from 'pocketbase';

const pb = new PocketBase("https://wpimarketplace.fly.dev/");

export const createUser = async (password, passwordConfirm, email) => {
    const data = {
        "password": password,
        "passwordConfirm": passwordConfirm,
        "email": email,
    };
    const record = await pb.collection('users').create(data);
    return record;
}

export const loginUser = async (email, password) => {
    const authData = await pb.collection('users').authWithPassword(
        email,
        password,
    );
    return authData;
}

export const logoutUser = async () => {
    await pb.authStore.clear();
}



export default pb;
