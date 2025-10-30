import { useState } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { ArticleCard } from "./ArticleCard";
import {
  Heart,
  UserPlus,
  Flag,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Send,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  likes: number;
}

interface ArticleDetailProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onBack: () => void;
  onWriteClick: () => void;
}

export function ArticleDetail({
  darkMode,
  toggleDarkMode,
  onBack,
  onWriteClick,
}: ArticleDetailProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(234);
  const [following, setFollowing] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: "Trần Văn B",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
      content:
        "Bài viết rất chi tiết và dễ hiểu! Cảm ơn tác giả đã chia sẻ những kiến thức hữu ích về React Hooks.",
      time: "2 giờ trước",
      likes: 12,
    },
    {
      id: 2,
      author: {
        name: "Lê Thị C",
        avatar: "https://i.pravatar.cc/150?img=15",
      },
      content:
        "Mình đã áp dụng các best practices này vào dự án và thấy hiệu quả rõ rệt. Rất đáng đọc!",
      time: "5 giờ trước",
      likes: 8,
    },
    {
      id: 3,
      author: {
        name: "Phạm Minh D",
        avatar: "https://i.pravatar.cc/150?img=18",
      },
      content:
        "Có thể giải thích thêm về phần useEffect dependencies không ạ? Mình vẫn còn hơi rối.",
      time: "1 ngày trước",
      likes: 5,
    },
  ]);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const handleFollow = () => {
    setFollowing(!following);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: {
          name: "Bạn",
          avatar: "https://i.pravatar.cc/150?img=20",
        },
        content: newComment,
        time: "Vừa xong",
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  // Similar articles mock data
  const similarArticles = [
    {
      id: 7,
      title: "10 React Hooks Patterns bạn nên biết",
      description:
        "Tổng hợp các patterns phổ biến và hữu ích khi làm việc với React Hooks trong các dự án thực tế.",
      author: {
        name: "Hoàng Văn E",
        avatar: "https://i.pravatar.cc/150?img=7",
      },
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format",
      likes: 189,
      comments: 34,
      tags: ["React", "Hooks", "JavaScript"],
      readTime: "6 phút đọc",
      date: "3 ngày trước",
    },
    {
      id: 8,
      title: "Custom Hooks: Tạo và sử dụng như thế nào?",
      description:
        "Hướng dẫn chi tiết cách tạo custom hooks để tái sử dụng logic trong React components.",
      author: {
        name: "Nguyễn Thị F",
        avatar: "https://i.pravatar.cc/150?img=6",
      },
      thumbnail:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format",
      likes: 156,
      comments: 28,
      tags: ["React", "Custom Hooks"],
      readTime: "7 phút đọc",
      date: "5 ngày trước",
    },
    {
      id: 9,
      title: "React Performance: Tối ưu với useMemo và useCallback",
      description:
        "Tìm hiểu cách sử dụng useMemo và useCallback để tối ưu performance cho ứng dụng React.",
      author: {
        name: "Trần Văn G",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      thumbnail:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format",
      likes: 203,
      comments: 41,
      tags: ["React", "Performance"],
      readTime: "9 phút đọc",
      date: "1 tuần trước",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onWriteClick={onWriteClick}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6">
          ← Quay lại
        </Button>

        {/* Article Header */}
        <article>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="secondary"
              className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            >
              #React
            </Badge>
            <Badge
              variant="secondary"
              className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            >
              #JavaScript
            </Badge>
            <Badge
              variant="secondary"
              className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            >
              #Frontend
            </Badge>
          </div>

          {/* Title */}
          <h1 className="mb-6">
            Hướng dẫn toàn diện về React Hooks và các Best Practices
          </h1>

          {/* Author Info & Actions */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                <AvatarFallback>NV</AvatarFallback>
              </Avatar>
              <div>
                <p className="cursor-pointer hover:underline">Nguyễn Văn A</p>
                <p className="text-sm text-muted-foreground">
                  Đăng 2 ngày trước · 8 phút đọc
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={following ? "outline" : "default"}
                size="sm"
                onClick={handleFollow}
                className={
                  following
                    ? ""
                    : "bg-blue-600 hover:bg-blue-700 text-white gap-2"
                }
              >
                {following ? (
                  "Đang theo dõi"
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Theo dõi
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              React Hooks đã thay đổi cách chúng ta viết components trong React.
              Trong bài viết này, chúng ta sẽ tìm hiểu các best practices và
              patterns phổ biến khi làm việc với Hooks.
            </p>

            <h2>1. Giới thiệu về React Hooks</h2>
            <p>
              React Hooks được giới thiệu từ phiên bản 16.8, cho phép bạn sử
              dụng state và các tính năng khác của React mà không cần viết
              class component. Điều này giúp code trở nên ngắn gọn hơn, dễ hiểu
              hơn và dễ test hơn.
            </p>

            <h2>2. useState - Quản lý State</h2>
            <p>
              <code>useState</code> là hook cơ bản nhất, cho phép bạn thêm state
              vào functional component:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1);
}`}</code>
            </pre>

            <h3>Best Practices cho useState:</h3>
            <ul>
              <li>
                Tách state thành nhiều biến nhỏ thay vì một object lớn
              </li>
              <li>Sử dụng functional updates khi state mới phụ thuộc vào state cũ</li>
              <li>Đặt tên biến state rõ ràng và có ý nghĩa</li>
            </ul>

            <h2>3. useEffect - Xử lý Side Effects</h2>
            <p>
              <code>useEffect</code> cho phép bạn thực hiện side effects trong
              components. Side effects có thể là data fetching, subscriptions,
              hoặc thay đổi DOM.
            </p>

            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`useEffect(() => {
  // Side effect logic here
  document.title = \`Count: \${count}\`;

  // Cleanup function
  return () => {
    // Cleanup logic
  };
}, [count]); // Dependencies array`}</code>
            </pre>

            <h3>Lưu ý quan trọng về dependencies:</h3>
            <ul>
              <li>
                Luôn khai báo đầy đủ dependencies trong dependency array
              </li>
              <li>Sử dụng ESLint plugin để kiểm tra dependencies</li>
              <li>
                Tách effect thành nhiều useEffect nhỏ thay vì một effect lớn
              </li>
            </ul>

            <h2>4. useContext - Chia sẻ Data</h2>
            <p>
              <code>useContext</code> giúp bạn truy cập Context API một cách dễ
              dàng, tránh "props drilling":
            </p>

            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`const theme = useContext(ThemeContext);
const user = useContext(UserContext);`}</code>
            </pre>

            <h2>5. useMemo và useCallback - Tối ưu Performance</h2>
            <p>
              Hai hooks này giúp tối ưu performance bằng cách memoize values và
              functions:
            </p>

            <ul>
              <li>
                <strong>useMemo:</strong> Memoize computed values
              </li>
              <li>
                <strong>useCallback:</strong> Memoize callback functions
              </li>
            </ul>

            <h2>6. Custom Hooks</h2>
            <p>
              Tạo custom hooks để tái sử dụng logic giữa các components. Đây là
              một trong những tính năng mạnh mẽ nhất của Hooks:
            </p>

            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`}</code>
            </pre>

            <h2>Kết luận</h2>
            <p>
              React Hooks đã mở ra một cách tiếp cận mới trong việc xây dựng
              React components. Bằng cách tuân theo các best practices và hiểu
              rõ cách thức hoạt động của từng hook, bạn có thể viết code React
              hiệu quả và dễ bảo trì hơn.
            </p>

            <p>
              Hãy thực hành thường xuyên và không ngại thử nghiệm với các
              patterns khác nhau để tìm ra cách tiếp cận phù hợp nhất cho dự án
              của bạn.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant={liked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className={
                  liked
                    ? "bg-red-500 hover:bg-red-600 text-white gap-2"
                    : "gap-2"
                }
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                {likesCount}
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                {comments.length}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmark}
                className="gap-2"
              >
                <Bookmark
                  className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`}
                />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Chia sẻ
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-red-600 gap-2">
                    <Flag className="h-4 w-4" />
                    Báo cáo vi phạm
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Comments Section */}
          <div className="mb-12">
            <h3 className="mb-6">Bình luận ({comments.length})</h3>

            {/* New Comment Input */}
            <Card className="p-4 mb-6">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://i.pravatar.cc/150?img=20" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Viết bình luận của bạn..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-3 min-h-20 resize-none"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSubmitComment}
                      size="sm"
                      className="gap-2 bg-blue-600 hover:bg-blue-700"
                      disabled={!newComment.trim()}
                    >
                      <Send className="h-4 w-4" />
                      Gửi bình luận
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="cursor-pointer hover:underline">
                          {comment.author.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 ml-2">
                      <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                        <Heart className="h-3 w-3" />
                        <span className="text-xs">{comment.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <span className="text-xs">Trả lời</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-12" />

          {/* Similar Articles */}
          <div>
            <h3 className="mb-6">Bài viết liên quan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
