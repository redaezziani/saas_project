import { create } from "zustand"

interface Plan {
    currentPlan?: string
    isPlanActive: boolean
}

const usePlanStore = create<Plan>()((set) => ({
    currentPlan: "free",
    isPlanActive: false,
    changePlan: (newPlan: string) => set({ currentPlan: newPlan }),
    activatePlan: () => set({ isPlanActive: true }),
    deactivatePlan: () => set({ isPlanActive: false }),
}))

export default usePlanStore
