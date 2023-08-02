import { getAllPosts } from "lib/api";
import Meta from "components/meta";
import Container from "components/container";
import Hero from "components/hero";
import Posts from "components/posts";
import { getPlaiceholder } from "plaiceholder";

// ローカルの代替アイキャッチ画像
import { eyecatchLocal } from "@/lib/constants";

export const metadata = {
  title: "ブログ",
  openGraph: {
    title: "ブログ",
  },
};

export default async function Blog() {
  const data = await getData();
  return (
    <>
      <Container>
        {/* <Meta pageTitle="ブログ" pageDesc="ブログの記事一覧" /> */}
        <Hero title="Blog" subtitle="Recent Posts" />

        <Posts posts={data.posts} />
      </Container>
    </>
  );
}

export async function getData() {
  const posts = await getAllPosts();

  for (const post of posts) {
    if (!post.hasOwnProperty("eyecatch")) {
      post.eyecatch = eyecatchLocal;
    }
  }

  return {
    posts: posts,
  };
}
