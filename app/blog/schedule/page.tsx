import { getPostBySlug } from "lib/api";
import { extractText } from "lib/extract-text";
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
import Image from "next/image";

export default async function Shedule() {
  const data = await getData();
  return (
    <Container>
      <article>
        <PostHeader
          title={data.props.title}
          subtitle="Blog Article"
          publish={data.props.publish}
        />

        <figure>
          <Image
            src={data.props.eyecatch.url}
            alt=""
            layout="responsive"
            width={data.props.eyecatch.width}
            height={data.props.eyecatch.height}
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={data.props.content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={data.props.categories} />
          </TwoColumnSidebar>
        </TwoColumn>
      </article>
    </Container>
  );
}

export async function getData() {
  const slug = "schedule";

  const post = await getPostBySlug(slug);
  const description = extractText(post.content);

  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: post.eyecatch,
      categories: post.categories,
      description: description,
    },
  };
}
