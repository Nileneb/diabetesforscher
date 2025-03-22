import chromadb
from chromadb.config import Settings
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain_huggingface import HuggingFaceEmbeddings


# This function retrieves similar documents from the database for a given query.
def Extract_context(query):
    chroma_client = chromadb.HttpClient(host='host.docker.internal', port=8000, settings=Settings(allow_reset=False))
    embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    db = Chroma(
        client=chroma_client,
        collection_name="my_collection",
        embedding_function=embedding_function,
    )
    docs = db.similarity_search(query)
    fullcontent = ''
    for doc in docs:
        fullcontent = '. '.join([fullcontent, doc.page_content])

    return fullcontent

# This function generates a "system" prompt for the language model.
def get_system_message_rag(content):
    return f"""You are an expert consultant helping executive advisors to get relevant information from internal documents.

    Generate your response by following the steps below:
    1. Recursively break down the question into smaller questions.
    2. For each question/directive:
        2a. Select the most relevant information from the context in light of the conversation history.
    3. Generate a draft response using selected information.
    4. Remove duplicate content from draft response.
    5. Generate your final response after adjusting it to increase accuracy and relevance.
    6. Do not try to summarise the answers, explain it properly.
    6. Only show your final response! 
    
    Constraints:
    1. DO NOT PROVIDE ANY EXPLANATION OR DETAILS OR MENTION THAT YOU WERE GIVEN CONTEXT.
    2. Don't mention that you are not able to find the answer in the provided context.
    3. Don't make up the answers by yourself.
    4. Try your best to provide answer from the given context.

    CONTENT:
    {content}
    """

# This function generates a "user" prompt for the language model.
def get_ques_response_prompt(question):
    return f"""
    ==============================================================
    Based on the above context, please provide the answer to the following question:
    {question}
    """

from ollama import Client

# This function retrieves context and returns a response string from the model.
def generate_rag_response(content, question):
    client = Client(host='http://host.docker.internal:11434')
    stream = client.chat(model='mistral', messages=[
        {"role": "system", "content": get_system_message_rag(content)},
        {"role": "user", "content": get_ques_response_prompt(question)}
    ], stream=True)
    print(get_system_message_rag(content))
    print(get_ques_response_prompt(question))
    print("####### THINKING OF ANSWER............ ")
    full_answer = ''
    for chunk in stream:
        print(chunk['message']['content'], end='', flush=True)
        full_answer = ''.join([full_answer, chunk['message']['content']])

    return full_answer
