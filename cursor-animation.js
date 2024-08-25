// cursor-animation.js
var primary = getComputedStyle(document.body).getPropertyValue('--primary');
var pointer_size = Number(getComputedStyle(document.body).getPropertyValue('--pointer-size').replace('px', ''));

var pointer = document.getElementById('pointer');
var panner = document.getElementById('panner');
var hammertime = new Hammer(panner);

window.limit_x = () => window.innerWidth - panner.offsetWidth;

function getOffset(el) {
    el = el.getBoundingClientRect();
    return {
        left: el.left + window.scrollX,
        top: el.top + window.scrollY
    };
}

window.isLeftOutOfScreen = () => getOffset(panner).left > window.innerWidth;
window.isRightOutOfScreen = () => getOffset(panner).left < 0;

window.addEventListener('mousemove', function (e) {
    var x = e.clientX + 'px';
    var y = e.clientY + 'px';
    var target = e.target;

    TweenLite.to(pointer, 0.5, { ease: Back.easeOut.config(1.7), left: x, top: y });

    if (target.localName != 'html') {
        if (target.localName == 'a' ||
            target.dataset.cursor == 'false' ||
            target.parentNode.dataset.cursor == 'false') {
            TweenLite.to(pointer, 1, { ease: Power4.easeOut, scale: 0 });
        } else {
            TweenLite.to(pointer, 1, { ease: Power4.easeOut, scale: 1 });
        }
    }
});

window.addEventListener('mousedown', function (e) {
    if (e.target.dataset.cursor == 'stretch' ||
        e.target.parentNode.dataset.cursor == 'stretch') {
        TweenLite.to(pointer, 0.1, { ease: Power4.easeOut, rotation: 0, width: pointer_size + 15, height: pointer_size - 10 });
    }
});

window.addEventListener('mouseup', function (e) {
    TweenLite.to(pointer, 0.1, { ease: Power4.easeOut, rotation: 45, width: pointer_size, height: pointer_size });
});

hammertime.on('pan', function (ev) {
    document.getElementById('teste').innerHTML = ev.pointerType;

    var x = ev.center.x;

    TweenLite.to(panner, 1, { ease: Back.easeOut.config(1.7), left: x });
    TweenLite.to(panner, 1, { css: { className: '+=panning' }, immediateRender: false });

    if (ev.isFinal) {
        TweenLite.to(panner, 1, { css: { className: '-=panning' }, immediateRender: false });
        setTimeout(function () {
            if (x < 0) {
                TweenLite.to(panner, 1, { ease: Back.easeOut.config(1.7), left: 0 });
            }
            if (x > limit_x()) {
                TweenLite.to(panner, 1, { ease: Back.easeOut.config(1.7), left: limit_x() });
            }
        }, 1000);
    }
});

document.getElementById('teste').innerHTML = 'Teste';

hammertime.on('rotate', function (ev) {
    document.getElementById('teste').innerHTML = ev.rotation;
});

window.addEventListener('resize', function () {
    setTimeout(function () {
        if (isRightOutOfScreen()) {
            TweenLite.to(panner, 1, { ease: Back.easeOut.config(1.7), left: 0 });
        }
        if (isLeftOutOfScreen()) {
            TweenLite.to(panner, 1, { ease: Back.easeOut.config(1.7), left: limit_x() });
        }
    }, 1000);
});
