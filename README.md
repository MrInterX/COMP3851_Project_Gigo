# 📱 Gig Job Placement App
一个使用 **React Native（Expo）+ Supabase** 开发的跨平台零工兼职匹配移动应用。  

---
# 请使用feature/... 命名分支，VSCode可以生成详细的提交信息
# docs/db-schema.md 是数据库的基本信息
# services/supabaseClient.js 是supabase的密钥

---
# 📘 目录
1. [项目简介](#项目简介)  
2. [核心功能](#核心功能)  
3. [技术栈](#技术栈)  
4. [项目结构](#项目结构)  
5. [环境准备](#环境准备)  
6. [如何运行项目](#如何运行项目)  
7. [开发分工说明（非常重要）](#开发分工说明非常重要)  
8. [每个人详细任务清单（Day1–Day5）](#每个人详细任务清单day1day5)  
9. [Git 协作规则](#git-协作规则)  
10. [数据库设计](#数据库设计)  
11. [注意事项](#注意事项)  
12. [团队与ChatGPT协作规则](#团队与chatgpt协作规则)  
13. [任务看板建议](#任务看板建议)  
14. [每日协作流程](#每日协作流程)  
15. [编码风格指南](#编码风格指南)  
16. [API 数据约定](#api-数据约定)  
17. [Demo 演示流程](#demo-演示流程)

---

# 项目简介
Gig Job Placement App 是一个帮助求职者查找兼职与零工（Gig job）机会的跨平台移动应用。  
用户可以浏览职位列表、查看详情、在线申请并查看申请人数，管理员可通过广告位进行未来变现。

本应用旨在解决：

- 兼职信息分散、匹配度不高  
- 求职流程缺乏实时反馈  
- 求职者无法快速筛选合适岗位  

---

# 核心功能
1. **用户注册 / 登录**  
2. **职位列表（可筛选）**  
3. **职位详情**（包含时薪、地点、描述、招聘人数）  
4. **在线申请（Apply Now）**  
5. **申请人数统计**  
6. **用户 Profile 信息编辑**  
7. **广告占位组件（Ad Banner Placeholder）**

---

# 技术栈

| 分类 | 使用技术 |
|------|----------|
| Mobile App | React Native (Expo) |
| 语言 | JavaScript |
| 后端 / 数据库 | Supabase（PostgreSQL + Auth） |
| UI | React Native Components |
| 导航 | React Navigation |
| 协作 | Git + GitHub |
| 其他 | Prettier、GitLens、ESLint |

---

# 项目结构
以下是项目文件结构示例：

```
/screens
  ├── LoginScreen.js
  ├── RegisterScreen.js
  ├── JobListScreen.js
  ├── JobDetailScreen.js
  ├── ProfileScreen.js
  ├── MyApplicationsScreen.js

/components
  ├── JobCard.js
  ├── CustomButton.js
  ├── InputField.js
  ├── AdBannerPlaceholder.js

/services
  ├── supabaseClient.js
  ├── jobService.js
  ├── applicationService.js
  ├── userService.js

/navigation
  ├── AuthStack.js
  ├── MainTab.js

/assets
/docs

.env.example
README.md
```

---

# 环境准备

### 1. 安装 Node.js  
https://nodejs.org

### 2. 安装 Git  
Mac：  
```bash
xcode-select --install
```

### 3. 安装 VS Code  
https://code.visualstudio.com/

建议安装插件：
- Prettier  
- ESLint  
- GitLens  
- React Native Tools  

### 4. 安装 Expo CLI  
```bash
npm install -g expo-cli
```

### 5. 安装 Expo Go（用于手机运行项目）

### 6. 克隆项目仓库  
```bash
git clone <repo-url>
cd <folder>
```

---

# ▶️ 如何运行项目

```bash
npm install
npx expo start
```

使用手机 Expo Go 扫描二维码运行。

---

# 开发分工说明（非常重要）
为了提高开发效率、减少互相阻塞风险，团队采用 **4 个独立模块** 的分工方式。

---

## 👤 成员 A  
### **模块 A：项目骨架 & Auth & 导航（Navigation & Auth Owner）**

**职责：**
- Expo 项目初始化  
- 配置 React Navigation（AuthStack + MainTab）  
- 初始化 Supabase Client  
- 开发 Login / Register 页面  
- 建立公共组件（Button、InputField）  
- 全局逻辑与框架负责人  

---

## 👤 成员 B  
### **模块 B：职位列表（Job List）+ 筛选 + 广告位（List Owner）**

**职责：**
- JobListScreen 页面  
- 从 jobs 表读取数据  
- JobCard 组件开发  
- 筛选功能（industry / type）  
- 广告占位组件  
- 跳转至 JobDetail  

---

## 👤 成员 C  
### **模块 C：职位详情（Job Detail）+ Apply Now + 我的申请**

**职责：**
- JobDetailScreen  
- Apply Now 按钮逻辑  
- 写入 applications 表  
- 申请人数统计  
- MyApplicationsScreen（用户申请记录页面）  
- applicationService 封装  

---

## 👤 成员 D  
### **模块 D：Supabase 数据库 + Profile 页面 + 数据文档**

**职责：**
- 创建 users / jobs / applications 三张表  
- 插入测试数据  
- ProfileScreen（读取/更新 users 表）  
- userService 封装  
- `/docs/db-schema.md` 文档  
- 字段命名统一管理  

---

# 每个人详细任务清单 (仅供参考)

---

## 👤 成员 A – App 架构 & Auth & Navigation

- 初始化 Expo 项目  
- 建立导航文件结构  
- 创建空页面文件  
- 初始化 supabaseClient  

- 配置 AuthStack + MainTab  
- 登录前后路由流转逻辑  

- LoginScreen  
- RegisterScreen  
- session 管理  

- 公共组件（Button、InputField）  
- 调整导航样式  

- 联调所有页面跳转  
- 全局样式统一  

---

## 👤 成员 B – Job List + 筛选 + 广告位

- 创建 JobListScreen / JobCard / jobService  

- 拉取 jobs 列表并展示  

- 完成 JobCard  
- 列表跳转详情页  

- industry/type 筛选  
- 添加广告占位 Banner  

- JobList 全面测试  
- UI 微调  

---

## 👤 成员 C – Job Detail + Apply + My Applications

- 创建 JobDetailScreen  
- 创建 applicationService  

- JobDetail UI（假数据）  

- applyToJob  
- 获取职位详情（jobs 表）  

- 实现申请人数 count  
- MyApplicationsScreen  

- 全流程测试  
- 修复申请流程相关 bug  

---

## 👤 成员 D – Supabase 数据库 + Profile + 文档

- 创建 users / jobs / applications 表  
- 插入测试数据  
- 初始化 userService  

- 同步字段命名与 API 规则  
- Profile UI（假数据）  

- 读取用户资料（users 表）  
- updateProfile 功能  

- 更新数据库文档  
- 补充测试数据  

- Profile 测试  
- 字段联调与修复  

---

# Git 协作规则

### 🚫 禁止直接 push 到 main  
main 只能包含可运行版本。

### 🟦 每个人必须使用 feature 分支
```
feature/auth
feature/job-list
feature/job-detail
feature/profile
```

### ✔ 协作流程
```bash
git pull
git checkout -b feature/<branch-name>
git add .
git commit -m "feat: xxx"
git push origin feature/<branch-name>
```

提交 PR → 队友审核 → 合并。

---

# 数据库设计

## 1. users 表
| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | uuid | 用户 id（Auth） |
| name | text | 姓名 |
| skills | text | 技能 |
| experience | text | 经验 |
| preferred_industry | text | 偏好行业 |
| created_at | timestamptz | 创建时间 |

---

## 2. jobs 表
| 字段名 | 类型 | 说明 |
|--------|-------|------|
| id | uuid | 职位 id |
| title | text | 标题 |
| industry | text | 行业 |
| job_type | text | 职位类型 |
| hourly_rate | numeric | 时薪 |
| duration | text | 时长 |
| location | text | 地点 |
| description | text | 描述 |
| vacancies | integer | 招聘人数 |
| created_at | timestamptz | 创建时间 |

---

## 3. applications 表
| 字段名 | 类型 | 说明 |
|--------|-------|------|
| id | uuid | 申请 id |
| user_id | uuid | 用户 id |
| job_id | uuid | 职位 id |
| created_at | timestamptz | 申请时间 |

---

# 注意事项
- ❗ **不要上传 Supabase service key**  
- 修改表结构需要同步团队  
- 每次开发前必须 `git pull`  
- 所有错误必须有提示（Alert/Toast）  
- 不要出现白屏  
- UI 不需要漂亮，但必须可用  

---

# 团队与ChatGPT协作规则
1. 使用 ChatGPT 前必须先提供本 README。  
2. ChatGPT 不得更改技术路线（React Native + Supabase）。  
3. ChatGPT 提供的代码必须本地运行后才能提交。  
4. ChatGPT 不得擅自修改数据库字段/表结构。  
5. ChatGPT 必须依据本 README 的文件结构生成代码。  

---

# 编码风格指南
- 函数式组件  
- Hooks: useState / useEffect  
- 组件文件名使用 PascalCase  
- 函数与变量使用 camelCase  
- 使用 Prettier 格式化代码  

---

# API 数据约定

### 获取职位列表
```js
supabase.from('jobs').select('*');
```

### 筛选职位
```js
supabase.from('jobs').select('*').eq('industry', selectedIndustry);
```

### 申请职位
```js
supabase.from('applications').insert([{ user_id, job_id }]);
```

### 获取申请人数
```js
supabase
  .from('applications')
  .select('*', { count: 'exact', head: true })
  .eq('job_id', jobId);
```

---

# Demo 演示流程
1. 注册新用户  
2. 登录  
3. 打开职位列表  
4. 筛选职位  
5. 查看职位详情  
6. 点击 Apply Now  
7. 检查申请人数是否更新  
8. 查看 Profile  

---

# 结束语
本 README 文档包含项目启动、分工、技术路线、数据库结构、协作规范等所有内容，是团队合作的统一标准。  
请团队所有成员严格遵守，以确保项目顺利、高效完成。

