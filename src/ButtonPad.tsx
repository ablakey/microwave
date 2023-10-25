import { Button } from "./Button";

const blackButtons = [
  "Time Cook",
  "Time Defrost",
  "Weight Defrost",
  "Power",
  "Clock",
  "Kitchen Timer",
];

const whiteButtons = ["Popcorn", "Potato", "Pizza", "Frozen Vegetable", "Beverage", "Dinner Plate"];

const numberButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function ButtonPad() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        margin: "5%",
        gap: "1% 5%",
      }}
    >
      {blackButtons.map((b) => (
        <Button type="Black" label={b} />
      ))}
      {whiteButtons.map((b) => (
        <Button type="White" label={b} />
      ))}
      {numberButtons.map((b) => (
        <Button type="Number" label={b} />
      ))}

      <Button type="StartStop" label="Button" />
      <Button type="Number" label="0" />
      <Button type="StartStop" label="Button" />
    </div>
  );
}
