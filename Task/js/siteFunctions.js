var swiper;
$(document).ready(function() {

    // Swiper Initialization
    var swiper1 = new Swiper('.swiper1', {
        navigation: {
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1',
        },
        autoplay: {
            delay: 5000,
        },
    });
    var swiper2 = new Swiper('.swiper2', {
        navigation: {
            nextEl: '.swiper-button-next2',
            prevEl: '.swiper-button-prev2',
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 40
            },
            992: {
                slidesPerView: 6,
                spaceBetween: 40
            }
        }
    });
    $('.select').click(function(e) {
        e.stopPropagation();
        // $('.drop-down .options').width($('.select').outerWidth());
        if ($(this).hasClass('active-drop-down')) {
            $(this).removeClass('active-drop-down').next().slideUp();
        } else {
            $(this).addClass('active-drop-down').next().slideDown(function() {
                $('.options').not(this).slideUp();
            });
        }
    });
    $('.swiper-button-prev').hover(function() {
        $('span.left').fadeIn();

    }, function() {
        $('span.left').fadeOut();
    });
    $('.swiper-button-next').hover(function() {
        $('span.right').fadeIn();

    }, function() {
        $('span.right').fadeOut();
    });
    // Navbar Mobile View
    $('.menu-icon').click(function(e) {
        e.stopPropagation();
        $(this).toggleClass('menu-clicked');
        $('.menu-nav').slideToggle();
        $(window).resize(function() {
            if ($(window).width() > 576) {
                $('.menu-nav').slideUp();
            }
            if ($('.menu-nav').css('display') == 'none') {
                $('.menu-icon').removeClass('menu-clicked');
            }
        });
    });
    $('.search-bar img').click(function() {
        $('.search-bar input').toggleClass('search-active');
    });
    // Focusout To Close
    $(document).click(function() {
        $(".options").slideUp(300, function() {
            $('.select').removeClass('active-drop-down');
        });
        $('.menu-nav').slideUp(function() {
            $('.menu-icon').removeClass('menu-clicked');
        });
    });
    $('.filter-mobile').click(function() {
        $('.filter-mobile-down').fadeToggle();
        $('.filterbar-mobile').toggleClass('active-filter');
    });
    var aboutImgWidth = $('.about-img').width();
    $('.about-img div').height(aboutImgWidth);
    $(window).resize(function() {
        aboutImgWidth = $('.about-img').width();
        $('.about-img div').height(aboutImgWidth);
    });
    // Heading of Slider Toggle
    // $('.products span').click(function() {
    //     $('.products span').removeClass('heading-active');
    //     $(this).addClass('heading-active');
    // });
    // $('.newsletter input').on('keyup', function() {
    //     var inputValue = $('.newsletter input').val();
    //     if (inputValue != '') {
    //         $(this).css('border-bottom-color', '#000')
    //     } else {
    //         $(this).css('border-bottom-color', '#a9a9a9')
    //     }
    // });

    // Go To Top Button
    $(window).scroll(function() {
        if ($(window).scrollTop() > 250) {
            $('.goTop').fadeIn();
        } else {
            $('.goTop').fadeOut();
        }
    });
    $('.goTop').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500);
    });
});
var x, i, j, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    for (k = 0; k < y.length; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);