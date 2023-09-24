import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";

const client = new ChromaClient();

const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: "apiKey",
  openai_model: "text-embedding-3-small",
});

async function main() {
  const collection = await client.getCollection({
    name: "nasaArticles",
    embeddingFunction: embedder,
  });

  const results = await collection.query({
    nResults: 2,
    queryTexts: ["What's happening on the space station?"],
  });

  console.log(JSON.stringify(results, null, 2));
}

main();
