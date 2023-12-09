import { ButtonName, Time } from "../types";
import { Display } from "./Display";
import { Input } from "./Input";
import { Sound } from "./Sound";

type State = "Idle" | "SetPower" | "SetTime" | "Stopped" | "Running";

export class Controller {
  state: State = "Idle";
  clock: Time = new Time(12, 0);
  lastSecond = 0;
  timeLeft: Time = new Time(0, 0);

  display: Display;
  sound: Sound;
  input: Input;

  constructor() {
    this.display = new Display();
    this.sound = new Sound();
    this.input = new Input(this.handlePress.bind(this));
    requestAnimationFrame(this.tick.bind(this));
  }

  public handlePress(button: ButtonName) {
    switch (button) {
      case "cook":
        this.doCook();
        break;
      default:
        break;
    }
    console.log(button);
  }

  tick() {
    requestAnimationFrame(this.tick.bind(this));
    const newSecond = new Date().getSeconds();

    // Tick every wall clock second.
    if (this.lastSecond !== newSecond) {
      this.everySecond();
      this.lastSecond = newSecond;
    }

    this.everyTick();
  }

  everyTick() {
    switch (this.state) {
      case "Idle":
        this.display.set(this.clock);
        break;
      case "Running":
      case "SetTime":
      case "Stopped":
        this.display.set(this.timeLeft);
        break;
      default:
        this.display.set(this.clock);
    }
  }

  everySecond() {
    if (this.state === "Running") {
      this.timeLeft.decrement();
    }

    if (this.state === "Idle") {
      this.display.showColon = !this.display.showColon;
    }

    // Keep wall clock up-to-date.
    this.setClock();
  }

  private setClock() {
    const date = new Date();
    const hh = date.getHours();
    this.clock.big = hh > 12 ? hh - 12 : hh;
    this.clock.small = date.getMinutes();
  }

  doCook() {
    if (this.state !== "Idle") {
      return;
    }

    this.state = "SetTime";
  }
}
