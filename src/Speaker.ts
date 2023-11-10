import beepFile from "url:./assets/beep.mp3";
import { Howl, Howler } from "howler";

export class Speaker {
  private beepSnd: Howl;

  constructor() {
    this.beepSnd = new Howl({
      src: beepFile,
    });
  }

  public beep() {
    this.beepSnd.play();
  }

  public threeBeep() {}

  // This will be a bit tricky: wind up, then loop normal sound.
  public running() {}

  public stopRunning() {}
}
