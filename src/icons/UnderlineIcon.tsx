/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Props } from "outline-icons/lib/components/Icon";

export default function ItalicIcon(
  props: Props
): React.ReactElement<React.ComponentProps<any>, any> {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 13.5 15.51"
      height={24}
      width={24}
      style={{ paddingTop: "4px", paddingBottom: "4px" }}
    >
      <path
        fill={props.color ? props.color : "white"}
        d="M1.66,7.35V1.12c0-.62,.5-1.12,1.12-1.12h.09c.62,0,1.12,.5,1.12,1.12V7.52c0,2.85,1.06,3.79,2.65,3.79s2.7-.94,2.7-3.79V1.12c0-.62,.5-1.12,1.12-1.12h0c.62,0,1.12,.5,1.12,1.12V7.35c0,4.3-1.9,5.98-4.94,5.98S1.66,11.64,1.66,7.35Z"
      />
      <path
        fill={props.color ? props.color : "white"}
        d="M12.75,15.51H.75c-.41,0-.75-.34-.75-.75s.34-.75,.75-.75H12.75c.41,0,.75,.34,.75,.75s-.34,.75-.75,.75Z"
      />
    </svg>
  );
}
