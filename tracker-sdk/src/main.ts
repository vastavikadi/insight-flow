import { InsightFlow }
from "./tracker";

const tracker =
  new InsightFlow({
    apiUrl:
      "http://localhost:3000/api/events/bulk",

    debug: true,
  });

tracker.init();

document
  .querySelector("button")
  ?.addEventListener(
    "click",
    () => {

      tracker.track(
        "add_to_cart",
        {
          productId:
            "123",
        }
      );
    }
  );