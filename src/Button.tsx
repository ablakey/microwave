import { CSSProperties } from "react";

type ButtonType = "Black" | "White" | "Number" | "StartStop";

const buttonTypeStyles: Record<ButtonType, CSSProperties> = {
  Black: {
    border: "1px solid dimgrey",
  },
  Number: {
    backgroundColor: "#333",
    marginLeft: "15%",
    marginRight: "15%",
  },
  StartStop: {},
  White: {
    border: "1px solid white",
  },
};

export function Button(props: { label: string; type: ButtonType }) {
  return (
    <div
      style={{
        borderRadius: 12,
        color: "white",
        fontSize: "18px",
        ...buttonTypeStyles[props.type],
      }}
    >
      {props.label}
    </div>
  );
}
