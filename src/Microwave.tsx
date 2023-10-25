import { Button } from "./Button";
import { ButtonPad } from "./ButtonPad";
import { Display } from "./Display";

export function Microwave() {
  return (
    <div
      style={{
        display: "grid",
        height: "calc(100% - 16px)",
        gridTemplateRows: "1fr 3fr",
        margin: 8,
        backgroundColor: "black",
      }}
    >
      <Display />
      <ButtonPad />
    </div>
  );
}
