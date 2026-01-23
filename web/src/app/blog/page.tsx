import { getSortedPostsData } from "@/lib/blog";
import BlogClient from "./BlogClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Vinayak Tyagi",
  description: "Technical deep dives into DevOps, Homelabs, and Systems Engineering.",
};

export default function Blog() {
  const posts = getSortedPostsData();
  return <BlogClient posts={posts} />;
}