({
    myAction: function (component, event, helper) {

        //console.log('image load');
        //changes preload
        let image_path = "../resource/mindGamesImages/objects/";
        let bgimages = [];
        var imgContainer = document.getElementById('imgContainer');

        function preloadImage(imgdata) {
            for (var i = 0; i < imgdata.length; i++) {
                bgimages[i] = new Image();
                bgimages[i].src = image_path + imgdata[i];
                imgContainer.appendChild(bgimages[i]);
            }
        }
        preloadImage([
            "blobs1_2.png?v=4",
            "ppattern_3.png?v=4",
            "ppattern_3_ES.png?v=4",
            "sqr1_2.png?v=4",
            "S_2_2/24/1L_blob_HA_NM_018_inner_ABC_0.png?v=4",
            "S_2_2/24/1R_blob_HA_NM_018_inner_ABD_145.png?v=4",
            "S_2_2/24/2L_blob_HA_NM_010a_fill_ABC_0.png?v=4",
            "S_2_2/24/2R_blob_HA_NM_010a_fill_ABD_160.png?v=4",
            "S_2_2/24/3L_blob_HA_M_018_inner_EFG_0.png?v=4",
            "S_2_2/24/3R_blob_HA_M_018_inner_EFG_75.png?v=4",
            "S_2_2/24/4L_square_HA_NM_size01xx_pos1_40.png?v=4",
            "S_2_2/24/4R_square_HA_NM_size01xx_pos3_80.png?v=4",
            "S_2_2/24/5L_square_HA_M_size04xx_pos1_25.png?v=4",
            "S_2_2/24/5R_square_HA_M_size04xx_pos1_65.png?v=4",
            "S_2_2/24/6L_square_HA_NM_size03xx_pos1_120.png?v=4",
            "S_2_2/24/6R_square_HA_NM_size03xx_pos3_70.png?v=4",
            "S_2_2/24/7L_square_LA_NM_esize03xx_pos1_55.png?v=4",
            "S_2_2/24/7R_square_LA_NM_esize03xx_pos3_95.png?v=4",
            "S_2_2/24/8L_square_LA_NM_esize05xx_pos1_60.png?v=4",
            "S_2_2/24/8R_square_LA_NM_esize05xx_pos2_20.png?v=4",
            "S_2_2/24/9L_square_LA_NM_esize07xx_pos1_40.png?v=4",
            "S_2_2/24/9R_square_LA_NM_esize07xx_pos3_160.png?v=4",
            "S_2_2/24/10L_blob_LA_NM_018_low_JKL_0.png?v=4",
            "S_2_2/24/10R_blob_LA_NM_018_low_MNO_110.png?v=4",
            "S_2_2/24/11L_blob_LA_NM_000_low_JKL_0.png?v=4",
            "S_2_2/24/11R_blob_LA_NM_000_low_MNO_100.png?v=4",
            "S_2_2/24/12L_blob_LA_M_019_fill_PQR_0.png?v=4",
            "S_2_2/24/12R_blob_LA_M_019_fill_PQR_95.png?v=4",
            "S_2_2/24/13L_blob_HA_M_018_fill_EFG_0.png?v=4",
            "S_2_2/24/13R_blob_HA_M_018_fill_EFG_110.png?v=4",
            "S_2_2/24/14L_blob_HA_NM_037x3_fill_ABC_0.png?v=4",
            "S_2_2/24/14R_blob_HA_NM_037x3_fill_ABD_60.png?v=4",
            "S_2_2/24/15L_blob_HA_NM_020_outer_ABC_0.png?v=4",
            "S_2_2/24/15R_blob_HA_NM_020_outer_ABD_75.png?v=4",
            "S_2_2/24/16L_square_HA_M_size02xx_pos1_110.png?v=4",
            "S_2_2/24/16R_square_HA_M_size02xx_pos1_70.png?v=4",
            "S_2_2/24/17L_square_HA_NM_size05xx_pos1_75.png?v=4",
            "S_2_2/24/17R_square_HA_NM_size05xx_pos2_130.png?v=4",
            "S_2_2/24/18L_square_HA_NM_size25_pos1_65.png?v=4",
            "S_2_2/24/18R_square_HA_NM_size25_pos3_130.png?v=4",
            "S_2_2/24/19L_square_LA_M_esize02xx_pos1_125.png?v=4",
            "S_2_2/24/19R_square_LA_M_esize02xx_pos1_75.png?v=4",
            "S_2_2/24/20L_square_LA_M_esize04xx_pos1_100.png?v=4",
            "S_2_2/24/20R_square_LA_M_esize04xx_pos1_35.png?v=4",
            "S_2_2/24/21L_square_LA_NM_esize01xx_pos1_110.png?v=4",
            "S_2_2/24/21R_square_LA_NM_esize01xx_pos3_160.png?v=4",
            "S_2_2/24/22L_blob_LA_M_018_low_PQR_0.png?v=4",
            "S_2_2/24/22R_blob_LA_M_018_low_PQR_55.png?v=4",
            "S_2_2/24/23L_blob_LA_NM_021_low_JKL_0.png?v=4",
            "S_2_2/24/23R_blob_LA_NM_021_low_MNO_50.png?v=4",
            "S_2_2/24/24L_blob_LA_NM_019_fill_JKL_0.png?v=4",
            "S_2_2/24/24R_blob_LA_NM_019_fill_MNO_125.png?v=4",
            "S_2_2/200/1L_blob_LA_NM_028b_fill_JKL_0.png?v=4",
            "S_2_2/200/1R_blob_LA_NM_028b_fill_MNO_65.png?v=4",
            "S_2_2/200/2L_blob_LA_NM_001_fill_JKL_0.png?v=4",
            "S_2_2/200/2R_blob_LA_NM_001_fill_MNO_140.png?v=4",
            "S_2_2/200/3L_blob_LA_NM_031a_outer_JKL_0.png?v=4",
            "S_2_2/200/3R_blob_LA_NM_031a_outer_MNO_120.png?v=4",
            "S_2_2/200/4L_square_LA_NM_esize21_pos1_65.png?v=4",
            "S_2_2/200/4R_square_LA_NM_esize21_pos3_110.png?v=4",
            "S_2_2/200/5L_blob_HA_M_006_outer_EFG_0.png?v=4",
            "S_2_2/200/5R_blob_HA_M_006_outer_EFG_150.png?v=4",
            "S_2_2/200/6L_square_HA_NM_size33_pos1_165.png?v=4",
            "S_2_2/200/6R_square_HA_NM_size33_pos3_130.png?v=4",
            "S_2_2/200/7L_blob_HA_M_008a_fill_EFG_0.png?v=4",
            "S_2_2/200/7R_blob_HA_M_008a_fill_EFG_150.png?v=4",
            "S_2_2/200/8L_blob_HA_NM_022_outer_ABC_0.png?v=4",
            "S_2_2/200/8R_blob_HA_NM_022_outer_ABD_110.png?v=4",
            "S_2_2/200/9L_square_HA_NM_size12xxx_pos1_130.png?v=4",
            "S_2_2/200/9R_square_HA_NM_size12xxx_pos3_155.png?v=4",
            "S_2_2/200/10L_square_LA_M_esize04x_pos1_115.png?v=4",
            "S_2_2/200/10R_square_LA_M_esize04x_pos1_75.png?v=4",
            "S_2_2/200/11L_blob_HA_M_005_inner_EFG_0.png?v=4",
            "S_2_2/200/11R_blob_HA_M_005_inner_EFG_30.png?v=4",
            "S_2_2/200/12L_blob_HA_NM_007_outer_ABC_0.png?v=4",
            "S_2_2/200/12R_blob_HA_NM_007_outer_ABD_160.png?v=4",
            "S_2_2/200/13L_blob_HA_M_003_outer_EFG_0.png?v=4",
            "S_2_2/200/13R_blob_HA_M_003_outer_EFG_60.png?v=4",
            "S_2_2/200/14L_square_LA_M_esize36x_pos1_130.png?v=4",
            "S_2_2/200/14R_square_LA_M_esize36x_pos1_75.png?v=4",
            "S_2_2/200/15L_square_HA_M_size22x_pos1_110.png?v=4",
            "S_2_2/200/15R_square_HA_M_size22x_pos1_50.png?v=4",
            "S_2_2/200/16L_blob_LA_M_015_inner_PQR_0.png?v=4",
            "S_2_2/200/16R_blob_LA_M_015_inner_PQR_150.png?v=4",
            "S_2_2/200/17L_square_HA_NM_size07x_pos1_125.png?v=4",
            "S_2_2/200/17R_square_HA_NM_size07x_pos2_65.png?v=4",
            "S_2_2/200/18L_square_LA_NM_esize11x_pos1_65.png?v=4",
            "S_2_2/200/18R_square_LA_NM_esize11x_pos2_115.png?v=4",
            "S_2_2/200/19L_blob_HA_NM_033_outer_ABC_0.png?v=4",
            "S_2_2/200/19R_blob_HA_NM_033_outer_ABD_80.png?v=4",
            "S_2_2/200/20L_square_LA_NM_esize31x_pos1_15.png?v=4",
            "S_2_2/200/20R_square_LA_NM_esize31x_pos3_150.png?v=4",
            "S_2_2/200/21L_blob_LA_NM_025a_low_JKL_0.png?v=4",
            "S_2_2/200/21R_blob_LA_NM_025a_low_MNO_25.png?v=4",
            "S_2_2/200/22L_square_HA_NM_size23xxx_pos1_35.png?v=4",
            "S_2_2/200/22R_square_HA_NM_size23xxx_pos2_155.png?v=4",
            "S_2_2/200/23L_square_HA_M_size36x_pos1_110.png?v=4",
            "S_2_2/200/23R_square_HA_M_size36x_pos1_145.png?v=4",
            "S_2_2/200/24L_blob_LA_M_015_low_PQR_0.png?v=4",
            "S_2_2/200/24R_blob_LA_M_015_low_PQR_65.png?v=4",
            "S_2_2/200/25L_blob_HA_M_004_outer_EFG_0.png?v=4",
            "S_2_2/200/25R_blob_HA_M_004_outer_EFG_80.png?v=4",
            "S_2_2/200/26L_square_LA_M_esize08_pos1_110.png?v=4",
            "S_2_2/200/26R_square_LA_M_esize08_pos1_160.png?v=4",
            "S_2_2/200/27L_square_HA_M_size10_pos1_100.png?v=4",
            "S_2_2/200/27R_square_HA_M_size10_pos1_40.png?v=4",
            "S_2_2/200/28L_blob_HA_NM_032_outer_ABC_0.png?v=4",
            "S_2_2/200/28R_blob_HA_NM_032_outer_ABD_160.png?v=4",
            "S_2_2/200/29L_blob_LA_NM_029b_low_JKL_0.png?v=4",
            "S_2_2/200/29R_blob_LA_NM_029b_low_MNO_35.png?v=4",
            "S_2_2/200/30L_blob_LA_M_015_fill_PQR_0.png?v=4",
            "S_2_2/200/30R_blob_LA_M_015_fill_PQR_125.png?v=4",
            "S_2_2/200/31L_blob_LA_M_005_fill_PQR_0.png?v=4",
            "S_2_2/200/31R_blob_LA_M_005_fill_PQR_130.png?v=4",
            "S_2_2/200/32L_blob_HA_M_010b_fillinner_EFG_0.png?v=4",
            "S_2_2/200/32R_blob_HA_M_010b_fillinner_EFG_160.png?v=4",
            "S_2_2/200/33L_square_HA_NM_size01x_pos1_95.png?v=4",
            "S_2_2/200/33R_square_HA_NM_size01x_pos2_130.png?v=4",
            "S_2_2/200/34L_blob_LA_NM_022_low_JKL_0.png?v=4",
            "S_2_2/200/34R_blob_LA_NM_022_low_MNO_125.png?v=4",
            "S_2_2/200/35L_blob_HA_M_009b_fillinner_EFG_0.png?v=4",
            "S_2_2/200/35R_blob_HA_M_009b_fillinner_EFG_150.png?v=4",
            "S_2_2/200/36L_blob_LA_NM_011_fill_JKL_0.png?v=4",
            "S_2_2/200/36R_blob_LA_NM_011_fill_MNO_70.png?v=4",
            "S_2_2/200/37L_square_LA_NM_esize19xxx_pos1_160.png?v=4",
            "S_2_2/200/37R_square_LA_NM_esize19xxx_pos2_135.png?v=4",
            "S_2_2/200/38L_square_HA_NM_size29xxx_pos1_145.png?v=4",
            "S_2_2/200/38R_square_HA_NM_size29xxx_pos2_95.png?v=4",
            "S_2_2/200/39L_blob_HA_M_016_outer_EFG_0.png?v=4",
            "S_2_2/200/39R_blob_HA_M_016_outer_EFG_50.png?v=4",
            "S_2_2/200/40L_square_LA_M_esize32_pos1_105.png?v=4",
            "S_2_2/200/40R_square_LA_M_esize32_pos1_35.png?v=4",
            "S_2_2/200/41L_blob_LA_NM_027a_low_JKL_0.png?v=4",
            "S_2_2/200/41R_blob_LA_NM_027a_low_MNO_100.png?v=4",
            "S_2_2/200/42L_squae_HA_M_size24x_pos1_135.png?v=4",
            "S_2_2/200/42R_square_HA_M_size24x_pos1_75.png?v=4",
            "S_2_2/200/43L_blob_HA_NM_008x1_fill_ABC_0.png?v=4",
            "S_2_2/200/43R_blob_HA_NM_008x1_fill_ABD_85.png?v=4",
            "S_2_2/200/44L_square_LA_M_esize28_pos1_115.png?v=4",
            "S_2_2/200/44R_square_LA_M_esize28_pos1_155.png?v=4",
            "S_2_2/200/45L_square_HA_M_size32x_pos1_145.png?v=4",
            "S_2_2/200/45R_square_HA_M_size32x_pos1_85.png?v=4",
            "S_2_2/200/46L_blob_LA_NM_012_fill_JKL_0.png?v=4",
            "S_2_2/200/46R_blob_LA_NM_012_fill_MNO_145.png?v=4",
            "S_2_2/200/47L_square_HA_M_size34x_pos1_40.png?v=4",
            "S_2_2/200/47R_square_HA_M_size34x_pos1_95.png?v=4",
            "S_2_2/200/48L_square_LA_NM_esize30xxx_pos1_55.png?v=4",
            "S_2_2/200/48R_square_LA_NM_esize30xxx_pos2_160.png?v=4",
            "S_2_2/200/49L_blob_LA_M_011_low_PQR_0.png?v=4",
            "S_2_2/200/49R_blob_LA_M_011_low_PQR_120.png?v=4",
            "S_2_2/200/50L_square_LA_M_esize10_pos1_130.png?v=4",
            "S_2_2/200/50R_square_LA_M_esize10_pos1_95.png?v=4",
            "S_2_2/200/51L_square_LA_NM_esize06xxx_pos1_55.png?v=4",
            "S_2_2/200/51R_square_LA_NM_esize06xxx_pos3_95.png?v=4",
            "S_2_2/200/52L_blob_HA_M_001_inner_EFG_0.png?v=4",
            "S_2_2/200/52R_blob_HA_M_001_inner_EFG_70.png?v=4",
            "S_2_2/200/53L_blob_LA_M_012_outer_PQR_0.png?v=4",
            "S_2_2/200/53R_blob_LA_M_012_outer_PQR_155.png?v=4",
            "S_2_2/200/54L_square_LA_M_esize08x_pos1_110.png?v=4",
            "S_2_2/200/54R_square_LA_M_esize08x_pos1_160.png?v=4",
            "S_2_2/200/55L_blob_LA_M_007_fill_PQR_0.png?v=4",
            "S_2_2/200/55R_blob_LA_M_007_fill_PQR_110.png?v=4",
            "S_2_2/200/56L_blob_HA_M_008_outer_EFG_0.png?v=4",
            "S_2_2/200/56R_blob_HA_M_008_outer_EFG_80.png?v=4",
            "S_2_2/200/57L_blob_LA_M_015_outer_PQR_0.png?v=4",
            "S_2_2/200/57R_blob_LA_M_015_outer_PQR_85.png?v=4",
            "S_2_2/200/58L_blob_HA_NM_008x2_fill_ABC_0.png?v=4",
            "S_2_2/200/58R_blob_HA_NM_008x2_fill_ABD_110.png?v=4",
            "S_2_2/200/59L_blob_HA_NM_008a_fill_ABC_0.png?v=4",
            "S_2_2/200/59R_blob_HA_NM_008a_fill_ABD_60.png?v=4",
            "S_2_2/200/60L_square_LA_NM_esize29xxx_pos1_110.png?v=4",
            "S_2_2/200/60R_square_LA_NM_esize29xxx_pos1_140.png?v=4",
            "S_2_2/200/61L_blob_HA_NM_037x2_fill_ABC_0.png?v=4",
            "S_2_2/200/61R_blob_HA_NM_037x2_fill_ABD_140.png?v=4",
            "S_2_2/200/62L_blob_HA_M_010_outer_EFG_0.png?v=4",
            "S_2_2/200/62R_blob_HA_M_010_outer_EFG_95.png?v=4",
            "S_2_2/200/63L_blob_HA_NM_030_outer_ABC_0.png?v=4",
            "S_2_2/200/63R_blob_HA_NM_030_outer_ABD_105.png?v=4",
            "S_2_2/200/64L_blob_LA_M_013_low_PQR_0.png?v=4",
            "S_2_2/200/64R_blob_LA_M_013_low_PQR_70.png?v=4",
            "S_2_2/200/65L_blob_LA_M_007_low_PQR_0.png?v=4",
            "S_2_2/200/65R_blob_LA_M_007_low_PQR_150.png?v=4",
            "S_2_2/200/66L_square_HA_NM_size16xxx_pos1_135.png?v=4",
            "S_2_2/200/66R_square_HA_NM_size16xxx_pos3_75.png?v=4",
            "S_2_2/200/67L_square_HA_NM_size18xxx_pos1_70.png?v=4",
            "S_2_2/200/67R_square_HA_NM_size18xxx_pos3_100.png?v=4",
            "S_2_2/200/68L_blob_HA_NM_021_outer_ABC_0.png?v=4",
            "S_2_2/200/68R_blob_HA_NM_021_outer_ABD_75.png?v=4",
            "S_2_2/200/69L_blob_LA_NM_007_low_JKL_0.png?v=4",
            "S_2_2/200/69R_blob_LA_NM_007_low_MNO_95.png?v=4",
            "S_2_2/200/70L_square_LA_M_esize20_pos1_150.png?v=4",
            "S_2_2/200/70R_square_LA_M_esize20_pos1_85.png?v=4",
            "S_2_2/200/71L_square_HA_NM_size15xxx_pos1_120.png?v=4",
            "S_2_2/200/71R_square_HA_NM_size15xxx_pos3_85.png?v=4",
            "S_2_2/200/72L_square_LA_NM_esize03_pos1_120.png?v=4",
            "S_2_2/200/72R_square_LA_NM_esize03_pos3_150.png?v=4",
            "S_2_2/200/73L_square_LA_M_esize02_pos1_20.png?v=4",
            "S_2_2/200/73R_square_LA_M_esize02_pos1_65.png?v=4",
            "S_2_2/200/74L_blob_LA_NM_004_low_JKL_0.png?v=4",
            "S_2_2/200/74R_blob_LA_NM_004_low_MNO_50.png?v=4",
            "S_2_2/200/75L_blob_LA_NM_013_fill_JKL_0.png?v=4",
            "S_2_2/200/75R_blob_LA_NM_013_fill_MNO_100.png?v=4",
            "S_2_2/200/76L_blob_HA_NM_024_outer_ABC_0.png?v=4",
            "S_2_2/200/76R_blob_HA_NM_024_outer_ABD_145.png?v=4",
            "S_2_2/200/77L_square_HA_M_size30x_pos1_35.png?v=4",
            "S_2_2/200/77R_square_HA_M_size30x_pos1_60.png?v=4",
            "S_2_2/200/78L_blob_LA_M_008_inner_PQR_0.png?v=4",
            "S_2_2/200/78R_blob_LA_M_008_inner_PQR_60.png?v=4",
            "S_2_2/200/79L_blob_LA_M_005_low_PQR_0.png?v=4",
            "S_2_2/200/79R_blob_LA_M_005_low_PQR_110.png?v=4",
            "S_2_2/200/80L_square_HA_NM_size21xxx_pos1_95.png?v=4",
            "S_2_2/200/80R_square_HA_NM_size21xxx_pos3_50.png?v=4",
            "S_2_2/200/81L_blob_HA_NM_027a_fill_ABC_0.png?v=4",
            "S_2_2/200/81R_blob_HA_NM_027a_fill_ABD_50.png?v=4",
            "S_2_2/200/82L_blob_LA_M_009_outer_PQR_0.png?v=4",
            "S_2_2/200/82R_blob_LA_M_009_outer_PQR_115.png?v=4",
            "S_2_2/200/83L_square_LA_NM_esize34xxx_pos1_120.png?v=4",
            "S_2_2/200/83R_square_LA_NM_esize34xxx_pos3_65.png?v=4",
            "S_2_2/200/84L_blob_HA_NM_025_inner_ABC_0.png?v=4",
            "S_2_2/200/84R_blob_HA_NM_025_inner_ABD_85.png?v=4",
            "S_2_2/200/85L_square_LA_M_esize30_pos1_120.png?v=4",
            "S_2_2/200/85R_square_LA_M_esize30_pos1_70.png?v=4",
            "S_2_2/200/86L_square_LA_NM_esize03xxx_pos1_40.png?v=4",
            "S_2_2/200/86R_square_LA_NM_esize03xxx_pos2_75.png?v=4",
            "S_2_2/200/87L_square_LA_M_esize24_pos1_10.png?v=4",
            "S_2_2/200/87R_square_LA_M_esize24_pos1_125.png?v=4",
            "S_2_2/200/88L_square_LA_M_esize06x_pos1_100.png?v=4",
            "S_2_2/200/88R_square_LA_M_esize06x_pos1_50.png?v=4",
            "S_2_2/200/89L_square_LA_M_esize06_pos1_100.png?v=4",
            "S_2_2/200/89R_square_LA_M_esize06_pos1_50.png?v=4",
            "S_2_2/200/90L_blob_HA_M_010a_fill_EFG_0.png?v=4",
            "S_2_2/200/90R_blob_HA_M_010a_fill_EFG_130.png?v=4",
            "S_2_2/200/91L_square_HA_M_size08x_pos1_145.png?v=4",
            "S_2_2/200/91R_square_HA_M_size08x_pos1_85.png?v=4",
            "S_2_2/200/92L_blob_LA_M_010_low_PQR_0.png?v=4",
            "S_2_2/200/92R_blob_LA_M_010_low_PQR_50.png?v=4",
            "S_2_2/200/93L_square_HA_NM_size31_pos1_50.png?v=4",
            "S_2_2/200/93R_square_HA_NM_size31_pos2_75.png?v=4",
            "S_2_2/200/94L_blob_HA_NM_037x1_fill_ABC_0.png?v=4",
            "S_2_2/200/94R_blob_HA_NM_037x1_fill_ABD_75.png?v=4",
            "S_2_2/200/95L_square_HA_NM_size11_pos1_115.png?v=4",
            "S_2_2/200/95R_square_HA_NM_size11_pos2_65.png?v=4",
            "S_2_2/200/96L_square_LA_M_esize24x_pos1_10.png?v=4",
            "S_2_2/200/96R_square_LA_M_esize24x_pos1_125.png?v=4",
            "S_2_2/200/97L_square_LA_M_esize04_pos1_115.png?v=4",
            "S_2_2/200/97R_square_LA_M_esize04_pos1_75.png?v=4",
            "S_2_2/200/98L_blob_LA_NM_004_fill_JKL_0.png?v=4",
            "S_2_2/200/98R_blob_LA_NM_004_fill_MNO_100.png?v=4",
            "S_2_2/200/99L_square_HA_NM_size29x_pos1_125.png?v=4",
            "S_2_2/200/99R_square_HA_NM_size29x_pos2_85.png?v=4",
            "S_2_2/200/100L_blob_HA_NM_003_outer_ABC_0.png?v=4",
            "S_2_2/200/100R_blob_HA_NM_003_outer_ABD_160.png?v=4",
            "S_2_2/200/101L_blob_LA_M_003_fill_PQR_0.png?v=4",
            "S_2_2/200/101R_blob_LA_M_003_fill_PQR_120.png?v=4",
            "S_2_2/200/102L_blob_HA_M_000_inner_EFG_0.png?v=4",
            "S_2_2/200/102R_blob_HA_M_000_inner_EFG_150.png?v=4",
            "S_2_2/200/103L_blob_HA_NM_008b_fill_ABC_0.png?v=4",
            "S_2_2/200/103R_blob_HA_NM_008b_fill_ABD_140.png?v=4",
            "S_2_2/200/104L_square_LA_M_esize10x_pos1_130.png?v=4",
            "S_2_2/200/104R_square_LA_M_esize10x_pos1_95.png?v=4",
            "S_2_2/200/105L_blob_HA_NM_032_fill_ABC_0.png?v=4",
            "S_2_2/200/105R_blob_HA_NM_032_fill_ABD_75.png?v=4",
            "S_2_2/200/106L_blob_HA_M_014_inner_EFG_0.png?v=4",
            "S_2_2/200/106R_blob_HA_M_014_inner_EFG_110.png?v=4",
            "S_2_2/200/107L_square_HA_M_size02x_pos1_145.png?v=4",
            "S_2_2/200/107R_square_HA_M_size02x_pos1_85.png?v=4",
            "S_2_2/200/108L_blob_LA_NM_003_low_JKL_0.png?v=4",
            "S_2_2/200/108R_blob_LA_NM_003_low_MNO_150.png?v=4",
            "S_2_2/200/109L_square_HA_M_size14_pos1_120.png?v=4",
            "S_2_2/200/109R_square_HA_M_size14_pos1_75.png?v=4",
            "S_2_2/200/110L_blob_LA_NM_023_low_JKL_0.png?v=4",
            "S_2_2/200/110R_blob_LA_NM_023_low_MNO_160.png?v=4",
            "S_2_2/200/111L_blob_LA_M_013_outer_PQR_0.png?v=4",
            "S_2_2/200/111R_blob_LA_M_013_outer_PQR_110.png?v=4",
            "S_2_2/200/112L_square_HA_NM_size13x_pos1_165.png?v=4",
            "S_2_2/200/112R_sqaure_HA_NM_size13x_pos3_20.png?v=4",
            "S_2_2/200/113L_square_HA_M_size08_pos1_145.png?v=4",
            "S_2_2/200/113R_square_HA_M_size08_pos1_85.png?v=4",
            "S_2_2/200/114L_square_LA_NM_esize29x_pos1_25.png?v=4",
            "S_2_2/200/114R_square_LA_NM_esize29x_pos2_80.png?v=4",
            "S_2_2/200/115L_square_LA_NM_esize28xxx_pos1_70.png?v=4",
            "S_2_2/200/115R_square_LA_NM_esize28xxx_pos3_115.png?v=4",
            "S_2_2/200/116L_blob_LA_M_009_low_PQR_0.png?v=4",
            "S_2_2/200/116R_blob_LA_M_009_low_PQR_100.png?v=4",
            "S_2_2/200/117L_blob_HA_NM_029a_inner_ABC_0.png?v=4",
            "S_2_2/200/117R_blob_HA_NM_029a_inner_ABD_135.png?v=4",
            "S_2_2/200/118L_square_LA_M_esize36_pos1_130.png?v=4",
            "S_2_2/200/118R_square_LA_M_esize36_pos1_75.png?v=4",
            "S_2_2/200/119L_square_HA_NM_size19xx_pos1_110.png?v=4",
            "S_2_2/200/119R_square_HA_NM_size19xx_pos2_165.png?v=4",
            "S_2_2/200/120L_blob_HA_M_003_inner_EFG_0.png?v=4",
            "S_2_2/200/120R_blob_HA_M_003_inner_EFG_110.png?v=4",
            "S_2_2/200/121L_square_LA_M_esize12_pos1_155.png?v=4",
            "S_2_2/200/121R_square_LA_M_esize12_pos1_25.png?v=4",
            "S_2_2/200/122L_square_HA_NM_size31x_pos1_50.png?v=4",
            "S_2_2/200/122R_square_HA_NM_size31x_pos2_75.png?v=4",
            "S_2_2/200/123L_blob_HA_NM_025_outer_ABC_0.png?v=4",
            "S_2_2/200/123R_blob_HA_NM_025_outer_ABD_145.png?v=4",
            "S_2_2/200/124L_square_HA_M_size34_pos1_40.png?v=4",
            "S_2_2/200/124R_square_HA_M_size34_pos1_95.png?v=4",
            "S_2_2/200/125L_square_HA_M_size14x_pos1_120.png?v=4",
            "S_2_2/200/125R_square_HA_M_size14x_pos1_75.png?v=4",
            "S_2_2/200/126L_square_LA_NM_esize05_pos1_75.png?v=4",
            "S_2_2/200/126R_square_LA_NM_esize05_pos2_120.png?v=4",
            "S_2_2/200/127L_square_LA_M_esize12x_pos1_155.png?v=4",
            "S_2_2/200/127R_square_LA_M_esize12x_pos1_25.png?v=4",
            "S_2_2/200/128L_square_HA_M_size12x_pos1_130.png?v=4",
            "S_2_2/200/128R_square_HA_M_size12x_pos1_80.png?v=4",
            "S_2_2/200/129L_blob_HA_M_004_inner_EFG_0.png?v=4",
            "S_2_2/200/129R_blob_HA_M_004_inner_EFG_130.png?v=4",
            "S_2_2/200/130L_blob_LA_NM_011_outer_JKL_0.png?v=4",
            "S_2_2/200/130R_blob_LA_NM_011_outer_MNO_40.png?v=4",
            "S_2_2/200/131L_blob_HA_NM_023_outer_ABC_0.png?v=4",
            "S_2_2/200/131R_blob_HA_NM_023_outer_ABD_125.png?v=4",
            "S_2_2/200/132L_square_HA_M_size36_pos1_110.png?v=4",
            "S_2_2/200/132R_square_HA_M_size36_pos1_145.png?v=4",
            "S_2_2/200/133L_square_LA_M_esize14x_pos1_105.png?v=4",
            "S_2_2/200/133R_square_LA_M_esize14x_pos1_40.png?v=4",
            "S_2_2/200/134L_square_HA_NM_size25xxx_pos1_140.png?v=4",
            "S_2_2/200/134R_square_HA_NM_size25xxx_pos2_20.png?v=4",
            "S_2_2/200/135L_square_LA_NM_esize33x_pos1_170.png?v=4",
            "S_2_2/200/135R_square_LA_NM_esize33x_pos2_95.png?v=4",
            "S_2_2/200/136L_blob_LA_NM_002_low_JKL_0.png?v=4",
            "S_2_2/200/136R_blob_LA_NM_002_low_MNO_60.png?v=4",
            "S_2_2/200/137L_square_HA_NM_size05_pos1_25.png?v=4",
            "S_2_2/200/137R_square_HA_NM_size05_pos2_165.png?v=4",
            "S_2_2/200/138L_blob_HA_M_007_outer_EFG_0.png?v=4",
            "S_2_2/200/138R_blob_HA_M_007_outer_EFG_70.png?v=4",
            "S_2_2/200/139L_square_HA_NM_size19x_pos1_135.png?v=4",
            "S_2_2/200/139R_square_HA_NM_size19x_pos3_160.png?v=4",
            "S_2_2/200/140L_blob_HA_M_019_outer_EFG_0.png?v=4",
            "S_2_2/200/140R_blob_HA_M_019_outer_EFG_70.png?v=4",
            "S_2_2/200/141L_square_LA_M_esize32x_pos1_105.png?v=4",
            "S_2_2/200/141R_square_LA_M_esize32x_pos1_35.png?v=4",
            "S_2_2/200/142L_square_HA_M_size26x_pos1_115.png?v=4",
            "S_2_2/200/142R_square_HA_M_size26x_pos1_150.png?v=4",
            "S_2_2/200/143L_square_LA_NM_esize35_pos1_50.png?v=4",
            "S_2_2/200/143R_square_LA_NM_esize35_pos2_160.png?v=4",
            "S_2_2/200/144L_square_HA_NM_size19xxx_pos1_60.png?v=4",
            "S_2_2/200/144R_square_HA_NM_size19xxx_pos2_25.png?v=4",
            "S_2_2/200/145L_blob_LA_NM_030b_inner_JKL_0.png?v=4",
            "S_2_2/200/145R_blob_LA_NM_030b_inner_MNO_140.png?v=4",
            "S_2_2/200/146L_blob_LA_M_000_low_PQR_0.png?v=4",
            "S_2_2/200/146R_blob_LA_M_000_low_PQR_50.png?v=4",
            "S_2_2/200/147L_blob_HA_NM_010_inner_ABC_0.png?v=4",
            "S_2_2/200/147R_blob_HA_NM_010_inner_ABD_145.png?v=4",
            "S_2_2/200/148L_blob_HA_M_010_inner_EFG_0.png?v=4",
            "S_2_2/200/148R_blob_HA_M_010_inner_EFG_60.png?v=4",
            "S_2_2/200/149L_blob_HA_M_002x_fill_EFG_0.png?v=4",
            "S_2_2/200/149R_blob_HA_M_002x_fill_EFG_120.png?v=4",
            "S_2_2/200/150L_square_HA_M_size04x_pos1_75.png?v=4",
            "S_2_2/200/150R_square_HA_M_size04x_pos1_85.png?v=4",
            "S_2_2/200/151L_square_LA_NM_esize03x_pos1_120.png?v=4",
            "S_2_2/200/151R_square_LA_NM_esize03x_pos3_150.png?v=4",
            "S_2_2/200/152L_square_HA_NM_size05xxx_pos1_65.png?v=4",
            "S_2_2/200/152R_square_HA_NM_size05xxx_pos2_115.png?v=4",
            "S_2_2/200/153L_sqaure_LA_NM_esize19xx_pos1_40.png?v=4",
            "S_2_2/200/153R_square_LA_NM_esize19xx_pos2_85.png?v=4",
            "S_2_2/200/154L_square_HA_NM_size13xxx_pos1_145.png?v=4",
            "S_2_2/200/154L_square_HA_NM_size13xxx_pos1_145.png?v=4",
            "S_2_2/200/155L_square_LA_NM_esize02xxx_pos1_110.png?v=4",
            "S_2_2/200/155R_square_LA_NM_esize02xxx_pos2_70.png?v=4",
            "S_2_2/200/156L_blob_HA_NM_059_fill_ABC_0.png?v=4",
            "S_2_2/200/156R_blob_HA_NM_059_fill_ABC_115.png?v=4",
            "S_2_2/200/157L_square_HA_M_size28_pos1_100.png?v=4",
            "S_2_2/200/157R_square_HA_M_size28_pos1_75.png?v=4",
            "S_2_2/200/158L_square_LA_M_esize30x_pos1_120.png?v=4",
            "S_2_2/200/158R_square_LA_M_esize30x_pos1_70.png?v=4",
            "S_2_2/200/159L_blob_LA_NM_022_fill_JKL_0.png?v=4",
            "S_2_2/200/159R_blob_LA_NM_022_fill_MNO_150.png?v=4",
            "S_2_2/200/160L_square_LA_M_esize26_pos1_140.png?v=4",
            "S_2_2/200/160R_square_LA_M_esize26_pos1_95.png?v=4",
            "S_2_2/200/161L_square_LA_M_esize28x_pos1_115.png?v=4",
            "S_2_2/200/161R_square_LA_M_esize28x_pos1_155.png?v=4",
            "S_2_2/200/162L_blob_LA_M_013_fill_PQR_0.png?v=4",
            "S_2_2/200/162R_blob_LA_M_013_fill_PQR_140.png?v=4",
            "S_2_2/200/163L_blob_LA_NM_031b_outer_JKL_0.png?v=4",
            "S_2_2/200/163R_blob_LA_NM_031b_outer_MNO_65.png?v=4",
            "S_2_2/200/164L_blob_LA_NM_001_low_JKL_0.png?v=4",
            "S_2_2/200/164R_blob_LA_NM_001_low_MNO_140.png?v=4",
            "S_2_2/200/165L_square_LA_NM_esize17_pos1_100.png?v=4",
            "S_2_2/200/165R_square_LA_NM_esize17_pos3_140.png?v=4",
            "S_2_2/200/166L_square_LA_NM_esize01_pos1_30.png?v=4",
            "S_2_2/200/166R_square_LA_NM_esize01_pos3_50.png?v=4",
            "S_2_2/200/167L_blob_LA_NM_010_low_JKL_0.png?v=4",
            "S_2_2/200/167R_blob_LA_NM_010_low_MNO_75.png?v=4",
            "S_2_2/200/168L_blob_HA_M_007_inner_EFG_0.png?v=4",
            "S_2_2/200/168R_blob_HA_M_007_inner_EFG_40.png?v=4",
            "S_2_2/200/169L_blob_LA_M_003_low_PQR_0.png?v=4",
            "S_2_2/200/169R_blob_LA_M_003_low_PQR_70.png?v=4",
            "S_2_2/200/170L_square_LA_NM_esize07xxx_pos1_60.png?v=4",
            "S_2_2/200/170R_square_LA_NM_esize07xxx_pos3_115.png?v=4",
            "S_2_2/200/171L_blob_HA_NM_003_inner_ABC_0.png?v=4",
            "S_2_2/200/171R_blob_HA_NM_003_inner_ABD_80.png?v=4",
            "S_2_2/200/172L_square_HA_M_size30_pos1_35.png?v=4",
            "S_2_2/200/172R_square_HA_M_size30_pos1_60.png?v=4",
            "S_2_2/200/173L_square_HA_M_size18_pos1_150.png?v=4",
            "S_2_2/200/173R_square_HA_M_size18_pos1_85.png?v=4",
            "S_2_2/200/174L_square_LA_M_esize34_pos1_140.png?v=4",
            "S_2_2/200/174R_square_LA_M_esize34_pos1_75.png?v=4",
            "S_2_2/200/175L_square_LA_NM_esize04xxx_pos1_100.png?v=4",
            "S_2_2/200/175R_square_LA_NM_esize04xxx_pos2_150.png?v=4",
            "S_2_2/200/176L_blob_HA_NM_028b_inner_ABC_0.png?v=4",
            "S_2_2/200/176R_blob_HA_NM_028b_inner_ABD_55.png?v=4",
            "S_2_2/200/177L_blob_LA_M_004_low_PQR_0.png?v=4",
            "S_2_2/200/177R_blob_LA_M_004_low_PQR_110.png?v=4",
            "S_2_2/200/178L_blob_LA_M_012_low_PQR_0.png?v=4",
            "S_2_2/200/178R_blob_LA_M_012_low_PQR_50.png?v=4",
            "S_2_2/200/179L_blob_LA_NM_031_inner_JKL_0.png?v=4",
            "S_2_2/200/179R_blob_LA_NM_031_inner_MNO_140.png?v=4",
            "S_2_2/200/180L_square_LA_NM_esize27x_pos1_135.png?v=4",
            "S_2_2/200/180R_square_LA_NM_esize27x_pos2_85.png?v=4",
            "S_2_2/200/181L_square_HA_M_size10x_pos1_100.png?v=4",
            "S_2_2/200/181R_square_HA_M_size10x_pos1_40.png?v=4",
            "S_2_2/200/182L_blob_LA_M_004_fill_PQR_0.png?v=4",
            "S_2_2/200/182R_blob_LA_M_004_fill_PQR_140.png?v=4",
            "S_2_2/200/183L_blob_LA_M_006_fill_PQR_0.png?v=4",
            "S_2_2/200/183R_blob_LA_M_006_fill_PQR_50.png?v=4",
            "S_2_2/200/184L_blob_HA_M_008b_fillinner_EFG_0.png?v=4",
            "S_2_2/200/184R_blob_HA_M_008b_fillinner_EFG_120.png?v=4",
            "S_2_2/200/185L_blob_LA_M_002_outer_PQR_0.png?v=4",
            "S_2_2/200/185R_blob_LA_M_002_outer_PQR_120.png?v=4",
            "S_2_2/200/186L_blob_HA_NM_004_outer_ABC_0.png?v=4",
            "S_2_2/200/186R_blob_HA_NM_004_outer_ABD_140.png?v=4",
            "S_2_2/200/187L_blob_LA_NM_029a_outer_JKL_0.png?v=4",
            "S_2_2/200/187R_blob_LA_NM_029a_outer_MNO_160.png?v=4",
            "S_2_2/200/188L_square_LA_M_esize26x_pos1_140.png?v=4",
            "S_2_2/200/188R_square_LA_M_esize26x_pos1_95.png?v=4",
            "S_2_2/200/189L_square_LA_M_esize18x_pos1_40.png?v=4",
            "S_2_2/200/189R_square_LA_M_esize18x_pos1_75.png?v=4",
            "S_2_2/200/190L_square_HA_NM_size19_pos1_135.png?v=4",
            "S_2_2/200/190R_square_HA_NM_size19_pos3_160.png?v=4",
            "S_2_2/200/191L_blob_LA_NM_003_fill_JKL_0.png?v=4",
            "S_2_2/200/191R_blob_LA_NM_003_fill_MNO_70.png?v=4",
            "S_2_2/200/192L_blob_HA_M_017_outer_EFG_0.png?v=4",
            "S_2_2/200/192R_blob_HA_M_017_outer_EFG_80.png?v=4",
            "S_2_2/200/193L_square_LA_NM_esize22xxx_pos1_125.png?v=4",
            "S_2_2/200/193R_square_LA_NM_esize22xxx_pos2_70.png?v=4",
            "S_2_2/200/194L_square_HA_M_size20x_pos1_140.png?v=4",
            "S_2_2/200/194R_square_HA_M_size20x_pos1_20.png?v=4",
            "S_2_2/200/195L_blob_HA_M_000_outer_EFG_0.png?v=4",
            "S_2_2/200/195R_blob_HA_M_000_outer_EFG_50.png?v=4",
            "S_2_2/200/196L_square_LA_NM_esize32xxx_pos1_30.png?v=4",
            "S_2_2/200/196R_square_LA_NM_esize32xxx_pos2_85.png?v=4",
            "S_2_2/200/197L_blob_LA_M_014_low_PQR_0.png?v=4",
            "S_2_2/200/197R_blob_LA_M_014_low_PQR_120.png?v=4",
            "S_2_2/200/198L_square_HA_M_size18x_pos1_150.png?v=4",
            "S_2_2/200/198R_square_HA_M_size18x_pos1_85.png?v=4",
            "S_2_2/200/199L_square_HA_NM_size28xxx_pos1_100.png?v=4",
            "S_2_2/200/199R_square_HA_NM_size28xxx_pos2_150.png?v=4",
            "S_2_2/200/200L_square_HA_NM_size09_pos1_70.png?v=4",
            "S_2_2/200/200R_square_HA_NM_size09_pos3_135.png?v=4"
        ]
        );
        var a = component.get('c.oneMethod');
        $A.enqueueAction(a);
    },


    oneMethod: function (component, event, helper) {

        var timeS = new Date().getTime();
        const resourceUrl = $A.get("$Label.c.Community_Url") + $A.get("$Label.c.shapes_game_config_url") + '?test=' + timeS;
        console.log('resourceUrl = ', resourceUrl);
        // const configdata="";
        window.fetch(resourceUrl)
            .then($A.getCallback((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error, status = ${response.status}`);
                }
                response.json()
                    .then($A.getCallback((data) => {
                        let configdata = data;


                        var myPageRef = window.location.href;
                        var actionGame = component.get("c.getCurrentContact");
                        var pageUrl = myPageRef.split('/s/');
                        //-----Gettung gameId from the apex function------------------
                        var gameNameScientific = $A.get("$Label.c.scientific_game_objectRecognitionAndSimilarity");
                        //console.log('gameNameScientific values :--',gameNameScientific); 
                        helper.gameDetails(component, event, helper, gameNameScientific);
                        var gameId;
                        var participantGameInfoId;
                        var ipAddress;
                        var browserName;
                        helper.getIpAddress(component, event, helper);
                        helper.printBrowser(component, event, helper);
                        //var device = $A.get("$Browser.formFactor");
                        var device = helper.getDeviceType(component, event, helper);

                        // Gettin contact id from the current loggedin user.
                        let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
                        helper.userDetails(component, event, helper, currentUserId);
                        var userContactId;

                        actionGame.setCallback(this, function (actionGame) {
                            var state = actionGame.getState();
                        	console.log('state', state);
                            if (state === "SUCCESS") {
                                var valueReturn = actionGame.getReturnValue();
                        		var language = valueReturn['Language__c'];
                        

                                console.log('language second', language);
                                //console.log('contact values :--',valueReturn,valueReturn['Object_Recognition_And_Similarity__c']);
                                if (valueReturn['Object_Recognition_And_Similarity__c'] == 'Locked' && pageUrl[1] == $A.get("$Label.c.url_me_shapesgame")) {
                                    component.set('v.showConfirmDialog', true);
                                }
                                else if (valueReturn['Object_Recognition_And_Similarity__c'] == 'Completed' && pageUrl[1] == $A.get("$Label.c.url_me_shapesgame")) {
                                    component.set('v.showConfirmDialog', true);
                                }
                                // full game code is started from else part.===========================
                                else {
                                    component.set('v.showConfirmDialog', false);
                                    helper.preventLeaving();
                                    document.documentElement.addEventListener('keydown', function (e) {
                                        if ((e.keycode || e.which) == 32) {
                                            e.preventDefault();
                                        }
                                    }, false);


                                    const urlParams = new URLSearchParams(document.location.search.substring(1));
                                    const cs = urlParams.get('cs');

                                    let currentScreent = 0;
                                    if (cs != null) {
                                        //console.log("cs1=", cs)
                                        currentScreent = Number(cs);
                                    }
                                    //--------------OBJECTS game JS-----------------

                                    let resultData = {};
                                    let intervalTime = null;
                                    let roundTotalTime = null;
                                    let roundStartTime = null;
                                    let blockevents = 0;
                                    let timedata = new Date();
                                    let result_time = 0;
                                    let command_value = 0;
                                    let inputdata = "";
                                    let lastdatatitle = "";
                                    let black = false;
                                    let image_path = $A.get("$Label.c.Community_Url") + "/resource/mindGamesImages/objects/";
                                    let errormsg = null;
                                    var gameName = $A.get("$Label.c.Shapes_Game_Text_1");
                                    var gameTime = $A.get("$Label.c.Shapes_Game_Text_55");
                                    var endGameResult = false;
                                    var screenHeight = window.screen.availHeight;
                                    var screenWidth = window.screen.availWidth;
                                    let macTouch = getCookie('macTouch');
                                    var ua = window.navigator.userAgent;
                                    var iOS = !!ua.match(/Mac OS/i);
                                    // var isMac = ua.match(/Mac OS/i);
                                    var isKeyboad;
                                    if (iOS) {
                                        isKeyboad = (macTouch == 'false');
                                        if (macTouch == 'true' && device == "DESKTOP") {
                                            device = 'TABLET';
                                        }
                                    } else if (device == "DESKTOP" && macTouch != 'true') {
                                        isKeyboad = true;
                                    } else {
                                        isKeyboad = false;
                                        //alert(' component.get("v.browser")')
                                        if (macTouch == 'true' && device == "DESKTOP") {
                                            device = 'TABLET';
                                        }

                                    }
                                    function getCookie(name) {
                                        var cookieString = "; " + document.cookie;
                                        cookieString = cookieString.replace('LSKey-c$', '');
                                        var parts = cookieString.split("; " + name + "=");
                                        if (parts.length === 2) {
                                            return parts.pop().split(";").shift();
                                        }
                                        return null;
                                    }
                                    //code for tap changes.
                                    var Shapes_Game_Text_22 = "";
                                    var Shapes_Game_Text_23 = "";
                                    var Shapes_Game_Text_24 = "";
                                    if (!isKeyboad) {
                                        Shapes_Game_Text_22 = $A.get("$Label.c.Shapes_Game_Text_37");
                                        Shapes_Game_Text_23 = $A.get("$Label.c.Shapes_Game_Text_38");
                                        Shapes_Game_Text_24 = $A.get("$Label.c.Shapes_Game_Text_39");
                                    } else {
                                        Shapes_Game_Text_22 = $A.get("$Label.c.Shapes_Game_Text_22");
                                        Shapes_Game_Text_23 = $A.get("$Label.c.Shapes_Game_Text_23");
                                        Shapes_Game_Text_24 = $A.get("$Label.c.Shapes_Game_Text_24");
                                    }
                                    //Configuration of data parts.

                                        configdata = configdata.map(obj => {	
                                        obj.content = obj.content.replace('Shapes_Game_Text_22', Shapes_Game_Text_22);
                                        obj.content = obj.content.replace('Shapes_Game_Text_23', Shapes_Game_Text_23);
                                        obj.content = obj.content.replace('Shapes_Game_Text_24', Shapes_Game_Text_24);       
                                        return obj;
                                  });
                                  //console.log('New configdata: '+JSON.stringify(configdata));

                                    console.log('config Data = ', configdata);

                                    //This saveData function is used for creating record in ParticipantGameresponse object.
                                    function saveData(gameName, questionNumber, userInputData, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, round, Limage, Rimage) {
                                        // Limage = "test1.png"
                                        // Rimage = "test2.png" 
                                        helper.recorData(component, event, helper, userContactId, gameId, questionNumber, userInputData, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, round, Limage, Rimage);
                                        //question number
                                        console.log("Input Results ==>", Limage, Rimage, gameId, "Input questionNumber ==>", questionNumber, "Input userInputData ==>", userInputData, "Input correctAnswer ==>", correctAnswer, "Input isCorrect ==>", isCorrect, "Input reactionTime ==>", reactionTime, "Input isPracticeQuestion ==>", isPracticeQuestion);

                                    }
                                    // end game function is updating the record of participant gameInfo like endDateTime.
                                    function endGame(gameId, participantGameInfoId) {
                                        var endDateTime = new Date();
                                        var gamePlayStatus = "Completed";
                                        var screenResolution = { "height": screenHeight, "width": screenWidth };
                                        helper.participantGameInfoUpdate(component, event, helper, userContactId, language, gameId, endDateTime, gamePlayStatus, participantGameInfoId, screenResolution);
                                        console.log('participantGameInfoUpdate = ', userContactId, language, gameId, endDateTime, gamePlayStatus, participantGameInfoId);
                                    }



                                    //Inisilize the page processing
                                    function changeScreen() {

                                        gameId = component.get("v.myAttribute");
                                        userContactId = component.get("v.mycontactId");
                                        ipAddress = component.get("v.ipAddress");
                                        browserName = component.get("v.browser");
                                        participantGameInfoId = component.get("v.participantGameid");
                                        timedata = new Date();
                                        //calculate total time in the round.
                                        //console.log('configdata[currentScreent].screen screen :---------------- ', configdata[currentScreent].screen);
                                        //alert("screen size: "+ screenHeight+ " "+ screenWidth);
                                        if (configdata[currentScreent].screen == '1' || configdata[currentScreent].screen == '43') {
                                            roundStartTime = timedata;
                                        }
                                        if (configdata[currentScreent].screen == '42' || configdata[currentScreent].screen == '243') {
                                            roundTotalTime = timedata - roundStartTime;
                                            //console.log('round total time: ', roundTotalTime);
                                            if (configdata[currentScreent].screen == '42') {
                                                let totalTimeForRoundZero = roundTotalTime;
                                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundZero, configdata[currentScreent].screen);
                                            }
                                            else if (configdata[currentScreent].screen == '243') {
                                                let totalTimeForRoundOne = roundTotalTime;
                                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundOne, configdata[currentScreent].screen);
                                            }
                                        }
                                        document.getElementById("datablock_object").innerHTML = configdata[currentScreent].content;
                                        if (configdata[currentScreent].hasOwnProperty('black')) {
                                            document.getElementById("gameBox").classList.add("black");
                                        } else {
                                            document.getElementById("gameBox").classList.remove("black");
                                        }
                                        if (configdata[currentScreent].endGameResult == true) {
                                            window.removeEventListener('keyup', gamePlay, false);
                                            document.getElementById("nextBtton").classList.remove("slds-hide");
                                            endGame(gameId, participantGameInfoId);
                                            clearInterval(intervalTime);
                                            return true;
                                        } else {
                                            window.addEventListener('keyup', gamePlay, false);
                                        }
                                        //Changes for touch
                                        console.log('instructionsLeft =', configdata[currentScreent].instructionsLeft);

                                        let tabButtons = document.querySelectorAll(".tabButtons");

                                        if (!isKeyboad) {
                                            document.getElementById("gameBox").removeEventListener('click', gotoNextScreen, false);
                                            if (configdata[currentScreent].hasOwnProperty('isTouch')) {
                                                document.getElementById("gameBox").addEventListener('click', gotoNextScreen, false);
                                            }

                                            //let tabButtons = document.querySelectorAll(".tabButtons");

                                            if (tabButtons != 'undefined' && tabButtons != null) {
                                                tabButtons.forEach((e) => {
                                                    e.classList.remove("slds-hide");
                                                    // e.addEventListener('click', reactEventQuery, false);
                                                });
                                            }
                                            if (configdata[currentScreent].instructionsLeft != 'undefined' &&
                                                configdata[currentScreent].instructionsLeft) {
                                                window.scrollTo(0, 0);
                                            }
                                        } else {
                                            if (!configdata[currentScreent].instructionsLeft) {
                                                tabButtons.forEach((e) => {
                                                    e.classList.remove("slds-hide");
                                                    // e.addEventListener('click', reactEventQuery, false);
                                                });
                                            }

                                        }
                                        if (configdata[currentScreent].instructionsLeft == true) {
                                            document.getElementById("gameMainContent").classList.add("instructionsLeft");
                                        } else {
                                            document.getElementById("gameMainContent").classList.remove("instructionsLeft");
                                        }


                                        //end changes for touch goto  function  gotoNextScreen
                                        let uobjectinputbtn = document.querySelectorAll(".objectInput");
                                        if (typeof (uobjectinputbtn) != 'undefined' && uobjectinputbtn != null) {
                                            uobjectinputbtn.forEach((e) => {
                                                e.addEventListener('click', objectEventQuery, false);
                                            });
                                        }
                                        errormsg = document.getElementById("resulttxt");
                                        if (typeof (errormsg) != 'undefined' && errormsg != null) {
                                            ////console.log('errormsg not null:----',errormsg);
                                        } else { errormsg = null; }

                                        if (currentScreent > 0) {

                                            let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                                            //let isPractices =  configdata[currentScreent-1].hasOwnProperty("isPractice")?false:true;
                                            let lastdata = lastdatatitle;
                                            //console.log('screens are ----------changing' , lastdata);
                                            if (lastdata.length <= 0 && isResult == true) {
                                                //Result Data
                                                resultData[configdata[currentScreent - 1].screen] = {
                                                    "duration": configdata[currentScreent - 1].endDuration,
                                                    "status": "false",
                                                    "data": "No Response",
                                                    "question": configdata[currentScreent - 1].question,
                                                    "isPractice": configdata[currentScreent - 1].isPractice,
                                                    "correctAnswer": configdata[currentScreent - 1].answer,
                                                    "round": configdata[currentScreent - 1].round,
                                                    "Limage": configdata[currentScreent - 1].Limage,
                                                    "Rimage": configdata[currentScreent - 1].Rimage
                                                };
                                                lastdatatitle = "Result";
                                                //Save Output Events
                                                let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                                                saveData(
                                                    "OBJECTDISC",
                                                    currentgamedata.question,
                                                    currentgamedata.data,
                                                    currentgamedata.status,
                                                    currentgamedata.duration,
                                                    currentgamedata.isPractice,
                                                    currentgamedata.correctAnswer,
                                                    currentgamedata.round,
                                                    currentgamedata.Limage,
                                                    currentgamedata.Rimage
                                                );
                                                setTimeout(clearResult, 1000);
                                            }
                                        }

                                        //Initial and end Game
                                        //creating participant game info record.
                                        if (currentScreent == 1) {
                                            var startDateTime = new Date();
                                            var gamePlayStatus = "Not-Completed";
                                            var screenResolution = { "height": screenHeight, "width": screenWidth };
                                            console.log('my testcode info :', userContactId,language,gameId,startDateTime,gamePlayStatus,ipAddress,browserName,device);
                                            
                                            helper.participantGameInfo(component, event, helper, userContactId, language, gameId, startDateTime, gamePlayStatus, ipAddress, browserName, device, screenResolution);

                                        }
                                        // end game function for updating the endDateTime.
                                        // if ((configdata.length ) == currentScreent) {
                                        //     endGame(gameId, participantGameInfoId);
                                        //     clearInterval(intervalTime);
                                        //     return true;
                                        // }

                                        //Change New Screen Default
                                        if ((configdata.length - 1) > currentScreent) {
                                            if (configdata[currentScreent].endDuration != 0)
                                                intervalTime = setTimeout(changeScreen, configdata[currentScreent].endDuration);
                                            lastdatatitle = ""
                                            currentScreent = currentScreent + 1;
                                        } else {
                                            clearInterval(intervalTime);
                                        }
                                        inputdata = "";

                                    }

                                    //Event Control System
                                    window.addEventListener('keyup', gamePlay, false);
                                    //Inisilize the page processing
                                    changeScreen();

                                    function gamePlay(e) {

                                        command_value = e.keyCode;
                                        inputdata = e.key;
                                        let startDurations = configdata[currentScreent - 1].startDuration;
                                        //Press spacific key command
                                        if (startDurations == -1) {
                                            if (configdata[currentScreent - 1].hasOwnProperty("command") && command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                                                clearInterval(intervalTime);
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
                                                        "correctAnswer": configdata[currentScreent - 1].answer,
                                                        "round": configdata[currentScreent - 1].round,
                                                        "Limage": configdata[currentScreent - 1].Limage,
                                                        "Rimage": configdata[currentScreent - 1].Rimage
                                                    };
                                                }
                                            }

                                            if (result_time >= startDurations) {
                                                if (configdata[currentScreent - 1].hasOwnProperty("command")) {
                                                    //Command Value Match Data
                                                    if (command_value == configdata[currentScreent - 1].command[0] || command_value == configdata[currentScreent - 1].command[1]) {
                                                        //Result Calculation
                                                        if (isResult) {
                                                            if (inputdata.toLowerCase() == configdata[currentScreent - 1].answer) {
                                                                resultData[configdata[currentScreent - 1].screen]["status"] = "true";
                                                            } else {
                                                                resultData[configdata[currentScreent - 1].screen]["status"] = "false";
                                                            }
                                                            if (configdata[currentScreent - 1].isPractice == true) {
                                                                if (resultData[configdata[currentScreent - 1].screen]["status"] == "false") {
                                                                    errormsg.innerHTML = $A.get("$Label.c.Shapes_Game_Text_61");
                                                                    blockKeyEvent();
                                                                    return false;
                                                                } else {
                                                                    //errormsg.innerHTML="Correct";
                                                                    errormsg.innerHTML = $A.get("$Label.c.Shapes_Game_Text_60");
                                                                }
                                                            }
                                                            resultData[configdata[currentScreent - 1].screen]["data"] = inputdata;
                                                            resultData[configdata[currentScreent - 1].screen]["duration"] = result_time;
                                                            lastdatatitle = "Result";

                                                            //Save Output Events
                                                            let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                                                            saveData(
                                                                "OBJECTDISC",
                                                                currentgamedata.question,
                                                                currentgamedata.data,
                                                                currentgamedata.status,
                                                                currentgamedata.duration,
                                                                currentgamedata.isPractice,
                                                                currentgamedata.correctAnswer,
                                                                currentgamedata.round,
                                                                currentgamedata.Limage,
                                                                currentgamedata.Rimage
                                                            );
                                                            //Out put result Intigration time comment or Remove 3 lines
                                                            document.getElementById("d_title").innerHTML = "Result";
                                                            document.getElementById("d_txt").innerHTML = result_time + " ms";
                                                            document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                                                        }

                                                        //Clear Results
                                                        setTimeout(clearResult, 1500);
                                                        //Reset Screent Interval
                                                        //clearInterval(intervalTime);
                                                        //Next Screen Show
                                                        // changeScreen();
                                                        if (configdata[currentScreent - 1].isPractice == true && errormsg.innerHTML == $A.get("$Label.c.Shapes_Game_Text_60")) {
                                                            //console.log('outer setTimeout');
                                                            window.removeEventListener('keyup', gamePlay, false);
                                                            let uobjectinputbtn = document.querySelectorAll(".objectInput");
                                                            if (typeof (uobjectinputbtn) != 'undefined' && uobjectinputbtn != null) {
                                                                uobjectinputbtn.forEach((e) => {
                                                                    e.removeEventListener('click', objectEventQuery, false);
                                                                });
                                                            }
                                                            setTimeout(function () { lastdatatitle = "Result"; window.addEventListener('keyup', gamePlay, false); clearInterval(intervalTime); changeScreen(); }, 1000);
                                                        }
                                                        else {
                                                            //console.log('in else part'); 
                                                            lastdatatitle = "Result"
                                                            window.removeEventListener('keyup', gamePlay, false);
                                                            // setTimeout(function(){lastdatatitle="Result";  window.addEventListener('keyup', gamePlay, false); clearInterval(intervalTime); changeScreen(); }, 200);                                
                                                            clearInterval(intervalTime);
                                                            changeScreen();
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    function blockKeyEvent() {
                                        clearInterval(blockevents);
                                        //window.removeEventListener('keyup', gamePlay, false);
                                        blockevents = setTimeout(function () {
                                            errormsg.innerHTML = "";
                                            //window.addEventListener('keyup', gamePlay, false);
                                        }, 1500);
                                    }

                                    function clearResult() {
                                        lastdatatitle = "";
                                    }
                                    //chnages for touch
                                    function gotoNextScreen(e) {
                                        gamePlay({ keyCode: 32 });
                                        //console.log('e',e);
                                    }
                                    function objectEventQuery(e) {
                                        gamePlay({ key: e.currentTarget.getAttribute("data-input"), keyCode: e.currentTarget.getAttribute("data-key") });
                                    }
                                    //chnages for touch end

                                }
                                $A.get('e.refreshView').fire();
                            }
                            else if (state === "ERROR") {
                                let message = '';
                                let errors = response.getError();
                                if (errors && Array.isArray(errors) && errors.length > 0) {
                                    message = errors[0].message;
                                }
                                //console.error(message);
                            }
                            else {
                                //console.log('else part');
                            }
                        });
                        // $A.enqueueAction(actionGame);
                        $A.getCallback(function () {
                            $A.enqueueAction(actionGame);
                        })();

                    }));
            }))
            .catch($A.getCallback((error) => {
                console.error('Fetch Error :-S', error);
            }));
    },

    // this function works for 'goto next page' when the game reach to the last question.
    goToNextPage: function (component, event, helper) {
        helper.allowLeaving();
        window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_dashboard");
    },
    goToMyResultsPage: function (component, event, helper) {
        helper.allowLeaving();
        window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_myresults");
    },
    closeModel: function (component, event, helper) {
        //console.log('No');
        // component.set('v.showConfirmDialog', false);
        window.location.href = $A.get("$Label.c.Community_Url") + '/s/' + $A.get("$Label.c.url_dashboard");
    },

})