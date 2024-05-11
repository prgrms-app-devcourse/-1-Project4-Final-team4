import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";

export const uploadImageToStorage = async (fileUri, userId) => {
  const response = await fetch(fileUri);
  const blob = await response.blob();
  
  const storageRef = ref(storage, `profile_images/${userId}.jpg`);
  return uploadBytes(storageRef, blob).then((snapshot) => {
    return getDownloadURL(snapshot.ref);
  });
};
