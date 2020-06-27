import {Utils, Resizer, Scroller} from "web-utility-js";
import $ from "jquery";
const utils = new Utils();
const resizer = new Resizer();
//const scroller = new Scroller();
utils.init();
resizer.init();
//scroller.init();

let components = {
    init: function(){
        components.checkRegisterBoxPosition();
        components.verifyCodeTraverse();
    },
    checkRegisterBoxPosition: function(){
        let registrationBlock = $('#registerBlock'), winWid = $(window).width();
        if(registrationBlock.length){  
            if(winWid > 575) {
              let blockHeight = registrationBlock.outerHeight() + 50;
              let documentHeight = $(window).height();
              (blockHeight > documentHeight) ?  registrationBlock.addClass('detached') :  registrationBlock.removeClass('detached');
              
            }       
            
            let profileBox = $(".upload-list__item");
            $(profileBox).each(function () {
                let elemWidth = $(this).width();
                $(this).find('.upload-list__tile').height(elemWidth);
            });
            $('body').removeClass('bg-white');
        } 
        if(registrationBlock.length && winWid < 575){       
            $('body').addClass('bg-white');
        }
    },
    verifyCodeTraverse: function(){
        let digitControl = $('.form-control-digit');
        if(digitControl.length){
            $(document).on('keyup', digitControl, goToNextInput);
            $(document).on('keydown', digitControl, onKeyDown);
            $(document).on('click', digitControl, onFocus);
        }

        function goToNextInput(e) {
            let key = (e.which) ? e.which : e.keyCode,  
              t = $(e.target);              
        
            if (key != 9 && (key < 48 || key > 57 && key < 96) || key > 105) {
                if(key != 8 && key != 46){
                    e.preventDefault();
                    return false;
                }else{
                    t.val('');
                    t.prev().select().focus();   
                }              
            }

            if (key === 9 || key === 8 || key === 46) {
              return true;
            }

            t.next().select().focus();

          }
        
          function onKeyDown(e) {
            let key = (e.which) ? e.which : e.keyCode;
        
            if (key === 9 || key === 8 || key === 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
              return true;
            }

            e.preventDefault();
            return false;
          }
          
          function onFocus(e) {
            $(e.target).select();
          }
        
    }

}

components.init();
resizer.add("funcName", components.checkRegisterBoxPosition);