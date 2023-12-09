import { Time } from "../types";
import { assert } from "ts-essentials";
export class Display {
  private el: HTMLSpanElement;
  private current: Time = new Time(0, 0);
  private currentString = "";
  public showColon = true;

  constructor() {
    const el = document.querySelector<HTMLSpanElement>(".segments .green");
    assert(el);
    this.el = el;
    this.render();
  }

  set(time: Time) {
    this.current = time;
    this.render();
  }

  private render() {
    const big = this.current.big.toString().padStart(2, "!");
    const small = this.current.small.toString().padStart(2, "0");
    const colon = this.showColon ? ":" : " ";
    const displayString = `${big}${colon}${small}`;

    if (displayString !== this.currentString) {
      this.currentString = displayString;
      this.el.innerText = this.currentString;
    }
  }
}
