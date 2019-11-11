const formMenues = [
    {
        selector: ".testItem1",
        label: "testButton1",
        handlerFunc: function (e) {
            console.log(e, "button1")
        }
    },
    {
        selector: ".testItem1",
        label: "testButton2",
        handlerFunc: function (e) {
            console.log(e, "button2")
        }
    },
    {
        selector: ".wj-node-text",
        label: "tree-text",
        handlerFunc: function (e) {
            console.log(e, "tree")
        }
    }
]

const items = [
    { header: 'Electronics', img: 'resources/electronics.png', items: [
        { header: 'Trimmers/Shavers' },
        { header: 'Tablets' },
        { header: 'Phones', img: 'resources/phones.png', items: [
            { header: 'Apple' },
            { header: 'Motorola' },
            { header: 'Nokia' },
            { header: 'Samsung' }
        ]},
        { header: 'Speakers' },
        { header: 'Monitors' }
    ]},
    { header: 'Toys', img: 'resources/toys.png', items: [
        { header: 'Shopkins' },
    ]},
    { header: 'Home', img: 'resources/home.png', items: [
        { header: 'Coffeee Maker' },
    ]}
];



let contextMenu = {}

document.readyState === 'complete' ? init() : window.onload = () => {
    let tree = new wijmo.nav.TreeView("#tree", {
        displayMemberPath: "header",
        childItemsPath: "items",
        itemsSource: items
    })
    contextMenu = new ContextMenu(formMenues);
}

const ContextMenu = (() => {
    const ContextMenu = function (formMenues) {
        this._menu = null
        this.formMenues = formMenues;
        this._menuesFunctions = new Map()
        this._init()
    }
    const p = ContextMenu.prototype
    const _init = function () {
        // コンテキストメニューを初期化する
        let self = this
        this._menu = new wijmo.input.Menu(document.createElement("div"), {
            displayMemberPath: 'header',
            selectedValuePath: 'cmd',
            dropDownCssClass: 'ctx-menu',
            itemsSource: [
            ],
            itemClicked: function (e) {
                this._menu.selectedValue(e)
            }.bind(this)
        })
        // 指定されたメニューアイテムごとの設定を行う
        Object.keys(this.formMenues).forEach(function (key) {
            let formMenu = this.formMenues[key]
            // 同じセレクタを持つ要素をすべて取得する. 未指定又はnullの場合はbodyを対象にする
            let targetElements = formMenu.selector ? document.querySelectorAll(formMenu.selector) : document.body
            Array.from(targetElements).forEach((e) => {
                e.classList.add("has-ctx-menu")
            })
            // 関数を追加する
            if (!this._menuesFunctions.has(formMenu.selector)) {
                this._menuesFunctions.set(formMenu.selector, new Array(formMenu))
            } else {
                const menues = this._menuesFunctions.get(formMenu.selector)
                menues.push(formMenu)
                this._menuesFunctions.set(formMenu.selector, menues)
            }
        }.bind(this))
        // window全体のcontextMenuを上書きする
        document.addEventListener("contextmenu", function (e) {
            console.log(e)
            // 右クリックイベントを殺す
            e.preventDefault()
            try {
                let _functions = []
                this._menuesFunctions.forEach((functions, selector) => {
                    // クラス指定の場合
                    if (selector.startsWith(".")) {
                        console.log(e.target.classList)
                        if (e.target.classList.contains("has-ctx-menu")) {
                            if (e.target.classList.contains(selector.slice(1))) _functions = functions
                        }
                    } else {
                        if (e.target.id == selector) {
                            _functions = functions
                        }
                    }
                })
                if (_functions.length > 0) {
                    this._menu.owner = e.target;
                    this._menu.itemsSource = _functions.map((f) => {
                        return {header: `${f.label}`, cmd: f.handlerFunc}
                    })
                    this._menu.show(e)
                }
            } catch (e) {
                console.log(e)
            }
            return false
        }.bind(this))
    }
    p._init = _init
    return ContextMenu
})()
