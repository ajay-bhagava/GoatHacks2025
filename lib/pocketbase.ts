import PocketBase from 'pocketbase';

const pb = new PocketBase("https://wpimarketplace.fly.dev/");

export const createUser = async (password, passwordConfirm, email) => {
    const data = {
        "password": password,
        "passwordConfirm": passwordConfirm,
        "email": email,
        "emailVisibility": true,
    };
    const record = await pb.collection('users').create(data);
    const authData = await pb.collection('users').authWithPassword(
        email,
        password,
    );
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
    try {
        const data = new FormData();
        data.append("Title", title);
        data.append("Description", description);
        data.append("Account", pb.authStore.record!.id);
        data.append("Price", price);
        data.append("Tags", tags);

        images.forEach(image => {
            data.append('Images', image);
        });

        const record = await pb.collection('Post').create(data);

        await pb.collection('users').update(pb.authStore.record!.id, {
            "Posts": pb.authStore.record?.Posts ? [...pb.authStore.record.Posts, record.id] : [record.id]
        });

        return record;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

export const getPosts = async () => {
    const records = await pb.collection('Post').getFullList({
        expand: "Account",
    });
    console.log(records);
    return records;
}

export const getPostsForUser = async (signal ?: AbortSignal) => {
    const userId = pb.authStore.record?.id;
    const records = await pb.collection('Post').getFullList({
        filter: `Account = '${userId}'`,
        expand: "Account",
    });
    console.log(records);

    return records;
}

export const getPostByID = async (id: any) => {
    return await pb.collection("Post").getOne(id)
}

export const getSavedPosts = async () => {
    const userId = pb.authStore.record?.id;
    const records = await pb.collection('users').getFullList({
        filter: 'id != "${userId}"',
        expand: 'Saved',
    });

    return records;
}

export default pb;
