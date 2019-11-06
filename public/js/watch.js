let f = (() => {
    let f = function () {
        this.props = {
            aaa: "aaa",
            bbb: "bbb"
        }
        Object.keys(this.props).forEach((key) => {
            this.watch(this.props, key)
        })
    }

    let watch = function (obj, propName) {
        let value = obj[propName]
        let self = this
        Object.defineProperty(obj, propName, {
            get: function () {
                this.log(propName + "取得", value)
                return value
            }.bind(this),
            set: function (newValue) {
                value = newValue
                this.log(propName + "更新", newValue)
            }.bind(this),
        });
    }
    f.prototype.watch = watch

    let log = function (message, value) {
        console.log(`message: ${message}, value: ${value}`);
    }
    f.prototype.log = log

    return f
})()

let watcher = new f()
watcher.props.aaa
watcher.props.bbb
watcher.props.aaa = 100
watcher.props.bbb = 200

