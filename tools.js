(function () {
    window._tools = new Tools();
    function Tools () {}

    Tools.prototype.inherit = function (target,origin) {
        function F () {}
        F.prototype = origin.prototype;
        target.prototype = new F ();
        target.prototype.constructor = target;
    }
 
    Tools.prototype.personalInherit = function (origin) {
        let target = function () {
            origin.apply(this,arguments)
        }
        this.inherit(target,origin)
        return target
    }

    Tools.prototype.getSingle = function (origin) {
        let result = (function () {
            let instance
            return function () {
                if(!instance) {
                    instance = origin&&origin.apply(this,arguments);
                }
                return instance
            }
        })()
        origin && this.inherit(result,origin)
        return result
    }

    Tools.prototype.getRandomNum = function (min,max) {
        return Math.floor(Math.random()*(max - min) + min);
    }
})()


