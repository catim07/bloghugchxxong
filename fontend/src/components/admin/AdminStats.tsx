import { Card } from "../ui/card";
import {
  FileText,
  Users,
  MessageCircle,
  TrendingUp,
  Eye,
  Heart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function AdminStats() {
  // Mock data for stats cards
  const stats = [
    {
      title: "Tổng bài viết",
      value: "1,234",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Người dùng",
      value: "5,678",
      change: "+8%",
      icon: Users,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Bình luận",
      value: "12,456",
      change: "+23%",
      icon: MessageCircle,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Lượt xem",
      value: "89,234",
      change: "+15%",
      icon: Eye,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
  ];

  // Mock data for charts
  const monthlyData = [
    { month: "T1", posts: 65, users: 28 },
    { month: "T2", posts: 59, users: 48 },
    { month: "T3", posts: 80, users: 40 },
    { month: "T4", posts: 81, users: 56 },
    { month: "T5", posts: 96, users: 67 },
    { month: "T6", posts: 105, users: 73 },
  ];

  const categoryData = [
    { name: "JavaScript", value: 400, color: "#3B82F6" },
    { name: "React", value: 300, color: "#8B5CF6" },
    { name: "TypeScript", value: 200, color: "#10B981" },
    { name: "CSS", value: 150, color: "#F59E0B" },
    { name: "Node.js", value: 100, color: "#EF4444" },
  ];

  // Top posts mock data
  const topPosts = [
    {
      title: "Hướng dẫn toàn diện về React Hooks",
      views: 12456,
      likes: 234,
    },
    {
      title: "TypeScript Tips cho Developer",
      views: 9823,
      likes: 189,
    },
    {
      title: "Next.js 14 và App Router",
      views: 8765,
      likes: 312,
    },
    {
      title: "CSS Grid và Flexbox Mastery",
      views: 7654,
      likes: 156,
    },
    {
      title: "Node.js Best Practices 2025",
      views: 6543,
      likes: 278,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2>Thống kê tổng quan</h2>
        <p className="text-muted-foreground">
          Xem tổng quan về hoạt động của nền tảng
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <h3 className="mb-2">{stat.value}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">{stat.change}</span>
                  <span className="text-muted-foreground">vs tháng trước</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="p-6">
          <h3 className="mb-4">Bài viết & Người dùng theo tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="posts" fill="#3B82F6" name="Bài viết" />
              <Bar dataKey="users" fill="#8B5CF6" name="Người dùng" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart */}
        <Card className="p-6">
          <h3 className="mb-4">Phân bố theo chủ đề</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Posts Table */}
      <Card className="p-6">
        <h3 className="mb-4">Top bài viết hot nhất</h3>
        <div className="space-y-4">
          {topPosts.map((post, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <span className="text-blue-600 dark:text-blue-400">
                    #{index + 1}
                  </span>
                </div>
                <div>
                  <p className="line-clamp-1">{post.title}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
