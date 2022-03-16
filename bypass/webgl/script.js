const config = {
  random: {
    value() {
      return Math.random();
    },
    item(e) {
      const rand = e.length * config.random.value();
      return e[Math.floor(rand)];
    },
    array(e) {
      const rand = config.random.item(e);
      return new Int32Array([rand, rand]);
    },
    items(e, n) {
      let { length } = e;
      const result = new Array(n);
      const taken = new Array(length);
      if (n > length) n = length;
      while (n--) {
        const i = Math.floor(config.random.value() * length);
        result[n] = e[i in taken ? taken[i] : i];
        taken[i] = --length in taken ? taken[length] : length;
      }
      return result;
    },
  },

  spoof: {
    webgl: {
      parameter(target) {
        const { getParameter } = target.prototype;

        Object.defineProperty(target.prototype, "getParameter", {
          value() {
            const float32array = new Float32Array([1, 8192]);
            //
            if (arguments[0] === 37445) {
              return "%VENDOR%";
            }
            // UNMASKED_RENDERER_WEBGL
            if (arguments[0] === 37446) {
              return "%RENDERER%";
            }
            if (arguments[0] === 3415) return 0;
            if (arguments[0] === 3414) return 24;
            if (arguments[0] === 35661) {
              return config.random.items([128, 192, 256]);
            }
            if (arguments[0] === 3386) {
              return config.random.array([8192, 16384, 32768]);
            }
            if (arguments[0] === 36349 || arguments[0] === 36347) {
              return config.random.item([4096, 8192]);
            }
            if (arguments[0] === 34047 || arguments[0] === 34921) {
              return config.random.items([2, 4, 8, 16]);
            }
            if (
              arguments[0] === 7937 ||
              arguments[0] === 33901 ||
              arguments[0] === 33902
            ) {
              return float32array;
            }
            if (
              arguments[0] === 34930 ||
              arguments[0] === 36348 ||
              arguments[0] === 35660
            ) {
              return config.random.item([16, 32, 64]);
            }
            if (
              arguments[0] === 34076 ||
              arguments[0] === 34024 ||
              arguments[0] === 3379
            ) {
              return config.random.item([16384, 32768]);
            }
            if (
              arguments[0] === 3413 ||
              arguments[0] === 3412 ||
              arguments[0] === 3411 ||
              arguments[0] === 3410 ||
              arguments[0] === 34852
            ) {
              return config.random.item([2, 4, 8, 16]);
            }

            return getParameter.apply(this, arguments);
          },
        });
      },
    },
  },
};
//
config.spoof.webgl.parameter(WebGLRenderingContext);
config.spoof.webgl.parameter(WebGL2RenderingContext);
