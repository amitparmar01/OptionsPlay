#ifndef _KCBPPACK_HPP
#define _KCBPPACK_HPP

//����ͷ����
#define VERSION_SIZE			2
#define PACKAGETYPE_SIZE		1
#define PACKAGETYPEEXTEND_SIZE	1
#define CONNECTIONID_SIZE		10
#define PACKETINDEX_SIZE		6
#define EOP_SIZE				1
#define NODE_SIZE				5
#define ADAPTERADDRESS_SIZE		12
#define USERNAME_SIZE			8
#define PASSWORD_SIZE			12
#define KCBPSERIAL_SIZE			26
#define SERVICENAME_SIZE		8
#define MESSAGEQUALIFIER_SIZE	5
#define PACKETLENGTH_SIZE		5
#define RETURNCODE_SIZE			6
#define PARITY_SIZE				3
#define RESERVED_SIZE			10

//��ˮ�Ÿ�ʽ����
#define DATE_SIZE			8
#define TIME_SIZE			6
#define AGENT_SIZE			6
#define AGENTSERIAL_SIZE	6

#define RETURNCODE_SIZE		6

#define KCBP_LOGIN			0
#define KCBP_LOGOUT			1
#define KCBP_REQUEST		2
#define KCBP_ANSWER			3
#define KCBP_QUERY_CANCEL	4
#define KCBP_SYSTEM_ERROR	5
#define KCBP_APP_ERROR		6
#define KCBP_LB_REQUEST		7						//LOADBALANCE
#define KCBP_LB_ANSWER		8
#define KCBP_COMMIT			9
#define KCBP_ROLLBACK		10
#define KCBP_CANCEL			11
#define KCBP_SOAP			12
#define KCBP_PREPARE		13

#define KCBP_NO_EXTEND		0

#define KCBP_EXTEND_BEGIN	1
#define KCBP_EXTENDING		2
#define KCBP_EXTEND_END		4

#define KCBP_EXTEND_ASYNC	8

//���ķ��������־,�����ڲ�����ת��
#define ENDOFPACKETS	2

//ȫ�����Ľ�����־
#define ENDOFPACKAGE	1

#if (defined(KCBP_AIX) && defined(__xlC__))
#pragma options align = packed
#else
#pragma pack(1)
#endif
struct KCBPPacketHeadRaw
{
	unsigned char Version[VERSION_SIZE];			// �汾��
	unsigned char PackageType[PACKAGETYPE_SIZE];	// ������������ʶ����Ϣ��������
	unsigned char PackageTypeExtend[PACKAGETYPEEXTEND_SIZE];	// ���÷�ʽ��չ��'0' ���ú��������'1'���ú������������	
	unsigned char ConnectionID[CONNECTIONID_SIZE];				// ���Ӻ�KCBP Client����ʱ��KCBP Server���䣬 ����ȷ������Ψһ��
	unsigned char PacketIndex[PACKETINDEX_SIZE];				// ����Ŵ�0 ��ʼ�� �Ҷ�����0
	unsigned char EOP[EOP_SIZE];						// ��������־0 δ������ 1 ȫ�����Ľ�����־, 2 ���ķ��������־,�����ڲ�����ת��
	unsigned char OriginalNode[NODE_SIZE];				// ��ʼ�ڵ��,��һ���յ�����Ľڵ�
	unsigned char SendNode[NODE_SIZE];					// ���ͽڵ��,��������Ľڵ�
	unsigned char DestNode[NODE_SIZE];					// ���սڵ��
	unsigned char AdapterAddress[ADAPTERADDRESS_SIZE];	// ������
	unsigned char Username[USERNAME_SIZE];				// KCBPUSER �û���
	unsigned char Password[PASSWORD_SIZE];				// KCBPUSER �û�����
	unsigned char KCBPSerial[KCBPSERIAL_SIZE];			// ��ˮ��
	unsigned char ServiceName[SERVICENAME_SIZE];		// ��������
	unsigned char PacketLength[PACKETLENGTH_SIZE];		// ���ݰ����ȣ���������ͷ�ĳ��ȣ�
	unsigned char ReturnCode[RETURNCODE_SIZE];			// ������
	unsigned char Reserved[RESERVED_SIZE];				// ����λ
	unsigned char Parity[PARITY_SIZE];					// У��λ��������
};

struct KCBPPacketHeadCooked
{
	char Version;			// �汾��
	char PackageType;		// ������������ʶ����Ϣ�������͡�
	char PackageTypeExtend; //
	int ConnectionID;		// ���Ӻ�KCBP Client����ʱ��KCBP Server���䣬 ����ȷ������Ψһ��
	short PacketIndex;		// ����Ŵ�0 ��ʼ
	char EOP;				// ��������־0 δ������ 1 ����
	short OriginalNode;		// ��ʼ�ڵ��,��һ���յ�����Ľڵ�
	short SendNode;			// ���ͽڵ��,��������Ľڵ�
	short DestNode;			// ���սڵ��
	unsigned char AdapterAddress[ADAPTERADDRESS_SIZE + 1];	// ������
	unsigned char Username[USERNAME_SIZE + 1];				// KCBPUSER �û���
	unsigned char Password[PASSWORD_SIZE + 1];				// KCBPUSER �û�����
	unsigned char KCBPSerial[KCBPSERIAL_SIZE + 1];			// ��ˮ��
	unsigned char ServiceName[SERVICENAME_SIZE + 1];		// ��������
	int PacketLength;	// ��ǰ���ݰ����ȣ���������ͷ�ĳ��ȣ�
	int ReturnCode;
	unsigned char Reserved[RESERVED_SIZE + 1];	// �ո���λ
	unsigned char Parity;						// У��λ��������	
};

struct KCBPPacket
{
	struct KCBPPacketHeadRaw stKCBPPacketHeadRaw;
	unsigned char PacketBody[1];
};

#if (defined(KCBP_AIX) && defined(__xlC__))
#pragma options align = reset
#elif defined(KCBP_SOL)
#pragma pack(4)
#else
#pragma pack()
#endif
#ifndef KCBPPACKINLINE
extern void ltrim(char *str);
extern void rtrim(char *str);
extern void alltrim(char *str);
extern int atoi_n(const char *szSrc, int len);
extern int atox_n(const char *szSrc, int len);
extern void strncpy_alltrim(char *szDest, const char *szSrc, int len);
extern void int2str(unsigned char *szDest, int iSrc, int iDestSize);
extern void PacketHeadRaw2Cooked(struct KCBPPacketHeadCooked &, struct KCBPPacketHeadRaw &);
extern void PacketHeadCooked2Raw(struct KCBPPacketHeadRaw &, struct KCBPPacketHeadCooked &);
extern int CalculateParity(struct KCBPPacket &stKCBPPacket);
extern void SetParity(struct KCBPPacket &stKCBPPacket);
extern int VerifyParity(struct KCBPPacket &stKCBPPacket);
extern int KCBPGetPacketLength(struct KCBPPacketHeadRaw &);
extern void KCBPSetPacketLength(struct KCBPPacketHeadRaw &, int);
extern int KCBPGetReturnCode(struct KCBPPacketHeadRaw &);
extern void KCBPSetReturnCode(struct KCBPPacketHeadRaw &, int);
#else
#include "KCBPPack.cpp"
#endif
#endif
