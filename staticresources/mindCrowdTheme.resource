/* @font-face {
        font-family: 'Whitney';
        font-style: normal;
        font-weight: 100;
        src: local("Whitney"), local("Whitney"), url("/sfsites/c/resource/mindcrowd_style/fonts/whitney.ttf") format("opentype");
      } */
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
        /* color: #fff; */
        padding-top: 110px;
        font-size: 18px;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 400;
        line-height: 29.7px;
        color: #000;
        background-color: #fff;
        hyphens: none;
    
        word-break: break-word;
    
    }
    
    a:hover,
    a:focus {
        text-decoration: none;
        color: unset;
    }
    
    
    .comm-page-custom-mindcrowd-pairedgame {
        padding-top: 108px;
    }
    
    .siteforceCptBody,
    .siteforceCptBody .siteforceContentArea,
    .contentRegion {
        background-image: none;
        background-color: transparent;
    }
    
    .siteforceCptBody .siteforceContentArea.siteforceSldsOneColLayout .contentRegion,
    .siteforceCptBody .siteforceContentArea.siteforceSldsTwoCol84Layout>div.slds-grid.slds-wrap {
        background-image: none;
        background-color: transparent;
        padding-bottom: 0;
    }
    
    .cHeaderWrapper {
        display: none;
    }
    
    .mc-header {
        height: 70px;
        display: flex;
        justify-content: center;
        background-color: #163248;
    
    }
    
    .mc-header-container {
        width: 83%;
        max-width: 100%;
    }
    
    .comm-page-home .mc-header-container {
        width: 83%;
        max-width: 100%;
        color: #b3b3b3;
    }
    
    .padding0 {
        padding: 0 !important;
    }
    
    .logo-container {
        float: left;
    
    }
    
    .slds-builder-header {
        height: 46px;
        display: flex;
        justify-content: center;
        background-color: #1e4766;
        transition: all 190ms linear;
        border-top: 1px #1e4766 solid;
    
    }
    
    .top-nav-strip {
        width: 83%;
        position: relative;
        /* margin-left: 5px; */
    
    }
    
    .slds-builder-header__utilities {
        margin-left: 0;
    }
    
    .slds-builder-header__nav-item,
    .slds-builder-header__utilities-item {
        margin-top: 7px;
        margin-bottom: 4px;
    }
    
    .top-nav-strip .slds-builder-header__utilities-item {
    
        border-left: 0px solid #fdfddf;
    }
    
    .top-nav-strip .slds-builder-header__utilities-item:last-child {
    
        border-right: 0px solid #fdfddf !important;
    }
    
    .top-nav-strip .slds-builder-header__utilities-item:first-child {
    
        border: 0px solid #fdfddf !important;
    }
    
    .slds-builder-header__item-action,
    .slds-builder-header__item-label {
        color: #ffffff;
        display: block;
        padding: 0 10px;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 15px;
    
    }
    
    .slds-builder-header__utilities-item:first-child .top-nav-btn {
        padding-left: 0 !important;
    }
    
    .slds-builder-header__item-action:hover,
    .slds-builder-header__item-action:focus {
        opacity: 0.7;
        text-decoration: none;
        background-color: transparent;
    }
    
    .slds-builder-header__item-action:hover,
    .slds-builder-header__item-label:hover {
        opacity: 0.7;
        background-color: transparent;
    }
    
    .cHeaderWrapper {
        display: none;
    }
    
    .top-banner-button {
        float: right;
        color: #fff;
        margin-top: 9px;
        padding-right: 0;
    }
    
    .marginT2p {
        margin-top: 2%;
    }
    
    .nav-right-buttons {
        position: absolute;
        right: 0;
        top: 6px;
        display: flex;
        text-align: left;
    }
    
    .nav-right-buttons .top-nav-l-combo {
        width: 110px;
        margin-right: 16px;
    }
    
    .nav-right-buttons .top-nav-l-combo .slds-icon {
        fill: #fff;
    }
    
    .nav-right-buttons [role=combobox] input[readonly],
    .nav-right-buttons input[readonly][role=combobox] {
        background: linear-gradient(to bottom, #041424 0%, #052c47 100%);
        color: #fff;
        height: 31px !important;
    
    }
    
    .user-login-button .slds-button {
        background-color: #6a6797;
        color: #fff;
        border-radius: 7px;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 500;
        padding-top: 1px;
        border: none;
    }
    
    .user-login-button .slds-button:hover {
        background-color: #565383;
    }
    
    .nav-right-buttons .login-button .slds-button,
    .login-a-button {
        background: #6a6797;
        color: #fff;
        border: none;
        height: 32px;
        text-transform: uppercase;
    
    
    }
    
    .nav-right-buttons .login-button .slds-button:hover,
    .login-a-button:hover {
        opacity: 0.8;
        transition: ease-in-out;
    }
    
    .nav-right-buttons [data-region-name*="languageSection"] {
        width: 95px;
        margin-right: 5px;
    }
    
    .nav-right-buttons [data-region-name*="languageSection"] .slds-input__icon-group svg {
        fill: #fff;
    }
    
    .nav-right-buttons [data-region-name*="languageSection"] input.slds-input {
        text-align: left;
        padding-left: 10px;
    }
    
    .slds-builder-header__item-action:focus {
        background-color: transparent !important;
    }
    
    .slds-gutters {
        margin-left: 0;
        margin-right: 0;
    }
    
    .comm-page-custom-mindcrowdlogin,
    .comm-page-custom-forgot-password {
        padding-top: 110px;
    }
    
    .comm-page-custom-mindcrowd-crossgame {
        padding-top: 110px;
    }
    
    .comm-page-custom-mindcrowdlogin .cCenterPanel,
    .comm-page-custom-mindcrowd-crossgame .cCenterPanel,
    .comm-page-custom-forgot-password .cCenterPanel {
        max-width: 1011px !important;
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
    
    .font50 {
        font-size: 50px;
        line-height: 1.4em;
    }
    
    .font36 {
        font-size: 36px;
    
    }
    
    .pink-btn-box.slds-align_absolute-center .slds-button {
        justify-content: center;
        margin: auto;
        display: flex;
    }
    
    .pink-btn,
    .pink-btn-box .slds-button {
        padding: 15px 30px 13px;
        font-size: 18px;
        min-width: 139px;
        background-color: #ea526e;
        border-color: #ea526e;
        color: #ffffff;
        text-transform: uppercase;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 400;
        line-height: 1.2em;
        position: relative;
        text-align: center;
        max-width: 100%;
        font-style: normal;
        border-radius: 7px;
    }
    
    .pink-btn:hover,
    .pink-btn-box .slds-button:hover {
        background: #cf445e;
        color: #f7f7ff;
    }
    
    /* .pink-btn-box.big .slds-button{
                padding: 10px 30px;
                margin-top: 0;
            } */
    
    .privacy-link {
        font-size: 14px;
        margin-top: 10px;
        margin-bottom: 30px;
        padding-top: 5px;
    }
    
    .privacy-link a {
        text-decoration: underline;
    
    }
    
    /* h1, h2, h3, h4, h5, h6{
            font-family: 'Whitney';
        }
        h1 {
            color: #1e4463;
            font-size: 60px;
            font-weight: 100;
            line-height: 50px;
            padding-bottom: 12px;
        }
        h3 {
            color: #dd5e96;
            font-size: 40px;
            font-weight: 100;
            line-height: 40px;
            padding-bottom: 10px;
        }
        h5 {
            color: #fff;
        
            font-size: 21px;
            font-weight: normal;
            padding-bottom: 25px;
            text-align: justify;
        } */
    .home_section1 {
        max-width: 980px;
        justify-content: center;
        margin: auto;
        display: block;
        padding-top: 7%;
        padding-bottom: 5%;
        width: 50%;
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
    }
    
    .home_section2 p {
        font-size: 22px;
    
    }
    
    .blue-box-heading1 {
        font-size: 25px !important;
        font-weight: 400 !important;
    }
    
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
    
    .home_section4-col1 {
        position: relative;
    }
    
    .home_section4-col2 {
        position: relative;
        width: 34%;
    }
    
    .home_section4 .home_section4-col1 {
        padding-left: 0 !important;
        max-width: 66%;
    }
    
    .desktop-text1 {
        font-weight: 400;
        position: absolute;
        bottom: -6px;
        padding-left: 20px;
        text-align: left;
        font-size: 22px;
    }
    
    .margintT41 {
        margin-top: 58px;
    }
    
    .right-col-text {
        position: absolute;
        bottom: 0;
    
    }
    
    .right-col-text p {
        padding-bottom: 10px;
        line-height: normal;
    }
    
    .thumb-img-box ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    .thumb-img-box ul li {
        margin: 0;
        padding: 0;
        list-style: none;
        float: left;
        /* flex: 0 0 25%; */
        cursor: pointer;
        padding-right: 15px;
        max-width: 25.02%;
        max-height: 100px;
    }
    
    .thumb-img-box ul li:hover {
        opacity: 0.7;
    }
    
    .thumb-img-box ul li:last-child {
        padding-right: 0;
    }
    
    .name-blow-text {
        font-size: 14px;
        display: block;
        line-height: 20px !important;
        margin-top: -3px;
    }
    
    .main-img {
        position: relative;
    }
    
    .main-img img {
        width: 100%;
    }
    
    /* .img-text{
            position: absolute;
            right: 0%;
            bottom: -7px;
            
        } */
    
    .fade-in {
        animation: imageAnimation 1s;
    }
    
    .flex_cell_inner {
        display: block;
        position: relative;
    }
    
    .avia-video .mejs-poster,
    .avia-video {
        background-position: center center;
        background-size: cover;
    }
    
    .video-box {
        display: block;
        position: relative;
    
    }
    
    .opacity {
        opacity: 0;
    }
    
    .video-overlay {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        cursor: pointer;
    
    }
    
    /* .home_section2 p{
           line-height: 38px;
        } */
    .home_section3 {
        width: 83%;
        justify-content: center;
        margin: auto;
        display: block;
        color: #fff;
        padding: 75px 50px;
        text-align: center;
    
    }
    
    .radio-button-group-brainee,
    .biological-sex-radioGroup {
        width: 100%;
    }
    
    .radio-button-group-brainee fieldset,
    .biological-sex-radioGroup fieldset {
        display: flex;
        width: 100%;
    }
    
    .radio-button-group-brainee fieldset,
    .biological-sex-radioGroup fieldset {
        font-weight: 400;
    }
    
    .radio-button-group-brainee fieldset .slds-checkbox {
        float: left;
        min-width: 48.333%
    }
    
    .biological-sex-radioGroup fieldset .slds-radio {
        float: left;
    
    }
    
    .medicalConditionsChange fieldset {
        display: contents;
    }
    
    .medicalConditionsChange1 fieldset {
        display: contents;
    }
    
    .input.input {
        font-size: 20px;
        font-weight: 200;
    }
    
    .uiInput--input.input:focus,
    .uiInput--input .input:focus,
    .uiInput--input.input:active,
    .uiInput--input .input:active {
        border-color: #6a6797;
    }
    
    .slds-builder-header__nav-item,
    .slds-builder-header__utilities-item {
        float: left;
    }
    
    /* .comm-page-custom-gamepoc{
       
            height: 100vh;
            margin: 0;
            padding: 0;
        } */
    /* .graph-singel, */
    
    
    .scoreBasedCaption {
        /* position: relative; */
        /* top: -16px; */
        left: 0;
        text-align: center;
        right: 0;
        /* margin-bottom: -48px; */
    
        line-height: normal;
        font-size: 22px;
    
    }
    
    .graph-double {
        top: 21px;
        position: relative;
    }
    
    
    .speed-m-chart-box .slds-wrap {
        align-items: baseline;
    }
    
    .scoreBasedCaption.title2b {
        font-size: 22px;
        font-weight: 600;
        margin-top: 20px;
    
        /* top: -66px; */
    }
    
    /* .graph-singel .scoreBasedCaption{
            top:-15px;
          } */
    .graph-singel .scoreBasedCaption.title2b {
        margin-top: 6px;
        font-size: 25px;
    }
    
    .graph-singel .scoreBasedCaption.title2c {
        /* top:-10px; */
        position: unset;
        margin-top: 20px;
        padding: 0 50px;
    }
    
    .Share-Facebook-btn {
        background-color: #4267B2;
        color: #fff;
        padding: 10px 15px;
        font-size: 18px;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 400;
        line-height: 1.2em;
        border-radius: 7px;
    }
    
    .Share-Twitter-btn {
        background-color: #1DA1F2;
        color: #fff;
        padding: 10px 15px;
        font-size: 18px;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 400;
        line-height: 1.2em;
        border-radius: 7px;
    
    }
    
    .Share-Twitter-btn:hover {
        background-color: #1DA1F2 !important;
        filter: saturate(1.5) brightness(1.2);
    
    }
    
    .Share-Facebook-btn:hover {
        background-color: #4267B2 !important;
        filter: saturate(1.5) brightness(1.2);
    
    }
    
    /* .comm-page-custom-myresults .speed-m-chart-box {
                padding-bottom: 95px ;
            } */
    .mainCrowd-outer-box {
        text-align: left;
        min-width: 100%;
        margin: auto;
        margin-top: 0;
        margin-bottom: 0;
        display: inline-block;
        position: relative;
        /* font-size: 16px; */
        text-decoration: none;
        vertical-align: middle;
        z-index: 0;
        /* background-color: rgba(255, 255, 255, 0.3);
            border: 2px #A28662 solid; */
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;
        padding: 20px 0 0;
    }
    
    .comm-page-home .mainCrowd-outer-box {
        width: 83%;
        margin: auto;
        padding-left: 50px;
        padding-right: 50px;
        max-width: 1310px;
        min-width: auto;
        display: flex;
        margin-top: 20px;
        margin-bottom: 30px;
    }
    
    /* .mainCrowd-inner-box{
            background-color: rgba(197, 179, 150, 0.3);
            border: 2px #C5B396 solid;
            border-radius: 7px;
            padding: 30px 40px;
            position: relative;
        } */
    
    .mainCrowd-inner-box {
        background-color: #f7f7ff;
        border: 1px #6a6797 solid;
        border-radius: 7px;
        padding: 70px 80px;
        position: relative;
    }
    
    .inner_content p,
    .brainInfo p {
        color: #000000;
        /* font-family: 'Whitney', Helvetica, Arial, sans-serif;  */
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        text-transform: none;
        font-size: 20px;
        font-weight: 400;
        margin: 0 0 20px 0;
    }
    
    /* h1 > p.title, .modal-title {  */
    div>p.title,
    .modal-title {
    
        color: #163248;
        font-family: 'Varela Round', Helvetica, Arial, sans-serif;
        font-weight: normal;
        text-transform: uppercase;
        font-size: 33px;
        line-height: 38.5px;
        margin: 0;
    }
    
    .subtitle {
        color: #000000;
        /* font-family:'Whitney', Helvetica, Arial, sans-serif;  */
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        /* font-family: Whitney;  */
        /* text-transform: capitalize;  */
        font-size: 25px;
        /* font-weight: 300;  */
        line-height: 38.5px;
    }
    
    .blue-list-box {
        text-align: left;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: normal;
        /* font-size: 20px !important; */
    }
    
    .blue-list-box li {
        text-align: left;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: normal;
    
    }
    
    body[class*="comm-page-detail"] .contentRegion {
        /* max-width: 83%;
            width: 83%; */
        margin: 0 auto;
        /* margin-top: -32px; */
        padding: 0;
    }
    
    .mainCrowd-inner-box label {
        color: #5a5a5a;
        font-size: 16px;
    
    }
    
    .mainCrowd-inner-box label {
        color: #5a5a5a;
        font-size: 16px;
    
    }
    
    .mainCrowd-inner-box .slds-form-element {
        padding-bottom: 15px;
        margin-bottom: 15px;
        margin-top: 5px;
        border-bottom: 1px solid #6a6797;
        /* // margin-bottom: 15px; */
    }
    
    .mainCrowd-inner-box .slds-form-element .slds-form-element {
        padding-bottom: 0;
        margin-bottom: 0;
        margin-top: 0;
        border-bottom: 0;
        /* // margin-bottom: 15px; */
    }
    
    .brainInfo.round-one .slds-form-element .slds-form-element__control {
        width: 100%;
    }
    
    /* .bottomB{
            border-bottom: 1px solid #d1bba0;
            margin-bottom: 15px;
        } */
    
    
    /* ------------------scroll bar ------------------ */
    
    /* width */
    /* ::-webkit-scrollbar {
            width: 20px;
          } */
    
    /* Track */
    /* ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey; 
            border-radius: 10px;
          } */
    
    /* Handle */
    /* ::-webkit-scrollbar-thumb {
            background: red; 
            border-radius: 10px;
          } */
    
    /* Handle on hover */
    /* ::-webkit-scrollbar-thumb:hover {
            background: #b30000; 
          } */
    
    
    
    /* ----------------home page ----------- */
    
    .comm-page-home .cCenterPanel {
        width: 100% !important;
        max-width: 100% !important;
        padding-bottom: 0;
        margin-bottom: 0;
    }
    
    .home_promo_n {
        font-size: 28px;
        color: #6a6797;
    }
    
    /* .home_promo{
            color: #404040;
            font-size: 14px;
        } */
    .home_section5 h3 {
        color: #fff;
    }
    
    .home_section5 p {
        padding-bottom: 10px;
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
    
    .home_promo.slds-grid {
        display: block;
    }
    
    .comm-page-home .home_promo {
        margin: 0 auto;
        padding-bottom: 125px;
        position: relative;
        width: 980px;
    }
    
    .avia-button.avia-color-light {
        color: #fff;
        border: 3px solid #fff;
        background: transparent;
        border-radius: 7px;
        min-width: 90px;
        padding: 5px 16px 5px;
        display: inline-block;
    
    
    }
    
    .avia-button.avia-color-light:hover {
        opacity: 0.7;
    }
    
    .comm-page-home .cCenterPanel .contentRegion {
        padding-left: 0px !important;
        padding-right: 0px !important;
    }
    
    .home_promo_sponsors ul {
        list-style: none;
        overflow: hidden;
        padding: 5px 0px 10px 5px;
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 16px;
    }
    
    .home_promo_sponsors li {
        /* border-left: 1px solid #c5bfa4; */
        margin: auto;
        justify-content: center;
    }
    
    /* .home_promo_sponsors li:first-child {
            border: none;
            margin-left: 0;
        }
        .home_promo_sponsors li:last-child {
            border: none;
            margin-right: 0;
        } */
    .home_promo_sponsors li img {
        height: 60px;
        width: auto;
    }
    
    .comm-page-home .cCenterPanel .button {
        /* margin-top: -21px; */
        margin-left: 3px;
    }
    
    .btn {
        /* box-shadow: inset 0px 1px 0px 0px #ffffff;
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #c54f7f), color-stop(1, #8c2755));
            background: -moz-linear-gradient(center top, #c54f7f 5%, #8c2755 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#C54F7F', endColorstr='#8C2755');
            background-color: #C54F7F; */
        background-color: #ea526e;
        border: 1px solid #ea526e;
        border-radius: 6px;
        display: inline-block;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        text-decoration: none;
        text-align: center;
        padding: 5px 10px;
        text-transform: uppercase;
    }
    
    .btn--tertiary {
        background: #1e4463;
        /* background: -moz-linear-gradient(top, #052c47 0%, #041424 100%);
            background: -webkit-linear-gradient(top, #052c47 0%, #041424 100%);
            background: linear-gradient(to bottom, #052c47 0%, #041424 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#052c47', endColorstr='#041424', GradientType=0); */
        /* -webkit-box-shadow: inset 0px 0px 2px 0px #6d7b86;
            -moz-box-shadow: inset 0px 0px 2px 0px #6d7b86;
            box-shadow: inset 0px 0px 2px 0px #6d7b86; */
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border: 3px solid #b6a670;
        text-align: left;
        color: #fff;
        border-radius: 10px;
        position: relative;
        padding-right: 17px
    }
    
    .btn__test-time {
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 1;
    }
    
    .btn__test-time-left {
        /* border-right: 1px solid black; */
        display: inline-block;
        margin-right: 10px;
        padding-right: 10px;
        position: relative;
        vertical-align: middle;
    }
    
    .btn__fine-print {
        display: block;
        font-size: 20px;
        font-weight: 200;
        text-transform: none;
    }
    
    .btn__test-time-right {
        display: inline-block;
        padding-left: 30px;
        position: relative;
        vertical-align: middle;
        text-align: center;
    }
    
    .homepage-right-col .btn__test-time-icon {
        margin-top: -17px;
        position: absolute;
        top: 52%;
        left: -1px;
    
    }
    
    .homepage-right-col .btn__test-time-icon .slds-icon {
        fill: #F2EACA;
        width: 29px;
        height: 29px;
    }
    
    .time__number,
    .time__units {
        /* font-family: RockwellStd-Light, serif; */
        font-weight: 100;
    }
    
    .time__number {
        line-height: 1;
        font-size: 25px;
        text-transform: none;
    }
    
    .time__units {
        display: block;
        font-size: 12px;
        margin-top: -3px;
    }
    
    .btn--tertiary:hover,
    .btn--tertiary:focus {
        /* background: #041424;
            background: -moz-linear-gradient(top, #041424 0%, #052c47 100%);
            background: -webkit-linear-gradient(top, #041424 0%, #052c47 100%);
            background: linear-gradient(to bottom, #041424 0%, #052c47 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#041424', endColorstr='#052c47', GradientType=0); */
        background: #183953;
        color: #fff;
    }
    
    .h-top-text {
        /* color: #000000;
            text-transform: uppercase;
            font-weight: 400;
            font-size: 15px;
            text-align: center; */
        color: #000000;
        text-transform: uppercase;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.3;
        text-align: center;
    }
    
    .homepage-right-col {
        padding: 40px 0 0 8px !important;
        text-align: right;
    }
    
    .comm-page-custom-faq .homepage-right-col {
        padding: 27px 0 0 8px !important;
    }
    
    .home_progress i:hover,
    .footer-s-icon i:hover {
        filter: saturate(1.5) brightness(1.2);
    }
    
    /* .home_promo h3 {
            color: #1e4463;
            font-size: 22px;
            font-weight: 500;
            padding: 0px 0 0px 0px;
        }
        .home_promo h3 {
            padding-bottom: 10px;
        }
        .home_promo h3 .home_alzheimer {
            font-size: 50px;
            font-weight: 700;
        }
        .home_promo h3 .home_research {
            font-size: 108px;
            line-height: 35px;
     
            margin-top: 25px;
            font-weight: 700;
        }
        .home_promo h3 p {
            color: #1e4463;
        } */
    
    .home_promo .home_p {
        color: #dd5e96;
        font-size: 29px;
        line-height: 29px;
        margin-top: 30px;
        font-style: italic;
    }
    
    .home_promo .home_p2 {
        font-size: 27px;
        width: 95%;
        padding-bottom: 15px;
        color: #1e4463;
    }
    
    .banner-left-btn {
        margin-top: 24px;
        margin-bottom: 24px;
    }
    
    .home_progress {
        background-color: #163248;
        color: #fff;
    
        padding: 30px 20px 30px 20px;
        text-align: center;
        border-radius: 20px;
        font-size: 25px;
    
    }
    
    .home_progress h4 {
        color: #1e4463;
        font-size: 22px;
        margin: 9px 0 0 20px;
        padding-right: 31px;
        text-align: initial;
        font-weight: 500;
        padding-bottom: 0;
        text-align: center;
    }
    
    /* .home_progress h4 {
            padding-top: 10px;
            background: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/progress_1M.png) no-repeat right;
        } */
    .home_section3 .social_icons ul {
        list-style: none;
        overflow: hidden;
        padding: 5 px 0 px 10 px 5 px;
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 16 px;
    }
    
    .progress_wrapper {
        /* background-color: #6a6797; */
        background-color: #f7f7ff;
        height: 30px;
        /* box-shadow: inset 0px 1px 1px 0px rgb(50 50 50 / 75%); */
        /* border: 1px solid #999376; */
        border-radius: 18px;
        position: relative;
        margin: 10px 0px 50px;
        display: flex;
    
    }
    
    .bannder-text1 {
        color: #000000;
        text-transform: uppercase;
        font-weight: 400;
        font-size: 15px;
    }
    
    .progress_wrapper .progress_bar {
    
        background-color: #6a6797;
        /* background-image: repeating-linear-gradient(to bottom right, #103352 0%, #1b3c5b 25%, #103352 50%); */
        min-width: 24px;
        height: 22px;
        border-radius: 12px;
        max-width: 96.5%;
        margin: 4px 0 0 5px;
    }
    
    .pink-link {
        color: #ea526e;
        text-decoration: underline;
        /* font-size: 15px; */
        font-weight: 400;
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
        /* background: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/progress_arrow.png) no-repeat 50% 0; */
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
    
    .progress_wrapper .progress_count.right {
        right: 9px;
        position: absolute;
        left: auto;
        top: -11px;
        transform: rotate(180deg);
    }
    
    .progress_wrapper .total-progress {
        right: 1px;
        position: absolute;
        color: #fff;
        font-size: 15px;
        font-weight: 600;
        top: -37px;
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
    
    .home_progress .social_icons {
        padding: 3px 30px 0px 0px;
    }
    
    .home_progress .social_icons {
        color: #1f5784;
        /* float: right; */
        overflow: hidden;
        padding: 0px 15px 0px 20px;
    }
    
    .social_icons h5 {
        color: #1f5784;
        display: block;
        float: left;
        font-size: 14px;
        font-weight: 400;
        margin: 2px 5px 0 0;
        padding-bottom: 0;
    }
    
    .social_icons li {
        float: left;
        padding: 0 5px;
    }
    
    .social_icons li img {
        width: 40px;
    }
    
    .social_icons .slds-icon-standard-email-chatter {
        background-color: #404040;
    
        border-radius: 0;
    }
    
    .social_icons .slds-icon-standard-email-chatter .slds-icon {
        width: 40px;
        height: 40px;
    }
    
    .go_arrow {
        cursor: pointer;
        margin: 30px auto 0;
        width: 48px;
        height: 48px;
        background-color: #dd5e96;
        border-radius: 50%;
    }
    
    .go_arrow .slds-icon {
        fill: #fff;
        margin-top: 11px;
    
    
    }
    
    .go_arrow-box {
        display: flex;
        justify-content: center;
        text-align: center;
    
    }
    
    /* ------------------------faq----------------------- */
    
    .comm-page-custom-faq,
    .comm-page-custom-info-faq {
        padding-top: 159px;
    }
    
    .comm-page-custom-faq .mc-header-container,
    .comm-page-custom-info-faq.mc-header-container {
        /* max-width: 980px;
            width: 980px; */
        /* font-family: Rockwell; */
        width: 83%;
        color: #b3b3b3;
    }
    
    .comm-page-custom-faq .home_promo {
        padding-bottom: 50px;
    }
    
    .comm-page-custom-faq .cCenterPanel,
    .comm-page-custom-info-faq .cCenterPanel {
        margin: 0 auto;
        position: relative;
        width: 980px;
    }
    
    .comm-page-custom-faq .contentRegion,
    .comm-page-custom-info-faq .contentRegion {
        padding: 0 !important;
    }
    
    .comm-page-custom-faq .cCenterPanel .button {
        margin-top: -21px;
        margin-left: 3px;
    }
    
    .faq_asked_text {
        /* color: #1e4463 !important;
            font-size: 40px !important; */
        /* font-family: "Rockwell" !important; */
        /* font-weight: 100; */
        padding-top: 20px;
    }
    
    .faq_que_text {
        /* color: #1e4463 !important;
            font-size: 100px !important; */
        /* font-family: "Rockwell" !important; */
        /* font-weight: bold; */
        padding-bottom: 40px !important;
    }
    
    .faq_sec h2 {
        color: #dd5e96;
        /* font-family: Arial, Helvetica;
            font-size: 26px; */
        font-weight: 700;
        line-height: 29px;
        padding-bottom: 0;
    }
    
    .faq_sec h2 {
        line-height: 20px !important;
        padding-bottom: 0;
        ;
    }
    
    .faq_sec .que {
        color: #6a6797 !important;
        font-size: 18px !important;
    }
    
    .faq_sec .ans {
        color: #000 !important;
        font-weight: normal;
        padding-bottom: 10px;
        padding-top: 10px;
        font-size: 18px !important;
    }
    
    .comm-page-custom-faq .home_promo_sponsors li:first-child {
        margin-left: 0;
    }
    
    .position-fixed {
        position: fixed;
    }
    
    .pointerEvent-none {
        pointer-events: none;
    }
    
    /* ----------------- The Problem -------------- */
    /* h2 {
            color: #dd5e96;
            font-family: 'whitney';
            font-size: 52px;
            font-weight: 100;
            line-height: 40px;
            padding-bottom: 44px;
        } */
    /* h4 {
            color: #e8e0c0;
            font-family: 'whitney';
            font-size: 24px;
            font-weight: 100;
            padding-bottom: 30px;
            text-align: justify;
            line-height: 30px;
        } */
    .marginL0 {
        margin-left: 0 !important;
    }
    
    .marginR0 {
        margin-right: 0;
    }
    
    .marginT0 {
        margin-top: 0 !important;
    }
    
    .the-problem {
        /* background: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/section-bg.png) repeat-x 0 0; */
        padding-top: 56px;
        position: relative;
        background-color: #12233e;
    
    }
    
    .team {
        background: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/section-bg.png) repeat-x 0 0;
        padding-top: 56px;
        position: relative;
    
    }
    
    .the-problem-bg,
    .project-bg,
    .team-bg {
        /* background: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/the-problem-bg.png) repeat 0 0; */
        width: 100%;
        padding-bottom: 100px;
        background-color: #12233e;
    }
    
    .the-problem-layout,
    .project-layout,
    .team-layout {
        margin: 0 auto;
        padding-bottom: 177px;
        position: relative;
        width: 980px;
        display: block;
    }
    
    .the-problem-layout .left-content {
        padding: 129px 24px 0 20px;
    }
    
    .project .content {
        padding: 129px 0 0 20px;
    }
    
    .the-problem-right-col {
        padding: 0 0 0 22px !important;
    }
    
    .the-problem h4,
    .project h4 {
        font-size: 29px;
        padding-bottom: 10px;
    }
    
    .project h4 {
        padding-bottom: 30px;
    
    }
    
    .the-problem .sub_heading,
    .project .sub_heading {
        color: #fff;
        /* font-family: 'Rockwell'; */
        font-size: 72px;
        font-weight: bold;
        padding-bottom: 20px;
    }
    
    .bottom {
        border-top: 1px solid #707070;
        clear: both;
        margin-left: 20px;
        overflow: hidden;
        padding: 30px 0 0 0;
        position: relative;
        z-index: 2;
    }
    
    .line {
        position: absolute;
    }
    
    .the-problem .line {
        background: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/line1.png) no-repeat 0 0;
        height: 352px;
        left: 483px;
        top: -176px;
        width: 194px;
    }
    
    .project .line {
        background: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/line2.png) no-repeat 0 0;
        height: 662px;
        left: 327px;
        top: -538px;
        width: 619px;
    }
    
    .sidebar {
        color: #929292;
        float: left;
        /* font-family: 'Rockwell'; */
        font-size: 16px;
        /* padding: 99px 0px 0; */
        padding: 40px 0px 90px;
        text-align: center;
        width: 285px;
    }
    
    .the-problem .left-content p {
        line-height: normal;
        text-align: justify;
    }
    
    .the-problem p {
        padding-bottom: 10px;
    }
    
    .bottom {
        border-top: 1px solid #707070;
        clear: both;
        margin-left: 20px;
        overflow: hidden;
        padding: 30px 0 10px 0;
        position: relative;
        z-index: 2;
    
    }
    
    .bottom_content {
        float: left;
        overflow: hidden;
        /* width: 820px; */
        text-align: justify;
        display: flex;
    }
    
    .bottom .button {
        padding: 10px 0 0 25px;
    }
    
    .the-problem .button {
        margin-top: 0px !important;
        margin-left: 3px;
    }
    
    .pull-left {
        float: left;
    }
    
    .siteforceContentArea .comm-layout-column .ui-widget:not(:last-child),
    .siteforceContentArea .cb-section_column .ui-widget:not(:last-child) {
        margin-bottom: -2px;
    }
    
    
    /* -------------------- The Opportunity --------------- */
    .opportunity,
    .project {
        background: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/section-bg.png) repeat-x 0 0;
        padding-top: 56px;
        position: relative;
    
    }
    
    .opportunity-line {
        background: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/line2.png) no-repeat 0 0;
        height: 642px;
        left: 315px;
        top: -530px;
        width: 500px;
        position: absolute;
    }
    
    h4 strong {
        color: #dd5e96;
        font-size: 40px;
        font-weight: 100;
    }
    
    /* ---------------------- The project ---------------- */
    .project-bg {
        padding-bottom: 68px;
    }
    
    .sidebar.full_width {
        border-top: 1px solid #505050;
        float: none;
        margin: 15px 0 0 20px;
        padding: 20px 0 0 0;
        text-align: left;
        width: auto;
    }
    
    h5 {
        color: #fff;
    
        font-size: 21px;
        font-weight: 100;
        padding-bottom: 25px;
        text-align: justify;
    }
    
    .sidebar .callout {
        color: #fff;
        /* float: left; */
    
        font-size: 18px;
        line-height: 21px;
        /* padding-left: 45px; */
        /* width: 455px; */
        text-align: justify;
        font-weight: 200;
    }
    
    .sidebar .callout p strong {
        color: #dd5e96;
        font-weight: normal;
    }
    
    .sidebar .callout img,
    .bottom .callout img {
        margin: 0 0px 60px 0;
    }
    
    .paddingR0 {
        padding-right: 0 !important;
    }
    
    .marginR15 {
        margin-right: 15px;
    }
    
    /* ---------------- The Team --------------- */
    
    .team .content {
        padding: 129px 0 0 20px;
    }
    
    .team .sub_heading {
        color: #fff;
        /* font-family: 'Rockwell'; */
        font-size: 72px;
        font-weight: bold;
        padding-bottom: 20px;
    }
    
    .team .bottom {
        margin-left: 0;
    }
    
    .bottom .callout_content {
        line-height: 21px;
        padding: 20px 5px 0;
    
    }
    
    .bottom .callout {
        color: #fff;
        font-family: Arial, Helvetica;
        font-size: 16px;
        line-height: 21px;
        text-align: justify;
    }
    
    .bottom .callout h4 {
        color: #dd5e96;
        /* font-family: 'RockwellStd'; */
        font-size: 23px;
        line-height: normal;
        padding-bottom: 5px;
    }
    
    .bottom .borderT {
        border-top: 1px solid #686868;
        padding: 20px 0px 0;
    }
    
    .team .line {
        background: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/line4.png) no-repeat 0 0;
        height: 396px;
        left: 240px;
        top: -290px;
        width: 16px;
    }
    
    .borderB {
        border-bottom: 1px solid #707070;
    }
    
    .bottom_sidebar {
    
        text-align: center;
    
    }
    
    .bottom_sidebar .be_part_of_the {
        /* font-family: Rockwell; */
        font-size: 26px;
        font-weight: 200;
        letter-spacing: 2px;
        padding-bottom: 0px !important;
        color: #eee6c6;
    }
    
    .bottom_sidebar .solution {
        /* font-family: Rockwell; */
        font-size: 46px;
        font-weight: bold;
        letter-spacing: 2px;
        color: #dd5e96;
    }
    
    .bottom_sidebar .callout_logo--tgen {
        max-height: 60px;
    }
    
    .bottom_sidebar p {
        padding-bottom: 25px;
    }
    
    .team-layout {
        border-bottom: 1px solid #686868;
        padding-bottom: 25px;
    }
    
    /* ----------------- login page ------------- */
    
    
    .comm-page-login-home,
    .comm-page-forgot-password,
    .comm-page-login-error {
        padding-top: 129px;
    }
    
    .salesforceIdentityLoginBody2 .cHeaderPanel {
        z-index: 99;
    }
    
    .comm-page-custom-mindcrowdlogin .cCenterPanel .siteforceSldsOneColLayout,
    .comm-page-custom-mindcrowdlogin .cCenterPanel .contentRegion {
        background-color: transparent !important;
    }
    
    .salesforceIdentityLoginBody2 {
        position: unset;
        display: block;
    }
    
    .salesforceIdentityLoginBody2 .cFooterPanel {
        position: unset;
    }
    
    .salesforceIdentityLoginBody2 .cCenterPanel .siteforceContentArea,
    /* .comm-page-login-home .mainContentArea, */
    .comm-page-forgot-password .mainContentArea,
    .comm-page-check-password .mainContentArea,
    /* .comm-page-custom-vipaccess  .mainContentArea, */
    .comm-page-custom-passwordrecovery .mainContentArea,
    .comm-page-custom-checkpasswordrecoveryemail .mainContentArea {
        position: relative;
        background-color: #f7f7ff;
        border: 1px #6a6797 solid;
        border-radius: 7px;
        padding: 70px 80px;
    
    
    }
    
    .login-box {
        text-align: left;
        /* min-width: 774px; */
        max-width: 775px;
        margin: auto;
        margin-top: 0;
        margin-bottom: 0;
        display: inline-block;
        position: relative;
    
        text-decoration: none;
        vertical-align: middle;
        z-index: 0;
        margin: 50px auto;
        justify-content: center;
        display: inherit;
    
    }
    
    .login-form {
        position: relative;
        background-color: #fff;
        border: 2px #6a6797 solid;
        border-radius: 10px;
        padding: 50px 80px;
    
    
    }
    
    /* .login-form h1 > p.title{
            font-size: 24px;
        } */
    .login-text {
        font-size: 22px;
    }
    
    .mainContentArea {
        width: 83%;
        margin: auto;
        padding-left: 50px;
        padding-right: 50px;
        max-width: 1310px;
    }
    
    .comm-page-home .mainContentArea {
        width: 100%;
        margin: auto;
        padding-left: 0 !important;
        padding-right: 0 !important;
        max-width: 100%;
    }
    
    .comm-page-custom-results .mainContentArea {
        width: 83%;
        margin: auto;
        padding-left: 0px;
        padding-right: 0px;
        max-width: 1310px;
    }
    
    .salesforceIdentityLoginBody2 .cCenterPanel,
    .comm-page-login-home .mainContentArea,
    .comm-page-forgot-password .mainContentArea,
    .comm-page-check-password .mainContentArea,
    /* .comm-page-custom-vipaccess .mainContentArea, */
    .comm-page-custom-passwordrecovery .mainContentArea,
    .comm-page-custom-checkpasswordrecoveryemail .mainContentArea {
        text-align: left;
        min-width: 680px;
        max-width: 90vh;
        margin: auto;
        margin-top: 0;
        margin-bottom: 0;
        display: inline-block;
        position: relative;
    
        text-decoration: none;
        vertical-align: middle;
        /* z-index: 0; */
        margin: 50px auto;
        justify-content: center;
        display: inherit;
    
    }
    
    .comm-page-custom-vipaccess-passwordrecovery {
        padding-top: 90px;
    }
    
    
    
    .login-page-outer-div {
        background-color: rgba(255, 255, 255, 0.3);
        border: 2px #A28662 solid;
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;
        padding: 120px 80px 60px 80px;
    
    }
    
    .login-page-inner-div {
        background-color: rgba(197, 179, 150, 0.3);
        border: 2px #C5B396 solid;
        border-radius: 7px;
        padding: 40px;
        position: relative;
    }
    
    .login-page-inner-div .slds-form-element {
        display: flex;
        margin-bottom: 20px;
    }
    
    .login-page-inner-div .slds-form-element .slds-form-element__label {
        font-size: 18px;
        min-width: 100px;
        margin-top: 4px;
    }
    
    .login-page-inner-div .slds-form-element .slds-input {
        border-color: #6a6797;
        font-size: 20px;
        height: 40px;
        color: #000;
    
    }
    
    [role=combobox] input[readonly],
    input[readonly][role=combobox] {
        cursor: pointer;
    }
    
    .login-page-inner-div .title,
    .comm-page-login-home .title,
    .comm-page-forgot-password .title {
        font-size: 42px;
        color: #1e4463;
        margin-bottom: 16px;
        /* font-family: 'Rockwell'; */
    
    }
    
    .comm-page-forgot-password .title {
        text-align: center;
    
    }
    
    .salesforceIdentityForgotPassword2 .forceCommunityRichText {
        color: #1e4361;
        display: block;
        float: left;
        font-size: 16px;
        width: 150px;
        font-family: 'Open Sans';
    }
    
    .login-img {
        position: absolute;
        right: 24px;
        top: -107px;
    }
    
    .pull-right {
        float: right;
    }
    
    .salesforceIdentityLoginForm2 .inputContainer,
    .salesforceIdentityForgotPassword2 .inputContainer {
        padding: 0;
        border-radius: 5px;
        position: relative;
        /* margin-left: 100px; */
    }
    
    /* .salesforceIdentityLoginForm2 .inputContainer#sfdc_username_container::before,
        .salesforceIdentityForgotPassword2 .inputContainer::before{
            content: 'Username:';
            position: absolute;
            width: 100px;
            height: 40px;
            color: #12233e;
            left: -100px;
            top: 6px;
            font-size: 20px;
            font-weight: 500;
        }
        .salesforceIdentityLoginForm2 .inputContainer#sfdc_password_container::before{
            content: 'Password:';
            position: absolute;
            width: 100px;
            height: 40px;
            color: #12233e;
            left: -100px;
            top: 6px;
            font-size: 20px;
            font-weight: 500;
        } */
    .salesforceIdentityLoginForm2 .inputBox,
    .salesforceIdentityForgotPassword2 .inputBox,
    .salesforceIdentityForgotPassword2 .inputBox {
        margin-left: 0;
        margin-top: 0px;
        border: 1px solid #6a6797;
        width: 100%;
        -webkit-appearance: none;
        font-size: 20px;
        padding: 1px 2px 2px 34px;
        line-height: normal;
        min-height: 40px;
        background-color: #fff;
    
    }
    
    .forceCommunityRichText h1 {
        font-size: 45px;
        margin-bottom: 30px;
    
    }
    
    .salesforceIdentityLoginForm2 .inputIcon {
        position: absolute;
        top: 11px;
        z-index: 45;
        left: 10px;
    }
    
    .salesforceIdentityForgotPassword2 .inputIcon {
        position: absolute;
        top: 8px;
        z-index: 45;
        left: 10px;
    }
    
    .salesforceIdentityLoginForm2 .uiButton,
    .salesforceIdentityForgotPassword2 .uiButton {
        float: right;
        width: auto;
        /* padding-top: 6px !important;
            padding-bottom: 6px !important; */
        padding: 15px 30px 13px;
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
        border-radius: 3px;
    
    }
    
    .salesforceIdentityLoginForm2 .inverseTextColor {
        color: #12233e;
        position: relative;
        top: 10px;
        /* left: 100px; */
        font-size: 18px;
        text-decoration: underline;
    }
    
    .salesforceIdentityLoginForm2 button.uiButton:focus {
        background-color: #ea526e;
    }
    
    
    /* ---------------- notification--------------- */
    .comm-page-custom-notifications .mainCrowd-outer-box {
        padding-bottom: 0;
    }
    
    .comm-page-custom-notifications .mainCrowd-inner-box {
        padding: 30px 20px;
    }
    
    .notification-row {
        border-bottom: 1px #C5B396 solid;
        margin-bottom: 10px;
        position: relative;
        /* display: flex; */
        padding-bottom: 5px;
        color: #12233e;
        transition: all 190ms linear;
    }
    
    .notification-row:hover {
        border-bottom: 1px #12233e solid;
        transition: all 190ms linear;
    }
    
    .notification-row .bell-icon {
        /* position: absolute; */
        left: 0;
        top: 6px;
        width: 24px;
        height: 24px;
        margin: 5px 10px;
    }
    
    .notification-row .message {
        font-weight: 200;
    }
    
    .notification-row .bell-icon .slds-icon {
        fill: #d34c86;
        width: 24px;
        height: 24px;
    }
    
    .notification-row .notication-date {
        /* position: absolute;
            right: 0;
            top: 0px; */
        font-weight: 900;
        font-size: 11px;
        color: #949494;
        margin-top: 10px;
    }
    
    .unsNotificationsCounter .countDot {
        background-color: #d34c86;
    
    }
    
    input[type=text] {
        word-break: normal;
    
    }
    
    .unsNotificationsCounter .counterLabel {
        color: #fff;
        width: auto;
        height: auto;
        padding: 4px
    }
    
    .right-profile-menu .slds-button {
    
        background: linear-gradient(to bottom, #bcb69b 0%, #c9c3a8 41%, #c9c3a8 52%, #787258 100%);
        font-size: 24px;
        padding: 2px 10px 2px 10px;
        box-shadow: inset 0px 0px 2px 0px #bdbaac;
        border: 1px solid #163249;
        border-radius: 5px;
        color: #163249;
        font-family: "Trebuchet MS", Arial, Helvetica,
    
    }
    
    .notifications {
        /* background: linear-gradient(to bottom, #bcb69b 0%, #c9c3a8 41%, #c9c3a8 52%, #787258 100%);
            border-radius: 5px;
            width: 40px;
            height: 40px;
                display: flex;
            justify-content: center;
            margin: auto;
            padding-top: 7px; */
        margin-top: 5px;
        margin-right: 5px;
    }
    
    .notifications .forceIcon.slds-button__icon .slds-icon {
        fill: #f7f7f7;
    
    }
    
    .slds-global-header__icon,
    .slds-global-header__icon .slds-icon,
    .slds-global-header__icon .slds-button__icon {
        width: 1.8rem;
        height: 1.8rem;
    }
    
    .top-banner-button .profileMenuRegion {
        background: #f7f7ff;
        font-size: 20px;
        padding: 3px 0px 3px 0px;
        /* box-shadow: inset 0px 0px 2px 0px #bdbaac; */
        border: 0px solid #163249;
        border-radius: 7px;
        /* color: #000; */
        position: relative;
        text-transform: uppercase;
        margin-left: 10px;
        display: flex;
    
    }
    
    .selfServiceProfileMenuTrigger a {
        padding: 0 12px 0 5px !important;
        display: flex;
        /* color:#12233e;  */
        margin-top: -2px;
        font-weight: 100;
        max-width: 180px;
        color: #000;
    
    }
    
    .selfServiceProfileMenuTrigger .triggerDownArrow {
        margin-top: 12px;
    }
    
    .selfServiceProfileMenuTrigger .profileName {
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 18px;
    
    }
    
    .selfServiceProfileMenuTrigger a:hover,
    .selfServiceProfileMenuTrigger a:focus,
    .selfServiceProfileMenuTrigger a:active {
        color: #000;
        box-shadow: none !important;
    
    }
    
    .selfServiceProfileMenuTrigger a:hover {
        color: #000;
    }
    
    .selfServiceUserProfileMenu .selfServiceProfileMenuTrigger {
        text-align: left;
    }
    
    .top-banner-button .profileIcon {
        margin-right: 0px;
        margin-left: 4px;
        /* border: 1px rgb(113 113 113) solid; */
    
    }
    
    .selfServiceUserProfileMenu .menuList {
        padding: 5px;
        border-radius: 7px;
        margin-top: 7px;
        /* background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/body-bg.png); */
    }
    
    .selfServiceUserProfileMenu li.uiMenuItem a {
        display: block;
        font-size: 16px;
        padding: 10px 15px;
        text-decoration: none;
        color: #1e4463;
        font-family: 'whitneybook', Helvetica, Arial, sans-serif;
    }
    
    .nav-notification-link {
        position: relative;
    }
    
    .nav-notification-link .unsNotificationsCounter {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        display: block;
        width: 100%;
        background-color: #ccc;
    }
    
    .nav-notification-link .unsNotificationsCounter .headerButtonBody,
    .nav-notification-link .unsNotificationsCounter .headerButtonBody .slds-icon-utility-notification,
    .nav-notification-link .unsNotificationsCounter .headerButtonBody .slds-icon {
        width: 100%;
        display: block;
    }
    
    .unsNotificationsPanel .titleName {
        color: #6a6797;
        font-family: 'whitneybook', Helvetica, Arial, sans-serif;
        font-weight: normal;
        font-size: 40px;
        text-transform: none;
        line-height: normal;
    }
    
    .unsNotificationsPanel .trayMarkAllRead {
        font-size: 14px;
        letter-spacing: 0.5px;
        color: #1e4463;
    
    }
    
    .uiPanel--notificationsPanel {
        /* background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/body-bg.png); */
        border: 2px #C5B396 solid;
    }
    
    .unsNotificationsListRow.notification-unread {
        background-color: transparent;
    }
    
    .unsNotificationsListRow.notification-read {
        /* background-color: rgba(255, 255, 255, 0.3); */
        background-color: none;
    }
    
    .uiPanel--notificationsPanel .pointer {
        display: none;
    }
    
    .unsNotificationsListRow .notification-icon {
        background-color: transparent !important;
        padding: 0px 0px 0px 0px;
    
    }
    
    .unsNotificationsListRow.notification-unread .uiImage {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/bell-solid.svg);
        background-repeat: no-repeat;
        width: 30px;
        height: 30px;
        background-size: 22px 30px;
        display: block;
        margin-left: 4px;
    }
    
    .unsNotificationsListRow.notification-row {
        border-top: 0;
    }
    
    .unsNotificationsListRow.notification-read .uiImage {
        /* background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/email-open-icon.svg); 
            background-repeat: no-repeat; */
        border: 5px #B3A168 solid;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        background-size: 22px 24px;
        display: block;
        margin-left: 4px;
        margin-top: 2px;
    }
    
    .unsNotificationsListRow .assistive-unread-mark {
        color: #d34c86;
    }
    
    .unsNotificationsListRow.notification-unread .uiImage img,
    .unsNotificationsListRow.notification-read .uiImage img {
        display: none;
    }
    
    .unsNotificationsListRow.notification-row {
        border-color: #C5B396;
        padding-bottom: 0;
        margin-bottom: 0px;
    }
    
    .unsNotificationsListRow {
        padding-bottom: 5px;
    
    }
    
    .unsNotificationsListRow:hover {
        background-color: transparent !important;
    }
    
    .unsNotificationsListRow .notification-link {
        margin: 8px 7px;
        padding: 10px 10px 6px 10px;
    }
    
    .unsNotificationsListRow.notification-unread .notification-link {
        background-color: #F5F3EA;
    }
    
    .unsNotificationsListRow .notification-text {
        margin-bottom: -7px;
        font-weight: 200;
        font-size: 16px;
    }
    
    .unsNotificationsListRow .notification-text-title {
        font-size: 16px;
        font-weight: 400;
    }
    
    .unsNotificationsListRow .notification-age {
        font-size: 13px;
        font-weight: 200;
    }
    
    .unsNotificationsListRow.notification-unread:hover .notification-link,
    .unsNotificationsListRow:hover .notification-link {
        background-color: #EEECE3;
    }
    
    .profile-row {
        display: flex;
        border-bottom: 1px solid #d1bba0;
        margin-bottom: 7px;
    }
    
    .profile-row label,
    .profile-row .slds-form-element__legend {
        width: 33.33333%;
        /* margin-top: 14px; */
    }
    
    .profile-row.brainInfo .slds-form-element__control {
        padding-left: 15px;
    }
    
    .profile-row .slds-form-element {
        width: 66.6666%;
        padding-left: 15px;
    }
    
    .profile-row.biological-sex-radioGroup .slds-form-element__control,
    .profile-row.two-cal .slds-form-element__control {
        padding-left: 30px;
        width: 66.6666%;
    }
    
    .profile-row.two-cal .slds-form-element {
        padding-left: 0;
    
    }
    
    .profile-row.paddingL30 .slds-form-element {
        padding-left: 30px;
    
    }
    
    .profile-row.paddingL30 .slds-form-element .slds-form-element__label {
        padding-top: 0px;
        margin-top: 10px;
    
    }
    
    .profile-row .slds-form-element {
        border: 0;
        padding-bottom: 0;
        margin-bottom: 10px;
    }
    
    .j-right {
        justify-content: right;
    }
    
    .j-center {
        display: flex !important;
        text-align: center;
        justify-content: center;
    }
    
    .j-center li {
        height: auto !important;
        margin: auto 24px !important;
    }
    
    .marginT0 .slds-form-element__legend {
        margin-top: 0px;
    }
    
    .profile-row.tow-col .slds-form-element__row .slds-form-element.slds-size_4-of-6,
    .profile-row.tow-col .slds-form-element__row .slds-form-element.slds-size_2-of-6 {
        width: 50%;
    }
    
    /* .profile-row.tow-col .slds-form-element .slds-form-element__label{
            width:100%;
        } */
    /* ----------------input------------ */
    .slds-form-element .slds-form-element__label {
        font-size: 20px;
        min-width: 100px;
        /* margin-top: 4px; */
    }
    
    .slds-form-element .slds-input {
        border-color: #6a6797;
        font-size: 20px;
        height: 40px;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 400;
        color: #000;
    }
    
    .slds-textarea {
        border-color: #6a6797;
        font-size: 20px;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 400;
        color: #000;
    }
    
    .slds-form-element .slds-combobox__input {
        border-color: #6a6797;
        font-size: 20px !important;
        height: 40px !important;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 400;
        padding-top: 4px;
    }
    
    /* ----------------Participation form--------------- */
    
    
    
    .comm-page-custom-participant-consent .cFooterPanel,
    .comm-page-custom-dbsparticipant-consent .cFooterPanel {
        display: none;
    }
    
    /* .comm-page-custom-participant-consent {
            padding-top: 0px;
        } */
    
    .participation-form {
        max-width: 90vw;
        width: 875px;
        margin: auto;
    }
    
    .Participation-header-box {
        /* max-height: 22.67578125vw; */
    
    
        /* background-image: url('/sfsites/c/resource/1619780842000/mindcrowd_style/images/MindCrowd+Logo+FORM.png');   */
        display: flex;
        justify-content: center;
        border-radius: 8px;
        margin-top: 12px;
        /* border-bottom: 40px solid rgba(201,77,129,1); */
        background-color: #12233e;
        padding: 24px 10px;
        text-align: center;
    }
    
    .Participation-header-box a {
        justify-content: center;
        margin: auto;
    }
    
    /* .logo-container {
            background-image: url('/sfsites/c/resource/1619780842000/mindcrowd_style/images/MindCrowd+Logo+FORM.png');  
            background-size: cover;
            background-position: center;
        } */
    .logo-container {
        width: 205px;
        margin-top: 14px;
    }
    
    .Participation-title-box {
        margin-top: 12px;
        background-color: #fff;
        border: 1px solid #6a6797;
        border-radius: 8px;
        margin-bottom: 12px;
        padding: 24px;
        padding-top: 22px;
        position: relative;
        overflow: hidden;
    
    }
    
    .participation-form-text-aria {
        height: 200px;
        overflow: auto;
    }
    
    .participation-form-text-aria p {
        padding-bottom: 15px;
        color: #000;
        font-size: 18px;
        margin: 0;
        line-height: 24px;
    }
    
    .p-list {
        list-style: disc;
        padding-left: 40px;
    
    }
    
    .vip-text-2 {
        font-size: 25px;
        color: #6a6797;
        text-align: center;
        line-height: 27px;
        padding-left: 75px;
        padding-right: 75px;
    }
    
    .white_wrapper_content .p-list {
    
        margin-top: 20px;
        margin-bottom: 20px;
    
    }
    
    .participation-form-text-aria .slds-gutters .slds-col {
        padding-left: 0;
    }
    
    .participation-form-text-aria .bold {
        /* color: #1e4463;
            font-family: Arial, Helvetica; */
    
        font-weight: bold;
        line-height: normal;
    
        text-transform: unset;
    }
    
    .slds-rich-text-editor__output ul {
        margin-left: 20px;
    }
    
    .freebirdSolidBackground {
        background-color: #6a6797;
        color: rgba(0, 0, 0, 1);
    
    }
    
    /* .freebirdFormviewerViewHeaderThemeStripe {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            height: 10px;
            left: -1px;
            position: absolute;
            top: -1px;
            width: calc(100% + 2px);
        } */
    .Participation-title-box .title {
        /* font-family: 'Google Sans',Roboto,Arial,sans-serif; */
        font-size: 32px;
        font-weight: 400;
        line-height: 40px;
        color: #202124;
        line-height: 135%;
        max-width: 100%;
        min-width: 0%;
    }
    
    .freebirdFormviewerViewHeaderRequiredLegend {
        /* font-family: Roboto,Arial,sans-serif; */
        font-size: 14px;
        font-weight: 400;
        letter-spacing: .2px;
        line-height: 20px;
        margin-top: 12px;
    }
    
    .freebirdFormviewerViewHeaderRequiredLegend {
        color: #d34c86;
    }
    
    .participation-form-item-row {
        -webkit-transition: background-color 200ms cubic-bezier(0.0, 0.0, 0.2, 1);
        transition: background-color 200ms cubic-bezier(0.0, 0.0, 0.2, 1);
        background-color: #fff;
        border: 1px solid #6a6797;
    
        border-radius: 8px;
        margin-bottom: 12px;
        padding: 10px 24px 8px 24px;
        page-break-inside: avoid;
        word-wrap: break-word;
        color: #202124;
        width: 100%;
    
    }
    
    .av_three_fifth {
        margin-left: 6%;
        width: 57.599999999999994%;
    }
    
    .paddingB20 {
        padding-bottom: 20px;
    }
    
    .paddingB10 {
        padding-bottom: 10px;
    }
    
    .paddingB0 {
        padding-bottom: 0px !important;
    }
    
    .paddingT20 {
        padding-top: 16px;
    }
    
    .paddingL30 {
        padding-left: 30px;
    }
    
    .marginT-m5 {
        margin-top: -5px !important;
    }
    
    .display-flex {
        display: flex;
    }
    
    .participation-form-item-row .slds-checkbox_faux {
        width: 24px;
        height: 24px;
        border-color: #6a6797;
    }
    
    .participation-form-item-row .slds-checkbox_faux::after {
        border-width: 3px !important;
        height: 7px !important;
        width: 12px !important;
    }
    
    .participation-form-item-row .slds-form-element__label {
        /* font-family: 'Google Sans',Roboto,Arial,sans-serif; */
        /* font-size: 16px !important; */
        font-weight: 500 !important;
        /* letter-spacing: .1px; */
        /* line-height: 24px; */
        color: #202124;
        font-weight: 400;
        width: 100%;
        word-break: break-word;
        /* margin-bottom: 16px; */
        /* margin-top: 10px; */
    }
    
    /* .participation-form-item-row p{
            font-family: 'Google Sans',Roboto,Arial,sans-serif;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: .1px;
            line-height: 24px;
            color: #202124;
            font-weight: 400;
            width: 100%;
            word-break: break-word;
            margin-bottom: 16px;
            margin-top: 0;
        } */
    
    /* -------------------comm-page-custom-acceptancepage -------------- */
    .comm-page-custom-acceptancepage,
    .comm-page-custom-rejectionpage {
        padding-top: 0;
    }
    
    .comm-page-custom-acceptancepage .comm-content-foote,
    .comm-page-custom-rejectionpage .comm-content-footer,
    .comm-page-custom-acceptancepage .cFooterPanel,
    .comm-page-custom-rejectionpage .cFooterPanel,
    .comm-page-custom-acceptancepage .footerArea,
    .comm-page-custom-acceptancepage .slds-builder-header_container,
    .comm-page-custom-rejectionpage .footerArea,
    .comm-page-custom-rejectionpage .slds-builder-header_container {
        display: none;
    }
    
    
    .comm-page-custom-acceptancepage .Participation-title-box .title,
    .comm-page-custom-rejectionpage .Participation-title-box .title {
        font-family: 'Google Sans', Roboto, Arial, sans-serif;
        font-size: 27px;
        font-weight: 400;
        line-height: 40px;
        color: #202124;
        line-height: 135%;
        max-width: 100%;
        min-width: 0%;
        text-align: center;
        margin: 20px 0;
    }
    
    
    /* ---------------games dashboard------------------- */
    
    .comm-page-custom-games .cCenterPanel,
    .comm-page-custom-notifications .cCenterPanel,
    .comm-page-custom-notifications .contentRegion,
    .comm-page-custom-games .contentRegion,
    .comm-page-custom-braininfo .cCenterPanel,
    .comm-page-custom-consent .cCenterPanel,
    .comm-page-custom-complete .cCenterPanel,
    .comm-page-custom-results .cCenterPanel,
    .comm-page-custom-complete .cCenterPanel {
        margin: 0 auto;
        position: relative;
        /* width: 980px; */
        padding: 0;
    }
    
    .comm-page-custom-braininfo,
    
    .comm-page-custom-complete {
        padding-top: 70px;
    }
    
    .comm-page-custom-consent {
        padding-top: 130px;
    }
    
    .comm-page-custom-results {
        padding-top: 118px;
    }
    
    .comm-page-custom-braininfo .contentRegion,
    .comm-page-custom-consent .contentRegion,
    .comm-page-custom-complete .contentRegion {
        padding: 0 !important;
    }
    
    .comm-page-custom-notifications .contentRegion {
        min-height: 58vh;
    }
    
    .comm-page-custom-braininfo .top-nav-strip,
    .comm-page-custom-braininfo .top-banner-button,
    .comm-page-custom-consent .top-banner-button,
    .comm-page-custom-complete .top-nav-strip,
    .comm-page-custom-complete .top-banner-button,
    .comm-page-custom-results .top-banner-button,
    .comm-page-custom-dlrts .top-nav-strip,
    .comm-page-custom-dlrts .top-banner-button,
    .comm-page-custom-pairedgame .top-nav-strip,
    .comm-page-custom-pairedgame .top-banner-button,
    .comm-page-custom-finish .top-nav-strip,
    .comm-page-custom-finish .top-banner-button {
        display: none !important;
    }
    
    .brainInfo {
        margin-top: 34px;
    }
    
    .compare_form.brainInfo {
        margin-top: 0;
    }
    
    .biological-sex-radioGroup {
        width: 100%;
    }
    
    .opacity0 {
        opacity: 0;
    }
    
    .brainInfo .slds-has-error .slds-form-element__help {
        position: absolute;
        right: 0;
        bottom: -7px;
        display: none;
    }
    
    .cVipAccess #sfdc_username_container,
    .cVipAccess #sfdc_password_container {
        padding: 0;
        background-color: transparent;
        border: 0;
        margin-bottom: 10px;
    }
    
    .cVipaccessPasswordRecovery #sfdc_username_container {
        padding: 0;
        background-color: transparent;
        border: 0;
        margin-bottom: 20px;
    }
    
    .cVipAccess input,
    .cVipaccessPasswordRecovery .input {
        margin: 0;
        border: 1px solid #6a6797 !important;
        width: 100% !important;
        -webkit-appearance: none;
        font-size: 20px !important;
        line-height: normal !important;
        min-height: 40px !important;
        background-color: #fff !important;
    }
    
    .pull-left {
        float: left;
    }
    
    .text-right {
        text-align: right;
    }
    
    #sfdc_forgot {
        margin-top: 10px;
        font-size: 14px;
    }
    
    .login-text-heading {
        font-size: 25px;
        font-weight: 400;
    }
    
    .question-text {
        font-size: 20px;
    }
    
    .link {
        color: #000;
        text-decoration: underline;
    }
    
    .comm-page-custom-vipaccess .mainContentArea,
    .comm-page-custom-passwordrecovery .mainContentArea,
    .comm-page-custom-checkpasswordrecoveryemail .mainContentArea {
        margin-top: 75px;
        margin-bottom: 75px;
    }
    
    /* .brainInfo .slds-required{float: left;} */
    .biological-sex-radioGroup fieldset {
        display: contents;
    }
    
    .biological-sex-radioGroup .slds-form-element__legend {
        font-weight: normal;
    }
    
    .slds-radio_faux {
        width: 24px !important;
        height: 24px !important;
        margin: 3px;
    }
    
    .slds-combobox .slds-listbox {
        font-size: 16px;
    }
    
    .brainInfo .slds-form-element {
        display: flex;
    }
    
    .brainInfo.round-one .slds-form-element {
        display: block;
    }
    
    .brainInfo .slds-form-element .slds-form-element__label {
        width: 34.33333%;
        color: #000
    }
    
    .brainInfo .slds-form-element .slds-form-element__control {
        width: 65.666%;
    }
    
    .postion-relative {
        position: relative;
    }
    
    .page-title {
        font-size: 60px;
        letter-spacing: 0px;
        font-weight: 500;
        color: #1e4463;
        text-transform: none
    }
    
    .page-title-g {
        font-size: 60px;
        letter-spacing: 0px;
        font-weight: 100;
        color: #1e4463;
        text-transform: none
    }
    
    .page-content {
        font-size: 24px;
        font-weight: 200;
        padding-bottom: 30px;
        text-align: justify;
        margin-top: 10px;
        color: #1e4463;
    }
    
    .consent-form-item-row {
        page-break-inside: avoid;
        word-wrap: break-word;
        color: #202124;
        display: flex;
        padding-bottom: 0 !important;
    }
    
    .consent-form-item-row .slds-form-element {
        margin-right: 0;
        padding-top: 0;
        margin-top: 0;
        border-bottom: 0;
    }
    
    .consent-form-item-row .slds-checkbox_faux {
        width: 25px;
        height: 25px;
    }
    
    .consent-form-item-row .slds-checkbox_faux::after {
        border-width: 3px !important;
        height: 7px !important;
        width: 12px !important;
    }
    
    .marginB20 {
        margin-bottom: 20px;
    }
    
    .marginB30 {
        margin-bottom: 30px;
    }
    
    .marginB10 {
        margin-bottom: 10px;
    }
    
    .marginT10 {
        margin-top: 10px;
    }
    
    .text-decoration-non,
    .text-decoration-none:hover {
        text-decoration: none !important;
    }
    
    .test h1 {
        text-align: center;
        hyphens: none;
    }
    
    .slds-button:hover,
    .slds-button:focus {
        color: #fff;
    }
    
    .slds-button:focus {
        color: #fff;
        background-color: #ea526e;
        border-color: #ea526e;
    }
    
    .test .slds-modal__content p {
        text-align: center;
    }
    
    .test .slds-modal__header {
        margin-bottom: 0;
    }
    
    .slds-modal__header {
        padding: 40px 40px 0px;
    }
    
    .slds-modal__header.slds-modal__header_empty {
        padding: 0;
    }
    
    .slds-modal__header,
    .slds-modal__footer {
        border-color: #fff;
    }
    
    .slds-modal__content {
        padding: 25px 45px 25px;
        font-size: 20px;
    }
    
    lightning-button-icon.slds-modal__close .slds-button {
        height: 32px;
        width: 32px;
    }
    
    .slds-modal__header .title {
        color: #274255;
        font-size: 25px;
    }
    
    .test .slds-modal__footer {
        display: flex;
        justify-content: center;
        padding-bottom: 40px;
    }
    
    .slds-modal__footer .slds-button {
        margin-left: 15px;
    
    }
    
    .test .slds-modal__footer .slds-button {
        margin-left: auto;
    }
    
    .test .slds-modal__footer .slds-button_purple2 {
        margin-bottom: -41px;
    }
    
    .test .drop-down {
        text-align: left !important;
    }
    
    .small-text {
        font-size: 13px;
        line-height: 16px;
    }
    
    p.small {
        font-size: 13px;
    }
    
    .consent_form {
        font-size: 16px;
        padding: 20px;
        padding-left: 0px;
    }
    
    .inner_content .magenta-btn .slds-button {
        font-size: 24px !important;
        padding: 10px 30px 10px !important;
    }
    
    .inner_content .slds-checkbox_faux {
        width: 25px !important;
        height: 25px !important;
        margin: 2px 0px 3px 0 !important;
        border-color: #6a6797 !important;
    }
    
    [role=combobox] input[readonly],
    input[readonly][role=combobox] {
        border-color: #6a6797;
    }
    
    [role=combobox] input[readonly],
    input[readonly][role=combobox] .slds-icon-utility-down .slds-icon {
        fill: #6a6797;
    }
    
    .inner_content .page-title {
        text-align: center;
    }
    
    .participation-form-text-aria {
        font-size: 18px;
    
        padding-top: 20px;
    }
    
    .participation-form-text-aria em {
        margin-bottom: 12px;
        page-break-inside: avoid;
        word-wrap: break-word;
        color: #202124;
        font-size: 16px;
    }
    
    .game-tiles-box article {
        background-color: transparent;
        border: 0;
    }
    
    .game-tiles-box .slds-card__header {
        display: none;
    }
    
    .game-tiles-box .game-tiles {
        border-radius: 10px;
        padding: 24px;
        min-height: 224px;
        display: flex;
        text-align: center;
        justify-content: center;
        position: relative;
        text-decoration: none;
        transition: all 150ms linear;
        cursor: pointer;
    }
    
    .game-tiles-box .game-tiles:hover {
        box-shadow: inset 0px 0px 15px 0px #bdbaac;
        transition: all 150ms linear;
    }
    
    .game-tiles-box .game-tiles .title {
        justify-content: center;
        margin: auto;
        color: #1e4463;
        /* font-size: 26px; */
        font-size: 46px;
        line-height: 46px !important;
        font-weight: 400;
        z-index: 1;
    }
    
    .game-tiles-box .game-tiles .title span {
        line-height: 46px;
        margin-top: 30px;
        display: block;
        font-weight: 100;
    }
    
    .game-tiles-box .game-tiles .title1 {
        justify-content: center;
        margin: auto;
        color: #1e4463;
        /* font-size: 26px; */
        font-size: 40px;
        line-height: 46px !important;
        font-weight: 400;
        z-index: 1;
    }
    
    .game-tiles-box .game-tiles .title1 span {
        line-height: 46px;
        margin-top: 30px;
        display: block;
        font-weight: 100;
    }
    
    .game-tiles.opened {
        background-color: #f7f7ff;
        border: 1px #6a6797 solid;
    }
    
    .game-tiles.completed {
        pointer-events: none;
        background-color: #f7f7ff;
        border: 1px #6a6797 solid;
    }
    
    .game-tiles.locked {
        opacity: 0.5;
        pointer-events: none;
        background-color: #f7f7ff;
        border: 1px #6a6797 solid;
    }
    
    .game-tiles.opened .game-tiles-lock-icon {
        background-color:#01df38;
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
    }
    
    .game-tiles.completed .game-tiles-lock-icon {
        background-color:#ea526e;
    }
    
    .game-tiles-box .game-tiles .status {
        position: absolute;
        top: -20px;
        color: #202124;
    }
    
    .game-tiles.game1,
    .game-tiles.game2,
    .game-tiles.game3,
    .game-tiles.game4,
    .game-tiles.game5,
    .game-tiles.game6,
    .game-tiles.game7,
    .game-tiles.game8,
    .game-tiles.game11, 
    .game-tiles.game12,
    .game-tiles.game13,
    .game-tiles.game14,
    .game-tiles.game15,
    .game-tiles.game17,
    .game-tiles.game18,
    .game-tiles.game19,
    .game-tiles.survey1,
    .game-tiles.survey2,
    .game-tiles.survey3,
    .game-tiles.survey4,
    .game-tiles.survey5,
    .game-tiles.survey6,
    .game-tiles.survey7,
    .game-tiles.survey8,
    .game-tiles.survey9,
    .game-tiles.survey10,
    .game-tiles.survey11,
    .game-tiles.survey12,
    .game-tiles.survey13,
    .game-tiles.survey14,
    .game-tiles.survey15,
    .game-tiles.survey16,
    .game-tiles.survey17,
    .game-tiles.survey18,
    .game-tiles.survey19,
    .game-tiles.survey20 {
        position: relative;
    }
    
    .game-tiles.game1::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/game-icon1.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -24px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 14px;
        height: 80%;
        opacity: 0.4;
        width: 150px;
    }
    
    .game-tiles.game2::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/game-icon2.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -24px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 14px;
        height: 80%;
        opacity: 0.4;
        width: 150px;
    }
    
    .game-tiles.game3::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/game-icon3.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -24px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 14px;
        height: 80%;
        opacity: 0.4;
        width: 150px;
    }
    
    .game-tiles.game4::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/game-icon4.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -24px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 14px;
        height: 80%;
        opacity: 0.4;
        width: 150px;
    }
    
    .game-tiles.game5::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/game-icon5.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -24px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 14px;
        height: 80%;
        opacity: 0.4;
        width: 150px;
    }
    
    .game-tiles.game6::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/game-icon6.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -10px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 14px;
        height: 80%;
        opacity: 0.4;
        width: 150px;
    }
    
    .game-tiles.game7::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/game-icon7.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -24px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 14px;
        height: 80%;
        opacity: 0.4;
        width: 150px;
    
    }
    
    .game-tiles.game8::before,
    .game-tiles.game9::before,
    .game-tiles.game10::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/game-icon8.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -24px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 14px;
        height: 80%;
        opacity: 0.4;
        width: 150px;
    }
    
    .game-tiles.game11::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/Bean.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -50px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: -18px;
        height: 120%;
        opacity: 0.4;
        width: 220px;
    }
    
    .game-tiles.game13::before, 
    .game-tiles.game12::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/Blood-drop.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -84px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: -18px;
        height: 120%;
        opacity: 0.4;
        width: 250px;
    }
    
    .game-tiles.game14::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/FakeNews.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -20px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 14px;
        height: 80%;
        opacity: 0.4;
        width: 180px;
    }
    
    .game-tiles.game15::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/speech.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -52px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 14px;
        height: 80%;
        opacity: 0.4;
        width: 300px;
    }
    
    .game-tiles.game17::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/digitSymbol.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -50px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 10px;
        height: 90%;
        opacity: 0.4;
        width: 300px;
    }
    .game-tiles.game18::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/cactus.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -42px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 14px;
        height: 80%;
        opacity: 0.4;
        width: 300px;
    }
    
    .game-tiles.game19::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/speech.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: -52px center;
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 14px;
        height: 80%;
        opacity: 0.4;
        width: 300px;
    }
    
    .game-tiles.survey1::before,
    .game-tiles.survey2::before,
    .game-tiles.survey3::before,
    .game-tiles.survey4::before,
    .game-tiles.survey5::before,
    .game-tiles.survey6::before,
    .game-tiles.survey7::before,
    .game-tiles.survey8::before,
    .game-tiles.survey9::before,
    .game-tiles.survey10::before,
    .game-tiles.survey11::before,
    .game-tiles.survey12::before,
    .game-tiles.survey13::before,
    .game-tiles.survey14::before,
    .game-tiles.survey15::before,
    .game-tiles.survey16::before,
    .game-tiles.survey17::before,
    .game-tiles.survey18::before,
    .game-tiles.survey19::before,
    .game-tiles.survey20::before {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/Survey.svg?test=1);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        content: ' ';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.4;
        width: 190px; /* Adjust width as needed */
        height: 190px; /* Adjust height as needed */
    }
    
    .game-tiles-box .game-tiles .status .slds-icon-action-check {
        background-color:#ea526e;
    }
    
    .game-tiles-box .game-tiles .status .slds-icon-action-check .slds-icon {
        width: 24px;
        height: 24px;
    }
    
    .btn__game-time-right {
        display: inline-block;
        padding-left: 26px;
        position: absolute;
        vertical-align: middle;
        font-weight: normal;
        bottom: 9px;
        right: 9px;
        opacity: 0.5;
    }
    
    .btn__game-time-right .btn__test-time-icon {
        width: auto;
        height: auto;
    }
    
    .btn__game-time-right .slds-icon {
        width: 26px;
        height: 26px;
    }
    
    .btn__game-time-right .time__number {
        font-size: 21px;
    }
    
    .btn__game-time-right .time__units {
        font-size: 8px;
    }
    
    .game-tiles-lock-icon {
        background-color: #163248;
        border-radius: 50%;
        padding: 8px;
    }
    
    .game-tiles-lock-icon .slds-icon {
        width: 24px;
        height: 24px;
        fill: #fff;
    }
    
    .modal-title {
        text-align: left;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    .compare_form h4 {
        color: #1e4463;
        font-weight: 400;
        padding-top: 10px;
    }
    
    .mainCrowd-blue-box {
        background-color: #1e4463;
        padding: 70px 80px 0px;
        position: relative;
        border-radius: 7px 7px 10% 10%;
        margin-bottom: 70px;
    }
    
    .mainCrowd-blue-box.thank-you-box {
        border-radius: 7px 7px;
        margin-bottom: 40px;
        padding: 70px 80px 60px;
    }
    
    .mainCrowd-blue-box h2 {
        color: #fff;
        font-size: 60px;
        padding-bottom: 20px;
        font-weight: 400;
    }
    
    .mainCrowd-blue-box .link {
        color: #163248;
        font-size: 15px;
        /* margin-left:20px;  */
        text-decoration: underline;
    }
    
    .result-h2 {
        font-size: 25px;
        padding-bottom: 10px;
        line-height: 30px;
    }
    
    .font-weight400 {
        font-weight: 400;
    }
    
    .mainCrowd-blue-box h3 {
        color: #ffffff;
        font-size: 20px;
        line-height: 30px;
        text-transform: none;
    }
    
    /* .mainCrowd-blue-box .slds-required{
            position: absolute;
            left: -15px;
            font-size: 20px;
            color: #fff;
        } */
    .mainCrowd-blue-box h4 {
        text-align: center;
        font-size: 36px;
        color: #fff;
        font-weight: 400;
    }
    
    .mainCrowd-blue-box p {
        color: #fff;
        font-size: 25px;
        line-height: 35px;
    }
    
    .full-width {
        width: 100%;
    }
    
    .comm-page-custom-finish {
        padding-top: 70px;
    }
    
    .result-form {
        position: relative;
        width: 100%;
        height: auto;
        display: inline-block;
        background-color: #f7f7ff;
        border: 1px #6a6797 solid;
        border-radius: 7px;
        padding: 70px 80px 45px;
        bottom: -46px;
    }
    
    .result-check-box {
        margin-top: 20px;
        display: flex;
        padding-left: 10px;
    }
    
    .result-check-box .slds-form-element__label {
        color: #dd5e96;
        font-size: 20px !important;
        padding-top: 0;
        margin-top: -4px;
        font-weight: 400;
        font-style: italic;
    }
    
    .result-check-box .slds-checkbox_faux {
        width: 24px !important;
        height: 24px !important;
    }
    
    .result-check-box .slds-checkbox_faux::after {
        border-width: 3px !important;
        height: 7px !important;
        width: 12px !important;
    }
    
    .result-check-box .slds-checkbox__label {
        display: flex;
    }
    
    .paddingL0 {
        padding-left: 0 !important;
    }
    
    .paddingR0 {
        padding-right: 0 !important;
    }
    
    .result-btn {
        display: block;
    }
    
    .result-form .slds-form-element {
        padding-bottom: 15px;
        margin-top: 5px;
        position: relative;
    }
    
    .result-form .slds-has-error .slds-form-element__help {
        position: absolute;
        left: 0;
        bottom: -15px;
    }
    
    .blue-box-content h1>p.title {
        text-transform: unset;
    }
    
    .slds-tabs_scoped__nav,
    .slds-tabs--scoped__nav {
        background-color: #b0a270;
        color: #fff;
        font-size: 18px !important;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        border-color: #948652;
    }
    
    .slds-tabs_scoped__link,
    .slds-tabs_scoped__link,
    .slds-tabs--scoped__link,
    .slds-tabs--scoped__link {
        color: #fff;
        border-right: 1px #948652 solid;
    }
    
    .slds-tabs_scoped__link:hover,
    .slds-tabs--scoped__link:hover {
        background-color: #948652;
    }
    
    .slds-tabs_scoped__item.slds-is-active {
        pointer-events: none;
    }
    
    .r-help-icon {
        background-color: #948652;
        padding: 3px 4px;
    }
    
    .r-help-icon .slds-icon {
    
        height: 16px;
        width: 16px;
    }
    
    .width-full,
    .width-full .slds-form-element__label {
        width: auto !important;
    }
    
    .width-full .slds-form-element .slds-form-element {
        display: block;
    }
    
    .width-full .slds-form-element .slds-form-element__control, .width-full  .slds-combobox_container {
        width: auto !important
    }
    
    .mainCrowd-inner-box .slds-form-element.display-block {
        display: block;
    }
    
    .mainCrowd-inner-box .slds-checkbox_faux {
        width: 25px;
        height: 25px;
        margin: 3px 3px 3px 0;
        border-color: #6a6797 !important;
    }
    
    .mainCrowd-inner-box .slds-checkbox_faux::after {
        border-width: 3px !important;
        height: 7px !important;
        width: 12px !important;
    }
    
    .form .slds-form-element {
        border: none;
    }
    
    .inline-block {
        display: inline-block;
    }
    
    .opt-out {
        clear: both;
        float: left;
        font-size: 14px;
        width: 100%;
        text-align: center;
    }
    
    .slds-listbox_vertical .slds-listbox__option_plain,
    .slds-listbox_vertical .slds-listbox__option--plain,
    .slds-listbox--vertical .slds-listbox__option_plain,
    .slds-listbox--vertical .slds-listbox__option--plain {
        border-bottom: 1px #6a6797 dotted;
    }
    
    .mainCrowd-inner-box .slds-form-element .slds-form-element__label {
        font-size: 20px;
        font-weight: normal;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
    
    }
    
    .slds-form-element .slds-form-element__label {
        hyphens: unset;
        word-break: break-word !important;
        -webkit-hyphens: none;
    }
    
    .removeBorder .slds-form-element {
        border: 0;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    /* .comm-page-custom-results .homepage-text{display: none;}
        .comm-page-home .resultpage-text{display: none;} */
    /* .comm-page-custom-finish .results-text{display: none;}
        .comm-page-custom-results .finishpage-text{display: none;} */
    .resultpage-text {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    
    .mainCrowd-inner-box1 {
        font-size: 22px;
    }
    
    /* ---------------games------------------- */
    
    .game-body {
        background-image: url(https://dev-mindcrowd-game.cs194.force.com/sfsites/c/resource/1619780842000/mindcrowd_style/images/body-bg.png);
        padding: 130px 0 0 0;
        margin: 0;
    }
    
    .comm-page-custom-demo {
        padding-top: 109px;
    }
    
    .marginT30 {
        margin-top: 30px;
    }
    
    .marginT24 {
        margin-top: 24px !important;
    }
    
    .marginT40 {
        margin-top: 40px;
    }
    
    .marginB40 {
        margin-bottom: 40px;
    }
    
    .game-header_container {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 100;
    }
    
    
    .game-header {
        background-image: url(/s/sfsites/s/resource/1619780842000/mindcrowd_style/images/header-bg.png);
        background-repeat: repeat-x;
        height: 138px;
        display: flex;
        justify-content: center;
    }
    
    .comm-page-custom-demo .main-content-outer {
        padding: 42px 42px 42px 42px;
    }
    
    .main-content-inner {
        background-color: #f7f7ff;
        border: 1px #6a6797 solid;
        border-radius: 7px;
        padding: 0px;
        position: relative;
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 61.6555vh;
        display: flex;
        justify-content: center;
    
    }
    
    .game-mind-img {
        position: absolute;
        right: 24px;
        top: -107px;
    }
    
    .game-canvas {
        width: 100%;
    }
    
    .game-body .footer_bottom {
        position: relative;
        color: #163249;
        font-size: 12px;
        width: 950px;
        margin: auto;
        height: 100px;
        margin-top: 20px;
    }
    
    .game-body .footer_bottom .footer_nav {
        width: 875px;
        margin: auto;
    }
    
    .game-body .footer_bottom .copyright {
        top: auto;
        bottom: 20px;
    }
    
    .instractions {
        font-size: 26px;
        text-align: center;
        padding: 20px;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        margin: auto;
    
    }
    
    .instractions p {
        margin-bottom: 20px;
    }
    
    .game-box {
        display: flex;
    }
    
    .x-box {
        background: #fff;
        font-size: 70px;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        margin: auto;
        padding: 10px 40px;
        border-radius: 7px;
        box-shadow: inset 0px 0px 2px 0px #bdbaac;
        border: 1px #ccc solid;
        max-width: 118px;
    }
    
    .main-content-inner {
        color: #163249;
    }
    
    .x-box {
        pointer-events: none;
    }
    
    .intractions-ball {
        width: 60px;
        height: 60px;
        display: inline-block;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 15px;
    }
    
    /* ------------- buttons ----------- */
    p {
        margin: 0.85em 0;
    }
    
    .top-banner-button .slds-global-header__items {
        font-style: italic;
        padding-top: 11px;
        margin-right: 10px;
        font-size: 20px;
        color: #fff;
        font-weight: 200;
    }
    
    .top-banner-button .banner-test-btn {
        padding: 15px 30px 13px;
        font-size: 18px;
        min-width: 139px;
        background-color: #ea526e;
        border-color: #ea526e;
        color: #ffffff;
        text-transform: uppercase;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 400;
        line-height: 1.2em;
        position: relative;
        text-align: center;
        max-width: 100%;
        font-style: normal;
    }
    
    .top-banner-button .banner-test-btn:hover {
        background: #cf445e;
    }
    
    .top-banner-button .banner-test-btn .btn__test-time-right {
        border-color: #fff;
        right: -31px;
        height: 50px;
        top: 14px;
        width: 50px;
        padding: 0px;
        border-width: 3px;
    }
    
    .top-banner-button .banner-test-btn .btn__test-time-right .time__number {
        line-height: 1;
        font-size: 23px !important;
        text-transform: none;
        font-weight: 600;
        color: #fff;
    }
    
    .top-banner-button .banner-test-btn .btn__test-time-right .time__units {
        font-size: 12px !important;
        color: #fff;
    }
    
    .btn__test-time-icon {
        margin-top: -17px;
        position: absolute;
        top: 57%;
        left: 0;
    }
    
    .btn__test-time-icon .slds-icon {
        width: 25.5px;
        height: 25.5px;
        fill: #163249;
    }
    
    .btn__test-time--small .btn__test-time-icon {
        margin-top: -12px;
    }
    
    .faceimg-box .n-g-box2 {
        min-height: 361px;
    }
    
    .btn__test-time-left {
    
        display: inline-block;
        margin-right: 10px;
        position: relative;
        vertical-align: middle;
        font-weight: bold;
    }
    
    .btn__test-time-right {
        display: inline-block;
        padding-left: 30px;
        position: relative;
        vertical-align: middle;
        background: #dd5e96;
        border-radius: 50%;
        position: absolute;
        border: 3px #fff solid;
        padding: 5px;
        height: 66px;
        top: -4px;
        width: 66px;
        right: -38px;
    }
    
    .time__number {
        line-height: 1;
        font-size: 30px;
        text-transform: none;
        font-weight: 600;
    }
    
    .btn__test-time--small .time__number {
        font-size: 22px;
    }
    
    .time__units {
        display: block;
        font-size: 18px;
        margin-top: -3px;
        letter-spacing: .5px;
        line-height: 1;
        text-transform: uppercase;
        text-align: center;
        margin-left: 4px;
        font-weight: 200;
    }
    
    .banner-col-left {
        margin-top: 75px;
    }
    
    .homepage-right-col .time__units {
        display: block;
        font-size: 16px;
        margin-top: -3px;
        letter-spacing: .6px;
        line-height: 1;
        text-transform: uppercase;
        text-align: center;
        margin-left: 4px;
    }
    
    .homepage-right-col .position-fixed {
        z-index: 9;
    }
    
    .btn__test-time--small .time__units {
        font-size: 10px;
    }
    
    .magenta-btn .slds-button,
    .salesforceIdentityLoginForm2 .uiButton,
    .loginButton,
    .magenta-btn .cmdbtn {
        padding: 15px 30px 13px;
        font-size: 18px;
        min-width: 139px;
        background-color: #ea526e;
        border-color: #ea526e;
        color: #ffffff;
        text-transform: uppercase;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 400;
        line-height: 1.2em;
        position: relative;
        text-align: center;
        max-width: 100%;
        font-style: normal;
        border-radius: 7px;
    
    }
    
    .dark-blue-btn {
        padding: 15px 30px 13px;
        font-size: 18px;
        min-width: 139px;
        background-color: #6a6797;
        border-color: #6a6797;
        color: #ffffff;
    
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 400;
        line-height: 1.2em;
        position: relative;
        text-align: center;
        max-width: 100%;
        font-style: normal;
        border-radius: 7px;
        transition: all 150ms linear;
    
    }
    
    .dark-blue-btn:hover {
    
        background-color: #1e4563;
        color: #fff;
        transition: all 150ms linear;
    }
    
    .dark-blue-btn:focus {
    
        background-color: #6a6797;
        border-color: #6a6797;
        color: #fff;
        transition: all 150ms linear;
    }
    
    .magenta-btn .cmdbtn {
        border-radius: 3px !important;
        padding: 3px 10px 3px !important;
    }
    
    .inputbtns {
        margin-top: 10px;
    }
    
    .game_block .btn:active,
    .game_block .slds-button:active {
        background-color: #cf445e !important;
        border: 1px solid #cf445e !important;
    
    }
    
    .text-cap {
        text-transform: uppercase;
        font-weight: 300 !important;
    }
    
    .normal-text {
        font-weight: 200;
    }
    
    .salesforceIdentityLoginForm2 .uiButton .label {
        color: #fff !important;
        font-weight: 500 !important;
        font-size: 18px !important;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
    }
    
    #resulttxt,
    .g-errormsg {
        position: absolute;
        top: 0;
        text-align: center;
        width: 100%;
        left: 0;
        z-index: 1;
        margin: 0;
        line-height: normal;
    }
    
    .objque {
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 100%;
        left: 0;
        z-index: 0;
    }
    
    .cancel-btn {
        border: 1px solid #8c2755 !important;
        font-size: 18px !important;
        padding: 10px 30px !important;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 500 !important;
        color: #8c2755 !important;
        background-color: transparent;
        border-radius: 6px !important;
        text-decoration: none;
        box-shadow: inset 0px 1px 0px 0px #ffffff;
    }
    
    .ssm {
        width: 50%;
        max-width: 40rem;
        min-width: 20rem;
        margin: auto;
    }
    
    .comm-page-forgot-password .cancel-btn {
        margin-top: 0;
        position: relative;
        top: 5px;
        float: right;
        right: 20px;
        padding: 15px 30px 13px;
        border-radius: 3px !important;
    }
    
    .cancel-btn:hover {
        background-color: #ccc !important;
        text-decoration: none !important;
    }
    
    .marginT15 {
        margin-top: 15px;
    }
    
    .magenta-btn .slds-button:hover,
    .salesforceIdentityLoginForm2 .uiButton:hover,
    .loginButton:hover {
        background: #cf445e !important;
        color: #fff;
    }
    
    .fp-link {
        font-size: 16px;
        margin-left: 103px;
        margin-top: 16px;
        display: block;
    }
    
    .btn--secondary {
        background-color: #b0a270;
        border: 1px solid #948652;
        color: #12233e;
        font-size: 22px;
        font-weight: 400;
        text-decoration: none;
    
    }
    
    .btn--secondary:hover {
        text-decoration: none;
        background: #948652;
        color: #12233e;
    }
    
    .btn--caret {
        padding-right: 30px;
        position: relative;
    }
    
    .btn--caret:after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 0 5px 10px;
        border-color: transparent transparent transparent #163249;
        margin-top: -5px;
        position: absolute;
        top: 50%;
        right: 10px;
    }
    
    .the-problem .left-content p {
        color: #fff;
    }
    
    /* ----------------- Modal window -------------- */
    .slds-combobox__form-element .slds-input__icon-group {
        margin-top: -.7rem;
    }
    
    .slds-modal__header .slds-modal__close {
        top: -17px;
    }
    
    .slds-modal__header .slds-button {
        background: #6a6797;
        border-radius: 50%;
        border: 3px #59567e solid;
        padding: 3px 3px 5px;
    }
    
    .test .slds-modal__content {
        overflow: visible;
    }
    
    .pwd-instractions {
        background-color: #f7f7ff;
        border: 1px #6a6797 solid;
        border-radius: 7px;
        padding: 20px 20px;
        position: relative;
        margin-bottom: 20px;
    }
    
    .pwd-instractions p {
        margin: 0 5px;
    }
    
    .game-attention-modal header h1 {
        font-size: 56px;
        color: #1e4463;
        font-weight: normal;
        line-height: 26px;
        padding: 20px 0;
        text-align: left;
    }
    
    .slds-modal header header {
        border-bottom: 1px solid #bca385;
    }
    
    .game-attention-modal .slds-modal__header .slds-modal__close {
        top: -16px;
    }
    
    .game-attention-modal .slds-modal__content h2 {
        border: none;
        color: #2e2e2e;
        font-family: Arial, Helvetica;
        font-size: 22px;
        font-weight: bold;
        padding-bottom: 25px;
    }
    
    .marginT20 {
        margin-top: 20px;
    }
    
    .gall-thumb-img.marginT20 {
        margin-top: 25px;
    }
    
    /* .speed-m-chart-box .slds-size_4-of-12{
            position: relative;
        } */
    
    .game-attention-modal .slds-modal__content p {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    
    /* ------------- main content ------------- */
    .cCenterPanel {
        min-height: 35.7vh;
    }
    
    .number-list {
        list-style: decimal;
        padding-left: 15px;
    }
    
    .number-list li {
        padding-bottom: 10px;
    }
    
    .bold {
        font-weight: bold;
    }
    
    /* --------------------- game dlrts part 1 -------------- */
    .comm-page-custom-game {
        padding-top: 108px;
    }
    
    .game_panel {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        padding-bottom: 50px;
    
    }
    
    .comm-page-custom-page4 .game_panel,
    .comm-page-custom-page6 .game_panel {
        padding-bottom: 0px;
    }
    
    .comm-page-custom-page4 #resulttxt,
    .g-errormsg {
        top: 0;
        padding: 0;
        margin: 0;
    }
    
    .gamebody {
        margin: 0px;
        padding: 0px;
    }
    
    .game_block {
        font-size: 25px;
        width: 100%;
        font-weight: 400;
        padding: 16px 85px 20px;
    }
    
    .game_block p {
        line-height: 40px;
    }
    
    .centers {
        text-align: center;
    }
    
    .mb10 {
        margin-bottom: 10px !important;
    }
    
    .mb15 {
        margin-bottom: 15px !important;
    }
    
    .mb35 {
        margin-bottom: 35px !important;
    }
    
    .mt15 {
        margin-top: 15px !important;
    }
    
    .mt30 {
        margin-top: 35px !important;
    }
    
    .mt20 {
        margin-top: 20px !important;
    }
    
    .mt25 {
        margin-top: 25px !important;
    }
    
    .mt35 {
        margin-top: 35px !important;
    }
    
    .mt50 {
        margin-top: 50px !important;
    }
    .mr10 {
        margin-right: 10px !important;
    }
    
    .box4 {
        width: 100%;
        margin: 0px auto;
        text-align: center;
        background-size: cover;
    }
    
    .comm-page-custom-reactgame .game_panel img {
        margin-top: 50px;
        height: 220px;
        width: 220px;
    }
    
    .instractionb div {
        position: relative;
    }
    
    .instractionb span {
        position: absolute;
        bottom: -36px;
        left: 0;
        width: 100%;
        text-align: center;
    }
    
    .box4 div {
        height: 220px;
        width: 220px;
        display: inline-block;
        margin: 50px 4px 0;
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/b.svg?v=1);
        background-position: center;
        background-size: cover;
    
    }
    
    .instractionb.box4 div {
        height: 220px;
        width: 220px;
        margin-top: 0px;
    }
    
    .imgcross_1 div:nth-child(1) {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/x.svg?v=1);
        background-position: center;
        background-size: cover;
    }
    
    .imgcross_2 div:nth-child(2) {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/x.svg?v=1);
        background-position: center;
        background-size: cover;
    }
    
    .imgcross_3 div:nth-child(3) {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/x.svg?v=1);
        background-position: center;
        background-size: cover;
    }
    
    .imgcross_4 div:nth-child(4) {
        background-image: url(/s/sfsites/c/resource/1619780842000/mindcrowd_style/images/x.svg?v=1);
        background-position: center;
        background-size: cover;
    }
    
    .duration {
        margin-top: 10px;
        font-size: 12px;
        text-align: center;
        color: #d34c86;
        padding: 5px;
        position: fixed;
        top: 184px;
        width: 100%;
        text-align: left;
        left: 0;
        padding-left: 40px;
    }
    
    .d_title {
        color: #000;
    }
    
    .duration .d_txt {
        display: inline-block;
        margin-right: 15px;
    }
    
    .duration .d_status {
        display: inline-block;
        margin-left: 15px;
    }
    
    .n-g-box {
        font-size: 26px;
        box-shadow: 0px 0px 15px 0px #bdbaac;
        border-radius: 4px;
        padding: 0px 7px 4px;
        font-weight: 400;
        border: 1px #6a6797 solid;
        white-space: nowrap;
        margin-left: 5px;
        margin-right: 5px;
        /* color: #000; */
        display: inline-block;
        line-height: normal;
    
    }
    
    .rtop,
    .ltop,
    .rbop,
    .lbop,
    .rbot,
    .lbot {
        font-size: 60px;
        background-color: #fff;
        box-shadow: 0px 0px 15px 0px #bdbaac;
        border-radius: 4px;
        padding: 5px 20px;
        font-weight: 400;
        border: 1px #b0a270 solid;
        width: 140px;
        height: 100px;
        text-align: center;
        word-break: normal;
        padding-top: 30px;
    
    }
    
    .number-letter-game .game_panel,
    .number-letter-game .game_block {
        position: unset;
    }
    
    .rtop {
        position: absolute;
        right: 19%;
        top: 14%;
    }
    
    .ltop {
        position: absolute;
        left: 19%;
        top: 14%;
    }
    
    .rbot {
        position: absolute;
        right: 19%;
        bottom: 27%;
    }
    
    .lbot {
        position: absolute;
        left: 19%;
        bottom: 27%;
    }
    
    .studies .p2 {
        font-size: 27px;
        padding-bottom: 24px;
        color: #1e4463;
        font-weight: 200;
        line-height: 35px;
    }
    
    .studies .page-title {
        margin-bottom: 30px;
    }
    
    .studies .form {
        background-color: #f7f7ff;
        border: 1px #6a6797 solid;
        border-radius: 7px;
        padding: 70px 80px;
        position: relative;
    }
    
    /* ----------------- paires game --------- */
    .text-center {
        text-align: center;
    }
    
    .text-left {
        text-align: left;
    }
    
    .example-box {
        background-color: #fff;
        border-radius: 7px;
        border: 1px #6a6797 solid;
        /* padding: 5px 30px 15px; */
        font-size: 50px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25) inset;
        -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25) inset;
        -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25) inset;
        line-height: 94px;
        font-family: 'Varela Round', Helvetica, Arial, sans-serif;
        font-weight: 400;
    }
    
    .example-row {
        margin: 30px auto 40px;
    }
    
    .example-box .txt_input {
        font-size: 40px;
        border: 2px #ab9c68 solid;
        border-radius: 5px;
        padding: 5px 10px;
    }
    
    .example-box .slds-button {
        margin-left: 10px;
        text-align: center;
        display: inline-block;
        position: relative;
        top: -6px;
    }
    
    .keep-track-q {
        font-size: 50px;
        background-color: #fff;
        box-shadow: 0px 0px 15px 0px #bdbaac;
        border-radius: 4px;
        padding: 20px 19px 30px !important;
        font-weight: 400;
        border: 1px #b0a270 solid;
        white-space: nowrap;
        color: #1e4463;
        min-width: 227px;
        display: inline-block;
    }
    
    .keep-track-ul {
        justify-content: center;
        margin: auto;
        margin-top: 16px;
    }
    
    .fake-news-ul {
        justify-content: center;
        margin: auto;
        margin-top: 16px;
    }
    
    .keep-track-ul.tow-buttons,
    .keep-track-ul.one-buttons,
    .keep-track-ul.three-buttons,
    .keep-track-ul.four-buttons {
        display: flex;
    
    }
    
    .keep-track-ul .inputtexttwo,
    .keep-track-ul .inputbtn_lbl {
        margin-bottom: 50px;
        border: 1px #ccc solid;
    }
    
    .width-full {
        width: 100% !important;
    }
    
    .keep-track-ul li,
    .keep-track-ul div {
        /* float:left; */
        padding: 2px;
        /* min-width: 234px; */
        min-width: 210px;
    
        /* width: 16.66666%; */
        width: 25%;
        float: none;
        display: inline-block;
        vertical-align: middle;
    }
    
    .fake-news-ul li,
    .fake-news-ul div {
        /* float:left; */
        padding: 2px;
        /* min-width: 234px; */
        min-width: 210px;
    
        /* width: 16.66666%; */
        width: 25%;
        float: none;
        display: inline-block;
        vertical-align: middle;
    }
    
    
    .keep-track-ul.tow-buttons li {
        width: 36%;
    }
    
    .keep-track-ul li .keep-track-q {
        padding: 0;
    }
    
    .keep-track-ul li .slds-button {
        border-radius: 3px !important;
        box-shadow: rgb(0 0 0 / 30%) 0px 11px 12px -7px;
        color: #163248 !important;
        background-color: #fff !important;
        font-weight: 200 !important;
        border: 1px #bdbdbd solid !important;
        max-width: 100%;
    }
    
    .fake-news-ul li .slds-button {
        border-radius: 3px !important;
        box-shadow: rgb(0 0 0 / 30%) 0px 11px 12px -7px;
        color: #163248 !important;
        background-color: #fff !important;
        font-weight: 200 !important;
        border: 1px #bdbdbd solid !important;
        max-width: 100%;
    }
    
    .keep-track-ul li .slds-button[disabled],
    .keep-track-ul li .slds-button:disabled {
        background-color: #fff !important;
        border: 1px #bdbdbd solid !important;
        color: #000305 !important;
    
    }
    
    .fake-news-ul li .slds-button[disabled],
    .fake-news-ul li .slds-button:disabled {
        background-color: #fff !important;
        border: 1px #bdbdbd solid !important;
        color: #000305 !important;
    
    }
    
    .disabled {
        pointer-events: none;
    }
    
    .display-inline-block {
        display: inline-block;
    }
    
    .keep-track-ul li .inputtexttwo {
        max-width: fit-content;
        width: 100%;
        font-size: 40px;
        padding: 5px 5px;
        text-align: center;
        margin-bottom: 16px;
    
    }
    
    .team-w-bg {
        background-color: #fff;
        border-radius: 7px;
        margin-bottom: 24px;
    }
    
    .float-none {
        float: none !important;
        text-align: center;
    }
    
    .marginL20 {
        margin-left: 20px !important;
    }
    
    .remove-border {
        border: 0 !important;
    }
    
    .game-tiles.remove-border {
        background: none;
    }
    
    .removeBG {
        background-color: transparent !important;
        border-color: transparent;
        box-shadow: none;
        color: transparent !important;
    }
    
    .title2 {
        text-align: center;
        font-size: 40px;
        padding-bottom: 15px;
        border-bottom: 1px solid #bca385;
        line-height: 56px;
        color: #1e4463;
        font-weight: 400;
    }
    
    .title3,
    .user_time {
        text-align: center;
        font-size: 20px;
        color: #1e4463;
        font-weight: 400;
        position: absolute;
        top: 0px;
        right: 10px;
        border: 2px #C5B396 solid;
        border-top: 0;
        line-height: normal !important;
        padding: 3px 10px;
        background-color: rgba(255, 255, 255, 0.6);
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;
        display: none;
    }
    
    .user_time {
        min-width: 78px;
        text-align: left;
    }
    
    .pairedgame .game_block,
    .pairedgame.game_panel {
        position: unset !important;
        word-break: break-word;
    }
    
    /* --------------steps--------------- */
    .steps {
        overflow: hidden;
    
        justify-content: center;
        /* display: flex; */
        margin: auto;
        margin-bottom: 0px;
        position: relative;
    }
    
    .steps ul {
        list-style: none;
        padding: 0;
        position: relative;
    
    }
    
    .steps ul::after {
        content: '';
        background-color: #434880;
        display: block;
        position: absolute;
        width: 100%;
        height: 10px;
        z-index: 0;
        top: 23px;
    }
    
    .steps li {
        color: #163248;
        float: left;
        font-size: 14px;
        padding: 60px 0 0 0;
        position: relative;
        text-align: center;
        text-transform: uppercase;
        line-height: 20px;
        list-style: none;
    
    
    }
    
    .steps li:first-child {
        margin: 0;
    }
    
    .steps li:last-child {
        margin: 0;
    }
    
    .steps li span {
        color: #fff;
        font-size: 24px;
        height: 48px;
        position: absolute;
        text-align: center;
        top: 4px;
        width: 47px;
        line-height: 37px;
        background-color: #163248;
        border: 5px #434880 solid;
        border-radius: 50%;
        z-index: 1;
        font-weight: 600;
    
    }
    
    .steps li:first-child span {
        left: 0px;
    }
    
    .steps li:last-child span {
        left: auto;
        right: 0px;
    }
    
    .step-grid::after {
        content: '';
        background-color: #6a6797;
        display: block;
        position: absolute;
        width: 80%;
        height: 2px;
        z-index: 0;
        top: 53px;
        left: 10%;
    }
    
    .step-grid {
        padding-bottom: 35px;
        padding-top: 35px;
    
    }
    
    .step-grid .slds-col {
        margin: 0;
        display: flex;
        justify-content: center;
        padding-bottom: 0;
        padding-top: 0;
        padding-left: 0;
        padding-right: 0;
    }
    
    .marginB90 {
        margin-bottom: 90px;
    }
    
    .step-number {
        color: #000;
        font-size: 18px;
        height: 48px;
        text-align: center;
        width: 90%;
        height: 40px;
        line-height: 36px;
        background-color: #fff;
        border: 2px #6a6797 solid;
        border-radius: 3px;
        z-index: 1;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    /* .step-grid .slds-col:first-child{
            justify-content: left;
        }
        .step-grid .slds-col:last-child{
            justify-content: right;
        } */
    .step-grid .slds-col:first-child .step-number,
    .step-grid .slds-col:last-child .step-number {
        width: 95%;
    }
    
    .lable-s1 {
        position: absolute;
        top: 50px;
        font-size: 12px;
        color: #163248;
        text-transform: uppercase;
        line-height: 17px;
    }
    
    .steps li .lable-s {
        width: 100%;
        position: relative;
        left: 0 !important;
        display: block;
        color: #163248;
        height: auto;
        top: -6px;
        background: none !important;
        border: 0 !important;
        font-size: 12px;
    }
    
    .steps li:first-child .lable-s {
        left: -30%;
    }
    
    .steps li:last-child .lable-s {
        left: 30%;
    }
    
    .step-grid .current .step-number {
        background-color: #163248;
        border: 2px #163248 solid;
        color: #fff;
    
    }
    
    .steps li.current span {
        background-color: #6a6797;
    
    }
    
    .steps li.current .lable-s {
        color: #163248;
    }
    
    /* ---------face game--------- */
    .faceImg {
        width: 350px;
        height: auto;
        border-radius: 10px;
        margin: 5px 5px 15px;
    }
    
    .faceimg-box .n-g-box2 {
        /* min-width: 350px; */
        display: inline-block;
        font-size: 30px;
        background-color: #fff;
        box-shadow: 0px 0px 15px 0px #bdbaac;
        border-radius: 4px;
        padding: 5px 7px;
        font-weight: 400;
        border: 1px #b0a270 solid;
        white-space: nowrap;
    }
    
    .facegame .label {
        font-size: 28px;
        font-weight: 400;
        line-height: 35px;
    
    }
    
    .facegame .text-input::placeholder {
        text-align: center;
        color: rgb(99, 99, 99);
        font-size: 20px;
        font-weight: 200;
    }
    
    .facegame .text-input {
        text-align: center;
        color: #000;
        font-size: 20px;
        padding: 5px 5px 7px;
        border-radius: 5px;
        border: 2px #999 solid;
    }
    
    .removeb {
        border: 0;
    }
    
    .button-box {
        float: left;
        width: 100%;
    }
    
    .facegame .btn {
        min-width: 203px;
        font-size: 18px;
        width: 270px;
        margin-bottom: 5px;
    }
    
    .title2a {
        text-align: center;
        font-size: 26px;
        font-weight: 100;
        color: #163249;
        text-shadow: 0px 0px 2px rgb(0 0 0 / 24%);
    }
    
    .game-title {
        position: absolute;
        top: -43px;
        padding: 6.5px 24px 6px 24px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        left: 20px;
        background-color: #f7f7ff;
        border: 1px #6a6797 solid;
        border-bottom: 0;
        font-size: 30px;
        color: #1e4463;
        font-size: 26px;
        letter-spacing: 1.2px;
    
    
    }
    
    /* 
        -------------footer--------- */
    .comm-page-custom-viewform .slds-builder-header_container,
    .comm-page-custom-viewform .footerArea,
    .comm-page-custom-participant-consent .slds-builder-header_container,
    .comm-page-custom-participant-consent .footerArea,
    .comm-page-custom-dbsparticipant-consent .slds-builder-header_container,
    .comm-page-custom-dbsparticipant-consent .footerArea,
    .comm-page-custom-beangameparticipant-consent .slds-builder-header_container,
    .comm-page-custom-beangameparticipant-consent .footerArea {
        display: none;
    }
    
    .comm-page-custom-viewform,
    .comm-page-custom-participant-consent,
    .comm-page-custom-dbsparticipant-consent,
    .comm-page-custom-beangameparticipant-consent {
        padding-top: 0;
    }
    
    .comm-page-custom-viewform .slds-form--compound {
        padding-bottom: 15px;
    }
    
    .form-section {
        text-align: center;
        font-size: 40px;
        font-weight: 400;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        color: rgb(30, 68, 99);
        line-height: 56px;
    
    }
    
    .width50 .slds-form-element__control {
        width: 50%;
    }
    
    .number-step {
        font-size: 60px;
        color: rgb(30, 68, 99);
        background-color: #fff;
        box-shadow: 0px 0px 15px 0px #bdbaac;
        border-radius: 4px;
        padding: 10px 20px 12px;
        font-weight: 400;
        border: 2px rgb(30, 68, 99) solid;
        white-space: nowrap;
        margin-bottom: 20px;
        margin-top: 12px;
        display: inline-block
    }
    
    .slds-radio .slds-radio_faux,
    .slds-radio .slds-radio--faux {
        border-color: #6a6797;
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
    
    footer h3 {
        color: #fff;
        border-top: 1px #fff solid;
        border-bottom: 1px #fff solid;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    
    .footer_wrapper footer {
        color: #fff;
        margin: 0 auto;
        overflow: hidden;
        width: 83%;
        max-width: 1310px;
        padding: 34px 50px;
    }
    
    .home_section2-content {
        width: 50%;
        justify-content: center;
        margin: auto;
    }
    
    .av_one_fourth {
        margin-left: 6%;
        /* width: 20.5%; */
        width: 29.5%;
    }
    
    .slds-button_purple {
        background: #6a6797;
        color: #fff;
        border: none;
        border-radius: 0;
        padding: 10px 10px 10px;
    }
    
    .slds-button_purple:hover {
        opacity: 0.7;
        background: #6a6797;
    }
    
    .slds-button_success:hover,
    .slds-button_success:focus,
    .slds-button--success:hover,
    .slds-button--success:focus {
        background: #6a6797;
        color: #fff;
    }
    
    .slds-button_purple2 .slds-button {
        background: #6a6797;
        color: #fff;
        border: none;
        border-radius: 7px;
    
        padding: 5px 16px 5px;
    }
    
    .slds-button_purple2 .slds-button:hover {
        opacity: 0.7;
        background: #6a6797;
    }
    
    .comm-page-home .footer_bottom {
        border-top: 1px solid #635332;
    }
    
    .footer_wrapper .footer_bottom {
        clear: both;
        color: #163249;
        font-size: 12px;
        min-height: 100px;
        position: relative;
        margin-top: 33px;
    }
    
    .comm-page-home .footer_wrapper .footer_bottom {
        margin-top: 65px;
    }
    
    .footer_nav {
        left: 0;
        position: absolute;
        top: 30px;
    }
    
    .footer_nav ul {
        list-style: none;
        overflow: hidden;
        padding: 0;
    }
    
    .footer_nav li {
        border-left: 1px solid #163249;
        float: left;
        line-height: 17px;
        padding: 0 10px;
    }
    
    .footer_nav li:first-child {
        border-left: none;
        padding-left: 0;
    }
    
    .copyright {
        background-color: #1e4766;
        font-size: 13px;
        padding-top: 15px;
        padding-bottom: 15px;
        display: flex;
    }
    
    .avia_hidden_link_text {
        display: none;
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
    
    .copyright-content a {
        color: #fff;
        -webkit-transition: all 0.3s ease-out;
        transition: all 0.3s ease-out;
    }
    
    .copyright-content i {
        color: #fff;
    }
    
    .copyright-content a:hover {
        text-decoration: underline;
    }
    
    .social_footer {
        position: absolute;
        right: 0;
        top: 20px;
    }
    
    .social_footer ul {
        list-style: none;
        overflow: hidden;
        padding: 0;
        padding-bottom: 10px;
    }
    
    .social_footer li {
        float: left;
        padding: 0 5px;
        color: #fff;
    }
    
    .copyright-content .social_icons {
        float: right;
        padding: 0;
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
    }
    
    [data-av_icon]:before {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: normal;
        content: attr(data-av_icon);
    
    }
    
    .copyright-content .social_icons .social_bookmarks_rss a:hover {
        color: #fff;
        background-color: #ffa133;
    }
    
    .copyright-content .social_bookmarks_youtube a:hover {
        color: #fff;
        background-color: #a72b1d;
    }
    
    .copyright-content .social_bookmarks_pinterest a:hover {
        color: #fff;
        background-color: #cb2027;
    }
    
    .copyright-content .social_bookmarks_facebook a:hover {
        color: #fff;
        background-color: #37589b;
    }
    
    .copyright-content .social_bookmarks_twitter a:hover {
        color: #fff;
        background-color: #022432;
    }
    
    .social_footer li img {
        width: 30px;
    }
    
    .social_result {
        position: absolute;
        top: 54px;
        right: 15px;
    }
    
    .social_result ul {
        list-style: none;
        overflow: hidden;
        padding: 0;
        padding-bottom: 10px;
    }
    
    .social_result li {
        float: left;
        padding: 0 5px;
    }
    
    .social_result li img {
        width: 30px;
    }
    
    .possition-r {
        position: relative;
    }
    
    .selfServiceProfileMenuTrigger .profileName {
        /* margin-right: 10px; */
        max-width: 100%;
        margin-right: 5px;
    }
    
    .dropdown-o-top .slds-dropdown {
        bottom: 38px !important;
        top: auto !important;
    }
    
    .page-notifications {
        margin-top: 50px;
    }
    
    .slds-popover_tooltip {
        display: none;
    }
    
    .uiPanel--notificationsPanel {
        top: 0px !important;
        left: 0 !important;
        width: 100% !important;
        border: 0;
        height: 100%;
        padding-top: 150px !important;
        background-color: rgba(0, 0, 0, 0.6);
    }
    
    .uiPanel--notificationsPanel .container {
        width: 980px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 15px;
        padding: 20px;
        min-height: 90%;
    
    }
    
    .uiPanel--notificationsPanel .titleContainer {
        width: 100%;
        border-bottom: 0;
        padding-left: 0;
        padding-right: 0;
    }
    
    .uiPanel--notificationsPanel .listContainer {
        width: 100% !important;
        background-color: #fff;
        border: 1px #6a6797 solid;
        border-radius: 7px;
        margin-top: 10px;
    }
    
    .unsNotificationsVirtualList {
        max-height: 55vh;
        min-height: 55vh;
    }
    
    .header-tooltip.north {
        display: none !important;
    }
    
    .uiTooltipAdvanced.advanced-wrapper.visible.tooltip {
        /* display: none !important; */
        opacity: 0;
    }
    
    .uiPanel--notificationsPanel .closeBtn {
        height: 32px;
        width: 32px;
        background: #6a6797 !important;
        border-radius: 50%;
        border: 3px #59567e solid !important;
        padding: 3px 3px;
        color: #fff !important;
        font-size: 24px !important;
        margin-top: -34px;
        margin-right: -34px;
    }
    
    .comm-page-detail-005 .mainCrowd-outer-box {
        padding-bottom: 0;
    }
    
    .help-img-text1 {
        color: #c4bea4;
        font-size: 35px;
        font-weight: 100;
    }
    
    .help-img-text1 span {
        display: block;
        margin-top: -32px;
        font-size: 56px;
    }
    
    .selfServiceUserProfileMenu .profileName,
    .selfServiceUserProfileMenu .down-arrow {
        display: inline-block;
    }
    
    .comm-page-custom-test .contentRegion,
    .comm-page-home .contentRegion {
        padding: 0 !important;
    }
    
    .comm-page-custom-test .contentRegion .home_promo,
    .comm-page-home .contentRegion .home_promo {
        margin: 0 auto;
        position: relative;
        width: 83%;
        padding: 0 50px 50px 50px;
    }
    
    .nav-right-buttons .slds-form-element__label {
        display: none;
    }
    
    .m-logout-link {
        display: none;
    }
    
    .inputbtn_lbl.slds-button {
        background-color: #fff !important;
        color: #000;
        pointer-events: none;
        box-shadow: none !important;
    }
    
    .mainCrowd-inner-box1 {
        position: relative;
    }
    
    .mainCrowd-inner-box1 .social_footer {
        top: auto;
        bottom: 20ox;
    }
    
    .game-dash-title {
        border-bottom: 1px #6a6797 solid;
        color: #000000;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        text-transform: capitalize;
        font-size: 33px;
        font-weight: 300;
        line-height: 38.5px;
        margin-top: 0;
        margin-bottom: 0;
    }
    
    /* .comm-page-custom-results .game-dash-title{
            color: #000000 ;
            font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
            text-transform: capitalize;
            font-size: 22px;
            font-weight: bold ;
            line-height: normal;
            margin-top: 0;
            margin-bottom: 0;
            border: none;
        } */
    .comm-page-custom-myresults .game-dash-title {
    
        margin-bottom: 20px;
        border: none;
    }
    
    .remove-Padding .slds-p-around_small {
        padding: 0;
    }
    
    .my-profile .right-link {
        font-size: 18px;
        position: absolute;
        right: 83px;
        top: 20px;
    }
    
    .slds-active .slds-tabs_scoped__link,
    .slds-active .slds-tabs--scoped__link,
    .slds-is-active .slds-tabs_scoped__link,
    .slds-is-active .slds-tabs--scoped__link {
        color: #000;
    }
    
    .slds-tabs_scoped__content,
    .slds-tabs--scoped__content {
        border-color: #948652;
    }
    
    .slds-active .slds-tabs_scoped__link:focus,
    .slds-active .slds-tabs--scoped__link:focus,
    .slds-is-active .slds-tabs_scoped__link:focus,
    .slds-is-active .slds-tabs--scoped__link:focus {
        text-decoration: none;
    }
    
    .slds-tabs_scoped__content,
    .slds-tabs--scoped__content {
        padding: 5px;
    }
    
    .copy-btn {
        top: 0;
        right: 0;
        z-index: 9999;
    }
    
    .hidden-text {
        position: absolute;
        left: -10px;
        top: -10px;
        width: 1px;
        height: 1px;
        opacity: 0;
    }
    
    .chartjs-render-monitor {
        z-index: 1;
        position: relative;
    }
    
    .game-chart-bg {
        position: relative;
        padding: 10px;
    }
    
    .game-chart-bg::after {
        content: "";
        background-image: url('/sfsites/c/resource/1619780842000/mindcrowd_style/images/chart_bg.svg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        opacity: 0.7;
        top: 16px;
        left: 56px;
        bottom: 39px;
        right: 13px;
        position: absolute;
        z-index: 0;
    }
    
    #education .game-chart-bg::after {
    
        bottom: 50px;
    }
    
    .disabled {
        pointer-events: none;
    }
    
    .speed-m-chart-box .chart-box {
        width: 33.3333333333%;
    
    }
    
    svg:not(:root) {
        overflow: visible !important;
    }
    
    .speed-m-chart-box {
        /* padding: 70px  10px 50px  10px ; */
        padding: 50px 20px 50px 0px;
        margin-bottom: 45px;
    }
    
    .mainCrowd-inner-box1 {
        width: 100%;
    }
    
    h3.title,
    .gameNote {
        font-size: 26px;
        margin-bottom: 10px;
        text-align: center;
        text-shadow: 0px 0px 2px rgb(0 0 0 / 24%);
        line-height: 34px;
        padding-bottom: 5px;
        text-transform: none;
    
    }
    
    h3.title span {
        font-weight: 600;
    }
    
    .game-lang {
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        border-top: 1px #cccccc solid;
        background-color: #d0d0d040;
        display: none;
    }
    
    .italic {
        font-style: italic;
    }
    
    .comm-page-custom-faq .home_promo_sponsors li img,
    .comm-page-custom-info-faq .home_promo_sponsors li img {
        height: 44px;
        width: auto;
    }
    
    .highlight {
        position: relative;
    
    }
    
    .highlight::after {
        content: '';
        position: absolute;
        /* width: 100%; */
        /* height: 55px; */
        border: red solid 4px;
        border-radius: 7px;
        left: -9px;
        top: -12px;
        right: -6px;
        bottom: -12px;
        transition: all 10s;
        animation: highlight 1s;
    
    }
    
    .n-g-box.big {
        display: inline-block;
        padding: 16px 40px;
        font-size: 50px;
    }
    
    .profile-row .radio-button-group-brainee fieldset,
    .profile-row .biological-sex-radioGroup fieldset {
        display: block;
    }
    
    .cParticipantGuestuserResults .social_result {
        padding: 5px 0;
        top: 0px;
        right: 0px;
        z-index: 10;
    
    }
    
    .cParticipantGuestuserResults .social_result ul {
        padding: 0;
    }
    
    #WhatHappensWithAge {
        position: relative;
    
    }
    
    .memoryTest::after {
        content: "";
        background-image: url('/sfsites/c/resource/1619780842000/mindcrowd_style/images/memory_test_groups.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        opacity: 1;
        top: 16px;
        left: 56px;
        bottom: 56px;
        right: 20px;
        position: absolute;
        z-index: 0;
    
    }
    
    .attentionTest::after {
        content: "";
        background-image: url('/sfsites/c/resource/1619780842000/mindcrowd_style/images/attention_test_groups.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        opacity: 1;
        top: 16px;
        left: 68px;
        bottom: 56px;
        right: 20px;
        position: absolute;
        z-index: 0;
    
    }
    
    /* .comm-page-login-home .login-button,
        .comm-page-forgot-password .login-button,
        .comm-page-login-error .login-button,
        .comm-page-custom-vipaccess .login-button{
            display: none;
        
        } */
    /* -----------Mobile----------- */
    .m-menu-btn {
        display: none;
    }
    
    .wp-animation {
        background-image: url('/sfsites/c/resource/1619780842000/mindcrowd_style/images/wordPairs_ani2.gif');
        background-repeat: no-repeat;
        background-position: left center;
        position: relative;
        top: 3px;
    }
    
    .comm-page-custom-studies .top-banner-button,
    .comm-page-custom-studies .nav-right-buttons {
        display: none;
    }
    
    .home-page-button {
        background-color: #fff;
        font-size: 24px;
        border-left: 5px solid #c7c7c7;
        border-bottom: 5px solid #c7c7c7;
        border-top: 5px solid #fff;
        border-right: 5px solid #fff;
        border-radius: 7px;
        color: #163249;
        position: relative;
        text-transform: uppercase;
        height: 50px;
        padding: 0px 30px 0 16px;
        margin-right: 10px;
    }
    
    .home-page-button:hover {
        background: #f7f7f7;
    }
    
    .s-b-instraction {
        position: absolute;
        bottom: 5px;
        right: 15px;
        font-size: 26px;
    }
    
    /* .comm-page-custom-results .result-submit,
        .comm-page-custom-results .link{
         display: none !important;
        
        } */
    
    .comm-page-custom-results .info-submit {
        display: block !important;
    
    }
    
    .example-box .txt_input {
        border: 0px;
        font-size: 50px;
    }
    
    .example-box .txt_placeholder::placeholder {
      font-size: 30px;
      color: rgb(200, 200, 200);
      transition: font-size 0.1s ease-in-out;
    }
    
    .txt_input {
        max-width: 230px;
        border: 0px;
        padding: 0;
    
    
    }
    
    .txt_input:focus {
        outline: none;
        outline: none;
    }
    
    .game_block #nextBtton .slds-button {
        padding: 10px 30px 10px !important;
        font-size: 26px !important;
        border-radius: 5px !important;
    }
    
    .game_block #nextBtton .slds-button:first-child {
        margin-right: 20px;
    }
    
    .example-row {
        display: flex;
        justify-content: center;
        line-height: unset !important;
    }
    
    .example-box {
        min-width: 656px;
        height: 100px;
        display: inline-block;
    }
    
    .font34.title {
        font-size: 34px !important;
    }
    
    .keep-track-ul .slds-button {
        font-size: 24px !important;
        padding: 15px 5px 15px !important;
        min-width: 100%;
        text-align: center;
        display: inline-block;
    }
    
    .fake-news-ul .slds-button {
        font-size: 22px !important;
        padding: 15px 5px 15px !important;
        min-width: 100%;
        text-align: center;
        display: inline-block;
    }
    
    h3.title .n-g-box,
    div.title .n-g-box {
        background-color: transparent;
        border: 0;
        box-shadow: none;
        padding: 0;
        font-size: 26px;
        margin: 0;
        display: inline;
        /* color: #000; */
    }
    
    .marginB0 {
        margin-bottom: 0 !important;
        padding-bottom: 0;
    }
    
    .paddingB24 {
        padding-bottom: 24px;
    }
    
    /* .study {padding-bottom: 40px !important;} */
    .errorblock {
        position: absolute;
        top: 20px;
        left: 0;
        width: 100%;
        text-align: center;
    
    }
    
    .comm-page-custom-shapes,
    .comm-page-custom-objects,
    .comm-page-custom-wordpairsgame,
    .comm-page-custom-reactgame,
    .comm-page-custom-flanker,
    .comm-page-custom-facenamegame,
    .comm-page-custom-numberletter,
    .comm-page-custom-keeptrack,
    .comm-page-custom-me-objects-temporal,
    .comm-page-custom-me-objects-spatial,
    .comm-page-custom-me-speech-tasks,
    .comm-page-custom-me-speech-task-tellme-more,
    .comm-page-custom-me-fakenews,
    .comm-page-custom-me-digitsymbol,
    .comm-page-custom-me-this-and-that {
        padding-top: 46px;
    }
    
    .comm-page-custom-shapes .slds-builder-header_container,
    .comm-page-custom-objects .slds-builder-header_container,
    .comm-page-custom-wordpairsgame .slds-builder-header_container,
    .comm-page-custom-reactgame .slds-builder-header_container,
    .comm-page-custom-flanker .slds-builder-header_container,
    .comm-page-custom-facenamegame .slds-builder-header_container,
    .comm-page-custom-numberletter .slds-builder-header_container,
    .comm-page-custom-keeptrack .slds-builder-header_container,
    .comm-page-custom-me-fakenews .slds-builder-header_container,
    .comm-page-custom-me-speech-tasks .slds-builder-header_container,
    .comm-page-custom-me-speech-task-tellme-more .slds-builder-header_container,
    .comm-page-custom-me-digitsymbol .slds-builder-header_container,
    .comm-page-custom-me-this-and-that .slds-builder-header_container {
        display: none;
        padding-top: 0;
    }
    
    .comm-page-custom-shapes .main-content-inner,
    .comm-page-custom-objects .main-content-inner,
    .comm-page-custom-wordpairsgame .main-content-inner,
    .comm-page-custom-reactgame .main-content-inner,
    .comm-page-custom-flanker .main-content-inner,
    .comm-page-custom-facenamegame .main-content-inner,
    .comm-page-custom-numberletter .main-content-inner,
    .comm-page-custom-keeptrack .main-content-inner,
    .comm-page-custom-me-objects-temporal .main-content-inner,
    .comm-page-custom-me-objects-spatial .main-content-inner,
    .comm-page-custom-me-speech-tasks .main-content-inner,
    .comm-page-custom-me-speech-task-tellme-more .main-content-inner,
    .comm-page-custom-me-fakenews .main-content-inner,
    .comm-page-custom-me-digitsymbol .main-content-inner,
    .comm-page-custom-me-this-and-that .main-content-inner  {
        min-height: 90vh;
        width: auto;
    }
    
    .logo-game {
        position: absolute;
        right: 16px;
        top: -46px;
        background-color: #12233e;
        border-radius: 7px 7px 0px 0px;
        padding: 5px 10px;
    }
    
    .logo-game img {
        height: 35px;
    }
    
    .marginB-set {
        margin-bottom: -60px !important;
    }
    
    .keep-track-ul .inputtexttwo:focus,
    .keep-track-ul .inputbtn_lbl:focus {
        border: 1px #ccc solid;
        outline: none;
    
    }
    
    .fa-facebook,
    .fa-facebook-square {
        color: #4267B2
    }
    
    .fa-twitter,
    .fa-twitter-square {
        color: #1DA1F2
    }
    
    .fa-pinterest,
    .fa-pinterest-square {
        color: #E60023
    }
    
    .fa-linkedin,
    .fa-linkedin-square {
        color: #2867B2
    }
    
    .fa-instagram {
        color: #C13584;
    }
    
    .fa-envelope {
        color: rgb(184, 184, 184);
    }
    
    .home_progress i,
    .footer-s-icon {
        font-size: 42px;
    }
    
    .copyright .social_icons {
        float: right;
    }
    
    .social_icons.footer-s-icon .social_bookmarks_facebook {
        background-color: #4267B2;
        flex-basis: calc(33% - 4px);
        padding: 0;
    
    }
    
    .thumb-img-box .slds-col {
        cursor: pointer;
    }
    
    .thumb-img-box .slds-col:hover {
        opacity: 0.8;
    }
    
    .social_icons.footer-s-icon .social_bookmarks_twitter {
        background-color: #01151e;
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
    
    .social_icons.footer-s-icon .social_bookmarks_instagram {
        background-color: #C13584;
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
    
    .slider.social_icons.footer-s-icon {
        max-width: 400px;
        margin: auto;
    }
    
    .slider.social_icons.footer-s-icon li {
        margin-left: 10px;
    }
    
    .social_icons.footer-s-icon li:hover {
        filter: saturate(1.5) brightness(1.2);
    }
    
    .social_icons.footer-s-icon a {
        display: block;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    
    .social_icons.footer-s-icon a,
    .social_icons.footer-s-icon i {
        font-size: 26px;
        color: #fff;
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
    
    #top .av-special-heading.av-6zmq0-1889fbc6c7efdb28faaef6c3f7dd524c {
        padding-bottom: 0px;
        font-size: 45px;
    }
    
    .av-special-heading.av-6zmq0-1889fbc6c7efdb28faaef6c3f7dd524c .av-subheading {
        font-size: 15px;
    }
    
    #top #wrap_all .avia-button.av-9ws7s-3fd9240742785e883a9c77b6761bca10 {
        background-color: #ea526e;
        border-color: #ea526e;
        color: #ffffff;
        transition: all 0.4s ease-in-out;
        -webkit-transition: all 0.4s ease-in-out;
        -moz-transition: all 0.4s ease-in-out;
        -ms-transition: all 0.4s ease-in-out;
        -o-transition: all 0.4s ease-in-out;
    }
    
    .av_font_icon.av-k8jmexyk-383f5a821c789a1c017819a0d25a5f47 {
        color: #ffffff;
        border-color: #ffffff;
    }
    
    .av_font_icon.av-k8jmexyk-383f5a821c789a1c017819a0d25a5f47 .av-icon-char {
        font-size: 40px;
        line-height: 40px;
    }
    
    #top .hr.hr-invisible.av-k8jmo68h-38ae91286f00bef9e03ba08823af07d1 {
        height: 10px;
    }
    
    #top .hr.hr-invisible.av-k8jmo68h-38ae91286f00bef9e03ba08823af07d1 {
        height: 10px;
    }
    
    #top .hr.hr-invisible.av-k8jmo68h-38ae91286f00bef9e03ba08823af07d1 {
        height: 10px;
    }
    
    #top .hr.hr-invisible.av-k8jmo68h-38ae91286f00bef9e03ba08823af07d1 {
        height: 10px;
    }
    
    #top .hr.hr-invisible.av-k8jmo68h-38ae91286f00bef9e03ba08823af07d1 {
        height: 10px;
    }
    
    #top .hr.hr-invisible.av-k8jmo68h-38ae91286f00bef9e03ba08823af07d1 {
        height: 10px;
    }
    
    .av_font_icon.av-k8jmexyk-02d1941adf37f73f648f31ad52d1cd8b {
        color: #ffffff;
        border-color: #ffffff;
    }
    
    .av_font_icon.av-k8jmexyk-02d1941adf37f73f648f31ad52d1cd8b .av-icon-char {
        font-size: 40px;
        line-height: 40px;
    }
    
    .av_font_icon.av-k8jmexyk-6540364130af5a89a493244ec1c32c67 {
        color: #ffffff;
        border-color: #ffffff;
    }
    
    .av-icon {
        font-size: 40px;
        line-height: 40px;
    }
    
    #top .av-special-heading.av-6sjbk-ae62bcf709c6f885a891f947c0b50b11 {
        padding-bottom: 33px;
    }
    
    .avia-image-container.av-k8kl9fdc-2c3abe0ff91504e264fd4e095758a247 .av-image-caption-overlay-center {
        color: #ffffff;
    }
    
    .av_font_icon.av-k8jmexyk-6540364130af5a89a493244ec1c32c67 {
        color: #ffffff;
        border-color: #ffffff;
    }
    
    .avia-font-flaticon,
    html body [data-av_iconfont='flaticon']:before,
    .av-icon {
        font-family: 'flaticon';
    }
    
    .av-icon:before {
        font-family: 'flaticon';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: normal;
        content: attr(data-av_icon);
    
    }
    
    .av-icon2,
    .av-icon2::before {
        font-family: 'entypo-fontello';
        font-size: 40px;
        line-height: 40px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: normal;
        content: attr(data-av_icon);
    }
    
    .avia-font-entypo-fontello,
    [data-av_iconfont='entypo-fontello']:before {
        font-family: 'entypo-fontello';
    }
    
    .color-w {
        color: #fff !important;
    }
    
    .comm-page-custom-results .home_section3 {
        width: 100%;
        padding: 0px 0px 20px;
    }
    
    .player {
        width: 100%;
    
    }
    
    /* .top-banner-button */
    .marginT19 {
        margin-top: 19px;
    }
    
    .comm-page-custom-studies .contentRegion {
        padding: 0;
    }
    
    .steps .slds-col {
        position: relative;
    }
    
    .d-img {
        display: inline-block;
    }
    
    .m-img {
        display: none;
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
    
    .av_one_fourth {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
    
    .gall-thumb-img img,
    .main-img img {
        -webkit-box-shadow: 0px 0px 15px 0px rgb(0 0 0 / 40%);
        box-shadow: 0px 0px 15px 0px rgb(0 0 0 / 40%);
    }
    
    .img-text p,
    .name-blow-text span,
    .img-text span {
        line-height: normal;
    }
    
    
    
    .gall-button {
        position: absolute;
        bottom: 0;
        left: 20px;
    }
    
    .possition-r {
        position: relative;
    }
    
    /* .lang-es{display: none;} */
    
    /* [lang*="en-US"] .lang-es{
            display: none;
        }
        [lang*="es"] .lang-en_US{
            display: none;
        } */
    
    c-cookie-consent {
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
    
    .c-lable {
        font-weight: 600 !important;
    }
    
    .marginL30 {
        margin-left: 30px;
    }
    
    .margin0 {
        margin: 0px !important;
    }
    
    .mobile-text {
        display: none;
    }
    
    .upperCase {
        text-transform: uppercase !important;
    }
    
    .slds-form-element__help {
        display: none;
    }
    
    .desktop-text {
        text-align: justify;
        line-height: normal;
    }
    
    .mobile-table {
        display: none;
    }
    
    .desktop-text1 {
        overflow: auto;
    }
    
    .comm-page-custom-page1,
    .comm-page-custom-page2,
    /* .comm-page-custom-page3,
        .comm-page-custom-page4,
        .comm-page-custom-page5,
        .comm-page-custom-page6, */
    /* .comm-page-custom-attentiontestcomplete, */
    .comm-page-custom-m-page1
    
    /* .comm-page-custom-page3-1,
        .comm-page-custom-page4-1,
        .comm-page-custom-page5-1,
        .comm-page-custom-page6-1,
        .comm-page-custom-page7-1,
        .comm-page-custom-page8-1,
        .comm-page-custom-page9-1,
        .comm-page-custom-m-page2,
        .comm-page-custom-m-page3,
        .comm-page-custom-m-page4,
        .comm-page-custom-m-page5,
        .comm-page-custom-m-page6,
        .comm-page-custom-m-page7,
        .comm-page-custom-m-page8,
        .comm-page-custom-m-page9 */
        {
        padding-top: 70px;
    }
    
    .comm-page-custom-page2,
    .comm-page-custom-page3,
    .comm-page-custom-page4,
    .comm-page-custom-page5,
    .comm-page-custom-page6,
    .comm-page-custom-attentiontestcomplete,
    
    .comm-page-custom-page3-1,
    .comm-page-custom-page4-1,
    .comm-page-custom-page5-1,
    .comm-page-custom-page6-1,
    .comm-page-custom-page7-1,
    .comm-page-custom-page8-1,
    .comm-page-custom-page9-1,
    .comm-page-custom-page2-1,
    .comm-page-custom-m-page2,
    .comm-page-custom-m-page3,
    .comm-page-custom-m-page4,
    .comm-page-custom-m-page5,
    .comm-page-custom-m-page6,
    .comm-page-custom-m-page7,
    .comm-page-custom-m-page8,
    .comm-page-custom-m-page9,
    .comm-page-custom-memorygametestcompleted {
        padding-top: 110px;
    }
    
    
    
    
    
    
    
    
    .comm-page-custom-dlrts,
    .comm-page-custom-pairedgame {
        padding-top: 70px;
    }
    
    .paddingT0 {
        padding-top: 0;
    }
    
    .mainContentArea .contentRegion {
        padding-left: 0;
        padding-right: 0;
        padding-top: 0 !important;
    }
    
    .comm-page-custom-testlanguage {
        padding-top: 130px;
    }
    
    .nomal-text {
        text-transform: capitalize;
    }
    
    .cMindCrowdCommunityThemeNoMenu {
        padding-top: 10px;
    }
    
    .comm-page-custom-gamepoc {
        padding-top: 150px;
    }
    
    .btninputbox.ins-btn {
        margin-bottom: -92px;
        position: relative;
        width: 100%;
    }
    
    .img-f-select {
        background-color: #02bb24;
        border-radius: 7px;
        background-size: 90% !important;
    }
    
    .set-input-width .slds-form-element,
    .set-input-width .slds-form-element__control {
        width: 100% !important;
    }
    
    .marginLR-auto {
        margin-left: auto !important;
        margin-right: auto !important;
    }
    
    .gall-thumb-img img,
    .main-img img {
        width: 100%;
    
    }
    
    .errorblock p {
        line-height: normal !important;
        padding: 0 !important;
        margin: 0 !important;
    }
    
    .facegame .label {
        line-height: normal !important;
        padding: 0 !important;
        margin: 5px 0 5px 0 !important;
    }
    
    .n-g-box2 {
        margin-bottom: 20px;
    }
    
    .brainInfo .slds-checkbox__label .slds-form-element__label {
        width: 100%;
    }
    
    .slds-radio .slds-radio__label,
    .slds-checkbox .slds-checkbox__label {
        display: inline;
    }
    
    .inner-title {
        color: #163248;
        font-family: 'Varela Round', Helvetica, Arial, sans-serif;
        font-weight: normal;
        text-transform: uppercase;
        font-size: 33px;
        line-height: 38.5px;
        /* margin: 0; */
    }
    
    .w-title {
        color: #fff;
        font-family: 'Varela Round', Helvetica, Arial, sans-serif;
        font-weight: normal;
        font-size: 33px;
        line-height: 38.5px;
    }
    
    .result-p-title {
        color: #fff;
        font-family: 'Varela Round', Helvetica, Arial, sans-serif;
        font-weight: normal;
        font-size: 40px;
        line-height: 50.5px;
    }
    
    .result-logo-img {
        margin-bottom: -100px;
    }
    
    .result-logo-img img {
        width: 100%;
    }
    
    .remove-label .slds-form-element__label {
        display: none !important;
    }
    
    .comm-page-custom-objects .game_panel {
        padding-bottom: 110px;
    }
    
    .comm-content-footer {
        position: absolute;
    }
    
    div.title {
        font-size: 26px;
        /* border-bottom: 1px #afafaf solid; */
        margin-bottom: 10px;
        text-align: center;
        text-shadow: 0px 0px 2px rgb(0 0 0 / 24%);
        line-height: 34px;
        padding-bottom: 5px;
        text-transform: none;
        font-family: 'whitneylight', Helvetica, Arial, sans-serif;
        font-weight: 300;
        color: #163248;
    }
    
    div.title span {
        font-weight: 600;
        white-space: normal;
    }
    
    .sub-title {
        color: #163248;
        font-family: 'Varela Round', Helvetica, Arial, sans-serif;
        font-weight: normal;
        text-transform: uppercase;
        font-size: 33px;
        line-height: 38.5px;
        margin: 0;
    }
    
    .require abbr {
        display: none;
    }
    
    .require .slds-form-element__label::after {
        content: '*';
        font-size: 20px;
        color: red;
    
        display: contents;
    
    }
    
    .require .slds-radio .slds-form-element__label::after,
    .require .slds-checkbox .slds-form-element__label::after {
        display: none;
    
    }
    
    .game-tiles-box .slds-grid {
        justify-content: center;
    }
    
    /* .brainInfo .slds-required{
        float: unset;
        position: absolute;
        left: -11px;
        top: 8px;
    } */
    .home-h2 {
        color: #163248;
        font-family: 'whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 50px;
        text-transform: uppercase;
        line-height: normal;
    }
    
    .gall-button {
        bottom: 0;
        left: 20px;
        position: relative;
    }
    
    .home_progress .homepage-text {
        font-size: 22px;
    }
    
    .icon-in-text .game-tiles-lock-icon .slds-icon {
        width: 16px;
        height: 16px;
    }
    
    .icon-in-text .game-tiles-lock-icon {
        padding: 2px 5px 5px 5px;
    }
    
    /* .mainContentArea{
        min-height: 77.1vh;
    } */
    .word-break-none {
        white-space: nowrap !important;
        font-weight: normal !important;
    }
    
    .nav-notification-link .slds-global-actions__notifications {
        width: 100%;
    }
    
    .set-w-50 {
        min-width: 250px;
    }
    
    .orientation-modal {
        height: 100vh;
    }
    
    .orientation-modal .slds-modal__container {
        padding: 0;
    }
    
    .orientation-modal .slds-modal__content {
        height: 100%;
    }
    
    .m-auto {
        margin: auto
    }
    
    c-home-section1 {
        position: relative;
    }
    
    .languageBanner {
    
        position: absolute;
        width: 100%;
        top: 30px;
        display: flex;
        justify-content: center;
        margin: auto;
        left: 0;
        right: 0;
        margin-bottom: 30px;
    
    }
    
    .languageBanner-content {
        background-color: #1e4766;
        color: #FFF;
        width: 83%;
        justify-content: center;
        margin: auto;
        padding: 10px 10px;
        position: relative;
        border-radius: 4px;
        text-align: center;
        line-height: 24px;
    }
    
    .bannerClose-btn {
        position: absolute;
        right: -15px;
        top: -15px;
    
    }
    
    .bannerClose-btn .slds-button {
        background: #6a6797;
        border-radius: 50%;
        border: 3px #59567e solid;
        padding: 3px 3px 5px;
    }
    
    /* .slds-form-element, button, input {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
    
    } */
    .donate-textbox {
        background-color: #1e4766;
        border: 1px #6a6797 solid;
        border-radius: 7px;
        padding: 35px 50px 20px;
        position: relative;
        color: #fff;
    }
    
    .donate-textbox p {
        font-size: 18px;
    }
    
    c-donate .dark-blue-btn {
        background-color: #1e4766;
        text-transform: capitalize;
        font-size: 16px;
    
    }
    
    c-donate .dark-blue-btn:hover {
        background-color: #6a6797;
    
    }
    
    .donate-textbox h3 {
        color: #fff;
    }
    
    .w-color {
        color: #fff;
    }
    
    .policy-link {
        color: #fff;
    }
    
    .policy-link:hover {
        color: #fff;
        text-decoration: underline;
    }
    
    .mt-2 {
        margin-top: 15px;
    }
    
    .blue-btn .link {
        padding: 15px 15px 13px;
        font-size: 18px;
        min-width: 139px;
        background-color: #1e4463;
        border-color: #1e4463;
        color: #ffffff;
        font-family: 'Whitneybook', Helvetica, Arial, sans-serif;
        font-weight: 400;
        line-height: 1.2em !important;
        position: relative;
        text-align: center;
        max-width: 100%;
        font-style: normal;
        border-radius: 7px;
        text-decoration: none;
    }
    
    .pink-btn-box .slds-button {
        padding: 15px 15px 13px;
    }
    
    .blue-btn .link:hover {
        background-color: #0e283d;
    }
    
    .btn__game-time-center {
        font-size: 36px;
    }
    
    .m-setting-bInfo-button p {
        position: absolute;
        left: 1px;
        max-width: 33%;
        top: 0;
    }
    
    .slds-backdrop-game-tiles {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -8px;
        right: 0;
        bottom: 0;
        left: 0;
        /* background: #ffffffc4; */
        background: var(--slds-c-backdrop-color-background, var(--sds-c-backdrop-color-background, var(--lwc-colorBackgroundTempModalTint, rgba(8, 7, 7, 0.6))));
        z-index: 12;
        visibility: visible;
        opacity: 1;
    }
    
    .game-blocked {
        margin: 10px;
        background: #fff;
        padding: 20px 10px;
        border-radius: 5px;
    }
    .border-radius{border-radius: 3px;}
    .modal-list{
        list-style: circle;
        padding-left: 30px;
    }
    .slds-modal__footer .pink-btn-box.marginL0 .slds-button {
        margin-left: 0;
    }
    .longitgraph{
        position: relative;
            height:60vh;
    }
    @media print {
    
        .slds-context-bar,
        .slds-builder-header_container,
        .footerArea {
            display: none;
        }
    
        .print {
            display: none;
        }
    
        .slds-global-header,
        .slds-global-footer {
            display: none;
        }
    
        .slds-color__background_gray-1 {
            display: none;
        }
    
        .slds-global-header_container,
        .slds-global-footer_container {
            display: none;
    
        }
    
        .slds-no-print {
            display: none;
        }
    
        .logo-container {
            display: none;
        }
    
        body {
            padding-top: 0;
        }
    
        .copyright,
        .copyright-content {
            display: none !important;
        }
    }
    
    .text-normal {
        text-transform: unset !important;
    }
    
    .l-title {
        color: #163248;
        font-family: 'Varela Round', Helvetica, Arial, sans-serif;
        font-weight: normal;
        text-transform: none;
        /* line-height: 49.5px; */
        display: inline-block;
        margin-top: 30px;
        text-align: center;
        width: 100%;
    
        font-size: 33px;
        line-height: 38.5px;
    }
    
    .result-title {
        color: #000;
        font-family: 'Whitneybook';
        text-transform: uppercase !important;
        font-size: 40px;
        text-align: left;
        font-weight: 400;
        margin: 70px 0 40px;
    }
    
    .set-w-100 {
        width: 100%;
    }
    
    .set-w-100 .slds-form-element {
        width: 100%;
    }
    
    .change-pwd-error-bg {
        z-index: 9001;
    }
    
    .change-pwd-error-window {
        z-index: 9999;
    }
    
    .bt-0 {
        border-bottom: 0 !important;
        margin-bottom: 0 !important;
    }
    
    /* STYLES HERE */
    
    /* @media screen and (max-device-width:1366px), screen and (max-width:1396px) { */
    
    .pl-2 {
        padding-left: 20px;
    }
    
    .pl-3 {
        padding-left: 30px;
    }
    
    .mr-4 .slds-form-element__legend {
        margin-right: 45px;
    }
    
    /* .instructionsLeft{
            display: inline-block;
            margin: 50px 0;
        }
        .instructionsLeft .title{
            text-align: left;
        } */
    
    
    .instructionsLeft {
        width: 85%;
    }
    
    .comm-page-custom-consent c-cookie-consent {
        z-index: 99999;
    }
    
    .emailContributors-logo {
        display: inline-block;
        margin-top: 30px;
    }
    
    .keep-track-ul li .slds-button:hover {
        background-color: rgb(233, 233, 233) !important;
        color: #1e4463;
    }
    
    .fake-news-ul li .slds-button:hover {
        background-color: rgb(233, 233, 233) !important;
        color: #1e4463;
    }
    
    .comm-page-custom-keeptrack .inputbtn:active {
    
        background-color: #fff !important;
        border: 1px solid #cf445e !important;
    
    }
    
    .comm-page-custom-testlanguage .top-banner-button {
        display: none !important;
    }
    .slds-input[readonly] {
        --slds-c-input-spacing-horizontal-start: unset;
    }
    @media (max-width: 1496px) {
        .vip-text-2 {
            padding-left: 5px;
            padding-right: 5px;
        }
    
        .player {
            width: 100%;
            /* height: 341px; */
        }
    
        .instractionb.box4 div,
        .box4 div,
        .btninput1,
        .comm-page-custom-reactgame .game_panel img {
            height: 170px;
            width: 170px;
        }
    
        .comm-page-custom-reactgame .btninputbx li {
            width: 170px;
        }
    
        .faceImg {
            width: 220px !important;
        }
        
        .camelImg {
            width: 150px !important;
            height: 100px !important;
        }
        .camelBtn {
            margin-right: 20px;
        }
    
        .cFaceNameGame .face3Container .faceImg {
            width: 200px !important;
        }
    
        .facegame .btn {
            width: 193px !important;
            min-width: 193px;
        }
    
        .faceimg-box .n-g-box2 {
            min-height: 300px;
        }
    
        /* .keep-track-ul li {
                min-width: 123px;
            }
            .keep-track-ul.tow-buttons li{
                width: 29.66666%;
            } */
    
    
    }
    
    @media (max-width: 1360px) {
    
        /* .keep-track-ul li {
                min-width: 123px;
            }
            .keep-track-ul.tow-buttons li{
                width: 29.66666%;
            } */
        .player {
            width: 100%;
            /* height: 341px; */
        }
    
        .instractionb.box4 div,
        .box4 div,
        .btninput1,
        .comm-page-custom-reactgame .game_panel img {
            height: 170px;
            width: 170px;
        }
    
    
    }
    
    @media (max-width: 1280px) {
    
        /* .keep-track-ul li {
                min-width: 123px;
            } */
        .player {
            width: 100%;
            /* height: 314px; */
        }
    
        /* .keep-track-ul.tow-buttons li{
                width: 31.66666%;
            } */
        .desktop-text1 {
            overflow: auto;
            bottom: 0px;
        }
    
        .instractionb.box4 div,
        .box4 div,
        .btninput1,
        .comm-page-custom-reactgame .game_panel img {
            height: 150px;
            width: 150px;
        }
    
        .game_block {
            padding: 16px 60px 20px;
        }
    
    }
    
    @media (max-width: 1152px) {
    
        /* .keep-track-ul li {
                min-width: 123px;
            } */
        .player {
            width: 100%;
        }
    
        .desktop-text1 {
            overflow: auto;
            bottom: -5px;
        }
    
        .instractionb.box4 div,
        .box4 div,
        .btninput1,
        .comm-page-custom-reactgame .game_panel img {
            height: 150px;
            width: 150px;
        }
    
        .keep-track-ul .slds-button {
            min-width: 100%;
            text-align: center;
            display: inline-block;
            font-size: 20px !important;
            padding: 15px 5px !important;
        }
        
        .fake-news-ul .slds-button {
            min-width: 100%;
            text-align: center;
            display: inline-block;
            font-size: 20px !important;
            padding: 15px 5px !important;
        }
        
        .camel-cactus-ul .slds-button {
            min-width: 100%;
            text-align: center;
            display: inline-block;
            font-size: 20px !important;
            padding: 15px 5px !important;
        }
    
    }
    
    @media (max-width: 1024px),
    (max-width: 1229px) {
        .av_one_fourth {
            font-size: 16px;
        }
    
        .player {
            width: 100%;
            /* height: 247px; */
        }
    
        .mainContentArea {
            width: 95%;
        }
    
        .desktop-text1 {
            overflow: auto;
            bottom: -5px;
        }
    
        .instractionb.box4 div,
        .box4 div,
        .btninput1,
        .comm-page-custom-reactgame .game_panel img {
            height: 150px;
            width: 150px;
        }
    
        .comm-page-custom-reactgame .btninputbx li {
            width: 150px;
            margin: 0;
        }
    
        .cParticipantGuestUserGameDashboard .graph-double {
            top: 13px;
        }
    
        .home_section1,
        .home_section2-content {
            width: 75%;
        }
    
        .home_section3 {
            padding: 31px 0px;
        }
    
        .content {
            padding: 0;
        }
    
        .home_section4 .home_section4-col1 {
            width: 55%;
        }
    
        .home_section4 .home_section4-col2 {
            width: 45%;
        }
    
        .comm-page-home .home_promo {
            padding: 0 0px 50px 0px !important;
        }
    
        .gall-button {
            top: 12px;
        }
    
        .footer_wrapper footer {
            padding: 34px 0px;
        }
    
        .gall-thumb-img .slds-col {
            padding-left: 12px;
            padding-right: 12px;
        }
    }
    
    
    .m-button {
        display: none;
    }
    
    .notifications .tooltip-invisible {
        display: none !important;
    }
    
    /* .slds-header-empty{padding: 0;}
        .slds-modal__content {
            padding: 45px 45px 45px;
        } */
    .small-text {
        font-size: 16px;
    }
    
    .mt-30 {
        margin-top: 30px;
    }
    
    .std-j-center {
        display: flex;
    }
    
    .std-f-row {
        min-height: 100px;
    }
    
    .mb-20 {
        margin-bottom: 20px;
    }
    
    @media (max-width: 1024px) {
        .comm-page-custom-finish .slds-m-top_large.m-full-width {
            text-align: center;
            float: none;
        }
    }
    
    @media (max-width: 916px) {
        .comm-page-custom-me-objects-temporal .objbox {
            height: 54vh;
        }
    }
    
        .two-button-set li{
            width: 50%;
            padding: 35px !important;
            margin: 0 !important;
            text-align: center;
        }
            
        .two-button-set li .tabButtons{
            margin: 0 auto !important;
            padding: 0 !important;
        }
        
        .four-button-set li{
            width: 25%;
            padding: 15px !important;
            margin: 0 !important;
            text-align: center;
        }
            
        .four-button-set li .tabButtons{
            margin: 0 auto !important;
            padding: 0 !important;
        }
            
        .two-button-set2 li{
                    padding-left: 25px; !important;
                    padding-right: 25px; !important;    
        }        
        
        .four-button-set2 li {
                  padding-left: 2.5px; !important;
                padding-right:2.5px; !important;
                margin: 0 !important;
        }
    @media (max-width: 768px) {
            .longitgraph{
                    width:60vh;
                    height:60vh;
            }
    }
    @media (max-width: 768px),
    (max-width: 900px) {
        .m-paddingLR20 .slds-button{
            padding-left: 20px;
            padding-right: 20px;
        }
        .m-setting-bInfo-button p {
            position: relative !important;
            max-width: 100%;
        }
    
        .cMindCrowCompainTheme .magenta-btn .slds-button {
            min-width: 120px;
        }
    
        .cAttentiontestPage4 .game_block,
        .cAttentiontestPage6 .game_block {
            min-height: 356px;
        }
    
        .orientation-modal {
            right: 0 !important;
            left: 0 !important;
        }
    
        .keep-track-ul li .slds-button:hover {
            background-color: #fff !important;
            color: #1e4463;
        }
        
        .fake-news-ul li .slds-button:hover {
            background-color: #fff !important;
            color: #1e4463;
        }
    
        .comm-page-custom-keeptrack .inputbtn:active {
    
    
            background-color: rgb(233, 233, 233) !important;
            border: 1px solid #cf445e !important;
    
        }
    
        .std-j-center {
            display: inline-block;
        }
    
        .std-j-center .slds-col {
            display: inline-block;
            width: 100%;
            padding-left: 0;
        }
    
        .mb-0 {
            margin-bottom: 0 !important;
        }
    
        .std-f-row {
            min-height: auto;
            width: 100%;
        }
    
        .studies .form {
            padding: 20px 20px;
        }
    
        .studies .result-btn {
            text-align: center;
        }
    
    
        .slds-modal {
            right: 15px;
            left: 15px;
        }
    
        .languageBanner {
            position: unset;
        }
    
        .languageBanner-content {
            width: 100%;
        }
    
        .cObjects .objque {
            top: 12px;
            height: 80%;
        }
    
        .cMdto .objbox {
            height: 54vh;
        }
    
        .example-box {
            position: relative;
            min-width: 100%;
        }
    
        .comm-page-custom-vipaccess,
        .comm-page-custom-passwordrecovery,
        .comm-page-custom-checkpasswordrecoveryemail {
            padding-top: 82px;
        }
    
        .mobile-table .gall-thumb-img.marginT10 {
            margin-top: 25px;
        }
    
        .d-button {
            display: none;
        }
    
        .m-button {
            display: block;
            text-align: center;
            width: 100%;
            margin: auto;
            float: none;
            padding: 0;
            margin-bottom: 10px;
        }
    
        .instructionsLeft {
            width: 100%;
        }
    
        .consent-form-item-row .slds-form-element {
            margin-top: 3px;
        }
    
        .slds-radio_faux {
            margin: 7px 3px 3px 3px;
        }
    
        .brainInfo .slds-form-element .slds-form-element__label,
        .brainInfo .slds-form-element .slds-form-element__control {
            width: 100%;
        }
    
        .slds-radio .slds-radio__label,
        .slds-checkbox .slds-checkbox__label {
            display: inline-flex;
        }
    
        .mainCrowd-inner-box .slds-checkbox_faux {
            margin: 6px 3px 3px 0;
        }
    
        .slds-modal.ssm {
            width: auto;
        }
    
        /* .cNumberLetterGame .btninputbx li{
                margin-right: 5px !important;
                    margin-left: 5px !important;
            }
            .btninputbx li {
                font-size: 16px !important;
            } */
        .cNumberLetterGame .btninputbx li:first-child {
            margin-right: 0px !important;
        }
    
        .slds-listbox__option .slds-media__body span {
            word-break: break-word;
            text-overflow: unset;
            white-space: break-spaces;
        }
    
        /* .cNumberLetterGame .btninput1,
            .cNumberLetterGame .btninput2,
            .cNumberLetterGame .btninput3,
            .cNumberLetterGame .btninput4{
                height: 40px;
                width: 40px;
                font-size: 12px;
            } */
        .cNumberLetterGame .n-g-box.big {
    
            padding: 10px;
            font-size: 26px;
        }
    
        /* .cNumberLetterGame .game_block, .cNumberLetterGame .btninputbx li {
                font-size: 16px;
            } */
    
        /* .game_block,   */
        /* .btninputbx li {
                font-size: 16px !important;
            } */
        #datablock_numberLetterGame .j-center li {
            margin: auto 10px !important;
        }
    
        .keep-track-ul.tow-buttons li {
            width: 100%;
        }
    
        .cMdto .game_block,
        .cMdtt .game_block,
        .cMdts .game_block {
            padding: 20px 20px 20px 20px;
        }
    
        .cMdto .objque ul li,
        .cMdtt .objque ul li,
        .cMdts .objque ul li {
            height: auto !important;
            width: auto !important;
        }
    
        .cMdto .game_panel,
        .cMdtt .game_panel,
        .cMdts .game_panel {
            padding-bottom: 170px;
        }
    
        .cMdto .s-b-instraction,
        .cMdtt .s-b-instraction,
        .cMdts .s-b-instraction {
            margin-top: 100px;
            position: absolute;
        }
    
        .cMdto .btninputbx,
        .cMdtt .btninputbx,
        .cMdts .btninputbx {
            display: flex;
            justify-content: center;
            margin-left: auto;
            margin-right: auto;
        }
    
        .comm-page-custom-shapes .main-content-inner,
        .comm-page-custom-objects .main-content-inner,
        .comm-page-custom-wordpairsgame .main-content-inner,
        .comm-page-custom-reactgame .main-content-inner,
        .comm-page-custom-flanker .main-content-inner,
        .comm-page-custom-facenamegame .main-content-inner,
        .comm-page-custom-numberletter .main-content-inner,
        .comm-page-custom-keeptrack .main-content-inner,
        .comm-page-custom-me-objects-temporal .main-content-inner,
        .comm-page-custom-me-objects-spatial .main-content-inner,
        .comm-page-custom-me-speech-tasks .main-content-inner,
        .comm-page-custom-me-speech-task-tellme-more .main-content-inner,
        .comm-page-custom-me-fakenews .main-content-inner,
        .comm-page-custom-me-digitsymbol .main-content-inner,
        .comm-page-custom-me-this-and-that .main-content-inner	{
            min-height: 82vh;
        }
    
    
        .instractionb.box4 div,
        .box4 div,
        .btninput1,
        .comm-page-custom-reactgame .game_panel img {
            height: 140px;
            width: 140px;
        }
    
        /* .comm-page-custom-reactgame .btninputbx li {
                width: 70px;
            } */
        .login-form {
            padding: 50px 30px;
        }
    
        .cMindCrowdCommunityThemeNoMenu {
            padding-top: 52px;
        }
    
        .logo-game {
            position: fixed;
            right: 0;
            top: 0;
            background-color: #12233e;
            border-radius: 0;
            padding: 5px 10px;
            width: 100%;
            z-index: 999;
        }
    
        /* .step-grid{
                display: inline-block;
                width: 100%;
    
            } */
        /* .steps .slds-col{
                padding: 5px 0;
            } */
        .step-grid {
            margin-left: -45px;
            margin-right: -45px;
        }
    
        .step-grid::after {
            width: 90%;
            left: 5%;
        }
    
        .step-number {
            content: '';
            font-size: 0;
            position: relative;
            font-family: 'Font Awesome 5 Free';
            width: 45px !important;
    
        }
    
        .current.tick .step-number::after {
            content: "\f00c";
            color: #fff;
            fill: #fff;
            position: absolute;
            font-size: 20px;
            left: 23%;
    
    
        }
    
        .mobile-table {
            display: block;
        }
    
        .desktop-table {
            display: none;
        }
    
        .desktop-text1 {
            position: relative;
            padding-left: 0;
            bottom: 0;
            line-height: normal;
        }
    
        .mobile-text {
            display: block;
        }
    
        .desktop-text {
            display: none;
            line-height: normal;
        }
    
        .gall-button {
            position: relative;
            left: auto;
            margin-top: 24px;
        }
    
        /* .comm-page-custom-vipaccess .mainContentArea, */
        .comm-page-custom-vipaccess-passwordrecovery .mainContentArea,
        .comm-page-custom-checkpasswordrecoveryemail .mainContentArea {
            width: 85%;
            min-width: auto;
            height: auto;
            min-height: auto;
            padding: 20px 20px 40px 20px;
            /* margin-bottom: 40px; */
        }
    
        .h-top-text3 {
            padding-left: 0;
            padding-right: 0;
        }
    
        .cookies-content {
            display: block;
        }
    
        .cookies-content .pink-btn {
            margin-left: 0;
        }
    
        .scoreBasedCaption {
            padding: 0 16px;
        }
    
        .home_progress .social_icons {
            padding: 0;
        }
    
        .m-setting-bInfo-button {
            display: inline-block;
            text-align: center;
            width: 100%;
        }
    
        .m-setting-bInfo-button p {
            position: relative !important;
        }
    
        .marginT2p {
            margin-top: 16px;
        }
    
        .slds-modal__footer .slds-button {
            margin-left: 0;
        }
    
        .comm-page-custom-dlrts,
        .comm-page-custom-pairedgame,
    
        .comm-page-custom-page1,
        .comm-page-custom-m-page1 {
            padding-top: 82px;
        }
    
        .comm-page-custom-page2,
        .comm-page-custom-page3,
        .comm-page-custom-page4,
        .comm-page-custom-page5,
        .comm-page-custom-page6,
        .comm-page-custom-pairedgame,
        .comm-page-custom-page2-1,
        .comm-page-custom-page3-1,
        .comm-page-custom-page4-1,
        .comm-page-custom-page5-1,
        .comm-page-custom-page6-1,
        .comm-page-custom-page7,
        .comm-page-custom-page8,
        .comm-page-custom-page9,
        .comm-page-custom-memorygametestcompleted,
        .comm-page-custom-attentiontestcomplete {
            padding-top: 110px;
        }
    
        .comm-page-custom-page2 .steps,
        .comm-page-custom-page3 .steps,
        .comm-page-custom-page4 .steps,
        .comm-page-custom-page5 .steps,
        .comm-page-custom-page6 .steps,
        .comm-page-custom-page2-1 .steps,
        .comm-page-custom-page3-1 .steps,
        .comm-page-custom-page4-1 .steps,
        .comm-page-custom-page5-1 .steps,
        .comm-page-custom-page6-1 .steps,
        .comm-page-custom-page7 .steps,
        .comm-page-custom-page8 .steps,
        .comm-page-custom-page9 .steps,
        .comm-page-custom-attentiontestcomplete .steps,
        .comm-page-custom-memorygametestcompleted .steps {
            display: none;
    
        }
    
        .s-b-instraction {
            position: relative;
        }
    
        .game_panel,
        .game_panel {
            padding-bottom: 0;
        }
    
        .home_section1,
        .home_section2-content,
        .home_section3,
        .home_section4 .content {
            width: 85%;
            max-width: 85%;
            padding-left: 0;
            padding-right: 0;
        }
    
        .home_section5,
        .home_section5 .slds-gutters,
        .footer_wrapper,
        .footer_wrapper .slds-gutters {
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
    
        .footer_wrapper .slds-gutters .slds-col {
            width: 100%;
            height: auto;
            margin: 0;
            padding-bottom: 80px !important;
            padding-left: 0;
            padding-right: 0;
        }
    
        .copyright-content {
            width: 85%;
            max-width: 85%;
            padding: 0;
        }
    
        .home_section4 .home_section4-col1 {
            width: 100%;
            max-width: 100%;
            padding-left: 0;
            padding-right: 0;
    
        }
    
        .home_section4 .slds-col.slds-is-relative {
            padding-left: 0;
            padding-right: 0;
    
        }
    
        .thumb-img-box .slds-gutters {
            display: flex !important;
        }
    
        .player {
            width: 100%;
        }
    
        .right-col-text {
            position: relative;
        }
    
        .the-problem h4,
        .project h4 {
            font-size: 26px;
        }
    
        .home_promo .home_p {
            margin-top: 10px;
        }
    
        .banner-col-left {
            margin-top: auto;
        }
    
        .s-b-instraction {
            right: 0px;
            left: 0;
            text-align: center;
        }
    
        .test .slds-modal__content p {
            font-size: 18px;
        }
    
        .small-text {
            font-size: 12px !important;
            line-height: 16px;
        }
    
        .comm-page-custom-info-faq {
            padding-top: 94px;
        }
    
        .home_promo_sponsors li {
            margin-top: 10px;
            margin-bottom: 10px;
        }
    
        .cFaceNameGame .target_row,
        .cFaceNameGame .user_row {
            display: inline-block;
            width: 100%;
        }
    
        .cFaceNameGame .titlebox {
            width: 100%;
        }
    
        .target_box1,
        .target_box2,
        .target_box3,
        .user_boxF,
        .user_boxS,
        .user_boxT {
            width: 31.333333% !important;
            padding: 0 !important;
        }
    
        .cFaceNameGame .game_block {
            padding-left: 0;
            padding-right: 0;
        }
    
        .consent-form-item-row .slds-rich-text-editor__output ul {
            margin-left: -18px;
        }
    
        .cFaceNameGame .catch_row {
            margin: auto !important;
        }
    
        .rbot {
            right: 5%;
            bottom: 27%;
        }
    
        .lbot {
            left: 5%;
            bottom: 27%;
        }
    
        .rtop {
            right: 5%;
        }
    
        .ltop {
            left: 5%;
        }
    
        .comm-page-custom-myresults {
            padding-top: 82px;
        }
    
        .comm-page-custom-myresults .slds-p-around_small,
        .comm-page-custom-myresults .mainContentArea {
            padding-left: 3px;
            padding-right: 3px;
    
        }
    
        .comm-page-custom-myresults .mainCrowd-inner-box {
            margin: 5px;
        }
    
        .slds-tabs_scoped__link,
        .slds-tabs_scoped__link,
        .slds-tabs--scoped__link,
        .slds-tabs--scoped__link {
            padding-left: 5px;
            padding-right: 5px;
        }
    
        .speed-m-chart-box .slds-grid .slds-size_4-of-12 {
            width: 100%;
            margin-top: 100px;
            margin-bottom: 0px;
        }
    
        .speed-m-chart-box .slds-grid .slds-size_4-of-12:first-child {
            width: 100%;
            margin-top: 10px;
            margin-bottom: 0px;
        }
    
        .cParticipantGuestuserResults .social_result {
            top: -35px;
        }
    
        .cParticipantGuestuserResults .social_result .slds-button {
            font-size: 0 !important;
        }
    
        .cParticipantGuestuserResults .slds-button__icon_left,
        .cParticipantGuestuserResults .slds-button__icon--left {
            margin-right: 0;
        }
    
        /* .objque ul li {
                width:156px !important;
                height: 156px !important;
        
            } */
        .contentRegion {
            padding: 0;
        }
    
        .slds-tabs_scoped__content {
            padding: 0;
        }
    
        .slds-tabs_scoped__content .mainCrowd-inner-box {
            padding: 5px;
        }
    
        .m-logout-link {
            display: block;
        }
    
        .comm-page-custom-finish .contentRegion,
        .comm-page-custom-studies .contentRegion {
            padding: 0;
        }
    
        .mainCrowd-blue-box {
            padding: 20px !important;
            border-radius: 7px;
            margin-bottom: 150px;
        }
    
        .result-form {
            width: 100%;
            position: unset;
            /* margin: 0 0 -50% 0; */
            margin: 0 0 -150px 0;
            padding: 30px;
        }
    
        .result-form .slds-grid {
            display: block;
        }
    
        .result-form .slds-grid .slds-form-element {
            width: 100%;
            padding-right: 0;
            padding-bottom: 10px;
        }
    
        .result-check-box {
            display: block;
        }
    
        .result-form .pull-left {
            float: none;
            margin-top: 0;
        }
    
        .mainCrowd-blue-box .link {
            /* display: flex; */
            justify-content: center;
            margin-top: 10px;
        }
    
        .result-check-box .slds-checkbox__label {
            display: block;
        }
    
        .sfdc.text-right {
            text-align: center;
        }
    
        .sfdc.text-right .pink-link {
            text-align: center;
            width: 100%;
            margin-bottom: 20px;
        }
    
        .salesforceIdentityLoginBody2 .cCenterPanel,
        .comm-page-login-home .mainContentArea,
        .comm-page-forgot-password .mainContentArea,
        .comm-page-check-password .mainContentArea,
        .comm-page-custom-passwordrecovery .mainContentArea,
        .comm-page-custom-checkpasswordrecoveryemail .mainContentArea,
        .mainContentArea {
            min-width: auto;
            width: 90%;
            /* min-width: 90% !important;
                max-width:90% !important; */
            padding-left: 10px !important;
            padding-right: 10px !important;
    
        }
    
        .comm-page-home .mainContentArea {
            padding: 0;
        }
    
        .slds-form_compound .slds-form-element__row,
        .slds-form--compound .slds-form-element__row {
            display: block;
        }
    
        .salesforceIdentityLoginBody2 .cCenterPanel,
        .comm-page-login-home .mainContentArea,
        .comm-page-forgot-password .mainContentArea,
        .comm-page-check-password .mainContentArea {
            width: 100%;
            min-width: 100%;
            margin: 0;
            padding: 10px;
        }
    
        .comm-page-forgot-password .mainContentArea,
        .comm-page-check-password .mainContentArea {
            padding-bottom: 50px;
            padding-top: 30px;
        }
    
        .comm-page-login-home .main-container-box,
        .comm-page-forgot-password .main-container-box,
        .comm-page-check-password .main-container-box {
            padding: 0 10px 0 10px;
        }
    
        .comm-page-custom-test .contentRegion,
        .comm-page-home .contentRegion {
            width: 100%;
    
        }
    
        .comm-page-custom-test .contentRegion .home_promo,
        .comm-page-home .contentRegion .home_promo {
            width: 85%;
            padding: 20px 0px;
        }
    
        .comm-page-custom-faq .cCenterPanel {
            width: 100%;
        }
    
        .mc-header {
            z-index: 5;
            position: relative;
            height: auto;
            /* padding-top: 60px; */
        }
    
        .comm-page-home .mc-header-container {
            width: 85%;
        }
    
        .homepage-right-col .position-fixed {
            position: unset;
            margin-bottom: 20px;
        }
    
        .comm-page-custom-faq {
            padding-top: 100px;
        }
    
        .comm-page-custom-faq .slds-gutters {
            display: block;
            margin-left: 10px;
            margin-right: 10px;
        }
    
        .comm-page-custom-faq .slds-gutters .slds-col {
            width: 100%;
        }
    
        .faq_asked_text {
            font-size: 32px !important;
        }
    
        .m-center {
            text-align: center;
        }
    
        .comm-page-home {
            padding-top: 90px;
        }
    
        .go_arrow-box {
            display: none;
        }
    
        .nav-right-buttons [data-region-name*="languageSection"] {
            width: 50%;
            margin-right: 0px;
        }
    
        .nav-right-buttons [data-region-name*="languageSection"] .slds-combobox .slds-listbox {
            bottom: 40px;
            top: auto;
    
        }
    
        .comm-page-home .home_promo {
            width: 100%;
            padding: 40px 0 !important;
        }
    
        /* .home_promo .home-col{display:block;} */
        /* .home_promo .home-col .slds-col{
                width:100%;
            } */
        .test .slds-modal__footer .slds-button_brand {
            font-size: 20px !important;
        }
    
        .home_promo h1 .home_research {
            font-size: 60px;
            margin-top: 0px;
        }
    
        .home_promo .home_p2 {
            width: auto;
            line-height: 32px;
        }
    
        /* .mc-header-container .top-banner-button{
    
                position: absolute;
                width: 85%;
                text-align: center;
                display: flex;
                justify-content: center;
                top: 0;
                padding-left: 0;
            } */
    
    
        .bottom {
            padding-bottom: 24px;
            margin-left: 10px;
            padding-right: 10px;
        }
    
        .the-problem-bg,
        .project-bg,
        .team-bg {
            padding-bottom: 30px;
        }
    
        .social_icons h5 {
            text-align: center;
        }
    
        .bottom .button {
            padding-left: 0;
        }
    
        .home_progress ul {
            float: none;
            display: flex;
            justify-content: center;
            padding-top: 10px;
            width: 100%;
        }
    
        .slds-modal__container.test {
            margin: auto 10px;
        }
    
        .slds-modal__container {
            margin: auto;
        }
    
        .p-list {
            padding-left: 21px;
        }
    
        /* .brainInfo .slds-required{
                float: unset;
                position: absolute;
                left: -11px;
                top: 3px;
            } */
        .slds-builder-header {
            height: 100vh;
            width: 100%;
            transition: all 190ms linear;
            position: fixed;
            animation: mMenuAnimtion 1s;
            overflow: auto;
            top: 0;
            padding-top: 110px;
        }
    
        .slds-modal__content {
            padding: 25px 10px 25px;
        }
    
        .nav-right-buttons {
            position: unset;
            display: block;
            width: 100%;
            float: left;
            margin-top: 15px;
        }
    
        .salesforceIdentityLoginBody2 .cHeaderPanel {
            z-index: 9999;
        }
    
        .top-nav-strip {
            width: 85%;
            display: block;
        }
    
        .slds-builder-header__item {
            display: block;
        }
    
        .slds-builder-header__nav-item,
        .slds-builder-header__utilities-item {
            width: 100%;
            border-left: 0 !important;
            text-align: center;
    
        }
    
        .slds-builder-header__item-action,
        .slds-builder-header__item-label {
            font-size: 20px;
            padding: 10px 0px;
            white-space: normal;
        }
    
        .nav-right-buttons .top-nav-l-combo {
            margin-right: 0;
            width: 50%;
        }
    
        .nav-right-buttons .login-button {
    
            width: 100%;
            text-align: center;
    
        }
    
        .nav-right-buttons [role=combobox] input[readonly],
        .nav-right-buttons input[readonly][role=combobox] {
            height: 40px !important;
            font-size: 22px !important;
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
            margin: 18px 0px 0 0;
            background: none;
            border: 0 !important;
        }
    
        .m-menu-btn .slds-icon,
        .m-menu-btn .slds-button__icon {
            width: 40px;
            height: 40px;
            fill: #fff;
        }
    
        .m-hide {
            display: none;
        }
    
        .slds-docked-form-footer {
            display: block;
        }
    
        .copyright {
            position: unset;
            text-align: center;
            margin: 0px 0;
        }
    
        .social_footer {
            position: unset;
            text-align: center;
            justify-content: center;
            display: flex;
            margin-top: 12px;
        }
    
        .footer_nav {
            position: unset;
        }
    
        .footer_nav li {
            float: none;
            border-left: 0 !important;
            text-align: center;
            padding: 0px;
            font-size: 20px;
        }
    
        .footer_nav li a {
            padding: 10px 0;
            width: 100%;
            display: block;
        }
    
    
    
        .homepage-right-col {
            padding: 10px 0 0 8px !important;
        }
    
        .home_promo_sponsors ul {
            display: block;
            text-align: center;
        }
    
        .home_progress h4 {
            font-size: 18px;
            line-height: unset;
            text-align: center;
        }
    
        .line,
        .opportunity-line {
            display: none;
        }
    
        .the-problem-layout,
        .project-layout,
        .team-layout {
            width: 100%;
        }
    
        .the-problem .slds-gutters {
            display: block;
        }
    
        .the-problem .left-content,
        .the-problem .the-problem-right-col {
            width: 100%;
        }
    
        .the-problem .the-problem-right-col .sidebar {
            width: 100%;
            padding: 0;
    
        }
    
        .the-problem .sub_heading,
        .project .sub_heading {
            font-size: 45px;
        }
    
        .the-problem-layout .left-content {
            padding: 30px 10px 0 10px;
        }
    
        .the-problem-right-col {
            padding: 10px !important;
        }
    
        .bottom_content {
            display: block;
            width: 100%;
            padding-right: 10px;
        }
    
        .the-problem-layout,
        .project-layout,
        .team-layout {
            padding-bottom: 0;
        }
    
        .project .content {
            padding: 40px 10px 0 10px;
        }
    
        .sidebar.full_width {
            margin: auto;
            padding: 20px 10px 0 10px;
        }
    
        .slds-gutters.callouts {
            display: block;
    
        }
    
        .slds-col.callout {
            padding: 0;
            margin: 0;
            width: 100%;
        }
    
        .slds-col.callout .slds-col.slds-size_4-of-12 {
            padding: 0 10px 0 0 !important;
        }
    
        .team .content {
            padding: 50px 10px 0 10px;
        }
    
        .team .sub_heading {
            font-size: 50px;
    
        }
    
        .team .bottom.slds-gutters {
            display: block;
        }
    
        .team .bottom.slds-gutters .slds-size_8-of-12,
        .team .bottom.slds-gutters .slds-size_4-of-12 {
            width: 100%;
        }
    
        .bottom .callout {
            margin-bottom: 20px;
    
        }
    
        .go_arrow-box {
            margin-bottom: 30px;
        }
    
        .footer_wrapper footer {
            width: 85%;
            max-width: 85%;
            margin: 0 auto;
            padding-left: 0;
            padding-right: 0;
    
        }
    
        .salesforceIdentityLoginBody2 .cCenterPanel {
            width: 100%;
            max-width: 100%;
            min-width: 100%;
            padding: 10px;
        }
    
    
        .login-page-outer-div {
            background-color: rgba(255, 255, 255, 0.3);
            border: 2px #A28662 solid;
            border-bottom-left-radius: 7px;
            border-bottom-right-radius: 7px;
            padding: 120px 10px 10px 10px;
    
        }
    
        .login-page-inner-div {
            padding: 40px 10px 10px 10px;
        }
    
        .comm-page-custom-mindcrowdlogin {
            padding-top: 76px;
        }
    
        .login-page-inner-div .title {
            font-size: 28px;
            color: #343434;
            margin-bottom: 20px;
            margin-top: 48px;
            text-align: center;
            line-height: 50px;
        }
    
        .login-page-inner-div .slds-form-element {
            display: block;
            margin-bottom: 10px;
        }
    
        .login-img {
            right: 16%;
        }
    
        .login-page-inner-div .magenta-btn,
        .login-page-inner-div .magenta-btn .slds-button {
            width: 100%;
        }
    
        .fp-link {
            font-size: 16px;
            margin-left: auto;
            margin-top: 10px;
            display: block;
            margin-bottom: 12px;
            text-align: center;
        }
    
        .salesforceIdentityLoginForm2 .inputContainer,
        .salesforceIdentityForgotPassword2 .inputContainer {
            margin-left: 0;
            margin-top: 30px;
        }
    
        .salesforceIdentityLoginForm2 .inputContainer#sfdc_username_container::before,
        .salesforceIdentityForgotPassword2 .inputContainer::before,
        .salesforceIdentityLoginForm2 .inputContainer#sfdc_password_container::before {
            top: -30px;
            left: 0;
        }
    
        .salesforceIdentityLoginForm2 .inverseTextColor {
            left: 0;
        }
    
        .salesforceIdentityLoginBody2 .cCenterPanel .siteforceContentArea,
        .comm-page-forgot-password .cCenterPanel .siteforceContentArea {
            padding: 10px 10px 44px 10px;
        }
    
        .comm-page-forgot-password .cancel-btn {
            left: -4px;
            right: auto;
        }
    
        .login-page-inner-div .title,
        .comm-page-login-home .title,
        .comm-page-forgot-password .title {
            line-height: 46px;
        }
    
        .comm-page-custom-games .cCenterPanel,
        .comm-page-custom-notifications .cCenterPanel,
        .comm-page-custom-notifications .contentRegion,
        .comm-page-custom-games .contentRegion,
        .comm-page-custom-braininfo .cCenterPanel,
        .comm-page-custom-consent .cCenterPanel,
        .comm-page-custom-complete .cCenterPanel,
        .comm-page-custom-results .cCenterPanel,
        .comm-page-custom-complete .cCenterPanel {
            width: 100%;
            padding: 10px;
        }
    
        .test h1 {
            font-size: 22px;
            line-height: normal;
        }
    
        .test .slds-modal__content p {
            line-height: normal;
    
        }
    
        .white_wrapper_content .slds-grid {
            display: inline-block;
        }
    
        .white_wrapper_content .slds-grid .slds-col {
            width: 100%;
        }
    
        .steps li {
            margin: 0 -4px 0 16px;
        }
    
        /* .mainCrowd-outer-box{
                padding:0;
            } */
        .mainCrowd-inner-box {
            padding: 20px 20px;
        }
    
        .page-title {
            font-size: 42px;
            font-weight: normal;
        }
    
        .consent_form {
            padding: 0;
        }
    
        .information.slds-form-element {
            /* margin-right: 24px; */
            text-align: center;
        }
    
        .comm-page-custom-braininfo,
        .comm-page-custom-consent,
        .comm-page-custom-complete,
        .comm-page-custom-results {
            padding-top: 82px;
        }
    
        .radio-button-group-brainee fieldset,
        .biological-sex-radioGroup fieldset {
            display: block;
        }
    
        .brainInfo .slds-form-element .slds-form-element__label,
        .brainInfo .slds-form-element .slds-form-element__control {
            width: 100%;
        }
    
        .brainInfo .slds-form-element{display: initial;}
    
        /* .slds-builder-header{display:none;} */
    
        .main-content-outer {
            width: 100%;
            padding: 0;
        }
    
        .radio-button-group-brainee fieldset .slds-checkbox {
            min-width: 100%;
        }
    
        .m-full-width {
            width: 100%;
        }
    
        .m-full-width .slds-form-element__control {
            width: 100%;
        }
    
        .display-block {
            display: block;
        }
    
        .mainCrowd-blue-box h2 {
            text-align: center;
            line-height: normal;
    
        }
    
        .mainCrowd-blue-box h3 {
            text-align: center;
            line-height: normal;
        }
    
        /* .comm-page-custom-results .m-menu-btn, */
        .comm-page-custom-braininfo .m-menu-btn,
        /* .comm-page-custom-consent .m-menu-btn, */
        .comm-page-custom-dlrts .m-menu-btn,
        .comm-page-custom-pairedgame .m-menu-btn,
        .comm-page-custom-complete .m-menu-btn {
            display: none;
        }
    
        .uiPanel--notificationsPanel .container {
            width: 92%;
        }
    
        .uiPanel--notificationsPanel .titleContainer {
            padding-top: 0;
        }
    
        .uiPanel--notificationsPanel .titleContainer .titleName {
            margin-top: 15px;
            padding-top: 0;
            font-size: 30px;
        }
    
        .unsNotificationsListRow .notification-link {
            margin: 0;
        }
    
    
        body[class*="comm-page-detail"] .contentRegion {
            width: 100%;
        }
    
        .profile-row {
            display: block;
        }
    
        body[class*="comm-page-detail"] .slds-form_compound .slds-form-element__row,
        body[class*="comm-page-detail"] .slds-form--compound .slds-form-element__row {
    
            display: block;
    
    
        }
    
        .profile-row.tow-col .slds-form-element__row .slds-form-element.slds-size_4-of-6,
        .profile-row.tow-col .slds-form-element__row .slds-form-element.slds-size_2-of-6 {
            width: 100%;
            padding-left: 0;
        }
    
        .right-link {
            float: none;
            text-align: center;
            width: 100%;
            left: 0;
            right: 0 !important;
            top: 4px !important;
        }
    
        body[class*="comm-page-detail"] .magenta-btn .slds-button
    
        /* body[class*="comm-page-detail"] .salesforceIdentityLoginForm2 .uiButton, .loginButton */
            {
            padding: 3px 12px 6px !important;
    
        }
    
        .modal-title {
            font-size: 26px;
            letter-spacing: normal;
        }
    
        .pwd-instractions {
            padding: 10px;
        }
    
        .comm-page-custom-games,
        .comm-page-detail-005 {
            padding-top: 82px;
        }
    
        .profile-row.biological-sex-radioGroup .slds-form-element__control,
        .profile-row.two-cal .slds-form-element__control {
            width: 100%;
            padding-left: 0;
        }
    
        .profile-row label,
        .profile-row .slds-form-element__legend {
            width: 100%;
        }
    
        .footer_nav {
            display: none;
        }
    
        .game_block {
            /* padding:20px; */
            padding: 64px 5px 60px 5px;
        }
    
        .comm-page-custom-reactgame .game_panel img {
            margin-top: 0;
        }
    
        .example-box {
            white-space: nowrap;
            /* font-size: 40px;
                 padding: 5px 10px 15px; */
            /* display: block; */
    
    
        }
    
        .game_block {
            font-size: 20px;
    
        }
    
        .game_block p {
            line-height: 45px;
        }
    
        .mainCrowd-blue-box h2 {
            font-size: 50px;
        }
    
        .social_result {
            top: auto;
            bottom: -50px;
            right: 0px;
        }
    
        .comm-page-custom-results .comm-content-footer {
            padding: 0;
        }
    
        .comm-page-custom-finish {
            padding-top: 90px;
        }
    
        /* .comm-page-custom-finish .m-menu-btn{
                display: none;
            } */
    
        .comm-page-custom-finish .slds-m-top_large.m-full-width {
            text-align: center;
        }
    
        .mainCrowd-blue-box .link {
            margin-left: 0px;
            display: inline-block;
        }
    
        .Participation-header-box {
            /* max-height: 37.675781vw; */
            background-color: #12233e;
            padding: 24px 10px;
            text-align: center;
            border-radius: 7px;
        }
    
        .Participation-title-box,
        .participation-form-item-row {
            padding: 10px;
        }
        
               .participation-form.text {
           text-align: left
                      
        }
    
        .freebirdFormviewerViewHeaderRequiredLegend {
            margin-top: 0;
        }
    
        .cObjects .game_block p {
            line-height: 40px;
        }
    
        .comm-page-custom-myresults .game-dash-title {
            margin-bottom: 10px;
            border: none;
            text-align: center;
        }
    
        .game-title {
            top: -41px;
            font-size: 22px;
        }
    
        .cFaceNameGame .face3Container {
            width: 100%;
            padding: 20px 0;
        }
    
        .cFaceNameGame .face3Container .imgList li {
            width: 32.333%;
        }
    
        .cFaceNameGame .face3Container .faceImg {
            /* width: 100px!important; */
            width: 100% !important;
            /* height: 100px!important; */
            margin: 5px 0px 10px;
        }
    
        .cFaceNameGame .game_block {
            padding: 10px;
    
        }
    
        .facegame .btn {
            min-width: 31.333%;
            width: 31.333% !important;
            font-size: 11px;
            padding: 5px 0px;
            text-align: center;
    
        }
    
        .faceimg-box .n-g-box2 {
            min-height: auto !important;
        }
    
        .cFaceNameGame .m20 {
            margin: 10px 2px;
        }
    
        .cFaceNameGame .face3Container .imgList {
            height: auto;
        }
    
        /* .keep-track-ul li{
    
                width: 100%;
            } */
        .keep-track-ul li .slds-button {
            width: 100%;
            text-align: center;
            float: none;
            justify-content: center;
            margin-bottom: 10px;
        }
        
        .camel-cactus-ul li .slds-button {
            width: 100%;
            text-align: center;
            float: none;
            justify-content: center;
            margin-bottom: 10px;
        }
        
        .fake-news-ul li .slds-button {
            width: 100%;
            text-align: center;
            float: none;
            justify-content: center;
            margin-bottom: 10px;
        }
    
        .mainCrowd-outer-box {
            max-width: 100%;
        }
    
        /* .n-g-box {
                padding: 0px 7px 0px;
                font-size: 22px;
            } */
        .biological-sex-radioGroup fieldset .slds-radio {
            float: none;
        }
    
        .main-content-inner.marginB90 {
            margin-bottom: 0px;
        }
    
        .main-content-outer.marginB30 {
            margin-bottom: 24px;
        }
    
        .comm-page-home .mainCrowd-outer-box {
            width: 100%;
            padding-left: 10px;
            padding-right: 10px;
            margin-top: 0;
        }
    
    }
    
    .newsletter-email {
        display: block !important;
    }
    
    
    
    @media (max-width: 711px) {
        .btn__game-time-center {
            font-size: 30px;
        }
    
        .copyright .social_icons {
            width: 100%;
            justify-content: center;
            display: flex;
        }
    
        .game-tiles-box .game-tiles {
            min-height: 200px;
        }
    
        .game-tiles-box .game-tiles .title {
            font-size: 32px;
        }
    
        .game-tiles-box .game-tiles .title span {
    
            line-height: 36px;
        }
    
        .cNumberLetterGame .btninputbx li {
            margin-right: 5px !important;
            margin-left: 5px !important;
        }
    
        .btninputbx li {
            font-size: 16px !important;
        }
    
        .comm-page-custom-me-objects-temporal .objbox {
            height: 48vh;
        }
    
        .comm-page-custom-reactgame .btninputbx li {
            width: 70px;
        }
    
        .comm-page-custom-reactgame .btninputbx li .btninput {
            margin-left: 4px;
            margin-right: 4px;
        }
    
        .nav-right-buttons .login-button .slds-button,
        .login-a-button {
            padding: 15px 50px 13px;
            font-size: 18px;
            min-width: 139px;
            line-height: 1.2em;
            height: auto;
    
        }
    
        .mainContentArea {
            min-height: 74.1vh;
        }
    
        .instractionb.box4 div,
        .box4 div,
        .btninput1,
        .comm-page-custom-reactgame .game_panel img {
            height: 60px;
            width: 60px;
        }
    
        .example-box {
            white-space: nowrap;
            /* font-size: 30px; */
            padding: 20px 0px 20px 10px;
            /* display: block; */
            min-width: 80%;
            height: auto;
            position: relative;
            line-height: 30px;
    
        }
    
        .gall-thumb-img .slds-col {
            padding-left: 5px;
            padding-right: 5px;
        }
    
        .home_section3 .social_icons ul {
            display: inline-block;
        }
    
        .home_progress .social_icons li {
            width: 29%;
            margin-bottom: 10px;
            display: inline-block;
            float: none;
        }
    
        .home_progress .social_icons li:first-child {
            margin-left: 0;
        }
    
        .comm-page-custom-results .home_section3 {
            padding: 0;
            max-width: 100%;
        }
    
        .result-title {
            margin: 120px 0 40px;
        }
    
        .step-grid {
            margin-left: -10px;
            margin-right: -10px;
        }
    
        .player {
            width: 100%;
        }
    
        /* .game_block #nextBtton .slds-button{
                    margin: 5px 0 !important;
                } */
        .example-box {
            /* display: block; */
            min-width: 100%;
    
    
        }
    
        .home_promo .home-col {
            display: block;
        }
    
        .home_promo .home-col .slds-col {
            width: 100%;
            padding-left: 0 !important;
        }
    
        .homepage-right-col {
            text-align: center;
        }
    
    }
    @media (max-width: 480px) {
            .longitgraph{
                    width:40vh;
                    height:60vh;
            }
    }
    @media (max-width: 415px) {
    
        .brainInfo .slds-form-element .slds-form-element__label,
        .brainInfo .slds-form-element .slds-form-element__control {
            /* width: 274px; */
            width: 100%;
            display: grid;
        }
    
        .profile-row.tow-col .paddingL30, .profile-row.tow-col.paddingL30, .profile-row.tow-col .paddingL30 .slds-form-element{
            padding-left: 0;
        }
        .profile-row.paddingL30 .slds-form-element{
            padding-left: 0;
        }
        .brainInfo .slds-form-element .slds-form-element__label, .brainInfo .slds-form-element .slds-form-element__control {
            width: 100%;
            /* display: grid; */
        }
    
        .slds-combobox_container {
            width: 274px;
        }
    
        .game-title {
            font-size: 18px;
            padding: 6.5px 10px 6px 10px;
            left: 15px;
        }
    
        .mainContentArea {
            transform: scale(0.7, 0.7, 0.7, 0.7);
        }
    
        .slds-modal__footer .slds-button {
            margin-left: 5px;
            min-width: 88px;
            font-size: 16px;
        }
    
        .h-top-heading {
    
            font-size: 30px;
            line-height: 40.5px;
        }
    
        div>p.title,
        .modal-title {
            font-size: 24px;
        }
    
        .example-box {
            white-space: nowrap;
            font-size: 26px;
        }
    
        .example-box .txt_input {
            /* max-width: 130px; */
            font-size: 26px;
        }
        .example-box .txt_placeholder::placeholder {
          font-size: 18px;
          color: rgb(200, 200, 200);
          transition: font-size 0.1s ease-in-out;
        }
    
    }
    
    @media (max-width: 360px) {
    
        /* .cNumberLetterGame .btninput1,
                .cNumberLetterGame .btninput2,
                .cNumberLetterGame .btninput3,
                .cNumberLetterGame .btninput4{
                    height: 40px;
                    width: 40px;
                    font-size: 12px;
                } */
        /* .cNumberLetterGame .btninputbx li {
                    font-size: 12px !important;
                } */
        .player {
            width: 100%;
        }
    
        .brainInfo .slds-form-element .slds-form-element__label,
        .brainInfo .slds-form-element .slds-form-element__control {
            /* width: 275px; */
            width: 98%;
        }
    
        .step-grid {
            margin-left: -4px;
            margin-right: -4px;
        }
    
        .example-box .txt_input {
            /* max-width: 130px;  */
            font-size: 26px;
        }
        .example-box .txt_placeholder::placeholder {
          font-size: 18px;
          color: rgb(200, 200, 200);
          transition: font-size 0.1s ease-in-out;
        }
    }
    
    
    @media (max-width: 281px),
    (max-width: 320px) {
        .ssm {
            min-width: auto !important;
        }
    
        .cNumberLetterGame .btninput1,
        .cNumberLetterGame .btninput2,
        .cNumberLetterGame .btninput3,
        .cNumberLetterGame .btninput4 {
            height: 40px !important;
            width: 40px !important;
            font-size: 12px;
        }
    
        .cNumberLetterGame .btninputbx li {
            font-size: 12px !important;
        }
    
        .instractionb.box4 div,
        .box4 div,
        .btninput1,
        .comm-page-custom-reactgame .game_panel img {
            height: 53px;
            width: 53px;
        }
    
        .comm-page-custom-reactgame .btninputbx li {
            width: 60px;
        }
    
        .result-p-title {
            /* font-size: 30px;
                    line-height: 40.5px; */
    
            font-size: 18px;
            line-height: 28.5px;
        }
    
        .result-title {
            font-size: 30px;
        }
    
        .game-dash-title {
            font-size: 28px;
        }
    
        .mainCrowd-inner-box1 {
            font-size: 20px;
        }
    
        .game-title {
            font-size: 18px;
            padding: 6.5px 10px 6px 10px;
            left: 15px;
        }
    
        .result-form .opt-out {
    
            line-height: normal;
            margin-top: 10px;
        }
    
        .result-form .magenta-btn .slds-button {
            padding: 15px 10px 13px;
        }
    
        .game-title {
            font-size: 18px;
            padding: 6.5px 10px 6px 10px;
            left: 15px;
        }
    
        /* .brainInfo .slds-form-element .slds-form-element__label, .brainInfo .slds-form-element .slds-form-element__control {
                    width: 225px;
                } */
        .slds-combobox_container {
            width: 225px;
        }
    
        .mainContentArea {
            transform: scale(0.7, 0.7, 0.7, 0.7);
        }
    
        .slds-modal__footer .slds-button {
            margin-left: 5px;
            min-width: 88px;
            font-size: 16px;
        }
    
        .h-top-heading {
    
            font-size: 30px;
            line-height: 40.5px;
        }
    
        div>p.title,
        .modal-title {
            font-size: 24px;
        }
    
        .gauge text {
            font-size: 18px !important;
        }
    
    }
    
    
    @media (max-width: 281px) {
    
        .game-title {
            font-size: 18px;
            padding: 6.5px 10px 6px 10px;
            left: 15px;
        }
    
        /* .brainInfo .slds-form-element .slds-form-element__label, .brainInfo .slds-form-element .slds-form-element__control {
                    width: 190px;
                } */
        .slds-combobox_container {
            width: 190px;
        }
    
        .mainContentArea {
            transform: scale(0.7, 0.7, 0.7, 0.7);
        }
    
        .h-top-heading {
    
            font-size: 30px;
            line-height: 40.5px;
        }
    
        div>p.title,
        .modal-title {
            font-size: 24px;
        }
    
        .m-menu-btn {
            margin: 10px 0px 0 0;
        }
    
        .inner-title {
            font-size: 28px;
        }
    
        .home_section1,
        .home_section2-content,
        .home_section3,
        .home_section4 .content {
            width: 100%;
            max-width: 100%;
    
        }
    
        .comm-page-custom-myresults .mainContentArea {
            width: 100%;
        }
    
        .comm-page-custom-myresults .mainCrowd-inner-box {
            margin: 0;
        }
    
        .comm-page-custom-myresults text {
            font-size: 20px !important;
        }
    }
    
    /* @media screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    
        .comm-page-custom-shapes .main-content-inner,
        .comm-page-custom-objects .main-content-inner,
        .comm-page-custom-wordpairsgame .main-content-inner,
        .comm-page-custom-reactgame .main-content-inner,
        .comm-page-custom-flanker .main-content-inner,
        .comm-page-custom-facenamegame .main-content-inner,
        .comm-page-custom-numberletter .main-content-inner,
        .comm-page-custom-keeptrack .main-content-inner,
        .comm-page-custom-me-objects-temporal .main-content-inner,
        .comm-page-custom-me-objects-spatial .main-content-inner {
            min-height: 82vh;
        }
    } */
    
    @media screen and (min-width: 320px) and (max-width: 844px) and (orientation: landscape) {
    
        .comm-page-custom-shapes .main-content-inner,
        .comm-page-custom-objects .main-content-inner,
        .comm-page-custom-wordpairsgame .main-content-inner,
        .comm-page-custom-reactgame .main-content-inner,
        .comm-page-custom-flanker .main-content-inner,
        .comm-page-custom-facenamegame .main-content-inner,
        .comm-page-custom-numberletter .main-content-inner,
        .comm-page-custom-keeptrack .main-content-inner,
        .comm-page-custom-me-objects-temporal .main-content-inner,
        .comm-page-custom-me-objects-spatial .main-content-inner,
        .comm-page-custom-me-objects-temporal .main-content-inner,
        .comm-page-custom-me-speech-tasks .main-content-inner,
        .comm-page-custom-me-speech-task-tellme-more .main-content-inner,
        .comm-page-custom-me-fakenews .main-content-inner,
        .comm-page-custom-me-digitsymbol .main-content-inner	,
        .comm-page-custom-me-this-and-that .main-content-inner		{
            min-height: 90vh;
        }
    }
    
    @media (max-width: 500px) {
        .game_block #nextBtton .slds-button {
            margin: 5px 0 !important;
        }
    }
    
    @media (max-width: 767px) {
    
        /* .cMindCrowdCommunityThemeNoMenu .mainContentArea {
                    min-width: auto;
                    width: 100%;
                    padding-left: 10px !important;
                    padding-right: 10px !important;
                } */
    
    
        .comm-page-custom-shapes .main-content-inner,
        .comm-page-custom-objects .main-content-inner,
        .comm-page-custom-wordpairsgame .main-content-inner,
        .comm-page-custom-reactgame .main-content-inner,
        .comm-page-custom-flanker .main-content-inner,
        .comm-page-custom-facenamegame .main-content-inner,
        .comm-page-custom-numberletter .main-content-inner,
        .comm-page-custom-keeptrack .main-content-inner,
        .comm-page-custom-me-objects-temporal .main-content-inner,
        .comm-page-custom-me-objects-spatial .main-content-inner,
        .comm-page-custom-me-speech-tasks .main-content-inner,
        .comm-page-custom-me-speech-task-tellme-more .main-content-inner,
        .comm-page-custom-me-fakenews .main-content-inner,
        .comm-page-custom-me-digitsymbol .main-content-inner,
        .comm-page-custom-me-this-and-that .main-content-inner
        {
            min-height: 72vh;
        }
    
    
        .d-img {
            display: none;
        }
    
        .m-img {
            display: inline-block;
        }
    
        .arrowdt ul li {
            height: 70px !important;
    
        }
    
        .cFlanker .arcenter {
            width: 45px;
            height: 25px !important;
            background-size: contain;
        }
    
        .cFlanker .br,
        .cFlanker .bl {
    
            background-size: contain;
    
        }
    
        .wp-animation {
            background-size: contain;
            top: 0px;
        }
    
        .example-box .txt_input {
            max-width: 130px;
            /* font-size: 26px; */
            background-color: transparent;
            padding-left: 0;
            padding-right: 0;
        }
        
        .example-box .txt_placeholder::placeholder {
          font-size: 18px;
          color: rgb(200, 200, 200);
          transition: font-size 0.1s ease-in-out;
        }
    
        .cMemorytestPage1 .game_block,
        .cMemorytestPage2 .game_block,
        .cMemorytestPage3 .game_block,
        .cMemorytestPage4 .game_block,
        .cMemorytestPage5 .game_block,
        .cMemorytestPage6 .game_block,
        .cMemorytestPage7 .game_block,
        .cMemorytestPage8 .game_block,
        .cMemorytestPage9 .game_block {
            padding: 64px 5px 20px 5px;
        }
    
        .example-box .txt_input.wp-animation {
            font-size: 20px;
        }
    
        .example-box {
            margin-bottom: 35px;
        }
    
        .example-box .magenta-btn {
            /* position: absolute;
                    top: 2px;
                    right: 2px;
                    bottom: 2px;
                    display: flex;
                    min-width: auto; */
            position: absolute;
            bottom: -50px;
            display: flex;
            height: 40px;
            width: 100%;
            justify-content: center;
            left: 0;
        }
    
        .example-box .magenta-btn .slds-button {
            top: auto;
            text-align: center;
            margin-left: 0;
            justify-content: center;
            display: flex;
        }
    
        .mb0 {
            margin-bottom: 0 !important;
        }
    
        /* .tow-buttons li{
                width: 50%;
               } */
        /* .one-buttons li{
                   width: 100%;
               } */
        /* li .keep-track-q{
                font-size: 18px;
                padding: 4px 5px;
               } */
        .keep-track-ul.tow-buttons,
        /* .keep-track-ul.one-buttons,  */
        .keep-track-ul.three-buttons,
        .keep-track-ul.four-buttons {
            display: inline-block;
        }
    
        /* .one-buttons li .keep-track-q{
                font-size: 18px;
                padding: 4px 5px;
               } */
        .keep-track-ul li .inputtexttwo {
            max-width: 100%;
        }
    
        /* .four-buttons li{
                width: 24.8888%;
               } */
    
    }
    
    @media (min-width: 900px) {
            .mc-combobox.slds-form-element > div .slds-form-element__control .slds-combobox_container .slds-combobox_container, .age, .speakingLanguageAge, .otherGender{
                width: 46vw !important;
                max-width: 390px !important;
                min-width: 380px !important;
            }
    }
    @media (min-width: 930px) {
            .mc-combobox.slds-form-element > div .slds-form-element__control .slds-combobox_container .slds-combobox_container, .age, .speakingLanguageAge, .otherGender{
                width: 46vw !important;
                max-width: 410px !important;
                min-width: 380px !important;
            }
    }
    @media (min-width: 980px) {
            .mc-combobox.slds-form-element > div .slds-form-element__control .slds-combobox_container .slds-combobox_container, .age, .speakingLanguageAge, .otherGender{
                width: 46vw !important;
                max-width: 430px !important;
                min-width: 380px !important;
            }
    }
    @media (min-width: 1000px) {
            .mc-combobox.slds-form-element > div .slds-form-element__control .slds-combobox_container .slds-combobox_container, .age, .speakingLanguageAge, .otherGender{
                width: 46vw !important;
                max-width: 450px !important;
                min-width: 380px !important;
            }
    }
    @media (min-width: 1025px) {
            .mc-combobox.slds-form-element > div .slds-form-element__control .slds-combobox_container .slds-combobox_container, .age, .speakingLanguageAge, .otherGender{
                width: 46vw !important;
                max-width: 480px !important;
                min-width: 380px !important;
            }
    }
    @media (min-width: 1070px) {
            .mc-combobox.slds-form-element > div .slds-form-element__control .slds-combobox_container .slds-combobox_container, .age, .speakingLanguageAge, .otherGender{
                width: 47vw !important;
                max-width: 520px !important;
                min-width: 380px !important;
            }
    }
    @media (min-width: 1131px) {
            .mc-combobox.slds-form-element > div .slds-form-element__control .slds-combobox_container .slds-combobox_container, .age, .speakingLanguageAge, .otherGender{
                width: 48vw !important;
                max-width: 560px !important;
                min-width: 380px !important;
            }
    }
    @media (min-width: 1230px) {
            .mc-combobox.slds-form-element > div .slds-form-element__control .slds-combobox_container .slds-combobox_container, .age, .speakingLanguageAge, .otherGender{
                width: 46vw !important;
                max-width: 510px !important;
                min-width: 380px !important;
            }
    }
    @media (min-width: 1260px) {
            .mc-combobox.slds-form-element > div .slds-form-element__control .slds-combobox_container .slds-combobox_container, .age, .speakingLanguageAge, .otherGender{
                width: 49vw !important;
                max-width: 520px !important;
                min-width: 380px !important;
            }
    }
    @media (min-width: 1300px) {
            .mc-combobox.slds-form-element > div .slds-form-element__control .slds-combobox_container .slds-combobox_container, .age, .speakingLanguageAge, .otherGender{
                width: 46vw !important;
                max-width: 560px !important;
                min-width: 380px !important;
            }
    }
    @media (min-width: 1375px) {
            .mc-combobox.slds-form-element > div .slds-form-element__control .slds-combobox_container .slds-combobox_container, .age, .speakingLanguageAge, .otherGender{
                width: 46vw !important;
                max-width: 580px !important;
                min-width: 380px !important;
            }
    }
    @media (min-width: 1400px) {
            .mc-combobox.slds-form-element > div .slds-form-element__control .slds-combobox_container .slds-combobox_container, .age, .speakingLanguageAge, .otherGender{
                width: 46vw !important;
                max-width: 600px !important;
                min-width: 380px !important;
            }
    }
    @media (max-width: 415px) {
            .age, .speakingLanguageAge, .otherGender, .input-invalid, .input-invalid_speaklangage{
                width: 274px !important;
            }
    }
    @media (max-width: 320px)) {
            .age, .speakingLanguageAge, .otherGender, .input-invalid, .input-invalid_speaklangage{
                width: 225px !important;
            }
    }
    @media (max-width: 280px) {
            .age, .speakingLanguageAge, .otherGender, .input-invalid, .input-invalid_speaklangage{
                width: 190px !important;
            }
    }
    
    body {
        opacity: 1;
        /* animation: imageAnimation 2s ; */
    }
    
    .main-content-inner,
    .mainContentArea {
        animation: imageAnimation 1s;
    }
    
    
    
    .duration {
        display: none;
    }
    
    @keyframes mMenuAnimtion {
        from {
            left: -300px;
            opacity: 0;
        }
    
        to {
            left: 0px;
            opacity: 1;
        }
    }
    
    @keyframes imageAnimation {
        from {
            opacity: 0;
        }
    
        to {
            opacity: 1;
        }
    }
    
    @keyframes highlight {
        from {
            opacity: 0;
        }
    
        to {
            opacity: 1;
        }
    }
    
    .centers1 {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        /* Change flex-direction to 'row' to align items horizontally */
    }
    
    .digit-symbol-ul {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        padding: 0;
    }
    
    .digit-symbol-ul li {
        margin: 0 5px; /* Adjust the margin between buttons */
    }
    
    .digit-symbol-ul li .slds-button {
        border-radius: 3px !important;
        box-shadow: rgb(0 0 0 / 30%) 0px 11px 12px -7px;
        color: #163248 !important;
        background-color: #fff !important;
        font-weight: 200 !important;
        border: 1px #bdbdbd solid !important;
        max-width: 100%;
        font-size: 24px; /* Increase the font size */
        padding: 15px 10px; /* Adjust padding for button size */
    }
    
    .digit-symbol-ul li .slds-button[disabled],
    .digit-symbol-ul li .slds-button:disabled {
        background-color: #fff !important;
        border: 1px #bdbdbd solid !important;
        color: #000305 !important;
    }
    
    .digit-symbol-ul .inputbtn_lbl {
        margin-bottom: 50px;
        border: 1px #ccc solid;
    }
    
    .digit-symbol-ul {
        justify-content: center;
        margin: auto;
        margin-top: 10px;
    }
    
    .digit-symbol-ul .slds-button {
        font-size: 24px !important;
        padding: 12px 5px 12px !important;
        min-width: 100%;
        text-align: center;
        display: inline-block;
        width : 80px;
    }
    
    .camel-cactus-ul {
        justify-content: center;
        margin: auto;
        margin-top: 16px;
    }
    
    .camel-cactus-ul li{	
        padding-right: 15px;
        padding-bottom: 2px;    
        min-width: 210px;    
        width: 25%;
        float: none;
        display: inline-block;
        vertical-align: middle;
    }
    .camel-cactus-ul div {   
        padding-right: 15px;
        padding-bottom: 2px;    
        min-width: 210px;    
        width: 25%;
        float: none;
        display: inline-block;
        vertical-align: middle;
    }
    
    
    .camel-cactus-ul li .slds-button {
        border-radius: 3px !important;
        box-shadow: rgb(0 0 0 / 30%) 0px 11px 12px -7px;
        color: #163248 !important;
        background-color: #fff !important;
        font-weight: 200 !important;
        border: 1px #bdbdbd solid !important;
        max-width: 100%;
    }
    
    .camel-cactus-ul .slds-button {
        font-size: 24px !important;
        padding: 15px 5px 15px !important;
        min-width: 100%;
        text-align: center;
        display: inline-block;
    }
    
    .camelImgtop {
            width: 200px !important;
            height: 134px !important;
        }
        
        .wine {
            width: 160px !important;
            height: 200px !important;
        }
    .camelImgscrewdriver {
        width: 300px !important;
        height: 200px !important;
    }
    
    @media (max-width: 600px) {
        .camel-cactus-ul li{	
            padding-right: 15px;
            padding-bottom: 2px;    
            min-width: 35vw;    
            width: 25%;
            float: none;
            display: inline-block;
            vertical-align: middle;
        }
        .camel-cactus-ul div {   
            padding-right: 15px;
            padding-bottom: 2px;    
            min-width: 35vw;    
            width: 25%;
            float: none;
            display: inline-block;
            vertical-align: middle;
        }
    }