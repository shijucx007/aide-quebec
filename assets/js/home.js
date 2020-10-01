import '../../assets/scss/home.scss';

import $ from "jquery";
import '../../node_modules/bootstrap/js/dist/util';
import '../../node_modules/bootstrap/js/dist/dropdown';
import {Utils, Resizer, Scroller} from "web-utility-js";

const utils = new Utils();
const resizer = new Resizer();
utils.init();
resizer.init();

let components = {
    init: function(){
        this.squareContainer();
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