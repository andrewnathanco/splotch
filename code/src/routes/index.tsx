import { GameProvider } from "../components/game/service";
import { Board } from "../components/board/view";
import { GameInfo } from "../components/game/view";
import { ThemeToggler } from "../util/theme";

export default function Home() {
  return (
    <>
      <GameProvider>
        <main class="p-4 justify-center items-center flex w-full">
          <div class="w-96 flex flex-col space-y-4">
            <div class="flex justify-between items-center">
              <GameInfo />
              <ThemeToggler />
            </div>
            <Board />
          </div>
        </main>
      </GameProvider>
    </>
  );
}
