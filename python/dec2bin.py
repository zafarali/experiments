def dec2bin(num):

	if num == 1: #this is the escape case
	#this ensures that we dont go into an infinite loop
	# the reason we pick this case is because
	#1/2 will be 1, and that is the sign to terminante the algorithm
		return 1
	else:
		#now our number input is more than 1
		remain = num % 2 #this finds the bit representation
		#here we find the decimal representation of the number divided by 2
		#and to that we add our current bit to the end
		return str(dec2bin(num/2))+str(remain)



#doesnt have to do anything with the algorithm
num = raw_input("What is the decimal representation?")
print dec2bin(int(num))