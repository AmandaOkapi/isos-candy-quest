namespace SpriteKind {
    export const Wall = SpriteKind.create()
    export const Floor = SpriteKind.create()
    export const WallHB = SpriteKind.create()
    export const UI = SpriteKind.create()
    export const HB = SpriteKind.create()
    export const Ramp = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const Prop = SpriteKind.create()


    export const EnemyProjectile = SpriteKind.create()
}
/**
 * Welcome to Amanda's spaggethi code! :)
 */
function playerUpdate () {
    isoHBground.x = iso.x
    isoHBground.y = iso.y + 5
    switch (playerState) {
        case "idle":
            idle()
            break;
        case "hit":
            hit()
            break;
        case "falling":
            falling()
            break;
        case "fallingReset":
            fallingReset()
            break;
        case "free":
            console.log("free");
            break;
        default:
            console.log("default");
    }
if (canMove) {
        movement()
    }
    if (playerState == "hit") {
        iso.image.replace(1, 15)
    }
}
let hasSwapped=false;
function enemyMovement () {
    // check if any enemies in the level need to turn around
    //note to self use a for each loop next time...
    for (let i = 0; i <= enemyList.length - 1; i++) {
        if (enemyMinX[i] != 0) {
            if (enemyList[i].x < enemyMinX[i]) {
                //prevent them from just swapping back and forth

                // note to self, next time make enemyMin and Max be Attributes (OOP)
                enemyList[i].x = enemyMinX[i]
                enemyList[i].vy = 0 - enemyList[i].vy
                enemyList[i].vx = 0 - enemyList[i].vx
                if (enemyList[i].vy >= 0) {
                    animation.runImageAnimation(
                    enemyList[i],
                    assets.animation`ani_pumpkinF`,
                    200,
                    true
                    )
                } else {
                    animation.runImageAnimation(
                    enemyList[i],
                    assets.animation`ani_pumpkinback`,
                    200,
                    true
                    )
                }
                

            } else if (enemyList[i].x > enemyMaxX[i]) {
                enemyList[i].x = enemyMaxX[i]
                enemyList[i].vy = 0 - enemyList[i].vy
                enemyList[i].vx = 0 - enemyList[i].vx
                if (enemyList[i].vy >= 0) {
                    animation.runImageAnimation(
                    enemyList[i],
                    assets.animation`ani_pumpkin`,
                    200,
                    true
                    )
                } else {
                    animation.runImageAnimation(
                    enemyList[i],
                    assets.animation`ani_pumpkinbackF`,
                    200,
                    true
                    )
                }
            }
        }
        // depth SORTING
        enemyList[i].z = enemyList[i].y
        // collisions
        if (enemyList[i].z <= iso.z + 2 && enemyList[i].z >= iso.z - 4) {
            if (enemyList[i].overlapsWith(isoHBground)) {
                //enemyList[i].sayText("hit")
                if(playerState!="hit"){
                playerState = "hit"
                //hit()
                }
            }
        } else {
            //enemyList[i].sayText("")
        }
    }
}
let levelScore=0

function level1 () {
    currentLevel = "Level1"
    scene.setBackgroundImage(assets.image`bkg_blue`)
    music.setVolume(70)
    music.play(music.stringPlayable("E B C5 A B G A F ", 60), music.PlaybackMode.LoopingInBackground)
    effects.clouds.startScreenEffect()
    tiles.setCurrentTilemap(tilemap`level1`)
    info.setLife(2)
    //5 candies in lvl1
    levelScore=5
    ////////set to 1 to skip level
    info.setScore(levelScore)
    // left map wall
    drawWall(8, 1, 6, 28, "left", true, 2, true)
    drawWall(8, 1, 17, 29, "left", false, 1, false)
    drawWall(4, 1, 26, 25, "right", false, 1, true)
    drawWall(8, 1, -6, 33, "left", false, 1, true)
    wallX.push(328);
    wallY.push(146);
    wallC.push("bottom-corner")
    // make the levels enemies
    enemy0 = sprites.create(assets.image`spr_pumpkin`, SpriteKind.Enemy)
    enemy0.setPosition(linearX(34, 6, width / 2) + x_dis, linearY(34, 6, height / 4) + y_dis + height / 4)
    enemy0.setVelocity(-20, 10)
    animation.runImageAnimation(
    enemy0,
    assets.animation`ani_pumpkin`,
    200,
    true
    )
    enemyMinX.push(enemy0.x - 8 * 4 - 3)
    enemyMaxX.push(enemy0.x + 5)
    enemyList.push(enemy0)
    enemy1 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy1.setPosition(linearX(32, 6, width / 2) + x_dis, linearY(32, 6, height / 4) + y_dis + height / 4)
    enemy1.setVelocity(20, 10)
    enemyMinX.push(enemy1.x - 8 * 3 - 3)
    enemyMaxX.push(enemy1.x +5)
    enemyList.push(enemy1)
    animation.runImageAnimation(
    enemy1,
    assets.animation`ani_pumpkinF`,
    200,
    true
    )
    enemy2 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy2.setPosition(linearX(25, -10, width / 2) + x_dis, linearY(25, -10, height / 4) + y_dis + height / 4)
    enemy2.setVelocity(20, 10)
    enemyMinX.push(enemy2.x - 8 * 3 - 3)
    enemyMaxX.push(enemy2.x + 8 + 5)
    enemyList.push(enemy2)
    animation.runImageAnimation(
    enemy2,
    assets.animation`ani_pumpkinF`,
    200,
    true
    )
    enemy3 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy3.setPosition(linearX(38, -10, width / 2) + x_dis, linearY(38, -10, height / 4) + y_dis + height / 4)
    enemy3.setVelocity(0, 0)
    enemyMinX.push(0)
    enemyMaxX.push(0)
    enemyList.push(enemy3)
    animation.runImageAnimation(
    enemy3,
    assets.animation`ani_bluepumpkin`,
    200,
    true
    )

    enemy4 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy4.setPosition(linearX(36, -6, width / 2) + x_dis, linearY(36, -6, height / 4) + y_dis + height / 4)
    enemy4.setVelocity(0, 0)
    enemyMinX.push(0)
    enemyMaxX.push(0)
    enemyList.push(enemy4)
    animation.runImageAnimation(
        enemy4,
        assets.animation`ani_bluepumpkin`,
        200,
        true
    )
    // make the levels colltibles
    makeLevel1Candy()

    //makeProp(200,256,0,false,assets.image`spr_grass`)

    makeProp(240, 248, 3, false,assets.image`spr_flower2`)
    makeProp(160, 242, 3, false,assets.image`spr_flower1`)
    makeProp(376, 140, 3, false, assets.image`spr_flower1`)

    makeProp(216, 160,-1,false,assets.image`spr_mushroom`)
    makeProp(192, 156, -1, false, assets.image`spr_mushroom`)

    makeProp(240, 146, 10, false, assets.image`spr_tree`)
    makeProp(512, 130, 10, false, assets.image`spr_tree`)

    makeProp(336, 244, 5, false, assets.image`spr_pine`)

}
function makeProp(myX:number,myY:number, zOffset:number, solid:boolean, myImage:any ){
   let prop = sprites.create(myImage, SpriteKind.Prop)
   prop.setPosition(myX, myY)
   if (solid){
       wallX.push(myX);
       wallY.push(myY);
    wallC.push("bottom-corner")
   }
   prop.z=prop.y+zOffset
}
function movement () {
    let dir_x = Math.sign(controller.dx());
let dir_y = Math.sign(controller.dy());
if (dir_x != 0 || dir_y != 0) {
        spd_x = 2
        spd_y = 1
        if (dir_x != 0 && dir_y != 0) {
            spd_x = dir_x / Math.sqrt(dir_x ** 2 + dir_y ** 2) * spd_x
            spd_y = dir_y / Math.sqrt(dir_x ** 2 + dir_y ** 2) * spd_y
        } else {
            spd_x = dir_x * spd_x
            spd_y = dir_y * spd_y
        }
        // estimate for the coordinate of the tile the player is on
        coordX = Math.round((isoHBground.x + spd_x) / 8) * 8
        // console.log(coordX);
        // console.log(coordY);
        coordY = Math.round((isoHBground.y + spd_y) / 4) * 4 + 2
        for (let j = 0; j <= wallX.length - 1; j++) {
            if (coordX == wallX[j]) {
                if (coordY == wallY[j] || coordY + 4 == wallY[j]) {
                    if (coordY + 4 == wallY[j]) {
                        isoHBground.y = coordY
                        iso.y = isoHBground.y - 5
                    }
                    // coliding
                    iscolliding = true
                    if (wallC[j] == "left") {
                        if (spd_x < 0) {
                            spd_x = 0
                        }
                        if (spd_y < 0) {
                            spd_y = 0
                        }
                        wall_dir_previous = "left"
                    } else if (wallC[j] == "right") {
                        if (spd_x > 0) {
                            spd_x = 0
                        }
                        if (spd_y < 0) {
                            spd_y = 0
                        }
                        if (isoHBground.y < wallY[j]) {
                            spd_x = 0
                        }
                        wall_dir_previous = "right"
                    } else if (wallC[j] == "bottom-corner") {
                        if (isoHBground.y < wallY[j]) {
                            spd_x = 0
                        }
                        if (spd_y < 0) {
                            spd_y = 0
                        }
                        wall_dir_previous = "bottom-corner"
                    }
                    x_previous = coordX
                    y_previous = coordY
                }
            }
        }
     //   iso.sayText("" + coordX + " " + coordY + " " + iscolliding)
        // sprite images
        if (dir_x != 0) {
            if (dir_y < 0) {
                iso.setImage(img`
                    . . . . . . 9 9 9 9 . . . . . .
                    . . . . 9 9 1 1 1 1 9 9 . . . .
                    . . . 9 1 1 1 1 1 1 1 1 9 . . .
                    . . 9 9 1 1 1 1 1 1 1 7 8 9 . .
                    . . 9 1 8 8 1 1 1 7 8 8 1 9 . .
                    . . 9 1 1 1 8 8 8 8 7 1 1 9 . .
                    . . 9 1 1 1 1 8 7 1 1 1 1 9 . .
                    . . 9 1 1 1 1 8 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 8 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 8 1 1 1 1 1 9 . .
                    . . 9 7 1 1 1 8 1 1 1 1 1 9 . .
                    . . 9 7 9 1 1 8 1 1 1 9 7 9 . .
                    . . . 9 7 7 8 8 1 1 7 7 9 . . .
                    . . 9 9 7 9 8 7 9 7 9 9 . . . .
                    . . . . 9 . 9 9 . 9 . . . . . .
                    . . . . . . . . . . . . . . . .
                `)
            } else if (dir_y > 0) {
                iso.setImage(img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . 9 9 9 9 . . . . . .
                    . . . . 9 9 1 1 1 1 9 9 . . . .
                    . . . 9 1 1 1 1 1 1 1 1 9 . . .
                    . . 9 9 1 1 1 1 1 1 1 7 8 9 . .
                    . . 9 1 8 8 1 1 1 7 8 8 1 9 . .
                    . . 9 1 1 1 8 8 8 8 7 1 1 9 . .
                    . . 9 1 1 1 1 8 7 1 1 e 1 9 . .
                    . . 9 1 1 1 1 8 1 e 1 e 1 9 . .
                    . . 9 1 1 1 1 8 1 e 1 1 1 9 . .
                    . . 9 1 1 1 1 8 1 1 1 1 1 9 . .
                    . . 9 7 1 1 1 8 1 1 e 1 1 9 . .
                    . . 9 7 9 1 1 8 1 1 1 9 7 9 . .
                    . . . 9 7 7 8 8 1 1 7 7 9 . . .
                    . . 9 9 7 9 8 7 9 7 9 9 . . . .
                    . . . . 9 . 9 9 . 9 . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `)
            } else if (dir_y == 0) {
                iso.setImage(img`
                    . . . . . . 9 9 9 9 . . . . . .
                    . . . . 9 9 1 1 1 1 9 9 . . . .
                    . . . 9 1 1 1 1 1 1 1 7 9 . . .
                    . . 9 9 1 1 1 1 1 1 7 7 8 9 . .
                    . . 9 1 8 8 1 1 1 7 8 8 1 9 . .
                    . . 9 1 1 1 8 8 8 8 1 1 1 9 . .
                    . . 9 1 1 1 1 8 7 1 1 e 1 9 . .
                    . . 9 1 1 1 1 8 7 1 1 e 1 9 . .
                    . . 9 1 1 1 1 8 7 1 1 1 1 9 . .
                    . . 9 1 1 1 1 8 7 1 1 1 e 9 . .
                    . . 9 1 1 1 1 8 7 1 1 1 7 9 . .
                    . . 9 7 9 1 1 8 7 1 1 9 7 9 . .
                    . . . 9 1 1 8 8 7 1 1 7 9 . . .
                    . . . 9 9 7 9 8 7 9 7 9 9 . . .
                    . . . . . 9 . 9 9 . 9 . . . . .
                    . . . . . . . . . . . . . . . .
                `)
            }
        } else {
            if (dir_y > 0) {
                iso.setImage(img`
                    . . . . . . 9 9 9 9 . . . . . .
                    . . . . 9 9 1 1 1 1 9 9 . . . .
                    . . . 9 1 1 1 1 1 1 1 1 9 . . .
                    . . . 9 1 1 1 1 1 1 7 1 8 . . .
                    . . . 9 8 8 1 1 7 7 8 8 9 . . .
                    . . 9 1 1 1 8 8 8 8 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 e 1 1 e 1 1 1 9 . .
                    . . 9 1 1 1 e 1 1 e 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 e e 1 1 1 1 9 . .
                    . . 9 1 9 1 1 1 1 1 1 9 1 9 . .
                    . . 9 9 1 1 8 1 7 1 1 7 9 9 . .
                    . . . 9 9 7 9 8 7 9 7 9 9 . . .
                    . . . . . 9 . 9 9 . 9 . . . . .
                    . . . . . . . . . . . . . . . .
                `)
            }
            if (dir_y < 0) {
                iso.setImage(img`
                    . . . . . . 9 9 9 9 . . . . . .
                    . . . . 9 9 1 1 1 1 9 9 . . . .
                    . . . 9 1 1 1 1 1 1 1 1 9 . . .
                    . . . 9 1 1 1 1 1 1 7 1 8 . . .
                    . . . 9 8 8 1 1 7 7 8 8 9 . . .
                    . . 9 1 1 1 8 8 8 8 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 9 1 1 1 1 1 1 9 1 9 . .
                    . . 9 9 1 1 8 1 7 1 1 7 9 9 . .
                    . . . 9 9 7 9 8 7 9 7 9 9 . . .
                    . . . . . 9 . 9 9 . 9 . . . . .
                    . . . . . . . . . . . . . . . .
                `)
            }
        }
        if (dir_x < 0) {
            iso.image.flipX()
        }
        iso.x += spd_x
        iso.y += spd_y
        if (footstepTimr <= 0) {
            music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.InBackground)
            footstepTimr = 120
        } else {
            footstepTimr += 0 - 1
        }
       //  iso.sayText(iso.x+ " "+iso.y)
        // depth SORTING
        iso.z = iso.y
    }

    if(bossFight){
        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . 3 . . . . .
                . . . . . 1 3 . . . .
                . . 3 . . 1 3 . 3 . .
                . . . 1 3 1 3 1 3 . .
                3 3 3 8 1 1 1 3 . . .
                . 3 3 8 3 1 1 1 1 1 1
                . . . . 8 1 1 3 8 3 3
                . . . 1 3 1 3 1 3 . .
                . . 3 3 . 1 3 3 1 . .
                . . . . . 1 3 . . . .
                . . . . . 1 3 . . . .
            `, iso, 200, -100)
            projectile.follow(boss, 50)
            projectile.lifespan = 1500
            projectile.z=0

            if (dir_x<0){
                projectile.vx=-200
            }else{
                projectile.vx = 200
            }
            projectile.z=projectile.y
        })
    }
}
let projectile: Sprite=null
sprites.onCreated(SpriteKind.Food, function (sprite) {
    animation.runImageAnimation(
    sprite,
    assets.animation`ani_candy`,
    150,
    true
    )
})
// linear transformation
// T([x])=[ x*0.5*w  -y*0.5*w  ] =[w/2  -w/2] [x]
// ([y]) [ x*0.25*h  y*0.25*h ]  [h/4   h/4] [y]
function linearX (x: number, y: number, c: number) {
    return c * (x - y)
}
// draw a wall of any length and height with collision checkers
function drawWall (wall_len: number, wall_h: number, starting_x: number, starting_y: number, dir: string, hasRamp: boolean, rampLen: number, hideWall: boolean) {
    if (starting_x == 0) {
        wall_len += 0 - 1
    } else {
        wall_len += starting_x - 1
    }
    for (let myX2 = starting_x-1; myX2 <= wall_len; myX2++) {
/*
        wallHB = sprites.create(img`
            3 f
            f 3
        `, SpriteKind.WallHB)
*/
        let y_pos2 = 0
        let x_pos2 = 0


        x_pos2 = linearX(myX2, starting_y, width / 2)
        y_pos2 = linearY(myX2, starting_y+1, height / 4)

        if (dir == "left") {
            x_pos2 = -x_pos2
        }

        x_pos2 += x_dis
        y_pos2 += y_dis + height_adder;
    //   wallHB.x = x_pos2
     //   wallHB.y = y_pos2-2;
    //    console.log(wallHB.x +" " + wallHB.y)
        wallX.push(x_pos2);
        wallY.push(y_pos2 - 2);
        
        if (myX2==wall_len){
            wallC.push("bottom-corner")
        }
        else{
            wallC.push(dir)  
        }   
    }
// draw wall
    for (let k = 0; k <= wall_h - 1; k++) {
        height_adder += 0 - height / 2
        for (let myX3 = starting_x; myX3 <= wall_len; myX3++) {


                let y_pos3 = 0
                let x_pos3 = 0


            x_pos3 =linearX(myX3, starting_y, width/2) 
            y_pos3 =linearY(myX3, starting_y,height / 4)
                
                if (dir == "left"){
                x_pos3=-x_pos3
            }

                x_pos3 += x_dis
                y_pos3 += y_dis +height_adder;            
                
                if(!hideWall){
                    block = sprites.create(assets.image`spr_wall`, SpriteKind.Wall)
                    block.z = 0
                    block.x = x_pos3
                    block.y = y_pos3
                }
            //make a collider for end of wall
            //or a ramp
            
            if ((myX3 == (wall_len)) && (k==0)){
                    let y_pos4 = 0
                    let x_pos4 = 0


            //for ramp
            if(hasRamp){
                for(let m=1; m<=rampLen; m++){

                x_pos4 = linearX(myX3 + m, starting_y, width / 2)
                y_pos4 = linearY(myX3 + m, starting_y, height / 4) - 2

                if (dir == "left") {
                    x_pos4 = -x_pos4
                }

                x_pos4 += x_dis
                y_pos4 += y_dis - (height / 4);
                    let ramp = sprites.create(assets.image`spr_ramp`, SpriteKind.Ramp)
                    ramp.x = x_pos4+1
                    ramp.y = y_pos4-3

                }
            }else{
                //for end of wall collider
                /*
                y_pos4 = 0
                x_pos4 = 0
                x_pos4 = linearX(myX3 + 1, starting_y, width / 2)
                y_pos4 = linearY(myX3 + 1, starting_y, height / 4) - 2

                if (dir == "left") {
                    x_pos4 = -x_pos4
                }

                x_pos4 += x_dis
                y_pos4 += y_dis - (height/2 )-4;

                    wallHB = sprites.create(img`
    3 f 
    f 3 
    `, SpriteKind.WallHB)

                    wallHB.x = x_pos4
                    wallHB.y = y_pos4
            
                    wallX.push(wallHB.x);
                    wallY.push(wallHB.y);

                    if (dir=="left"){
                        wallC.push("right")
                    }
                    else{
                        wallC.push("left")
                    }
                    //console.log(wallHB.x + " " + wallHB.y)
    
                    */
                }
        }
     }
    }
}
function hit () {
    console.log("hit")
    canMove = true
    if (!(isHit)) {
        info.changeLifeBy(-1)
        isHit = true
        hitCooldown = cooldownTime
        iso.image.replace(1, 5)
        
        music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.InBackground)
    } else {
        hitCooldown += 0 - 1
    }
    // on cooldown timer end
    if (hitCooldown <= 0) {        
        isHit = false
        playerState = "idle"

    }
}
function linearY (x: number, y: number, c: number) {
    return c * (x + y)
}
function falling () {
    if (!(isFalling)) {
        console.log("falling")
        canMove = false
        animation.runImageAnimation(
        iso,
        assets.animation`ani_falling`,
        200,
        false
        )
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        fallingtimr = 100

        isFalling = true
    }
    isFalling = false
    playerState = "fallingReset"
}

function level2 () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
   

    currentLevel = "Level2"
    // clear level1
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Wall)
    sprites.destroyAllSpritesOfKind(SpriteKind.Ramp)
    sprites.destroyAllSpritesOfKind(SpriteKind.WallHB)
    enemyList.splice(0, enemyList.length)
    wallX.splice(0, wallX.length)
    wallY.splice(0, wallY.length)
    wallC.splice(0, wallC.length);
    enemyMaxX.splice(0, enemyMaxX.length);
    enemyMinX.splice(0, enemyMinX.length);
    console.log(wallC[1])
    scene.setBackgroundImage(assets.image`bkg_purple`)
    tiles.setCurrentTilemap(tilemap`level2`)
    //info.setLife(2)
    //5 candies in lvl5
    levelScore=5
    info.setScore(levelScore)
    iso.setPosition(linearX(48, 20, width / 2), linearY(48, 20, height / 4) + 4)
    startingX = iso.x
    startingY = iso.y
    isoHBground.setPosition(iso.x,iso.y+5)
//make level 2 elements
    //wall collisions
    //doing it manually :3
    wallX.push(280);
    wallY.push(186);
    wallC.push("bottom-corner")
  /*  wallHB = sprites.create(img`
           3 f
            f 3
        `, SpriteKind.WallHB)    
    */
   // wallHB.setPosition(280, 186)
    //
    wallX.push(272);
    wallY.push(182);
    wallC.push("right")
    /*
    wallHB = sprites.create(img`
           3 f
            f 3
        `, SpriteKind.WallHB)
    wallHB.setPosition(272, 182)
    //*/
    wallX.push(272);
    wallY.push(182);
    wallC.push("bottom-corner")
 /*   wallHB = sprites.create(img`
           3 f
            f 3
        `, SpriteKind.WallHB)
    wallHB.setPosition(272, 182)
    //*/
    wallX.push(264);
    wallY.push(178);
    wallC.push("right")
 /*   wallHB = sprites.create(img`
           3 f
            f 3
        `, SpriteKind.WallHB)
    wallHB.setPosition(264, 178)
    //*/
    wallX.push(288);
    wallY.push(182);
    wallC.push("left")
  /*  wallHB = sprites.create(img`
           3 f
            f 3
        `, SpriteKind.WallHB)
    wallHB.setPosition(288, 186)
    //*/
    wallX.push(296);
    wallY.push(178);
    wallC.push("left")
  /*  wallHB = sprites.create(img`
           3 f
            f 3
        `, SpriteKind.WallHB)
    wallHB.setPosition(296, 178)
    //*/
    wallX.push(304);
    wallY.push(174);
    wallC.push("left")
 /*   wallHB = sprites.create(img`
           3 f
            f 3
        `, SpriteKind.WallHB)
    wallHB.setPosition(304, 174)
    //*/
    wallX.push(328);
    wallY.push(162);
    wallC.push("left")
 /*   wallHB = sprites.create(img`
           3 f
            f 3
        `, SpriteKind.WallHB)
    wallHB.setPosition(328, 162)
    //*/
    wallX.push(336);
    wallY.push(158);
    wallC.push("left")
 /*   wallHB = sprites.create(img`
           3 f
            f 3
        `, SpriteKind.WallHB)
    wallHB.setPosition(336, 158)
    //*/
    wallX.push(344);
    wallY.push(154);
    wallC.push("left")
 /*   wallHB = sprites.create(img`
           3 f
            f 3
        `, SpriteKind.WallHB)
    wallHB.setPosition(344, 154)
    //*/
    wallX.push(352);
    wallY.push(150);
    wallC.push("bottom-corner")
 /*   wallHB = sprites.create(img`
           3 f
            f 3
        `, SpriteKind.WallHB)
    wallHB.setPosition(352, 150)*/
    //smh no more walls
//lvl2 enemies :0
//really shouldve made a spawn enemy function 
    enemy0 = sprites.create(assets.image`spr_pumpkin`, SpriteKind.Enemy)
    enemy0.setPosition(linearX(34, 6, width / 2) + x_dis, linearY(34, 6, height / 4) + y_dis + height / 4)
    enemy0.setVelocity(-20, 10)
    animation.runImageAnimation(
        enemy0,
        assets.animation`ani_pumpkin`,
        200,
        true
    )
    enemyMinX.push(enemy0.x - 8 * 4 - 1)
    enemyMaxX.push(enemy0.x + 4)
    enemyList.push(enemy0)
    //enemy1
    enemy1 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy1.setPosition(linearX(40, 25, width / 2) + x_dis, linearY(40, 25, height / 4) + y_dis + height / 4)
    enemy1.setVelocity(20, 10)
    enemyMinX.push(enemy1.x - 8 * 3 - 3)
    enemyMaxX.push(enemy1.x + 5)
    enemyList.push(enemy1)
    animation.runImageAnimation(
        enemy1,
        assets.animation`ani_pumpkinF`,
        200,
        true
    )
//enemy2
    enemy2 = sprites.create(assets.image`spr_pumpkin`, SpriteKind.Enemy)
    enemy2.setPosition(linearX(40, 15, width / 2) + x_dis, linearY(40, 15, height / 4) + y_dis + height / 4)
    enemy2.setVelocity(20, 10)
    animation.runImageAnimation(
        enemy2,
        assets.animation`ani_pumpkin`,
        200,
        true
    )
    enemyMinX.push(enemy2.x - 8 * 5 - 1)
    enemyMaxX.push(enemy2.x + 4)
    enemyList.push(enemy2)

    //enemy3
    enemy3 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy3.setPosition(linearX(36, 7, width / 2) + x_dis, linearY(36, 7, height / 4) + y_dis + height / 4)
    enemy3.setVelocity(0, 0)
    enemyMinX.push(0)
    enemyMaxX.push(0)
    enemyList.push(enemy3)
    animation.runImageAnimation(
        enemy3,
        assets.animation`ani_bluepumpkin`,
        200,
        true
    )

    //enemy4
    enemy4 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy4.setPosition(linearX(20, -2, width / 2) + x_dis, linearY(20, -2, height / 4) + y_dis + height / 4)
    enemy4.setVelocity(0, 0)
    enemyMinX.push(0)
    enemyMaxX.push(0)
    enemyList.push(enemy4)
    animation.runImageAnimation(
        enemy4,
        assets.animation`ani_bluepumpkin`,
        200,
        true
    )
    
    //enemy5
    enemy5 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy5.setPosition(linearX(21, -6, width / 2) + x_dis, linearY(21, -6, height / 4) + y_dis + height / 4)
    enemy5.setVelocity(20, 10)
    enemyMinX.push(enemy5.x - 8 * 5 - 3)
    enemyMaxX.push(enemy5.x + 5)
    enemyList.push(enemy5)
    animation.runImageAnimation(
        enemy5,
        assets.animation`ani_pumpkinF`,
        200,
        true
    )

    //enemy6
    enemy6 = sprites.create(assets.image`spr_pumpkin`, SpriteKind.Enemy)
    enemy6.setPosition(linearX(21, -2, width / 2) + x_dis, linearY(21, -2, height / 4) + y_dis + height / 4)
    enemy6.setVelocity(-20, 10)
    animation.runImageAnimation(
        enemy0,
        assets.animation`ani_pumpkin`,
        200,
        true
    )
    enemyMinX.push(enemy6.x - 8 * 4 - 1)
    enemyMaxX.push(enemy6.x + 4)
    enemyList.push(enemy6)


    makeLevel2Candy()

    makeProp(160, 248, 3, false, assets.image`spr_flower1`)
    makeProp(264, 62, 3, false, assets.image`spr_flower1`)
    makeProp(320, 222, 3, false, assets.image`spr_flower2`)
    makeProp(176, 317, -1, false, assets.image`spr_mushroom`)
    makeProp(272, 157, -1, false, assets.image`spr_mushroom`)
}
function drawFloor (sizeX: number, sizeY: number, myX_dis: number, myY_dis: number) {
    for (let myX = 0; myX <= sizeX; myX++) {
        // block = sprites.create(img`
        // . . . . . . . f f . . . . . . .
        // . . . . . f f b b f f . . . . .
        // . . . f f b b b b b b f f . . .
        // . f f b b b b b b b b b b f f .
        // f b b b b b b b b b b b b b b f
        // f f f b b b b b b b b b b f f f
        // f a a f f b b b b b b f f c c f
        // f a a a a f f b b f f c c c c f
        // f a a a a a a f f c c c c c c f
        // f a a a a a a f f c c c c c c f
        // f a a a a a a f f c c c c c c f
        // f a a a a a a f f c c c c c c f
        // . f f a a a a f f c c c c f f .
        // . . . f f a a f f c c f f . . .
        // . . . . . f f f f f f . . . . .
        // . . . . . . . f f . . . . . . .
        // //      `, SpriteKind.Floor)
        // 
        // block.z=-9999
        // linear transformation
        // T([x])=[ x*0.5*w  -y*0.5*w  ] =[w/2  -w/2] [x]
        // ([y]) [ x*0.25*h  y*0.25*h ]  [h/4   h/4] [y]
        for (let myY = 0; myY <= sizeY; myY++) {
            x_pos = linearX(myX, myY, width / 2)
            y_pos = linearY(myX, myY, height / 4)
            x_pos += myX_dis
            y_pos += myY_dis
            // block.x = x_pos
            // block.y = y_pos
            dot = sprites.create(img`
                2 2 
                2 2 
                `, SpriteKind.WallHB)
            dot.x = x_pos
            dot.y = y_pos - height / 4
        }
    }
}
info.onScore(0, function () {
    if (currentLevel!="Level4"){    
        canMove=false
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.UntilDone)
    playerState="idle"

    sprites.destroyAllSpritesOfKind(SpriteKind.Prop)
    switch (currentLevel) {
        case "Level1":
           level2()
            break;
        case "Level2":
           newLevel()
            break;
        case "NewLevel":
           level3()
            break;    
        case "Level3":
                iso.setImage(img`
                    . . . . . . 9 9 9 9 . . . . . .
                    . . . . 9 9 1 1 1 1 9 9 . . . .
                    . . . 9 1 1 1 1 1 1 1 1 9 . . .
                    . . . 9 1 1 1 1 1 1 7 1 8 . . .
                    . . . 9 8 8 1 1 7 7 8 8 9 . . .
                    . . 9 1 1 1 8 8 8 8 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 9 1 1 1 1 1 1 9 1 9 . .
                    . . 9 9 1 1 8 1 7 1 1 7 9 9 . .
                    . . . 9 9 7 9 8 7 9 7 9 9 . . .
                    . . . . . 9 . 9 9 . 9 . . . . .
                    . . . . . . . . . . . . . . . .
                `)
            level4()
            break;
       
        default:
       
    }

    pause(200)
    canMove=true
}}
)

function newLevel(){
    currentLevel="NewLevel";

    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    // clear level3
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Wall)
    sprites.destroyAllSpritesOfKind(SpriteKind.WallHB)
    enemyList.splice(0, enemyList.length)
    wallX.splice(0, wallX.length)
    wallY.splice(0, wallY.length)
    wallC.splice(0, wallC.length);
    enemyMaxX.splice(0, enemyMaxX.length);
    enemyMinX.splice(0, enemyMinX.length);
    console.log(wallC[1])
    scene.setBackgroundImage(assets.image`bkg_blue`)
    tiles.setCurrentTilemap(tilemap`newlevel`)
    //info.setLife(2)
    //4 candies in new lvl
    levelScore = 4
    info.setScore(levelScore)
    iso.setPosition(296, 286)
    startingX = iso.x
    startingY = iso.y
    isoHBground.setPosition(iso.x, iso.y + 5)


    drawWall(5, 1, 9, 27, "left", false, 1, true)
    drawWall(1, 1, 9, 30, "left", false, 1, true)
    drawWall(1, 1, 13, 41, "left", false, 1, true)
    drawWall(3, 1, 18, 42, "left", false, 1, true)

//enemies

//enemy0
    //enemy0
    enemy0 = sprites.create(img`
        . . . . . . . . . . d d b . . .
        . . . . f f f f . d d d . b . .
        . . . f 4 4 e e f d d . . . . .
        . . f 4 e e 4 4 e f f f f . . .
        . f 4 4 4 4 4 e 4 4 e 4 e f . .
        . f 4 e 4 4 e 4 4 4 e 4 e f . .
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f .
        . f e 4 f e 4 4 4 e 4 4 e 4 f .
        . f e f 2 f 4 4 f f 4 4 e 4 f .
        . f e f 2 f 4 f 2 f 4 4 4 4 f .
        . . f e e 4 4 2 f 4 4 4 4 e f .
        . . f b e e e e 5 e e e 4 e f .
        . . . f b b b 5 5 5 5 e e f f .
        . . f f b b b b 5 5 5 f f f . .
        . . f 5 5 f f f f 5 5 5 5 f . .
        . f 5 5 5 f f . f 5 5 5 5 f . .
    `, SpriteKind.Enemy)
    enemy0.setPosition(328, 230)
    enemy0.setVelocity(-20, 10)
    enemyMinX.push(enemy0.x - 8 * 3 - 3)
    enemyMaxX.push(enemy0.x + 5)
    enemyList.push(enemy0)
    animation.runImageAnimation(
        enemy0,
        assets.animation`ani_pumpkin`,
        200,
        true
    )


    //enemy1
    enemy1 = sprites.create(img`
        . . . . . . . . . . d d b . . .
        . . . . f f f f . d d d . b . .
        . . . f 4 4 e e f d d . . . . .
        . . f 4 e e 4 4 e f f f f . . .
        . f 4 4 4 4 4 e 4 4 e 4 e f . .
        . f 4 e 4 4 e 4 4 4 e 4 e f . .
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f .
        . f e 4 f e 4 4 4 e 4 4 e 4 f .
        . f e f 2 f 4 4 f f 4 4 e 4 f .
        . f e f 2 f 4 f 2 f 4 4 4 4 f .
        . . f e e 4 4 2 f 4 4 4 4 e f .
        . . f b e e e e 5 e e e 4 e f .
        . . . f b b b 5 5 5 5 e e f f .
        . . f f b b b b 5 5 5 f f f . .
        . . f 5 5 f f f f 5 5 5 5 f . .
        . f 5 5 5 f f . f 5 5 5 5 f . .
    `, SpriteKind.Enemy)
    enemy1.setPosition(288, 178)
    enemy1.setVelocity(-20, 10)
    enemyMinX.push(enemy1.x - 8 * 4 - 3)
    enemyMaxX.push(enemy1.x + 5)
    enemyList.push(enemy1)
    animation.runImageAnimation(
        enemy1,
        assets.animation`ani_pumpkin`,
        200,
        true
    )

    //enemy2
    enemy2 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy2.setPosition(264,164)
    enemy2.setVelocity(0, 0)
    enemyMinX.push(0)
    enemyMaxX.push(0)
    enemyList.push(enemy2)
    animation.runImageAnimation(
        enemy2,
        assets.animation`ani_bluepumpkin`,
        200,
        true
    )

    //enemy3
    enemy3 = sprites.create(img`
        . . . . . . . . . . d d b . . .
        . . . . f f f f . d d d . b . .
        . . . f 4 4 e e f d d . . . . .
        . . f 4 e e 4 4 e f f f f . . .
        . f 4 4 4 4 4 e 4 4 e 4 e f . .
        . f 4 e 4 4 e 4 4 4 e 4 e f . .
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f .
        . f e 4 f e 4 4 4 e 4 4 e 4 f .
        . f e f 2 f 4 4 f f 4 4 e 4 f .
        . f e f 2 f 4 f 2 f 4 4 4 4 f .
        . . f e e 4 4 2 f 4 4 4 4 e f .
        . . f b e e e e 5 e e e 4 e f .
        . . . f b b b 5 5 5 5 e e f f .
        . . f f b b b b 5 5 5 f f f . .
        . . f 5 5 f f f f 5 5 5 5 f . .
        . f 5 5 5 f f . f 5 5 5 5 f . .
    `, SpriteKind.Enemy)
    enemy3.setPosition(256, 154)
    enemy3.setVelocity(-20, 10)
    enemyMinX.push(enemy3.x - 8 * 5 - 3)
    enemyMaxX.push(enemy3.x + 5)
    enemyList.push(enemy3)
    animation.runImageAnimation(
        enemy3,
        assets.animation`ani_pumpkin`,
        200,
        true
    )

    //enemy4
    enemy4 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy4.setPosition(240, 184)
    enemy4.setVelocity(0, 0)
    enemyMinX.push(0)
    enemyMaxX.push(0)
    enemyList.push(enemy4)
    animation.runImageAnimation(
        enemy4,
        assets.animation`ani_bluepumpkin`,
        200,
        true
    )

    //enemy5

    //enemy5
    enemy5 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy5.setPosition(248, 124)
    enemy5.setVelocity(20, 10)
    enemyMinX.push(enemy5.x - 8 * 5 - 3)
    enemyMaxX.push(enemy5.x + 5)
    enemyList.push(enemy5)
    animation.runImageAnimation(
        enemy5,
        assets.animation`ani_pumpkinF`,
        200,
        true
    )

    makeNewLevelCandies()

    makeProp(257, 259, 10, false, assets.image`spr_tree`)
    makeProp(217, 80, 9, false, assets.image`spr_statue`)
}

function level4(){
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    currentLevel = "Level4"
    // clear level2
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Wall)
    sprites.destroyAllSpritesOfKind(SpriteKind.WallHB)
    enemyList.splice(0, enemyList.length)
    wallX.splice(0, wallX.length)
    wallY.splice(0, wallY.length)
    wallC.splice(0, wallC.length);
    enemyMaxX.splice(0, enemyMaxX.length);
    enemyMinX.splice(0, enemyMinX.length);
    console.log(wallC[1])
    scene.setBackgroundImage(assets.image`bkg_lightblue`)
    tiles.setCurrentTilemap(tilemap`level7`)
    //info.setLife(2)
    //levelScore = 3
    info.setScore(bossHP)
    iso.setPosition(200, 174)
    startingX = iso.x
    startingY = iso.y
    isoHBground.setPosition(iso.x, iso.y + 5)

    boss = sprites.create(assets.image`myImage16`, SpriteKind.Boss)
    boss.setPosition(200, 100)
    boss.z=boss.y
    animation.runImageAnimation(
        boss,
        assets.animation`ani_boss`,
        200,
        true
    )
    pause(500)
    game.showLongText("I finally got all my candy back", DialogLayout.Bottom)
    game.showLongText("But where am I?", DialogLayout.Bottom)

    canMove=false
    iso.setVelocity(0, -30)
    
    pause(1100)
    iso.setVelocity(0,0)
    

    game.setDialogFrame(assets.image`spr_dialogue2`)
    game.showLongText("???: You there, small spirit, are you the reason my henchmen have not yet brought me my candy?", DialogLayout.Bottom)

    game.showLongText("Feel my wrath!", DialogLayout.Bottom)
    music.stopAllSounds()
    music.play(music.stringPlayable("E B C5 A B G A F ", 120), music.PlaybackMode.LoopingInBackground)
    game.splash("Defeat the Pumpkin King!","Use A or Space to fire a projectile")
    canMove = true
    bossFight=true
    playerState="idle"
}

let boss: Sprite = null
let bossFight=false
let bossHP=2000

sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    iso.x=startingX
    iso.y=startingY
    isoHBground.setPosition(iso.x, iso.y + 5)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-1)
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    bossHP-=1
})
function level3(){
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    currentLevel = "Level3"
    // clear level2
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Wall)
    sprites.destroyAllSpritesOfKind(SpriteKind.WallHB)
    enemyList.splice(0, enemyList.length)
    wallX.splice(0, wallX.length)
    wallY.splice(0, wallY.length)
    wallC.splice(0, wallC.length);
    enemyMaxX.splice(0, enemyMaxX.length);
    enemyMinX.splice(0, enemyMinX.length);
    console.log(wallC[1])
    scene.setBackgroundImage(assets.image`bkg_lightblue`)
    tiles.setCurrentTilemap(tilemap`level5`)
    //info.setLife(2)
    //3 candies in lvl 3
    levelScore = 3
    info.setScore(levelScore)
    iso.setPosition(200, 174)
    startingX = iso.x
    startingY = iso.y
    isoHBground.setPosition(iso.x, iso.y + 5)

    //enemies
    enemy0 = sprites.create(assets.image`spr_pumpkin`, SpriteKind.Enemy)
    enemy0.setPosition(184, 158)
    enemy0.setVelocity(-20, -10)
    animation.runImageAnimation(
        enemy0,
        assets.animation`ani_pumpkinbackF
`,
        200,
        true
    )
    enemyMinX.push(enemy0.x - 8 * 4 - 1)
    enemyMaxX.push(enemy0.x + 4)
    enemyList.push(enemy0)
    //enemy1
    enemy1 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy1.setPosition(168, 82)
    enemy1.setVelocity(-20, 10)
    enemyMinX.push(enemy1.x - 8 * 3 - 3)
    enemyMaxX.push(enemy1.x + 5)
    enemyList.push(enemy1)
    animation.runImageAnimation(
        enemy1,
        assets.animation`ani_pumpkinF`,
        200,
        true
    )
    //enemy2
    enemy2 = sprites.create(assets.image`spr_pumpkin`, SpriteKind.Enemy)
    enemy2.setPosition(128, 102)
    enemy2.setVelocity(-20, 10)
    animation.runImageAnimation(
        enemy2,
        assets.animation`ani_pumpkin`,
        200,
        true
    )
    enemyMinX.push(enemy2.x - 8 * 5 - 1)
    enemyMaxX.push(enemy2.x + 4)
    enemyList.push(enemy2)

    //enemy3
    enemy3 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy3.setPosition(248, 154)
    enemy3.setVelocity(20, 10)
    enemyMinX.push(enemy3.x - 8 * 3 - 1)
    enemyMaxX.push(enemy3.x + 4)
    enemyList.push(enemy3)
    animation.runImageAnimation(
        enemy3,
        assets.animation`ani_pumpkinF`,
        200,
        true
    )

    //enemy4
    enemy4 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy4.setPosition(288, 146)
    enemy4.setVelocity(20, 10)
    enemyMinX.push(enemy4.x - 8 * 3 - 1)
    enemyMaxX.push(enemy4.x + 4)
    enemyList.push(enemy4)
    animation.runImageAnimation(
        enemy4,
        assets.animation`ani_pumpkinF`,
        200,
        true
    )

    //enemy5
    enemy5 = sprites.create(img`
        . . . . . . . . . . d d b . . . 
        . . . . f f f f . d d d . b . . 
        . . . f 4 4 e e f d d . . . . . 
        . . f 4 e e 4 4 e f f f f . . . 
        . f 4 4 4 4 4 e 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e f . . 
        . f 4 e 4 4 e 4 4 4 e 4 e 4 f . 
        . f e 4 f e 4 4 4 e 4 4 e 4 f . 
        . f e f 2 f 4 4 f f 4 4 e 4 f . 
        . f e f 2 f 4 f 2 f 4 4 4 4 f . 
        . . f e e 4 4 2 f 4 4 4 4 e f . 
        . . f b e e e e 5 e e e 4 e f . 
        . . . f b b b 5 5 5 5 e e f f . 
        . . f f b b b b 5 5 5 f f f . . 
        . . f 5 5 f f f f 5 5 5 5 f . . 
        . f 5 5 5 f f . f 5 5 5 5 f . . 
        `, SpriteKind.Enemy)
    enemy5.setPosition(linearX(21, -6, width / 2) + x_dis, linearY(21, -6, height / 4) + y_dis + height / 4)
    enemy5.setVelocity(20, 10)
    enemyMinX.push(enemy5.x - 8 * 5 - 3)
    enemyMaxX.push(enemy5.x + 5)
    enemyList.push(enemy5)
    animation.runImageAnimation(
        enemy5,
        assets.animation`ani_pumpkin`,
        200,
        true
    )

    makeLevel3Candy()
}
function fallingReset () {
    fallingtimr += 0 - 1

    if (fallingtimr <= 0) {
        
        iso.x = startingX;
        iso.y = startingY;
        isoHBground.setPosition(iso.x, iso.y + 5)
        info.changeLifeBy(-1)
        canMove = true
        animation.stopAnimation(animation.AnimationTypes.All, iso)
        playerState = "idle"

    }
}
function idle() {
    if (stateStart) {
        console.log("idle")
        stateStart = false
    }
    if (controller.dx() != 0 || controller.dy() != 0) {
        playerState = "movement"
    }
}
// LAGGGGGGGGGGGGGGGG
sprites.onOverlap(SpriteKind.HB, SpriteKind.Food, function (sprite, otherSprite) {
   
    sprites.destroy(otherSprite, effects.confetti, 200)
    info.changeScoreBy(-1)
    music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
})
scene.onOverlapTile(SpriteKind.HB, assets.tile`transparency16`, function (sprite, location) {
    if (playerState != "falling" && playerState != "fallingReset") {
        playerState = "falling"
    }
})
let dot: Sprite = null
let y_pos = 0
let x_pos = 0

let isFalling = false
let isHit = false
let y_previous = 0
let x_previous = 0
let wall_dir_previous = ""
let iscolliding = false
let coordY = 0
let coordX = 0
let spd_y = 0
let spd_x = 0
let candy: Sprite = null
let enemy6: Sprite = null
let enemy5: Sprite = null
let enemy4: Sprite = null
let enemy3: Sprite = null
let enemy2: Sprite = null
let enemy1: Sprite = null
let enemy0: Sprite = null
let isoHBground: Sprite = null

let sIdle = false
let stateStart = false
let playerState = ""
let footstepTimr = 0
let hitCooldown = 0
let cooldownTime = 0
let fallingtimr = 0
let canMove = false
let enemygridY = 0
let wall_len = 0
let wallC: string[] = []
let wallY: number[] = []
let wallX: number[] = []
let width = 0
let height = 0
let block: Sprite = null
let wallHB: Sprite = null
let height_adder=0
let collding_dir = ""
// animation booleans
let idleAnimates = false
let y_dis = 0
let x_dis = 0
let iso: Sprite = null
let enemyList: Sprite[] = []
let enemyMinX: number[] = []
let enemyMaxX: number[] = []
let currentLevel=""
canMove = true
fallingtimr = 100
cooldownTime = 30
hitCooldown = cooldownTime
// player state functions
footstepTimr = 60
playerState = "movement"
let detA = 0.5
height = 16
width = 16
y_dis = 28
x_dis = 80
// States
stateStart = true
// starting state for players statemachine
sIdle = true
let idleAni = assets.animation`ani_idle0`
wallC.removeAt(0)
// Game Start///
scene.setBackgroundImage(assets.image`myImage13`)

candy = sprites.create(assets.image`spr_candy`, SpriteKind.UI)
animation.runImageAnimation(
    candy,
    assets.animation`ani_candy`,
    150,
    true
)
candy.setPosition(80, 80)
pauseUntil(() => controller.A.isPressed())

sprites.destroy(candy)

music.play(music.stringPlayable("E D G F B A C5 B ", 150), music.PlaybackMode.InBackground)
//run opening cutscene
game.setDialogCursor(img`
    ........................
    ........................
    .f...................f..
    f2f.....fffffff.....f2f.
    .f2f...f2222222f...f2f..
    f222f.f221111122f.f222f.
    .f222ff211111112ff222f..
    f22222f211222112f22222f.
    .f2222f211222112f22222f.
    .f222ff211111112ff222f..
    f222f.f211222112f.f222f.
    .f2f...f2222222f...f2f..
    f2f.....fffffff.....f2f.
    .f...................f..
    ........................
    ........................
    `)
openingCutscene()

function openingCutscene(){
    // opening "cut scene"
    scene.setBackgroundImage(assets.image`bkg_forest`)

   
    game.setDialogFrame(assets.image`spr_dialogue1`)
/*
    let isoUI = sprites.create(img`
    ...9999999999999999.............
    .99777777777777777799...........
    9777fff77fff77ffff7779..........
    97777f777f7777f77f7779..........
    97777f777ff777f77f7779..........
    97777f7777ff77f77f7779..........
    97777f77777f77f77f7779..........
    9777fff77fff77ffff7779..........
    9777777777777777777779..........
    9777777777777777777779..........
    9777777777777777777779..........
    9777777777777777777779..........
    9777777777777777777779..........
    9777777777777777777779..........
    9777777777777777777779..........
    9777777777777777777779..........
    `, 0)
    isoUI.setPosition(25, 75)
*/
    let cutsceneIso: Sprite = null
    cutsceneIso = sprites.create(assets.image`spr_cutsceneIso`, SpriteKind.UI)
    animation.runImageAnimation(cutsceneIso, assets.animation`ani_cutsceneIso`, 500, true)
    cutsceneIso.setPosition(50, 60)
    
    pause(3000)
    game.showLongText("Iso: I can't believe how many candies I got!", DialogLayout.Bottom)
      
    pause(1000)
    game.showLongText("It must be at least double what I collected last Halloween!", DialogLayout.Bottom)

    
    pause(500)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
    let cutsceneEnemy = sprites.create(img`
        . . . b d d . . . . . . . . . .
        . . b . d d d . f f f f . . . .
        . . . . . d f f e e e f f . . .
        . . . f f f e e 4 4 4 4 4 f . .
        . . f e 4 e 4 4 e 4 4 e 4 4 f .
        . . f 4 4 e 4 4 4 e 4 4 e 4 f .
        . . f 4 4 e 4 4 4 e 4 4 e 4 f .
        . f e 4 4 4 e 4 4 4 e f e 4 f .
        . f e e 4 4 f f 4 4 f 2 f e f .
        . f e 4 e 4 f 2 f 4 f 2 f e f .
        . f e 4 e 4 4 f 2 4 4 e e f . .
        . f e 4 4 e e 5 e e e b b f . .
        . f f e e 5 5 5 5 b b b f . . .
        . . f f f 5 5 5 5 b b f . . . .
        . . . f 5 5 5 5 f 5 5 f f . . .
        . . . . f f f f f 5 5 5 f . . .
    `, SpriteKind.UI)
    cutsceneEnemy.setPosition(-20, 70)
    animation.runImageAnimation(cutsceneEnemy, assets.animation`ani_pumpkinFLarge`, 200, true)
    cutsceneEnemy.setVelocity(50, 0)

    cutsceneEnemy = sprites.create(img`
        . . . b d d . . . . . . . . . .
        . . b . d d d . f f f f . . . .
        . . . . . d f f e e e f f . . .
        . . . f f f e e 4 4 4 4 4 f . .
        . . f e 4 e 4 4 e 4 4 e 4 4 f .
        . . f 4 4 e 4 4 4 e 4 4 e 4 f .
        . . f 4 4 e 4 4 4 e 4 4 e 4 f .
        . f e 4 4 4 e 4 4 4 e f e 4 f .
        . f e e 4 4 f f 4 4 f 2 f e f .
        . f e 4 e 4 f 2 f 4 f 2 f e f .
        . f e 4 e 4 4 f 2 4 4 e e f . .
        . f e 4 4 e e 5 e e e b b f . .
        . f f e e 5 5 5 5 b b b f . . .
        . . f f f 5 5 5 5 b b f . . . .
        . . . f 5 5 5 5 f 5 5 f f . . .
        . . . . f f f f f 5 5 5 f . . .
    `, SpriteKind.UI)
    cutsceneEnemy.setPosition(-50, 70)
    animation.runImageAnimation(cutsceneEnemy, assets.animation`ani_pumpkinFLarge`, 200, true)
    cutsceneEnemy.setVelocity(50, 0)

    cutsceneEnemy = sprites.create(img`
        . . . b d d . . . . . . . . . .
        . . b . d d d . f f f f . . . .
        . . . . . d f f e e e f f . . .
        . . . f f f e e 4 4 4 4 4 f . .
        . . f e 4 e 4 4 e 4 4 e 4 4 f .
        . . f 4 4 e 4 4 4 e 4 4 e 4 f .
        . . f 4 4 e 4 4 4 e 4 4 e 4 f .
        . f e 4 4 4 e 4 4 4 e f e 4 f .
        . f e e 4 4 f f 4 4 f 2 f e f .
        . f e 4 e 4 f 2 f 4 f 2 f e f .
        . f e 4 e 4 4 f 2 4 4 e e f . .
        . f e 4 4 e e 5 e e e b b f . .
        . f f e e 5 5 5 5 b b b f . . .
        . . f f f 5 5 5 5 b b f . . . .
        . . . f 5 5 5 5 f 5 5 f f . . .
        . . . . f f f f f 5 5 5 f . . .
    `, SpriteKind.UI)
    cutsceneEnemy.setPosition(-30, 70)
    animation.runImageAnimation(cutsceneEnemy, assets.animation`ani_pumpkinFLarge`, 200, true)
    cutsceneEnemy.setVelocity(50, 0)

    scene.cameraShake(4, 100)    
    animation.stopAnimation(animation.AnimationTypes.All, cutsceneIso)
    cutsceneIso.setImage(assets.image`spr_isoShock`)
    pause(1500)

    let basket = sprites.create(assets.image`spr_basket`, SpriteKind.UI)
    
    basket.setPosition(50, 60)
    basket.setVelocity(50,0)

    cutsceneIso.setImage(assets.image`spr_isoShock0`)

    
    pause(3000)
    game.showLongText("My treats!", DialogLayout.Bottom)
    animation.runImageAnimation(cutsceneIso, assets.animation`ani_cutsceneFloat`, 500, true)
    cutsceneIso.setVelocity(50,0)
    pause(3000)
    

    sprites.destroyAllSpritesOfKind(SpriteKind.UI)

}

// cutscene over start the game

// start level1
level1()

 let startingX = linearX(48, 20, width / 2)
 let startingY = linearY(48, 20, height / 4) + 4
isoHBground = sprites.create(img`
    b b
    b b
`, SpriteKind.HB)
isoHBground.setPosition(startingX,startingY+5)
iso = sprites.create(assets.image`myImage3`, SpriteKind.Player)
scene.cameraFollowSprite(iso)
iso.setPosition(startingX, startingY)


game.setGameOverPlayable(false, music.melodyPlayable(music.powerDown), false)

//lvl1 diaglog
//game instructions\
pause(100)
game.showLongText("Boo", DialogLayout.Bottom)
game.showLongText("...Hoo", DialogLayout.Bottom)
game.showLongText("All my candy has been scattered!", DialogLayout.Bottom)
game.showLongText("I must get it back!", DialogLayout.Bottom)

game.splash("Collect all the candies","in each level")
game.splash("Use the controller or","WASD to move")
game.splash("Avoid the pumpkin enemies")

game.onUpdateInterval(13, function () {
    if (bossFight){
        info.setScore(bossHP)
        bossAttack()
        if (bossHP <= 0) {
            bossFight = false
        music.stopAllSounds()
            sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
            sprites.destroyAllSpritesOfKind(SpriteKind.EnemyProjectile)
            iso.x=startingX
            iso.y=startingY-32
            iso.setImage(img`
                    . . . . . . 9 9 9 9 . . . . . .
                    . . . . 9 9 1 1 1 1 9 9 . . . .
                    . . . 9 1 1 1 1 1 1 1 1 9 . . .
                    . . . 9 1 1 1 1 1 1 7 1 8 . . .
                    . . . 9 8 8 1 1 7 7 8 8 9 . . .
                    . . 9 1 1 1 8 8 8 8 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 9 1 1 1 1 1 1 9 1 9 . .
                    . . 9 9 1 1 8 1 7 1 1 7 9 9 . .
                    . . . 9 9 7 9 8 7 9 7 9 9 . . .
                    . . . . . 9 . 9 9 . 9 . . . . .
                    . . . . . . . . . . . . . . . .
                `)
            scene.cameraFollowSprite(iso)
            game.showLongText("...", DialogLayout.Bottom)
            game.showLongText("......", DialogLayout.Bottom)
            game.showLongText("I am defeated", DialogLayout.Bottom)
            game.showLongText("All I wanted was some halloween candy, for you see I am stuck in the ground and cannot go trick-or-treating.", DialogLayout.Bottom)

            game.setDialogFrame(assets.image`spr_dialogue1`)

            game.showLongText("If you wanted candy all you had to do was ask!", DialogLayout.Bottom)
            game.showLongText("Would you like to share some of mine?", DialogLayout.Bottom)
            game.setDialogFrame(assets.image`spr_dialogue2`)

            game.showLongText("Really?", DialogLayout.Bottom)
            game.setDialogFrame(assets.image`spr_dialogue1`)

            game.showLongText("Yeah, I have a bunch!", DialogLayout.Bottom)
            game.showLongText(" Just remember it's never right to steal!", DialogLayout.Bottom)
                music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
                

            tiles.setCurrentTilemap(tilemap`tileMap_empty`)

            effects.clouds.endScreenEffect()


            sprites.destroyAllSpritesOfKind(SpriteKind.Boss)
            sprites.destroyAllSpritesOfKind(SpriteKind.Player)
           
            sprites.destroyAllSpritesOfKind(SpriteKind.HB)

            scene.setBackgroundImage(assets.image`bkg_friendship`)
            sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
            let time = (Math.floor(Math.floor(game.runtime() / 1000) / 60) + ":" + Math.floor(game.runtime() / 1000) % 60)


            info.setScore(999)
            effects.confetti.startScreenEffect()
            pause(2000)


            game.setDialogFrame(img`
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
    `)
            sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)

            game.setDialogTextColor(2)
            game.showLongText("Thanks for playing!", DialogLayout.Bottom)
            game.setGameOverMessage(true, "Time:" + time)
            sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)

            game.gameOver(true)
        }

    }
    
    else{
    enemyMovement()
    }
    playerUpdate()


    
})

let bossTimr=30
function bossAttack(){

    bossTimr-=1

    if(bossTimr<=0){
        let projectile2 = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . 2 . . . . . . .
            . . . . . . . 2 2 2 . . . . . .
            . . . . . . 2 c d c 2 . . . . .
            . . . . . . 2 c 5 c 2 . . . . .
            . . . . 2 2 c d 5 d c 2 2 . . .
            . . . 2 c c d 5 5 5 d c c 2 . .
            . . 2 2 d 5 5 5 5 5 5 5 d 2 2 .
            . . . 2 c c d 5 5 5 d c c 2 . .
            . . . . . 2 c d 5 d c 2 2 . . .
            . . . . . . 2 c 5 c 2 . . . . .
            . . . . . . 2 c d c 2 . . . . .
            . . . . . . 2 b d b 2 . . . . .
            . . . . . . . 2 2 2 . . . . . .
            . . . . . . . . 2 . . . . . . .
        `,boss, randint(-50, 50), randint(-25, 50))
        projectile2.setKind(SpriteKind.EnemyProjectile)
        projectile2.lifespan = 3000
        bossTimr = randint(10, 50)
    }

}
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyProjectile, function (sprite, otherSprite) {
    if(playerState!="hit"){
        playerState = "hit"
    }
})

info.onLifeZero(function () {
    info.setLife(2)
    iso.x=startingX
    iso.y=startingY
    info.setScore(levelScore)
    animation.stopAnimation(animation.AnimationTypes.All, iso)
    canMove=false
    playerState="idle"
    iso.setImage(img`
                    . . . . . . 9 9 9 9 . . . . . .
                    . . . . 9 9 1 1 1 1 9 9 . . . .
                    . . . 9 1 1 1 1 1 1 1 1 9 . . .
                    . . . 9 1 1 1 1 1 1 7 1 8 . . .
                    . . . 9 8 8 1 1 7 7 8 8 9 . . .
                    . . 9 1 1 1 8 8 8 8 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 1 1 1 1 1 1 1 1 1 9 . .
                    . . 9 1 9 1 1 1 1 1 1 9 1 9 . .
                    . . 9 9 1 1 8 1 7 1 1 7 9 9 . .
                    . . . 9 9 7 9 8 7 9 7 9 9 . . .
                    . . . . . 9 . 9 9 . 9 . . . . .
                    . . . . . . . . . . . . . . . .
                `)
    game.splash("Out of lives", "Try again")
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    switch (currentLevel) {
        case "Level1":
            makeLevel1Candy()
            break;
        case "Level2":
            makeLevel2Candy()
            break;
        case "Level3":
            makeLevel3Candy()
            break;
        case "NewLevel":
            makeNewLevelCandies()
            break;
        case "Level4":
            info.setScore(2000)
            bossHP=2000

            sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
            sprites.destroyAllSpritesOfKind(SpriteKind.EnemyProjectile)
            break;
        default:
    
    }
    canMove = true

    music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.UntilDone)
    })



function makeLevel1Candy(){
    // make the levels colltibles
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(linearX(22, 16, width / 2) + x_dis, -1 + linearY(22, 16, height / 4) + y_dis + height / 4)
    candy.z = candy.y
    // 2nd candy
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(linearX(32, 26, width / 2) + x_dis, -1 + linearY(32, 26, height / 4) + y_dis + height / 4)
    candy.z = candy.y
    // 3rd candy
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(linearX(32, 1, width / 2) + x_dis, -1 + linearY(32, 1, height / 4) + y_dis + height / 4)
    candy.z = candy.y
    // 4th candy
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(linearX(22, -8, width / 2) + x_dis, -1 + linearY(22, -8, height / 4) + y_dis + height / 4)
    candy.z = candy.y
    // 5th candy
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(linearX(40, -10, width / 2) + x_dis, linearY(40, -10, height / 4) + y_dis + height / 4)
    candy.z = candy.y
}

function makeLevel2Candy(){
    // make the levels colltibles
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(152,286-4)
    candy.z = candy.y
    // 2nd candy
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(304, 194-4)
    candy.z = candy.y
    // 3rd candy
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(232, 118-4)
    candy.z = candy.y
    // 4th candy
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(256, 82-4)
    candy.z = candy.y
    // 5th candy
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(296, 86-4)
    candy.z = candy.y
}

function makeLevel3Candy() {
    // make the levels colltibles
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(320,118)
    candy.z = candy.y
    // 2nd candy
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(216,66)
    candy.z = candy.y
    // 3rd candy
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(96,126)
    candy.z = candy.y

}

function makeNewLevelCandies(){
    // make the levels colltibles
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(360, 246 - 4)
    candy.z = candy.y
    // 2nd candy
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(272, 226 - 4)
    candy.z = candy.y
    // 3rd candy
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(256, 178 - 4)
    candy.z = candy.y
    // 4th candy
    candy = sprites.create(assets.image`spr_candy`, SpriteKind.Food)
    candy.setPosition(200, 126 - 4)
    candy.z = candy.y
}