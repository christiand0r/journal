import uploadImage from "@/modules/journal/helpers/uploadImage.js";
import axios from "axios";

describe("Test in helper uploadImage", () => {
  test("Must be upload a file and return an url", async () => {
    const url =
      "https://res.cloudinary.com/christian-door/image/upload/v1653891463/fas3px2zm7eq8gt6mfaw.jpg";

    const { data } = await axios.get(url, { responseType: "arraybuffer" });

    const file = new File([data], "image.jpg");

    const urc = await uploadImage(file);

    console.log(urc);
  });
});
