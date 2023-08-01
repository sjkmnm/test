import { getPostBySlug } from "lib/api";
import Container from "components/container";

export default async function Shedule() {
  const data = await getData();
  return (
    <Container>
      <h1>{data.props.title}</h1>
    </Container>
  );
}

export async function getData() {
  const slug = "schedule";

  const post = await getPostBySlug(slug);

  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: post.eyecatch,
      categories: post.categories,
    },
  };
}
