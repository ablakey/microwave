import { BUTTONS } from "./config";

// export type Time = [number, number]; // [mm:ss]. Could be 22:99, 12:01,  0:03

export type ButtonName = (typeof BUTTONS)[number];

export class Time {
  readonly big: number;
  readonly small: number;

  constructor(big: number, small: number) {
    this.big = big;
    this.small = small;
  }

  public equals(time: Time): boolean {
    return time.big === this.big && time.small === this.small;
  }
}
