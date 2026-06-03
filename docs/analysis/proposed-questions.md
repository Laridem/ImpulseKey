# Proposed New Questions for IMPULSE KEYS

## Question A5 - Signal vs Solution

**Dimension:** A (Signal vs Solution)

**Scenario (English):**
During a sprint demo, a stakeholder says: "Can we add a feature to export this data to Excel?"

**Scenario (Chinese):**
在 Sprint Demo 时，stakeholder 说："能不能加个导出到 Excel 的功能？"

---

### Option A - Signal (2 points)
**English:**
Ask: What decisions do users need to make with this data? How will they use the export? What happens after export?

**Chinese:**
问：用户需要用这个数据做什么决策？导出后怎么用？导出后的流程是什么？

**Humor (English):**
You're not saying no. You're doing requirement archaeology before someone builds a temple.

**Humor (Chinese):**
你不是在说不。你在做需求考古，避免建一座没人拜的庙。

---

### Option B - Balanced (1-1)
**English:**
Explore the use case while checking if existing export formats (CSV, PDF) or APIs can already solve this.

**Chinese:**
探索使用场景，同时检查现有导出格式（CSV、PDF）或 API 能否已经解决。

**Humor (English):**
User needs meet existing features. Usually someone forgot we already have it.

**Humor (Chinese):**
用户需求遇见现有功能。通常是有人忘了我们已经有了。

---

### Option C - Solution (2 points)
**English:**
Check if the UI5 Spreadsheet Export library supports the current table format and estimate implementation effort.

**Chinese:**
检查 UI5 Spreadsheet Export 库是否支持当前表格格式，评估实现工作量。

**Humor (English):**
The answer is always "yes, but it'll break on tables with more than 10,000 rows."

**Humor (Chinese):**
答案永远是"可以，但是超过 10,000 行就会炸。"

---

## Question B5 - Human vs Machine

**Dimension:** B (Human vs Machine)

**Scenario (English):**
A developer asks: "Should this confirmation message say 'Operation completed successfully' or show the transaction ID?"

**Scenario (Chinese):**
开发问："确认消息应该显示'操作成功'还是显示 transaction ID？"

---

### Option A - Human (2 points)
**English:**
Show a message the user understands: "Your request was submitted. You'll receive an email when it's processed."

**Chinese:**
显示用户能理解的消息："你的请求已提交。处理完成后会收到邮件通知。"

**Humor (English):**
Transaction IDs are for logs, not for humans trying to finish their work.

**Humor (Chinese):**
Transaction ID 是给日志看的，不是给赶着干活的人看的。

---

### Option B - Balanced (1-1)
**English:**
Show user-friendly confirmation with transaction ID available via "Show details" for power users and support debugging.

**Chinese:**
显示友好确认消息，同时提供"显示详情"让高级用户和技术支持查看 transaction ID。

**Humor (English):**
Best of both worlds: normal people see "success", paranoid people see proof.

**Humor (Chinese):**
两全其美：普通人看到"成功"，焦虑的人看到证据。

---

### Option C - Machine (2 points)
**English:**
Return standardized response with transaction ID, timestamp, and status code for downstream system integration.

**Chinese:**
返回标准化响应，包含 transaction ID、时间戳和状态码，用于下游系统对接。

**Humor (English):**
If the API returns HTTP 200, why do humans need to know it succeeded?

**Humor (Chinese):**
如果 API 返回 200，人类为什么需要知道它成功了？

---

## Question C5 - Explore vs Align

**Dimension:** C (Explore vs Align)

**Scenario (English):**
Your team prototyped a drag-and-drop workflow builder, but Fiori guidelines recommend a form-based approach.

**Scenario (Chinese):**
你的团队做了一个拖拽式流程构建器的 prototype，但 Fiori 指南推荐表单式的方式。

---

### Option A - Explore (2 points)
**English:**
User test both approaches. If drag-and-drop significantly improves task completion, document the case and propose a pattern.

**Chinese:**
用户测试两种方式。如果拖拽明显提升任务完成率，记录案例并提出新模式。

**Humor (English):**
Guidelines are great until users vote with their cursor.

**Humor (Chinese):**
指南很棒，直到用户用鼠标投票。

---

### Option B - Balanced (1-1)
**English:**
Prototype both to see which works better, but ensure drag-and-drop uses Fiori interaction patterns if we choose it.

**Chinese:**
两种都 prototype 看哪个更好，但如果选拖拽，确保使用 Fiori 交互模式。

**Humor (English):**
Innovation within constraints is still innovation. Just more paperwork.

**Humor (Chinese):**
约束内的创新也是创新。只是文档多点。

---

### Option C - Align (2 points)
**English:**
Follow Fiori guidelines and use the form-based pattern. Guidelines exist because someone tested this already.

**Chinese:**
遵循 Fiori 指南，使用表单式模式。指南的存在是因为已经有人测过了。

**Humor (English):**
Design systems exist so we don't reinvent the wheel 47 times per quarter.

**Humor (Chinese):**
Design system 的存在是为了让我们不用每季度重复造 47 次轮子。

---

## Question D5 - Spark vs Stabilize

**Dimension:** D (Spark vs Stabilize)

**Scenario (English):**
Your feature is ready for release, but there's no time to write end-to-end tests. The PM says "ship now, test later."

**Scenario (Chinese):**
你的功能可以发布了，但没时间写端到端测试。PM 说"先上线，后面再测。"

---

### Option A - Spark (2 points)
**English:**
Ship with manual smoke testing. Real users will find issues faster than writing tests.

**Chinese:**
手动冒烟测试后上线。真实用户会比写测试更快发现问题。

**Humor (English):**
Production is the best test environment. Users are unpaid QA.

**Humor (Chinese):**
生产环境是最好的测试环境。用户是不拿工资的 QA。

---

### Option B - Balanced (1-1)
**English:**
Ship the feature behind a feature flag, monitor closely, and write tests for the next sprint.

**Chinese:**
用 feature flag 上线，密切监控，下个 sprint 补测试。

**Humor (English):**
Feature flags: because "we'll fix it later" needs a safety net.

**Humor (Chinese):**
Feature flag：因为"之后再修"需要一张安全网。

---

### Option C - Stabilize (2 points)
**English:**
Delay release until critical path tests are written. Bugs in production cost more than delayed features.

**Chinese:**
延期发布直到关键路径测试完成。生产环境的 bug 比延期的成本更高。

**Humor (English):**
You can ship fast or ship broken. Pick one and own it.

**Humor (Chinese):**
你可以快速上线，也可以上线烂代码。选一个，然后承担后果。

---

## Summary

All 4 questions follow the established pattern:

✅ **Scenario Style:** Real SAP/enterprise situations  
✅ **Tool References:** Excel, UI5, Fiori, API, feature flags  
✅ **Cultural Context:** Bilingual, relevant to Chinese + international engineers  
✅ **Humor Style:** Self-aware, slightly sarcastic, software engineering culture  
✅ **Scoring Pattern:** A=2:0, B=1:1, C=0:2 for each dimension  

**Question IDs:** A5, B5, C5, D5  
**Dimensions:** Signal/Solution, Human/Machine, Explore/Align, Spark/Stabilize  
**Format:** Matches existing Q1-Q4 structure exactly
