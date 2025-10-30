import { useState } from "react";
import { Navigation } from "./Navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Save,
  Eye,
  Send,
  X,
  Plus,
  Image as ImageIcon,
  Code,
  Bold,
  Italic,
  Link as LinkIcon,
} from "lucide-react";
import { Card } from "./ui/card";
import { motion, AnimatePresence } from "motion/react";
import { Separator } from "./ui/separator";

interface NewArticleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onBack: () => void;
  onArticleAdded?: (newArticle: any) => void;
  isLoggedIn?: boolean;
}

export function NewArticle({
  darkMode,
  toggleDarkMode,
  onBack,
   onArticleAdded,
   isLoggedIn,
}: NewArticleProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showPreview, setShowPreview] = useState(true);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // 🧩 Gửi bài viết đến backend
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Vui lòng nhập tiêu đề và nội dung!");
      return;
    }
    if (!isLoggedIn) {
  alert("🚫 Vui lòng đăng nhập trước khi đăng bài!");
  onBack();
  return;
}

    const newArticle = {
      title,
      content,
      tags,
      author: "Admin", // tạm thời cố định
    };

    try {
      const res = await fetch("http://localhost:5000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      });

      if (!res.ok) {
        throw new Error("Lỗi khi gửi bài viết");
      }

      const data = await res.json();
      console.log("✅ Đã đăng bài:", data);
      alert("🎉 Đăng bài thành công!");
      onArticleAdded?.(data);
      // Reset form
      setTitle("");
      setContent("");
      setTags([]);
      
      onBack();
    } catch (err) {
      console.error("❌ Lỗi đăng bài:", err);
      alert("Không thể đăng bài. Kiểm tra console để xem chi tiết.");
    }
  };

  // Simple Markdown to HTML converter for preview
  const renderMarkdown = (text: string) => {
    let html = text;

    // Headers
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-500 hover:underline">$1</a>'
    );

    // Code blocks
    html = html.replace(
      /```(.*?)```/gs,
      '<pre class="bg-muted p-4 rounded-lg my-4 overflow-x-auto"><code>$1</code></pre>'
    );

    // Inline code
    html = html.replace(
      /`([^`]+)`/g,
      '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>'
    );

    // Line breaks
    html = html.replace(/\n/g, "<br />");

    return html;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="container mx-auto px-4 py-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            ← Quay lại
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Save className="h-4 w-4" />
              Lưu nháp
            </Button>
            <Button
              variant={showPreview ? "default" : "outline"}
              onClick={() => setShowPreview(!showPreview)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              {showPreview ? "Ẩn" : "Xem"} trước
            </Button>
            <Button
              className="gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
            >
              <Send className="h-4 w-4" />
              Đăng bài
            </Button>
          </div>
        </div>

        {/* Main Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Editor Column */}
          <div
            className={`${
              showPreview ? "lg:col-span-6" : "lg:col-span-12"
            } transition-all duration-300`}
          >
            <Card className="p-6 space-y-6">
              {/* Title Input */}
              <div>
                <Input
                  placeholder="Tiêu đề bài viết..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-0 border-b border-border rounded-none px-0 text-3xl focus-visible:ring-0 focus-visible:border-blue-500 transition-colors"
                />
              </div>

              <Separator />

              {/* Tags Input */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Thẻ tags (nhấn Enter để thêm)
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="rounded-full pl-3 pr-2 py-1 gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    >
                      #{tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nhập tag và nhấn Enter..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={handleAddTag}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Markdown Toolbar */}
              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="ghost" size="sm" className="gap-1">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  <LinkIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Code className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <div className="ml-auto">
                  <span className="text-xs text-muted-foreground">
                    Hỗ trợ Markdown
                  </span>
                </div>
              </div>

              {/* Content Editor */}
              <div>
                <Textarea
                  placeholder="Viết nội dung bài viết của bạn ở đây... 

# Tiêu đề lớn
## Tiêu đề nhỏ
### Tiêu đề nhỏ hơn

**Chữ đậm** hoặc *chữ nghiêng*

[Liên kết](https://example.com)

`code inline` hoặc

```
code block
```
"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[500px] resize-none border-0 focus-visible:ring-0 p-0"
                />
              </div>
            </Card>
          </div>

          {/* Preview Column */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="lg:col-span-6"
              >
                <Card className="p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-muted-foreground">Xem trước</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPreview(false)}
                      className="lg:hidden"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <Separator className="mb-6" />

                  {/* Preview Content */}
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {title && (
                      <h1 className="mb-4 pb-4 border-b border-border">
                        {title}
                      </h1>
                    )}

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {content ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: renderMarkdown(content),
                        }}
                        className="text-foreground leading-relaxed"
                      />
                    ) : (
                      <p className="text-muted-foreground italic">
                        Nội dung bài viết sẽ hiển thị ở đây...
                      </p>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Writing Tips */}
        <Card className="mt-6 p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
          <h4 className="mb-3 text-blue-900 dark:text-blue-300">
            💡 Mẹo viết bài
          </h4>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
            <li>• Sử dụng tiêu đề rõ ràng và hấp dẫn</li>
            <li>• Thêm tags phù hợp để người đọc dễ tìm thấy bài viết</li>
            <li>
              • Sử dụng Markdown để định dạng nội dung: **đậm**, *nghiêng*,
              `code`
            </li>
            <li>• Chia nhỏ đoạn văn và sử dụng tiêu đề phụ để dễ đọc</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
