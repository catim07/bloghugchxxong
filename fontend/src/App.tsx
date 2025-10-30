import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { ArticleCard } from "./components/ArticleCard";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { NewArticle } from "./components/NewArticle";
import { ArticleDetail } from "./components/ArticleDetail";
import { UserProfile } from "./components/UserProfile";
import { AuthPage } from "./components/AuthPage";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { PenSquare } from "lucide-react";

interface UserType {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export default function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("newest");

  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<
    "home" | "new-article" | "article-detail" | "profile" | "auth" | "admin"
  >("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const [articles, setArticles] = useState<any[]>([]);
  const [featuredAuthors, setFeaturedAuthors] = useState<any[]>([]);
  const [topTags, setTopTags] = useState<any[]>([]);

  // 🧩 Load dữ liệu ban đầu
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("/api/articles").then((r) => r.json()),
      fetch("/api/authors").then((r) => r.json()),
      fetch("/api/tags").then((r) => r.json()),
    ])
      .then(([articleData, authorData, tagData]) => {
        setArticles(articleData);
        setFeaturedAuthors(authorData);
        setTopTags(tagData);
      })
      .catch((err) => console.error("❌ Lỗi tải dữ liệu:", err))
      .finally(() => setLoading(false));
  }, []);

  // 🧩 Hàm thêm bài viết mới (callback từ NewArticle)
  const handleArticleAdded = (newArticle: any) => {
    setArticles((prev) => [newArticle, ...prev]);
    setCurrentPage("home");
  };

  // 🧩 Hàm login thành công
  const handleLoginSuccess = (user: UserType, token: string) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    localStorage.setItem("token", token);
    setCurrentPage("home");
  };

  // 🧩 Page Rendering
  switch (currentPage) {
    case "auth":
      return <AuthPage onClose={() => setCurrentPage("home")} onSuccess={handleLoginSuccess} />;

    case "new-article":
      return (
        <NewArticle
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onBack={() => setCurrentPage("home")}
          onArticleAdded={handleArticleAdded}
        />
      );

    case "article-detail":
      return (
        <ArticleDetail
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onBack={() => setCurrentPage("home")}
          onWriteClick={() => setCurrentPage("new-article")}
        />
      );

    case "profile":
      return (
        <UserProfile
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onBack={() => setCurrentPage("home")}
          onWriteClick={() => setCurrentPage("new-article")}
          onArticleClick={() => setCurrentPage("article-detail")}
          isOwnProfile
        />
      );

    case "admin":
      if (!isLoggedIn || !currentUser?.isAdmin) {
        alert("🚫 Bạn không có quyền truy cập Admin");
        setCurrentPage("home");
        break;
      }
      return (
        <AdminDashboard
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onLogout={() => setCurrentPage("home")}
        />
      );
  }

  // 🏠 Trang chủ
  return (
    <div className="min-h-screen bg-background">
      <Navigation
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onWriteClick={() => setCurrentPage("new-article")}
        onProfileClick={() => setCurrentPage("profile")}
        onAuthClick={() => setCurrentPage("auth")}
        onLogout={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setCurrentUser(null);
          setCurrentPage("auth");
        }}
        isLoggedIn={isLoggedIn}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Nút nổi góc phải */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
          {isLoggedIn && currentUser?.isAdmin && (
            <Button
              onClick={() => setCurrentPage("admin")}
              className="h-12 px-4 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-purple-600 hover:bg-purple-700"
              title="Admin Dashboard"
            >
              ⚙️ Admin
            </Button>
          )}

          <Button
            onClick={() => {
              if (!isLoggedIn) {
                alert("🚫 Bạn cần đăng nhập để viết bài!");
                setCurrentPage("auth");
                return;
              }
              setCurrentPage("new-article");
            }}
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-blue-600 hover:bg-blue-700"
            size="icon"
          >
            <PenSquare className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Nội dung chính */}
          <div className="lg:col-span-8">
            <Tabs
              defaultValue="newest"
              onValueChange={(v: string) => setTab(v)}
              className="w-full"
            >
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
                <TabsTrigger value="newest">Mới nhất</TabsTrigger>
                <TabsTrigger value="popular">Phổ biến</TabsTrigger>
                <TabsTrigger value="following">Đang theo dõi</TabsTrigger>
              </TabsList>

              <TabsContent value="newest">
                {loading ? (
                  <p className="text-center text-muted-foreground">
                    Đang tải bài viết...
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map((article) => (
                      <ArticleCard
                        key={article._id}
                        {...article}
                        onClick={() => setCurrentPage("article-detail")}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="popular">
                {loading ? (
                  <p className="text-center text-muted-foreground">
                    Đang tải bài viết...
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...articles]
                      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                      .map((article) => (
                        <ArticleCard
                          key={article._id}
                          {...article}
                          onClick={() => setCurrentPage("article-detail")}
                        />
                      ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="following">
                {loading ? (
                  <p className="text-center text-muted-foreground">
                    Đang tải bài viết...
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.slice(0, 2).map((article) => (
                      <ArticleCard
                        key={article._id}
                        {...article}
                        onClick={() => setCurrentPage("article-detail")}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <Sidebar authors={featuredAuthors} tags={topTags} />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
