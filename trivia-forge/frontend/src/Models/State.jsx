import { create } from 'zustand';

const useStore = create((set) => ({
    currentUser: null,
    userGames: [],
    currentGame: null,

    setCurrentUser: (user) => set({ currentUser: user }),
    setUserGames: (games) => set({ userGames: games }),
    setCurrentGame: (game) => set({ currentGame: game }),

    addGame: (game) => set((state) => ({
        userGames: [...state.userGames, game],
    })),
    updateGame: (game) => set((state) => ({
        userGames: state.userGames.map((g) => {
            if (g.id === game.id) {
                return game;
            }
            return g;
        }),
    })),
    deleteGame: (game) => set((state) => ({
        userGames: state.userGames.filter((g) => g.id !== game.id),
    })),
}));


export default useStore;