/*
KCBP Packet Operation'S API CLASS
*/
#ifndef __KCBPPACKETOP_H__
#define __KCBPPACKETOP_H__

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include "KCBPPack.hpp"
#include "KCBPPacketOpExport.h"

#ifndef KCBP_ECI_CURRENT_VERSION
#define KCBP_ECI_CURRENT_VERSION	1
#endif

#define	UNKNOWN_ROWS	0xffffffff 

#define BUF_SIZE 32000-KCBPPACKETHEADRAW_SIZE
#define ROW_SIZE 4000
#define WARN_SIZE 28000-KCBPPACKETHEADRAW_SIZE
#define BLOCK_SIZE 28000-KCBPPACKETHEADRAW_SIZE
#define COMMAREAPAD_SIZE 1024
#define TABLEINFO_SIZE 1024
#define CURSORNAME_SIZE	32

#define KCBPPACKETHEADRAW_SIZE sizeof(KCBPPacketHeadRaw)	
#define KCBPPACKET_MAXSIZE BUF_SIZE+KCBPPACKETHEADRAW_SIZE

#define KCBP_PARAM_NODE			    0
#define KCBP_PARAM_CLIENT_MAC		1
#define KCBP_PARAM_CONNECTION_ID	2
#define KCBP_PARAM_SERIAL		    3
#define KCBP_PARAM_USERNAME		    4
#define KCBP_PARAM_PACKETTYPE       5
#define KCBP_PARAM_PACKAGETYPE      KCBP_PARAM_PACKETTYPE
#define KCBP_PARAM_SERVICENAME      6
#define KCBP_PARAM_RESERVED			7
#define KCBP_PARAM_DESTNODE			8
#define KCBP_PARAM_VERSION               9
#define KCBP_PARAM_PACKAGETYPEEXTEND     10
#define KCBP_PARAM_PASSWORD              11
#define KCBP_PARAM_SENDNODE              12

#define VER_FIRST           0x01
#define VER_SECOND          0x02

#define COLUMN_MAX_WIDTH	ROW_SIZE
#define COLUMN_DEFAULT_WIDTH 256

typedef struct
{
	int nIndex;
	char szName[32 + 1];
	int nType;
	char *pValue;
	int nSize;	//pValue space size
	int nPrecision;
	int nScale;
	int nLength;	//data length
}tagColumn;

class KCBPPACKETOP_API CKCBPPacketOp
{
private:
	
	KCBPPacketHeadRaw m_stKCBPPacketHeadRaw;
	KCBPPacketHeadCooked m_stKCBPPacketHeadCooked;

	int m_bForPbUse;			//POWERBUILDERͨѶЭ���־

	int m_nCommSize;	//ͨѶ������
	char *m_pComm;		//ͨѶ��
	char m_szRow[ROW_SIZE];		//���л�����
	char m_szTableLst[1000];	//������б�������Ϣ������ÿ���������������

	int RsRowNum;	//�����������
	int RsRowNum0;	//��ǰҳƫ��ֵ
	int RsColNum;	//��ǰ������
	int RsRow;		//��ǰ�к�
	int LongNum;	//��ҳ�����к�
	short int RsBlkCli; //��ǰҳ��,CICSʹ��, KCBPĿǰ����

	int m_nRsRowTotalNum;		//�����������

	char m_szResultName[CURSORNAME_SIZE];	//��ǰ���������
	int m_nResultSet;		//��ǰ�������ţ���ţ�
	int m_nRsStartRow;	//current resultset start row
	int m_nRsEndRow;	//current resultset end row
	int m_nResultRows;		//���н�����ܵ���ָ�����,��1��ʼ
	int m_nNumResultCols;	//���������
	char m_szColNames[TABLEINFO_SIZE];		//��ǰ�����������

	unsigned char *m_pBlobBuffer;			//������������ʱ���ػ�����
	int m_nPacketIndex;
	int m_nWriteOffset;						//��������ǰƫ��ֵ
	int m_nPageOffset;					//SaveRowҳ��ʼƫ��ֵ
	int m_nReadOffset;					//RsFetchƫ��ֵ
	int m_nColumns;						//��ǰ���������
	tagColumn *m_pastColumn;
	bool m_bEndWrited;					//д������־

	//��X��βʹ��pBufΪͨѶ������_��β��ɾ��ԭ�е�key	
	int GetValue0( char *KeyName, char *Value, int nLen );
	int SetValue0( char *KeyName, char *Value );
	int SetValue0_( char *KeyName, char *Value );
	int SetValueX( char *KeyName, char *Value, char *pBuf, int nBufLen );
	int SetValueX_( char *KeyName, char *Value, char *pBuf, int nBufLen );
	int SetValue_( char *KeyName, char *Value ); 		 
	
	void SetCaBeforeCall();	

	int GetColIndexByName(char *Name);

	int InitKCBPPacketHeadCooked();
	char * GetNetAddapterAddress(char *szAddress);
	int ReallocCommArea(int nLen);

	int RsBegin(int nResultSet, char *szName, int nColNum, char *szTableInfo, int nStartRow);
	int RsEnd();

	int InitColumnInfo(int nColumns, char *szColumnNameList);
	void DeleteColumnInfo();

public:

	CKCBPPacketOp();
	virtual ~CKCBPPacketOp();

	int PutKCBPPacket( void *pComm, int nLen );
	int GetKCBPPacket( void *pCommBuff, int pCommBuffLen, int &nLen);
	int GetKCBPPacketLen();

	int GetValue( char *KeyName, char *Value, int Num );
	int SetValue( char *KeyName, char *Value );

	int GetValue( char *KeyName, int &Value );
	int SetValue( char *KeyName, int Value );

	int GetValue( char *KeyName, __int64 &Value );
	int SetValue( char *KeyName, __int64 Value );

	int GetValue( char *KeyName, double &Value );
	int SetValue( char *KeyName, double Value );

	int GetValue( char *KeyName, char &Value );
	int SetValue( char *KeyName, char Value );

	int GetValueNum();
	int GetValueByIndex(int nIdx, char *Value, int nValueLen);
	int GetValueNameByIndex(int nIdx, char *KeyName, int nNameLen);
	int GetValueAndNameByIndex(int nIdx, char *KeyName, int nNameLen, char *Value, int nValueLen );

	int SetVal(char *szKeyName, unsigned char *pValue, long nSize);
	int GetVal(char *szKeyName, unsigned char **pValue, long *pSize);

	int GetErr(int &ErrCode,char *ErrMsg, int nErrMsgLen);
	int GetErrorCode(int &nErrno);
	int GetErrorMsg(char *ErrMsg, int nErrMsgLen);
	
	int RsCreate(char *Name, int ColNum,char *pColInfo);
	int RsNewTable(char *Name, int ColNum,char *pColInfo);
	
	void RsSetResultSet(int nResultSet);
	void RsSetRowNum(int nRsRowNum);

	int RsAddRow();
	int RsSaveRow();
	int RsFetchRow();
	
	int RsOpen();
	int RsMore();
	int RsClose();

	int RsGetColNames(char *pszInfo, int nLen);
	int RsGetColName(int nCol, char * szName, int nLen);
	int RsGetCursorName(char * pszCursorName, int nLen);
		
	int RsSetCol(int Col, char *Vlu);
	int RsGetCol(int Col, char *Vlu, int nVluLen);

	int RsSetCol(char *KeyName, char *Vlu);
	int RsGetCol(char *KeyName, char *Vlu, int nVluLen);

	int RsSetCol(char *KeyName, int Vlu);
	int RsGetCol(char *KeyName, int &Vlu);

	int RsSetCol(char *KeyName, __int64 Vlu);
	int RsGetCol(char *KeyName, __int64 &Vlu);

	int RsSetCol(char *KeyName, double Vlu);
	int RsGetCol(char *KeyName, double &Vlu);

	int RsSetCol(char *KeyName, char Vlu);
	int RsGetCol(char *KeyName, char &Vlu);

	int RsSetVal(int nColumnIndex, unsigned char *pValue, long nSize);
	int RsSetVal(char *szColumnName, unsigned char *pValue, long nSize);

	int RsGetVal(int nColumnIndex, unsigned char **pValue, long *pSize);
	int RsGetVal(char *szColumnName, unsigned char **pValue, long *pSize);

	int RsSetColNameList(char *ColName);
	int RsSetColNameList(int ColNum, char *ColName);
	
	int RsGetRowNum(int &nRows);
	int RsGetColNum(int &nCols);
	int RsGetTableColNum(int nt, int &nCols);
	int RsGetTableRowNum(int nt, int &nRows);
	
	int BeginWrite();
	int EndWrite();

	int GetCommLen(int &nLen);
	
	bool EndOfTran();		//�жϽ����Ƿ����

	int SetSystemParam(int nParam, char *pszBuffer);
	int GetSystemParam(int nParam, char *pszBuffer, int nBufSize);
	void FreeCommArea();

};
#endif
