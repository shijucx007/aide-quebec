import '../../assets/scss/home.scss';

import $ from "jquery";
import '../../node_modules/bootstrap/js/dist/util';
import '../../node_modules/bootstrap/js/dist/dropdown';
import '../../node_modules/lightslider/dist/js/lightslider';
import "../../node_modules/lightslider/dist/css/lightslider.min.css";
import {Utils, Resizer, Scroller} from "web-utility-js";


const utils = new Utils();
const resizer = new Resizer();
const scroller = new Scroller();
utils.init();
resizer.init();
scroller.init();

let components = {
    init: function(){
        this.squareContainer();
        this.lightSlider();
        this.getBannerFormPosition();
    },
    lightSlider: function(){
        let slider1 = $("#testimonals1").lightSlider({
            item: 1,
            autoWidth: false,
            vertical:true,
            auto: true,
            loop: true,
            mode: 'fade',
            slideEndAnimation: false,
            pager: false,
            pause: 4000
        });  
        let slider2 = $("#testimonals2").lightSlider({
            item: 1,
            autoWidth: false,
            vertical:false,
            auto: true,
            loop: true,
            slideEndAnimation: false,
            pager: false,
            adaptiveHeight:true,            
            pause: 4000,
            onBeforeSlide: function (el) {
                slider1.goToSlide(el.getCurrentSlideCount());    
            } 
        });  
    },
    getBannerFormPosition: function(){
        var bannerForm = $('#bannerForm'), 
        sectionFeaturePos = $('#sectionFeature').offset().top,
        winWidth = $(window).width(),     
        paddingAdjustments = 55, 
        bannerFormMarginLeft = bannerForm.width()/2;        
        if( winWidth > 747){ bannerFormMarginLeft = 0 }
        if( winWidth > 556){ paddingAdjustments = 48 }
        var bannerFormHeight = bannerForm.outerHeight() + paddingAdjustments;
        bannerForm.css({top: sectionFeaturePos.toFixed(0) -  bannerFormHeight.toFixed(0), marginLeft: -Math.abs(bannerFormMarginLeft).toFixed(0)});
    },
    resize: function(){
        components.squareContainer();
    },
    scroll: function(){
        var scrollTop = $(window).scrollTop(), header = $('header');
        if(scrollTop > 70){
            header.addClass('scrolling');
        }else{
            header.removeClass('scrolling');
        }
    },
    squareContainer: function(){
        let squareContainer = $('.teaser-box'), winWid = $(window).width();
        if(squareContainer.length){   
            let profileBox = $(".teaser-box__pic");
            $(profileBox).each(function () {
                let elemWidth = $(this).width();
                $(this).height(elemWidth.toFixed(0));
            });
        } 
    }
}

components.init();
resizer.add("funcName", components.resize);
resizer.add("funcName", components.getBannerFormPosition);
scroller.add("funcName", components.scroll);