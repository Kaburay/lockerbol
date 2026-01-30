// services/checkUserByEmail.ts
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

export async function checkUserByEmail(email) {
  const usuariosRef = collection(db, "usuarios");
  const q = query(usuariosRef, where("correo", "==", email));
  const snapshot = await getDocs(q);

  return !snapshot.empty; // true = existe
}
