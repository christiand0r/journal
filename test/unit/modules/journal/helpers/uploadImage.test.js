// @vitest-environment jsdom

import axios from "axios";
import cloudinary from "cloudinary";
import uploadImage from "@/modules/journal/helpers/uploadImage.js";

cloudinary.config({
  cloud_name: "christian-door",
  api_key: "638545652292723",
  api_secret: "OJEnx9CP9bICo-lXw1N7YRa6C7E",
});

describe("Test in helper uploadImage", () => {
  test("Must be upload a file and return an url", async () => {
    const image =
      "https://res.cloudinary.com/christian-door/image/upload/v1653891463/fas3px2zm7eq8gt6mfaw.jpg";

    const { data } = await axios.get(image, { responseType: "arraybuffer" });

    const file = new File([data], "image.jpg");

    const url = await uploadImage(file);

    expect(typeof url).toBe("string");

    // Take ID
    const segments = url.split("/");

    const imageID = segments[segments.length - 1].replace(".jpg", "");

    await cloudinary.v2.api.delete_resources([imageID]);
  }, 25000);
});
