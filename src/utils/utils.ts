import toast from "react-hot-toast";
import Constant from "../constant/Constant";

export const copyToClipBoard = (data: string, toasted: boolean = true) => {
  try {
    navigator.clipboard.writeText(data);

    if (toasted) {
      toast.success("copy.success", {
        position: "bottom-left",
        duration: 1000,
        style: {
          scale: 0.85,
        },
      });
    }
  } catch (error) {
    toast.error("copy.error", {
      position: "bottom-left",
      duration: 1000,
    });
  }
};

export const getTokenFromLocalHost = () => {
  try {
    const token: String | null = localStorage.getItem(
      Constant.LocalStorage.TOKEN
    );
    return token;
  } catch {
    return null;
  }
};

