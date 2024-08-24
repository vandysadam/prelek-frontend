import { DOMAttributes } from "react";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    data?: any;
  }

  interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {}
}
