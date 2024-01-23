import { create } from 'zustand';

interface WatchlistStore {
    watchlist: string[];
    setWatchlist: (watchlist: string[]) => void;
}

const useWatchlist = create<WatchlistStore>((set) => ({
    watchlist: [],
    setWatchlist: (watchlist) => set({ watchlist }),
}));

export default useWatchlist;
