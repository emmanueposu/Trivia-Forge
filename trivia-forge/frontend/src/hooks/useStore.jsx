import { create } from 'zustand'; // gloabal state management solution 

// Function to save state to local storage
const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Function to get state from local storage
const getFromLocalStorage = (key) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
};

const useStore = create((set) => ({
    currentUser: getFromLocalStorage('currentUser'), // initialize current user from local storage 
    userGames: getFromLocalStorage('userGames') || [], // initialize user games if null set empty array
    setCurrentUser: (user) => {
        saveToLocalStorage('currentUser', user);
        set({ currentUser: user });
    },
    setUserGames: (games) => {
        saveToLocalStorage('userGames', games);
        set({ userGames: games });
    },
    addGame: (game) => set((state) => {
        const updatedGames = [...state.userGames, game]; // add new game to userGames state
        saveToLocalStorage('userGames', updatedGames); // save updated game list
        return { userGames: updatedGames }; // return updated game state
    }),
    updateGame: (updatedGame) => set((state) => {
        const updatedGames = state.userGames.map((game) =>
            game.id === updatedGame.id ? updatedGame : game
        );
        saveToLocalStorage('userGames', updatedGames);
        return { userGames: updatedGames };
    }),
    logout: () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userGames');
        set({ currentUser: null, userGames: [] });
    },
}));

export default useStore;