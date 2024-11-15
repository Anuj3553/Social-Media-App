"use client"

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/posts/Post";
import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import kyInstance from "@/lib/ky";
import { Button } from "@/components/ui/button";

export default function ForYouFeed() {

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ["post-feed", "for-you"],
        queryFn: ({ pageParam }) =>
            kyInstance.get(
                "/api/posts/for-you",
                pageParam ? { searchParams: { cursor: pageParam } } : {}
            ).json<PostsPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage?.data?.nextCursor
    });

    const posts = data?.pages?.flatMap((page) => page.data.posts) || [];

    if (status === "pending") {
        return <Loader2 className="mx-auto animate-spin" />;
    }

    if (status === "error") {
        return <p className="text-center text-destructive">
            An error occurred while loading posts.
        </p>;
    }

    return (
        <InfiniteScrollContainer
            className="space-y-5"
            onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        >
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
            {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
        </InfiniteScrollContainer>
    );
}
