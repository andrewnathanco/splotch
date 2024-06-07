import { Signal, createEffect, createSignal, mapArray } from "solid-js";
import {
  GameProvider,
  gamekey,
  today,
  useGame,
} from "../components/game/service";
import { Meta } from "@solidjs/meta";
import {
  Colors,
  Guesses,
  Correct,
  ShareButton,
  SubmitButton,
  Buttons,
  Board,
} from "../components/board/view";
import { GameInfo } from "../components/game/view";
import { Theme, ThemeToggler, getThemeIcon } from "../util/theme";

export default function Home() {
  const [game, setGame] = useGame();

  createEffect(() => {
    if (game.gamekey && game.gamekey != gamekey()) {
      localStorage.removeItem("splotch_game");
      setGame(today(gamekey()));
    }
  });

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
