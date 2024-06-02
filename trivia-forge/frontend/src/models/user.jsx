export class User {
    constructor(date, email, password, username, profilePic = null) {
        // this.id = null;
        this.username = username;
        this.email = email;
        this.password = password;
        // this.profilePic = null;
        this.games = [];
    }

    addGame(game) {
        this.games.push(game);
    }
    toJsonObject() {
        return {
            // id: this.id,
            username: this.username,
            email: this.email,
            password: this.password,
            // profilePic: this.profilePic
        }
    }
}
