import { Time } from "../types";
import { assert } from "ts-essentials";
export class Display {
  private el: HTMLSpanElement;
  private current: Time | string = new Time(0, 0);
  private currentString = "";
  public showColon = true;

  constructor() {
    const el = document.querySelector<HTMLSpanElement>(".segments .green");
    assert(el);
    this.el = el;
    this.render();
  }

  setText(text: string) {
    this.current = text;
    this.render();
  }

  set(time: Time) {
    this.current = time;
    this.render();
  }

  private render() {
    let displayString: string;

    if (this.current instanceof Time) {
      const isZero = this.current.equals(Time.Zero);
      const big = this.current.big === 0 ? "!!" : this.current.big.toString().padStart(2, "!");
      const small = isZero ? "!!" : this.current.small.toString().padStart(2, "0");
      const colon = this.showColon ? ":" : " ";
      displayString = `${big}${colon}${small}`;
    } else {
      displayString = this.current;
    }

    if (displayString !== this.currentString) {
      this.currentString = displayString;
      this.el.innerText = this.currentString;
    }
  }
}
