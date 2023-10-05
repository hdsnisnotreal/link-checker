pip install Flask

from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check-links', methods=['POST'])
def check_links():
    links_input = request.json.get('links')
    links = [link.strip() for link in links_input.split(',')]

    accessible_links = []
    inaccessible_links = []

    for link in links:
        try:
            response = requests.head(link)
            if response.status_code < 400:
                accessible_links.append(link)
            else:
                inaccessible_links.append(link)
        except Exception as e:
            inaccessible_links.append(link)

    result = {
        'accessibleLinks': accessible_links,
        'inaccessibleLinks': inaccessible_links
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
