import { Howl } from "howler";
import microFile from "url:../assets/micro.mp3";

type SoundName = "Beep" | "Running" | "End" | "Cancel" | "None";
const MicroStamps = {
  Start: 0,
  LoopStart: 1.5,
  LoopEnd: 5.0,
  End: 6,
  CancelStart: 5.35,
  CancelEnd: 6.15,
  Beep: 8.55,
};

export class Sound {
  private snd: Howl;
  private beepSnd: Howl;
  private currentSound: SoundName = "None";

  constructor() {
    this.beepSnd = new Howl({
      src: microFile,
      volume: 3.0, // TODO: calibrat.
    });

    this.snd = new Howl({
      src: microFile,
      volume: 3.0, // TODO: calibrate.
    });
  }

  public tick() {
    // Keep looping the sound if we're "Running"
    if (
      this.snd.playing() &&
      this.currentSound === "Running" &&
      this.snd.seek() > MicroStamps.LoopEnd
    ) {
      this.snd.seek(MicroStamps.LoopStart);
    }

    // Keep looping the sound if we're "Running"
    if (
      this.snd.playing() &&
      this.currentSound === "Cancel" &&
      this.snd.seek() > MicroStamps.CancelEnd
    ) {
      this.play("None");
    }
  }

  public beep() {
    console.log("play");
    this.beepSnd.seek(MicroStamps.Beep);
    this.beepSnd.play();
  }

  public play(sound: SoundName) {
    this.currentSound = sound;

    this.snd.stop();

    switch (sound) {
      case "Beep":
        this.snd.seek(MicroStamps.Beep);
        this.snd.play();
        break;
      case "Running":
        this.snd.seek(MicroStamps.Start);
        this.snd.play();
        break;
      case "Cancel":
        this.snd.seek(MicroStamps.CancelStart);
        this.snd.play();
        break;
    }
  }
}
