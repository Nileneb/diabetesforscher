import os
import uuid
import chromadb
from chromadb.config import Settings
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter, LanguageAwareTextSplitter, MarkdownTextSplitter
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings

# Ordner für die Daten (angepasster Pfad)
folder_path = os.path.expanduser("./data/chroma/")

# Unterstützte Dateiformate und zugehörige Loader und Splitter definieren
supported_formats = {
    '.pdf': (PyPDFLoader, RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)),
    '.js': (TextLoader, LanguageAwareTextSplitter(chunk_size=1000, chunk_overlap=100, language="javascript")),
    '.jsx': (TextLoader, LanguageAwareTextSplitter(chunk_size=1000, chunk_overlap=100, language="javascript")),
    '.html': (TextLoader, RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, separators=["\n\n", "\n", " "])),
    '.css': (TextLoader, RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, separators=["\n\n", "\n", " "])),
    '.md': (TextLoader, MarkdownTextSplitter(chunk_size=1000, chunk_overlap=200))
}

# Dateien im Zielordner finden
files = [f for f in os.listdir(folder_path) if any(f.endswith(ext) for ext in supported_formats)]

docs = []

for file in files:
    file_path = os.path.join(folder_path, file)
    file_extension = os.path.splitext(file)[1]

    # Wähle den passenden Loader und Splitter basierend auf dem Dateiformat
    loader_class, text_splitter = supported_formats[file_extension]
    loader = loader_class(file_path)

    # Dokument laden und splitten
    pages = loader.load_and_split()
    docs.extend(text_splitter.split_documents(pages))

# Embedding-Modell initialisieren
embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

# ChromaDB-Verbindung herstellen
client = chromadb.HttpClient(host='host.docker.internal', port=8000, settings=Settings(allow_reset=True))
client.reset()
collection = client.create_collection("my_collection")

# Dokumente in die ChromaDB laden
for doc in docs:
    collection.add(
        ids=[str(uuid.uuid1())], metadatas=doc.metadata, documents=doc.page_content
    )

print(f"{len(docs)} Dokumente wurden erfolgreich in die ChromaDB geladen.")
