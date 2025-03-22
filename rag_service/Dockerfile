# Dockerfile für Flask-Server Container
FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir \
    langchain_community \
    langchain_text_splitters \
    sentence-transformers \
    llama-index-embeddings-ollama \
    llama-index \
    openai \
    flask \
    pypdf

WORKDIR /usr/src/app

COPY . .

CMD ["python", "rag.py"]
