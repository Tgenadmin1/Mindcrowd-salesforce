@isTest
global class MockHttpResponseGenerator implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {
       
        //System.assertEquals('https://api.ipdata.co/103.147.0.141?api-key=8289ac328847197b92c5fa681c2168959470f6c0345d44c353e3cccd', req.getEndpoint());
        //System.assertEquals('GET', req.getMethod());
        
        // Create a fake response
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        string JsonValue ='{"ip":"122.161.50.186","is_eu":false,"city":"Delhi","region":"Delhi","region_code":"DL","region_type":"Union territory","country_name":"India","country_code":"IN","continent_name":"Asia","continent_code":"AS","latitude":28.654199600219727,"longitude":77.23729705810547,"postal":"110003","calling_code":"91","flag":"https://ipdata.co/flags/in.png","emoji_flag":"🇮🇳","emoji_unicode":"U+1F1EE U+1F1F3","asn":{"asn":"AS24560","name":"Bharti Airtel Limited","domain":"airtel.com","route":"122.161.50.0/23","type":"isp"},"carrier":{"name":"AirTel","mcc":"404","mnc":"02"},"languages":[{"name":"Hindi","native":"हिन्दी","code":"hi"},{"name":"English","native":"English","code":"en"}],"currency":{"name":"Indian Rupee","code":"INR","symbol":"Rs","native":"₹","plural":"Indian rupees"},"time_zone":{"name":"Asia/Kolkata","abbr":"IST","offset":"+0530","is_dst":false,"current_time":"2022-08-02T06:08:47+05:30"},"threat":{"is_tor":false,"is_icloud_relay":false,"is_proxy":false,"is_datacenter":false,"is_anonymous":false,"is_known_attacker":false,"is_known_abuser":true,"is_threat":true,"is_bogon":false,"blocklists":[{"name":"Stop Forum Spam","site":"https://www.stopforumspam.com","type":"spam"}]},"count":"0"}';
        res.setBody(JsonValue);
        res.setStatusCode(200);
        return res;
    }
}