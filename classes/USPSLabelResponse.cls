public class USPSLabelResponse {

	public class LabelAddress {
		public String streetAddress;
		public String secondaryAddress;
		public String city;
		public String state;
		public String ZIPCode;
		public String ZIPPlus4;
		public String firstName;
		public String lastName;
		public String firm;
		public Boolean ignoreBadAddress;
	}

	public String labelImage;
	public LabelAddress labelAddress;
	public String routingInformation;
	public String trackingNumber;
	public Double postage;
	public List<ExtraServices> extraServices;
	public String zone;
	public Commitment commitment;
	public String weightUOM;
	public Double weight;
	public Double dimensionalWeight;
	public List<Fees> fees;
	public String constructCode;
	public String SKU;

	public class ExtraServices {
		public String name;
		public Double price;
		public String SKU;
	}

	public class Commitment {
		public String name;
		public String scheduleDeliveryDate;
	}

	public class Fees {
	}

}