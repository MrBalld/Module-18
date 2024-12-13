
import {type BookDocument} from "../models/Book.js"


export default interface IUserDocuments {
    id: string;
    username: string;
    email: string;
    password: string;
    savedBooks: BookDocument[];
    isCorrectPassword(password: string): Promise<boolean>;
    bookCount: number;
}


// export interface UserDocument extends Document {
//     id: string;
//     username: string;
//     email: string;
//     password: string;
//     savedBooks: BookDocument[];
//     isCorrectPassword(password: string): Promise<boolean>;
//     bookCount: number;
//   }