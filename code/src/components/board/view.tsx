import { mix } from "../../util/colors";
import { Game, useGame } from "../game/service";
import { useInfoDialog } from "../info/view";

export function Board() {
  const [game, _] = useGame();
  return (
    <div class="flex flex-col space-y-4">
      <div class="flex space-x-2">
        <div
          style={{ "background-color": game?.color }}
          class="flex-1 w-full rounded-md h-24"
        ></div>
        {game?.correct?.length >= 1 ? <Correct /> : <></>}
      </div>
      <Colors />
      {game.guesses.length == 0 ? <></> : <Guesses />}
      <Buttons />
    </div>
  );
}
export function Colors() {
  const [game, setGame] = useGame();

  return (
    <div class="flex flex-col space-y-4">
      <div class="w-full flex flex-col items-center">
        <ul class="flex flex-wrap gap-2 w-full justify-center">
          {game.all?.map((color) => {
            const isSelected = game?.selected?.includes(color);
            const isCorrect = game.correct?.includes(color);
            const wasChosen = game.chosen?.includes(color);

            const gameOver =
              game?.guesses?.find((guess) => guess == game.numcorrect) ||
              game?.guess == game.allowedguesses;
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
                  "rounded-full": wasChosen,
                  "rounded-md": !wasChosen,
                  "cursor-pointer": !gameOver,
                  "shrink-lg": !!game.selected?.length && !isSelected,
                }}
                class="h-20 w-20 cursor-pointer color border-8"
                id={`c${color.substring(1)}`}
              ></li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function Correct() {
  const [game, setGame] = useGame();

  const color = () => mix(game.correct || "");

  return (
    <div style={{ "background-color": color() }} class="w-24 rounded-md"></div>
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
              "dark:bg-dove-300 bg-dove-500": guess == -1,
              "dark:bg-killarney-500 bg-killarney-700":
                guess == game.numcorrect,
              "dark:bg-thorns-500 bg-thorns-700": guess == 0,
              "dark:bg-energy-500 bg-energy-600":
                guess >= 1 && guess < game.numcorrect,
            }}
          ></li>
        );
      })}
    </ul>
  );
}

export function Buttons() {
  const [game, _] = useGame();

  const gameOver = () =>
    !!game.guesses?.find((g) => g == game.numcorrect) ||
    game.guess >= game.allowedguesses;

  return (
    <div class="flex flex-col space-y-2">
      {gameOver() ? <ShareButton /> : <SubmitButton />}
    </div>
  );
}

function getShare(game: Game) {
  const shareURL = `${import.meta.env.VITE_BASE_URL}`;

  let score = "";

  game.guesses.forEach((guess) => {
    switch (guess) {
      case 0:
        score += "🟥";
        break;
      case game.numcorrect:
        score += "🟩";
        break;
      default:
        score += "🟨";
        break;
    }
  });

  if (game.guesses.length > 5) {
    score = `Score: ${game.guesses.length}`;
  }

  return [`Splotch #${game.gamekey}\n${score}`, shareURL];
}

export function InfoButton() {
  const [game, _] = useGame();
  const [__, { open }] = useInfoDialog();

  return (
    <div class="w-full">
      <button
        onClick={() => {
          open();
        }}
        class="w-full rounded-md p-2 text-woodsmoke-50 dark:text-woodsmoke-950 dark:bg-dove-200 bg-dove-800"
        id="info"
      >
        Info
      </button>
    </div>
  );
}

export function ShareButton() {
  const [game, _] = useGame();

  return (
    <div class="w-full">
      <button
        onClick={() => {
          const [text, url] = getShare(game);

          try {
            navigator?.share({
              text,
              url,
            });
          } catch {
            navigator?.clipboard?.writeText(`${text}\n${url}`);
          }
        }}
        class="w-full rounded-md p-4 text-woodsmoke-50 dark:text-woodsmoke-950 dark:bg-killarney-500 bg-killarney-600"
        id="submit"
      >
        Share
      </button>
    </div>
  );
}

export function SubmitButton() {
  const [game, setGame] = useGame();

  const canSubmit = () =>
    game?.selected?.length == game.numcorrect &&
    game.guess <= game.allowedguesses;

  return (
    <div class="w-full">
      <button
        onClick={() => {
          let correct = 0;
          game?.selected?.forEach((color) => {
            setGame("chosen", [...game.chosen, color]);

            if (game?.ingredients.includes(color)) {
              if (!game.correct.includes(color)) {
                setGame("correct", [...game?.correct, color]);
              }

              correct++;
            }
          });

          let guesses = [...game.guesses];
          guesses[game.guess] = correct;

          // update the current guess
          setGame("guesses", [...guesses]);
          setGame("guess", ++game.guess);

          // update the selected
          setGame(
            "selected",
            game.selected.filter((sel) => game.ingredients.includes(sel))
          );

          if (game.guess == game.allowedguesses) {
            setGame("selected", [...game.ingredients]);
          }
        }}
        disabled={!canSubmit()}
        classList={{
          "bg-dove-900 dark:bg-dove-100": canSubmit(),
          "bg-dove-500 dark:bg-dove-300": !canSubmit(),
        }}
        class="w-full rounded-md p-4 text-gray-100 dark:text-black"
        id="submit"
      >
        Submit ({game.selected?.length} of {game?.numcorrect})
      </button>
    </div>
  );
}
