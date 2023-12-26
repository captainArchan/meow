import registerDB from '../../models/userSchema';

export const createUser = async(user: Object) =>{
    try{
        await registerDB.create(user);
        return user
    }
    catch(err){
        console.log(err)
    }
}

export const findOne = async (username: string) =>{
    let user = await registerDB.findOne({ username: username })
    return user
}