import axios from 'axios';
import User from '../Models/User';
import Game from '../Models/Game';

const API_URL = 'http://localhost:5000/api';

/* ************************************ User ************************************ */

export const getUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`);
        const { id, date, email, password, profilePic } = response.data;
        return new User(id, date, email, password, profilePic);
    } catch (error) {
        console.error('Failed to fetch user');
        return [];
    }
}

export const addUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/user`, user.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to add user');
        return [];
    }
}

export const deleteUser = async (User) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${User.id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete user');
        return [];
    }
}

export const updateUser = async (user) => {
    try {
        const response = await axios.put(`${API_URL}/user/${user.id}`, user.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to update user');
        return [];
    }
}

/* ************************************************************************************ */

/* ************************************ Game ************************************ */

export const getGame = async () => {
    try {
        const response = await axios.get(`${API_URL}/game`);
        const { id, date, name, userID, questions } = response.data;
        return new Game(id, date, name, userID, questions);
    } catch (error) {
        console.error('Failed to fetch game');
        return [];
    }
}

export const addGame = async (game) => {
    try {
        const response = await axios.post(`${API_URL}/game`, game.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to add game');
        return [];
    }
}

export const deleteGame = async (game) => {
    try {
        const response = await axios.delete(`${API_URL}/game/${game.id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete game');
        return [];
    }
}

export const updateGame = async (game) => {
    try {
        const response = await axios.put(`${API_URL}/game/${game.id}`, game.toJsonObject());
        return response.data;
    } catch (error) {
        console.error('Failed to update game');
        return [];
    }
}

/* ************************************************************************************ */

/* ************************************ Questions ************************************** */
export const getQuestions = async () => {
    try {
        const response = await axios.get(`${API_URL}/questions`);
        const { id, question, answer, categoryID } = response.data;
        return new Question(id, question, answer, categoryID);
    } catch (error) {
        console.error('Failed to fetch questions');
        return [];
    }

};

export const addQuestion = async (question) => {
    try {
        const response = await axios.post(`${API_URL}/questions`, question.toJsonObject());
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
export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch categories');
        return [];
    }
};

export const addCategory = async (category) => {
    try {
        const response = await axios.post(`${API_URL}/categories`, category);
        return response.data;
    } catch (error) {
        console.error('Failed to add category');
        return [];
    }
}

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`${API_URL}/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete category');
        return [];
    }
}

export const updateCategory = async (categoryId, category) => {
    try {
        const response = await axios.put(`${API_URL}/categories/${categoryId}`, category);
        return response.data;
    } catch (error) {
        console.error('Failed to update category');
        return [];
    }
}

/* ************************************************************************************ */

/* ************************************ Choice ************************************ */

export const getChoice = async () => {
    try {
        const response = await axios.get(`${API_URL}/choice`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch choice');
        return [];
    }
}

export const addChoice = async (choice) => {
    try {
        const response = await axios.post(`${API_URL}/choice`, choice);
        return response.data;
    } catch (error) {
        console.error('Failed to add choice');
        return [];
    }
}

export const deleteChoice = async (choiceId) => {
    try {
        const response = await axios.delete(`${API_URL}/choice/${choiceId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete choice');
        return [];
    }
}

export const updateChoice = async (choiceId, choice) => {
    try {
        const response = await axios.put(`${API_URL}/choice/${choiceId}`, choice);
        return response.data;
    } catch (error) {
        console.error('Failed to update choice');
        return [];
    }
}

/* ************************************************************************************ */