import { BUTTONS } from "../config";
import { ButtonName } from "../types";

export class Input {
  constructor(buttonCallback: (button: ButtonName) => void) {
    // Render all the buttons. Hook them up to the controller via callback.
    const buttonElements = document.querySelectorAll<HTMLDivElement>(".button");
    buttonElements.forEach((b, idx) => {
      b.addEventListener("click", (e) => {
        e.preventDefault();
        buttonCallback(BUTTONS[idx]);
      });
    });
  }
}
