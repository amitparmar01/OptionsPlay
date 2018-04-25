using Microsoft.VisualStudio.TestTools.UnitTesting;
using OptionsPlay.Security.Utilits;

namespace OptionsPlay.Common.Tests
{
	[TestClass]
	public class SecurityTest
	{
		[TestMethod]
		public void TestPasswordFactory()
		{
			string passwordHash = PasswordFactory.GetPasswordHash("options4", "SfvazjIY97UZDui3oTeNM4JkQtH1AphmQ1WxcdOncpc=");
			Assert.AreEqual(passwordHash, "ozv8q0bDO80txn83Cc5t7Un72s4yGPe1");
		}
	}
}
