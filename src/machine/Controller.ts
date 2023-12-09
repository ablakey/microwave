import { ButtonName, Time } from "../types";
import { Display } from "./Display";
import { Input } from "./Input";
import { Sound } from "./Sound";

type State = "Idle" | "SetPower" | "SetTime" | "Stopped" | "Running";

export class Controller {
  state: State = "Idle";
  clock: Time = new Time(12, 0);
  lastSecond = 0;
  timeLeft: Time = new Time(13, 98);

  display: Display;
  sound: Sound;
  input: Input;

  constructor() {
    this.display = new Display();
    this.sound = new Sound();
    this.input = new Input(this.press);
    requestAnimationFrame(this.tick.bind(this));

    this.display.set(new Time(0, 0));
    this.setClock();
  }

  public press(button: ButtonName) {
    console.log(button);
  }

  private tick() {
    switch (this.state) {
      case "Idle":
        this.display.set(this.clock);
        break;
      case "Running":
      case "Stopped":
        this.display.set(this.timeLeft);
        break;
      default:
        this.display.set(new Time(88, 88));
    }

    requestAnimationFrame(this.tick.bind(this));
    const newSecond = new Date().getSeconds();

    // Tick every wall clock second.
    if (this.lastSecond !== newSecond) {
      this.display.tick();
    }
    this.lastSecond = newSecond;
  }

  private setClock() {
    const date = new Date();
    const hh = date.getHours();
    this.clock = new Time(hh > 12 ? hh - 12 : hh, date.getMinutes());
  }
}
