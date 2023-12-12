import { ButtonName } from "../types";
import { Buttons } from "./Controller";

export class Input {
  constructor(buttonCallback: (button: ButtonName) => void) {
    // Render all the Buttons. Hook them up to the controller via callback.
    const buttonElements = document.querySelectorAll<HTMLDivElement>(".button");
    buttonElements.forEach((b, idx) => {
      b.addEventListener("click", (e) => {
        e.preventDefault();
        buttonCallback(Buttons[idx]);
      });
    });
  }
}
