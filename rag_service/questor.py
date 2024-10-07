from flask import Flask, request

@app.route('/query', methods=['POST'])
def respond_to_query():
    if request.method == 'POST':
        data = request.get_json()
        # Assuming the query is sent as a JSON object with a key named 'query'
        query = data.get('query')
        # Here you can process the query and generate a response
        response = f'This is the response to your query:\n {get_reponse(query)}'
        return response
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
