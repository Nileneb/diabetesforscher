# This script reads PDF files, splits them, and stores them in ChromaDB.
import os
import uuid
import chromadb
from chromadb.config import Settings
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain_huggingface import HuggingFaceEmbeddings
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv(dotenv_path="./.env")

def fetch_data_from_mysql():
    engine = create_engine(os.getenv("DSN"))
    query = """
    SELECT 
        id AS document_id,
        metadata,
        content AS page_content 
    FROM 
        your_table_name
    """
    with engine.connect() as conn:
        results = conn.execute(text(query))
        return [
            {"id": row["document_id"], "metadata": row.get("metadata", {}), "content": row["page_content"]}
            for row in results
        ]

folder_path = os.path.expanduser("../data/")

pdf_files = [f for f in os.listdir(folder_path) if f.endswith('.pdf')]

docs = []

for pdf_file in pdf_files:
    pdf_path = os.path.join(folder_path, pdf_file)
    loader = PyPDFLoader(pdf_path)
    pages = loader.load_and_split()

    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    docs.extend(text_splitter.split_documents(pages))

mysql_data = fetch_data_from_mysql()
for row in mysql_data:
    # Convert MySQL row format to the needed doc format
    docs.append({ "page_content": row["content"], "metadata": row["metadata"] })

embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

client = chromadb.HttpClient(host='host.docker.internal', port=8000, settings=Settings(allow_reset=True))
client.reset()
collection = client.create_collection("my_collection")

for doc in docs:
    collection.add(
        ids=[str(uuid.uuid4())], metadatas=doc.metadata, documents=doc.page_content
    )

print(f"{len(docs)} Dokumente wurden erfolgreich in die ChromaDB geladen.")
