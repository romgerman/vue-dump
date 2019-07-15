var mixin = {
  created() {
    let hook = this.$options.dataFetch;
    let render = this.$options.render.bind(this);
    let isRendering = false;

    this.$options.render = function(createElement, context) {
      if (isRendering) return render(createElement, context);
      else return null;
    };

    if (typeof hook === "function") {
      hook.call(this).then(() => {
        isRendering = true;
        this.$forceUpdate();
      });
    }
  }
};

export default mixin;