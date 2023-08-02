import Container from "@/components/container";
import Hero from "@/components/hero";

export const metadata = {
  title: "404",
  openGraph: {
    title: "404",
  },
};

const Custom404 = () => {
  return (
    <Container>
      <Hero title="404" subtitle="ページが見つかりません" />
    </Container>
  );
};

export default Custom404;
