# Vue JSON Design

[vjform](https://github.com/fyl080801/vjform)的 Vue 界面可视化设计器

> 元数据的 JSON 定义可直接传给 [vjform](https://github.com/fyl080801/vjform) 组件的相应属性实现功能

![](https://tva1.sinaimg.cn/large/00831rSTly1gcz3bpc8yij31f00u0154.jpg)

![](https://tva1.sinaimg.cn/large/00831rSTly1gcz3bt0dd1j31f00u0gup.jpg)

## Getting Start

克隆项目，执行

```bash
npm install
```

之后

```bash
npm run dev
```

## 特性

- 可视化拖拽布局
- 支持数据关联和交互行为的可视化编辑
- 支持扩展组件、组件属性、属性编辑器

## 依赖

### vjform

可视化布局基于 vjform 扩展

### Lodash

使用了 `get` `set` `forEach` 等 API

### Vue

基于 `v2.5.9` 测试，理论上支持高于 `v2.4.0` 版本

### vuedraggable

实现拖拽布局

### vue-json-viewer

预览和复制设置定义的元数据
