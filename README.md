# Vue Json Design

基于 [vjform](https://github.com/fyl080801/vjform) 的 Vue 界面可视化设计器

示例请看 [demo](https://fyl080801_admin.gitee.io/vjdesign/)

> 使用 [jformer](https://gitee.com/fyl080801_admin/jformer) 组件可直接用编辑器元数据中的 json 定义呈现功能
> 如果使用 [vjform](https://github.com/fyl080801/vjform) 呈现功能，则需要在 vjform 中引用 [表达式支持库](https://github.com/fyl080801/jpresent-transform-expression)

```javascript
import vjform from 'vjform'
import expression from 'jpresent-transform-expression'

vjform.use(expression)
```

![截图](https://tva1.sinaimg.cn/large/0081Kckwly1gk1t04rlxqj31ns0u0alu.jpg)

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
- 支持任何 html 元素和 vue 项目中引用的组件
- 支持数据关联和交互行为的编辑
- 通过 json 格式数据就可扩展编辑器支持的组件和属性
- 组件在设计器上呈现形式和属性编辑器支持二次开发

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
