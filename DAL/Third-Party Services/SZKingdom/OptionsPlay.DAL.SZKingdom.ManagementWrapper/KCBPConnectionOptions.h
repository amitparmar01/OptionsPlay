#pragma once

using namespace System;

namespace OptionsPlay
{
	namespace DAL
	{
		namespace SZKingdom
		{
			typedef void(*ActionCallback)();

			public ref class KCBPConnectionOptions
			{
			public: // Max length of string properties - 32 characters
				property String^ ServerName;
				property String^ Address;
				property int Protocol;
				property int Port;
				property String^ ReceiveQName;
				property String^ SendQName;
			};

			public ref class KCBPConnectionOptionsExt : public KCBPConnectionOptions
			{
			public:
				property String^ Proxy; // 128 characters
				property String^ SSL; // 256 characters
			};
		}
	}
}