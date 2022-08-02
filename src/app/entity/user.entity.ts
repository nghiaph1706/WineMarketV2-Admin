export class User{
    id: string;
    username: string;
    password: string;
    email: string;
    image: string;
    role: boolean;

    constructor(id: string, username: string, password: string, email: string, image: string, role: boolean){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.image = image;
        this.role = role;
    }
}