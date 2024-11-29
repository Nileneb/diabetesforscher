FROM ollama/ollama:latest

# Arbeitsverzeichnis korrekt setzen
WORKDIR /ollama

# Startskript aus dem Projekt kopieren
COPY start_ollama.sh /ollama/start_ollama.sh
RUN chmod +x /ollama/start_ollama.sh

# Ollama starten
CMD ["/ollama/start_ollama.sh"]
