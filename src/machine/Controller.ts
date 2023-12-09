import { ButtonName, Time } from "../types";
import { Display } from "./Display";
import { Input } from "./Input";
import { Sound } from "./Sound";

type State = "Idle" | "SetPower" | "SetTime" | "Stopped" | "Running" | "Test";

export class Controller {
  clock: Time = new Time(12, 0);
  powerLevel = 9;
  timeLeft: Time = new Time(0, 0);

  state: State = "Idle";
  lastSecond = 0;

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
      case "test":
        this.doTest();
        break;
      case "power":
        this.doPower();
        break;
      case "cook":
        this.doCook();
        break;
      case "start":
        this.doStart();
        break;
      case "stop":
        this.doStop();
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.doNumber(parseInt(button));
        break;
      default:
        console.log(`NOT HANDLED: ${button}`);
        break;
    }
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
      case "SetPower":
        this.display.setText(`P! !${this.powerLevel}`);
        break;
      case "Running":
      case "SetTime":
      case "Stopped":
        this.display.set(this.timeLeft);
        break;
      case "Test":
        break;
      default:
        this.display.set(this.clock);
    }
  }

  everySecond() {
    if (this.state === "Running") {
      this.timeLeft.decrement();
    }

    if (this.state === "SetTime") {
      this.display.showColon = !this.display.showColon;
    }

    // Keep wall clock up-to-date.
    this.setClock();
  }

  setClock() {
    const date = new Date();
    const hh = date.getHours();
    this.clock.big = hh > 12 ? hh - 12 : hh;
    this.clock.small = date.getMinutes();
  }

  setState(state: State) {
    console.log(`Set State: ${state}`);
    this.state = state;
  }

  doTest() {
    this.setState("Test");
    this.display.setText("do ne");
  }

  doPower() {
    if (this.state === "Idle") {
      this.setState("SetPower");
    }
  }
  doCook() {
    if (this.state !== "Idle") {
      return;
    }

    this.setState("SetTime");
  }

  doNumber(num: number) {
    // if power level, just replace it.

    if (this.state === "SetPower") {
      this.powerLevel = num;
    }

    // If big number is 10 or more, there's no more room to add numbers.
    if (this.state === "SetTime" && this.timeLeft.big < 10) {
      this.timeLeft.shift(num);
    }
  }

  doStart() {
    if (this.state === "SetPower") {
      this.setState("Idle");
    }

    if (this.state === "SetTime") {
      this.setState("Running");
    }
  }

  doStop() {
    if (this.state === "Idle") {
      this.powerLevel = 9;
    }

    if (this.state === "SetPower") {
      this.powerLevel = 9;
      this.setState("Idle");
    }
  }
}
