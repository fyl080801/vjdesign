module.exports = {
  presets: [
    [
      "@vue/cli-plugin-babel/preset",
      {
        useBuiltIns: "entry",
        jsx: {
          injectH: false
        }
      }
    ]
  ],
  plugins: ["transform-vue-jsx"]
};
