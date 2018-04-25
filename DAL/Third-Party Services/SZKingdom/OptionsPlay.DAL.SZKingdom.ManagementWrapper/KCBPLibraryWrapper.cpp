#pragma once
#include "kcbpcli.hpp"
#include "kbss_encrypt.h"
#include "KCBPConnectionOptions.h"
#include "KCBPLibraryWrapperException.h"

#include <string.h>

using namespace System;
using namespace System::Text;
using namespace System::Runtime::InteropServices;

namespace OptionsPlay
{
	namespace DAL
	{
		namespace SZKingdom
		{
			const int MaxBufferLength = 1024 + 1;
			const int CallbackTimeoutInSeconds = 7;
			public ref class KCBPLibraryWrapper sealed
			{
			private:
				static Encoding^ ChineseEncoding = Encoding::GetEncoding("gb2312");

				CKCBPCli* m_actual = nullptr;

			public:
				KCBPLibraryWrapper()
				{
					m_actual = new CKCBPCli();
				}

				~KCBPLibraryWrapper()
				{
					Destroy();
				}

				!KCBPLibraryWrapper()
				{
					Destroy();
				}

				void SetConnectionOption(KCBPConnectionOptions^ connectionOptions)
				{
					if (m_actual == nullptr) { return; }

					tagKCBPConnectOption stKCBPConnection;
					memset(&stKCBPConnection, 0x0, sizeof(stKCBPConnection));

					IntPtr serverNamePtr = Marshal::StringToHGlobalAnsi(connectionOptions->ServerName);
					IntPtr addressPtr = Marshal::StringToHGlobalAnsi(connectionOptions->Address);
					IntPtr sendQNamePtr = Marshal::StringToHGlobalAnsi(connectionOptions->SendQName);
					IntPtr recieveQNamePtr = Marshal::StringToHGlobalAnsi(connectionOptions->ReceiveQName);

					strcpy_s(stKCBPConnection.szServerName, KCBP_SERVERNAME_MAX, static_cast<char*>(serverNamePtr.ToPointer()));
					stKCBPConnection.nProtocal = connectionOptions->Protocol;
					strcpy_s(stKCBPConnection.szAddress, KCBP_DESCRIPTION_MAX, static_cast<char*>(addressPtr.ToPointer()));
					stKCBPConnection.nPort = connectionOptions->Port;
					strcpy_s(stKCBPConnection.szSendQName, KCBP_DESCRIPTION_MAX, static_cast<char*>(sendQNamePtr.ToPointer()));
					strcpy_s(stKCBPConnection.szReceiveQName, KCBP_DESCRIPTION_MAX, static_cast<char*>(recieveQNamePtr.ToPointer()));

					Marshal::FreeHGlobal(serverNamePtr);
					Marshal::FreeHGlobal(addressPtr);
					Marshal::FreeHGlobal(sendQNamePtr);
					Marshal::FreeHGlobal(recieveQNamePtr);

					int retCode = m_actual->SetConnectOption(stKCBPConnection);
					HandleReturnCode(retCode);
				}

				KCBPConnectionOptions^ GetConnectionOption()
				{
					if (m_actual == nullptr) { return nullptr; }

					tagKCBPConnectOption stKCBPConnection;
					memset(&stKCBPConnection, 0x0, sizeof(stKCBPConnection));
					int retCode = m_actual->GetConnectOption(&stKCBPConnection);
					HandleReturnCode(retCode);

					KCBPConnectionOptions^ result = gcnew KCBPConnectionOptions();
					result->Port = stKCBPConnection.nPort;
					result->Protocol = stKCBPConnection.nProtocal;
					result->Address = gcnew String(stKCBPConnection.szAddress);
					result->ServerName = gcnew String(stKCBPConnection.szServerName);
					result->SendQName = gcnew String(stKCBPConnection.szSendQName);
					result->ReceiveQName = gcnew String(stKCBPConnection.szReceiveQName);

					return result;
				}

				void ConnectToServer(String^ serverName, String^ userName, String^ password)
				{
					if (m_actual == nullptr) { return; }

					IntPtr serverNamePtr = Marshal::StringToHGlobalAnsi(serverName);
					IntPtr userNamePtr = Marshal::StringToHGlobalAnsi(userName);
					IntPtr passwordPtr = Marshal::StringToHGlobalAnsi(password);

					char* serverNameCPtr = static_cast<char*>(serverNamePtr.ToPointer());
					char* userNameCPtr = static_cast<char*>(userNamePtr.ToPointer());
					char* passwordCPtr = static_cast<char*>(passwordPtr.ToPointer());

					int retCode = m_actual->ConnectServer(serverNameCPtr, userNameCPtr, passwordCPtr);

					Marshal::FreeHGlobal(serverNamePtr);
					Marshal::FreeHGlobal(userNamePtr);
					Marshal::FreeHGlobal(passwordPtr);
					HandleReturnCode(retCode);
				}

				void Disconnect()
				{
					if (m_actual == nullptr) { return; }

					m_actual->DisConnect();
				}

				void BeginWrite()
				{
					if (m_actual == nullptr) { return; }

					int retCode = m_actual->BeginWrite();
					HandleReturnCode(retCode);
				}

				void CallProgramAndCommit(String^ programName)
				{
					if (m_actual == nullptr) { return; }

					IntPtr programNamePtr = Marshal::StringToHGlobalAnsi(programName);
					char* programCPtr = static_cast<char*>(programNamePtr.ToPointer());

					int retCode = m_actual->CallProgramAndCommit(programCPtr);

					Marshal::FreeHGlobal(programNamePtr);
					HandleReturnCode(retCode);
				}

				void SetValue(String^ keyName, String^ vlu)
				{
					if (m_actual == nullptr) { return; }

					IntPtr keyNamePtr = Marshal::StringToHGlobalAnsi(keyName);
					IntPtr vluPtr = Marshal::StringToHGlobalAnsi(vlu);

					char* keyNameCPtr = static_cast<char*>(keyNamePtr.ToPointer());
					char* vluCPtr = static_cast<char*>(vluPtr.ToPointer());

					int retCode = m_actual->SetValue(keyNameCPtr, vluCPtr);

					Marshal::FreeHGlobal(keyNamePtr);
					Marshal::FreeHGlobal(vluPtr);
					HandleReturnCode(retCode);
				}

				bool RsOpen()
				{
					if (m_actual == nullptr) { return false; }

					int retCode = m_actual->RsOpen();
					return retCode == 0;
				}

				bool RsMore()
				{
					if (m_actual == nullptr) { return false; }

					int retCode = m_actual->RsMore();
					return retCode == 0;
				}

				void RsClose()
				{
					if (m_actual == nullptr) { return; }

					int retCode = m_actual->RsClose();
					HandleReturnCode(retCode);
				}

				String^ RsGetCol(int col)
				{
					if (m_actual == nullptr) { return nullptr; }

					char buffer[MaxBufferLength] = { 0 };
					int retCode = m_actual->RsGetCol(col, buffer);
					HandleReturnCode(retCode);

					String^ result = ConvertToManagedString(buffer);
					return result;
				}

				String^ RsGetCol(String^ keyName)
				{
					if (m_actual == nullptr) { return nullptr; }

					char buffer[MaxBufferLength] = { 0 };
					IntPtr keyNamePtr = Marshal::StringToHGlobalAnsi(keyName);
					char* keyNameCPtr = static_cast<char*>(keyNamePtr.ToPointer());

					int retCode = m_actual->RsGetCol(keyNameCPtr, buffer);

					Marshal::FreeHGlobal(keyNamePtr);
					HandleReturnCode(retCode);

					String^ result = ConvertToManagedString(buffer);
					return result;
				}

				String^ RsGetColName(int nCol)
				{
					if (m_actual == nullptr) { return nullptr; }

					char buffer[MaxBufferLength] = { 0 };

					int retCode = m_actual->RsGetColName(nCol, buffer, MaxBufferLength);
					HandleReturnCode(retCode);

					String^ result = ConvertToManagedString(buffer);
					return result;
				}

				bool RsFetchRow()
				{
					if (m_actual == nullptr) { return false; }

					int retCode = m_actual->RsFetchRow();
					return retCode == 0;
				}

				int RsGetRowNum()
				{
					if (m_actual == nullptr) { return 0; }

					int rowNum;
					int retCode = m_actual->RsGetRowNum(&rowNum);
					HandleReturnCode(retCode);

					return rowNum;
				}

				int RsGetColNum()
				{
					if (m_actual == nullptr) { return 0; }

					int colNum;
					int retCode = m_actual->RsGetColNum(&colNum);
					HandleReturnCode(retCode);

					return colNum;
				}

				void SetCliTimeOut(int timeOut)
				{
					if (m_actual == nullptr) { return; }

					int retCode = m_actual->SetCliTimeOut(timeOut);
					HandleReturnCode(retCode);
				}

				int GetErr([Out] String^% msg)
				{
					msg = nullptr;
					if (m_actual == nullptr) { return -1; }

					int errorCode;
					char errorMessage[MaxBufferLength] = { 0 };
					m_actual->GetErr(&errorCode, errorMessage);
					msg = ConvertToManagedString(errorMessage);

					return errorCode;
				}

#pragma region Untested

				int GetVersion()
				{
					if (m_actual == nullptr) { return 0; }

					int version;
					int retCode = m_actual->GetVersion(&version);
					HandleReturnCode(retCode);

					return version;
				}

				void CallProgram(String^ programName)
				{
					if (m_actual == nullptr) { return; }

					// todo: encoding issues are possible
					IntPtr programNamePtr = Marshal::StringToHGlobalAnsi(programName);
					char* programCPtr = static_cast<char*>(programNamePtr.ToPointer());

					int retCode = m_actual->CallProgram(programCPtr);

					Marshal::FreeHGlobal(programNamePtr);
					HandleReturnCode(retCode);
				}

				void Commit()
				{
					if (m_actual == nullptr) { return; }

					int retCode = m_actual->Commit();
					HandleReturnCode(retCode);
				}

				void RollBack()
				{
					if (m_actual == nullptr) { return; }

					int retCode = m_actual->RollBack();
					HandleReturnCode(retCode);
				}

				// todo: careful implementation required
				bool TryGetValue(String^ keyName, [Out] String^% value)
				{
					value = nullptr;
					if (m_actual == nullptr) { return false; }

					// todo: encoding issues are possible
					IntPtr keyNamePtr = Marshal::StringToHGlobalAnsi(keyName);

					char* keyNameCPtr = static_cast<char*>(keyNamePtr.ToPointer());
					char result[MaxBufferLength] = { 0 };

					int retCode = m_actual->GetValue(keyNameCPtr, result);

					Marshal::FreeHGlobal(keyNamePtr);
					value = ConvertToManagedString(result);
					return retCode == 0;
				}

				String^ RsGetColByName(String^ keyName)
				{
					if (m_actual == nullptr) { return nullptr; }

					char buffer[MaxBufferLength] = { 0 };
					IntPtr keyNamePtr = Marshal::StringToHGlobalAnsi(keyName);
					char* keyNameCPtr = static_cast<char*>(keyNamePtr.ToPointer());

					int retCode = m_actual->RsGetColByName(keyNameCPtr, buffer);

					Marshal::FreeHGlobal(keyNamePtr);
					HandleReturnCode(retCode);

					String^ resultManaged = ConvertToManagedString(buffer);
					return resultManaged;
				}

				/*
				int RsGetColNames(char *pszInfo, int nLen);
				int RsGetTableRowNum(int nt, int *pnRows);
				int RsGetTableColNum(int nt, int *pnCols);

				int RsCreate(char* name, int colNum, char* pColInfo);
				int RsNewTable(char *Name, int ColNum, char *pColInfo);

				int RsAddRow();
				int RsSaveRow();
				int RsSetCol(int Col, char *Vlu);
				int RsSetCol(char *Name, char *Vlu);
				int RsSetColByName(char *Name, char *Vlu);

				int RsGetCursorName(char *pszCursorName, int nLen);
				*/

				/*misc*/
				int GetCommLen()
				{
					if (m_actual == nullptr) { return 0; }

					int commLen;
					int retCode = m_actual->GetCommLen(&commLen);
					HandleReturnCode(retCode);

					return commLen;
				}

				// todo: test this encrypt function and add this function to SZKingdom helper class.
				/// <summary>
				/// Encrypt password plaintext using kbss_encrypt library.
				/// </summary>
				/// <param name="key">key for encryption</param>
				/// <param name="password">password for encryption</param>
				/// <returns>Encrypted authentication string.</returns>
				String^ EncryptPassword(String^ key, String^ password){

					char szEncryptedPassword[KCBP_SSL_MAX + 1] = { 0 },
						szKey[KCBP_SSL_MAX + 1] = { 0 },
						szPassword[KCBP_SSL_MAX + 1] = { 0 };

					if (key == nullptr || key->Length > KCBP_SSL_MAX || password == nullptr || password->Length > KCBP_SSL_MAX)
					{
						throw gcnew KCBPLibraryWrapperException("Encrypt key or password is empty or longer than 256.");
					}

					IntPtr keyPtr = Marshal::StringToHGlobalAnsi(key),
						passwordPrt = Marshal::StringToHGlobalAnsi(password);

					strcpy_s(szKey, KCBP_SSL_MAX, static_cast<char*>(keyPtr.ToPointer()));
					strcpy_s(szPassword, KCBP_SSL_MAX, static_cast<char*>(passwordPrt.ToPointer()));

					kbss_comencrypt(szEncryptedPassword, szPassword, szKey);

					String^ resultString = ConvertToManagedString(szEncryptedPassword);

					Marshal::FreeHGlobal(keyPtr);
					Marshal::FreeHGlobal(passwordPrt);

					return resultString;
				}
#pragma endregion
			private:

				String^ ConvertToManagedString(char* str)
				{
					int length = strlen(str);
					String^ result = ConvertToManagedString(str, length);
					return result;
				}

				String^ ConvertToManagedString(char* str, int length)
				{
					IntPtr ptr(str);

					array<Byte>^ initialString = gcnew array<Byte>(length);
					Marshal::Copy(ptr, initialString, 0, length);

					array<Byte>^ resultArray = Encoding::Convert(this->ChineseEncoding, Encoding::Unicode, initialString);
					String^ resultString = Encoding::Unicode->GetString(resultArray);
					return resultString;
				}

				void HandleReturnCode(int retCode)
				{
					if (m_actual == nullptr || retCode == 0)
					{
						return;
					}

					String^ errorMessage;
					int errorCode = this->GetErr(errorMessage);
					KCBPLibraryWrapperException^ ex = gcnew KCBPLibraryWrapperException(errorMessage, retCode);
					throw ex;
				}

				void Destroy()
				{
					if (m_actual != nullptr)
					{
						m_actual->DisConnect();
						delete m_actual;
						m_actual = nullptr;
					}
				}
			};

		}
	}
}