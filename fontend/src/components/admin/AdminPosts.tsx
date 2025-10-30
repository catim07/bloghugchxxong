import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Card } from "../ui/card";
import { Search, MoreHorizontal, Eye, EyeOff, Trash2, Edit } from "lucide-react";

export function AdminPosts() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock posts data
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Hướng dẫn toàn diện về React Hooks và các Best Practices",
      author: "Nguyễn Văn A",
      status: "published",
      views: 12456,
      comments: 45,
      date: "2024-01-10",
    },
    {
      id: 2,
      title: "TypeScript Tips: Những kỹ thuật nâng cao cho Developer",
      author: "Trần Thị B",
      status: "published",
      views: 9823,
      comments: 32,
      date: "2024-01-09",
    },
    {
      id: 3,
      title: "Tối ưu hiệu suất Web với Next.js 14",
      author: "Lê Minh C",
      status: "pending",
      views: 0,
      comments: 0,
      date: "2024-01-11",
    },
    {
      id: 4,
      title: "CSS Grid và Flexbox trong thiết kế Responsive",
      author: "Phạm Thị D",
      status: "published",
      views: 7654,
      comments: 28,
      date: "2024-01-08",
    },
    {
      id: 5,
      title: "Node.js Best Practices 2025: Security và Performance",
      author: "Hoàng Văn E",
      status: "hidden",
      views: 6543,
      comments: 41,
      date: "2024-01-07",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Đã đăng</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">Chờ duyệt</Badge>;
      case "hidden":
        return <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">Đã ẩn</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleApprove = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, status: "published" } : post
      )
    );
  };

  const handleHide = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, status: "hidden" } : post
      )
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Quản lý bài viết</h2>
          <p className="text-muted-foreground">
            Quản lý tất cả bài viết trên nền tảng
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Thêm bài viết mới
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm bài viết, tác giả..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Posts Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Tác giả</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Lượt xem</TableHead>
              <TableHead>Bình luận</TableHead>
              <TableHead>Ngày đăng</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="max-w-md">
                  <p className="line-clamp-2">{post.title}</p>
                </TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{getStatusBadge(post.status)}</TableCell>
                <TableCell>{post.views.toLocaleString()}</TableCell>
                <TableCell>{post.comments}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      {post.status === "pending" && (
                        <DropdownMenuItem onClick={() => handleApprove(post.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Duyệt bài
                        </DropdownMenuItem>
                      )}
                      {post.status === "published" && (
                        <DropdownMenuItem onClick={() => handleHide(post.id)}>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Ẩn bài
                        </DropdownMenuItem>
                      )}
                      {post.status === "hidden" && (
                        <DropdownMenuItem onClick={() => handleApprove(post.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Hiện bài
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
