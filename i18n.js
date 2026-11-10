/* Hand-written Simplified Chinese strings for Siyuan Hui's site. No runtime machine translation. */
(function () {
  "use strict";

  var STORAGE_KEY = "lang";

  var titles = {
    en: "Siyuan Hui | Computer Engineering, University of Michigan",
    zh: "惠思远 | 计算机工程，密歇根大学"
  };

  var descriptions = {
    en: "Siyuan Hui — Computer Engineering undergraduate at the University of Michigan. Digital IC design, hardware verification, and computer architecture.",
    zh: "惠思远，密歇根大学计算机工程本科生。关注数字集成电路设计、硬件验证与计算机体系结构。"
  };

  var zh = {
    "skip": "跳到正文",
    "nav.aria": "主导航",
    "nav.about": "简介",
    "nav.education": "教育经历",
    "nav.experience": "经历",
    "nav.projects": "项目",
    "nav.skills": "技能",
    "nav.contact": "联系方式",
    "lang.aria": "语言",
    "hero.eyebrow": "密歇根大学",
    "hero.headline": "计算机工程本科生，关注数字集成电路设计、硬件验证与计算机体系结构。",
    "hero.lede": "我在密歇根大学安娜堡分校攻读计算机工程本科（BSE），经 UM–SJTU 联合学院（交大密西根学院）双学位项目转学至此。目前也在研究用于监测 GaN 半导体生长的人工智能方法。",
    "hero.email": "邮箱",
    "about.title": "简介",
    "about.p1": "我是密歇根大学安娜堡分校计算机工程专业的本科生。经 UM–SJTU 联合学院（交大密西根学院）双学位项目来到密歇根，此前于 2024 至 2026 年在上海交通大学学习电子与计算机工程。",
    "about.p2": "我的兴趣集中在数字集成电路设计、硬件验证与计算机体系结构——从晶体管级电路设计，到指令集工具链与流水线模型。在密歇根大学 Zetian Mi 教授课题组，我正在调研用深度学习方法解读 GaN 分子束外延过程中的原位 RHEED 图像，并制定将图像特征与生长过程中表面演化联系起来的研究计划。",
    "honors.title": "荣誉",
    "honor.mcm": "MCM/ICM 成功参赛奖",
    "honor.buddy": "M-ENGIN 领导力项目 Best Buddy Award",
    "honor.upc": "University Physics Competition 铜奖",
    "honor.cpho": "全国中学生物理竞赛上海赛区二等奖",
    "date.jan2026": "2026年1月",
    "date.mar2025": "2025年3月",
    "date.jan2025": "2025年1月",
    "date.nov2023": "2023年11月",
    "edu.title": "教育经历",
    "umich.name": "密歇根大学安娜堡分校",
    "umich.role": "计算机工程（BSE）",
    "umich.dates": "预计 2028 年毕业",
    "umich.note": "经 UM–SJTU 联合学院（交大密西根学院）双学位项目转学至此。",
    "sjtu.name": "上海交通大学",
    "sjtu.role": "电子与计算机工程",
    "sjtu.dates": "2024–2026",
    "sjtu.note": "UM–SJTU 联合学院（交大密西根学院）双学位项目。",
    "navarra.name": "西班牙纳瓦拉大学",
    "navarra.role": "冬季学期学术交流",
    "navarra.dates": "2025年1–2月",
    "navarra.note": "包含 Java 游戏设计。",
    "coursework.title": "相关课程",
    "course.311": "电子电路（EECS 311）",
    "course.216": "信号与系统（EECS 216）",
    "course.270": "逻辑设计导论（EECS 270）",
    "course.280": "程序设计与数据结构（EECS 280）",
    "course.215": "电路导论（EECS 215）",
    "course.301": "概率方法（EECS 301）",
    "coursework.inprogress": "进行中，2026年秋季",
    "course.370": "计算机组成（EECS 370）",
    "course.312": "数字集成电路（EECS 312）",
    "exp.title": "经历",
    "exp.research": "科研",
    "gan.title": "AI 辅助的 GaN 分子束外延生长监测",
    "gan.role": "本科生研究员，Zetian Mi 教授课题组 · 密歇根大学",
    "gan.dates": "2026年9月至今",
    "gan.desc": "正在调研深度学习方法（包括视觉 Transformer 与时序模型），用于解读 GaN 分子束外延过程中的原位 RHEED 图像。正在制定研究计划，将图像特征与生长过程中的表面演化联系起来，并评估生长条件预测如何为操作决策提供参考。",
    "prp.title": "自动化数据处理与定量分析",
    "prp.role": "本科生研究员，上海交通大学 PRP 科研项目 · 上海交通大学",
    "prp.dates": "2025年1–9月",
    "prp.desc": "使用 Python 和 DeepSeek API 搭建数据处理流程，对非结构化数据做自动化评估，用 Python 和 Stata 进行回归分析，并撰写研究论文记录相关工作。",
    "intern.title": "数据分析实习生",
    "intern.role": "上海人工智能与社会发展协会",
    "intern.dates": "2024年9月起",
    "intern.desc": "用 Python 脚本处理调研数据，研究人工智能应用情况，并参与政策报告的撰写。",
    "exp.teaching": "教学与领导力",
    "ta.title": "学术写作课程助教",
    "ta.role": "上海交通大学",
    "ta.dates": "2025年9–12月",
    "ta.desc": "担任学术写作课程助教，为 50 余名学生提供支持。",
    "mentor.title": "国际交流导师",
    "mentor.role": "上海交通大学全球学院国际项目办公室",
    "mentor.dates": "2025年3月起",
    "proj.title": "项目",
    "status.progress": "进行中",
    "date.fall2026": "2026年秋季",
    "proj.mult.title": "晶体管级 4×4 无符号乘法器",
    "proj.mult.p1": "正在晶体管原理图层级设计一款组合逻辑 4×4 无符号乘法器，输出为 8 位。该工作在给定电源与负载条件下，比较部分积压缩方法、加法器结构与晶体管尺寸，优化能量–延迟–面积目标函数 E<sub>avg</sub>·D<sub>max</sub>²·A，其中面积以有效 MOSFET 总宽度衡量。",
    "proj.mult.p2": "计划中的评估包括对全部 256 组输入的穷尽功能验证、关键路径跳变测试，以及能耗与最坏情况延迟仿真。",
    "proj.lc2k.title": "LC2K 处理器工具链与体系结构仿真",
    "proj.lc2k.tags": "EECS 370 · C · LC2K 汇编",
    "proj.lc2k.p1": "已用 C 语言编写汇编器与指令集模拟器，并扩展了目标文件生成、符号解析、重定位与多文件链接。目前正在开发周期精确的五级流水线模型，包含流水线寄存器、数据前递、load-use 停顿，以及预测不跳转的分支处理。",
    "proj.lc2k.p2": "范围还包括统一的指令/数据缓存模拟器，支持可配置的块大小与相联度、LRU 替换，以及写回 / 写分配策略，并配有针对冒险与缓存行为的定向汇编测试。",
    "date.marMay2025": "2025年3–5月",
    "proj.robot.title": "嵌入式机器人与硬件集成",
    "proj.robot.tags": "硬件开发与团队负责人 · 上海交通大学科学技术协会 · C/C++",
    "proj.robot.p1": "参与开发带手柄控制的嵌入式机器人平台与机械臂，集成微控制器固件、电机驱动与硬件接口。用 C/C++ 编写控制固件，并协调硬件调试与系统集成。",
    "skills.title": "技能",
    "skills.programming": "编程语言",
    "skills.tools": "工具",
    "skills.languages": "语言",
    "lang.chinese": "中文（母语）",
    "lang.english": "英语（流利）",
    "lang.spanish": "西班牙语（初级）",
    "contact.title": "联系方式",
    "contact.lede": "联系我最好通过电子邮件。我目前在密歇根州安娜堡。",
    "footer": "© 2026 惠思远"
  };

  var originals = {};
  var current = "en";

  function normalize(code) {
    if (!code) return "";
    var c = String(code).toLowerCase();
    if (c === "zh" || c.indexOf("zh-") === 0) return "zh";
    if (c === "en" || c.indexOf("en-") === 0) return "en";
    return "";
  }

  function queryLang() {
    try {
      return normalize(new URLSearchParams(window.location.search).get("lang"));
    } catch (e) {
      return "";
    }
  }

  function savedLang() {
    try {
      return normalize(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return "";
    }
  }

  function browserLang() {
    try {
      var nav = navigator.language || navigator.userLanguage || "";
      if (String(nav).toLowerCase().indexOf("zh") === 0) return "zh";
    } catch (e) {}
    return "";
  }

  function initialLang() {
    return queryLang() || savedLang() || browserLang() || "en";
  }

  function cacheOriginals() {
    var nodes = document.querySelectorAll("[data-i18n], [data-i18n-html], [data-i18n-aria-label]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute("data-i18n") || el.getAttribute("data-i18n-html") || el.getAttribute("data-i18n-aria-label");
      if (!key || originals[key]) continue;
      originals[key] = {
        text: el.getAttribute("data-i18n") ? el.textContent : null,
        html: el.getAttribute("data-i18n-html") ? el.innerHTML : null,
        aria: el.getAttribute("data-i18n-aria-label") ? (el.getAttribute("aria-label") || "") : null
      };
    }
  }

  function apply(lang) {
    current = lang === "zh" ? "zh" : "en";
    var isZh = current === "zh";
    document.documentElement.lang = isZh ? "zh-CN" : "en";
    document.title = titles[current];

    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", descriptions[current]);

    var textNodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < textNodes.length; i++) {
      var el = textNodes[i];
      var key = el.getAttribute("data-i18n");
      if (isZh) {
        if (Object.prototype.hasOwnProperty.call(zh, key)) el.textContent = zh[key];
      } else if (originals[key] && originals[key].text != null) {
        el.textContent = originals[key].text;
      }
    }

    var htmlNodes = document.querySelectorAll("[data-i18n-html]");
    for (var j = 0; j < htmlNodes.length; j++) {
      var hEl = htmlNodes[j];
      var hKey = hEl.getAttribute("data-i18n-html");
      if (isZh) {
        if (Object.prototype.hasOwnProperty.call(zh, hKey)) hEl.innerHTML = zh[hKey];
      } else if (originals[hKey] && originals[hKey].html != null) {
        hEl.innerHTML = originals[hKey].html;
      }
    }

    var ariaNodes = document.querySelectorAll("[data-i18n-aria-label]");
    for (var k = 0; k < ariaNodes.length; k++) {
      var aEl = ariaNodes[k];
      var aKey = aEl.getAttribute("data-i18n-aria-label");
      if (isZh) {
        if (Object.prototype.hasOwnProperty.call(zh, aKey)) aEl.setAttribute("aria-label", zh[aKey]);
      } else if (originals[aKey] && originals[aKey].aria != null) {
        aEl.setAttribute("aria-label", originals[aKey].aria);
      }
    }

    var buttons = document.querySelectorAll(".lang-switch [data-set-lang]");
    for (var b = 0; b < buttons.length; b++) {
      var on = buttons[b].getAttribute("data-set-lang") === current;
      buttons[b].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  function persist(lang, updateUrl) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    if (!updateUrl) return;
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (e) {}
  }

  function setLang(lang, updateUrl) {
    apply(lang);
    persist(lang, updateUrl);
  }

  document.documentElement.classList.add("i18n-ready");
  cacheOriginals();
  apply(initialLang());

  var switcher = document.querySelector(".lang-switch");
  if (switcher) {
    switcher.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-set-lang]");
      if (!btn) return;
      var lang = normalize(btn.getAttribute("data-set-lang")) || "en";
      setLang(lang, true);
    });
  }
})();
