## Ddvdd的个人博客

### 技术栈

```
react + redux + react-router + ES6/7 + webpack + express
```

### 演示地址
暂无，后续申请完云服务器之后补上

## Usage
暂无
### 安装
```
git clone https://github.com/ddvdd008/ddvdd-blog.git

cd ddvdd-blog/blog

npm install
```

#### 开发模式：
```
webpack --config .\dll.config.dev.js

npm run dev
```

#### 产品模式：
```
webpack --config .\dll.config.prod.js

npm run build
```

在public/index.html中引入正确的`bundle.js`和`lib.js`。
