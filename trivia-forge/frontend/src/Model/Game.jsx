export class Game {
    constructor(name, date, userID = null) {
        this.id = null;
        this.name = name;
        this.categories = [];
        this.userID = userID;
    }

    addCategory(category) {
        this.categories.push(category);
    }

    toJsonObject() {
        return {
            id: this.id,
            name: this.name,
            userID: this.userID
        }
    }
}