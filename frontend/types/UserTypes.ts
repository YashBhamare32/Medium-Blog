export type UserType ={
    username: string;
    password: string;
    name: string;
}
export type SigninType ={ 
    username: string;
    password: string;
}

export type PostType = {
    id: string;
    title: string;
    content: string;
    publishedDate: Date;
    published: Boolean;
    authorId: string;
    user: UserType;
}