import '../../assets/scss/dashboard.scss';
import '../../node_modules/pikaday/scss/pikaday.scss'
import '../../assets/js/dashboard.js';

import $ from "jquery";
import '../../node_modules/bootstrap/js/dist/util';
import '../../node_modules/bootstrap/js/dist/dropdown';
import '../../node_modules/bootstrap/js/dist/modal';
import '../../node_modules/@rateyo/jquery/lib/cjs/jquery.rateyo';
import '../../node_modules/jquery.nicescroll/dist/jquery.nicescroll';

import {Utils, Resizer, Scroller} from "web-utility-js";

import * as moment from 'moment';
import * as Pikaday from 'pikaday';

import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, Power1 , Elastic, CSSPlugin} from "gsap/all";
gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin, Power1, Elastic, CSSPlugin); 

const utils = new Utils();
const resizer = new Resizer();
utils.init();
resizer.init();

let components = {
    init: function(){
        this.squareContainer();
        this.datePicker();  
        this.counter();   
        this.mobileNav(); 
        this.starRating();
        this.addArrowButton();
        this.niceScroll();
        this.editProfile();
    },
    resize: function(){
        components.squareContainer();
        components.initSidebar();
        components.adjustCalendarPos();  
        components.uploadList();      
    },  
    editProfile: function(){
        $('.edit-profile__edit-btn').on('click', function(){
            $('.edit-profile__title').removeClass('active').next('.edit-profile__form-wrapper').slideUp('fast');
            $(this).parent().addClass('active').next('.edit-profile__form-wrapper').slideDown(500);
            setTimeout(function(){ components.uploadList();}, 500);
        });
    },
    uploadList: function(){
        let profileBox = $(".upload-list__item");
        $(profileBox).each(function () {
            let elemWidth = $(this).width();
            $(this).find('.upload-list__tile').height(elemWidth);
        });
    } ,
    niceScroll: function(){
        var nicescroll = $('[nicescroll]');
        if(nicescroll.length){
            nicescroll.niceScroll();
        }
    },
    starRating: function(){
        let starrr = $('.rateYo');
        if(starrr.length){
            $(starrr).each(function(){
                let $rating = $(this).data('rating'),
                    starWidth = $(this).data('width');
                   $(this).rateYo({ 
                    normalFill: "#c3c3c3",
                    ratedFill: "#ffc107",
                    spacing: "1px",
                    halfStar: true
                  });
            });
        }
    },
    addArrowButton: function(){
        let tableWithArrowBtn = $('.table-with-arrow-btn');
        if(tableWithArrowBtn.length){
            tableWithArrowBtn.find('tbody td:last-child').append('<span class="status-arrow-toggle"></span>');
        }
    },
    counter: function(){
        let counter = $('.counter');
        if(counter.length){
            counter.each(function() {
                let $this = $(this),
                    countTo = $this.attr('data-count'),
                    dataDuration = $this.attr('data-duration');                
                $({ countNum: $this.text()}).animate({
                  countNum: countTo
                },              
                {              
                  duration: dataDuration,
                  easing:'linear',
                  step: function() {
                    $this.text(Math.floor(this.countNum));
                  },
                  complete: function() {
                    $this.text(this.countNum);
                  }              
                });           
              });
        }
    },
    mobileNav: function(){
        $('#mobileNav').on('click', function(e){
            gsap.to('#sidebar', 0.05, {autoAlpha: 1, ease: Power1.easeOut, onComplete: components.animateSidebar},3);
            e.preventDefault();
        });
        $('#mobileNavClose').on('click', function(e){
            components.initSidebar();
            e.preventDefault();
        });
    },
    animateSidebar: function(){
        gsap.to('#sidebar', 0.5, {left: 0}, 1);
    },
    hideSidebar: function(){
        gsap.to('#sidebar', 1, {autoAlpha: 0}, 1);
    },
    datePicker: function(){
        window.datePicker = new Pikaday({
            field: document.getElementById('datePicker'),
            format: 'D MMM YYYY',
            onSelect: function() {
                console.log(this.getMoment().format('Do MMMM YYYY'));
            }
        });

        window.startDate = new Pikaday({
            field: document.getElementById('startDate'),
            format: 'D MMM YYYY',
            onSelect: function() {
                console.log(this.getMoment().format('Do MMMM YYYY'));
            }
        });
        window.endDate = new Pikaday({
            field: document.getElementById('endDate'),
            format: 'D MMM YYYY',
            onSelect: function() {
                console.log(this.getMoment().format('Do MMMM YYYY'));
            }
        });
    },
    adjustCalendarPos: function(){
        if ($("#startDate,#endDate").is(":focus")) {
            setTimeout(function () {
                window.startDate.adjustPosition();
                window.endDate.adjustPosition();
            }, 300)
        }
    },
    initSidebar: function(){
        gsap.to('#sidebar', 0.25, {left: '-100vw'}, 1);
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