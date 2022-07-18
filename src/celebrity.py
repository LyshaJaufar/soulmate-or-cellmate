from bs4 import BeautifulSoup
import requests
import re


class Celebrity:
    def __init__(self, name, link):
        self.name = name
        self.link = link
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
        print(self.name)
        url = f"https://celebrityxyz.com{self.link}"
        page = requests.get(url).text
        doc = BeautifulSoup(page, "html.parser")

        tempDOB = doc.find(itemprop="birthDate")
        tempWeight = doc.find(itemprop="weight")
        tempHeight = doc.find(itemprop="height")
        tempNationality = doc.find(itemprop="nationality")
        tempPlaceOfBirth = doc.find(itemprop="birthPlace")
        if tempDOB != None:
            self.DOB = tempDOB.get_text().strip(' ')
        if tempWeight != None:
            self.weight = tempWeight.get_text().strip(' ')
        if tempHeight != None:
            self.height = tempHeight.get_text().strip(' ')
        if tempNationality != None:
            self.nationality = tempNationality.get_text().strip(' ')
        if tempPlaceOfBirth != None:
            self.place_of_birth = tempPlaceOfBirth.get_text().strip(' ')

        images = doc.findAll('img')
        for image in images:
            self.img = f"https://celebrityxyz.com/{image['src']}"
            break

        for jobTitle in doc.find_all(itemprop="jobTitle"):
            self.occupation.append(jobTitle.get_text().strip(' '))

        for tableData in doc.find_all('td'):
            tableData_text = tableData.get_text().replace(')', "")
            tableData_text2 = tableData_text.replace('(', "").strip(' ')
            temp = tableData_text.replace(' ', "")

            onlyAlpha = False
            if temp.isalpha() == True:
                onlyAlpha = True
            if onlyAlpha == True:
                if ("hair color" in tableData_text2.lower()):
                    self.hair_colour = tableData.next_sibling.get_text().strip(' ')
                if ("eye color" in tableData_text2.lower()):
                    self.eye_colour = tableData.next_sibling.get_text().strip(' ')
                if ("ethnicity" in tableData_text2.lower()):
                    self.race = tableData.next_sibling.get_text().strip(' ')
                if ("trademark" in tableData_text2.lower()):
                    self.trademarks = tableData.next_sibling.get_text().strip(' ')
                if ("zodiac" in tableData_text2.lower()):
                    self.red_flags = tableData.next_sibling.get_text().strip(' ')

        quotes = []
        found = False
        i = 0
        for child in doc.find(id="biography"):
            if i == 1:
                self.bio = child.get_text().strip(' ')
            i += 1
            break
