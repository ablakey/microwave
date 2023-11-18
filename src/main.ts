import { Speaker } from "./machine/Speaker";

/**
 * Order matters as it defines what each button is, in HTML layout order when querying all buttons.
 */
const buttons = [
  "cook",
  "defrost",
  "bomb",
  "power",
  "clock",
  "timer",
  "popcorn",
  "potato",
  "pizza",
  "vegetable",
  "beverage",
  "plate",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "start",
  "0",
  "stop",
] as const;

type ButtonName = (typeof buttons)[number];

const speaker = new Speaker();

function main() {
  function press(button: ButtonName) {
    console.log(button);
    speaker.beep();
  }

  const x = document.querySelectorAll<HTMLDivElement>(".button");
  x.forEach((x, idx) => {
    x.addEventListener("click", (e) => {
      e.preventDefault();
      press(buttons[idx]);
    });
  });
}

window.onload = main;
