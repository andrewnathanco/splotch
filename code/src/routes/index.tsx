import { GameProvider } from "../components/game/service";
import { Board, InfoButton } from "../components/board/view";
import { GameInfo } from "../components/game/view";
import { ThemeToggler } from "../util/theme";
import { InfoDialog, InfoDialogProvider } from "../components/info/view";

export default function Home() {
  return (
    <>
      <InfoDialogProvider>
        <GameProvider>
          <main class="p-4 justify-center items-center flex w-full">
            <div class="w-96 flex flex-col space-y-4">
              <div class="flex justify-between items-center">
                <GameInfo />
                <ThemeToggler />
                <InfoButton />
              </div>
              <Board />
              <InfoDialog />
            </div>
          </main>
        </GameProvider>
      </InfoDialogProvider>
    </>
  );
}
