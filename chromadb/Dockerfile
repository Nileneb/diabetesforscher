# Dockerfile für ChromaDB Container
FROM python:3.9-slim

RUN pip install --no-cache-dir chromadb

CMD ["chromadb", "serve", "--host", "0.0.0.0", "--port", "8000"]
