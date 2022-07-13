from bs4 import BeautifulSoup
import requests
import re


class Celebrity:
    def __init__(self):
        self.name = None
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
        url = f"https://celebrityxyz.com/actor/grant-gustin"
        page = requests.get(url).text
        doc = BeautifulSoup(page, "html.parser")

        self.DOB = doc.find(itemprop="birthDate").get_text().strip(' ')
        self.weight = doc.find(itemprop="weight").get_text().strip(' ')
        self.height = doc.find(itemprop="height").get_text().strip(' ')
        self.nationality = doc.find(
            itemprop="nationality").get_text().strip(' ')
        self.place_of_birth = doc.find(
            itemprop="birthPlace").get_text().strip(' ')

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


Bob = Celebrity()
Bob.fetch_data()
print(Bob.red_flags)
