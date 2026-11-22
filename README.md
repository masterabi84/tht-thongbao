# Website Trung tâm Ngoại ngữ Tin học THT

Website giới thiệu trung tâm và đăng thông báo lịch khai giảng.

- Trang công khai: Giới thiệu, Khóa học, Khách hàng, Liên hệ, Thông báo (danh sách + chi tiết).
- Người phụ trách đăng nhập và đăng thông báo ngay trên website; học viên mở link thông báo để đọc, không cần tài khoản.

## Công nghệ

- [Next.js 16](https://nextjs.org) (App Router, Cache Components)
- Firebase Authentication (Email/Mật khẩu) và Cloud Firestore – project `tht-thongbao-6676`

## Chạy trên máy

```bash
npm install
npm run dev   # http://localhost:3000
```

Cấu hình Firebase Web nằm trong `src/lib/firebase.ts` (cấu hình công khai của Firebase Web);
có thể ghi đè bằng biến môi trường `NEXT_PUBLIC_FIREBASE_*`.

## Phân quyền

- Collection `posts`: ai cũng đọc được; chỉ tài khoản được cấp quyền mới tạo được.
- Collection `admins/{uid}`: danh sách tài khoản được cấp quyền, thêm qua Firebase Console.
- Quyền được kiểm tra bằng Firestore Security Rules (quản lý ở repo cấu hình Firebase riêng).
