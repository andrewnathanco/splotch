import { createEffect } from "solid-js";
import { useGame } from "../game/service";
import { animate } from "motion";

export function Board() {
  const [game, setGame] = useGame();

  return (
    <>
      <div
        style={{ "background-color": game.color }}
        class="w-full rounded-md h-24"
      ></div>
      <div class="w-full flex flex-col items-center">
        <ul class="flex flex-wrap gap-2 w-full justify-center">
          {game.all?.map((color) => {
            const isSelected = game.selected.includes(color);
            const canSelect = game.selected.length < game.numcorrect;

            return (
              <li
                onClick={() => {
                  if (isSelected) {
                    setGame(
                      "selected",
                      game.selected.filter((col) => col != color)
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
                style={{ "background-color": color }}
                classList={{
                  "shrink-lg": !!game.selected.length && !isSelected,
                }}
                class="li h-20 w-20 rounded-md cursor-pointer"
                id={`c${color.substring(1)}`}
              ></li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export function SubmitButton() {
  const [game, setGame] = useGame();

  const canSubmit = () => game.selected?.length == game.numcorrect;

  return (
    <div class="w-full">
      <button
        onClick={() => {
          game.selected.forEach((color) => {
            let animation = animate(`#c${color.substring(1)}`, {
              backgroundColor: game.ingredients.includes(color)
                ? "green"
                : "red",
            });

            setTimeout(() => {
              console.log("stopping");
              animation.cancel();
            }, 1000);
          });
        }}
        disabled={!canSubmit()}
        classList={{
          "bg-gray-800 dark:bg-white": canSubmit(),
          "bg-gray-500 dark:bg-gray-400": !canSubmit(),
        }}
        class="w-full rounded-md p-4 text-gray-100 dark:text-black"
      >
        Submit ({game.selected?.length} of {game.numcorrect})
      </button>
    </div>
  );
}
