import { Time } from "../types";
import { assert } from "ts-essentials";
export class Display {
  private el: HTMLSpanElement;
  private current: Time = new Time(0, 0);
  private showingColon = false;

  constructor() {
    const el = document.querySelector<HTMLSpanElement>(".segments .green");
    assert(el);
    this.el = el;
    this.render();
  }

  set(time: Time) {
    if (this.current.equals(time)) {
      return;
    }
    this.current = time;
    this.render();
  }

  tick() {
    this.showingColon = !this.showingColon;
    this.render();
  }

  private render() {
    const mm = this.current.big.toString().padStart(2, "!");
    const ss = this.current.small.toString().padStart(2, "0");
    const displayString = `${mm}${this.showingColon ? ":" : " "}${ss}`;
    this.el.innerText = displayString;
  }
}
