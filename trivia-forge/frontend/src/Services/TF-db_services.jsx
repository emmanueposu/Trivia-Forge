import axios from 'axios';
import {User} from '../Models/User';
import {Game} from '../Models/Game';
import {Question} from '../Models/Question';


const API_URL = 'http://localhost:5000';

/* ************************************ User ************************************ */

export const getUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        const { id, username, date, email, password, profilePic } = response.data;
        return new User(id, username, date, email, password, profilePic);
    } catch (error) {
        console.error('Failed to fetch user');
        return [];
    }
}

export const addUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/users`, user.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to add user');
        return [];
    }
}

export const deleteUser = async (User) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${User.id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete user');
        return [];
    }
}

export const updateUser = async (user) => {
    try {
        const response = await axios.put(`${API_URL}/users/${user.id}`, user.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to update user');
        return [];
    }
}

/* ************************************************************************************ */

/* ************************************ Game ************************************ */

export const getGames = async () => {
    try {
        const response = await axios.get(`${API_URL}/games`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch games');
        return [];
    }
}

export const getGame = async (game) => {
    try {
        const response = await axios.get(`${API_URL}/games/${game.id}`);
        const { id, date, name, userID, questions } = response.data;
        return new Game(id, date, name, userID, questions);
    } catch (error) {
        console.error('Failed to fetch game');
        return [];
    }
}

export const addGame = async (game) => {
    try {
        const response = await axios.post(`${API_URL}/games`, game.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to add game');
        return [];
    }
}

export const deleteGame = async (game) => {
    try {
        const response = await axios.delete(`${API_URL}/games/${game.id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete game');
        return [];
    }
}

export const updateGame = async (game) => {
    try {
        const response = await axios.put(`${API_URL}/games/${game.id}`, game.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to update game');
        return [];
    }
}

/* ************************************************************************************ */

/* ************************************ Questions ************************************** */
export const getQuestions = async (category_ids) => {
    try {
        const response = await axios.get(`${API_URL}/questions`);
        let questions = []
        for (let i = 0; i < response.data.length; i++) {
            if (category_ids.has(response.data[i].category_id)) {
                questions.push(response.data[i]);
            };
        };
        return questions;
    } catch (error) {
        console.error('Failed to fetch questions');
        return [];
    }

};

export const getQuestion = async (question) => {
    try {
        const response = await axios.get(`${API_URL}/questions${question.id}`);
        const { id, question, answer, categoryID } = response.data;
        return new Question(id, question, answer, categoryID);
    } catch (error) {
        console.error('Failed to fetch question');
        return [];
    }

};

export const addQuestion = async (question) => {
    try {
        const response = await axios.post(`${API_URL}/questions/${question.id}`, question.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to add question');
        return [];
    }
}

export const deleteQuestion = async (question) => {
    try {
        const response = await axios.delete(`${API_URL}/questions/${question.id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete question');
        return [];
    }
}

export const updateQuestion = async (question) => {
    try {
        const response = await axios.put(`${API_URL}/questions/${question.id}`, question.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to update question');
        return [];
    }
}
/* ************************************************************************************ */

/* ************************************ Categories ************************************ */
export const getCategories = async (game) => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        let categories = []
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].game_id == game.id) {
                categories.push(response.data[i]);
            }
        }
        return categories;
    } catch (error) {
        console.error('Failed to fetch categories');
        return [];
    }
};


export const getCategory = async (category) => {
    try {
        const response = await axios.get(`${API_URL}/category/${category.id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch category');
        return [];
    }
};

export const addCategory = async (category) => {
    try {
        const response = await axios.post(`${API_URL}/categories`, category.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to add category');
        return [];
    }
}

export const deleteCategory = async (category) => {
    try {
        const response = await axios.delete(`${API_URL}/categories/${category.id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete category');
        return [];
    }
}

export const updateCategory = async (category) => {
    try {
        const response = await axios.put(`${API_URL}/categories/${category.id}`, category.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to update category');
        return [];
    }
}

/* ************************************************************************************ */

/* ************************************ Choice ************************************ */

export const getChoices = async () => {
    try {
        const response = await axios.get(`${API_URL}/choices`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch choices');
        return [];
    }
}

export const getChoice = async (choice) => {
    try {
        const response = await axios.get(`${API_URL}/choices/${choice.id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch choice');
        return [];
    }
}

export const addChoice = async (choice) => {
    try {
        const response = await axios.post(`${API_URL}/choices`, choice.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to add choice');
        return [];
    }
}

export const deleteChoice = async (choice) => {
    try {
        const response = await axios.delete(`${API_URL}/choices/${choice.id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete choice');
        return [];
    }
}

export const updateChoice = async (choice) => {
    try {
        const response = await axios.put(`${API_URL}/choices/${choice.id}`, choice.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to update choice');
        return [];
    }
}

/* ************************************************************************************ */