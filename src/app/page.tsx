import Elevador from "./components/Elevador"
import ResetButton from "./components/ResetButton"

export default function Home() {
  return (
    <main className="flex flex-col gap-4 max-w-lg m-auto my-8">
      <h1 className="text-4xl text-neutral-600 text-center font-bold">🛗 Elevador</h1>
      <ResetButton />
      <Elevador />
    </main>
  )
}
