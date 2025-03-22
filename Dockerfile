# Dockerfile für Server Container
FROM nvidia/cuda:12.3.2-devel-ubuntu20.04

# Installiere System-Abhängigkeiten
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    sudo \
    gnupg \
    lsb-release \
    python3 \
    python3-pip \
    supervisor \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Installiere Ollama
RUN curl https://ollama.ai/install.sh | sh

# Installiere Python-Pakete
RUN pip install --no-cache-dir \
    chromadb \
    uvicorn \
    fastapi \
    langchain_community \
    langchain_text_splitters \
    sentence-transformers \
    llama-index-embeddings-ollama \
    llama-index \
    openai \
    flask \
    pypdf

# Setze Arbeitsverzeichnis
WORKDIR /usr/src/app

# Kopiere alle notwendigen Dateien
COPY . .

# Kopiere Supervisord-Konfiguration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Starte Supervisord
CMD ["/usr/bin/supervisord"]