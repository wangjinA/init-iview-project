/*
 * @Author: 迢迢
 * @Date: 2021-03-10 10:56:08
 * @LastEditors: 迢迢
 * @LastEditTime: 2021-03-10 10:57:23
 * @Description: node hy-build.js；自动生成nginx配置与dockerfile；需要配合serverManager使用
 */
const config = {
  listen: 50024, // 部署的监听端口
  publicPath: '/shantouxhf', // 部署的路径
  exec: 'npm run company', // 打包命令
  maintainer: 'wangjingz', // 维护人员
  maintainerEmail: 'wangjingz@hiynn.com', // 维护人员邮箱
  defaultConf: 'default.conf', // nginx 配置文件名称
  Dockerfile: 'Dockerfile', // Dockerfile 配置文件名称
}

const { proxyServer } = require('./src/axios/serverManager')
var exec = require('child_process').exec;
const fs = require('fs')
let proxyList = ''
Object.keys(proxyServer).forEach(key => {
  let value = proxyServer[key]
  // 去除最后一个斜杠/
  if (value.substr(-1) === '/') {
    value = value.substr(0, value.length - 1)
  }
  proxyList += `
    location ${config.publicPath}/${key}/ {
      proxy_pass ${value}/;
    }
  `
})
const default_conf = `
  # 公司部署nginx配置
  server {
    listen       ${config.listen};
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html/;
        index  index.html;
        try_files $uri $uri/ /index.html;
    }

    ${proxyList}
  }

`

fs.writeFile(`./${config.defaultConf}`, default_conf, error => {
  if (error) {
    console.log(`${config.defaultConf} 配置失败`)
    console.error(error);
  } else {
    console.log(`${config.defaultConf} 配置成功`)
  }
})

console.log(default_conf);

const Dockerfile = `
  #公司
  FROM 10.44.52.24/library/nginx-hy:1.17.4

  MAINTAINER ${config.maintainer} ${config.maintainerEmail}

  #将dist文件中的内容复制到/usr/share/nginx/html/这个目录下
  COPY dist/ /usr/share/nginx/html/${config.publicPath}

  #用本地的default.conf配置来替换nginx镜像里的默认配置
  COPY default.conf /etc/nginx/conf.d/default.conf

  EXPOSE ${config.listen}

`
fs.writeFile(`./${config.Dockerfile}`, Dockerfile, error => {
  if (error) {
    console.log(`${config.Dockerfile} 配置失败`)
    console.error(error);
  } else {
    console.log(`${config.Dockerfile} 配置成功`)
  }
})

console.log(Dockerfile);

exec(config.exec, function (error, stdout, stderr) {
  if (error) {
    console.error('error: ' + error);
    return;
  }
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + typeof stderr);
});