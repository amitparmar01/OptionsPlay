namespace OptionsPlay.Common.ServiceResponses
{
	public enum ErrorCode
	{
		None = 0,

		#region UserService 100

		#region Common 10001

		LoginAlreadyExists = 1000101,
		EmailAlreadyExists = 1000102,

		RoleNotFound = 1000103,
		FCUserNotFound = 1000104,

		#endregion Common 10001

		#region AccountVerification 10002

		AccountVerificationFailed = 1000201,
		AccountVerificationBlocked = 1000202,
		AccountVerificationExpired = 1000203,
		AccountVerificationHashUsed = 1000204,
		AccountVerificationInvalidPassword = 1000205,
		AccountVerificationInvalidLogin = 1000206,
		AccountVerificationInvalidLoginOrPassword = 1000207,
		AccountVerificationAccountNotVerified = 1000208,
		AccountVerificationInvalidModel = 1000209,

		#endregion AccountVerification 10002

		#endregion UserService 100

		#region SZKingdomLibrary 101

		SZKingdomLibraryError = 1010001,
		SZKingdomLibraryNoRecords = 1010002,

		#endregion SZKingdomLibrary 101

		#region Common 102

		#region Authentication 10200

		AuthenticationMethodAccessNotEnabled = 1020001,
		AuthenticationIncorrectIdentity = 1020002,
		AuthenticationOnlyAuthenticatedAccess = 1020003,
		AuthenticationInvalidHttpContext = 1020004,

		#endregion Authentication 10200

		#region Common Responses 10201

		ItemNotFound = 1020101,
		InternalError = 1020102,
		BadRequest = 1020103,

		#endregion Common Responses 10201

		#region Market 10202

		MarketIsClosed = 1020201,

		#endregion

		#endregion Common 102

		#region ConfigurationService 103

		#region Common 10300

		ConfigurationSectionNotFound = 1030001,
		ConfigurationSettingNotFound = 1030002,
		ConfigurationValueParentNotFound = 1030003,
		ConfigurationDirectoryParentNotFound = 1030004,
		ConfigurationDuplicateSectionName = 1030005,
		ConfigurationDuplicateSettingName = 1030006,
		ConfigurationForbiddenToModify = 1030007,
		ConfigurationSettingDeserializationError = 1030008,

		#endregion Common 10300

		#endregion ConfigurationService 103

		#region SchedulerCoreService 104

		SchedulerQueueItemAlreadyExists = 1040001,
		SchedulerQueueItemNotFound = 1040002,
		SchedulerTaskNotFound = 1040003,

		#endregion SchedulerCoreService 104
	}
}
