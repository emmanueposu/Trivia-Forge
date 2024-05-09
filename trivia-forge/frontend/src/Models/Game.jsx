export class Game {
    constructor(name, theme, userID = null) {
        this.id = null;
        this.name = name;
        this.theme = theme;
        this.categories = [];
        this.userID = userID;
    }

    addCategory(category) {
        this.categories.push(category);
    }

    toJsonObject() {
        return {
            name: this.name,
            theme: this.theme,
            userID: this.userID
        }
    }
}