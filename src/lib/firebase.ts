import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Cấu hình Web App "THT Website" của project tht-thongbao-6676.
// Đây là cấu hình công khai của Firebase Web (luôn được gửi xuống trình duyệt);
// quyền đọc/ghi dữ liệu được bảo vệ bằng Firestore Security Rules (../../firestore.rules).
// Có thể ghi đè bằng biến môi trường NEXT_PUBLIC_FIREBASE_* nếu dùng project khác.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyCKu2j6TwS2nBHTsnwKTTU7tTPJeowwiBI",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "tht-thongbao-6676.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "tht-thongbao-6676",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "tht-thongbao-6676.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "975693152673",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:975693152673:web:d19ccde0a409355ad78be0",
};

// Dùng chung một app cho cả server (đọc công khai) và trình duyệt (đăng nhập, đăng bài).
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
