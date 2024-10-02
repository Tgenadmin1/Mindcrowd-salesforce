public class USPSLabelSravya {
	public ImageInfo imageInfo;
	public ToAddress toAddress;
	public ToAddress fromAddress;
	public PackageDescription packageDescription;

	public class ImageInfo {
		public String imageType;
		public String labelType;
	}

	public class ToAddress {
		public String streetAddress;
		public String secondaryAddress;
		public String city;
		public String state;
		public String ZIPCode;
		public Object ZIPPlus4;
		public String firstName;
		public String lastName;
		public String firm;
		public String phone;
	}

	public class PackageDescription {
		public String mailClass;
		public String rateIndicator;
		public Double weight;
		public Integer length;
		public Double width;
		public Integer height;
		public String processingCategory;
		public String mailingDate;
		public String destinationEntryFacilityType;
	}

}