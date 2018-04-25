// OptionsPlay.SharedFile.cpp : Defines the exported functions for the DLL application.
//

#include "stdafx.h"
#include <stdio.h>
#include <sys\timeb.h> 
#include <stdlib.h>
#include<windows.h>
//#define LINENUM 174
#define LINESIZE 428
#define TESTTIME 100
#define _CRT_SECURE_NO_DEPRECATE

extern "C"_declspec(dllexport) int ReadSharedFolder(char *p, const char*targetFile, int lineNum);

void resetLoc(int *loc)
{
	*loc = 0;
}

int ReadSharedFolder(char *p, const char*targetFile, int lineNum){
	FILE *fp = fopen(targetFile, "r");
	if (fp == NULL)
	{
		perror("Error opeing file");
		return -1;
	}

	// manual initial one-dimension array p
	for (int i = 0; i < lineNum * (LINESIZE - 1); i++){
		p[i] = '\0';
	}

	// initialize two-dimension array quotation
	char **quotation;
	quotation = new char*[lineNum];
	for (int j = 0; j < lineNum; j++){
		quotation[j] = new char[LINESIZE];
	}
	int loc = 0;

	while (fgets(quotation[loc], LINESIZE, fp) != NULL)
	{
		loc++;
	}
	for (int i = 1; i < loc - 1; i++){
		for (int j = 0; j < (LINESIZE - 1); j++){
			p[(i - 1) * (LINESIZE - 1) + j] = quotation[i][j];
		}
	}
	fclose(fp);
	//resetLoc(&loc);
	// free array quotation
	for (int i = 0; i < lineNum; i++){
		delete[] quotation[i];
		quotation[i] = NULL;
	}
	delete[] quotation;

	return 0;
}




