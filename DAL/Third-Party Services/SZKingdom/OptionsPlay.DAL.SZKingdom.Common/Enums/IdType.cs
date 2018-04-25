using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class IdType : BaseTypeSafeEnum<string, IdType>
	{
		public static readonly IdType IdCard = new IdType("00");
		public static readonly IdType Passport = new IdType("01");
		public static readonly IdType MilitaryOfficerIdCard = new IdType("02");
		public static readonly IdType SergeantIdCard = new IdType("03");
		public static readonly IdType HomeReturnPermit = new IdType("04");
		public static readonly IdType ResidenceBooklet = new IdType("05");
		public static readonly IdType Other = new IdType("09");
		public static readonly IdType BusinessLicense = new IdType("10");
		public static readonly IdType JuridicalAssociationLicense = new IdType("11");
		public static readonly IdType OfficialOrganCertification = new IdType("12");
		public static readonly IdType PublicInstitutionCertificate = new IdType("13");
		public static readonly IdType OutsideBusinessLicense = new IdType("14");
		public static readonly IdType MilitaryPoliceman = new IdType("15");
		public static readonly IdType Soldiery = new IdType("16");
		public static readonly IdType Fundation = new IdType("17");
		public static readonly IdType TechnicalSupervisoryAuthorityNo = new IdType("18");
		public static readonly IdType OtherCertificate = new IdType("19");
		public static readonly IdType OrganizationCodeCertificate = new IdType("1A");
		public static readonly IdType TaxRegistrationCertificate = new IdType("1B");
		public static readonly IdType OfficialCertificate = new IdType("1Z");

		private IdType(string internalCode)
			: base(internalCode)
		{
		}
	}
}