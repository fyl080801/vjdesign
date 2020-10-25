# Vue Json Design

基于 [vjform](https://github.com/fyl080801/vjform)的 Vue 界面可视化设计器

示例请看 [demo](https://fyl080801_admin.gitee.io/vjdesign-demo)

> 元数据的 JSON 定义可直接传给 [vjform](https://github.com/fyl080801/vjform) 组件的相应属性实现功能

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk1t04rlxqj31ns0u0alu.jpg)

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
- 支持数据关联和交互行为的编辑
- 组件、组件属性、属性编辑器可扩展实现更多更丰富的编辑支持

## 依赖

### vjform 以及相关库

- vjform

可视化布局基于 vjform 扩展，基于 `2.1.0` 版本

- jpresent-transform-modern

基于属性名的简易转换模板 `"$:text": "model.text1"`

- jpresent-transform-expression

为了适应类似 excel 的习惯，将属性值是表达式的情况下直接作为转换来处理 `"text": "$:model.text"`

### Lodash

使用了 `get` `set` `forEach` 等 API

### Vue

基于 `v2.5.9` 测试，理论上支持高于 `v2.4.0` 版本

### vuedraggable

实现拖拽布局

### codemirror

实现直接编辑配置数据

## 说明

数据源的编辑界面还没实现，现在完全是在挤时间做这个，所以先这样了回头再补上。。。
