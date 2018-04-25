#pragma once

using namespace System;

namespace OptionsPlay
{
	namespace DAL
	{
		namespace SZKingdom
		{
			public ref class KCBPLibraryWrapperException : public Exception
			{
			public:
				KCBPLibraryWrapperException() : Exception() {}
				KCBPLibraryWrapperException(String^ message) : Exception(message) {}
				KCBPLibraryWrapperException(String^ message, int errorCode) : Exception(message)
				{
					ErrorCode = errorCode;
				}

				property int ErrorCode;
			};
		}
	}
}