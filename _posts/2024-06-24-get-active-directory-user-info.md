---
title: 抓取 Active Directory 使用者資訊
tags: ActiveDirectory
tagline:
---

```cs
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;

var service = new DirectoryService();

service.GetUserByPrincipal("user").Dump();

#pragma warning disable CA1416
public class DirectoryService
{
	private readonly ContextType _contextType = ContextType.Domain;

	public User? GetUserByPrincipal(string userName)
	{
		using var context = new PrincipalContext(_contextType);

		return Parse(context, userName);
	}

	public User? GetUserByPrincipal(string userName, string password)
	{
		using var context = new PrincipalContext(_contextType, null, null, userName, password);

		try
		{
			if (string.IsNullOrWhiteSpace(context.ConnectedServer))
			{
				throw new Exception("ConnectedServer is null or empty.");
			}
		}
		catch (DirectoryServicesCOMException)
		{
			// Invalid password
			return null;
		}

		return Parse(context, userName);
	}

	private static User? Parse(PrincipalContext context, string userName)
	{
		using var userPrincipal = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, userName);

		if (userPrincipal?.Enabled ?? false)
		{
			return new User(userPrincipal);
		}

		return null;
	}

	public IEnumerable<(string Key, object Value)>? GetUserByDirectoryEntry(string userName)
	{
		using var dcEntry = new DirectoryEntry();

		return Parse(dcEntry, userName);
	}

	public IEnumerable<(string Key, object Value)>? GetUserByDirectoryEntry(string userName, string password)
	{
		using var dcEntry = new DirectoryEntry();

		using var userEntry = new DirectoryEntry(dcEntry.Path, userName, password);

		return Parse(userEntry, userName);
	}

	private static IEnumerable<(string Key, object Value)>? Parse(DirectoryEntry dcEntry, string userName)
	{
		var search = new DirectorySearcher(dcEntry)
		{
			Filter = $"(&(objectClass=user)(sAMAccountName={userName}))"
		};

		SearchResult? searchResult;

		try
		{
			searchResult = search.FindOne();
		}
		catch (DirectoryServicesCOMException)
		{
			// Invalid password
			return null;
		}

		if (searchResult == null)
		{
			return null;
		}

		var user = new List<(string Key, object Value)>();

		foreach (var p in searchResult.Properties)
		{
			if (p is not System.Collections.DictionaryEntry { Key: string key, Value: ResultPropertyValueCollection propertyValue })
			{
				continue;
			}

			var value = GetResultPropertyValue(propertyValue);

			user.Add((key, value));
		}

		return user;
	}

	private static object GetResultPropertyValue(ResultPropertyValueCollection propertyValue)
	{
		var value = propertyValue[0];

		if (value is byte[] b)
		{
			value = ByteArrayToGuid(b);
		}

		return value;

		static object ByteArrayToGuid(byte[] binaryData)
		{
			var strHex = BitConverter.ToString(binaryData);

			if (Guid.TryParse(strHex.Replace("-", string.Empty), out var guid))
			{
				return guid;
			}

			return strHex;
		}
	}

	public class User(UserPrincipal principal)
	{
		public Guid? Id { get; } = principal.Guid;
		public string? EmployeeId { get; } = principal.EmployeeId;
		public string? Account { get; } = principal.SamAccountName;
		public string? UserName { get; } = principal.Name;
		public string? Surname { get; } = principal.Surname;
		public string? GivenName { get; } = principal.GivenName;
		public string? EmailAddress { get; } = principal.EmailAddress;
		public Group[]? Groups { get; } = GetGroups(principal);

		private static Group[]? GetGroups(Principal user)
		{
			var groups = user.GetGroups().ToArray().Where(x => x is GroupPrincipal).Select(x => new Group((GroupPrincipal)x)).ToArray();

			return groups;
		}
	}

	public class Group(GroupPrincipal principal)
	{
		public Guid? Id { get; } = principal.Guid;
		public string? Account { get; } = principal.SamAccountName;
		public string? Name { get; } = principal.Name;
		public bool? IsSecurityGroup { get; } = principal.IsSecurityGroup;
	}
}
#pragma warning restore CA1416
```
