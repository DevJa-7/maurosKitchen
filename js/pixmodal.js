/* ========================================================================
* SCRIPT.JS
* ======================================================================== */
(function (yourcode) {
  // The global jQuery object is passed as a parameter
  yourcode(window.jQuery, window, document);
})(function ($, window, document) {
  var browserAnimationEnd = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
  var browserTransitionEnd = 'transitionend';
  var animInClass = '';
  var animOutClass = '';
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  /* Pollyfills */

  if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) {
        // .length of function is 2
        'use strict';

        if (target == null) {
          // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource != null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }

        return to;
      },
      writable: true,
      configurable: true
    });
  }
  /* Pollyfills END */
  // Listen for the jQuery ready event on the document


  $(function () {
    PixModalUtil._setAnimations();

    PixModalUtil._setModalBlur();

    PixModalUtil._setModalFullimage();

    PixModalUtil._setModalFullvideo();

    PixModalUtil._setModalAutoshow(); // Pixmodal toggle trigger


    $(document).on('click', '[data-toggle=pixmodal]', function () {
      PixModal(this);
    }); //

    if (typeof $ !== 'undefined') {
      $.fn.pixmodal = function () {
        PixModal(this[0], {
          direct: true
        });
      };
    }
  });

  var _initPixModal = function _initPixModal() {};

  var PixModal = function PixModal(element, initOptions) {
    var direct = initOptions ? initOptions.direct : false;
    var selector = Util.getSelectorFromElement(element);
    var target;
    var config = {};
    var options = {
      backdrop: true,
      keyboard: true
    };
    var isPixModalAnimate;
    var isOverrideBackdrop = false;
    var $modalContent;
    var $target;
    var $animContainer;
    var startTimer;
    if (direct) selector = '#' + element.getAttribute('id');

    if (selector) {
      target = document.querySelector(selector);
      $target = $(target);
      $modalContent = $(target).find('.modal-content');
      config = Object.assign(config, $target.data());
    }

    if (!$target || !$target.length) return false;
    config.animateIn = $target.attr('data-animate-in');
    config.animateOut = $target.attr('data-animate-out');
    isPixModalAnimate = config.animateIn || config.animateOut ? true : false;
    isOverrideBackdrop = isPixModalAnimate || $target.data('backdrop-color') || $target.data('backdrop-opacity');

    if (!isOverrideBackdrop) {
      $target.modal(config).one('click', '[data-dismiss=pixmodal]', function () {
        $target.modal('hide');
      });
      return;
    }

    var modalContentAnimationDuration = 0;

    if ($target.data('backdrop') || $target.data('backdrop') === false) {
      options.backdrop = $target.data('backdrop');
    }

    if ($target.data('keyboard') || $target.data('keyboard') === false) {
      options.keyboard = $target.data('keyboard');
    }

    if ($target.data('blur') || $target.data('blur') === false) {
      options.blur = $target.data('blur');
    }

    config.backdrop = false; // Override default Bootstrap modal backdrop

    config.keyboard = false; // Override default Bootstrap modal keyboard

    animInClass = config.animateIn ? "".concat(config.animateIn, " animated") : '';
    animOutClass = config.animateOut ? "".concat(config.animateOut, " animated") : '';
    $animContainer = $($target.data('animations-container'));

    if (animInClass) {
      if ($animContainer.length) $animContainer.addClass(animInClass);else $modalContent.addClass(animInClass);
      modalContentAnimationDuration = Util.getAnimationDurationFromElement($modalContent);
      startTimer = setTimeout(function () {
        if ($animContainer.length) $animContainer.removeClass(animInClass);else $modalContent.removeClass(animInClass);
      }, modalContentAnimationDuration);
    }

    $target.modal(config).one('click', '[data-dismiss=modal]', function () {
      if (options.backdrop) PixModalUtil._removeBackdrop($target);
      $target.modal('hide');
    }).one('click', '[data-dismiss=pixmodal]', function () {
      PixModalUtil._hideModal({
        target: target,
        backdrop: options.backdrop,
        $animContainer: $animContainer,
        startTimer: startTimer
      });
    });

    if (options.keyboard) {
      $target.one('keydown.pixmodal.dismiss', function (event) {
        if (event.which === 27) {
          // 27: Escape keyboard button
          event.preventDefault();

          PixModalUtil._hideModal({
            target: target,
            backdrop: options.backdrop,
            $animContainer: $animContainer,
            startTimer: startTimer
          });
        }
      });
    } // Show Backdrop


    if (options.backdrop) PixModalUtil._showBackdrop({
      target: target,
      backdrop: options.backdrop,
      $animContainer: $animContainer,
      startTimer: startTimer
    });
  };
  /**
   * --------------------------------------------------------------------------
   * PixModal Util Api
   * --------------------------------------------------------------------------
  */


  var PixModalUtil = {
    _hideModal: function _hideModal(opt) {
      var target = opt.target;
      var $animContainer = opt.$animContainer;
      var $target = $(target);
      var $modalContent = $target.find('.modal-content');
      var modalContentAnimationDuration = 0;
      var modalTransitionDuration = 0;
      var backdropTransitionDuration = 0;
      var $modalBackdrop = $('.modal-backdrop');
      var startTimer = opt.startTimer;

      var addClassAnimOutClass = function addClassAnimOutClass() {
        clearTimeout(startTimer);

        if ($animContainer.length) {
          if ($animContainer.hasClass(animInClass)) $animContainer.removeClass(animInClass);
          $animContainer.addClass(animOutClass);
        } else {
          if ($modalContent.hasClass(animInClass)) $modalContent.removeClass(animInClass);
          $modalContent.addClass(animOutClass);
        }
      };

      var removeClassAnimOutClass = function removeClassAnimOutClass() {
        if ($animContainer.length) $animContainer.removeClass(animOutClass);else $modalContent.removeClass(animOutClass);
      };

      if ($target.data('backdrop') || $target.data('backdrop') === false) {
        opt.backdrop = $target.data('backdrop');
      }

      if (opt.backdrop) {
        if (animOutClass) {
          backdropTransitionDuration = Util.getTransitionDurationFromElement($modalBackdrop);

          if (backdropTransitionDuration) {
            addClassAnimOutClass();
            modalContentAnimationDuration = Util.getAnimationDurationFromElement($modalContent);
            setTimeout(function () {
              PixModalUtil._removeBackdrop($target);

              setTimeout(function () {
                $target.modal('hide');
                removeClassAnimOutClass();
              }, backdropTransitionDuration);
            }, modalContentAnimationDuration);
          }
        } else {
          PixModalUtil._removeBackdrop();

          $target.modal('hide');
        }

        return;
      } else {
        if (!animOutClass) {
          $target.modal('hide');
          return;
        }

        addClassAnimOutClass();
        modalContentAnimationDuration = Util.getAnimationDurationFromElement($modalContent);
        setTimeout(function () {
          modalTransitionDuration = Util.getTransitionDurationFromElement($target);

          if (modalTransitionDuration) {
            setTimeout(function () {
              removeClassAnimOutClass();
            }, modalTransitionDuration);
            $target.modal('hide');
          } else {
            removeClassAnimOutClass();
            $target.modal('hide');
          }
        }, modalContentAnimationDuration);
        return;
      }
    },
    _removeBackdrop: function _removeBackdrop($modal) {
      var $modalBackdrop = $('.modal-backdrop');
      var backdropTransitionDuration = Util.getTransitionDurationFromElement($modalBackdrop);
      if ($modal) $modal.off('mousedown.pixmodal.dismiss');
      $modalBackdrop.css({
        opacity: ''
      }).removeClass('show');
      setTimeout(function () {
        $modalBackdrop.remove();
      }, backdropTransitionDuration);
    },
    _setModalAutoshow: function _setModalAutoshow() {
      var $modalsAutoShow = $('.modal[data-autoshow]');
      if (!$modalsAutoShow.length) return false;
      var el = $modalsAutoShow[0];
      var $el = $(el);
      var delay = $el.data('autoshow-delay');
      var willShow = true;
      var expiredDuration = $el.data('autoshow-expired'); // Handle Modal with Expiration

      if (expiredDuration) {
        var storePixmodalExpired = localStorage.getItem('pixmodalExpired') ? JSON.parse(localStorage.getItem('pixmodalExpired')) : {};
        var nowDate = new Date().getTime();
        var modalID = $el.attr('id');
        var modalExpiredData = storePixmodalExpired[modalID];

        if (!modalExpiredData || nowDate >= modalExpiredData.expired) {
          // If modal expired data exist and already expired
          if (modalExpiredData && nowDate >= modalExpiredData.expired) {
            delete storePixmodalExpired[modalID];
            localStorage.setItem('pixmodalExpired', JSON.stringify(storePixmodalExpired));
          }

          $el.one('hidden.bs.modal', function () {
            var newNowDate = new Date().getTime();
            newExpiredDate = newNowDate + expiredDuration * 60 * 1000;
            storePixmodalExpired[modalID] = {
              expired: newExpiredDate,
              expiredDate: new Date(newExpiredDate)
            };
            localStorage.setItem('pixmodalExpired', JSON.stringify(storePixmodalExpired));
          });
        } else return false;
      } // Handle Modal delay


      if (delay) setTimeout(showModal, delay);else showModal();

      function showModal() {
        PixModal(el, {
          direct: true
        });
      }
    },
    _setAnimations: function _setAnimations() {
      var $modalsAnimations = $('.modal[data-animations]');
      var $modalsAnimationsLength = $modalsAnimations.length;
      if (!$modalsAnimations) return false;

      for (i = 0; i < $modalsAnimationsLength; i++) {
        var $modal = $($modalsAnimations[i]);
        var dataAnimations = $modal.data('animations');
        var animation = '';
        $modal.addClass("pixmodal-".concat(dataAnimations)).attr('data-animate-in', "".concat(dataAnimations, "In")).attr('data-animate-out', "".concat(dataAnimations, "Out"));
      }
    },
    _setContentBlur: function _setContentBlur(opt) {
      if (!opt.$target) return false;
      var $target = opt.$target;
      var targetBlurId = $target.data('blur').split('#')[1];
      var targetBlur = document.getElementById(targetBlurId);
      var isShown = opt.isShown || opt.isShown === false ? opt.isShown : !$target.is(':hidden');
      if (isShown) targetBlur.classList.remove('modal-open-blur');else targetBlur.classList.add('modal-open-blur');
    },
    _setModalBlur: function _setModalBlur() {
      $('.modal[data-blur]').on('show.bs.modal', function () {
        PixModalUtil._setContentBlur({
          isShown: false,
          $target: $(this)
        });
      }).on('hide.bs.modal', function () {
        PixModalUtil._setContentBlur({
          isShown: true,
          $target: $(this)
        });
      });
    },
    _setModalFullimage: function _setModalFullimage() {
      var $modalImages = $('.modal-fullimage');
      var $modalImagesLength = $modalImages.length;
      var i = 0;
      if (!$modalImagesLength) return false;
      $.each($modalImages, function (i, el) {
        var $modal = $(this);
        var imageLength = $modal.find('img').length;

        if (imageLength) {
          $modal.on('shown.bs.modal', function () {// $modal.focus();
          });
        }
      });
    },
    _setModalFullvideo: function _setModalFullvideo() {
      var $modalVideos = $('.modal-fullvideo');
      var $modalVideosLength = $modalVideos.length;
      var i = 0;
      if (!$modalVideosLength) return false;
      $.each($modalVideos, function (i, el) {
        var $modal = $(this);
        var $video = $modal.find('video');

        if ($video.attr('autoplay')) {
          $modal.on('shown.bs.modal', function () {
            $video[0].play();
          });
        }
      });
      $modalVideos.on('hide.bs.modal', function () {
        $(this).find('video')[0].pause();
      });
    },
    _showBackdrop: function _showBackdrop(opt) {
      var $backdrop = $('.modal-backdrop');
      if ($backdrop.length) return false;
      var target = opt.target;
      var $animContainer = opt.$animContainer;
      var startTimer = opt.startTimer;
      var $target = $(target);

      var _backdrop = document.createElement('div');

      _backdrop.className = 'modal-backdrop';

      _backdrop.classList.add('fade');

      if ($target.data('backdrop-color')) _backdrop.style.backgroundColor = $target.data('backdrop-color');
      $backdrop = $(_backdrop);
      $backdrop.appendTo(document.body);
      $target.on('mousedown.pixmodal.dismiss', function (event) {
        if (event.target !== event.currentTarget) {
          return;
        }

        if ($target.data('backdrop') === 'static') {
          $target.focus();
        } else if ($target.data('backdrop') !== false) {
          PixModalUtil._hideModal({
            target: target,
            backdrop: opt.backdrop,
            $animContainer: $animContainer,
            startTimer: startTimer
          });
        }
      });
      Util.reflow(_backdrop);
      $backdrop.addClass('show').one(browserAnimationEnd, function (evt) {
        $backdrop.removeClass('fade');
      });
      if ($target.data('backdrop-opacity')) $backdrop.css({
        opacity: $target.data('backdrop-opacity')
      });
      return;
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
    */

  };
  var Util = {
    getAnimationDurationFromElement: function getAnimationDurationFromElement($element) {
      if (!$element.length) {
        return 0;
      } // Get transition-duration of the element


      var animationDuration = $element.css('animation-duration');
      var animationDelay = $element.css('animation-delay');
      var floatAnimationDuration = parseFloat(animationDuration);
      var floatAnimationDelay = parseFloat(animationDelay); // Return 0 if element or animation duration is not found

      if (!floatAnimationDuration && !floatAnimationDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      animationDuration = animationDuration.split(',')[0];
      animationDelay = animationDelay.split(',')[0];
      return (parseFloat(animationDuration) + parseFloat(animationDelay)) * MILLISECONDS_MULTIPLIER;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement($element) {
      if (!$element.length) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $element.css('transition-duration');
      var transitionDelay = $element.css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    storage: {}
  };
});
