// src/components/Footer.tsx – ĐÃ SỬA LỖI, CHẠY MƯỢT 100%, GIỮ NGUYÊN GIAO DIỆN + CÓ MODAL ĐẸP!!!
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // State để mở các modal
  const [openModal, setOpenModal] = useState<"terms" | "privacy" | "contact" | null>(null);

  return (
    <>
      <footer className="mt-16 border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                © {currentYear} BlogHub — created by Cường Lê. Tất cả quyền được bảo lưu.
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <button
                onClick={() => setOpenModal("terms")}
                className="hover:text-foreground transition-colors"
              >
                Điều khoản
              </button>
              <Separator orientation="vertical" className="h-4" />
              <button
                onClick={() => setOpenModal("privacy")}
                className="hover:text-foreground transition-colors"
              >
                Quyền riêng tư
              </button>
              <Separator orientation="vertical" className="h-4" />
              <button
                onClick={() => setOpenModal("contact")}
                className="hover:text-foreground transition-colors"
              >
                Liên hệ
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== MODAL ĐIỀU KHOẢN ==================== */}
      <Dialog open={openModal === "terms"} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Điều khoản sử dụng</DialogTitle>
            <DialogDescription className="text-base mt-3">
              Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-muted-foreground leading-relaxed mt-4">
            <p>Bằng việc sử dụng BlogHub, bạn đồng ý với các điều khoản sau:</p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Nội dung do bạn đăng tải phải tuân thủ pháp luật Việt Nam</li>
              <li>Không spam, quảng cáo trá hình hoặc nội dung phản cảm</li>
              <li>Tôn trọng bản quyền và quyền riêng tư của người khác</li>
              <li>BlogHub có quyền xóa nội dung vi phạm mà không cần báo trước</li>
              <li>Chúng tôi không chịu trách nhiệm về nội dung do người dùng đăng</li>
            </ul>
            <p className="italic pt-2">Cảm ơn bạn đã cùng xây dựng cộng đồng văn minh</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* ==================== MODAL QUYỀN RIÊNG TƯ ==================== */}
      <Dialog open={openModal === "privacy"} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Chính sách quyền riêng tư</DialogTitle>
            <DialogDescription className="text-base mt-3">
              Chúng tôi tôn trọng và bảo vệ thông tin của bạn
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-muted-foreground leading-relaxed mt-4">
            <p>BlogHub cam kết:</p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Chỉ thu thập thông tin cần thiết để vận hành dịch vụ</li>
              <li>Không bán hoặc chia sẻ dữ liệu cá nhân cho bên thứ ba</li>
              <li>Email chỉ dùng để gửi thông báo quan trọng</li>
              <li>Bạn có thể yêu cầu xóa toàn bộ dữ liệu bất kỳ lúc nào</li>
            </ul>
            <p className="font-medium pt-2">Dữ liệu của bạn thuộc về bạn</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* ==================== MODAL LIÊN HỆ ==================== */}
      <Dialog open={openModal === "contact"} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">Liên hệ với chúng tôi</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-4 text-muted-foreground">
              <p>Có góp ý, báo lỗi hay chỉ muốn nói "hi"?</p>
              <div className="space-y-3 font-medium">
                <p>Email: <span className="text-foreground">hello@bloghub.vn</span></p>
                <p>Zalo/Telegram: <span className="text-foreground">@tutu_dev</span></p>
                <p>GitHub: <span className="text-foreground">github.com/tutu</span></p>
              </div>
            </div>
            <div className="p-5 bg-muted/50 rounded-lg text-center">
              <p className="font-semibold">BlogHub – được xây dựng bởi một dev Việt Nam</p>
              <p className="text-sm mt-2">Mở nguồn hoàn toàn – bạn có thể góp code bất kỳ lúc nào</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}