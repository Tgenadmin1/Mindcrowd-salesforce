<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Sample_Received_email_alert</fullName>
        <description>Sample Received email alert</description>
        <protected>false</protected>
        <recipients>
            <field>Contact_Id__c</field>
            <type>contactLookup</type>
        </recipients>
        <senderAddress>sfadmin2@tgen.org</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Received_Sample_Shipment_Status</template>
    </alerts>
    <alerts>
        <fullName>Sample_Received_email_alert_Spanish</fullName>
        <description>Sample Received email alert Spanish</description>
        <protected>false</protected>
        <recipients>
            <field>Contact_Id__c</field>
            <type>contactLookup</type>
        </recipients>
        <senderAddress>sfadmin2@tgen.org</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Received_Sample_Spanish</template>
    </alerts>
    <alerts>
        <fullName>Shipment_Status_sent_email_Spanish</fullName>
        <description>Shipment Status sent email Spanish</description>
        <protected>false</protected>
        <recipients>
            <field>Contact_Id__c</field>
            <type>contactLookup</type>
        </recipients>
        <senderAddress>sfadmin2@tgen.org</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Kit_Sent_Spanish_Shipment_Status</template>
    </alerts>
    <alerts>
        <fullName>Shipment_Status_sent_email_alert</fullName>
        <description>Shipment Status sent email alert</description>
        <protected>false</protected>
        <recipients>
            <field>Contact_Id__c</field>
            <type>contactLookup</type>
        </recipients>
        <senderAddress>sfadmin2@tgen.org</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Kit_Sent_Shipment_Status</template>
    </alerts>
    <alerts>
        <fullName>Shipment_status_Invalid_Address</fullName>
        <description>Shipment status Invalid Address</description>
        <protected>false</protected>
        <recipients>
            <field>Contact_Id__c</field>
            <type>contactLookup</type>
        </recipients>
        <senderAddress>sfadmin2@tgen.org</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Invalid_Address_Shipment_Status</template>
    </alerts>
    <alerts>
        <fullName>Shipment_status_Invalid_Address_Spanish</fullName>
        <description>Shipment status Invalid Address Spanish</description>
        <protected>false</protected>
        <recipients>
            <field>Contact_Id__c</field>
            <type>contactLookup</type>
        </recipients>
        <senderAddress>sfadmin2@tgen.org</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Invalid_Address_Spanish</template>
    </alerts>
</Workflow>
