import { getAllPosts } from "lib/api";
import Container from "components/container";
import Hero from "components/hero";
import Posts from "components/posts";
import Pagination from "components/pagination";

// ローカルの代替アイキャッチ画像
import { eyecatchLocal } from "lib/constants";

export default async function Home() {
  const data = await getData();
  return (
    <>
      <Container>
        <Hero title="CUBE" subtitle="アウトプットしていくサイト" imageOn />

        <Posts posts={data.posts} />
        <Pagination nextUrl="/blog" nextText="More Posts" />
      </Container>
    </>
  );
}

export async function getData() {
  const posts = await getAllPosts(4);

  for (const post of posts) {
    if (!post.hasOwnProperty("eyecatch")) {
      post.eyecatch = eyecatchLocal;
    }
  }

  return {
    posts: posts,
  };
}
