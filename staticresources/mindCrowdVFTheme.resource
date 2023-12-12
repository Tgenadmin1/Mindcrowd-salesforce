@font-face {
    font-family: 'whitneylight';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local("whitney light"), local("whitney-light"), url("/s/sfsites/c/resource/mindcrowd_style/fonts/whitney-light.otf") format("opentype");


}

@font-face {
    font-family: 'Whitneybook';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local("Whitney book"), local("whitney-book"), url("/s/sfsites/c/resource/mindcrowd_style/fonts/whitney-book.otf") format("opentype");


}

@font-face {
    font-family: 'flaticon';
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    src: url('/s/sfsites/c/resource/flaticon/flaticon.woff') format('woff'),
        url('/s/sfsites/c/resource/flaticon/flaticon.ttf') format('truetype'),
        url('/s/sfsites/c/resource/flaticon/flaticon.svg#flaticon') format('svg'),
        url('/s/sfsites/c/resource/flaticon/flaticon.eot'),
        /* url('/s/sfsites/c/resource/flaticon/flaticon.woff2') format('woff2'), */
        url('/s/sfsites/c/resource/flaticon/flaticon.eot?#iefix') format('embedded-opentype');
}

@font-face {
    font-family: 'entypo-fontello';
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    src: local("entypo-fontello"), local("entypo-fontello"),
        url('/s/sfsites/c/resource/entypofontello/entypo-fontello.woff2') format('woff2'),
        url('/s/sfsites/c/resource/entypofontello/entypo-fontello.woff') format('woff'),
        url('/s/sfsites/c/resource/entypofontello/entypo-fontello.ttf') format('truetype'),
        url('/s/sfsites/c/resource/entypofontello/entypo-fontello.svg#entypo-fontello') format('svg'),
        url('/s/sfsites/c/resource/entypofontello/entypo-fontello.eot'),
        url('/s/sfsites/c/resource/entypofontello/entypo-fontello.eot?#iefix') format('embedded-opentype');
}

html {
    scroll-behavior: smooth;
    background-color: #fff;
}

body {
    font-size: 18px;
    font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
    font-weight: 400;
    line-height: 29.7px;
    color: #000;
    background-color: #fff;
    hyphens: none;
    word-break: break-word;
    padding-top: 117px;
    padding-bottom: 0;
    margin: 0;

}
h1, h2, h3, h4, h5, h6, p, ol, ul, dl, fieldset {
    margin: 0;
    padding: 0;
}
*, *:before, *:after {
    box-sizing: border-box;
}
.logo-container img {
    width: 100%;
    height: 100%;
}
a, button {
    cursor: pointer;
}
p {
    margin: 0.85em 0;
}
div {
    display: block;
}
h1, h2, h3, h4, h5, h6 {
    display: block;
}
h1 {
    color: #163248;
    font-family: 'Varela Round', Helvetica, Arial, sans-serif;
    font-weight: normal; 
    text-transform: none;
    font-size: 45px;
    line-height: 49.5px;
    }
    h2 {
    color: #6a6797;
    font-family: 'whitneybook', Helvetica, Arial, sans-serif;
    font-weight: normal; 
    font-size: 40px;
    text-transform: none;
    line-height: normal;
    }
    h3 {
    color: #163248;
    line-height: 1.3em;
    font-family: 'whitneylight', Helvetica, Arial, sans-serif;
    font-weight: 300;
    font-size: 20px;
    text-transform: uppercase;
    }
.header_container {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
}

.mc-header {
    height: 70px;
    display: block;
    justify-content: center;
    background-color: #163248;
    width: 100%;
}

.mc-header-container {
    width: 83%;
    max-width: 100%;
    margin: auto;
}

.logo-container {
    width: 205px;
    margin-top: 14px;
    float: left;
}

.top-banner-button {
    float: right;
    color: #fff;
    margin-top: 26px;
    padding-right: 0;
}

.navStrip {
    height: 46px;
    justify-content: center;
    background-color: #1e4766;
    transition: all 190ms linear;
    border-top: 1px #1e4766 solid;
    width: 100%;
    clear: both;
}

.navStrip .navItem {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    width: 83%;
    margin: auto;
    height: 46px;
    position: relative;
}

.navStrip .navItem li {
    text-align: left;
    margin: 0;
    display: flex;
}

.navStrip .navItem li a {
    color: #ffffff;
    display: block;
    padding: 0 10px;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 15px;
    margin: auto;
    transition: all 150ms linear;
}

.navStrip .navItem li a:hover {
    opacity: 0.7;
}

.login-btn {
    background: #6a6797;
    color: #fff;
    border: none;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1px 30px !important;
    border-radius: 3px;
    font-size: 18px !important;
}

.pink-btn {
    padding: 15px 30px 15px;
    font-size: 18px;
    min-width: 139px;
    background-color: #ea526e;
    border-color: #ea526e;
    color: #ffffff;
    text-transform: uppercase;
    /* font-family: Whitney; */
    font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
    font-weight: 400;
    line-height: 1.2em;
    position: relative;
    text-align: center;
    max-width: 100%;
    font-style: normal;
    border-radius: 7px;
    text-decoration: none;
    transition: all 150ms linear;
}

.pink-btn:hover {
    background-color: #cf445e;
    ;
    text-decoration: none;
    color: #ffffff;
}

.nav-right-buttons {
    position: absolute;
    right: 0;
    top: 6px;
    display: flex;
    text-align: left;
}

.pull-right {
    float: right;
}

.home_section1 {
    max-width: 980px;
    justify-content: center;
    margin: auto;
    display: block;
    padding-top: 5%;
    padding-bottom: 5%;
    width: 50%;
    text-align: center;
}

h1 {
    color: #163248;
    font-family: 'Varela Round', Helvetica, Arial, sans-serif;
    font-weight: normal;
    text-transform: none;
    font-size: 45px;
    line-height: 49.5px;
}
.h-top-text {
    color: #000000;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.3;
    text-align: center;
    display: inline-block;
    
}
.h-top-heading {
    text-align: center;
    font-weight: 400;
    margin-top: 24px;
    text-transform: uppercase;
    color: #163248;
    font-family: 'Varela Round', Helvetica, Arial, sans-serif;
    font-size: 45px;
    line-height: 49.5px;
    display: inline-block;
}
.h-top-text3 {
    font-size: 25px;
    color: #6a6797;
    text-align: center;
    line-height: 27px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 3%;
    padding-top: 3%;
}

.marginT2p {
    margin-top: 2%;
}
.d-inlineBlock{
    display: inline-block;
}
.text-center{
    text-align: center;
}
.privacy-link {
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 30px;
    padding-top: 5px;
}
.m-img{display: none;}

.home_section2 {
    justify-content: center;
    margin: auto;
    display: block;
    background: #1E4766;
    color: #fff;
    padding-top: 80px;
    padding-bottom: 80px;
    text-align: center;
}
.home_section2-content {
    width: 50%;
    justify-content: center;
    margin: auto;
}
.blue-box-heading1 {
    font-size: 25px !important;
    font-weight: 400 !important;
}
.home_section2 p {
    font-size: 22px;
}
.home_section4 {
    background: #1E4766;
    color: #fff;
    text-align: center;
    padding-top: 75px;
    padding-bottom: 75px;
}
.content {
    width: 83%;
    justify-content: center;
    margin: auto;
    display: block;
    text-align: left;
    padding: 0 50px;
}
.home_section4 h2 {
    color: #fff;
    text-transform: uppercase;
}




.home_section3 {
    width: 83%;
    justify-content: center;
    margin: auto;
    display: block;
    color: #fff;
    padding: 75px 50px;
    text-align: center;
}
.home_progress {
    background-color: #163248;
    color: #fff;
    padding: 30px 20px 30px 20px;
    text-align: center;
    border-radius: 20px;
    font-size: 25px;
}
.progress_wrapper {
    background-color: #f7f7ff;
    height: 30px;
    border-radius: 18px;
    position: relative;
    margin: 10px 0px 50px;
    display: flex;
}
.progress_wrapper .progress_bar {
    background-color: #6a6797;
    min-width: 24px;
    height: 22px;
    border-radius: 12px;
    max-width: 96.5%;
    margin: 4px 0 0 5px;
}
.home_progress .progress_wrapper .progress_bar span {
    background: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/tiny_people.png) no-repeat right;
    width: 21px;
    height: 18px;
    float: right;
    margin-right: -24px;
    background-size: cover;
}
.progress_wrapper .progress_count {
    color: #fff;
    font-size: 14px;
    left: 2.5%;
    padding-top: 0px;
    position: absolute;
    top: 36px;
    max-width: 12px;
    position: relative;
    margin-top: 2px;
    margin-left: -22px;
    overflow: visible;
    justify-content: center;
    display: flex;
    word-break: normal;
    text-transform: lowercase;
}
.progress_wrapper .progress_count:after {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(18, 35, 62, 0);
    border-bottom-color: #fff;
    border-width: 7px;
    margin-left: -9px;
}

.progress_wrapper .progress_count.right {
    right: 9px;
    position: absolute;
    left: auto;
    top: -11px;
    transform: rotate(180deg);
}
.progress_wrapper .progress_count:after {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(18, 35, 62, 0);
    border-bottom-color: #fff;
    border-width: 7px;
    margin-left: -9px;
}
.progress_wrapper .total-progress {
    right: 1px;
    position: absolute;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    top: -37px;
}
.home_progress .homepage-text {
    font-size: 22px;
}
.home_progress .social_icons {
    color: #1f5784;
    /* overflow: hidden; */
    /* padding: 0px 15px 0px 20px; */
    padding:0px 0 0 0;
}
.slider.social_icons.footer-s-icon {
    max-width: 400px;
    margin: auto;
}
.home_section3 .social_icons ul {
    list-style: none;
    overflow: hidden;
    padding: 0px 0px 0px 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 0;
}


.home-grid-col-1 {
    min-height: 250px;
    vertical-align: top;
    padding: 3% 5% 3% 5% !important;
    background-color: #1e4766;
    text-align: center;
    color: #fff;
    width: 33.3333%;
}
.home-grid-col-2 {
    min-height: 250px;
    vertical-align: top;
    padding: 3% 5% 3% 5% !important;
    background-color: #435880;
    text-align: center;
    color: #fff;
    width: 33.3333%;
}
.home-grid-col-3 {
    min-height: 250px;
    vertical-align: top;
    padding: 3% 5% 3% 5% !important;
    background-color: #6a6797;
    text-align: center;
    color: #fff;
    width: 33.3333%;
}

.avia-button.avia-color-light {
    color: #fff;
    border: 3px solid #fff;
    background: transparent;
    border-radius: 7px;
    min-width: 90px;
    padding: 5px 16px 5px;
    display: inline-block;
    text-decoration: none;
}
.avia-button.avia-color-light:hover {
    opacity: 0.7;
}


.avia-font-flaticon, html body [data-av_iconfont='flaticon']:before, .av-icon {
    font-family: 'flaticon';
}
.av-icon {
    font-size: 40px;
    line-height: 40px;
}
.home_section5 h3 {
    color: #fff;
    
}
.home_section5 p {
    padding-bottom: 10px;
}
.home_promo.slds-grid {
    display: block;
}
.home_promo {
    margin: 0 auto;
    position: relative;
    width: 83%;
    padding: 0 50px 50px 50px

}
.banner-col-left {
    margin-top: 75px;
}
.bannder-text1 {
    color: #000000;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 15px;
}
.home-h2 {
    color: #163248;
    font-family: 'whitneybook', Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 50px;
    text-transform: uppercase;
    line-height: normal;
}
.home_promo_n {
    font-size: 28px;
    color: #6a6797;
}
.homepage-right-col {
    padding: 40px 0 0 8px;
    text-align: right;
}
.slds-size_1-of-2, .slds-size--1-of-2 {
    width: 50%;
}

.av-icon2, .av-icon2::before {
    font-family: 'entypo-fontello';
    font-size: 40px;
    line-height: 40px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: normal;
    content: attr(data-av_icon);
}

.social_icons li {
    float: left;
    padding: 0 5px;
    margin-left:0;
}
.social_icons.footer-s-icon .social_bookmarks_facebook {
    background-color: #4267B2;
    flex-basis: calc(33% - 4px);
    padding: 0;
    margin-left: 0 !important;
}
.slider.social_icons.footer-s-icon li {
    margin-left: 10px;
}
.social_icons.footer-s-icon a {
    display: block;
    padding-top: 10px;
    padding-bottom: 10px;
    text-decoration: none;
}
.social_icons.footer-s-icon a, .social_icons.footer-s-icon i {
    font-size: 26px;
    color: #fff;
}
[data-av_icon]:before {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: normal;
    content: attr(data-av_icon);
}
.avia-font-entypo-fontello, [data-av_iconfont='entypo-fontello']:before {
    font-family: 'entypo-fontello';
}
.social_icons.footer-s-icon a, .social_icons.footer-s-icon i {
    font-size: 26px;
    color: #fff;
}
.avia_hidden_link_text {
    display: none;
}
.social_icons.footer-s-icon .social_bookmarks_twitter {
    background-color: #1DA1F2;
    flex-basis: calc(33% - 4px);
    margin-left: 5px;
    padding: 0;
}
.social_icons.footer-s-icon .social_bookmarks_pinterest {
    background-color: #E60023;
    flex-basis: calc(33% - 4px);
    margin-left: 5px;
    padding: 0;
}
.social_icons.footer-s-icon .social_bookmarks_linkedin {
    background-color: #127bb6;
    flex-basis: calc(33% - 4px);
    margin-left: 5px;
    padding: 0;
}
.social_icons.footer-s-icon .social_bookmarks_mail {
    background-color: #404040;
    flex-basis: calc(33% - 4px);
    margin-left: 5px;
    padding: 0;
}
.social_icons.footer-s-icon li:hover {
    filter: saturate(1.5) brightness(1.2);
}



.slds-docked-form-footer {
    position: unset;
    box-shadow: none;
    padding-top: 0;
    z-index: 0;
}
.footer_wrapper {
    background-color: #163248;
    color: #fff;
    padding-top: 24px;
}
.copyright {
    background-color: #1e4766;
    font-size: 13px;
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
}
.copyright-content {
    max-width: 83%;
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding: 0px 50px;
    clear: both;
    color: #fff;
}
.copyright-content .social_icons {
    float: right;
    padding: 0;
    
}
.copyright .social_icons {
    float: right;
}
.copyright-content a {
    color: #fff;
    -webkit-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
    text-decoration: none;
}
.copyright .social_icons {
    float: right;
    padding: 0;
}
.copyright .social_icons ul{
    margin: 0;
}
.copyright-content a {
    color: #fff;
    -webkit-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
}
.copyright-content i {
    color: #fff;
}
.copyright-content .social_icons a {
    width: 30px;
    line-height: 30px;
    display: block;
    margin: 0px;
    outline: none;
    padding: 0;
    min-height: 30px;
    height: 100%;
    overflow: visible;
    z-index: 2;
    position: relative;
    text-align: center;
    border-radius: 300px;
    text-decoration: none;
}

ol, ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.copyright-content .social_bookmarks_twitter a:hover {
    color: #fff;
    background-color: #46d4fe;
}
.copyright-content .social_bookmarks_facebook a:hover {
    color: #fff;
    background-color: #37589b;
}
.copyright-content .social_bookmarks_pinterest a:hover {
    color: #fff;
    background-color: #cb2027;
}
.copyright-content .social_bookmarks_youtube a:hover {
    color: #fff;
    background-color: #a72b1d;
}
.copyright-content .social_icons .social_bookmarks_rss a:hover {
    color: #fff;
    background-color: #ffa133;
}
.fa, .fas, .far, .fal, .fad, .fab {
    line-height: unset;
}
.slds-docked-form-footer {
    position: unset;
    box-shadow: none;
    z-index: 0;
    padding: 0.5rem 0;

}
.footer_wrapper {
    background-color: #163248;
    color: #fff;
    padding-top: 24px;
}
.footer_wrapper footer {
    color: #fff;
    margin: 0 auto;
    overflow: hidden;
    width: 83%;
    max-width: 1310px;
    padding: 34px 50px;

}
footer h3 {
    color: #fff;
    border-top: 1px #fff solid;
    border-bottom: 1px #fff solid;
    padding-top: 5px;
    padding-bottom: 5px;
    display: inherit;
}
.slds-grid {
    display: flex;
}
.slds-gutters {
    margin-left: 0;
    margin-right: 0;
}
.av_one_fourth {
    padding-left: 0 !important;
    padding-right: 0 !important;
}
.av_one_fourth {
    margin-left: 6%;
    /* width: 20.5%; */
    width: 29.5%;
}

.footer-s-icon {
    font-size: 42px;
}

.essb-fc-grid {
    display: flex;
    transition: .15s all;
    box-sizing: border-box;
    flex-wrap: wrap;
}
.essb-social-followers-variables {
    --essb-sf-color-instagram: #3f729b;
    --essb-sf-color-facebook: #3B5998;
    --essb-sf-color-twitter: #4099FF;
    --essb-sf-color-pinterest: #cb2027;
    --essb-sf-color-linkedin: #007bb6;
    --essb-sf-color-github: #171515;
    --essb-sf-color-vimeo: #1ab7ea;
    --essb-sf-color-dribbble: #ea4c89;
    --essb-sf-color-envato: #82b540;
    --essb-sf-color-soundcloud: #ff7700;
    --essb-sf-color-behance: #005cff;
    --essb-sf-color-mailchimp: #2c9ab7;
    --essb-sf-color-delicious: #205cc0;
    --essb-sf-color-youtube: #CD332D;
    --essb-sf-color-vk: #45668e;
    --essb-sf-color-rss: #FF6600;
    --essb-sf-color-tumblr: #32506d;
    --essb-sf-color-slideshare: #e98325;
    --essb-sf-color-500px: #02adea;
    --essb-sf-color-flickr: #FF0084;
    --essb-sf-color-wp_posts: #c2685f;
    --essb-sf-color-wp_comments: #b8c25f;
    --essb-sf-color-wp_users: #5fa7c2;
    --essb-sf-color-steamcommunity: #000000;
    --essb-sf-color-weheartit: #ff679d;
    --essb-sf-color-feedly: #02bb24;
    --essb-sf-color-love: #ED1C24;
    --essb-sf-color-mailpoet: #F14176;
    --essb-sf-color-spotify: #84bd00;
    --essb-sf-color-twitch: #6441a5;
    --essb-sf-color-mailerlite: #00a154;
    --essb-sf-color-itunes: #ff573d;
    --essb-sf-color-deviantart: #05cc47;
    --essb-sf-color-paypal: #0070ba;
    --essb-sf-color-whatsapp: #1D9E11;
    --essb-sf-color-tripadvisor: #00a680;
    --essb-sf-color-snapchat: #FFFC00;
    --essb-sf-color-telegram: #0088cc;
    --essb-sf-color-subscribe: #2c9ab7;
    --essb-sf-color-xing: #135a5b;
    --essb-sf-color-medium: #12100e;
    --essb-sf-color-patreon: #fc573b;
    --essb-sf-color-mixer: #212c3d;
    --essb-sf-color-tiktok: #12100e;
    --essb-sf-color-ok: #F4731C;
    --essb-sf-color-subscribe_form: #f47555;
    --essb-sf-color-periscope: #40a4c4;
    --essb-sf-color-foursquare: #25a0ca;
    --essb-sf-followers-fixed-width: 80px;
}
.social_icons.footer-s-icon .social_bookmarks_facebook {
    background-color: #4267B2;
    flex-basis: calc(33% - 4px);
    padding: 0;
}
.social_icons.footer-s-icon a {
    display: block;
    padding-top: 10px;
    padding-bottom: 10px;
}
.social_icons.footer-s-icon a, .social_icons.footer-s-icon i {
    font-size: 26px;
    color: #fff;
}
.avia_hidden_link_text {
    display: none;
}
.social_icons.footer-s-icon .social_bookmarks_twitter {
    background-color: #1DA1F2;
    flex-basis: calc(33% - 4px);
    margin-left: 5px;
    padding: 0;
}
.social_icons.footer-s-icon .social_bookmarks_pinterest {
    background-color: #E60023;
    flex-basis: calc(33% - 4px);
    margin-left: 5px;
    padding: 0;
}


.home_section4-col1 {
    position: relative;
}

.home_section4 .home_section4-col1 {
    padding-left: 0 !important;
    max-width: 66%;
}
.home_section4-col2 {
    position: relative;
    width: 34%;
}
.main-img {
    position: relative;
}
.video-box {
    display: block;
    position: relative;
}
.player {
    width: 100%;
    position: relative;
    border: 0;
}
.fade-in {
    /* transition: all 5s; */
    animation: imageAnimation 1s;
}
.video-overlay {
    position: absolute;
    width: 100%;
    /* height: 100%; */
    top: 0;
    /* bottom: 0; */
    left: 0;
    right: 0;
    cursor: pointer;
}

.gall-thumb-img img, .main-img img {
    -webkit-box-shadow: 0px 0px 15px 0px rgb(0 0 0 / 40%);
    box-shadow: 0px 0px 15px 0px rgb(0 0 0 / 40%);
}
.desktop-text1 {
    font-weight: 400;
    position: absolute;
    bottom: -6px;
    padding-left: 20px;
    text-align: left;
    font-size: 22px;
    color: #fff;
}
.desktop-text1 {
    overflow: auto;
}

.img-text p, .name-blow-text span, .img-text span {
    line-height: 1.5;
}
.home_section4 {
    background: #1E4766;
    color: #fff !important;
    text-align: center;
    padding-top: 75px;
    padding-bottom: 75px;
}
.gall-thumb-img img, .main-img img {
    width: 100%;
    height: auto;
}

.gall-thumb-img.marginT20 {
    margin-top: 25px;
}
.gall-thumb-img .slds-col {
    padding-left: 12px;
    padding-right: 12px;
    cursor: pointer;
    transition: all 190ms linear;
    animation: mMenuAnimtion 5s;
}
.gall-thumb-img .slds-col:hover {
    opacity: 0.7;
    transition: all 190ms linear;
    animation: mMenuAnimtion 5s;
}

.gall-button {
    bottom: 0;
    left: 20px;
    position: relative;
}
.opacity {
    opacity: 0;
}
.img-text p, .name-blow-text span, .img-text span {
    line-height: normal;
}
.name-blow-text {
    font-size: 14px;
    display: block;
    line-height: 20px !important;

}
.upperCase {
    text-transform: uppercase !important;
}
.text1 p{
    line-height: 1.5;
}





body, td{
    font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
}




table{
    border-spacing: 0px;
    border-collapse: collapse;

}
.marginB0 {
    margin-bottom: 0 !important;
}
.paddingB0 {
    padding-bottom: 0px !important;
}

.possition-r {
    position: relative;
}
.slds-hide {
    display: none!important;
}
.marginL0 {
    margin-left: 0 !important;
}
.padding0 {
    padding: 0 !important;
}
.paddingL0 {
    padding-left: 0 !important;
}
.paddingR0 {
    padding-right: 0 !important;
}
.marginT20 {
    margin-top: 20px;
}
.marginT10 {
    margin-top: 10px;
}
.marginT30 {
    margin-top: 30px;
}
.marginL30 {
    margin-left: 30px;
}
img {
    max-width: 100%;
    height: auto;
}
.mobile-table {
    display: none;
}
.m-menu-btn {
    display: none;
}
.m-button{
    display: none !important;
}

.cookies-content {
    display: flex;
    width: 83%;
    margin: auto;
    padding: 1.1em;
    text-align: center;
    justify-content: center;
    position: relative;
    z-index: 99999;
}
.c-cookie-consent {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 99;
    background-color: #163248;
    color: #ffffff;
    font-size: 15px;
    font-weight: 300;
    left: 0;
}
.m-setting-bInfo-button .slds-required{
    position: absolute; 
    left:1px;
    max-width: 33%;
    top: 0;
}
@media (max-width: 1024px), (max-width: 1229px){
.content {
    padding: 0;
}
.home_section1, .home_section2-content {
    width: 75%;
}
.home_section3 {
    padding: 31px 0px;
}
.home_section4 .home_section4-col1 {
    width: 55%;
}
.home_section4 .home_section4-col2 {
    width: 45%;
}
/* .home_promo {
    padding: 0 0px 50px 0px !important;
} */
.footer_wrapper footer {
    padding: 34px 0px;
}
.gall-button {
    top: 12px;
}
    
}



@media (max-width: 768px), (max-width: 900px){
    .cookies-content {
        display: block;
    }
    .cookies-content .pink-btn {
        margin-left: 0;
    }
    .logo-container {
        float: left;
        margin-bottom: 14px;
        max-width: 80%;
        width: auto;
        height: auto;
    }
    .m-menu-btn {
        display: block;
        float: right;
        margin: 18px 0px 0px 0;
        background: none;
        border: 0 !important;
        
        
    }
    
    .m-button{
        margin-bottom: 20px !important;
        display: flex !important;
    }
    .nav-right-buttons{
        margin-top: 20px !important;
    }
    .m-menu-btn .slds-icon, .m-menu-btn .slds-button__icon {
        width: 40px;
        height: 40px;
        fill: #fff;
    }
    .m-hide {
        display: none;
    }
    .mc-header {
        z-index: 5;
        position: relative;
        height: auto;
        display: inline-block;
        /* padding-top: 60px; */
    }
    .navStrip {
        height: 100vh;
        width: 100%;
        transition: all 190ms linear;
        position: fixed;
        animation: mMenuAnimtion 1s;
        overflow: auto;
        top: 0;
        padding-top: 110px;
    }
    .top-nav-strip {
        width: 85%;
        display: block;
    }
    .navStrip .navItem{
        display: inline;
    }

    .navStrip .navItem li a {
        font-size: 20px;
        padding: 10px 0px;
        white-space: normal;
    }
    .pink-btn, .pink-btn-box .slds-button {
        padding: 15px 30px 13px !important;
        font-size: 18px !important;
     }

    .d-button {
        display: none;
    }
    .nav-right-buttons {
    position: unset;
    display: block;
    width: 100%;
    float: left;
   
}
.nav-right-buttons .login-btn{
    margin-top: 15px;
    padding: 15px 50px 13px !important;
    font-size: 18px !important;
    min-width: 139px;
    line-height: 1.2em;
    height: auto;
    border-radius: 7px;
}



.home_section1, .home_section2-content, .home_section3, .home_section4 .content {
    width: 85%;
    max-width: 85%;
    padding-left: 0;
    padding-right: 0;
}
    .d-img{display: none;}
    .m-img{    display: inline-block;}
    /* .home_section3 .social_icons ul {
        display: inline-block;
    }
    .slider.social_icons.footer-s-icon li {
        margin-left: 0px;
    } */
    .home_progress .social_icons li {
        width: 29%;
        margin-bottom: 10px;
        display: inline-block;
        float: none;
    }
    
    .home_promo {
        width: 85%;
        padding: 40px 0;
    }
    .home_promo .home-col {
        display: block;
    }
    .home_promo .home-col .slds-col {
        width: 100%;
        padding-left: 0;
    }
    .homepage-right-col {
        text-align: center;
        padding: 10px 0 0 8px ;
    }
    .banner-col-left {
        margin-top: auto;
    }
    .home_section5, .home_section5 .slds-gutters, .footer_wrapper, .footer_wrapper .slds-gutters {
        display: inline-block;
    }
    .home_section5 .slds-gutters .slds-col {
        width: 100%;
        height: auto;
        overflow: hidden;
        padding-left: 8% !important;
        padding-right: 8% !important;
        display: inline-block;
    }
    .footer_wrapper footer {
        width: 85%;
        max-width: 85%;
        margin: 0 auto;
        padding-left: 0;
        padding-right: 0;
    }
    .footer_wrapper .slds-gutters .slds-col {
        width: 100%;
        height: auto;
        margin: 0;
        padding-bottom: 80px !important;
        padding-left: 0;
        padding-right: 0;
    }
    .copyright {
        position: unset;
        text-align: center;
        margin: 0px 0;
    }    
    .copyright-content {
        width: 85%;
        max-width: 85%;
        padding: 0;
    }
    .copyright .social_icons {
        width: 100%;
        justify-content: center;
        display: flex;
    }
    .h-top-heading {
        font-size: 30px;
        line-height: 40.5px;
    }
    .h-top-text3 {
        padding-left: 0;
        padding-right: 0;
    }
    .marginT2p {
        margin-top: 16px;
    }
    .home_progress .social_icons li {
        width: 29%;
        margin-bottom: 10px;
        display: inline-block;
        float: none;
    }
    .home_progress .social_icons {
        padding: 0;
    }
    
    .desktop-table {
        display: none;
    }
    .mobile-table {
        display: block;
    }
    .home_section4 .home_section4-col1 {
        width: 100%;
        max-width: 100%;
        padding-left: 0;
        padding-right: 0;
    }
    .mobile-table .gall-thumb-img.marginT10 {
        margin-top: 20px;
    }
    .gall-thumb-img .slds-col {
        padding-left: 5px;
        padding-right: 5px;
    }
    .desktop-text1 {
        position: relative;
        padding-left: 0;
        bottom: 0;
        line-height: normal;
    }
    .gall-button {
        position: relative;
        left: auto;
        margin-top: 24px;
        display: inline-block;

    }
    
}

@media (max-width: 768px){
.home_section3 .social_icons ul {
    display: inline-block;
}
.slider.social_icons.footer-s-icon li {
    margin-left: 0px;
}

}


.fade-in{
    /* transition: all 5s ; */
    animation: imageAnimation 1s ;
}
@keyframes mMenuAnimtion {
    from   {left:-300px; opacity: 0;}
    to {left:0px; opacity: 1;}
  }
  @keyframes imageAnimation {
    from   {opacity: 0;}
    to { opacity: 1;}
  }
@keyframes highlight {
from   { opacity: 0;}
to {opacity: 1;}
}