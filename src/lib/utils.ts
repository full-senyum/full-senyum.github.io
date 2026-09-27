import { createCn } from "cn/config";

/**
 * Class merger that knows the custom type scale in globals.css, so
 * `cn("text-title", "text-navy")` keeps both (size ≠ colour) while
 * `cn("text-body", "text-label")` still resolves to the last size.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "mega",
            "display",
            "h3",
            "h4",
            "h5",
            "title",
            "title-strong",
            "body-lg",
            "body",
            "body-strong",
            "label",
            "label-strong",
          ],
        },
      ],
    },
  },
});
