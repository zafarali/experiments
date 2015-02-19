
#include <stdio.h>

int main(int argc, char *argv[]){
	//C data types
	int age = 100;
	float power = 2.345f;
	double superpower = 5.6789;

	//note the difference between single quotes
	//and double quotes distinguishing strings and chars
	char initial = 'Z';
	char firstname[] = "Coolio";

	printf("I am %d years old\n", age);
	printf("%f powers \n", power);
	printf("%f superpowers \n",superpower);
	printf("Intiial: %c \n", initial);
	printf("Name: %s\n", firstname);

	printf("Printing an empty string: \n");
	printf("");
	return 0;
}
