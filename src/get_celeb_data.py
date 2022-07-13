from bs4 import BeautifulSoup
import requests
import re
import json
from celebrity import Celebrity

jsonObj = {
    "results": [

    ]
}


def main():
    # Fetch celeb names from home page
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

    create_json_obj(actresses, links)
    write_to_file()


def create_json_obj(actresses, links):
    actress_links_dict = dict(zip(actresses, links))
    for actress in actresses:
        if (actress != ''):
            current_actress = Celebrity(actress.lower().replace(
                ' ', '-'), actress_links_dict[actress])
            current_actress.fetch_data()
            jsonObj['results'].append({

                "DOB": current_actress.DOB,
                "image": current_actress.img,
                "eye colour": current_actress.eye_colour,
                "hair colour": current_actress.hair_colour,
                "height": current_actress.height,
                "weight": current_actress.weight,
                "place of birth": current_actress.place_of_birth,
                "nationality": current_actress.nationality,
                "race": current_actress.race,
                "trademarks": current_actress.trademarks,
                "red flags": current_actress.red_flags,
                "bio": current_actress.bio,
                "occupation": current_actress.occupation

            })


def write_to_file():
    jsonFile = open("src/data.json", "w")
    jsonFile.write(json.dumps(jsonObj))
    jsonFile.close()

main()