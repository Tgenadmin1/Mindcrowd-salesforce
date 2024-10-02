public class USPSLabelRequestBean {
	public ImageInfo imageInfo;
	public ToAddress toAddress;
	public FromAddress fromAddress;
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
		public String ZIPPlus4;
		public String firstName;
		public String lastName;
		public String firm;
		public String phone;
	}
    
    	public class FromAddress {
		public String streetAddress;
		public String secondaryAddress;
		public String city;
		public String state;
		public String ZIPCode;
		public String ZIPPlus4;
		public String firstName;
		public String lastName;
		public String firm;
		public String phone;
	}

	public class PackageDescription {
		public String mailClass;
		public Decimal weight;
		public Decimal length;
		public Decimal width;
		public Decimal height;
        public Decimal girth;
        public String shape;
        public String weightUOM;
        public String dimensionsUOM;
        public String packagingType;
		public String processingCategory;
		public String mailingDate;
		public String destinationEntryFacilityType;
	}

}