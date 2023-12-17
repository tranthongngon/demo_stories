import {
    collection,
    setDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import { dbs } from "./firebase";
  import toast from "react-hot-toast";
  
  const storiesDB = collection(dbs, "stories");
  
  const createStory = async (uid, title, thumnail,  content) => {
    try {
      await setDoc(doc(dbs, 'stories', uid), {title, thumnail, content})
      toast.success("Lưu thành công");
      const docSnap = await getDoc(doc(dbs, 'stories', uid));
      if (docSnap.exists()) {
        return docSnap;
      }
    } catch (error) {
      console.log(error);
      toast.error("Lưu thất bại");
    }
  };
  
  const updateStory = async (uid, dataUpdate) => {
    try {
      const snap = doc(dbs, "stories", uid);
      await updateDoc(snap, dataUpdate);
      toast.success("Lưu thành công");
      const docSnapUpdate =  await getDoc(snap);
      if (docSnapUpdate.exists()) {
        return docSnapUpdate;
      }
    } catch (error) {
      console.log(error);
      toast.error("Lưu thất bại");
    }
  };
  
  const getStories = async () => {
    try {
      const docSnap = await getDocs(storiesDB);
      const data = docSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  
  const getStory = async (uid) => {
    try {
      const docSnap = await getDoc(doc(dbs, 'stories', uid));
      if(docSnap.exists()) {
        return docSnap;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const deleteStory = async (uid) => {
    try {
      await deleteDoc(doc(dbs, 'stories', uid)); 
      toast.success("Xóa thành công");
    } catch (error) {
      console.log(error);
      toast.error("Xóa thất bại");
    }
  }
  
  export { createStory, updateStory, getStories, getStory, deleteStory };
  