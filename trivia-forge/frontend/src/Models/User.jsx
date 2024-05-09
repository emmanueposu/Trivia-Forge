import datetime from 'node-datetime';
export class User {
    constructor(date, email, password, profilePic = null) {
        this.id = null;
        this.email = email;
        this.password = password;
        this.profilePic = profilePic;
        this.games = [];
    }

    addGame(game) {
        this.games.push(game);
    }
    toJsonObject() {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            profilePic: this.profilePic
        }
    }
}