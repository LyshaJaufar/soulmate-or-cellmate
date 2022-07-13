from bs4 import BeautifulSoup
import requests
import re
import json


class Celebrity:
    def __init__(self):
        self.name = None
        self.img = None
        self.DOB = None
        self.eye_colour = None
        self.hair_colour = None
        self.nationality = None
        self.race = None
        self.place_of_birth = None
        self.trademarks = None
        self.height = None
        self.weight = None
        self.red_flags = None
        self.bio = None
        self.occupation = []

    def fetch_data(self):
        url = f"https://celebrityxyz.com/actor/noah-schnapp"
        page = requests.get(url).text
        doc = BeautifulSoup(page, "html.parser")

        self.DOB = doc.find(itemprop="birthDate").get_text().strip(' ')
        self.weight = doc.find(itemprop="weight").get_text().strip(' ')
        self.height = doc.find(itemprop="height").get_text().strip(' ')
        self.nationality = doc.find(itemprop="nationality").get_text().strip(' ')
        self.place_of_birth = doc.find(itemprop="birthPlace").get_text().strip(' ')

        images = doc.findAll('img')
        for image in images:
            self.img = f"https://celebrityxyz.com/{image['src']}"
            break

        for jobTitle in doc.find_all(itemprop="jobTitle"):
            self.occupation.append(jobTitle.get_text().strip(' '))

        for tableData in doc.find_all('td'):
            if (re.search(tableData.get_text(), "hair color", re.IGNORECASE)):
                self.hair_colour = tableData.next_sibling.get_text().strip(' ')
            if (re.search(tableData.get_text(), "eye color", re.IGNORECASE)):
                self.eye_colour = tableData.next_sibling.get_text().strip(' ')
            if (re.search(tableData.get_text(), "ethnicity", re.IGNORECASE)):
                self.race = tableData.next_sibling.get_text().strip(' ')
            if (re.search(tableData.get_text(), "trademarks", re.IGNORECASE)):
                self.trademarks = tableData.next_sibling.get_text().strip(' ')

        quotes = []
        found = False
        i = 0
        for child in doc.find(id="biography"):
            if i == 1:
                self.bio = child.get_text().strip(' ')
            i += 1
            x = child.get_text()
            if (re.search("quotes", x, re.IGNORECASE)):
                found = True
            if (found):
                quotes.append(child.get_text().strip(' '))

        self.red_flags = quotes[-1].split('.')[0].replace('\n', '')

    def create_json(self):
        jsonObj = {
            "DOB": self.DOB,
            "image": self.img,
            "eye color": self.eye_colour,
            "hair colour": self.hair_colour,
            "nationality": self.nationality,
            "race": self.race,
            "place of birth": self.place_of_birth,
            "height": self.height,
            "weight": self.weight,
            "trademarks": self.trademarks,
            "red flags": self.red_flags,
            "bio": self.bio,
            "occupation": self.occupation
        }
        return json.dumps(jsonObj)


Bob = Celebrity()
Bob.fetch_data()

jsonFile = open("src/data.json", "w")
jsonFile.write(Bob.create_json())
jsonFile.close()
