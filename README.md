# birthday-surprise-xiaoxiao

已新增 **微信小程序版本**（恋爱树洞）。

## 目录说明

- `miniprogram/`：微信小程序源码
- `project.config.json`：微信开发者工具项目配置
- `index.html`：之前的网页版本（可选保留）

## 如何运行小程序

1. 打开微信开发者工具。
2. 选择“导入项目”，项目目录选仓库根目录。
3. `AppID` 可先用测试号（当前配置为 `touristappid`）。
4. 导入后编译即可看到页面：
   - 左侧：记录美好回忆
   - 右侧：诉说对方不满

## 数据存储

- 回忆：`love-tree-hole-memories`
- 诉说：`love-tree-hole-complaints`

以上都保存在小程序本地缓存（`wx.setStorageSync`）。
