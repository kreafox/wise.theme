requirejs.config({
    paths: {
        'slick': ['https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min'],
        'jquery': ['https://code.jquery.com/jquery-2.2.4.min']
    }
});
require(['jquery', 'slick'], function($, slick) {
    function close_menu(container) {
        $(container).removeClass('open');

        if (window.matchMedia("(min-width: 800px)").matches) {
            $('.navmenu-items').animate({
                'opacity': 'hide'
            }, {
                duration: 80,
                complete: function() {
                    $('.header-wave .menu-brand').animate({
                        'opacity': 'show'
                    }, 1);
                    $('.menu .menu-brand').animate({
                        'opacity': 'hide'
                    }, 30);
                    $('.menu').animate({
                        'height': 'hide'
                    }, 200);
                }
            });
        } else {
            $('.menu').animate({
                'height': 'hide'
            }, 200);
        }


    };

    function open_menu(container) {
        $(container).addClass('open');
        $('.menu').animate({
            'height': 'show'
        }, {
            duration: 200,
            complete: function() {
                if (window.matchMedia("(min-width: 800px)").matches) {
                    $('.navmenu-items').animate({
                        'opacity': 'show'
                    }, 30);
                    $bgheight = $('body').height() - $('.menu > img').height()
                    $('.menu-bg').height($bgheight + 3);
                    $('.navmenu-items').css('display', 'flex');
                    $('.header-wave .menu-brand').animate({
                        'opacity': 'hide'
                    }, 30);
                    $('.menu .menu-brand').animate({
                        'opacity': 'show'
                    }, 30);
                }
            }
        });
    }



    jQuery.extend(jQuery.easing, {
        'easeOutQuint': function(x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        }
    });




    $(document).ready(function() {


        $menu_items = $('.menu .navmenu-item > a');

        $menu_items.each(function(index, value) {
            $submenu_items = $(this).parent().find('.submenu-item');

            if ($submenu_items.length == 0)
                $(this).addClass('no-carret');

        })


        $('.side-section .portlet-static-relevant-msfd-descriptors .portletItem p').each(function(item){
          $strong = $(this).find('strong');

          if($strong.length > 0 ){
            $(this).style.fontWeight = 'bold'
          }

        })



        if (window.matchMedia("(min-width: 800px)").matches) {
            $slider_text = $('.highlight');
            $slider_text.each(function(index, value) {
                $slider_section = $('<div/>', {
                    'class': 'slider_section',
                })
                $('.highlights').append($slider_section)
                $slider_section.append(value)

            })

            $('.header-bg .highlight').remove();





            var $hlSlider = $('#hlslider-slides'),
                $hlSliderCounter = $('#hlslider-counter'),
                $hlSliderPrev = $('#hlslider-prev'),
                $hlSliderNext = $('#hlslider-next'),
                $hlSliderPhotos = $('.highlight-photos').children()

            var $hlFirstSlide = $($hlSliderPhotos[0]);
            console.log($hlSliderPhotos)
            console.log($hlFirstSlide);

            $hlFirstSlide.css({
                'visibility': 'visible'
            }).addClass('current');
            initSlider($hlSlider);
            // $hlSliderPlaceholder.css('opacity', '0');




            var i;


            $hlSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
                i = (nextSlide ? nextSlide : 0) + 1;
                $hlSliderCounter.text(i + '/' + slick.slideCount);

                updateBackgroundPhoto(currentSlide, nextSlide, slick.slideCount);
            });

            $hlSliderNext.click(function() { $hlSlider.slick('slickNext'); });
            $hlSliderPrev.click(function() { $hlSlider.slick('slickPrev'); });




            var updateBackgroundPhoto = function(current, next, count) {

                var dir = next - current;
                if (next == 0 && current == count - 1) {
                    dir = 1;
                }
                if (next == count - 1 && current == 0) {
                    dir = -1;
                }

                $currentImg = $($hlSliderPhotos[current]);
                $nextImg = $($hlSliderPhotos[next]);
                $nextImg.show();

                var percent = dir * 100 + '%';

                $nextImg.css({
                    'display': 'block',
                    'transform': 'translate3d(' + percent + ', 0, 0)'
                })

                $({ 'percent': dir * 100 }).animate({
                    'percent': 0
                }, {
                    duration: 1000,
                    easing: 'easeOutQuint',
                    step: function(now) {
                        $nextImg.css({
                            'transform': 'translate3d(' + now + '%, 0, 0)'
                        });
                    },
                    done: function() {
                        $currentImg.removeClass('current').hide();
                        $nextImg.addClass('current');
                    }
                });
            };


        }
        // var $hlSliderPlaceholder = $('<div class="highlight-placeholder"></div>');
        // $('#highlights-slider').prepend($hlSliderPlaceholder);




        // $hover_trigger = $("[data-toggle=center-square]");
        // $hover_trigger.on('mouseover', function() {
        //     $data_target = $(this).attr('data-target');
        //     $target_div = $('.categories.center').find($data_target);
        //     $other_divs = $('.center-square');
        //     $other_targets = $('.square');
        //     if (!$(this).hasClass("gray")) {
        //         $other_divs.css('display', 'none');
        //         $target_div.css({'display': 'flex'});
        //         // $target_div.animate({
        //         //     'opacity': 'show'
        //         // }, 200);
        //     }
        //     $other_targets.removeClass("gray");
        //     $(this).addClass("gray");
        // });

        $('.login i').on('click', function() {
            $(this).toggleClass('action-selected');
            $('.search i').removeClass('action-selected')
            $('.login-container ').animate({
                'height': 'toggle'
            }, 200);
            $('#portal-searchbox ').animate({
                'height': 'hide'
            }, 200);
        });
        $('.search i').on('click', function() {
            $(this).toggleClass('action-selected');
            $('.login i').removeClass('action-selected')
            $('#portal-searchbox ').animate({
                'height': 'toggle'
            }, 200);
            $('.login-container ').animate({
                'height': 'hide'
            }, 200);
        });
        if (window.matchMedia("(max-width: 800px)").matches) {
            $mobile_submenu_trigger = $('<span/>', {
                'class': 'mobile_submenu_trigger fa fa-caret-right pull-right',
            })
            if ($('.navmenu-item .submenu .submenu-item').length > 0) {
                $('.navmenu-item .submenu .submenu-item').parent().parent().prepend($mobile_submenu_trigger)
            }
            $('body').on('click', '.mobile_submenu_trigger', function() {
                $(this).toggleClass('rotate');
                $(this).parent().find('.submenu').animate({
                    'height': 'toggle'
                }, 200);
            })

        }


        $('.menu-label').click(function() {
            $('.mobile-menu-trigger i').click();
        })
        $('.mobile-menu-trigger i').on('click', function() {
            if (!$(this).hasClass('open')) {
                open_menu(this);
            } else {
                close_menu(this);
            }
        })


        $('.toggle-sidebar').on('click', function() {
            $('.side-section').addClass('show-sidebar');
        })
        $('.close-sidebar').on('click', function() {
            $('.side-section').removeClass('show-sidebar');
        })
    });


    function initSlider(slider) {
        slider.children().css({ 'display': 'block' });
        slider.slick({
            autoplay: true,
            autoplaySpeed: 6000,
            speed: 1000,
            easing: 'easeOutQuint',
            adaptiveHeight: false,
            nextArrow: '',
            prevArrow: '',
            useCSS: false
        });






    };

    // $('.highlight').each(function() {
    //     url = $(this).find('a').attr('href');
    //     $(this).click(function() {
    //         window.location = url;
    //     });
    // })









    return {};
});
