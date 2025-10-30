import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ArticleCardProps {
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  thumbnail: string;
  likes: number;
  comments: number;
  tags: string[];
  readTime: string;
  date: string;
  onClick?: () => void;
}

export function ArticleCard({
  title,
  description,
  author,
  thumbnail,
  likes,
  comments,
  tags,
  readTime,
  date,
  onClick,
}: ArticleCardProps) {
  return (
    <Card
      className="overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        <ImageWithFallback
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="rounded-full">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2">{title}</h3>

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Author & Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={author.avatar} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm">{author.name}</span>
              <span className="text-xs text-muted-foreground">
                {date} · {readTime}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span className="text-sm">{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{comments}</span>
            </div>
            <Bookmark className="h-4 w-4 cursor-pointer hover:fill-current" />
          </div>
        </div>
      </div>
    </Card>
  );
}
