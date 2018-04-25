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

	int m_bForPbUse;			//POWERBUILDER通讯协议标志

	int m_nCommSize;	//通讯区长度
	char *m_pComm;		//通讯区
	char m_szRow[ROW_SIZE];		//表行缓冲区
	char m_szTableLst[1000];	//存放所有表描述信息，包括每个表的行数、列数

	int RsRowNum;	//结果集总行数
	int RsRowNum0;	//当前页偏移值
	int RsColNum;	//当前表行数
	int RsRow;		//当前行号
	int LongNum;	//本页结束行号
	short int RsBlkCli; //当前页号,CICS使用, KCBP目前无用

	int m_nRsRowTotalNum;		//结果集总列数

	char m_szResultName[CURSORNAME_SIZE];	//当前结果集名称
	int m_nResultSet;		//当前结果集编号（序号）
	int m_nRsStartRow;	//current resultset start row
	int m_nRsEndRow;	//current resultset end row
	int m_nResultRows;		//所有结果集总的行指针计数,从1开始
	int m_nNumResultCols;	//结果集列数
	char m_szColNames[TABLEINFO_SIZE];		//当前结果集列名称

	unsigned char *m_pBlobBuffer;			//二进制数据临时返回缓冲区
	int m_nPacketIndex;
	int m_nWriteOffset;						//缓冲区当前偏移值
	int m_nPageOffset;					//SaveRow页起始偏移值
	int m_nReadOffset;					//RsFetch偏移值
	int m_nColumns;						//当前结果集列数
	tagColumn *m_pastColumn;
	bool m_bEndWrited;					//写结束标志

	//以X结尾使用pBuf为通讯区，以_结尾不删除原有的key	
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
	
	bool EndOfTran();		//判断交易是否结束

	int SetSystemParam(int nParam, char *pszBuffer);
	int GetSystemParam(int nParam, char *pszBuffer, int nBufSize);
	void FreeCommArea();

};
#endif
