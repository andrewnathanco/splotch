import { Signal, createEffect, createSignal } from "solid-js";

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

function mix(hexColors: string[]): string {
  let totalR = 0,
    totalG = 0,
    totalB = 0;
  let count = hexColors.length;

  for (let hex of hexColors) {
    let { r, g, b } = hexToRgb(hex);
    totalR += r;
    totalG += g;
    totalB += b;
  }

  let avgR = Math.round(totalR / count);
  let avgG = Math.round(totalG / count);
  let avgB = Math.round(totalB / count);

  return rgbToHex(avgR, avgG, avgB);
}

export default function Home() {
  const color1 = createSignal("#AF9AB2");
  const color2 = createSignal("#C7EDE4");
  const color3 = createSignal("#672A4E");
  const color4 = createSignal("#FF6B35");

  const blended = () =>
    mix([color1[0](), color2[0](), color3[0](), color4[0]()]);

  return (
    <main class="p-4 justify-center items-center flex w-full">
      <div class="w-96 flex flex-col space-y-2">
        <GameInfo />
        <br />
        <ColorPicker color={color1} />
        <ColorPicker color={color2} />
        <ColorPicker color={color3} />
        <ColorPicker color={color4} />
        <br />
        <div
          style={{ "background-color": blended() }}
          class="w-full rounded-md h-32"
        ></div>
      </div>
    </main>
  );
}

type ColorProps = {
  color: Signal<string>;
};

function ColorPicker(props: ColorProps) {
  const [color, setColor] = props.color;

  return (
    <div class="flex space-x-2">
      <input
        type="text"
        value={color()}
        onInput={(e) => setColor(e.target.value)}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      ></input>
      <div
        style={{ "background-color": color() }}
        class="w-12 rounded-lg"
      ></div>
    </div>
  );
}

function GameInfo() {
  return (
    <div class="flex flex-col ">
      <div class="flex justify-between text-4xl space-y-1">
        <div>Splotch</div>
        <div>#0</div>
      </div>
      <div class="font-medium">Find the ingredients for the color.</div>
    </div>
  );
}
