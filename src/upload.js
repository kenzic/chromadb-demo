import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
import data from "./data";

const client = new ChromaClient();

const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: "apiKey",
  openai_model: "text-embedding-3-small",
});

async function main() {
  const collection = await client.getOrCreateCollection({
    name: "nasaArticles",
    embeddingFunction: embedder,
  });

  // add the following:
  const ids = [];
  const documents = [];
  const metadatas = [];
  data.forEach((article) => {
    ids.push(article.id);
    documents.push(article.document);
    metadatas.push({
      title: article.title,
      url: article.url,
    });
  });

  await collection.add({
    ids,
    documents,
    metadatas,
  });

  console.log("Uploaded!");
}

main();
