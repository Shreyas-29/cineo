import { create } from "zustand";

interface SessionIdStore {
    sessionId: string;
    setSessionId: (sessionId: string) => void;
}

const useSessionId = create<SessionIdStore>((set) => ({
    sessionId: "",
    setSessionId: (sessionId) => set({ sessionId }),
}));

export default useSessionId;
