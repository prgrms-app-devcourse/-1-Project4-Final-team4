import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FIREBASE_STORAGE } from "../firebase/firebase";

export const uploadImageToStorage = async (fileUri, userId) => {
  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    
    const storageRef = ref(FIREBASE_STORAGE, `profile_images/${userId}.jpg`);
    const snapshot = await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(snapshot.ref);
    
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getImageFromStorage = async (userEmail) => {
  try {
    const imageRef = ref(FIREBASE_STORAGE, `profile_images/${userEmail}.jpg`);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error('Error getting profile image:', error);
    throw error;
  }
};