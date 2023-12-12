@IsTest(SeeAllData = true)
public with sharing class LightningVIPAccessFormControllerTest {
    @IsTest
 static void LightningVIPAccessFormControllerInstantiation() {
  LightningVIPAccessFormController controller = new LightningVIPAccessFormController();
  System.assertNotEquals(controller, null);
 }
     @IsTest
 static void logintest() {
     string username = 'sunilsingh9839@gmail.com';
     string password='girikon@1234';
     string expID='2k8cs080';
     string starturl=System.Label.Community_Url+'/s/'+System.Label.url_dashboard;
     LightningVIPAccessFormController.routeCommunityPage( username,  password, '/userDashboardRedirect');
     LightningVIPAccessFormController.getForgotPasswordUrl();
     LightningVIPAccessFormController.setExperienceId(expID);
 }

 @IsTest
 static void testIsUsernamePasswordEnabled() {
  System.assertEquals(true, LightningVIPAccessFormController.getIsUsernamePasswordEnabled());
 }

 @IsTest
 static void testIsSelfRegistrationEnabled() {
  System.assertEquals(false, LightningVIPAccessFormController.getIsSelfRegistrationEnabled());
 }

 @IsTest
 static void testGetSelfRegistrationURL() {
  System.assertEquals(null, LightningVIPAccessFormController.getSelfRegistrationUrl());
 }

 @IsTest
 static void testAuthConfig() {
  Auth.AuthConfiguration authConfig = LightningVIPAccessFormController.getAuthConfig();
  System.assertNotEquals(null, authConfig);
 }

 /* Verifies that ForgotPasswordController handles invalid usernames appropriately */
 @IsTest
 static void testLightningVIPAccessFormControllerInvalidUserName() {
  System.assertEquals(LightningVIPAccessFormController.forgotPassword('fakeUser', 'http://a.com'), Label.Site.invalid_email);
  System.assertEquals(LightningVIPAccessFormController.forgotPassword(null, 'http://a.com'), Label.Site.invalid_email);
  System.assertEquals(LightningVIPAccessFormController.forgotPassword('a', '/home/home.jsp'), Label.Site.invalid_email);
 }

 /* Verifies that null checkEmailRef url throws proper exception. */
 @IsTest
 static void testLightningVIPAccessFormControllerWithNullCheckEmailRef() {
  System.assertEquals(LightningVIPAccessFormController.forgotPassword('a', null), 'Argument 1 cannot be null');
  System.assertEquals(LightningVIPAccessFormController.forgotPassword('a@salesforce.com', null), 'Argument 1 cannot be null');
 }
}