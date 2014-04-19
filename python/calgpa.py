from sys import argv
script_name, user = argv
print "Calculating GPA for ",user
f = open(user+".txt", "r")
summation = 0
total_credits = 0
def parsegrade(letter):
    if letter=="A":
        return 4.0
    elif letter=="A-":
        return 3.7
    elif letter=="B+":
        return 3.3
    elif letter=="B":
        return 3.0
    elif letter=="B-":
        return 2.7
    elif letter=="C+":
        return 2.4
    elif letter=="C":
        return 2.0
    elif letter=="D":
        return 1.0
    else:
        return 0.0

def parsegpa(grade):
    if grade < 4.0 and grade >=3.7:
        return "A"
    elif grade <3.7 and grade >=3.3:
        return "A-"
    elif grade < 3.3 and grade >=3.0:
        return "B"
    elif grade < 3.0 and grade >= 2.7:
        return "B-"
    elif grade <2.7 and grade >= 2.3:
        return "C+"
    elif grade <2.3 and grade >=2.0:
        return "C"
    elif grade < 2.0 and grade >= 1.0:
        return "D"
    else:
        return "F"
count = 0
print 
#Class,credits,grade
print "COURSE Name (Credits): Grade (Points)"
for line in f:
    if line[:2]=="--":
        if line[2:3] == "F":
            semester = "Fall"
        else:
            semester = "Winter"
        year = "20"+line[3:5]
        print "----"+semester+" "+year+"----"
    else:
        items = line.split(",")
        credits = items[1]
        count+=1
        letter = items[2]
        scale = parsegrade(letter)
        earned = scale*float(credits)
        summation = summation + earned
        total_credits = total_credits + float(credits)
        print items[0]+" ("+credits+"): "+letter+" ("+str(scale)+")"

print
grade = summation / total_credits
print "Total Grade Points Earned: "+str(summation)
print "Total Credits: "+str(total_credits)
print "Total Courses: "+str(count)
print 
print "GPA: "+str(grade)+" "+parsegpa(grade)
print "Done."
f.close()
