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

            onlyAlpha = False
            if tableData_text2.isalpha == True:
                onlyAlpha = True
            if onlyAlpha == True:
                if (re.search(tableData_text2, "hair color", re.IGNORECASE)):
                    self.hair_colour = tableData.next_sibling.get_text().strip(' ')
                if (re.search(tableData_text2, "eye color", re.IGNORECASE)):
                    self.eye_colour = tableData.next_sibling.get_text().strip(' ')
                if (re.search(tableData_text2, "ethnicity", re.IGNORECASE)):
                    self.race = tableData.next_sibling.get_text().strip(' ')
                if (re.search(tableData_text2, "trademarks", re.IGNORECASE)):
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
        if found != False:
            self.red_flags = quotes[-1].split('.')[0].replace('\n', '')