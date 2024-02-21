// users/auth/firestore/useFirestore.js
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const addUserDocument = async (userType, userData) => {
  try {
    // Determine the collection name based on user type
    let collectionName = "";
    switch(userType) {
      case "Job Seeker":
        collectionName = "jobseekers";
        break;
      case "Employer":
        collectionName = "employers";
        break;
      case "Recruiter":
        collectionName = "recruiters";
        break;
      default:
        throw new Error("Invalid user type");
    }

    // Add a new document to the specified collection
    const docRef = await addDoc(collection(db, collectionName), userData);
    console.log(`Document written in ${collectionName} with ID: `, docRef.id);
    return docRef; // Return the document reference
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error(error); // Rethrow the error to be handled where the function is called
  }
};
