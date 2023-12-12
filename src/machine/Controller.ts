import { assert } from "ts-essentials";
import { ButtonName, Time } from "../types";
import { Display } from "./Display";
import { Input } from "./Input";
import { Sound } from "./Sound";

/**
 * Order matters as it defines what each button is, in HTML layout order when querying all Buttons.
 */
export const Buttons = [
  "about",
  "sound",
  "brightness",
  "power",
  "cook",
  "addtime",
  "popcorn",
  "potato",
  "pizza",
  "vegetable",
  "beverage",
  "poptart",
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

const FoodTimes: Record<string, [number, number]> = {
  popcorn: [2, 55],
  potato: [3, 0],
  pizza: [0, 30],
  vegetable: [99, 99],
  beverage: [0, 75],
  poptart: [0, 3],
};

type State = "Idle" | "SetPower" | "SetTime" | "Paused" | "Running" | "Done";

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

  isState(...states: State[]) {
    return states.includes(this.state);
  }

  handlePress(button: ButtonName) {
    switch (button) {
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
      case "about":
        this.doAbout();
        break;
      case "brightness":
        this.doBrightness();
        break;
      case "addtime":
        this.doAddTime();
        break;
      case "sound":
        this.doToggleSound();
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
      case "beverage":
      case "popcorn":
      case "poptart":
      case "potato":
      case "pizza":
      case "vegetable":
        this.doPreset(button);
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

    this.sound.tick();
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
      case "Paused":
        this.display.set(this.timeLeft);
        break;
      case "Done":
        this.display.setText("do ne");
        break;
      default:
        this.display.set(this.clock);
    }
  }

  everySecond() {
    if (this.isState("Running") && this.timeLeft.equals(Time.Zero)) {
      this.setState("Done");
      this.sound.play("End");
    }

    if (this.isState("Running")) {
      this.timeLeft.decrement();
    }

    if (this.isState("SetTime")) {
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

  doBrightness() {
    this.sound.beep();
    document.querySelector("span.green")!.classList.toggle("dim");
  }

  doAddTime() {
    if (this.isState("Running", "Paused", "Idle", "Done", "SetTime")) {
      this.timeLeft.add(30);
    }
  }

  doToggleSound() {
    console.error("TODO");
  }

  doAbout() {
    window.open("https://github.com/ablakey/microwave", "_blank")!.focus();
  }

  doPower() {
    if (this.isState("Idle", "Done")) {
      this.setState("SetPower");
    }
  }

  doCook() {
    if (!this.isState("Idle", "Done")) {
      return;
    }
    this.setState("SetTime");
  }

  doPreset(food: string) {
    if (this.state !== "Idle" && this.state !== "Done") {
      return;
    }

    this.sound.beep();
    this.sound.play("Running");

    const time = FoodTimes[food];
    assert(time);
    this.timeLeft.big = time[0];
    this.timeLeft.small = time[1];
    this.setState("Running");
  }

  doNumber(num: number) {
    if (this.state === "Running" || this.state === "Paused") {
      return;
    }

    this.sound.beep();

    // Always replace power level. 1-9 (Yes 0 exists on many microwaves. It's a timer.)
    if (this.state === "SetPower") {
      this.powerLevel = num;
    }

    // Automatically begin setting time.
    if (this.state === "Idle" || this.state === "Done") {
      this.setState("SetTime");
      this.timeLeft.shift(num);
      return; // Avoid calling SetTime case.
    }

    if (this.state === "SetTime" && this.timeLeft.big < 10) {
      // If big number is 10 or more, there's no more room to add numbers.
      this.timeLeft.shift(num);
    }
  }

  doStart() {
    if (this.state === "SetPower") {
      this.setState("Idle");
    }

    if (this.state === "SetTime" || this.state === "Paused") {
      this.setState("Running");
      this.sound.beep();
      this.sound.play("Running");
    }
  }

  doStop() {
    this.sound.beep();

    if (this.state === "Idle" || this.state === "Done") {
      this.setState("Idle"); // Clear "Done"
      this.powerLevel = 9;
    }

    if (this.state === "Paused" || this.state === "SetTime") {
      this.setState("Idle");
      this.timeLeft.big = 0;
      this.timeLeft.small = 0;
    }

    if (this.state === "SetPower") {
      this.powerLevel = 9;
      this.setState("Idle");
    }

    if (this.state === "Running") {
      this.sound.play("Cancel");
      this.setState("Paused");
    }
  }
}
