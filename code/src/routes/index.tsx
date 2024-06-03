import { Signal, createEffect, createSignal, mapArray } from "solid-js";
import {
  GameProvider,
  gamekey,
  today,
  useGame,
} from "../components/game/service";
import { Meta } from "@solidjs/meta";
import { Board, SubmitButton } from "../components/board/view";
import { GameInfo } from "../components/game/view";
import { Theme, ThemeToggler, getThemeIcon } from "../util/theme";

const boardSize = 16;

export default function Home() {
  const [noise, setNoise] = createSignal(0.1);
  const [game, setGame] = useGame();

  return (
    <>
      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0"
      />
      <GameProvider>
        <main class="p-4 justify-center items-center flex w-full">
          <div class="w-96 flex flex-col space-y-4">
            <div class="flex justify-between items-center">
              <GameInfo />
              <ThemeToggler />
            </div>
            {/* <input
          type="number"
          id="number-input"
          aria-describedby="helper-text-explanation"
          value={noise()}
          onChange={(e) => {
            setGameState(
              options(
                getGameKey(),
                numCorrect(),
                boardSize,
                parseFloat(e.target.value)
              )
            );
          }}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        /> */}
            <Board />
            <SubmitButton />
          </div>
        </main>
      </GameProvider>
    </>
  );
}
