import { getAllSlugs, getPostBySlug } from "lib/api";
import { extractText } from "lib/extract-text";
import { prevNextPost } from "lib/prev-next-post";
import Container from "components/container";
import PostHeader from "components/post-header";
import PostBody from "@/components/post-body";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "components/two-column";
import ConvertBody from "components/convert-body";
import PostCategories from "components/post-categories";
import Pagination from "components/pagination";
import Image from "next/legacy/image";
import { getPlaiceholder } from "plaiceholder";

// ローカルの代替アイキャッチ画像
import { eyecatchLocal } from "@/lib/constants";

export async function generateStaticParams() {
  return [{ slug: "schedule" }, { slug: "music" }, { slug: "micro" }];
}

export default async function Post({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);
  return (
    <Container>
      <article>
        <PostHeader
          title={data.title}
          subtitle="Blog Article"
          publish={data.publish}
        />

        <figure>
          <Image
            src={data.eyecatch.url}
            alt=""
            layout="responsive"
            width={data.eyecatch.width}
            height={data.eyecatch.height}
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
            // placeholder="blur"
            // blurDataURL={data.eyecatch.blurDataURL}
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={data.content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={data.categories} />
          </TwoColumnSidebar>
        </TwoColumn>
        <Pagination
          prevText={data.prevPost.title}
          prevUrl={`/blog/${data.prevPost.slug}`}
          nextText={data.nextPost.title}
          nextUrl={`/blog/${data.nextPost.slug}`}
        />
      </article>
    </Container>
  );
}

export async function getData(params: string) {
  const post = await getPostBySlug(params);
  const description = extractText(post.content);
  const eyecatch = post.eyecatch ?? eyecatchLocal;

  const allSlugs = await getAllSlugs();
  const [prevPost, nextPost] = prevNextPost(allSlugs, params);

  return {
    title: post.title,
    publish: post.publishDate,
    content: post.content,
    eyecatch: eyecatch,
    categories: post.categories,
    description: description,
    prevPost: prevPost,
    nextPost: nextPost,
  };
}
