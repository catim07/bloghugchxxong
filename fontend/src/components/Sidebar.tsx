import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { UserPlus } from "lucide-react";

interface Author {
  name: string;
  avatar: string;
  followers: string;
  bio: string;
}

interface SidebarProps {
  authors: Author[];
  tags: { name: string; count: string }[];
}

export function Sidebar({ authors, tags }: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* Featured Authors */}
      <Card className="p-5">
        <h4 className="mb-4">Tác giả nổi bật</h4>
        <div className="space-y-4">
          {authors.map((author, index) => (
            <div key={index} className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={author.avatar} />
                <AvatarFallback>{author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {author.followers} người theo dõi
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0">
                    <UserPlus className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {author.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Tags */}
      <Card className="p-5">
        <h4 className="mb-4">Chủ đề phổ biến</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              #{tag.name}
              <span className="ml-1 text-xs opacity-70">({tag.count})</span>
            </Badge>
          ))}
        </div>
      </Card>

      {/* Additional Info Card */}
      <Card className="p-5 bg-muted/50">
        <h4 className="mb-2">Về BlogHub</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Nền tảng chia sẻ kiến thức và bài viết chất lượng cao dành cho cộng đồng lập trình viên và nhà sáng tạo nội dung.
        </p>
        <Button variant="outline" className="w-full">
          Tìm hiểu thêm
        </Button>
      </Card>
    </div>
  );
}
