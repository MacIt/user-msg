# 用户消息接口服务

## 启动

1. 启动PG 
   
`sh ./start_db.sh`

2. 初始化数据库 
   
`cnpm install && node utils/init.js`

3. 启动server 
   
`npm start`

## 测试

`node test/msg.js`

## API

API请启动后参见[API doc](http://localhost:8080/api/static/index.html)

## Todo

1. 增加JWT验证
   
2. 注意：`/user/messages`接口，若direction=latest则timeOffset必须提供。默认direction为normal。该接口中`timeOffset`对于两种情况并无不同，如果需求理解有偏差，请指正。