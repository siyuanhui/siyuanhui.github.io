---
title: "EECS 311 模拟电子电路速查手册"
description: "由三张手写 cheat sheet 整理而成的速查手册，覆盖半导体基础与二极管、BJT、MOSFET、单管放大组态、差分对、运放与反馈、频率响应与 Miller 效应。"
date: 2026-11-15
tags:
  - analog
  - circuits
  - semiconductors
language: zh
status: seedling
draft: false
translationKey: eecs-311-analog-electronics-cheat-sheet
topic: semiconductors
kind: reference
course: EECS 311
courses:
  - EECS 311
---

> 由三张手写 cheat sheet 整理而成，覆盖半导体基础与二极管、BJT、MOSFET、单管放大组态、差分对、运放与反馈、频率响应与 Miller 效应。记号：$V_T=kT/q$；$g_m$ 跨导，$r_o$ 输出电阻，$r_\pi$ 基极输入电阻，$\eta=g_{mb}/g_m$。原稿个别推导字迹较潦草，已在对应位置标注，使用前建议对照课件复核。

## 1. 半导体基础与二极管

### 1.1 材料与掺杂

- 施主（donor，+5 价）：P、As；受主（acceptor，+3 价）：B、Ga（Si 为 +4 价）。
- 电中性：$x_n N_d=x_p N_a$；$N_d\uparrow \Rightarrow$ 耗尽宽度 $x\downarrow$。
- 正向偏置：耗尽宽度 $x\downarrow$；反向偏置：$x\uparrow$。
- 载流子浓度：$N_d=n_i e^{\phi/V_T}$，其中 $V_T=kT/q$。

### 1.2 二极管大信号方程

$$I_D=I_S\left(e^{qV_D/kT}-1\right)$$

$$V_D=\frac{kT}{q}\ln\!\left(\frac{I_D}{I_S}+1\right)$$

两只同型二极管电流比对应的电压差：

$$\Delta V=\frac{kT}{q}\ln\!\left(\frac{I_1}{I_2}\right)=\text{常数}\times T$$

## 2. BJT

### 2.1 大信号模型

电流关系：

$$I_E=I_B+I_C,\qquad I_C=\beta I_B,\qquad I_B=\frac{I_C}{\beta},\qquad I_E=\frac{I_C}{\alpha},\qquad \alpha=\frac{\beta}{\beta+1}$$

指数特性（NPN 用 $V_{BE}$，PNP 用 $V_{EB}$）：

$$I_C=I_S\,e^{V_{BE}/V_T}$$

考虑 Early 效应：

$$I_C=I_S\,e^{V_{BE}/V_T}\left(1+\frac{V_{CE}}{V_A}\right)$$

工作区域：Active（放大）/ Saturation（饱和）/ Cutoff（截止）；放大区 $V_{BE}\approx0.7\,\text{V}$，$V_{BC}<0$。

### 2.2 小信号混合 π 模型

$$g_m=\frac{I_C}{V_T}=\frac{\partial I_C}{\partial V_{BE}}$$

$$r_\pi=\frac{\beta}{g_m}=\frac{\partial V_{BE}}{\partial I_B}=\frac{\beta}{\partial I_C/\partial V_{BE}}$$

$$r_o=\frac{\partial V_{CE}}{\partial I_C}=\frac{V_A}{I_C}$$

T 模型发射极电阻：

$$r_e=\frac{V_T}{I_E}=\frac{r_\pi}{1+\beta}$$

各端子看入电阻：B 端 $r_\pi$，C 端 $r_o$，E 端 $1/g_m$。

混合 π 小信号模型（示意）：

```
        rπ              gm vbe
B ──/\/\/\──┬──────────▶──────────┬── C
            │                      │
           vbe                    ro
            │                      │
E ─────────┴──────────────────────┴── E
```

## 3. MOSFET（NMOS）

### 3.1 工作区域

Cut-off（截止）/ Saturation（饱和）/ Ohmic·Triode（线性区）。

**线性区（triode）**

$$I_D=\mu_n C_{ox}\frac{W}{L}\left[(V_{GS}-V_{TH})V_{DS}-\tfrac12 V_{DS}^2\right]$$

**饱和区（saturation）**

$$I_D=\tfrac12\mu_n C_{ox}\frac{W}{L}(V_{GS}-V_{TH})^2(1+\lambda V_{DS})$$

饱和条件：$V_{DS}>V_{GS}-V_{TH}=V_{OV}$；过驱动余量 $V_{DS}-(V_{GS}-V_{TH})$。

### 3.2 小信号参数

跨导三种等价形式：

$$g_m=\mu_n C_{ox}\frac{W}{L}(V_{GS}-V_{TH})(1+\lambda V_{DS})=\frac{\partial I_D}{\partial V_{GS}}$$

$$g_m=\sqrt{2\mu_n C_{ox}\frac{W}{L}I_D(1+\lambda V_{DS})}=\frac{2I_D}{V_{GS}-V_{TH}}=\frac{2I_D}{V_{OV}}$$

输出电阻：

$$r_o=\frac{\partial V_{DS}}{\partial I_D}=\frac{1}{\lambda I_D}$$

体效应跨导：

$$g_{mb}=\frac{\partial I_D}{\partial V_{BS}}=\left(\frac{\partial I_D}{\partial V_{TH}}\right)\left(\frac{\partial V_{TH}}{\partial V_{BS}}\right)=\eta g_m$$

阈值电压体效应：

$$V_{TH}=V_{TH0}+\gamma\left(\sqrt{|2\Phi_F+V_{SB}|}-\sqrt{|2\Phi_F|}\right)$$

$$\Phi_F=\frac{kT}{q}\ln\!\left(\frac{N_{sub}}{n_i}\right)$$

过驱动电压：

$$V_{OV}=\sqrt{\frac{2I_D}{\mu_n C_{ox}(W/L)}}$$

线性区导通电阻：

$$R_{on}\approx\frac{1}{\mu_n C_{ox}(W/L)(V_{GS}-V_T)}$$

MOS 小信号模型（示意）：

```
G ──┬──────────────────────┬── D
    │   gm vgs             │ ro
   vgs                    gmb vbs
    │                      │
S ──┴──────────────────────┴── S
```

输入电阻（无体效应）：$Z_{in}=\frac{1}{g_m}\parallel r_o\approx\frac{1}{g_m}$；含体效应：$Z_{in}=\frac{1}{g_m}\parallel\frac{1}{g_{mb}}\parallel r_o$。

## 4. 单管放大组态

### 4.1 共源极 CS（带源极退化 $R_s$）

$$R_{out}=\big(r_o+R_s+(g_m+g_{mb})r_o R_s\big)\parallel R_D\approx r_o\parallel R_D$$

$$G_m=\frac{-g_m}{1+g_m R_s}\approx-\frac{1}{R_s}$$

$$A_v=\frac{-g_m R_D}{1+g_m R_s}\longrightarrow-\frac{R_D}{R_s}$$

- 无源极退化（无 SD）：$A_v=-g_m R_D$；有退化（有 SD）：$A_v\approx -R_D/R_s$。

### 4.2 共漏极 CD（源极跟随器）

$$R_{out}=\frac{R_D+r_o}{1+(g_m+g_{mb})r_o}\parallel R_s\longrightarrow \frac{1}{g_m+g_{mb}}\parallel R_s$$

$$G_m=\frac{g_m}{1+R_D/r_o},\qquad A_v=\frac{g_m R_s}{1+g_m R_s+g_{mb}}\approx\frac{1}{1+\eta}$$

### 4.3 共栅极 CG

$$R_{out}=\big(r_o+R_s+(g_m+g_{mb})r_o R_s\big)\parallel R_D$$

$$G_m=\frac{(g_m+g_{mb})r_o+1}{R_{out}},\qquad R_{in}=\frac{R_D+r_o}{1+(g_m+g_{mb})r_o}$$

$$A_v=R_o g_m(1+\eta)$$

### 4.4 BJT 对应组态

- 增益：$A_v=-g_m(R_C\parallel r_o)$。
- 集电极等效电阻：

$$R_C=r_o+(R_E\parallel r_\pi)+g_m r_o(R_E\parallel r_\pi)$$

- 输入电阻：

$$R_{in}=r_\pi\parallel\frac{r_o+R_C}{g_m r_o+1}=\frac{1}{g_m}+\frac{R_C}{g_m r_o}$$

## 5. 差分对

### 5.1 差模与共模

$$V_o=A_d V_{id}+A_{cm}V_{ic}$$

$$V_{id}=V_{i2}-V_{i1},\qquad V_{ic}=\tfrac12(V_{i1}+V_{i2})$$

$$CMRR=\left|\frac{A_d}{A_{cm}}\right|,\qquad CMRR_{dB}=20\log_{10}CMRR$$

### 5.2 增益与跨导

$$A_v=\frac{g_{m1}}{g_{m2}}=\sqrt{\frac{(W/L)_1}{(W/L)_2}}=\frac{V_{GS2}-V_T}{V_{GS1}-V_T}$$

$$A_v\approx g_{m1}(r_{o1}\parallel r_{o2}),\qquad G_m=(g_{m1}+g_{m2})(r_{o1}\parallel r_{o2})$$

- 半边电路（half circuit）：两边各取 ½；尾电流源电阻 $R_{SS}$。
- 含尾阻的差分跨导：

$$G_m=-g_m\frac{r_o}{R_{SS}r_o+g_m r_o R_{SS}}$$

### 5.3 有源负载

- DC 下管子为二极管连接（diode-connected）；AC 差分下等效为电流源。
- 尺寸匹配：$C_1/C_2=S_1/S_2$（面积比，$W\times L$）。
- 输出摆幅：$(V_{O1}+V_{OL})/2$，$V_{O1}=V_{OD}$；

$$\frac{V_{DD}-V_{OL}}{R_D}=\tfrac12\mu_n C_{ox}\frac{W}{L}(V_{OL})^2,\qquad V_{OL}=V_{GS}-V_{TH}$$

## 6. 运算放大器与反馈

### 6.1 理想运放

$Z_{in}\to\infty$，$Z_{out}\to0$，开环增益 $A\to\infty$。

### 6.2 反相放大

$$A_v=-\frac{R_2}{R_1},\qquad 1+\frac{R_2}{R_1},\qquad \beta=\frac{R_1}{R_1+R_2}$$

闭环增益（有限开环 $A$）：

$$\frac{V_{out}}{V_{in}}=\frac{A}{1+A\beta}$$

### 6.3 差分放大

$$V_o=-\frac{R_2}{R_1}V_{i1}+\frac{1}{\beta}\frac{R_2}{R_1+R_2}V_{i2}$$

### 6.4 带载输出

$$V_{out,load}=V_{out,open}\frac{R_L}{R_{out}+R_L}=G_m V_{in}\frac{R_{out}R_L}{R_{out}+R_L}$$

## 7. 频率响应、极点与 Miller 效应

### 7.1 复频域阻抗

$$s=j\omega,\qquad Z_C=\frac{1}{sC},\qquad Z_L=sL$$

传递函数零极点形式：

$$H(s)=\frac{V_o(s)}{V_i(s)}=k\,\frac{\pi(s-z)}{\pi(s-p)}$$

### 7.2 分贝与 −3 dB 带宽

$$|H(j\omega)|_{dB}=20\log|H(j\omega)|$$

$$20\log\frac{1}{\sqrt2}=-3\,\text{dB},\qquad f_{-3dB}=\frac{1}{2\pi\tau}$$

### 7.3 单极点（LHP）

$$A(j\omega)=\frac{A_0}{1+s/\omega_b},\qquad \omega_b=\frac{1}{\tau},\qquad f=\frac{1}{2\pi\tau}$$

增益带宽积：$A_0\omega_b=GBWP$。

时间常数求和（开路时间常数法）：

$$\tau=\sum\frac{1}{\omega_i}=\sum\frac{1}{2\pi f_i}=\frac{1}{2\pi f}=\sum\tau_i$$

### 7.4 直流/交流增益与一阶传递函数

$$H^0=H(s)\big|_{DC},\qquad H'=H(s)\big|_{AC}$$

时间常数：$\tau=R_{seen}C$（电容）或 $\tau=L/R_{seen}$（电感）。

一阶：

$$H(s)=\frac{H^0+H'\tau s}{1+\tau s},\qquad z=-\frac{1}{\tau}\frac{H^0}{H'},\qquad p=-\frac{1}{\tau}$$

### 7.5 主极点与二阶

- 主极点：$p=\sigma+j\omega$，$|\sigma|$ 最小者决定 $\tau_{total}$。
- $\tau_2=R_{seen}C_2$，$\tau_{total}=\tau_1+\tau_2$，$\tau_1=R_{seen}C_1$。
- 二阶精确形式：

$$H(s)=\frac{H^0}{(1+s/\omega_1)(1+s/\omega_2)}$$

−3 dB 条件：

$$\left[1+\left(\frac{f}{f_1}\right)^2\right]\left[1+\left(\frac{f}{f_2}\right)^2\right]=2$$

### 7.6 Miller 效应

跨接在输入输出间的阻抗 $Z$，等效到输入/输出侧：

$$Z_1=\frac{Z}{1-A_v},\qquad Z_2=\frac{Z}{1-1/A_v}$$

等效电容：

$$C_1=C(1-A_v),\qquad C_2=C(1-1/A_v)$$

Miller 零点：$V_x C_S=g_m V_x$，

$$f_z=\frac{g_m}{2\pi C_F},\qquad \omega_T=\frac{g_m}{C_{GD}},\qquad f_z=\frac{\omega_z}{2\pi}$$

### 7.7 CS 级带宽估算

$$\omega_{in}=\frac{1}{R_S\big[C_{GS}+(1+g_m R_D)C_{GD}\big]}$$

$$\omega_{out}=\frac{1}{R_D(C_{DB}+C_{GD})}$$

## 8. 速查补充

- 分贝定义：

$$dB=10\log_{10}\frac{P_2}{P_1}=20\log_{10}\frac{V_2}{V_1}$$

- 管子匹配比较：$V_{DS2}\downarrow$，$V_{S1}>V_{S2}$，$V_{GS1}<V_{GS2}$ 时的电流分配判断。
- 原稿中偏置网络（$R_1,R_2,R_3$）的 $H^0,H',R_{in}$ 推导字迹较密，本手册未逐条转录，建议结合课堂例题核对。
