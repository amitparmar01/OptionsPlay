#ifndef _KCBPPACK_HPP
#define _KCBPPACK_HPP

//报文头定义
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

//流水号格式定义
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

//报文分组结束标志,用于内部报文转换
#define ENDOFPACKETS	2

//全部报文结束标志
#define ENDOFPACKAGE	1

#if (defined(KCBP_AIX) && defined(__xlC__))
#pragma options align = packed
#else
#pragma pack(1)
#endif
struct KCBPPacketHeadRaw
{
	unsigned char Version[VERSION_SIZE];			// 版本号
	unsigned char PackageType[PACKAGETYPE_SIZE];	// 包类型用来标识此消息包的类型
	unsigned char PackageTypeExtend[PACKAGETYPEEXTEND_SIZE];	// 调用方式扩展，'0' 调用后结束事务，'1'调用后继续保持事务	
	unsigned char ConnectionID[CONNECTIONID_SIZE];				// 连接号KCBP Client连接时由KCBP Server分配， 用来确定请求唯一性
	unsigned char PacketIndex[PACKETINDEX_SIZE];				// 包序号从0 开始， 右对齐左补0
	unsigned char EOP[EOP_SIZE];						// 包结束标志0 未结束， 1 全部报文结束标志, 2 报文分组结束标志,用于内部报文转换
	unsigned char OriginalNode[NODE_SIZE];				// 初始节点号,第一个收到请求的节点
	unsigned char SendNode[NODE_SIZE];					// 发送节点号,发送请求的节点
	unsigned char DestNode[NODE_SIZE];					// 接收节点号
	unsigned char AdapterAddress[ADAPTERADDRESS_SIZE];	// 网卡号
	unsigned char Username[USERNAME_SIZE];				// KCBPUSER 用户名
	unsigned char Password[PASSWORD_SIZE];				// KCBPUSER 用户口令
	unsigned char KCBPSerial[KCBPSERIAL_SIZE];			// 流水号
	unsigned char ServiceName[SERVICENAME_SIZE];		// 服务名称
	unsigned char PacketLength[PACKETLENGTH_SIZE];		// 数据包长度（不包含包头的长度）
	unsigned char ReturnCode[RETURNCODE_SIZE];			// 返回码
	unsigned char Reserved[RESERVED_SIZE];				// 保留位
	unsigned char Parity[PARITY_SIZE];					// 校验位（保留）
};

struct KCBPPacketHeadCooked
{
	char Version;			// 版本号
	char PackageType;		// 包类型用来标识此消息包的类型。
	char PackageTypeExtend; //
	int ConnectionID;		// 连接号KCBP Client连接时由KCBP Server分配， 用来确定请求唯一性
	short PacketIndex;		// 包序号从0 开始
	char EOP;				// 包结束标志0 未结束， 1 结束
	short OriginalNode;		// 初始节点号,第一个收到请求的节点
	short SendNode;			// 发送节点号,发送请求的节点
	short DestNode;			// 接收节点号
	unsigned char AdapterAddress[ADAPTERADDRESS_SIZE + 1];	// 网卡号
	unsigned char Username[USERNAME_SIZE + 1];				// KCBPUSER 用户名
	unsigned char Password[PASSWORD_SIZE + 1];				// KCBPUSER 用户口令
	unsigned char KCBPSerial[KCBPSERIAL_SIZE + 1];			// 流水号
	unsigned char ServiceName[SERVICENAME_SIZE + 1];		// 服务名称
	int PacketLength;	// 当前数据包长度（不包含包头的长度）
	int ReturnCode;
	unsigned char Reserved[RESERVED_SIZE + 1];	// 空格保留位
	unsigned char Parity;						// 校验位（保留）	
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
