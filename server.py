from fastapi import FastAPI

app = FastAPI()

@app.get("/api/v2/heartbeat")
def heartbeat():
    return {"status": "healthy"}