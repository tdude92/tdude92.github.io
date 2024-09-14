interface RandomVariable {
  getFloat(): number;
  getInteger(): number;
}

export class UniformRandomVariable implements RandomVariable {
  constructor(min: number, max: number) {
    // all inclusive
    this.min = min;
    this.max = max;
  }

  getFloat() {
    return Math.random() * (this.max - this.min) + this.min;
  }

  getInteger() {
    return Math.round(this.getFloat());
  }

  min: number;
  max: number;
}

export class NormalRandomVariable implements RandomVariable {
  constructor(mean: number, stddev: number) {
    this.mean = mean;
    this.stddev = stddev;
  }

  mean: number;
  stddev: number;

  getFloat() {
    return NormalRandomVariable.getStdNormalFloat() * this.stddev + this.mean;
  }

  getInteger() {
    return Math.round(this.getFloat());
  }

  // https://stackoverflow.com/a/49434653
  private static getStdNormalFloat(): number {
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return NormalRandomVariable.getStdNormalFloat(); // resample between 0 and 1
    return num;
  }
}
