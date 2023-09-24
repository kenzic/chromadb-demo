import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb'
import data from "./data";

const client = new ChromaClient({
  auth: { // Provide client with auth options
    provider: "basic", // Tells client to use basic auth
    credentials: "admin:admin" // Tells client to use the username "admin" and password "admin"
  }
});

const embedder = new OpenAIEmbeddingFunction({openai_api_key: "apiKey"});

async function main() {
  const collection = await client.getOrCreateCollection({
    name: "nasaArticles",
    embeddingFunction: embedder
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
      url: article.url
    });
  });

  const result = await collection.add({
    ids,
    documents,
    metadatas
  });

  console.log('result', result);
}

main();
