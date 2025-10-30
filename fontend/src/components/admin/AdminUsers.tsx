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
import { Search, MoreHorizontal, Lock, Unlock, Trash2, Mail } from "lucide-react";

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "active",
      posts: 42,
      followers: 12500,
      joinDate: "2023-03-15",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      avatar: "https://i.pravatar.cc/150?img=5",
      status: "active",
      posts: 28,
      followers: 8300,
      joinDate: "2023-05-20",
    },
    {
      id: 3,
      name: "Lê Minh C",
      email: "leminhc@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      status: "active",
      posts: 35,
      followers: 15100,
      joinDate: "2023-02-10",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      avatar: "https://i.pravatar.cc/150?img=9",
      status: "blocked",
      posts: 12,
      followers: 6700,
      joinDate: "2023-08-05",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      avatar: "https://i.pravatar.cc/150?img=7",
      status: "active",
      posts: 56,
      followers: 18200,
      joinDate: "2023-01-12",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            Đang hoạt động
          </Badge>
        );
      case "blocked":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
            Đã khóa
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleBlock = (id: number) => {
    if (confirm("Bạn có chắc muốn khóa tài khoản này?")) {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, status: "blocked" } : user
        )
      );
    }
  };

  const handleUnblock = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: "active" } : user
      )
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa tài khoản này? Hành động này không thể hoàn tác.")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Quản lý người dùng</h2>
          <p className="text-muted-foreground">
            Quản lý tất cả tài khoản người dùng
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Tổng người dùng</p>
          <h3 className="mb-1">{users.length.toLocaleString()}</h3>
          <p className="text-sm text-green-600">+12% so với tháng trước</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Đang hoạt động</p>
          <h3 className="mb-1">
            {users.filter((u) => u.status === "active").length}
          </h3>
          <p className="text-sm text-muted-foreground">
            {((users.filter((u) => u.status === "active").length / users.length) * 100).toFixed(0)}% tổng số
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Đã khóa</p>
          <h3 className="mb-1">
            {users.filter((u) => u.status === "blocked").length}
          </h3>
          <p className="text-sm text-red-600">Cần xem xét</p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm người dùng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Người dùng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Bài viết</TableHead>
              <TableHead>Người theo dõi</TableHead>
              <TableHead>Ngày tham gia</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>{user.posts}</TableCell>
                <TableCell>{user.followers.toLocaleString()}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Gửi email
                      </DropdownMenuItem>
                      {user.status === "active" ? (
                        <DropdownMenuItem
                          onClick={() => handleBlock(user.id)}
                          className="text-orange-600"
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Khóa tài khoản
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleUnblock(user.id)}>
                          <Unlock className="h-4 w-4 mr-2" />
                          Mở khóa
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Xóa tài khoản
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
