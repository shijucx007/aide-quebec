import '../../assets/scss/home.scss';

import $ from "jquery";
import '../../node_modules/bootstrap/js/dist/util';
import '../../node_modules/bootstrap/js/dist/dropdown';
import '../../node_modules/lightslider/dist/js/lightslider';
import "../../node_modules/lightslider/dist/css/lightslider.min.css";
import {Utils, Resizer, Scroller} from "web-utility-js";


const utils = new Utils();
const resizer = new Resizer();
utils.init();
resizer.init();

let components = {
    init: function(){
        this.squareContainer();
        this.lightSlider();
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
    resize: function(){
        components.squareContainer();
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