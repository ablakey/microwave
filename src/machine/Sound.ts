import { Howl } from "howler";
import microFile from "url:../assets/micro.mp3";

type SoundName = "Beep" | "Running" | "End" | "Cancel" | "None";
const MicroStamps = {
  Start: 0,
  LoopStart: 1.5,
  LoopEnd: 5.0,
  End: 5.35,
  CancelStart: 5.35,
  CancelEnd: 6.15,
  Beep: 8.55,
};

export class Sound {
  private snd: Howl;
  private beepSnd: Howl;
  private currentSound: SoundName = "None";
  public mute = false;

  constructor() {
    this.beepSnd = new Howl({
      src: microFile,
    });

    this.snd = new Howl({
      src: microFile,
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

  public toggleSound() {
    const newVolume = this.snd.volume() === 0.2 ? 0.7 : 0.2;
    this.snd.volume(newVolume);
    this.beepSnd.volume(newVolume);
  }

  public beep() {
    if (this.mute) {
      return;
    }

    this.beepSnd.stop();
    this.beepSnd.seek(MicroStamps.Beep);
    this.beepSnd.play();
  }

  public play(sound: SoundName) {
    if (this.mute) {
      return;
    }

    this.currentSound = sound;

    this.snd.stop();

    switch (sound) {
      case "Running":
        this.snd.seek(MicroStamps.Start);
        this.snd.play();
        break;
      case "Cancel":
        this.snd.seek(MicroStamps.CancelStart);
        this.snd.play();
        break;
      case "End":
        this.snd.seek(MicroStamps.End);
        this.snd.play();
      case "None":
        break; // Do nothing. Already stopped sound above.
      default:
        console.error(`Unhandled: ${sound}`);
    }
  }
}
