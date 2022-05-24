/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Props } from "outline-icons/lib/components/Icon";

export default function ItalicIcon(
  props: Props
): React.ReactElement<React.ComponentProps<any>, any> {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10.7 16"
      height={24}
      width={24}
      style={{ paddingTop: "4px", paddingBottom: "4px" }}
    >
      <path
        fill={props.color ? props.color : "white"}
        d="M5.6,1.19h2.34l-2.61,13.07H2.99L5.6,1.19Z"
      />
      <path
        fill={props.color ? props.color : "white"}
        d="M7,16H1c-.55,0-1-.45-1-1s.45-1,1-1H7c.55,0,1,.45,1,1s-.45,1-1,1Z"
      />
      <path
        fill={props.color ? props.color : "white"}
        d="M9.7,2H3.7c-.55,0-1-.45-1-1s.45-1,1-1h6c.55,0,1,.45,1,1s-.45,1-1,1Z"
      />
    </svg>
  );
}
