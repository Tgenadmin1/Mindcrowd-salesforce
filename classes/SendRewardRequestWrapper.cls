public class SendRewardRequestWrapper {

	public class Payment {
		public String funding_source_id;
	}

	public Payment payment;
	public List<Rewards> rewards;

	public class Rewards {
		public Value value;
		public Delivery delivery;
		public Recipient recipient;
		public String campaign_id;
	}

	public class Value {
		public Double denomination;
		public String currency_code;
	}

	public class Recipient {
		public String name;
		public String email;
	}

	public class Delivery {
		public String method;
	}
}