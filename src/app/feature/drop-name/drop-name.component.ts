import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import { Bodies, Body, Composites, Engine, Mouse, MouseConstraint, Render, Runner, World } from 'matter-js'

@Component({
  selector: 'app-drop-name',
  templateUrl: './drop-name.component.html',
  styleUrls: ['./drop-name.component.scss']
})
export class DropNameComponent implements AfterViewInit {

  @ViewChild('dropName') dropName!: ElementRef;

  title = 'angular-matter-js';

  engine!: Engine;
  world!: World;
  render!: Render;

  nameBlock = [
    [7, 8, 9, 10, 'A', 13, 14, 15, 16, 17, 'R', 20, 26, 'V', 28, 29, 30, 31, 32, 'I', 34, 35, 39, 'N'],
    [6, 11, 'A', 13, 18, 'R', 20, 26, 'V', 30, 'I', 34, 35, 36, 39, 'N'],
    [6, 11, 'A', 13, 17, 18, 'R', 20, 26, 'V', 30, 'I', 34, 36, 37, 39, 'N'],
    [6, 7, 8, 9, 10, 11, 'A', 13, 16, 17, 'R', 20, 26, 'V', 30, 'I', 34, 37, 38, 39, 'N'],
    [6, 11, 'A', 13, 15, 16, 'R', 21, 25, 'V', 30, 'I', 34, 38, 39, 'N'],
    [6, 11, 'A', 13, 16, 17, 'R', 22, 24, 'V', 30, 'I', 34, 39, 'N'],
    [6, 11, 'A', 13, 17, 18, 'R', 23, 'V', 28, 29, 30, 31, 32, 'I', 34, 39, 'N'],
  ];
  constructor () {

  }

  ngAfterViewInit(): void {
    this.engine = Engine.create();
    this.world = this.engine.world;
    this.render = Render.create({
      element: this.dropName.nativeElement,
      engine: this.engine,
      options: {
        width: 920,
        height: 600,
        wireframes: false,
      }
    })

    const wallOption = {
      render: {
        fillStyle: 'transparent',
        strokeStyle: '#FBFBFB'
      },
      isStatic: true
    }
    const topWall = Bodies.rectangle(450, 0, 650, 30, wallOption)
    const bottomWall = Bodies.rectangle(450, 500, 600, 30, wallOption)
    const rightWall = Bodies.rectangle(880, 10, 30, 420, wallOption)
    const leftWall = Bodies.rectangle(90, 10, 30, 420, wallOption)

    const composite = Composites.stack(125, 15, 45, 7, 0, 0, (x: any, y: any) => {
      const [isStatic, color] = this.staticAndColor(x, y)
      const block = Bodies.rectangle(x, y, 15, 15, {
        render: {
          fillStyle: color[~~(Math.random() * 2)],
          strokeStyle: '#fff'
        },
        frictionAir: 0.03
      })

      // 800ms 後設定該 block 是否停住
      setTimeout(() => {
        Body.setStatic(block, isStatic)
      }, 700)

      setTimeout(() => {
        Body.set(block, { frictionAir: 0 });
      }, 600);
      setTimeout(() => {
        if (!isStatic) {
          Body.setVelocity(block, {x: 2, y: -10});
        }
      }, 1000);

      return block
    })

    World.add(this.world, [composite, topWall, bottomWall, rightWall, leftWall])


    const mouse = Mouse.create(this.render.canvas)
    const constraint = MouseConstraint.create(this.engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.5,
        render: {
          visible: false
        }
      }
    })

    World.add(this.world, constraint)
    const runner = Runner.create()

    Runner.run(runner, this.engine)
    Render.run(this.render)

  }

  staticAndColor(x: any, y: any): any[] {
    const indexX = (x - 125) / 15
    const indexY = (y - 15) / 15
    const block = this.nameBlock[indexY]
    if (block && block.indexOf(indexX) !== -1) {
      return [true, ['#229A3B', '#196126']]
    }
    return [false, ['#EBEDEF', '#C5E48B']]
  }

}
