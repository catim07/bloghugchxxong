// src/components/UserProfilePopup.tsx
import { Dialog, DialogContent } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Users, Calendar } from "lucide-react";

interface UserProfilePopupProps {
  user: {
    _id: string;
    name: string;
    username?: string;
    avatar?: string;
    bio?: string;
    followerCount?: number;
    createdAt?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFollow: () => void;
  isFollowing: boolean;
}

export const UserProfilePopup = ({
  user,
  open,
  onOpenChange,
  onFollow,
  isFollowing,
}: UserProfilePopupProps) => {
  if (!user) return null;

  const formatJoinDate = (dateString: string | undefined) => {
    if (!dateString) return "Chưa rõ";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const displayUsername = user.username || user.name.toLowerCase().replace(/\s+/g, "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl border-none shadow-2xl bg-white dark:bg-neutral-900">
        {/* Gradient Banner */}
        <div className="h-40 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-gradient-x" />

        <div className="relative px-6 pb-8 pt-4">
          {/* Avatar lớn, căn giữa */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
            <Avatar className="h-40 w-40 ring-8 ring-white dark:ring-neutral-900 shadow-2xl border-4 border-white">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-6xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Nội dung */}
          <div className="mt-24 text-center space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">{user.name}</h2>
              <p className="text-xl text-muted-foreground mt-1">@{displayUsername}</p>
            </div>

            {user.bio ? (
              <p className="text-lg leading-relaxed text-foreground/90 max-w-xs mx-auto px-4">
                {user.bio}
              </p>
            ) : (
              <p className="italic text-muted-foreground text-lg">Chưa có tiểu sử</p>
            )}

            {/* Stats */}
            <div className="flex justify-center gap-10 py-4 text-lg">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                <div>
                  <span className="font-bold text-2xl block">
                    {user.followerCount?.toLocaleString() || 0}
                  </span>
                  <span className="text-muted-foreground text-sm">người theo dõi</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-green-600" />
                <div className="text-left">
                  <span className="text-sm text-muted-foreground block">Tham gia</span>
                  <span className="font-medium">{formatJoinDate(user.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Nút theo dõi */}
            <Button
              onClick={onFollow}
              size="lg"
              className={`w-full mt-6 py-7 text-xl font-bold rounded-xl transition-all duration-300 shadow-lg
                ${isFollowing
                  ? "bg-neutral-200 dark:bg-neutral-800 hover:bg-red-100 dark:hover:bg-red-950 hover:text-red-600"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"}
              `}
            >
              {isFollowing ? "Đang theo dõi" : "Theo dõi ngay"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};