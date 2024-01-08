import usersDB from "../../models/userSchema";

function typeGuard(user: Object) {
    if ('username' in user) {
        return user.username
    }
}

export const createUser = async (user: Object) => {
    try {
        const username = typeGuard(user);
        const isAlreadyAdd = await usersDB.findOne({ username: username })
        if (isAlreadyAdd) {
            throw {
                status: 400,
                message: `'${username}' already exists`
            };
        }
        const newUser = await usersDB.create(user);
        return newUser
    }
    catch (err:any) {
        console.error(err);
        throw { status: err?.status || 500, message: err?.message || err }
    }
}

export const findOne = async (username: string) => {
    try{
        let user = await usersDB.findOne({ username: username })
        return user
    }catch(err){
        throw err
    }

}