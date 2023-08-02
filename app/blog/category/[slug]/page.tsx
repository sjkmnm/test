import { getAllCategories, getAllPostsByCategory } from "@/lib/api";
import Container from "components/container";
import PostHeader from "@/components/post-header";
import Posts from "@/components/posts";

// ローカルの代替アイキャッチ画像
import { eyecatchLocal } from "@/lib/constants";

export async function generateStaticParams() {
  const allCats = await getAllCategories();
  const slugArray = [];

  for (const cats of allCats) {
    slugArray.push({ slug: cats.slug });
  }
  return slugArray;
}

export default async function Category({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params.slug);
  return (
    <Container>
      <PostHeader title={data.name} subtitle="Blog Category" />
      <Posts posts={data.posts} />
    </Container>
  );
}

export async function getData(params: string) {
  const catSlug = params;

  const allCats = await getAllCategories();
  const cat = allCats.find(({ slug }) => slug === catSlug);

  const posts = await getAllPostsByCategory(cat.id);

  for (const post of posts) {
    if (!post.hasOwnProperty("eyecatch")) {
      post.eyecatch = eyecatchLocal;
    }
  }

  return {
    name: cat.name,
    posts: posts,
  };
}
