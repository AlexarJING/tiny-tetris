namespace SpriteKind {
    export const 方块 = SpriteKind.create()
}
function 将块组设置到地图值上 () {
    for (let index = 0; index <= 当前块组.length / 2 - 1; index++) {
        ix = 当前块组[index * 2]
        iy = 当前块组[index * 2 + 1]
        设置地图块值(ix, iy, true)
    }
}
function 初始化图块 () {
    图块类型.push([
    0,
    0,
    0,
    1,
    1,
    1
    ])
    图块类型.push([
    0,
    1,
    1,
    1,
    1,
    0
    ])
    图块类型.push([
    1,
    1,
    1,
    0,
    0,
    0
    ])
    图块类型.push([
    1,
    0,
    0,
    0,
    0,
    1
    ])
    图块类型.push([0, 0, 1, 0])
    图块类型.push([0, 0, 1, 1])
    图块类型.push([0, 0, 0, 1])
    图块类型.push([0, 0, 1, 1])
    图块类型.push([1, 0, 0, 1])
    图块类型.push([0, 0])
}
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    移动控制(1, 0, false)
})
function 设置块 (x: number, y: number, 是否绘制: boolean) {
    临时块 = 地图[y][x]
    if (是否绘制) {
        临时块.setImage(assets.image`myImage`)
    } else {
        临时块.setImage(assets.image`myImage0`)
    }
}
function 移动控制 (x: number, y: number, 是否固定: boolean) {
    移动组(x, y)
    有碰撞 = 判断组碰撞()
    if (有碰撞) {
        移动组(0 - x, 0 - y)
        if (是否固定) {
            将块组设置到地图值上()
            创建块组()
            判断消除()
        }
    }
    绘制地图()
    绘制组()
}
function 绘制地图 () {
    for (let iy = 0; iy <= 游戏高度; iy++) {
        for (let ix = 0; ix <= 游戏宽度; ix++) {
            if (地图值[iy][ix] == 1) {
                设置块(ix, iy, true)
            } else {
                设置块(ix, iy, false)
            }
        }
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    移动控制(0, 1, false)
})
function 绘制组 () {
    for (let index = 0; index <= 当前块组.length / 2 - 1; index++) {
        设置块(当前块组[index * 2], 当前块组[index * 2 + 1], true)
    }
}
function 创建块组 () {
    info.changeScoreBy(1)
    当前块组编号 = randint(1, 10)
    设置当前块组(当前块组编号)
    if (当前块组编号 == 10 || 当前块组编号 == 7) {
        移动组(randint(0, 游戏宽度), 0)
    } else {
        移动组(randint(0, 游戏宽度 - 1), 0)
    }
    有碰撞 = 判断组碰撞()
    if (有碰撞) {
        game.over(false)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    游戏速度 += 100
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    移动控制(1, 0, false)
})
function 判断消除 () {
    for (let iy = 0; iy <= 游戏高度; iy++) {
        地图横行值 = 地图值[iy]
        地图横行 = 地图[iy]
        if (地图横行值.indexOf(0) == -1) {
            地图值.removeAt(iy)
            music.pewPew.play()
            for (let ix = 0; ix <= 游戏宽度; ix++) {
                临时块 = 地图横行[ix]
                临时块.startEffect(effects.disintegrate, 200)
                地图横行值[ix] = 0
            }
            地图值.unshift(地图横行值)
            info.changeLifeBy(1)
        }
    }
}
function 判断组碰撞 () {
    for (let index = 0; index <= 当前块组.length / 2 - 1; index++) {
        ix = 当前块组[index * 2]
        iy = 当前块组[index * 2 + 1]
        if (ix < 0 || ix > 游戏宽度) {
            return true
        } else if (iy < 0 || iy >= 游戏高度) {
            return true
        } else if (地图值[iy][ix] == 1) {
            return true
        }
    }
    return false
}
function 移动组 (移动x: number, 移动y: number) {
    for (let index = 0; index <= 当前块组.length / 2 - 1; index++) {
        当前块组[index * 2] = 当前块组[index * 2] + 移动x
        当前块组[index * 2 + 1] = 当前块组[index * 2 + 1] + 移动y
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    游戏速度 += -100
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    移动控制(-1, 0, false)
})
function 设置当前块组 (地图类型: number) {
    当前块组 = []
    for (let 数值 of 图块类型[地图类型]) {
        当前块组.push(数值)
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    移动控制(-1, 0, false)
})
function 设置地图块值 (x: number, y: number, 是否绘制: boolean) {
    if (是否绘制) {
        地图值[y][x] = 1
    } else {
        地图值[y][x] = 0
    }
}
function 创建地图 () {
    地图 = []
    地图值 = []
    for (let iy = 0; iy <= 游戏高度; iy++) {
        地图横行 = []
        地图横行值 = []
        for (let ix = 0; ix <= 游戏宽度; ix++) {
            临时块 = sprites.create(assets.image`myImage0`, SpriteKind.方块)
            临时块.setPosition(ix * 8 + 48, iy * 8 + 4)
            地图横行.push(临时块)
            地图横行值.push(0)
        }
        地图.push(地图横行)
        地图值.push(地图横行值)
    }
}
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    移动控制(0, 1, false)
})
let 地图横行: Sprite[] = []
let 地图横行值: number[] = []
let 当前块组编号 = 0
let 临时块: Sprite = null
let 当前块组: number[] = []
let iy = 0
let ix = 0
let 图块类型: number[][] = []
let 地图值: number[][] = []
let 有碰撞 = false
let 地图: Sprite[][] = []
let 游戏宽度 = 0
let 游戏高度 = 0
游戏高度 = 15
游戏宽度 = 7
let 游戏速度 = 300
info.setLife(1)
info.setScore(0)
地图 = [[sprites.create(assets.image`myImage`, SpriteKind.Player)]]
有碰撞 = false
地图值 = [[0]]
图块类型 = [[0]]
ix = 0
iy = 0
初始化图块()
创建地图()
创建块组()
game.onUpdateInterval(游戏速度, function () {
    移动控制(0, 1, true)
})
