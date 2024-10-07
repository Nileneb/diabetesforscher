import pandas as pd
import requests
from bs4 import BeautifulSoup
import chromadb
from chromadb.config import Settings
from uuid import uuid1


client = chromadb.HttpClient(host='chromadb', port=8000, settings=Settings(allow_reset=True))


collection_name = "diabetes_studies"
try:
    collection = client.get_collection(name=collection_name)
except:
    collection = client.create_collection(name=collection_name)


search_term = "Type 2 Diabetes Meta-Analysis"
base_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/"
search_url = f"{base_url}esearch.fcgi?db=pmc&term={search_term}&retmax=20&retmode=json"
summary_url = f"{base_url}esummary.fcgi?db=pmc&id="


search_response = requests.get(search_url)
search_data = search_response.json()


article_ids = search_data['esearchresult']['idlist']


articles = []

for article_id in article_ids:
    details_response = requests.get(f"{summary_url}{article_id}&retmode=json")
    details_data = details_response.json()
    docsum = details_data['result'][article_id]
    
    title = docsum.get('title', 'No Title')
    authors = ', '.join([author['name'] for author in docsum.get('authors', [])])
    pubdate = docsum.get('pubdate', 'No Date')
    source = docsum.get('source', 'No Source')
    link = f"https://www.ncbi.nlm.nih.gov/pmc/articles/{article_id}/"
    
    
    existing_docs = collection.get({"ids": [article_id]})
    if not existing_docs:
       
        collection.add(
            ids=[article_id],
            documents=[{
                'title': title,
                'authors': authors,
                'pubdate': pubdate,
                'source': source,
                'link': link
            }]
        )
        articles.append({
            'ID': article_id,
            'Title': title,
            'Authors': authors,
            'Publication Date': pubdate,
            'Source': source,
            'Link': link
        })

df = pd.DataFrame(articles)


df.to_pdf('/mnt/data/PMC_Type_2_Diabetes_Articles.pdf', index=False)

import ace_tools as tools; tools.display_dataframe_to_user(name="PMC Type 2 Diabetes Articles", dataframe=df)
