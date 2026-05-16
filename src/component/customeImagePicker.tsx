import ImagePicker from "react-native-image-crop-picker";

type PickerType = "camera" | "gallery";

export const customImagePicker = async (
  pickerType: PickerType
) => {
  try {
    if (pickerType === "camera") {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });

      return image;
    }

    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });

    return image;
  } catch (error) {
    console.log("Image Picker Error:", error);
  }
};