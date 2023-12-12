<!-- // Created By: {Girikon(ShwetaKhunteta)}
// Created On: 20/07/2021 (dd/mm/yyyy)
// Description/Purpose:created to include Send Shipment and Receive shipment, Barcode Genaration  functionality 

 -->
<aura:application extends="ltng:outApp" access="GLOBAL">
    <aura:dependency resource="markup://force:*" type="EVENT"/>
   
        <aura:dependency resource="barCodeGenerator" />
        <aura:dependency resource="qrCodeGeneration" />
        <aura:dependency resource="SendShipment" />
        <aura:dependency resource="ReceiveShipment" />
        <aura:dependency resource="trackShipment" />
        
        
</aura:application>