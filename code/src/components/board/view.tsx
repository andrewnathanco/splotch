import { Motion } from "solid-motionone";
import { mix } from "../../util/colors";
import { useGame } from "../game/service";
import { animate } from "motion";

export function Board() {
  const [game, setGame] = useGame();

  return (
    <>
      <div class="flex flex-col space-y-2">
        <div
          style={{ "background-color": game?.color }}
          class="w-full rounded-md h-24"
        ></div>
        {game?.correct?.length >= 1 ? <Correct /> : <></>}
      </div>
      <div class="w-full flex flex-col items-center">
        <ul class="flex flex-wrap gap-2 w-full justify-center">
          {game.all?.map((color) => {
            const isSelected = game?.selected?.includes(color);
            const isCorrect = game.correct?.includes(color);
            const gameOver = game?.guesses?.find(
              (guess) => guess == game.numcorrect
            );
            const canSelect = game.selected?.length < game.numcorrect;

            return (
              <li
                onClick={() => {
                  if (gameOver) {
                    return;
                  }

                  if (isSelected) {
                    setGame(
                      "selected",
                      game.selected?.filter((col) => col != color)
                    );
                    return;
                  }

                  if (!canSelect) {
                    return;
                  }

                  if (!isSelected) {
                    setGame("selected", [color, ...game.selected]);
                    return;
                  }
                }}
                style={{
                  "background-color": isCorrect ? "transparent" : color,
                  "border-color": isCorrect ? color : "transparent",
                }}
                classList={{
                  "cursor-pointer": !gameOver,
                  "shrink-lg": !!game.selected?.length && !isSelected,
                }}
                class="h-20 w-20 cursor-pointer color border-8 rounded-md"
                id={`c${color.substring(1)}`}
              ></li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export function Correct() {
  const [game, setGame] = useGame();

  const color = () => mix(game.correct || "");

  return (
    <div
      style={{ "background-color": color() }}
      class="h-12 w-full rounded-md"
    ></div>
  );
}

export function Guesses() {
  const [game, setGame] = useGame();
  return (
    <ul class="flex space-x-2 justify-center">
      {game.guesses?.map((guess) => {
        return (
          <li
            class="h-6 w-4 rounded-full"
            classList={{
              "dark:bg-green-500 bg-green-700": guess == game.numcorrect,
              "dark:bg-red-500 bg-red-700": guess == 0,
              "dark:bg-yellow-500 bg-yellow-600":
                guess >= 1 && guess < game.numcorrect,
            }}
          ></li>
        );
      })}
    </ul>
  );
}

export function Guess() {
  return <div class="h-4 w-4 bg-gray-500 rounded-full"></div>;
}

export function Buttons() {
  const [game, setGame] = useGame();

  const gameOver = () => !!game.guesses?.find((g) => g == game.numcorrect);

  return <>{gameOver() ? <ShareButton /> : <SubmitButton />}</>;
}

export function ShareButton() {
  const [game, setGame] = useGame();

  return (
    <div class="w-full">
      <button
        onClick={() => {}}
        class="w-full rounded-md p-4 text-gray-100 dark:text-black dark:bg-green-600 bg-green-800"
        id="submit"
      >
        Share
      </button>
    </div>
  );
}

export function SubmitButton() {
  const [game, setGame] = useGame();

  const canSubmit = () => game?.selected?.length == game.numcorrect;

  return (
    <div class="w-full">
      <button
        onClick={() => {
          let correct = 0;
          game?.selected?.forEach((color) => {
            if (game?.ingredients.includes(color)) {
              if (!game.correct.includes(color)) {
                setGame("correct", [...game?.correct, color]);
              }

              correct++;
            }
          });

          setGame("guesses", [...game?.guesses, correct]);
        }}
        disabled={!canSubmit()}
        classList={{
          "bg-gray-800 dark:bg-white": canSubmit(),
          "bg-gray-500 dark:bg-gray-400": !canSubmit(),
        }}
        class="w-full rounded-md p-4 text-gray-100 dark:text-black"
        id="submit"
      >
        Submit ({game.selected?.length} of {game?.numcorrect})
      </button>
    </div>
  );
}
