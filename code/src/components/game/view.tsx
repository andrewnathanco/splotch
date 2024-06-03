import { useGame } from "./service";

export function GameInfo() {
  const [game, _] = useGame();
  return (
    <div class="flex flex-col ">
      <div class="flex text-4xl space-x-2">
        <div>Splotch</div>
        <div>#{game.gamekey}</div>
      </div>
      <div class="font-medium">Find the ingredients for the color.</div>
    </div>
  );
}
