import { IUserDocument } from "../Interfaces/UserDocument.js";
import {IBookInput} from "../Interfaces/BookInput.js";
import {User} from  "../models/index.js";
import {IUserContext} from "../Interfaces/UserContext.js"
import { signToken, AuthenticationError } from "../services/auth.js";

const resolvers = {
    Query: {
        me: async(_parent: any, _args: any, context: IUserContext): Promise<IUserDocument | null> => {
            if(context.user){
                const userInfo = await User.findOne({_id: context.user._id}).select("-__v -password");
                return userInfo;
            }
            throw new AuthenticationError("USERNOTAUTHENTICATED");
        }
    },
    Mutation:{
        login: async(_parent: any, {email, password}: {email: string; password: string}): Promise<{token: string; user: IUserDocument}> => {
            const user = await User.findOne({email});
            if(!user || user.isCorrectPassword(password)){
                throw new AuthenticationError("Invalid credentials")
            }
            const token = signToken(user.username, user.email, user._id);
            return {token, user}
        }
    }
};


export default resolvers;