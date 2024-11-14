import { Post as PostData, User } from "@prisma/client"
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { formatRelativeDate } from "@/lib/utils";

interface PostProps {
    post: PostData & { user: User };
}

export default function Post({ post }: PostProps) {
    return (
        <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
            <div className="flex flex-wrap gap-3">
                <Link href={`/user/${post.user.username}`}>
                    <UserAvatar avatarUrl={post.user.avatarUrl} className="cursor-pointer" />
                </Link>
                <div>
                    <Link href={`/user/${post.user.username}`}
                        className="block font-medium hover:underline"
                    >
                        <span>{post.user.displayName}</span>
                    </Link>
                    <Link
                        href={`/post/${post.id}`}
                        className="block text-sm text-muted-foreground hover:underline"
                    >
                        {formatRelativeDate(post.createdAt)}
                    </Link>
                </div>
            </div>
            <div className="whitespace-pre-line break-words">{post.content}</div>
        </article>
    )
}
