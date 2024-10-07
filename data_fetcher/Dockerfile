# Dockerfile für den Data Fetcher
FROM python:3.9-slim

# Installiere die benötigten Python-Bibliotheken
RUN pip install --no-cache-dir pandas requests beautifulsoup4

# Setze das Arbeitsverzeichnis
WORKDIR /usr/src/app

# Kopiere das Python-Skript in das Arbeitsverzeichnis
COPY data_fetcher.py .

# Füge einen Cronjob hinzu, um das Skript täglich auszuführen
RUN apt-get update && apt-get install -y cron && apt-get clean

# Erstelle einen Crontab-Eintrag
RUN echo "0 0 * * * python /usr/src/app/data_fetcher.py" > /etc/cron.d/datafetcher-cron

# Gib dem Crontab-Eintrag die richtigen Berechtigungen
RUN chmod 0644 /etc/cron.d/datafetcher-cron

# Starte den Cron-Dienst
CMD ["cron", "-f"]
