import { getSortedPostsData } from "@/lib/blog";
import BlogClient from "./BlogClient";

export default function Blog() {
  const posts = getSortedPostsData();
  return <BlogClient posts={posts} />;
}