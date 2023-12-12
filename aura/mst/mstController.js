({
    myAction: function (component, event, helper) {
        helper.preventLeaving();
        document.documentElement.addEventListener('keydown', function (e) {
            if ((e.keycode || e.which) == 32) {
                e.preventDefault();
            }
        }, false);

        //-----Gettung gameId from the apex function------------------
        var gameName = 'Object Discrimination';
        helper.gameDetails(component, event, helper, gameName);
        var gameId;
        var participantGameInfoId;
        var ipAddress;
        var browserName;
        helper.getIpAddress(component, event, helper);
        helper.printBrowser(component, event, helper);
        var device = $A.get("$Browser.formFactor");

        // Gettin contact id from the current loggedin user.
        let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
        helper.userDetails(component, event, helper, currentUserId);
        var userContactId;

        //MST game js -----------
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        const  cs = urlParams.get('cs');
        let currentScreent = 0;
        if(cs!=null){
            console.log("cs1=", cs)
            currentScreent = Number(cs);
        }

        let screenWaitTime=4000;
        let resultData = {};
       // let currentScreent = 0;
        let intervalTime = null;
        let intervalImageTime = null;
        let blockevents = 0;
        let timedata = new Date();
        let result_time = 0;
        let command_value = 0;
        let inputdata = "";
        let lastdatatitle = "";
        let image_path = $A.get("$Label.c.Community_Url") + "/resource/mindGamesImagesMST/mst/";
        let image_path2 = $A.get("$Label.c.Community_Url") + "/resource/mindcrowd_style/images/";
        let errormsg = null;
        let imagedata = null;
        var gameName = $A.get("$Label.c.mst_text_18");
        var gameTime = '20 minutes';
        let white = false;

        //creating participant game info record.
        if (currentScreent == 0) {
            var startDateTime = new Date();
            var gamePlayStatus = "Not-Completed";
            helper.participantGameInfo(component, event, helper, userContactId, gameId, startDateTime, gamePlayStatus);
            console.log('participantGameInfo :',userContactId, gameId, startDateTime, gamePlayStatus);
        }
        else {
            console.log('screens are changing');
        }


//changes
let bgimages = [];
let bgimages2 = [];
var imgContainer = document.getElementById('imgContainer');
function preloadImage2(imgdata) {
    
    for (var i = 0; i <= imgdata.length-1; i++) {
        bgimages2[i] = new Image();
        bgimages2[i].src = image_path2+imgdata[i];
        imgContainer.appendChild(bgimages2[i]);
        console.log('image load' , bgimages2[i].src);
    }  
    
    
}

function preloadImage(imgdata) {

    // bgimages[0] = new Image();
    // bgimages[0].src = "/sfsites/c/resource/mindGamesImagesMST/mst/btnimg.png";   
    // imgContainer.appendChild(bgimages[0]);
    
    for (var i = 0; i <= imgdata.length-1; i++) {
        bgimages[i] = new Image();
        bgimages[i].src = image_path+imgdata[i];
        imgContainer.appendChild(bgimages[i]);
    }  
    
    console.log('image load' , bgimages[1].src);
}
//preloadImage(["btnimg.png"])
preloadImage2([
    'F.png?t=1',
    'j.png?t=1',
    'v.png?t=1',
    'bk.png?t=1',
    'n.png?t=1'
])
preloadImage([
    "MSTP1S/1.weigh_tools.jpg",
    "MSTP1S/2.spatula.jpg",
    "MSTP1S/3.labelmaker.jpg",
    "MSTP1S/4.axe.jpg",
    "MSTP1S/5.metal_stirrups.jpg",
    "MSTP1S/6.ATM_machine.jpg",
    "MSTP1S/7.gas_pump.jpg",
    "MSTP1S/8.cookie.jpg",
    "MSTP1S/9.hanger.jpg",
    "MSTP1S/10.microphone.jpg",
    "MSTP1S/11.computer.jpg",
    "MSTP1S/12.soccer_ball.jpg",
    "MSTP1S/13.gold_bars.jpg",
    "MSTP1S/14.model_rocket.jpg",
    "MSTP1S/15.sewing_machine.jpg",
    "MSTP1S/16.exercise_ropes.jpg",
    "MSTP1S/17.cuticle_cuters.jpg",
    "MSTP1S/18.dishwasher.jpg",
    "MSTP1S/19.bird.jpg",
    "MSTP1S/20.pompom.jpg",
    "MSTP1S/21.suit_of_armor.jpg",
    "MSTP1S/22.neck_pillow.jpg",
    "MSTP1S/23.map.jpg",
    "MSTP1S/24.feather.jpg",
    "MSTP1S/25.sword.jpg",
    "MSTP1S/26.arrows.jpg",
    "MSTP1S/27.toolbox.jpg",
    "MSTP1S/28.farm_toy.jpg",
    "MSTP1S/29.bungee_cord.jpg",
    "MSTP1S/30.bulldozer.jpg",
    "MSTP1S/31.vhs_tape.jpg",
    "MSTP1S/32.tray.jpg",
    "MSTP1S/33.funnel.jpg",
    "MSTP1S/34.cage.jpg",
    "MSTP1S/35.spork.jpg",
    "MSTP1S/36.budda_fountain.jpg",
    "MSTP1S/37.silver_bracelets.jpg",
    "MSTP1S/38.kangaroo.jpg",
    "MSTP1S/39.beaker.jpg",
    "MSTP1S/40.lantern.jpg",
    "MSTP1S/41.malibox.jpg",
    "MSTP1S/42.scissors.jpg",
    "MSTP1S/43.soccer_net.jpg",
    "MSTP1S/44.straws.jpg",
    "MSTP1S/45.blowdryer.jpg",
    "MSTP1S/46.broom.jpg",
    "MSTP1S/47.laptop.jpg",
    "MSTP1S/48.pumpkin.jpg",
    "MSTP1S/49.hot_water_container.jpg",
    "MSTP1S/50.ruler.jpg",
    "MSTP1S/51.grater.jpg",
    "MSTP1S/52.stick_of_butter.jpg",
    "MSTP1S/53.fridge.jpg",
    "MSTP1S/54.pumpkin_pie.jpg",
    "MSTP1S/55.ice_tray.jpg",
    "MSTP1S/56.binoculars.jpg",
    "MSTP1S/57.balloon.jpg",
    "MSTP1S/58.stroller.jpg",
    "MSTP1S/59.febreze.jpg",
    "MSTP1S/60.statue.jpg",
    "MSTP1S/61.keyboard.jpg",
    "MSTP1S/62.pillow.jpg",
    "MSTP1S/63.wifi_station.jpg",
    "MSTP1S/64.shrimp.jpg",
    "MSTP1S/65.purse.jpg",
    "MSTP1S/66.peas.jpg",
    "MSTP1S/67.espresso_machine.jpg",
    "MSTP1S/68.weed_whacker.jpg",
    "MSTP1S/69.wheelbarrow.jpg",
    "MSTP1S/70.metal_lantern.jpg",
    "MSTP1S/71.bassoon.jpg",
    "MSTP1S/72.ice_cream_cone.jpg",
    "MSTP1S/73.excercise_ball.jpg",
    "MSTP1S/74.chalk.jpg",
    "MSTP1S/75.magnifying_glass.jpg",
    "MSTP1S/76.turtle_toy.jpg",
    "MSTP1S/77.barometer.jpg",
    "MSTP1S/78.small_pumpkin.jpg",
    "MSTP1S/79.poker_chips.jpg",
    "MSTP1S/80.cheese.jpg",
    "MSTP1S/81.staple_remover.jpg",
    "MSTP1S/82.yellow_cable.jpg",
    "MSTP1S/83.cake_platter.jpg",
    "MSTP1S/84.measuring_cup.jpg",
    "MSTP1S/85.weight_bench.jpg",
    "MSTP1S/86.cereal.jpg",
    "MSTP1S/87.ship_in_a_bottle.jpg",
    "MSTP1S/88.disco_ball.jpg",
    "MSTP1S/89.wood_chisel.jpg",
    "MSTP1S/90.staircase.jpg",
    "MSTP1S/91.projector.jpg",
    "MSTP1S/92.megaphone.jpg",
    "MSTP1S/93.trumpet.jpg",
    "MSTP1S/94.frying_pan.jpg",
    "MSTP1S/95.belt.jpg",
    "MSTP1S/96.microwave.jpg",
    "MSTP1S/97.lamp.jpg",
    "MSTP1S/98.stuffed_penguin.jpg",
    "MSTP1S/99.triangle.jpg",
    "MSTP1S/100.rose.jpg",
    "MSTP1S/101.glasses.jpg",
    "MSTP1S/102.earrings.jpg",
    "MSTP1S/103.diesel_truck.jpg",
    "MSTP1S/104.computer_plugs.jpg",
    "MSTP1S/105.calculator.jpg",
    "MSTP1S/106.stool.jpg",
    "MSTP1S/107.3D_glasses.jpg",
    "MSTP1S/108.cream_pie.jpg",
    "MSTP1S/109.race_start_pedals.jpg",
    "MSTP1S/110.baseball.jpg",
    "MSTP1S/111.soap_dispenser.jpg",
    "MSTP1S/112.balloons.jpg",
    "MSTP1S/113.suit_jacket.jpg",
    "MSTP1S/114.oboe.jpg",
    "MSTP1S/115.table_top.jpg",
    "MSTP1S/116.gum_drops.jpg",
    "MSTP1S/117.cake.jpg",
    "MSTP1S/118.graduation_cap.jpg",
    "MSTP1S/119.tupperware.jpg",
    "MSTP1S/120.flashlight.jpg",
    "MSTP1S/121.jack_in_a_box.jpg",
    "MSTP1S/122.spray_bottle.jpg",
    "MSTP1S/123.anchor.jpg",
    "MSTP1S/124.oreos.jpg",
    "MSTP1S/125.frame.jpg",
    "MSTP1S/126.goblet.jpg",
    "MSTP1S/127.mop.jpg",
    "MSTP1S/128.electric_drums.jpg",
    "MSTP2S/1.anchor.jpg",
    "MSTP2S/2.ruler.jpg",
    "MSTP2S/3.cream_pie.jpg",
    "MSTP2S/4.malibox.jpg",
    "MSTP2S/5.bird.jpg",
    "MSTP2S/6.stroller.jpg",
    "MSTP2S/7.cookie.jpg",
    "MSTP2S/8.stop_sign.jpg",
    "MSTP2S/9.ice_cream_cone.jpg",
    "MSTP2S/10.statue.jpg",
    "MSTP2S/11.diesel_truck.jpg",
    "MSTP2S/12.magnifying_glass.jpg",
    "MSTP2S/13.earrings.jpg",
    "MSTP2S/14.utensils_organizer.jpg",
    "MSTP2S/15.gardening_gloves.jpg",
    "MSTP2S/16.budda_fountain.jpg",
    "MSTP2S/17.thermostat.jpg",
    "MSTP2S/18.baseball.jpg",
    "MSTP2S/19.glasses.jpg",
    "MSTP2S/20.broom.jpg",
    "MSTP2S/21.mop.jpg",
    "MSTP2S/22.ice_tray.jpg",
    "MSTP2S/23.keyboard.jpg",
    "MSTP2S/24.cinnamon_roll.jpg",
    "MSTP2S/25.3D_glasses.jpg",
    "MSTP2S/26.ship_bottle.jpg",
    "MSTP2S/27.swimsuit.jpg",
    "MSTP2S/28.computer_plugs.jpg",
    "MSTP2S/29.arrows.jpg",
    "MSTP2S/30.goblet.jpg",
    "MSTP2S/31.staircase.jpg",
    "MSTP2S/32.stool.jpg",
    "MSTP2S/33.chip_clip.jpg",
    "MSTP2S/34.monopoly.jpg",
    "MSTP2S/35.pillow.jpg",
    "MSTP2S/36.bulldozer.jpg",
    "MSTP2S/37.jack_in_a_box.jpg",
    "MSTP2S/38.metal_stirrups.jpg",
    "MSTP2S/39.bus.jpg",
    "MSTP2S/40.beach_chair.jpg",
    "MSTP2S/41.sewing_machine.jpg",
    "MSTP2S/42.pumpkin_pie.jpg",
    "MSTP2S/43.light_stand.jpg",
    "MSTP2S/44.labelmaker.jpg",
    "MSTP2S/45.football_goal.jpg",
    "MSTP2S/46.dishwasher.jpg",
    "MSTP2S/47.film_reel.jpg",
    "MSTP2S/48.hanger.jpg",
    "MSTP2S/49.confetti.jpg",
    "MSTP2S/50.highlighter.jpg",
    "MSTP2S/51.graduation_cap.jpg",
    "MSTP2S/52.trumpet.jpg",
    "MSTP2S/53.flashlight.jpg",
    "MSTP2S/54.tray.jpg",
    "MSTP2S/55.soccer_net.jpg",
    "MSTP2S/56.asparagus.jpg",
    "MSTP2S/57.turtle_toy.jpg",
    "MSTP2S/58.stuffed_penguin.jpg",
    "MSTP2S/59.beaker.jpg",
    "MSTP2S/60.triangle.jpg",
    "MSTP2S/61.bloody_mary_drink.jpg",
    "MSTP2S/62.records.jpg",
    "MSTP2S/63.ATM_machine.jpg",
    "MSTP2S/64.gas_pump.jpg",
    "MSTP2S/65.frame.jpg",
    "MSTP2S/66.paperclip.jpg",
    "MSTP2S/67.chalk.jpg",
    "MSTP2S/68.poker_chips.jpg",
    "MSTP2S/69.farm_toy.jpg",
    "MSTP2S/70.shower_curtain.jpg",
    "MSTP2S/71.suit_of_armor.jpg",
    "MSTP2S/72.yellow_cab.jpg",
    "MSTP2S/73.stick_of_butter.jpg",
    "MSTP2S/74.beakers.jpg",
    "MSTP2S/75.fudgsicle.jpg",
    "MSTP2S/76.small_pumpkin.jpg",
    "MSTP2S/77.microwave.jpg",
    "MSTP2S/78.staple_remover.jpg",
    "MSTP2S/79.tractor.jpg",
    "MSTP2S/80.weed_whacker.jpg",
    "MSTP2S/81.cuticle_cutters.jpg",
    "MSTP2S/82.megaphone.jpg",
    "MSTP2S/83.barometer.jpg",
    "MSTP2S/84.computer.jpg",
    "MSTP2S/85.straws.jpg",
    "MSTP2S/86.frying_pan.jpg",
    "MSTP2S/87.orange_juice.jpg",
    "MSTP2S/88.tupperware.jpg",
    "MSTP2S/89.exercise_ball_chair.jpg",
    "MSTP2S/90.axe_body_spray.jpg",
    "MSTP2S/91.jeans.jpg",
    "MSTP2S/92.air_pump.jpg",
    "MSTP2S/93.press_machine.jpg",
    "MSTP2S/94.boxes.jpg",
    "MSTP2S/95.giraffe.jpg",
    "MSTP2S/96.watermelon.jpg",
    "MSTP2S/97.model_rocket.jpg",
    "MSTP2S/98.weight_bench.jpg",
    "MSTP2S/99.neck_pillow.jpg",
    "MSTP2S/100.soap_dispenser.jpg",
    "MSTP2S/101.laptop.jpg",
    "MSTP2S/102.espresso_machine.jpg",
    "MSTP2S/103.spray_bottle.jpg",
    "MSTP2S/104.wheelbarrow.jpg",
    "MSTP2S/105.wheelchair.jpg",
    "MSTP2S/106.gum_drops.jpg",
    "MSTP2S/107.race_start_pedals.jpg",
    "MSTP2S/108.knit_hat.jpg",
    "MSTP2S/109.suit_jacket.jpg",
    "MSTP2S/110.binoculars.jpg",
    "MSTP2S/111.folders.jpg",
    "MSTP2S/112.grater.jpg",
    "MSTP2S/113.wood_chisel.jpg",
    "MSTP2S/114.nails.jpg",
    "MSTP2S/115.egg_carton.jpg",
    "MSTP2S/116.doorknob.jpg",
    "MSTP2S/117.vhs_tape.jpg",
    "MSTP2S/118.exercise_ropes.jpg",
    "MSTP2S/119.sword.jpg",
    "MSTP2S/120.bassoon.jpg",
    "MSTP2S/121.rose.jpg",
    "MSTP2S/122.projector.jpg",
    "MSTP2S/123.pompom.jpg",
    "MSTP2S/124.metal_lantern.jpg",
    "MSTP2S/125.lantern.jpg",
    "MSTP2S/126.pumpkin.jpg",
    "MSTP2S/127.peas.jpg",
    "MSTP2S/128.map.jpg",
    "MSTP2S/129.soccer_ball.jpg",
    "MSTP2S/130.dresser.jpg",
    "MSTP2S/131.fridge.jpg",
    "MSTP2S/132.forklift.jpg",
    "MSTP2S/133.strawberry.jpg",
    "MSTP2S/134.toilet_brush.jpg",
    "MSTP2S/135.peanuts.jpg",
    "MSTP2S/136.microphone.jpg",
    "MSTP2S/137.bungee_cord.jpg",
    "MSTP2S/138.hockey_stick.jpg",
    "MSTP2S/139.disco_ball.jpg",
    "MSTP2S/140.suitcase.jpg",
    "MSTP2S/141.belt.jpg",
    "MSTP2S/142.flowers.jpg",
    "MSTP2S/143.screw_in_hooks.jpg",
    "MSTP2S/144.balloon.jpg",
    "MSTP2S/145.tomato.jpg",
    "MSTP2S/146.lamp.jpg",
    "MSTP2S/147.purse.jpg",
    "MSTP2S/148.scissors.jpg",
    "MSTP2S/149.spork.jpg",
    "MSTP2S/150.feather.jpg",
    "MSTP2S/151.febreze.jpg",
    "MSTP2S/152.stuffed_seahorse.jpg",
    "MSTP2S/153.thimble.jpg",
    "MSTP2S/154.gold_bars.jpg",
    "MSTP2S/155.drain_catcher.jpg",
    "MSTP2S/156.blowdryer.jpg",
    "MSTP2S/157.oreos.jpg",
    "MSTP2S/158.funnel.jpg",
    "MSTP2S/159.red_heart.jpg",
    "MSTP2S/160.slippers.jpg",
    "MSTP2S/161.balloons.jpg",
    "MSTP2S/162.iHome.jpg",
    "MSTP2S/163.calculator.jpg",
    "MSTP2S/164.cake_platter.jpg",
    "MSTP2S/165.oboe.jpg",
    "MSTP2S/166.set_picks.jpg",
    "MSTP2S/167.weight_tools.jpg",
    "MSTP2S/168.cereal.jpg",
    "MSTP2S/169.toolbox.jpg",
    "MSTP2S/170.iphone.jpg",
    "MSTP2S/171.cheese.jpg",
    "MSTP2S/172.silver_bracelets.jpg",
    "MSTP2S/173.measuring_cup.jpg",
    "MSTP2S/174.sink_plug.jpg",
    "MSTP2S/175.blood_pressure_cuff.jpg",
    "MSTP2S/176.hot_water_container.jpg",
    "MSTP2S/177.electric_drums.jpg",
    "MSTP2S/178.sale_sign.jpg",
    "MSTP2S/179.cake.jpg",
    "MSTP2S/180.allen_wrench.jpg",
    "MSTP2S/181.cage.jpg",
    "MSTP2S/182.ipod_shuffle.jpg",
    "MSTP2S/183.spatula.jpg",
    "MSTP2S/184.mask.jpg",
    "MSTP2S/185.axe.jpg",
    "MSTP2S/186.printer_cartridge.jpg",
    "MSTP2S/187.shrimp.jpg",
    "MSTP2S/188.kangaroo.jpg",
    "MSTP2S/189.water_gallon.jpg",
    "MSTP2S/190.paintbrush.jpg",
    "MSTP2S/191.wifi_station.jpg",
    "MSTP2S/192.table_top.jpg"
]
)

        //Configuration of data parts.

        const configdata = [

            //Inisial data
            {
                screen: "0", startDuration: -1, endDuration: 9999920000, isTouch:true, content: '<h3 class="title">' + $A.get("$Label.c.game_first_screen_text") + ' <span> ' + gameName + '! </span> '+'</h3>'
                    +'<h3 class="title">' + $A.get("$Label.c.game_first_screen_text_2") + ' <span> ' + gameTime + ' </span> ' + $A.get("$Label.c.game_first_screen_text_3") + '</h3>'
                    +'<h3 class="title">' + $A.get("$Label.c.games_get_started_text_1") + '</h3>' 
                    + '<p class="centers s-b-instraction"> ' + $A.get("$Label.c.games_spacebar_text_3") + ' </p>'
                    + '<span class="game-lang">English</span> ', command: [32, 32]
            },
            //{
                //screen: "0", startDuration: -1, endDuration: 9999920000, isTouch:true, content: '<h3 class="title">' + $A.get("$Label.c.game_first_screen_text_4") + ' </h3>'
                    //+ '<p class="centers s-b-instraction"> ' + $A.get("$Label.c.games_spacebar_text_1") + ' </p>'
                    //+ '<span class="game-lang">English</span> ', command: [32, 32]
            //},
            {
                screen: "1", startDuration: -1, endDuration: 0, isTouch:true, content: '<h3 class="title font34">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </h3>'+
                    '<h3  class="title">' + $A.get("$Label.c.mst_text_0") + '</h3>' +
                    '<h3 class="title">' + $A.get("$Label.c.mst_text_1") + '</h3>' +
                    '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
            },

            //{
              //  screen: "2", startDuration: -1, endDuration: 0, isTouch:true, content: '<h3 class="title">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </h3>'+
             //       '<h3  class="title">' + $A.get("$Label.c.mst_text_2") + '</h3>' +  
                 //   '<h3 class="title">' + $A.get("$Label.c.mst_text_3") + '</h3>' +
                 //   '<h3 class="title">' + $A.get("$Label.c.games_ready_text") + '</h3>' +
              //      '<p class=" centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', command: [32, 32]
            //},

            //{
               // screen: "3", startDuration: -1, endDuration: 0, isTouch:true, content: '<h3 class="title">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </h3>'+
                 //   '<p class="centers mb35">' + $A.get("$Label.c.mst_text_4") + '</p>' +
                 //   '<p class="centers mb35">' + $A.get("$Label.c.mst_text_5") + '</p>' +
                   // '<p class="centers ">' + $A.get("$Label.c.mst_text_6") + '</p>' +
                 //   '<p class=" centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
            //},

           // {
             //   screen: "4", startDuration: -1, endDuration: 0, isTouch:true, content: '<h3 class="title">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </h3>'+
               //     '<p class="centers mb35">' + $A.get("$Label.c.mst_text_7") + '</p>' +
                 //   '<p class=" centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
            //},


            {
                screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/1.weigh_tools.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 1, isPractice: true, white:true
            },
           // { screen: "3", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "4", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/2.spatula.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 2, isPractice: true, white:true
            },
           // { screen: "5", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "6", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/3.labelmaker.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 3, isPractice: true, white:true
            },
          //  { screen: "10", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "11", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/4.axe.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 4, isPractice: true, white:true
            },
          //  { screen: "12", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "13", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/5.metal_stirrups.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 5, isPractice: true, white:true
            },
           // { screen: "14", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "15", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/6.ATM_machine.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 6, isPractice: true, white:true
            },
         //   { screen: "16", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "17", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/7.gas_pump.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 7, isPractice: true, white:true
            },
          //  { screen: "18", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "19", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/8.cookie.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 8, isPractice: true, white:true
            },
          //  { screen: "20", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "21", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/9.hanger.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 9, isPractice: true, white:true
            },
          //  { screen: "22", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },



            {
                screen: "23", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/10.microphone.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 10, isPractice: true, white:true
            },
          //  { screen: "24", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },



            {
                screen: "25", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/11.computer.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 11, isPractice: true, white:true
            },
           // { screen: "26", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "27", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/12.soccer_ball.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 12, isPractice: true, white:true
            },
          //  { screen: "28", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "29", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/13.gold_bars.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 13, isPractice: true, white:true
            },
          //  { screen: "30", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "31", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/14.model_rocket.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 14, isPractice: true, white:true
            },
           // { screen: "32", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },



            {
                screen: "33", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/15.sewing_machine.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 15, isPractice: true, white:true
            },
          //  { screen: "34", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "35", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/16.exercise_ropes.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 16, isPractice: true, white:true
            },
         //   { screen: "36", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "37", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/17.cuticle_cuters.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 17, isPractice: true, white:true
            },
         //   { screen: "38", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "39", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/18.dishwasher.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 18, isPractice: true, white:true
            },
          //  { screen: "40", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "41", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/19.bird.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 19, isPractice: true, white:true
            },
         //   { screen: "42", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "43", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/20.pompom.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 20, isPractice: true, white:true
            },
          //  { screen: "44", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "45", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/21.suit_of_armor.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 21, isPractice: true, white:true
            },
          //  { screen: "46", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "47", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/22.neck_pillow.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 22, isPractice: true, white:true
            },
          //  { screen: "48", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "49", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/23.map.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 23, isPractice: true, white:true
            },
         //   { screen: "50", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "51", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/24.feather.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 24, isPractice: true, white:true
            },
         //   { screen: "52", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "53", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/25.sword.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 25, isPractice: true, white:true
            },
         //   { screen: "54", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "55", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/26.arrows.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 26, isPractice: true, white:true
            },
          //  { screen: "56", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },



            {
                screen: "57", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/27.toolbox.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 27, isPractice: true, white:true
            },
         //   { screen: "58", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "59", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/28.farm_toy.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 28, isPractice: true, white:true
            },
        //    { screen: "60", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "61", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/29.bungee_cord.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 29, isPractice: true, white:true
            },
         //   { screen: "62", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "63", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/30.bulldozer.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 30, isPractice: true, white:true
            },
         //   { screen: "64", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "65", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/31.vhs_tape.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 31, isPractice: true, white:true
            },
         //   { screen: "66", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "67", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/32.tray.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 32, isPractice: true, white:true
            },
          //  { screen: "68", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "69", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/33.funnel.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 33, isPractice: true, white:true
            },
         //   { screen: "70", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "71", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/34.cage.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 34, isPractice: true, white:true
            },
         //   { screen: "72", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "73", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/35.spork.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 35, isPractice: true, white:true
            },
         //   { screen: "74", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "75", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/36.budda_fountain.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 36, isPractice: true, white:true
            },
         //   { screen: "76", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "77", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/37.silver_bracelets.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 37, isPractice: true, white:true
            },
         //   { screen: "78", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "79", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/38.kangaroo.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 38, isPractice: true, white:true
            },
         //   { screen: "80", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "81", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/39.beaker.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 39, isPractice: true, white:true
            },
         //   { screen: "82", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "83", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/40.lantern.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 40, isPractice: true, white:true
            },
         //   { screen: "84", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "85", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/41.malibox.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 41, isPractice: true, white:true
            },
         //   { screen: "86", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "87", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/42.scissors.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 42, isPractice: true, white:true
            },
         //   { screen: "88", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "89", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/43.soccer_net.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 43, isPractice: true, white:true
            },
         //   { screen: "90", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "91", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/44.straws.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 44, isPractice: true, white:true
            },
          //  { screen: "92", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "93", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/45.blowdryer.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 45, isPractice: true, white:true
            },
          //  { screen: "94", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "95", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/46.broom.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 46, isPractice: true, white:true
            },
        //    { screen: "96", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "97", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/47.laptop.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 47, isPractice: true, white:true
            },
          //  { screen: "98", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "99", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/48.pumpkin.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 48, isPractice: true, white:true
            },
         //   { screen: "100", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "101", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/49.hot_water_container.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 49, isPractice: true, white:true
            },
         //   { screen: "102", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "103", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/50.ruler.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 50, isPractice: true, white:true
            },
         //   { screen: "104", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "105", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/51.grater.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 51, isPractice: true, white:true
            },
         //   { screen: "106", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "107", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/52.stick_of_butter.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 52, isPractice: true, white:true
            },
         //   { screen: "108", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "109", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/53.fridge.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 53, isPractice: true, white:true
            },
        //    { screen: "110", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "111", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/54.pumpkin_pie.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 54, isPractice: true, white:true
            },
          //  { screen: "112", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "113", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/55.ice_tray.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 55, isPractice: true, white:true
            },
        //    { screen: "114", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "115", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/56.binoculars.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 56, isPractice: true, white:true
            },
         //   { screen: "116", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "117", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/57.balloon.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 57, isPractice: true, white:true
            },
         //   { screen: "118", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "119", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/58.stroller.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 58, isPractice: true, white:true
            },
        //    { screen: "120", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "121", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/59.febreze.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 59, isPractice: true, white:true
            },
         //   { screen: "122", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "123", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/60.statue.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 60, isPractice: true, white:true
            },
        //    { screen: "124", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "125", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/61.keyboard.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 61, isPractice: true, white:true
            },
         //   { screen: "126", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "127", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/62.pillow.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 62, isPractice: true, white:true
            },
         //   { screen: "128", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "129", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/63.wifi_station.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 63, isPractice: true, white:true
            },
        //    { screen: "130", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "131", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/64.shrimp.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 64, isPractice: true, white:true
            },
         //   { screen: "132", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "133", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/65.purse.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 65, isPractice: true, white:true
            },
        //    { screen: "134", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "135", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/66.peas.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 66, isPractice: true, white:true
            },
         //   { screen: "136", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "137", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/67.espresso_machine.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 67, isPractice: true, white:true
            },
         //   { screen: "138", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "139", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/68.weed_whacker.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 68, isPractice: true, white:true
            },
         //   { screen: "140", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "141", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/69.wheelbarrow.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 69, isPractice: true, white:true
            },
         //   { screen: "142", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "143", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/70.metal_lantern.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 70, isPractice: true, white:true
            },
         //   { screen: "144", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "145", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/71.bassoon.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 71, isPractice: true, white:true
            },
         //   { screen: "146", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "147", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/72.ice_cream_cone.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 72, isPractice: true, white:true
            },
         //   { screen: "148", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "149", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/73.excercise_ball.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 73, isPractice: true, white:true
            },
         //   { screen: "150", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "151", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/74.chalk.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 74, isPractice: true, white:true
            },
         //   { screen: "152", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "153", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/75.magnifying_glass.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 75, isPractice: true, white:true
            },
         //   { screen: "154", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "155", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/76.turtle_toy.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 76, isPractice: true, white:true
            },
         //   { screen: "156", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "157", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/77.barometer.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 77, isPractice: true, white:true
            },
         //   { screen: "158", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "159", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/78.small_pumpkin.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 78, isPractice: true, white:true
            },
         //   { screen: "160", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "161", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/79.poker_chips.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 79, isPractice: true, white:true
            },
         //   { screen: "162", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "163", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/80.cheese.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 80, isPractice: true, white:true
            },
         //   { screen: "164", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "165", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/81.staple_remover.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 81, isPractice: true, white:true
            },
          //  { screen: "166", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "167", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/82.yellow_cable.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 82, isPractice: true, white:true
            },
         //   { screen: "168", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "169", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/83.cake_platter.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 83, isPractice: true, white:true
            },
         //   { screen: "170", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "171", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/84.measuring_cup.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 84, isPractice: true, white:true
            },
         //   { screen: "172", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "173", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/85.weight_bench.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 85, isPractice: true, white:true
            },
          //  { screen: "174", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "175", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/86.cereal.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 86, isPractice: true, white:true
            },
         //   { screen: "176", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "177", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/87.ship_in_a_bottle.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 87, isPractice: true, white:true
            },
         //   { screen: "178", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "179", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/88.disco_ball.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 88, isPractice: true, white:true
            },
         //   { screen: "180", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "181", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/89.wood_chisel.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 89, isPractice: true, white:true
            },
          //  { screen: "182", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "183", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/90.staircase.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 90, isPractice: true, white:true
            },
          //  { screen: "184", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "185", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/91.projector.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 91, isPractice: true, white:true
            },
         //   { screen: "186", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "187", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/92.megaphone.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 92, isPractice: true, white:true
            },
         //   { screen: "188", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "189", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/93.trumpet.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 93, isPractice: true, white:true
            },
         //   { screen: "190", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "191", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/94.frying_pan.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 94, isPractice: true, white:true
            },
        //    { screen: "192", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "193", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/95.belt.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 95, isPractice: true, white:true
            },
         //   { screen: "194", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },



            {
                screen: "195", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/96.microwave.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 96, isPractice: true, white:true
            },
         //   { screen: "196", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "197", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/97.lamp.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 97, isPractice: true, white:true
            },
        //    { screen: "198", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "199", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/98.stuffed_penguin.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 98, isPractice: true, white:true
            },
        //    { screen: "200", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "201", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/99.triangle.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 99, isPractice: true, white:true
            },
         //   { screen: "202", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "203", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/100.rose.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 100, isPractice: true, white:true
            },
         //   { screen: "204", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "205", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/101.glasses.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 101, isPractice: true, white:true
            },
         //   { screen: "206", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "207", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/102.earrings.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 102, isPractice: true, white:true
            },
         //   { screen: "208", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "209", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/103.diesel_truck.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 103, isPractice: true, white:true
            },
         //   { screen: "210", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "211", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/104.computer_plugs.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 104, isPractice: true, white:true
            },
         //   { screen: "212", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "213", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/105.calculator.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 105, isPractice: true, white:true
            },
        //    { screen: "214", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "215", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/106.stool.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 106, isPractice: true, white:true
            },
        //    { screen: "216", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "217", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/107.3D_glasses.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 107, isPractice: true, white:true
            },
        //    { screen: "218", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "219", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/108.cream_pie.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 108, isPractice: true, white:true
            },
         //   { screen: "220", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "221", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/109.race_start_pedals.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 109, isPractice: true, white:true
            },
         //   { screen: "222", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "223", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/110.baseball.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 110, isPractice: true, white:true
            },
         //   { screen: "224", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "225", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/111.soap_dispenser.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 111, isPractice: true, white:true
            },
        //    { screen: "226", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "227", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/112.balloons.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 112, isPractice: true, white:true
            },
        //    { screen: "228", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "229", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/113.suit_jacket.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 113, isPractice: true, white:true
            },
        //    { screen: "230", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "231", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/114.oboe.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 114, isPractice: true, white:true
            },
        //    { screen: "232", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "233", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/115.table_top.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 115, isPractice: true, white:true
            },
        //    { screen: "234", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "235", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/116.gum_drops.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 116, isPractice: true, white:true
            },
         //   { screen: "236", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "237", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/117.cake.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 117, isPractice: true, white:true
            },
          //  { screen: "238", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "239", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/118.graduation_cap.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 118, isPractice: true, white:true
            },
         //   { screen: "240", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "241", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/119.tupperware.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 119, isPractice: true, white:true
            },
        //    { screen: "242", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "243", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/120.flashlight.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 120, isPractice: true, white:true
            },
        //    { screen: "244", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "245", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/121.jack_in_a_box.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 121, isPractice: true, white:true
            },
         //   { screen: "246", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "247", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/122.spray_bottle.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 122, isPractice: true, white:true
            },
          //  { screen: "248", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "249", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/123.anchor.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 123, isPractice: true, white:true
            },
         //   { screen: "250", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "251", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/124.oreos.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 124, isPractice: true, white:true
            },
         //   { screen: "252", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "253", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/125.frame.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 125, isPractice: true, white:true
            },
         //   { screen: "254", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "255", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/126.goblet.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 126, isPractice: true, white:true
            },
        //    { screen: "256", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "257", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/127.mop.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'f', question: 127, isPractice: true, white:true
            },
          //  { screen: "258", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "259", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP1S/128.electric_drums.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [70, 74], result: true, answer: 'j', question: 128, isPractice: true, white:true
            },
        //    { screen: "260", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },




            {
                screen: "261", startDuration: -1, endDuration: 0, isTouch:true, content:'<h3 class="title">  <span> ' + $A.get("$Label.c.mst_text_8") + ' </span> </h3>'+
                    '<h3 class="title">' + $A.get("$Label.c.mst_text_9") + '</h3>' +
                    '<h3 class="title">' + $A.get("$Label.c.games_ready_text") + '</h3>' +
                    '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', command: [32, 32]
            },

            {
               screen: "262", startDuration: -1, endDuration: 0, isTouch:true, content:'<h3 class="title">' + $A.get("$Label.c.mst_text_10") + '</h3>' +
                   '<h3 class="title">' + $A.get("$Label.c.mst_text_11") + '</h3>' +
                   '<p class=" centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
           },
           {
              screen: "263", startDuration: -1, endDuration: 0, isTouch:true, content:'<h3 class="title font34">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </h3>'+ 
                  '<h3 class="title">' + $A.get("$Label.c.mst_text_12") + '</h3>' +
                  '<h3 class="title">' + $A.get("$Label.c.mst_text_13") + '</h3>' +
                  '<p class=" centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
           },
            {
                screen: "264", startDuration: -1, endDuration: 0, isTouch:true, content:'<h3 class="title font34">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </h3>'+
                    '<h3 class="title">' + $A.get("$Label.c.mst_text_14") + '</h3>' +
                    '<h3 class="title">' + $A.get("$Label.c.games_ready_text") + '</h3>' +
                    '<p class=" centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', command: [32, 32]
            },
            /*{
                screen: "265", startDuration: -1, endDuration: 0, isTouch:true, content:'<h3 class="title">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </h3>'+ 
                    '<p class="centers mb35">' + $A.get("$Label.c.mst_text_13") + ' .</p>' +
                    '<p class=" centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
            },
            {
                screen: "266", startDuration: -1, endDuration: 0, isTouch:true, content: '<h3 class="title">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </h3>'+
                    '<p class="centers mb35">' + $A.get("$Label.c.mst_text_14") + '</p>' +
                    '<p class=" centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
            },
            {
                screen: "267", startDuration: -1, endDuration: 0, isTouch:true, content: '<h3 class="title">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </h3>'+
                    '<p class="centers mb35">' + $A.get("$Label.c.mst_text_15") + '</p>' +
                    '<p class=" centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
            },*/

            {
                screen: "268", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/1.anchor.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 1, isPractice: false, white:true
            },
         //   { screen: "269", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "270", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/2.ruler.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 2, isPractice: false, white:true
            },
         //   { screen: "271", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "272", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/3.cream_pie.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 3, isPractice: false, white:true
            },
          //  { screen: "273", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "274", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/4.malibox.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 4, isPractice: false, white:true
            },
            //{ screen: "275", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "276", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/5.bird.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 5, isPractice: false, white:true
            },
            //{ screen: "277", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "278", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/6.stroller.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 6, isPractice: false, white:true
            },
            //{ screen: "279", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "280", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/7.cookie.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 7, isPractice: false, white:true
            },
            //{ screen: "281", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "282", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/8.stop_sign.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 8, isPractice: false, white:true
            },
            //{ screen: "283", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "284", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/9.ice_cream_cone.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 9, isPractice: false, white:true
            },
            //{ screen: "285", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "286", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/10.statue.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 10, isPractice: false, white:true
            },
            //{ screen: "287", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "288", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/11.diesel_truck.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 11, isPractice: false, white:true
            },
            //{ screen: "289", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "290", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/12.magnifying_glass.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 12, isPractice: false, white:true
            },
            //{ screen: "291", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "292", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/13.earrings.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 13, isPractice: false, white:true
            },
            //{ screen: "293", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "294", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/14.utensils_organizer.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 14, isPractice: false, white:true
            },
            //{ screen: "295", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "296", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/15.gardening_gloves.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 15, isPractice: false, white:true
            },
            //{ screen: "297", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "298", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/16.budda_fountain.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 16, isPractice: false, white:true
            },
            //{ screen: "299", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "300", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/17.thermostat.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 17, isPractice: false, white:true
            },
            //{ screen: "301", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "302", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/18.baseball.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 18, isPractice: false, white:true
            },
            //{ screen: "303", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "304", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/19.glasses.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 19, isPractice: false, white:true
            },
            //{ screen: "305", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "306", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/20.broom.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 20, isPractice: false, white:true
            },
            //{ screen: "307", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "308", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/21.mop.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 21, isPractice: false, white:true
            },
            //{ screen: "309", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "310", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/22.ice_tray.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 22, isPractice: false, white:true
            },
            //{ screen: "311", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "312", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/23.keyboard.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 23, isPractice: false, white:true
            },
            //{ screen: "313", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "314", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/24.cinnamon_roll.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 24, isPractice: false, white:true
            },
            //{ screen: "315", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "316", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/25.3D_glasses.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 25, isPractice: false, white:true
            },
            //{ screen: "317", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "318", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/26.ship_bottle.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 26, isPractice: false, white:true
            },
            //{ screen: "319", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "320", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/27.swimsuit.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 27, isPractice: false, white:true
            },
            //{ screen: "321", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "322", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/28.computer_plugs.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 28, isPractice: false, white:true
            },
            //{ screen: "323", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "324", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/29.arrows.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 29, isPractice: false, white:true
            },
            //{ screen: "325", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "326", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/30.goblet.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 30, isPractice: false, white:true
            },
            //{ screen: "327", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "328", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/31.staircase.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 31, isPractice: false, white:true
            },
            //{ screen: "329", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "330", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/32.stool.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 32, isPractice: false, white:true
            },
            //{ screen: "331", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "332", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/33.chip_clip.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 33, isPractice: false, white:true
            },
            //{ screen: "333", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "334", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/34.monopoly.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 34, isPractice: false, white:true
            },
            //{ screen: "335", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "336", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/35.pillow.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 35, isPractice: false, white:true
            },
            //{ screen: "337", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "338", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/36.bulldozer.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 36, isPractice: false, white:true
            },
            //{ screen: "339", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "340", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/37.jack_in_a_box.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 37, isPractice: false, white:true
            },
            //{ screen: "341", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },



            {
                screen: "342", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/38.metal_stirrups.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 38, isPractice: false, white:true
            },
            //{ screen: "343", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "344", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/39.bus.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 39, isPractice: false, white:true
            },
            //{ screen: "345", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "346", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/40.beach_chair.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 40, isPractice: false, white:true
            },
            //{ screen: "347", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "348", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/41.sewing_machine.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 41, isPractice: false, white:true
            },
            //{ screen: "349", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "350", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/42.pumpkin_pie.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 42, isPractice: false, white:true
            },
            //{ screen: "351", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "352", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/43.light_stand.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 43, isPractice: false, white:true
            },
            //{ screen: "353", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "354", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/44.labelmaker.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 44, isPractice: false, white:true
            },
            //{ screen: "355", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "356", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/45.football_goal.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 45, isPractice: false, white:true
            },
            //{ screen: "357", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "358", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/46.dishwasher.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 46, isPractice: false, white:true
            },
            //{ screen: "359", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "360", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/47.film_reel.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 47, isPractice: false, white:true
            },
            //{ screen: "361", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "362", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/48.hanger.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 48, isPractice: false, white:true
            },
            //{ screen: "363", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "364", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/49.confetti.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 49, isPractice: false, white:true
            },
            //{ screen: "365", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "366", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/50.highlighter.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 50, isPractice: false, white:true
            },
            //{ screen: "367", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "368", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/51.graduation_cap.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 51, isPractice: false, white:true
            },
            //{ screen: "369", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "370", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/52.trumpet.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 52, isPractice: false, white:true
            },
            //{ screen: "371", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "372", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/53.flashlight.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 53, isPractice: false, white:true
            },
            //{ screen: "373", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "374", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/54.tray.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 54, isPractice: false, white:true
            },
            //{ screen: "375", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "376", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/55.soccer_net.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 55, isPractice: false, white:true
            },
            //{ screen: "377", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "378", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/56.asparagus.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 56, isPractice: false, white:true
            },
            //{ screen: "379", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "380", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/57.turtle_toy.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 57, isPractice: false, white:true
            },
            //{ screen: "381", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "382", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/58.stuffed_penguin.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 58, isPractice: false, white:true
            },
            //{ screen: "383", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "384", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/59.beaker.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 59, isPractice: false, white:true
            },
            //{ screen: "385", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "386", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/60.triangle.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 60, isPractice: false, white:true
            },
            //{ screen: "387", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "388", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/61.bloody_mary_drink.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 61, isPractice: false, white:true
            },
            //{ screen: "389", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "390", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/62.records.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 62, isPractice: false, white:true
            },
            //{ screen: "391", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "392", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/63.ATM_machine.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 63, isPractice: false, white:true
            },
            //{ screen: "393", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "394", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/64.gas_pump.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 64, isPractice: false, white:true
            },
            //{ screen: "395", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "396", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/65.frame.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 65, isPractice: false, white:true
            },
            //{ screen: "397", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "398", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/66.paperclip.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 66, isPractice: false, white:true
            },
            //{ screen: "399", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "400", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/67.chalk.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 67, isPractice: false, white:true
            },
            //{ screen: "401", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "402", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/68.poker_chips.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 68, isPractice: false, white:true
            },
            //{ screen: "403", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "404", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/69.farm_toy.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 69, isPractice: false, white:true
            },
            //{ screen: "405", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },



            {
                screen: "406", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/70.shower_curtain.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 70, isPractice: false, white:true
            },
            //{ screen: "407", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "408", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/71.suit_of_armor.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 71, isPractice: false, white:true
            },
            //{ screen: "409", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "410", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/72.yellow_cab.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 72, isPractice: false, white:true
            },
            //{ screen: "411", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "412", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/73.stick_of_butter.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 73, isPractice: false, white:true
            },
            //{ screen: "413", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "414", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/74.beakers.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 74, isPractice: false, white:true
            },
            //{ screen: "415", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "416", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/75.fudgsicle.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 75, isPractice: false, white:true
            },
            //{ screen: "417", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "418", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/76.small_pumpkin.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 76, isPractice: false, white:true
            },
            //{ screen: "419", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },



            {
                screen: "420", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/77.microwave.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 77, isPractice: false, white:true
            },
            //{ screen: "421", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "422", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/78.staple_remover.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 78, isPractice: false, white:true
            },
            //{ screen: "423", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "424", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/79.tractor.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 79, isPractice: false, white:true
            },
            //{ screen: "425", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "426", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/80.weed_whacker.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 80, isPractice: false, white:true
            },
            //{ screen: "427", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "428", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/81.cuticle_cutters.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 81, isPractice: false, white:true
            },
            //{ screen: "429", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "430", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/82.megaphone.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 82, isPractice: false, white:true
            },
            //{ screen: "431", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "432", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/83.barometer.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 83, isPractice: false, white:true
            },
            //{ screen: "433", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "434", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/84.computer.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 84, isPractice: false, white:true
            },
            //{ screen: "435", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "436", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/85.straws.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 85, isPractice: false, white:true
            },
            //{ screen: "437", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "438", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/86.frying_pan.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 86, isPractice: false, white:true
            },
            //{ screen: "439", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "440", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/87.orange_juice.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 87, isPractice: false, white:true
            },
            //{ screen: "441", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "442", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/88.tupperware.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 88, isPractice: false, white:true
            },
            //{ screen: "443", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "444", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/89.exercise_ball_chair.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 89, isPractice: false, white:true
            },
            //{ screen: "445", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "446", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/90.axe_body_spray.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 90, isPractice: false, white:true
            },
            //{ screen: "447", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "448", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/91.jeans.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 91, isPractice: false, white:true
            },
            //{ screen: "449", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "450", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/92.air_pump.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 92, isPractice: false, white:true
            },
            //{ screen: "451", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "452", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/93.press_machine.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 93, isPractice: false, white:true
            },
            //{ screen: "453", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "454", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/94.boxes.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 94, isPractice: false, white:true
            },
            //{ screen: "455", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "456", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/95.giraffe.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 95, isPractice: false, white:true
            },
            //{ screen: "457", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "458", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/96.watermelon.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 96, isPractice: false, white:true
            },
            //{ screen: "459", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "460", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/97.model_rocket.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 97, isPractice: false, white:true
            },
            //{ screen: "461", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "462", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/98.weight_bench.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 98, isPractice: false, white:true
            },
            //{ screen: "463", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "464", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/99.neck_pillow.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 99, isPractice: false, white:true
            },
            //{ screen: "465", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "466", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/100.soap_dispenser.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 100, isPractice: false, white:true
            },
            //{ screen: "467", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "468", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/101.laptop.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 101, isPractice: false, white:true
            },
            //{ screen: "469", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "470", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/102.espresso_machine.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 102, isPractice: false, white:true
            },
            //{ screen: "471", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "472", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/103.spray_bottle.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 103, isPractice: false, white:true
            },
            //{ screen: "473", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "474", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/104.wheelbarrow.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 104, isPractice: false, white:true
            },
            //{ screen: "475", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "476", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/105.wheelchair.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 105, isPractice: false, white:true
            },
            //{ screen: "477", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "478", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/106.gum_drops.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 106, isPractice: false, white:true
            },
            //{ screen: "479", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "480", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/107.race_start_pedals.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 107, isPractice: false, white:true
            },
            //{ screen: "481", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "482", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/108.knit_hat.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 108, isPractice: false, white:true
            },
            //{ screen: "483", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "484", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/109.suit_jacket.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 109, isPractice: false, white:true
            },
            //{ screen: "485", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "486", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/110.binoculars.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 110, isPractice: false, white:true
            },
            //{ screen: "487", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "488", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/111.folders.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 111, isPractice: false, white:true
            },
            //{ screen: "489", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "490", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/112.grater.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 112, isPractice: false, white:true
            },
            //{ screen: "491", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "492", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/113.wood_chisel.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 113, isPractice: false, white:true
            },
            //{ screen: "493", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "494", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/114.nails.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 114, isPractice: false, white:true
            },
            //{ screen: "495", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "496", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/115.egg_carton.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 115, isPractice: false, white:true
            },
            //{ screen: "497", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "498", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/116.doorknob.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 116, isPractice: false, white:true
            },
            //{ screen: "499", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "500", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/117.vhs_tape.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 117, isPractice: false, white:true
            },
            //{ screen: "501", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "502", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/118.exercise_ropes.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 118, isPractice: false, white:true
            },
            //{ screen: "503", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "504", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/119.sword.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 119, isPractice: false, white:true
            },
            //{ screen: "505", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "506", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/120.bassoon.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 120, isPractice: false, white:true
            },
            //{ screen: "507", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "508", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/121.rose.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 121, isPractice: false, white:true
            },
            //{ screen: "509", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "510", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/122.projector.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 122, isPractice: false, white:true
            },
            //{ screen: "511", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "512", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/123.pompom.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 123, isPractice: false, white:true
            },
            //{ screen: "513", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "514", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/124.metal_lantern.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 124, isPractice: false, white:true
            },
            //{ screen: "515", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "516", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/125.lantern.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 125, isPractice: false, white:true
            },
            //{ screen: "517", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "518", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/126.pumpkin.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 126, isPractice: false, white:true
            },
            //{ screen: "519", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "520", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/127.peas.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 127, isPractice: false, white:true
            },
            //{ screen: "521", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "522", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/128.map.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 128, isPractice: false, white:true
            },
            //{ screen: "523", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "524", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/129.soccer_ball.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 129, isPractice: false, white:true
            },
            //{ screen: "525", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "526", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/130.dresser.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 130, isPractice: false, white:true
            },
           // { screen: "527", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "528", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/131.fridge.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 131, isPractice: false, white:true
            },
           // { screen: "529", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "530", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/132.forklift.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 132, isPractice: false, white:true
            },
            //{ screen: "531", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "532", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/133.strawberry.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 133, isPractice: false, white:true
            },
            //{ screen: "533", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "534", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/134.toilet_brush.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 134, isPractice: false, white:true
            },
            //{ screen: "535", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "536", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/135.peanuts.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 135, isPractice: false, white:true
            },
            //{ screen: "537", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "538", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/136.microphone.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 136, isPractice: false, white:true
            },
            //{ screen: "539", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "540", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/137.bungee_cord.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 137, isPractice: false, white:true
            },
            //{ screen: "541", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "542", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/138.hockey_stick.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 138, isPractice: false, white:true
            },
            //{ screen: "543", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "544", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/139.disco_ball.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 139, isPractice: false, white:true
            },
            //{ screen: "545", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "546", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/140.suitcase.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 140, isPractice: false, white:true
            },
            //{ screen: "547", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "548", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/141.belt.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 141, isPractice: false, white:true
            },
            //{ screen: "549", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "550", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/142.flowers.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 142, isPractice: false, white:true
            },
            //{ screen: "551", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },



            {
                screen: "552", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/143.screw_in_hooks.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 143, isPractice: false, white:true
            },
            //{ screen: "553", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "554", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/144.balloon.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 144, isPractice: false, white:true
            },
            //{ screen: "555", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "556", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/145.tomato.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 145, isPractice: false, white:true
            },
            //{ screen: "557", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "558", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/146.lamp.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 146, isPractice: false, white:true
            },
            //{ screen: "559", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "560", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/147.purse.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 147, isPractice: false, white:true
            },
            //{ screen: "561", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "562", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/148.scissors.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 148, isPractice: false, white:true
            },
            //{ screen: "563", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "564", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/149.spork.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 149, isPractice: false, white:true
            },
            //{ screen: "565", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "566", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/150.feather.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 150, isPractice: false, white:true
            },
            //{ screen: "567", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "568", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/151.febreze.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 151, isPractice: false, white:true
            },
            //{ screen: "569", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "570", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/152.stuffed_seahorse.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 152, isPractice: false, white:true
            },
            //{ screen: "571", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "572", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/153.thimble.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 153, isPractice: false, white:true
            },
            //{ screen: "573", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "574", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/154.gold_bars.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 154, isPractice: false, white:true
            },
            //{ screen: "575", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "576", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/155.drain_catcher.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 155, isPractice: false, white:true
            },
            //{ screen: "577", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "578", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/156.blowdryer.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 156, isPractice: false, white:true
            },
            //{ screen: "579", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "580", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/157.oreos.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 157, isPractice: false, white:true
            },
            //{ screen: "581", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "582", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/158.funnel.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 158, isPractice: false, white:true
            },
            //{ screen: "583", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "584", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/159.red_heart.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 159, isPractice: false, white:true
            },
            //{ screen: "585", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "586", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/160.slippers.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 160, isPractice: false, white:true
            },
            //{ screen: "587", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "588", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/161.balloons.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 161, isPractice: false, white:true
            },
            //{ screen: "589", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "590", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/162.iHome.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 162, isPractice: false, white:true
            },
            //{ screen: "591", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "592", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/163.calculator.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 163, isPractice: false, white:true
            },
            //{ screen: "593", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "594", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/164.cake_platter.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 164, isPractice: false, white:true
            },
            //{ screen: "595", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "596", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/165.oboe.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 165, isPractice: false, white:true
            },
            //{ screen: "597", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "598", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/166.set_picks.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 166, isPractice: false, white:true
            },
            //{ screen: "599", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "600", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/167.weight_tools.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 167, isPractice: false, white:true
            },
            //{ screen: "601", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "602", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/168.cereal.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 168, isPractice: false, white:true
            },
            //{ screen: "603", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "604", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/169.toolbox.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 169, isPractice: false, white:true
            },
            //{ screen: "605", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "606", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/170.iphone.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 170, isPractice: false, white:true
            },
            //{ screen: "607", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "608", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/171.cheese.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 171, isPractice: false, white:true
            },
            //{ screen: "609", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "610", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/172.silver_bracelets.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 172, isPractice: false, white:true
            },
            //{ screen: "611", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "612", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/173.measuring_cup.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 173, isPractice: false, white:true
            },
            //{ screen: "613", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "614", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/174.sink_plug.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 174, isPractice: false, white:true
            },
            //{ screen: "615", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "616", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/175.blood_pressure_cuff.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 175, isPractice: false, white:true
            },
            //{ screen: "617", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "618", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/176.hot_water_container.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 176, isPractice: false, white:true
            },
            //{ screen: "619", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "620", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/177.electric_drums.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 177, isPractice: false, white:true
            },
            //{ screen: "621", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "622", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/178.sale_sign.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 178, isPractice: false, white:true
            },
            //{ screen: "623", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "624", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/179.cake.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 179, isPractice: false, white:true
            },
            //{ screen: "625", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "626", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/180.allen_wrench.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 180, isPractice: false, white:true
            },
            //{ screen: "627", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "628", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/181.cage.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 181, isPractice: false, white:true
            },
            //{ screen: "629", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "630", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/182.ipod_shuffle.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 182, isPractice: false, white:true
            },
            //{ screen: "631", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "632", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/183.spatula.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 183, isPractice: false, white:true
            },
            //{ screen: "633", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "634", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/184.mask.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 184, isPractice: false, white:true
            },
            //{ screen: "635", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "636", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/185.axe.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 185, isPractice: false, white:true
            },
            //{ screen: "637", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "638", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/186.printer_cartridge.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 186, isPractice: false, white:true
            },
            //{ screen: "639", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "640", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/187.shrimp.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 187, isPractice: false, white:true
            },
            //{ screen: "641", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "642", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/188.kangaroo.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 188, isPractice: false, white:true
            },
            //{ screen: "643", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "644", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/189.water_gallon.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 189, isPractice: false, white:true
            },
            //{ screen: "645", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "646", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/190.paintbrush.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'n', question: 190, isPractice: false, white:true
            },
            //{ screen: "647", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "648", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/191.wifi_station.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'b', question: 191, isPractice: false, white:true
            },
            //{ screen: "649", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            {
                screen: "650", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path + 'MSTP2S/192.table_top.jpg);"></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Old<div class="btninput img-v">V</div></li>' +
                    '<li>Similar<div class="btninput img-b">B</div></li>' +
                    '<li>New<div class="btninput img-n">N</div></li>' +
                    '</ul></div>' +
                    '</div>',
                command: [66, 86, 78], result: true, answer: 'v', question: 192, isPractice: false, white:true
            },
            //{ screen: "651", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },


            { screen: "652", startDuration: 0, endDuration: 9999920000, content: '<h3 class="title">' + $A.get("$Label.c.game_thanks_text_1") + ' <span> ' + gameName + '. </span> ' + '</h3>'+
              '<h3 class="title marginB0">' + $A.get("$Label.c.object_game_text_27") + '</h3>' +
             '<h3 class="title">' + $A.get("$Label.c.game_thanks_text_2") + '</h3>' },

        ];

        //This saveData function is used for creating record in ParticipantGameresponse object.
        function saveData(gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer) {
            helper.recorData(component, event, helper, userContactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId);
            //questionNumber
            if (questionNumber == 192) {
                document.getElementById("nextBtton").classList.remove("slds-hide");
            }
            console.log("Input Results", gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, new Date());
        }

        //This startGame function get the gameid and create a participantGameInfo record and return record ID.
        function updateGameNameInParticipantGameInfo(gameId, participantGameInfoId, ipAddress, browserName, device) {
            helper.gameNameInParticipantGameInfo(component, event, helper, userContactId, gameId, participantGameInfoId, ipAddress, browserName, device);//helper method calling here
            console.log('gameNameInParticipantGameInfo :',userContactId, gameId, participantGameInfoId, ipAddress, browserName, device);
        }

        // This ensgame function works for the update participant gameInfo record like as end date time.
        function endGame(gameId, participantGameInfoId) {
            var endDateTime = new Date();
            var gamePlayStatus = "Completed";
            helper.participantGameInfoUpdate(component, event, helper, userContactId, gameId, endDateTime, gamePlayStatus, participantGameInfoId);//helper method calling here.
        }


        //this function works for initialize processing.
        function changeScreen() {

            gameId = component.get("v.myAttribute");
            userContactId = component.get("v.mycontactId");
            ipAddress = component.get("v.ipAddress");
            browserName = component.get("v.browser");

            participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.

            window.removeEventListener('keyup', gamePlay, false);
            window.addEventListener('keyup', gamePlay, false);

            timedata = new Date();
            document.getElementById("datablock_mst").innerHTML = configdata[currentScreent].content;
             //Changes for touch
            if(device=="PHONE"){
                document.getElementById("datablock_mst").removeEventListener('click',gotoNextScreen,false);     
                if(configdata[currentScreent].hasOwnProperty('isTouch')){
                    document.getElementById("datablock_mst").addEventListener('click',gotoNextScreen,false);
                }
            }

            if(configdata[currentScreent].hasOwnProperty('white')){
                document.getElementById("gameBox").classList.add("white");
             }else{
                 document.getElementById("gameBox").classList.remove("white");
             }



              //end changes for touch goto  function  gotoNextScreen

            errormsg = document.getElementById("resulttxt");
            if (typeof (errormsg) != 'undefined' && errormsg != null) { } else { errormsg = null; }

            imagedata = document.getElementById("imagedata");
            if (typeof (imagedata) != 'undefined' && imagedata != null) {
               clearTimeout(intervalImageTime);
                intervalImageTime = setTimeout(function () { if (imagedata != null) imagedata.remove(); }, 2000);

            } else { imagedata = null; }

            if (currentScreent > 0) {
                let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                let lastdata = lastdatatitle;
    

                if (lastdata.length <= 0 && isResult == true) {

                    //Result Data
                    resultData[configdata[currentScreent - 1].screen] = {
                        "duration": configdata[currentScreent - 1].endDuration,
                        "status": "false",
                        "data": inputdata,
                        "question": configdata[currentScreent - 1].question,
                        "isPractice": configdata[currentScreent - 1].isPractice,
                        "correctAnswer": configdata[currentScreent - 1].answer
                    };
                    lastdatatitle = "Result";

                    //Save Output Events
                    let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                    saveData(
                        "MST",
                        currentgamedata.question,
                        currentgamedata.data,
                        currentgamedata.status,
                        currentgamedata.duration,
                        currentgamedata.isPractice,
                        currentgamedata.correctAnswer
                    );

                    //Front Result Output Data Intigration time comment or Remove 3 lines
                    document.getElementById("d_title").innerHTML = "Result";
                    document.getElementById("d_txt").innerHTML = configdata[currentScreent - 1].endDuration + " ms";
                    document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                    setTimeout(clearResult, 1000);
                }
            }

            //Initial and end Game
            if (currentScreent == 6) {
                updateGameNameInParticipantGameInfo(gameId, participantGameInfoId, ipAddress, browserName, device);
                console.log('updateGameNameInParticipantGameInfo :',gameId, participantGameInfoId, ipAddress, browserName, device);
            }

            // end game function is updating the record of participant gameInfo like endDateTime.
            if ((configdata.length - 1) == currentScreent) {
                endGame(gameId, participantGameInfoId);
               clearTimeout(intervalTime);
                return false;
            }

            //Change New Screen Default
            if ((configdata.length - 1) > currentScreent) {
                if (configdata[currentScreent].endDuration != 0)
                    intervalTime = setTimeout(changeScreen, configdata[currentScreent].endDuration);

                currentScreent = currentScreent + 1;
            } else {
               clearTimeout(intervalTime);
            }
            inputdata = "";
        }

        //Event Control System
        //window.addEventListener('keyup', gamePlay, false);

        //Inisilize the page processing
        changeScreen();

        const delayprocess = ms => new Promise(res => setTimeout(res, ms));

        function gamePlay(e) {

            command_value = e.keyCode;
            inputdata = e.key;
            let startDurations = configdata[currentScreent - 1].startDuration;

            //Press spacific key command
            if (startDurations == -1) {
                if (configdata[currentScreent - 1].hasOwnProperty("command") && command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                   clearTimeout(intervalTime);
                    changeScreen();
                }
            } else if (startDurations == 0) {

            }
            //In between process to go executed
            else if (startDurations > 0) {

                let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                result_time = new Date() - timedata;

                //Block before click
                if (result_time < startDurations) return false;

                //Result Calculation
                if (isResult) {
                    if (!resultData.hasOwnProperty(configdata[currentScreent - 1].screen)) {
                        resultData[configdata[currentScreent - 1].screen] = {
                            "duration": "0",
                            "status": "false",
                            "data": "",
                            "question": configdata[currentScreent - 1].question,
                            "isPractice": configdata[currentScreent - 1].isPractice,
                            "correctAnswer": configdata[currentScreent - 1].answer
                        };
                    }
                }

                if (result_time >= startDurations) {

                    if (configdata[currentScreent - 1].hasOwnProperty("command")) {
                        //Command Value Match Data
                        if (
                            (configdata[currentScreent - 1].command.length == 2 && (command_value == configdata[currentScreent - 1].command[0] || command_value == configdata[currentScreent - 1].command[1])) ||
                            (configdata[currentScreent - 1].command.length == 3 && (command_value == configdata[currentScreent - 1].command[0] || command_value == configdata[currentScreent - 1].command[1] || command_value == configdata[currentScreent - 1].command[2]))
                        ) {

                            //Result Calculation
                            if (isResult) {

                                if (inputdata.toLowerCase() == configdata[currentScreent - 1].answer) {
                                    resultData[configdata[currentScreent - 1].screen]["status"] = "true";
                                } else {
                                    resultData[configdata[currentScreent - 1].screen]["status"] = "false";
                                }

                                // if (configdata[currentScreent - 1].isPractice == true) {
                                //     if (resultData[configdata[currentScreent - 1].screen]["status"] == "false") {
                                //         errormsg.innerHTML = "Incorrect Response. Please try again.";
                                //         blockKeyEvent();
                                //         return false;
                                //     } else {
                                //         errormsg.innerHTML = "Correct";
                                //         blockKeyEvent(1000);
                                //         // await delayprocess(1000);
                                //     }
                                // }

                                window.removeEventListener('keyup', gamePlay, false);

                                resultData[configdata[currentScreent - 1].screen]["data"] = inputdata;
                                resultData[configdata[currentScreent - 1].screen]["duration"] = result_time;
                                lastdatatitle = "Result";

                                //Save Output Events
                                let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                                saveData(
                                    "MST",
                                    currentgamedata.question,
                                    currentgamedata.data,
                                    currentgamedata.status,
                                    currentgamedata.duration,
                                    currentgamedata.isPractice,
                                    currentgamedata.correctAnswer
                                );

                                //Out put result Intigration time comment or Remove 3 lines
                                document.getElementById("d_title").innerHTML = "Result";
                                document.getElementById("d_txt").innerHTML = result_time + " ms";
                                document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                            }

                            //Clear Results
                          
                            if (isResult) {
                      
                                if( configdata[currentScreent - 1].isPractice){
                                    lastdatatitle="Result";
                                  //  setTimeout(clearResult,(screenWaitTime-result_time)+4);

                                }
                                else{
                                     //Reset Screent Interval
                                     setTimeout(clearResult, 1500);
                                    clearTimeout(intervalTime);
                                    //Next Screen Show
                                    changeScreen();
                                }
                            }
                            else{
                                 //Reset Screent Interval
                                 setTimeout(clearResult, 1500);
                                clearTimeout(intervalTime);
                                //Next Screen Show
                                changeScreen();
                            }
                           
                        //    if(configdata[currentScreent-1].isPractice==true){
                        //     setTimeout(function(){ changeScreen(); }, 1500);                      
                        //     }else{
                        //         changeScreen();
                        //     }
                           
                        }
                    }
                }
            }
        }

        function blockKeyEvent(bkey = 1500) {
           clearTimeout(blockevents);
            window.removeEventListener('keyup', gamePlay, false);
            blockevents = setTimeout(function () {
                errormsg.innerHTML = "";
                window.addEventListener('keyup', gamePlay, false);
            }, bkey);
        }

        function clearResult() {
            lastdatatitle = "";
            
            //Front Result Output Data Intigration time comment or Remove 3 lines
           // document.getElementById("d_title").innerHTML = "";
           // document.getElementById("d_txt").innerHTML = "";
           // document.getElementById("d_status").innerHTML = "";
        }

        //chnages for touch
        function gotoNextScreen(e){
            gamePlay({keyCode:32});
        }
         //chnages for touch end


    },

    // this function works for 'goto next page' when the game reach to the last question.
    // this function works for 'goto next page' when the game reach to the last question.
    goToNextPage: function (component, event, helper) {
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        const product = urlParams.get('c__id');
        // window.location.href = "/research/s/complete" + '?' + 'id=' + product;
        helper.allowLeaving();
        window.location.href = $A.get("$Label.c.Community_Url")+"/s/"+ $A.get("$Label.c.url_dashboard");
    },
    goToMyResultsPage: function (component, event, helper) {
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        const product = urlParams.get('c__id');
        // window.location.href = "/research/s/complete" + '?' + 'id=' + product;
        helper.allowLeaving();
        window.location.href = $A.get("$Label.c.Community_Url") + "/s/"+ $A.get("$Label.c.url_myresults");
    }


})