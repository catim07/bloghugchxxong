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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Search, MoreHorizontal, Trash2, Flag, Check } from "lucide-react";

export function AdminComments() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock comments data
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Trần Văn B",
      avatar: "https://i.pravatar.cc/150?img=12",
      content:
        "Bài viết rất chi tiết và dễ hiểu! Cảm ơn tác giả đã chia sẻ những kiến thức hữu ích về React Hooks.",
      post: "Hướng dẫn toàn diện về React Hooks",
      status: "approved",
      date: "2024-01-11 14:30",
      reports: 0,
    },
    {
      id: 2,
      author: "Lê Thị C",
      avatar: "https://i.pravatar.cc/150?img=15",
      content:
        "Mình đã áp dụng các best practices này vào dự án và thấy hiệu quả rõ rệt.",
      post: "TypeScript Tips cho Developer",
      status: "approved",
      date: "2024-01-11 10:15",
      reports: 0,
    },
    {
      id: 3,
      author: "Nguyễn Văn X",
      avatar: "https://i.pravatar.cc/150?img=20",
      content:
        "Bài viết này không hay lắm, tác giả nên tham khảo thêm nguồn khác!!!",
      post: "CSS Grid và Flexbox",
      status: "pending",
      date: "2024-01-11 09:00",
      reports: 3,
    },
    {
      id: 4,
      author: "Phạm Minh D",
      avatar: "https://i.pravatar.cc/150?img=18",
      content:
        "Có thể giải thích thêm về phần useEffect dependencies không ạ?",
      post: "Hướng dẫn toàn diện về React Hooks",
      status: "approved",
      date: "2024-01-10 16:45",
      reports: 0,
    },
    {
      id: 5,
      author: "Hoàng Thị E",
      avatar: "https://i.pravatar.cc/150?img=25",
      content: "Spam link: check this out www.spam-site.com",
      post: "Node.js Best Practices",
      status: "reported",
      date: "2024-01-10 12:20",
      reports: 5,
    },
  ]);

  const getStatusBadge = (status: string, reports: number) => {
    if (reports > 0) {
      return (
        <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 gap-1">
          <Flag className="h-3 w-3" />
          {reports} báo cáo
        </Badge>
      );
    }
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            Đã duyệt
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
            Chờ duyệt
          </Badge>
        );
      case "reported":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
            Bị báo cáo
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleApprove = (id: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? { ...comment, status: "approved", reports: 0 }
          : comment
      )
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa bình luận này?")) {
      setComments(comments.filter((comment) => comment.id !== id));
    }
  };

  const filteredComments = comments.filter(
    (comment) =>
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.post.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2>Quản lý bình luận</h2>
        <p className="text-muted-foreground">
          Kiểm duyệt và quản lý bình luận từ người dùng
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Tổng bình luận</p>
          <h3 className="mb-1">{comments.length}</h3>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Chờ duyệt</p>
          <h3 className="mb-1 text-yellow-600">
            {comments.filter((c) => c.status === "pending").length}
          </h3>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Bị báo cáo</p>
          <h3 className="mb-1 text-red-600">
            {comments.filter((c) => c.reports > 0).length}
          </h3>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm bình luận..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Comments Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Người dùng</TableHead>
              <TableHead>Nội dung</TableHead>
              <TableHead>Bài viết</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{comment.author}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-sm">
                  <p className="line-clamp-2 text-sm">{comment.content}</p>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {comment.post}
                  </p>
                </TableCell>
                <TableCell>
                  {getStatusBadge(comment.status, comment.reports)}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {comment.date}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {comment.status !== "approved" && (
                        <DropdownMenuItem
                          onClick={() => handleApprove(comment.id)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Duyệt bình luận
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDelete(comment.id)}
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
