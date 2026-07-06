
type PostType = "RESUMO" | "VÍDEO" | "LIVRO" | "CLIP" | "TRANSCRIÇÃO";
export interface Post {
    id: number;
    type: PostType;
    title: string;
    description: string;
    author: string;
    username: string;
    avatarInitials: string;
    avatarColor: string;
    timeAgo: string;
    tags: string[];
    likes: number;
    comments: number;
    bookmarked: boolean;
    liked: boolean;
    thumbnailType: "sql" | "audio" | "book" | "code" | "default";
    duration?: string;
}

export interface Topic {
    id: number;
    name: string;
    postCount: string;
    following: boolean;
}

export interface PopularContent {
    id: number;
    title: string;
    subtitle: string;
    icon: "video" | "book" | "audio" | "clip";
    iconBg: string;
}

export interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    section?: string;
}

export interface LoggedUser {
    name: string;
    username: string;
    initials: string;
}

export interface CreatePostModalProps {
    onClose: () => void;
    onPublish: (post: Partial<Post>) => void;
}

export interface LeftBarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}
