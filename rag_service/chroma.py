import uuid
import chromadb
from chromadb.config import Settings

settings = Settings(allow_reset=False)
client = chromadb.HttpClient(host='host.docker.internal', port=8000, settings=settings)
collection = client.get_or_create_collection("my_collection")

for doc in docs:
    collection.add(
        ids=[str(uuid.uuid4())],  # Verwende uuid4 für bessere Sicherheit
        metadatas=[doc["metadata"]],
        documents=[doc["page_content"]]
    )

# tell LangChain to use our client and collection name
db = Chroma(
    client=client,
    collection_name="my_collection",
    embedding_function=embedding_function,
)
query = "What training does the model have?"
docs = db.similarity_search(query)
print(docs[0].page_content)
