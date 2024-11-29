import os
import uuid
import chromadb
from chromadb.config import Settings
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain_huggingface import HuggingFaceEmbeddings


folder_path = os.path.expanduser("./ollama/data/")


pdf_files = [f for f in os.listdir(folder_path) if f.endswith('.pdf')]

docs = []


for pdf_file in pdf_files:
    pdf_path = os.path.join(folder_path, pdf_file)
    loader = PyPDFLoader(pdf_path)
    pages = loader.load_and_split()


    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    docs.extend(text_splitter.split_documents(pages))


embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")


client = chromadb.HttpClient(host='host.docker.internal', port=8000, settings=Settings(allow_reset=True))
client.reset()
collection = client.create_collection("my_collection")


for doc in docs:
    collection.add(
        ids=[str(uuid.uuid1())], metadatas=doc.metadata, documents=doc.page_content
    )


print(f"{len(docs)} Dokumente wurden erfolgreich in die ChromaDB geladen.")
