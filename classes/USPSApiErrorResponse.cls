public class USPSApiErrorResponse {

    public String apiVersion;
    public Error error;

    public class Error {
        public String code;
        public String message;
        public List<Errors> errors;
    }

    public class Errors {
        public String title;
        public String detail;
        public String source;
    }

}