FROM nvidia/cuda:12.3.2-devel-ubuntu20.04

RUN apt-get update && apt-get install -y \
    wget \
    curl \
    sudo \
    gnupg \
    lsb-release \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN curl https://ollama.ai/install.sh | sh

WORKDIR /usr/src/app

COPY start_ollama.sh /usr/src/app/start_ollama.sh

RUN chmod +x /usr/src/app/start_ollama.sh

CMD ["/usr/src/app/start_ollama.sh"]
