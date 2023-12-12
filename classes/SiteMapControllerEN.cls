public with sharing class SiteMapControllerEN {
  public String getXml() {
    //String xml = '<?xml version="1.0" encoding="UTF-8"?>';
    String xml = '<root>';
    xml += '<child>Hello, World!</child>';
    xml += '</root>';
    return xml;
  }
}