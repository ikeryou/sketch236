import { Mouse } from "../core/mouse";
import { MyDisplay } from "../core/myDisplay";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _text:HTMLTextAreaElement | undefined;
  private _str:Array<string> = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣'];

  constructor(opt:any) {
    super(opt)

    this._text = document.createElement('textarea');
    this.getEl().append(this._text);

    let txt = '';
    const num = 200;
    for(let i = 0; i < num; i++) {
      txt += this._str[~~(this._c / 10 + ~~(i / 10)) % this._str.length];
    }
    this._text.value = txt;

    this._resize();
  }


  protected _update(): void {
    super._update();

    if(this._text != undefined) {
      const mx = Mouse.instance.normal.x;
      const my = Mouse.instance.normal.y;

      // const rad = Util.instance.radian(this._c * 5);
      this._text.rows = ~~(Util.instance.map(my, 1, 50, -1, 1));
      this._text.cols = ~~(Util.instance.map(mx, 1, 100, -1, 1));
      // this._text.rows = ~~(Util.instance.map(Math.sin(rad), 1, 20, -1, 1));
      // this._text.cols = ~~(Util.instance.map(Math.cos(rad), 1, 50, -1, 1));

      if(this._c % 10 == 0) {
        let txt = '';
        const num = this._text.rows * this._text.cols;
        for(let i = 0; i < num; i++) {
          txt += this._str[~~(this._c + ~~(i / this._text.cols)) % this._str.length];
          if(i != 0 && i % this._text.cols == 0) txt += '\n'
        }
        this._text.value = txt;
      }
    }
  }
}