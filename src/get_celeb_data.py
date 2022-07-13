from bs4 import BeautifulSoup
import requests
import re

url = f"https://celebrityxyz.com/actor/grant-gustin"
page = requests.get(url).text
doc = BeautifulSoup(page, "html.parser")


# for celeb in doc.find_all(class_="celebs_list"):
# print(celeb.get_text())


for jobTitle in doc.find_all(itemprop="jobTitle"):
    print(jobTitle.get_text())

print((doc.find(itemprop="birthDate")).get_text())
print((doc.find(itemprop="weight")).get_text())
print((doc.find(itemprop="height")).get_text())
print((doc.find(itemprop="nationality")).get_text())
print((doc.find(itemprop="birthPlace")).get_text())

for tableData in doc.find_all('td'):
    if (re.search(tableData.get_text(), "hair color", re.IGNORECASE)):
        print(tableData.next_sibling.get_text())
    if (re.search(tableData.get_text(), "eye color", re.IGNORECASE)):
        print(tableData.next_sibling.get_text())
    if (re.search(tableData.get_text(), "ethnicity", re.IGNORECASE)):
        print(tableData.next_sibling.get_text())
    if (re.search(tableData.get_text(), "trademarks", re.IGNORECASE)):
        print(tableData.next_sibling.get_text())
