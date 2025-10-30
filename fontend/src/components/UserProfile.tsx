import { useEffect, useState } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { ArticleCard } from "./ArticleCard";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  Settings,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Users,
  FileText,
  Heart,
} from "lucide-react";
import axios from "axios";

interface UserProfileProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onBack: () => void;
  onWriteClick: () => void;
  onArticleClick: () => void;
  isOwnProfile?: boolean;
}

interface User {
  _id: string;
  name: string;
  username?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinDate?: string;
  stats?: {
    posts: number;
    followers: number;
    following: number;
  };
}

interface Article {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
  likes?: number;
  comments?: number;
  tags?: string[];
  readTime?: string;
  date?: string;
}

export function UserProfile({
  darkMode,
  toggleDarkMode,
  onBack,
  onWriteClick,
  onArticleClick,
  isOwnProfile = true,
}: UserProfileProps) {
  const [following, setFollowing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userArticles, setUserArticles] = useState<Article[]>([]);

  // 🔹 Lấy thông tin người dùng hiện tại
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("❌ Lỗi khi lấy user:", err));
  }, []);

  // 🔹 Lấy bài viết của user
  useEffect(() => {
    if (!user?._id) return;
    axios
      .get(`http://localhost:5000/api/blogs/user/${user._id}`)
      .then((res) => setUserArticles(res.data))
      .catch((err) => console.error("❌ Lỗi khi lấy blogs:", err));
  }, [user]);

  // 🔹 Khi user chưa load
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Đang tải thông tin người dùng...</p>
      </div>
    );
  }

  // Mock following users
  const followingUsers = [
    {
      name: "Trần Thị B",
      username: "@tranthib",
      avatar: "https://i.pravatar.cc/150?img=5",
      bio: "Frontend Engineer tại Tech Corp",
      followers: "8.3k",
    },
    {
      name: "Lê Minh C",
      username: "@leminhc",
      avatar: "https://i.pravatar.cc/150?img=3",
      bio: "Next.js enthusiast & Tech blogger",
      followers: "15.1k",
    },
    {
      name: "Phạm Thị D",
      username: "@phamthid",
      avatar: "https://i.pravatar.cc/150?img=9",
      bio: "UI/UX Designer & CSS wizard",
      followers: "6.7k",
    },
    {
      name: "Hoàng Văn E",
      username: "@hoangvane",
      avatar: "https://i.pravatar.cc/150?img=7",
      bio: "Backend Developer | Node.js specialist",
      followers: "10.2k",
    },
  ];

  const followers = followingUsers.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onWriteClick={onWriteClick}
      />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          ← Quay lại
        </Button>

        {/* Profile Header */}
        <Card className="p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-32 w-32 border-4 border-border">
                <AvatarImage src={user.avatar || "https://i.pravatar.cc/150"} />
                <AvatarFallback>{user.name?.[0]}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="mb-1">{user.name}</h1>
                  <p className="text-muted-foreground">{user.username}</p>
                </div>

                {isOwnProfile ? (
                  <Button variant="outline" className="gap-2 self-start">
                    <Settings className="h-4 w-4" />
                    Chỉnh sửa hồ sơ
                  </Button>
                ) : (
                  <Button
                    variant={following ? "outline" : "default"}
                    onClick={() => setFollowing(!following)}
                    className={
                      following
                        ? "self-start"
                        : "bg-blue-600 hover:bg-blue-700 self-start"
                    }
                  >
                    {following ? "Đang theo dõi" : "Theo dõi"}
                  </Button>
                )}
              </div>

              <p className="mb-4 leading-relaxed">{user.bio}</p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center gap-1">
                    <LinkIcon className="h-4 w-4" />
                    <a
                      href={`https://${user.website}`}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.website}
                    </a>
                  </div>
                )}
                {user.joinDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{user.joinDate}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <strong>{user.stats?.posts ?? 0}</strong>{" "}
                    <span className="text-muted-foreground">bài viết</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <strong>{user.stats?.followers ?? 0}</strong>{" "}
                    <span className="text-muted-foreground">người theo dõi</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <strong>{user.stats?.following ?? 0}</strong>{" "}
                    <span className="text-muted-foreground">đang theo dõi</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="posts">Bài viết của tôi</TabsTrigger>
            <TabsTrigger value="following">Đang theo dõi</TabsTrigger>
            <TabsTrigger value="followers">Người theo dõi</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  {...article}
                  onClick={onArticleClick}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="following">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {followingUsers.map((f, i) => (
                <Card key={i} className="p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={f.avatar} />
                      <AvatarFallback>{f.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{f.name}</p>
                      <p className="text-sm text-muted-foreground">{f.username}</p>
                      <p className="text-xs text-muted-foreground">{f.followers} người theo dõi</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="followers">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {followers.map((f, i) => (
                <Card key={i} className="p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={f.avatar} />
                      <AvatarFallback>{f.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{f.name}</p>
                      <p className="text-sm text-muted-foreground">{f.username}</p>
                      <p className="text-xs text-muted-foreground">{f.followers} người theo dõi</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
