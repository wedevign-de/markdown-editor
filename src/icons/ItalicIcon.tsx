/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Props } from "outline-icons/lib/components/Icon";

export default function ItalicIcon(
  props: Props
): React.ReactElement<React.ComponentProps<any>, any> {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 4.93 14.16"
        height={24}
        width={24}
        style={{
          paddingTop: "4px",
          paddingBottom: "4px",
          marginLeft: "-4px",
          marginRight: "-4px",
        }}
      >
        <path
          d="M2.66,4.31h0c.72,0,1.26,.66,1.12,1.36l-1.52,7.58c-.11,.53-.57,.91-1.12,.91h0C.42,14.16-.12,13.51,.02,12.8L1.54,5.22c.11-.53,.57-.91,1.12-.91Zm-.56-2.84c0-.8,.68-1.47,1.52-1.47,.67,0,1.31,.43,1.31,1.19,0,.84-.68,1.45-1.52,1.45-.67,0-1.31-.4-1.31-1.17Z"
          fill={props.color ? props.color : "white"}
        />
      </svg>
    </>
  );
}
