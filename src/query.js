import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb'

const client = new ChromaClient({
    auth: { // Provide client with auth options
        provider: "basic", // Tells client to use basic auth
        credentials: "admin:admin" // Tells client to use the username "admin" and password "admin"
    }
});

const embedder = new OpenAIEmbeddingFunction({openai_api_key: "apiKey"})

async function main() {
  const collection = await client.getCollection({
    name: "nasaArticles",
    embeddingFunction: embedder
  });

  const results = await collection.query({
    nResults: 2,
    queryTexts: ["What's happening on the space station?"]
  });

  console.log(JSON.stringify(results, null, 2));
}

main();
