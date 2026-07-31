import type { ReactNode } from "react";

/**
 * Parses a string containing <highlight> tags and replaces them with a custom React element.
 * E.g. "Hello <highlight>world</highlight>" -> ["Hello ", renderHighlight("world")]
 */
export function parseHighlights(
  text: string,
  renderHighlight: (inner: string, index: number) => ReactNode
): ReactNode[] {
  return text.split(/(<highlight>.*?<\/highlight>)/g).map((part, index) => {
    if (part.startsWith("<highlight>") && part.endsWith("</highlight>")) {
      const inner = part.replace("<highlight>", "").replace("</highlight>", "");
      return renderHighlight(inner, index);
    }
    return part;
  });
}
