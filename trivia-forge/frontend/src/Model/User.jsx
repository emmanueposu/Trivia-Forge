export class User {
    constructor(id, date, email, password, profilePic) {
        this.id = id;
        this.date = date;
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
            date: this.date,
            email: this.email,
            password: this.password,
            profilePic: this.profilePic
        }
    }
}