using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using OptionsPlay.Common.Options;

namespace OptionsPlay.DAL.EF.Core.Helpers
{
	internal class SqlExecute
	{
		private const string InsertStatement = "INSERT INTO [{0}] ({1}) VALUES ({2})";

		private static string ConnectionString 
		{
			get
			{
				return AppConfigManager.OptionsPlayConnectionString;
			}
		}

		internal static T ExecuteScalar<T>(string script)
		{
			using (SqlConnection connection = new SqlConnection(ConnectionString))
			{
				SqlCommand command = new SqlCommand();
				command.Connection = connection;
				command.CommandText = script;

				connection.Open();

				T result = (T)command.ExecuteScalar();
				return result;
			}
		}

		internal static T ExecuteScalar<T>(string script, SqlParameter[] parameters)
		{
			using (SqlConnection connection = new SqlConnection(ConnectionString))
			{
				SqlCommand command = new SqlCommand();
				command.Connection = connection;
				command.CommandText = script;

				foreach (SqlParameter parameter in parameters)
				{
					command.Parameters.Add(parameter);
				}

				connection.Open();

				T result = (T)command.ExecuteScalar();
				return result;
			}
		}

		internal static T ExecuteNonQueryAndGetIdentity<T>(string script)
		{
			using (SqlConnection connection = new SqlConnection(ConnectionString))
			{
				SqlCommand command = new SqlCommand();
				command.Connection = connection;
				command.CommandText = script;

				connection.Open();
				command.ExecuteNonQuery();

				command = new SqlCommand();
				command.Connection = connection;
				command.CommandText = "SELECT @@IDENTITY AS 'Identity'";
				T result = (T)command.ExecuteScalar();
				return result;
			}
		}

		internal static int ExecuteNonQueryAndGetInt32Identity(string script)
		{
			int result = Convert.ToInt32(ExecuteNonQueryAndGetIdentity<decimal>(script));
			return result;
		}

		/// <summary>
		/// Inserts entity into given table. property names must exactly match to SQL column names
		/// </summary>
		/// <param name="tableName">name of the table to insert into</param>
		/// <param name="entity">entity, to get column names and values from</param>
		/// <param name="columnsToSkip">A list of columns to skip. If null - only column with name == Id is skipped</param>
		/// <returns></returns>
		internal static int InsertAndGetInt32Identity(string tableName, object entity, IList<string> columnsToSkip = null)
		{
			if (columnsToSkip == null)
			{
				columnsToSkip = new List<string> { "Id" };
			}
			PropertyInfo[] properties = entity.GetType().GetProperties().Where(pi => !columnsToSkip.Contains(pi.Name)).ToArray();
			string[] colums = properties.Select(pi => string.Format("[{0}]", pi.Name)).ToArray();
			string[] values = properties.Select(pi =>
			{
				object val = pi.GetValue(entity);
				if (val == null)
				{
					return "null";
				}
				return string.Format("'{0}'", val.ToString().Replace("'", "''"));
			}).ToArray();

			string query = string.Format(InsertStatement, tableName, string.Join(",", colums), string.Join(",", values));
			int result = ExecuteNonQueryAndGetInt32Identity(query);
			return result;
		}

		internal static void ExecuteNonQuery(string script)
		{
			using (SqlConnection connection = new SqlConnection(ConnectionString))
			{
				SqlCommand command = new SqlCommand();
				command.Connection = connection;
				command.CommandText = script;

				connection.Open();
				command.ExecuteNonQuery();
			}
		}

		internal static void ExecuteNonQuery(string script, SqlParameter[] parameters)
		{
			using (SqlConnection connection = new SqlConnection(ConnectionString))
			{
				SqlCommand command = new SqlCommand();
				command.Connection = connection;
				command.CommandText = script;

				foreach (SqlParameter parameter in parameters)
				{
					command.Parameters.Add(parameter);
				}

				connection.Open();

				command.ExecuteNonQuery();
			}
		}
	}
}
