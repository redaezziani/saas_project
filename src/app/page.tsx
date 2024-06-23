import CurvedTabBar from "@/components/dashbaord/dashbaord/slider"
import NavBar from "@/components/home/navbar"

export default function Home() {
    return (
        <section className="relative flex w-full max-w-7xl flex-col items-center justify-center gap-3 overflow-x-hidden">
            <main className="mt-32 flex w-full max-w-7xl items-start justify-center gap-2 p-2">
                <CurvedTabBar />
            </main>
        </section>
    )
}
