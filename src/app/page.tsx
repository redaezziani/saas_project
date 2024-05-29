import NavBar from "@/components/home/navbar";

export default function Home() {
  return (
    <section
    className=" w-full max-w-7xl overflow-x-hidden flex relative flex-col gap-3 justify-center items-center"
    >
      <NavBar />
      <main className="w-full mt-32 p-2 max-w-7xl flex justify-center items-start gap-2">
      </main>
    </section>
  );
}
