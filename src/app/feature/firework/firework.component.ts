import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  Bodies,
  Body,
  Common,
  Composites,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
} from 'matter-js';

@Component({
  selector: 'app-firework',
  templateUrl: './firework.component.html',
  styleUrls: ['./firework.component.scss'],
})
export class FireworkComponent {
  @ViewChild('worldEl') worldEl!: ElementRef;

  engine!: Engine;
  world!: World;
  render!: Render;
  runner!: Runner;

  ngAfterViewInit() {
    this.setup();
    this.setMouseConstraint();

    Runner.run(this.runner, this.engine);
    Render.run(this.render);
  }

  setup() {
    this.engine = Engine.create();
    this.world = this.engine.world;
    this.render = Render.create({
      engine: this.engine,
      element: this.worldEl.nativeElement,
      options: {
        width: 920,
        height: 600,
        wireframes: false,
      },
    });
    this.runner = Runner.create();
  }

  setMouseConstraint(): void {
    const mouse = Mouse.create(this.render.canvas);
    const constraint = MouseConstraint.create(this.engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.5,
        render: {
          visible: false,
        },
      },
    });

    Events.on(constraint, 'mouseup', (evt: any) => {
      const x = evt.mouse.position.x;
      const y = evt.mouse.position.y;

      this.fire(x, y);

      // this.explode(x, y);
    });

    World.add(this.world, constraint);
  }

  fire(x: number, y: number): void {
    const fire = Bodies.circle(x, y, 2, {
      frictionAir: 0.1,
    });
    World.add(this.world, fire);
    Body.setVelocity(fire, { x: 0, y: -35 });

    setTimeout(() => {
      this.explode(fire.position.x, fire.position.y);
      World.remove(this.world, fire);
    }, 200);
  }

  explode(x: number, y: number): void {
    let particles = 30;
    while (particles-- > 0) {
      const size = Common.random(1, 3);
      const ash = Bodies.circle(x, y, size, {
        mass: 0,
        frictionAir: 0.02,
        isSensor: false,
        render: {
          fillStyle: this.randomColor(),
        },
      });
      World.add(this.world, ash);
      let velX = Common.random(0, 4);
      let velY = Common.random(0, 4);
      velX = Boolean(Math.round(Common.random())) ? velX : velX * -1;
      velY = Boolean(Math.round(Common.random(0, 0.7))) ? velY : velY * -1;

      Body.setVelocity(ash, { x: velX, y: velY });
      this.decreaseScaleAndFadeOut(ash);
    }
  }

  decreaseScaleAndFadeOut(body: Body) {
    setTimeout(() => {
      body.render.opacity = (body.render.opacity ?? 1) - 0.15;
      Body.scale(body, 0.85, 0.85);
      if (body.render.opacity <= 0.1) {
        World.remove(this.world, body);
      } else {
        this.decreaseScaleAndFadeOut(body);
      }
    }, 200); //400
  }

  explode1(x: number, y: number): void {
    const innerMinX = -4;
    const minAshCount = 9;
    const turns = 3;
    for (let turn = 1; turn <= turns; turn++) {
      const color = this.randomColor();
      const minX = turn * innerMinX;
      const count = turn * minAshCount + 1;
      const intervalX = (Math.abs(minX) * 2) / count;
      this.ash(x, y, minX, minX, 1, color);
      for (let i = 1; i < count; i++) {
        const vX = minX + i * intervalX;
        this.ash(x, y, vX, minX, 1, color);
        this.ash(x, y, vX, minX, -1, color);
      }
      this.ash(x, y, minX + count * intervalX, minX, 1, color);
    }
  }

  ash(
    x: number,
    y: number,
    vX: number,
    r: number,
    ratio: number,
    fillStyle: string
  ): void {
    const ash = Bodies.circle(x, y, 2, {
      frictionAir: 0.1,
      render: {
        fillStyle: fillStyle,
      },
      collisionFilter: {
        group: -1,
        category: 2,
        mask: 0,
      },
    });
    World.add(this.world, ash);

    const vY = ratio * Math.sqrt(r * r - vX * vX);
    // console.log(vX, ratio, r, vY);
    Body.setVelocity(ash, { x: vX, y: vY });
    this.fadeOut(ash, 1500, 100, 1 / (1500 / 100));
    // setTimeout(() => {
    //   Body.setStatic(ash, true);
    // }, 1000);
  }

  fadeOut(
    body: Body,
    countdownMS: number,
    interval: number,
    opacityInterval: number
  ): void {
    const opacity = (body.render.opacity ?? 1) - opacityInterval;
    body.render.opacity = opacity >= 0 ? opacity : 0;
    if (countdownMS > 0) {
      setTimeout(() => {
        this.fadeOut(body, countdownMS - interval, interval, opacityInterval);
      }, interval);
    } else {
      World.remove(this.world, body);
    }
  }

  randomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}
