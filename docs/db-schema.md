# Database Schema (Supabase) — Gigo App (MVP)

本数据库结构为 Gigo App 的 **MVP 精简版**，仅包含完成核心功能所需字段。  
所有表名、字段命名、类型均与当前 Supabase 实际建表一致，用于团队同步与前后端 API 对接。

---

## 1. users

**用途**：保存求职者基础 Profile 信息，用于 ProfileScreen 的读写。

| Field      | Type        | Required | Default           | Description                      |
| ---------- | ----------- | -------- | ----------------- | -------------------------------- |
| id         | uuid        | Yes (PK) | gen_random_uuid() | 与 Supabase Auth 的 user.id 一致 |
| full_name  | text        | Yes      | -                 | 用户姓名                         |
| location   | text        | No       | -                 | 用户所在区域/城市                |
| about_me   | text        | No       | -                 | 自我介绍                         |
| skills     | text        | No       | -                 | 技能（简单文本/逗号分隔）        |
| created_at | timestamptz | Yes      | now()             | 资料创建时间                     |

**Notes**

- Profile 采用基础功能：只做输入/保存上述字段。
- 首次登录若 users 表无记录，前端使用 upsert 自动创建。

---

## 2. jobs

**用途**：职位数据源，用于 JobList、JobDetail、Filter（基础筛选）、Saved Jobs 页面展示。

| Field        | Type        | Required | Default           | Description                     |
| ------------ | ----------- | -------- | ----------------- | ------------------------------- |
| id           | uuid        | Yes (PK) | gen_random_uuid() | 职位主键                        |
| title        | text        | Yes      | -                 | 职位名称                        |
| company      | text        | Yes      | -                 | 公司/雇主名称                   |
| location     | text        | Yes      | -                 | 工作地点（文本）                |
| category     | text        | Yes      | -                 | 行业分类（一级筛选）            |
| job_type     | text        | Yes      | -                 | 职位类型（Part-time/Full-time） |
| salary_min   | numeric     | Yes      | -                 | 最低薪资                        |
| salary_unit  | text        | Yes      | -                 | 薪资单位（hour/month）          |
| posted_at    | timestamptz | Yes      | now()             | 发布时间                        |
| description  | text        | Yes      | -                 | 职位描述                        |
| requirements | text        | No       | -                 | 任职要求（多行/列表文本）       |
| logo_url     | text        | No       | -                 | 公司 logo 图片 URL（可空）      |

**Notes**

- Filter 只实现基础筛选：`category` + `job_type`（MVP 优先完成核心功能）。
- `requirements` 以多行 text 保存（例如 `- xxx\n- xxx`）。

---

## 3. applications

**用途**：保存用户申请记录，对应 Apply Now 核心功能。

| Field      | Type        | Required | Default           | Description                      |
| ---------- | ----------- | -------- | ----------------- | -------------------------------- |
| id         | uuid        | Yes (PK) | gen_random_uuid() | 申请记录主键                     |
| user_id    | uuid        | Yes      | -                 | 申请者 id（users.id / auth.uid） |
| job_id     | uuid        | Yes      | -                 | 被申请的职位 id（jobs.id）       |
| status     | text        | Yes      | 'applied'         | 申请状态（MVP 只用 applied）     |
| created_at | timestamptz | Yes      | now()             | 申请时间                         |

**Notes**

- MVP 阶段无雇主端，因此不做多状态流转。
- 后续扩展可加入：reviewed / accepted / rejected。

---

## 4. saved_jobs

**用途**：保存用户收藏岗位记录，用于 Saved Jobs 页面。

| Field      | Type        | Required | Default           | Description                      |
| ---------- | ----------- | -------- | ----------------- | -------------------------------- |
| id         | uuid        | Yes (PK) | gen_random_uuid() | 收藏记录主键                     |
| user_id    | uuid        | Yes      | -                 | 收藏者 id（users.id / auth.uid） |
| job_id     | uuid        | Yes      | -                 | 被收藏职位 id（jobs.id）         |
| created_at | timestamptz | Yes      | now()             | 收藏时间                         |

**Notes**

- Saved Jobs 为核心功能之一（UI 已包含收藏页）。
- 收藏关系为多对多：一个用户可收藏多个职位。

---

## Relationships (ER Summary)

- **users (1) —— (N) applications**  
  applications.user_id → users.id

- **jobs (1) —— (N) applications**  
  applications.job_id → jobs.id

- **users (1) —— (N) saved_jobs**  
  saved_jobs.user_id → users.id

- **jobs (1) —— (N) saved_jobs**  
  saved_jobs.job_id → jobs.id

---

## API Naming Rules (Team Convention)

前后端交互字段必须 **严格按表字段命名**，禁止自创字段。

- 表名：全小写 + 下划线

  - users / jobs / applications / saved_jobs

- 字段名：全小写 + 下划线

  - full_name / job_type / salary_min / posted_at / user_id / job_id

- 数据类型要求：
  - uuid 字段必须传 uuid 字符串
  - timestamptz 按 ISO 或 YYYY-MM-DD HH:mm:ss
  - numeric 薪资字段传数字

---

## Test Data Status

- users：已导入 users.csv（5 条示例用户）
- jobs：已导入 jobs.csv（10 条示例职位）
- applications：空表（后续 Apply 流程自动写入）
- saved_jobs：空表（后续收藏功能自动写入）

---

如需扩展字段或新增表，必须在此文档中更新后再通知全组同步。
