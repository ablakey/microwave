import { BUTTONS } from "./config";

// export type Time = [number, number]; // [mm:ss]. Could be 22:99, 12:01,  0:03

export type ButtonName = (typeof BUTTONS)[number];

export class Time {
  big: number;
  small: number;

  public static Zero = new Time(0, 0);

  constructor(big: number, small: number) {
    this.big = big;
    this.small = small;
  }

  public shift(num: number) {
    const newTimeStr = `${this.big.toString().padStart(2, "0")[1]}${this.small
      .toString()
      .padStart(2, "0")}${num.toString()}`;

    this.big = parseInt(newTimeStr.substring(0, 2));
    this.small = parseInt(newTimeStr.substring(2, 4));
  }

  public decrement() {
    if (this.equals(Time.Zero)) {
      return;
    }

    if (this.small > 0) {
      this.small -= 1;
    } else {
      this.big -= 1;
      this.small = 59;
    }
  }

  public equals(time: Time): boolean {
    return time.big === this.big && time.small === this.small;
  }
}
