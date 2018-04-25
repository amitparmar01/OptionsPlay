#if !defined(__kbss_encrypt_h__)
#define __kbss_encrypt_h__

#if !defined(KBSS_ENCRYPT) && !defined(KBSS_DECRYPT)
#define KBSS_ENCRYPT
#undef KBSS_DECRYPT
#endif

#define KBSS_COMENCRYPT
#define KBSS_COMDECRYPT

//define encrypt type -- add by zhoujh
// 0 kbss standard(default)
// 1 windows encrypt
// 2 unix/linux encrypt
// 3 external encrypt
#if !defined (KBSS_ENCRYTYPE_DEFAULT)
#define KBSS_ENCRYTYPE_DEFAULT 0
#endif

#if !defined (KBSS_ENCRYTYPE_WIN)
#define KBSS_ENCRYTYPE_WIN 1
#endif

#if !defined (KBSS_ENCRYTYPE_UNIX)
#define KBSS_ENCRYTYPE_UNIX 2
#endif

#if !defined (KBSS_ENCRYTYPE_EXTERN)
#define KBSS_ENCRYTYPE_EXTERN 3
#endif

#if defined(OS_IS_WINDOWS)

#ifdef  DLLEXPORTS
#define DLLEXPORT _declspec(dllexport)
#else
#define DLLEXPORT _declspec(dllimport)
#endif
#define KBSS_CALLTYPE _cdecl
#else
#define DLLEXPORT
#define KBSS_CALLTYPE
#if !defined(__int64)
#define __int64  long long
#endif
#endif

#ifdef __cplusplus
extern "C"
{
#endif

//------------------------------------------------------------------------------
// 函数名称：kbss_encrypt
// 功能描述：数据存储加密算法
// 参数说明：p_pszOutput      [out]    密文
//           p_iFixedSize     [in]     密文缓冲区大小
//           p_pszInput       [int]    明文
//           p_pszKey         [in]     密钥
// 返回说明：(空)
// 函数备注：
#if defined(KBSS_ENCRYPT)
void DLLEXPORT KBSS_CALLTYPE kbss_encrypt(char *p_pszOutput, int p_iFixedSize, const char *p_pszInput, const char *p_pszKey);
#endif

//------------------------------------------------------------------------------
// 函数名称：kbss_decrypt
// 功能描述：数据存储解密算法
// 参数说明：p_pszOutput      [out]    明文
//           p_iFixedSize     [in]     明文缓冲区大小
//           p_pszInput       [int]    密文
//           p_pszKey         [in]     密钥
// 返回说明：(空)
// 函数备注：此函数不对外提供.
#if defined(KBSS_DECRYPT)
void DLLEXPORT KBSS_CALLTYPE kbss_decrypt(char *p_pszOutput, int p_iFixedSize, const char *p_pszInput, const char *p_pszKey);
#endif


//------------------------------------------------------------------------------
// 函数名称：kbss_recrypt
// 功能描述：数据存储重加密算法
// 参数说明：p_pszOutput      [out]    密文(更换后)
//           p_iFixedSize     [in]     密文(更换后)缓冲区大小
//           p_pszInput       [int]    密文(更换前)
//           p_pszOldKey      [in]     原密钥
//           p_pszNewKey      [in]     新密钥
// 返回说明：(空)
// 函数备注：此函数用于更换加密的密钥
#if defined(KBSS_ENCRYPT)
void DLLEXPORT KBSS_CALLTYPE kbss_recrypt(char *p_pszOutput, int p_iFixedSize, const char *p_pszInput, const char *p_pszOldKey, const char *p_pszNewKey);
#endif

//------------------------------------------------------------------------------
// 函数名称：kbss_encrypt1
// 功能描述：数据存储加密算法
// 参数说明：p_pszOutput      [out]    密文
//           p_iFixedSize     [in]     密文缓冲区大小
//           p_pszInput       [int]    明文
//           p_pszKey         [in]     密钥
//           p_nEncodeType    [in]     加密算法 0:KBSS标准算法
//                                              1:金证W版集中交易算法
//                                              2:金证U版集中交易算法
// 返回说明：0 表示成功 其他表示失败
// 函数备注：
#if defined(KBSS_ENCRYPT)
int DLLEXPORT KBSS_CALLTYPE kbss_encrypt1(char *p_pszOutput,
                                           int p_iFixedSize,
                                           const char *p_pszInput,
                                           const char *p_pszKey,
                                           int p_nEncodeType);
#endif

//------------------------------------------------------------------------------
// 函数名称：kbss_decrypt1
// 功能描述：数据存储解密算法
// 参数说明：p_pszOutput      [out]    明文
//           p_iFixedSize     [in]     明文缓冲区大小
//           p_pszInput       [int]    密文
//           p_pszKey         [in]     密钥
//           p_nEncodeType    [in]     加密算法 0:KBSS标准算法
//                                              1:金证W版集中交易算法
//                                              2:金证U版集中交易算法
// 返回说明：0 表示成功 其他表示失败
// 函数备注：此函数不对外提供.
#if defined(KBSS_DECRYPT)
int DLLEXPORT KBSS_CALLTYPE kbss_decrypt1(char *p_pszOutput,
                                          int p_iFixedSize,
                                          const char *p_pszInput,
                                          const char *p_pszKey,
                                          int p_nEncodeType);
#endif


//------------------------------------------------------------------------------
// 函数名称：kbss_recrypt
// 功能描述：数据存储重加密算法
// 参数说明：p_pszOutput      [out]    密文(更换后)
//           p_iFixedSize     [in]     密文(更换后)缓冲区大小
//           p_pszInput       [int]    密文(更换前)
//           p_pszOldKey      [in]     原密钥
//           p_pszNewKey      [in]     新密钥
//           p_nEncodeType    [in]     加密算法 0:KBSS标准算法
//                                              1:金证W版集中交易算法
//                                              2:金证U版集中交易算法
// 返回说明：0 表示成功 其他表示失败
// 函数备注：此函数用于更换加密的密钥
#if defined(KBSS_ENCRYPT)
int DLLEXPORT KBSS_CALLTYPE kbss_recrypt1(char *p_pszOutput,
                                          int p_iFixedSize,
                                          const char *p_pszInput,
                                          const char *p_pszOldKey,
                                          const char *p_pszNewKey,
                                          int p_nEncodeType);
#endif

//------------------------------------------------------------------------------
// Function name：kbss_comencrypt
// Description：Communication encryption algorithm
// Parameters：p_pszOutput      [out]    Ciphertext, length <= 1024
//             p_pszInput       [in]    Plaintext, length <= 1024
//             p_pszKey         [in]     Key, length <= 224
// Return：void
// Comments：For encryption of communication information
#if defined(KBSS_COMENCRYPT)
void DLLEXPORT KBSS_CALLTYPE kbss_comencrypt(char *p_pszOutput, const char *p_pszInput, const char *p_pszKey);
#endif

//------------------------------------------------------------------------------
// Function name: kbss_comdecrypt
// Description: Communication encryption algorithm
// Parameters：p_pszOutput      [out]    Plaintext, length <= 1024
//             p_pszInput       [in]    Ciphertext, length <= 1024
//             p_pszKey         [in]     Key, length <= 224
// Return: (空)
// Comments: For encryption of communication information
#if defined(KBSS_COMDECRYPT)
void DLLEXPORT KBSS_CALLTYPE kbss_comdecrypt(char *p_pszOutput, const char *p_pszInput, const char *p_pszKey);
#endif


//------------------------------------------------------------------------------
// 函数名称：AES_Encrypt1
// 功能描述：AES加密算法
// 参数说明：p_pszEncrResult  [out]    密文
//           p_iSize          [int]    密文缓冲区大小
//           p_llKey          [in]     密钥，如用户代码
//           p_pszEncrInfo    [in]     明文
// 返回说明：(空)
// 函数备注：前后台加解密认证数据时用
void DLLEXPORT KBSS_CALLTYPE AES_Encrypt1(char *p_pszEncrResult, int p_iSize, __int64 p_llKey, const char * p_pszEncrInfo);

//------------------------------------------------------------------------------
// 函数名称：AES_Decrypt1
// 功能描述：AES解密算法
// 参数说明：p_pszDecrResult  [out]    明文
//           p_iSize          [int]    明文缓冲区大小
//           p_llKey          [in]     密钥，如用户代码
//           p_pszDecrInfo    [in]     密文
// 返回说明：(空)
// 函数备注：前后台加解密认证数据时用
void DLLEXPORT KBSS_CALLTYPE AES_Decrypt1(char *p_pszDecrResult, int p_iSize, __int64 p_llKey, const char * p_pszDecrInfo);


//------------------------------------------------------------------------------
// 函数名称：MD5_Digist
// 功能描述：MD5报文摘要算法
// 参数说明：p_pszDigResult   [out]    密文
//           p_iSize          [int]    密文缓冲区大小
//           p_pszDigRetInt   [in]     摘要
//           p_pszDigInfo     [in]     信息串
// 返回说明：(空)
// 函数备注：此算法不可逆，用于通信过程中信息的防篡改
void DLLEXPORT KBSS_CALLTYPE MD5_Digist(char * p_pszDigResult, int p_iSize, unsigned char p_pszDigRetInt[16], unsigned char * p_pszDigInfo);


//------------------------------------------------------------------------------
// 函数名称：Base64_Encode
// 功能描述：Base64加密算法
// 参数说明：p_pszEnResult    [out]    密文
//           p_pszEnInfo      [in]     明文
//           p_iSize          [in]     明文长度
// 返回说明：(空)
// 函数备注：此算法用于通信过程中的不可见字符的转换。
void DLLEXPORT KBSS_CALLTYPE Base64_Encode(char * p_pszEnResult, const unsigned char * p_pszEnInfo, int p_iSize);

//------------------------------------------------------------------------------
// 函数名称：Base64_Decode
// 功能描述：Base64解密算法
// 参数说明：p_pszResult      [out]    明文
//           p_refiCount      [out]    明文长度
//           pszDeInfo        [in]     密文
// 返回说明：(空)
// 函数备注：此算法用于通信过程中的不可见字符的转换。
void DLLEXPORT KBSS_CALLTYPE Base64_Decode(unsigned char *p_pszResult, int & p_refiCount, const char * pszDeInfo);


//------------------------------------------------------------------------------
// 函数名称：RC5_Encrypt1
// 功能描述：RC5加密算法
// 参数说明：p_pszEnResult    [out]    密文
//           p_iSize          [in]     密文缓冲区大小
//           p_llKey          [in]     密钥：如用户代码
//           p_pszEnInfo      [in]     明文
// 返回说明：(空)
// 函数备注：此算法用于前后台加解密保密键(验证码)。
void DLLEXPORT KBSS_CALLTYPE RC5_Encrypt1(char * p_pszEnResult, int p_iSize, __int64 p_llKey, const char * p_pszEnInfo);

//------------------------------------------------------------------------------
// 函数名称：RC5_Decrypt1
// 功能描述：RC5解密算法
// 参数说明：p_pszDeResult    [out]    明文
//           p_iSize          [in]     明文缓冲区大小
//           p_llKey          [in]     密钥：如用户代码
//           p_pszDeInfo      [in]     密文
// 返回说明：(空)
// 函数备注：此算法用于前后台加解密保密键(验证码)。
void DLLEXPORT KBSS_CALLTYPE RC5_Decrypt1(char * p_pszDeResult, int p_iSize, __int64 p_llKey, const char * p_pszDeInfo);


// iEncryptType = 1 代表服务端加解密Key2。这时传入的pszKey与iKeySize没有作用，内部写死有密钥。
// iEncryptType = 2 其它情况加解密
void DLLEXPORT KBSS_CALLTYPE RC5_Encrypt(char * p_pszEnResult, int p_iSize, const unsigned char * p_pszKey, int p_iKeySize, int p_iEncryptType, const char * p_pszEnInfo);
void DLLEXPORT KBSS_CALLTYPE RC5_Decrypt(char * p_pszDeResult, int p_iSize, const unsigned char * p_pszKey, int p_iKeySize, int p_iDecryptType, const char * p_pszDeInfo);

//------------------------------------------------------------------------------
// 函数名称：RSA_GenRsaKey
// 功能描述：RSA密钥产生算法
// 参数说明：p_pszPublicKey   [out]    公钥
//           p_iPublicKeySize [in]     公钥缓冲区大小
//           p_pszPrivateKey  [out]    私钥
//           p_iPrivateKeySize[in]     私钥缓冲区大小
//           p_iKeySize       [in]     密钥强度:256bit
// 返回说明：int
// 函数备注：此算法用于产生RSA的公私钥
int DLLEXPORT KBSS_CALLTYPE RSA_GenRsaKey(char *p_pszPublicKey, int p_iPublicKeySize, char *p_pszPrivateKey, int p_iPrivateKeySize, int p_iKeySize = 256);



//----------------------------------------------------------------------------
// 签名函数:RSA_Encrypt\RSA_Decrypt
// 此组函数为用于签名:即用私钥加密,公钥进行解密
//------------------------------------------------------------------------------
// 函数名称：RSA_Encrypt
// 功能描述：RSA签名加密算法
// 参数说明：p_pszSignResult  [out]    密文
//           p_iSize          [in]     密文缓冲区大小
//           p_pszKey         [in]     私钥
//           p_pszSignInfo    [in]     明文
//           p_iLen           [in]     明文长度
// 返回说明：int
// 函数备注：此算法用于数字签名
int DLLEXPORT KBSS_CALLTYPE RSA_Encrypt(char *p_pszSignResult, int p_iSize, char * p_pszKey, const unsigned char *p_pszSignInfo, int p_iLen);

//------------------------------------------------------------------------------
// 函数名称：RSA_Decrypt
// 功能描述：RSA签名解密算法
// 参数说明：p_pszSignResult [out]     明文
//           p_iSize         [in]      明文缓冲区大小
//           p_refiCount     [out]     明文有效长度
//           p_pszKey        [in]      公钥
//           p_pszVerifyInfo [in]      密文
// 返回说明：int
// 函数备注：此算法用于数字签名
int DLLEXPORT KBSS_CALLTYPE RSA_Decrypt(char *p_pszDecrResult, int p_iSize, int &p_refiCount, const char *p_pszKey, const char *p_pszVerifyInfo);

//----------------------------------------------------------------------------
// RSA函数:RSA_Encrypt1\RSA_Decrypt1
// 此组函数为用于签名:即用公钥加密,私钥进行解密
//------------------------------------------------------------------------------
// 函数名称：RSA_Encrypt1
// 功能描述：RSA加密算法
// 参数说明：p_pszSignResult [out]     密文
//           p_iSize         [in]      密文缓冲区大小
//           p_pszKey        [in]      公钥
//           p_pszSignInfo   [in]      明文
//           p_iLen          [in]      明文长度
// 返回说明：int
// 函数备注：此算法用于数据加密
int DLLEXPORT KBSS_CALLTYPE RSA_Encrypt1(char *p_pszSignResult, int p_iSize, char * p_pszKey, const unsigned char *p_pszSignInfo, int p_iLen);


//------------------------------------------------------------------------------
// 函数名称：RSA_Decrypt1
// 功能描述：RSA解密算法
// 参数说明：p_pszSignResult [out]     明文
//           p_iSize         [in]      明文缓冲区大小
//           p_pszKey        [in]      私钥
//           p_pszVerifyInfo [in]      密文
// 返回说明：int
// 函数备注：此算法用于数据解密
int DLLEXPORT KBSS_CALLTYPE RSA_Decrypt1(char *p_pszDecrResult, int p_iSize, int &p_refiCount, const char *p_pszKey, const char *p_pszVerifyInfo);

//------------------------------------------------------------------------------
// 函数名称：RandomNo
// 功能描述：随机数
// 参数说明：p_pszRandNoBuf  [out]     缓冲区
//           p_iSize         [in]      缓冲区大小
// 返回说明：void
void DLLEXPORT KBSS_CALLTYPE RandomNo(char * p_pszRandNoBuf, int p_iSize);

#ifdef __cplusplus
}
#endif

#endif  // __kbss_encrypt_h__
