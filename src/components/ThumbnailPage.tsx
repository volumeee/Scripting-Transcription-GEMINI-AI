import Layout from "./Layout";
import PageCard from "./PageCard";

export default function ThumbnailPage() {
  return (
    <Layout>
      <PageCard
        pageName="Thumbnail Page"
        pageDesc="This page allows content creators to generate thumbnails for their videos."
      />
      <p
        style={{
          color: "red",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        IN DEVELOPMENT
      </p>
    </Layout>
  );
}
