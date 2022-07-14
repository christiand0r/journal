import axios from "axios";

const uploadImage = async (file) => {
  if (!file) return;

  try {
    const formData = new FormData();

    const objData = {
      file,
      upload_preset: "journal-vue",
    };

    Object.entries(objData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const url = "https://api.cloudinary.com/v1_1/christian-door/image/upload";

    const { data } = await axios.post(url, formData);

    return data.secure_url;
  } catch (error) {
    console.log("Ocurrio un error al intentar subir la imagen", error);
    return null;
  }
};

export default uploadImage;
