using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace OptionsPlay.Web.ViewModels.Helpers
{
	public static class ThumbnailHelper
	{
		public static byte[] CreateThumbnail(byte[] passedImage)
		{
			byte[] returnedThumbnail;

			using (MemoryStream startMemoryStream = new MemoryStream(), newMemoryStream = new MemoryStream())
			{
				startMemoryStream.Write(passedImage, 0, passedImage.Length);

				Bitmap startBitmap = new Bitmap(startMemoryStream);

				int newHeight;
				int newWidth;
				double hwRatio;
				if (startBitmap.Height > startBitmap.Width)
				{
					newHeight = LargestSide;
					hwRatio = LargestSide / (double)startBitmap.Height;
					newWidth = (int)(hwRatio * startBitmap.Width);
				}
				else
				{
					newWidth = LargestSide;
					hwRatio = LargestSide / (double)startBitmap.Width;
					newHeight = (int)(hwRatio * startBitmap.Height);
				}

				Bitmap newBitmap = ResizeImage(startBitmap, newWidth, newHeight);
				newBitmap.Save(newMemoryStream, ImageFormat.Jpeg);
				returnedThumbnail = newMemoryStream.ToArray();
			}

			return returnedThumbnail;
		}

		#region Private

		private const int LargestSide = 100;

		private static Bitmap ResizeImage(Bitmap image, int width, int height)
		{
			Bitmap resizedImage = new Bitmap(width, height);
			using (Graphics graphics = Graphics.FromImage(resizedImage))
			{
				graphics.DrawImage(image, new Rectangle(0, 0, width, height), new Rectangle(0, 0, image.Width, image.Height), GraphicsUnit.Pixel);
			}
			return resizedImage;
		}

		#endregion Private
	}
}
