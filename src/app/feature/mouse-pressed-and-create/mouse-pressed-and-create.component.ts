import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import {
  Bodies,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
} from 'matter-js';

@Component({
  selector: 'app-mouse-pressed-and-create',
  templateUrl: './mouse-pressed-and-create.component.html',
  styleUrls: ['./mouse-pressed-and-create.component.scss'],
})
export class MousePressedAndCreateComponent implements AfterViewInit {
  @ViewChild('renderEl') renderEl!: ElementRef;

  engine!: Engine;
  world!: World;
  render!: Render;
  runner!: Runner;

  mousePressed = false;
  dragging = false;
  forceCreateBox = false;

  constructor() {}

  ngAfterViewInit(): void {
    this.setup();
    this.addListener();
    this.addConstraint();
    const groundW = this.render.bounds.max.x - this.render.bounds.min.x;
    const groundX = groundW / 2;
    const groundY = this.render.bounds.max.y - 10 / 2;
    const ground = Bodies.rectangle(groundX, groundY, groundW, 10, {
      isStatic: true,
    });
    World.add(this.world, ground);

    Runner.run(this.runner, this.engine);
    Render.run(this.render);
  }

  setup() {
    this.engine = Engine.create();
    this.world = this.engine.world;
    this.render = Render.create({
      element: this.renderEl.nativeElement,
      engine: this.engine,
      options: {
        width: 920,
        height: 600,
        wireframes: true,
      },
    });
    this.runner = Runner.create();
  }

  addListener(): void {
    // this.renderEl.nativeElement.addEventListener(
    //   'click',
    //   (evt: PointerEvent) => {
    //     if (!this.dragging) {
    //       this.createBox(evt.offsetX, evt.offsetY, 10, 10);
    //     }
    //   }
    // );
  }

  addConstraint(): void {
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
    Events.on(constraint, 'mousedown', (evt) => {
      this.mousePressed = true;
      if (!this.dragging) {
        this.forceCreateBox = true;
      }
    });
    Events.on(constraint, 'mouseup', (evt: any) => {
      this.dragging = false;
      this.mousePressed = false;
      this.forceCreateBox = false;
    });
    Events.on(constraint, 'mousemove', (evt: any) => {
      if (this.mousePressed && (!this.dragging || this.forceCreateBox)) {
        this.createBox(evt.mouse.position.x, evt.mouse.position.y, 10, 10);
      }
    });
    Events.on(constraint, 'startdrag', (evt) => {
      this.dragging = true;
    });
    Events.on(constraint, 'enddrag', (evt) => {});

    World.add(this.world, constraint);
  }

  createBox(x: number, y: number, w: number, h: number) {
    const box = Bodies.rectangle(x, y, w, h, {
      // type: 'new',
    });
    World.add(this.world, box);
  }
}
