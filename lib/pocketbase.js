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

export const createPost = async (title, description, price, images, tags) => {
    const data = {
        "Title": title,
        "Description": description,
        "Account": pb.authStore.record.id,
        "Price": price,
        "Images": [],
        "Tags": [],
    };

    const record = await pb.collection('Post').create(data);
    const userUpdate = await pb.collection('users').update(pb.authStore.record.id, {
        "Posts": pb.authStore.record.Posts ? [...pb.authStore.record.Posts, record.id] : [record.id]
    });

    return userUpdate;
}

export const getPosts = async () => {
    const records = await pb.collection('Post').getFullList({
        sort: 'created',
    });
    
    return records;
}

export default pb;
