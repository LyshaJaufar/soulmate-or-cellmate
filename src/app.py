from bs4 import BeautifulSoup
import requests
import re
import json
from celebrity import Celebrity
from flask import Flask
from flask_restful import Api, Resource
from flask import jsonify

app = Flask(__name__)
api = Api(app)


jsonObj = {
    "results": [

    ]
}

results = []

# Rest API


class CelebData(Resource):
    def get(self):
        response = jsonify(message=results)
        # Enable Access-Control-Allow-Origin
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response


api.add_resource(CelebData, "/testing")


def main():
    if __name__ == 'main':
        app.run()

    urls = ["https://celebrityxyz.com/list/profession/actor",
            "https://celebrityxyz.com/list/profession/actress"]

    # Fetch celeb names from home page
    for url in urls:
        home_doc = BeautifulSoup(requests.get(url).text, "html.parser")
        temp = []
        for celeb in home_doc.find_all(class_="celebs_list"):
            temp.append(celeb.get_text())
        celebrities = temp[0].split('\n')

        links = []
        for link in home_doc.find_all('a'):
            if not (re.search("list", link.get('href'))):
                links.append(link.get('href'))

    """
    home_url = f"https://celebrityxyz.com/list/profession/actor"
    home_page = requests.get(home_url).text
    home_doc = BeautifulSoup(home_page, "html.parser")

    temp = []
    for celeb in home_doc.find_all(class_="celebs_list"):
        temp.append(celeb.get_text())
    actresses = temp[0].split('\n')

    links = []
    for link in home_doc.find_all('a'):
        if not (re.search("list", link.get('href'))):
            links.append(link.get('href'))
    """
    create_json_obj(celebrities, links)
    write_to_file()


def create_json_obj(celebrities, links):
    celeb_links_dict = dict(zip(celebrities, links))
    for celeb in celebrities:
        if (celeb != ''):
            current_celeb = Celebrity(celeb, celeb_links_dict[celeb])
            current_celeb.fetch_data()
            jsonObj['results'].append({

                "name": current_celeb.name,
                "DOB": current_celeb.DOB,
                "image": current_celeb.img,
                "eye colour": current_celeb.eye_colour,
                "hair colour": current_celeb.hair_colour,
                "height": current_celeb.height,
                "weight": current_celeb.weight,
                "place of birth": current_celeb.place_of_birth,
                "nationality": current_celeb.nationality,
                "race": current_celeb.race,
                "trademarks": current_celeb.trademarks,
                "red flags": current_celeb.red_flags,
                "bio": current_celeb.bio,
                "occupation": current_celeb.occupation

            })


def write_to_file():
    jsonFile = open("data.json", "w")
    jsonFile.write(json.dumps(jsonObj))
    jsonFile.close()


main()
