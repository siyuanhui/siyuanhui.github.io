---
title: "EECS 216 信号与系统速查手册"
description: "由手写 cheat sheet 整理而成的速查手册，覆盖基本信号与系统、卷积、傅里叶级数、傅里叶变换、采样与重建、能量功率、微分方程与系统函数。"
date: 2026-11-15
tags:
  - signals
  - systems
  - fourier
language: zh
status: seedling
draft: false
translationKey: eecs-216-signals-and-systems-cheat-sheet
topic: mathematics
kind: reference
course: EECS 216
courses:
  - EECS 216
---

> 由手写 cheat sheet 整理而成，覆盖基本信号与系统、卷积、傅里叶级数、傅里叶变换、采样与重建、能量功率、微分方程与系统函数。记号约定：傅里叶变换采用 $F(\omega)=\int f(t)e^{-j\omega t}\,dt$，逆变换带 $1/(2\pi)$；$\mathrm{sinc}(x)=\sin(\pi x)/(\pi x)$。

## 1. 基本概念

### 1.1 信号与系统

- **信号（signal）**：随时间和空间变化的物理量，本质是一个函数。
- **系统（system）**：对信号执行某种运算的物理装置，本质是一个映射（map / function）。

### 1.2 周期信号

存在 $T>0$，使得

$$x(t+T)=x(t)$$

- 两个周期信号可公倍：$n_1T_1=n_2T_2$；$T$ 为基波周期（fundamental period）。
- 由一个周期内的基本波形延拓：

$$x(t)=\sum_{n=-\infty}^{\infty}x_0(t-nT)$$

### 1.3 偶信号与奇信号

$$\text{Even（偶）：}\quad x(t)=x(-t)$$

$$\text{Odd（奇）：}\quad x(t)+x(-t)=0$$

任意信号可分解为偶部与奇部：

$$x_e(t)=\tfrac{1}{2}\big[x(t)+x(-t)\big],\qquad x_o(t)=\tfrac{1}{2}\big[x(t)-x(-t)\big]$$

### 1.4 平均值、能量与平均功率

**平均值**

$$A\triangleq \lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}x(t)\,dt \;\;=\;\; \frac{1}{T}\int_{T}x(t)\,dt \quad\text{（周期信号）}$$

**能量**

$$E\triangleq \int_{-\infty}^{\infty}|x(t)|^2\,dt$$

**平均功率**

$$P=\lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}x^2(t)\,dt \;\;=\;\; \frac{1}{T}\int_{T}x^2(t)\,dt \quad\text{（周期信号）}$$

- **能量信号**：$E<\infty \Rightarrow P=0$。
- **功率信号**：$E\to\infty$ 且 $P<\infty$。

## 2. 基本信号

### 2.1 单位阶跃

$$u(t)\triangleq \begin{cases}1,& t>0\\[2pt]0,& t<0\end{cases}$$

$$u\!\left(\frac{t-t_0}{\tau}\right)=u(t-t_0),\qquad \frac{d}{dt}u(t)=\delta(t)$$

### 2.2 矩形脉冲

$$\mathrm{rect}(t)\triangleq \begin{cases}1,& -\tfrac12<t<\tfrac12\\[2pt]0,& \text{其他}\end{cases}=u\!\left(t+\tfrac12\right)-u\!\left(t-\tfrac12\right)$$

$$\mathrm{rect}\!\left(\frac{t-t_0}{\tau}\right)=u\!\left(\frac{t-t_0+\tau/2}{\tau}\right)-u\!\left(\frac{t-t_0-\tau/2}{\tau}\right)$$

- 参数含义：$t_0$ 是中心（center），$\tau$ 是宽度（width）。
- 求导：

$$\frac{d}{dt}\mathrm{rect}\!\left(\frac{t-t_0}{\tau}\right)=\frac{1}{\tau}\left[\delta\!\left(\frac{t-t_0+\tau/2}{\tau}\right)-\delta\!\left(\frac{t-t_0-\tau/2}{\tau}\right)\right]$$

### 2.3 三角脉冲

$$\mathrm{tri}(t)\triangleq (1-|t|)\,\mathrm{rect}\!\left(\frac{t}{2}\right)$$

$\mathrm{tri}\!\left(\frac{t-t_0}{\tau}\right)$ 以 $t_0$ 为中心，宽度为 $2\tau$。

### 2.4 冲激函数 $\delta(t)$ 的性质

1. $\displaystyle\int_{-\infty}^{\infty}\delta(t-t_0)\,dt=1,\quad \forall t_0\in\mathbb{R}$
2. $\displaystyle\delta(at+b)=\frac{1}{|a|}\delta\!\left(t+\frac{b}{a}\right)$
3. $\delta(t)=\delta(-t)$（偶）
4. $\delta(t-t_0)=0,\quad t\neq t_0$
5. $\displaystyle\int_{-\infty}^{t}\delta(\tau)\,d\tau=u(t)$
6. **抽样（sampling）**：$x(t)\,\delta(t-t_0)=x(t_0)\,\delta(t-t_0)$
7. **筛选（sifting）**：$\displaystyle\int_{-\infty}^{\infty}x(t)\,\delta(t-t_0)\,dt=x(t_0)$

## 3. 系统性质

### 3.1 线性（Linearity）

齐次性 + 可加性：

$$T\big[\alpha_1 x_1(t)+\alpha_2 x_2(t)\big]=\alpha_1 T\big[x_1(t)\big]+\alpha_2 T\big[x_2(t)\big]$$

对积分同样成立：

$$T\!\left[\int x(t,v)\,dv\right]=\int T\!\big[x(t,v)\big]\,dv$$

### 3.2 稳定性（BIBO Stable）

有界输入必有界输出：

$$|x(t)|\le M_1 \;\Longrightarrow\; |y(t)|\le M_2$$

### 3.3 可逆性（Invertibility）

每个输入对应唯一的输出；存在逆系统使 $h(t)*h_i(t)=\delta(t)$。

### 3.4 因果性（Causal）

输出只依赖当前与过去的输入：$x(t_0),\ t_0\le t$；冲激响应满足

$$h(t)=0,\quad t<0$$

### 3.5 无记忆（Memoryless / Static）

输出只取决于当前时刻：$t_0=t$；冲激响应为

$$h(t)=k\,\delta(t)$$

### 3.6 时不变性（Time Invariant）

$$\big[x(t)\xrightarrow{T}y(t)\big]\iff \big[x(t-t_0)\xrightarrow{T}y(t-t_0)\big]$$

即「先延迟再变换」与「先变换再延迟」等价：

```
x(t) ──延迟 t0──▶ x(t-t0) ──系统 T──▶ y(t-t0)
x(t) ──系统 T──▶ y(t)     ──延迟 t0──▶ y(t-t0)   （两路结果相同 ⇒ TI）
```

- $x(at+b)$：仅当 $a=1$ 时时不变，否则不是时不变（o/w not TI）。
- 判别例子：
  - $y(t)=\displaystyle\int_{-\infty}^{t}x(\tau)\,d\tau$ ✔ 时不变
  - $y(t)=\displaystyle\int_{-t}^{t}x(\tau)\,d\tau$ ✘ 不是时不变
  - $y(t)=\displaystyle\int_{t-1}^{t}x(\tau)\,d\tau$ ✔ 时不变

### 3.7 用冲激响应判据汇总

| 性质 | 冲激响应条件 |
|---|---|
| 因果 Causal | $h(t)=0,\ t<0$ |
| 无记忆 Memoryless | $h(t)=k\,\delta(t)$ |
| BIBO 稳定 | $\displaystyle\int_{-\infty}^{\infty}|h(t)|\,dt<\infty$ |
| 可逆 Invertible | $h(t)*h_i(t)=\delta(t)$ |

## 4. LTI 系统与卷积

### 4.1 冲激响应与卷积积分

单位冲激激励下的响应即冲激响应：

$$\delta(t)\xrightarrow{T}h(t)$$

信号用冲激分解：

$$x(t)=\int_{-\infty}^{\infty}x(\tau)\,\delta(t-\tau)\,d\tau=x(t)*\delta(t)$$

LTI 输出：

$$y(t)=x(t)*h(t)=\int_{-\infty}^{\infty}x(\tau)\,h(t-\tau)\,d\tau$$

### 4.2 卷积代数性质

- 交换律：$x*h=h*x$
- 结合律：$(x*y)*z=x*(y*z)$
- 级联（cascade）：$x*(h_1*h_2)=(x*h_1)*h_2$
- 恒等：$x(t)*\delta(t)=x(t)$
- 时移：$x(t)*\delta(t-t_0)=x(t-t_0)$；$\delta(t-t_0)*\delta(t-t_1)=\delta(t-t_0-t_1)$
- 联合时移：$x(t-t_0)*h(t-t_1)=y(t-t_0-t_1)$

级联框图：

```
x(t) ──▶ ┌──────┐ ──▶ ┌──────┐ ──▶ y(t)
         │ h1(t) │     │ h2(t) │
         └──────┘     └──────┘
等价于 y(t) = x(t) * h1(t) * h2(t)
```

### 4.3 卷积的常用性质

- 积分关系：

$$\int_{-\infty}^{\infty}y(t)\,dt=\left[\int_{-\infty}^{\infty}x(t)\,dt\right]\left[\int_{-\infty}^{\infty}h(t)\,dt\right]$$

- 尺度变换：

$$x(at)*y(at)=\frac{1}{|a|}y(at)$$

- 与阶跃卷积（积分）：

$$f(t)*u(t)=\int_{-\infty}^{t}f(\tau)\,d\tau$$

- 微分性质：

$$\frac{d}{dt}y(t)=\left[\frac{d}{dt}x(t)\right]*h(t)=\left[\frac{d}{dt}h(t)\right]*x(t)$$

### 4.4 常见卷积结果

| 卷积 | 结果 |
|---|---|
| $u(t)*u(t)$ | $t\,u(t)=r(t)$ |
| $u(t)*e^{-at}u(t)$ | $\dfrac{1}{a}\big(1-e^{-at}\big)u(t)$ |
| $f(t)*\sum_m\delta(t-mT)$ | $\displaystyle\sum_{m=-\infty}^{\infty}f(t-mT)$ |
| $\mathrm{rect}(t)*\mathrm{rect}(t)$ | $\mathrm{tri}(t)$ |
| $\dfrac{1}{a}\mathrm{rect}\!\left(\frac{t-t_0}{a}\right)*\mathrm{rect}\!\left(\frac{t-t_1}{a}\right)$ | $\mathrm{tri}\!\left(\frac{t-t_0-t_1}{a}\right)$ |
| $e^{-at}u(t)*e^{-bt}u(t)$ | $\dfrac{e^{-at}-e^{-bt}}{b-a}\,u(t)$ |
| $e^{-at}u(t)*e^{-at}u(t)$ | $t\,e^{-at}u(t)$ |

### 4.5 阶跃响应

$$s(t)=u(t)*h(t)=\int_{-\infty}^{t}h(\tau)\,d\tau$$

输入阶跃 $u(t)$ 得到 $s(t)$；冲激响应是阶跃响应的导数：

$$h(t)=\frac{ds(t)}{dt}$$

## 5. 傅里叶级数（FS）

### 5.1 分析与合成

周期 $T_0$、基波角频率 $\omega_0=2\pi/T_0$：

$$x(t)=\sum_{k=-\infty}^{\infty}C_k\,e^{jk\omega_0 t}$$

$$C_k=\frac{1}{T_0}\int_{T_0}x(t)\,e^{-jk\omega_0 t}\,dt,\qquad C_0=\frac{1}{T_0}\int_{T_0}x(t)\,dt$$

系数也可由傅里叶变换取样：$C_k=\dfrac{1}{T_0}F(\omega)\big|_{\omega=k\omega_0}$。

### 5.2 LTI 对周期输入的稳态响应

$$x(t)=\sum_k C_k e^{jk\omega_0 t}\;\xrightarrow{h(t)}\;y(t)=\sum_k C_k\,H(jk\omega_0)\,e^{jk\omega_0 t}$$

其中

$$H(jk\omega_0)=\int_{-\infty}^{\infty}h(t)\,e^{-jk\omega_0 t}\,dt$$

对正弦成分 $x(t)=\sum_k A_k\cos(\omega_k t+\phi_k)$：

$$y(t)=\sum_k A_k|H(j\omega_k)|\cos\big(\omega_k t+\phi_k+\angle H(j\omega_k)\big)+H(0)A_0$$

### 5.3 傅里叶级数性质

| 操作 | 系数变化 |
|---|---|
| 延时 $b$：$x(t-b)$ | $C_k\,e^{jk\omega_0 b}$ |
| 尺度 $x(at+b)$ | $\omega_1=a\omega_0$ |
| 反褶 $t\to -t$ | $d_k=C_{-k}$ |
| 共轭 | $d_k=C_{-k}^{*}$ |
| 频移 $x(t)e^{j\omega_0 t N}$ | $d_k=C_{k-N}$ |
| 时域微分 | $H(jk\omega_0)=jk\omega_0$ |
| 信号相乘 $x_1x_2$（系数 $a_k,b_k$） | $c_k=\sum_l a_l b_{k-l}$ |
| 周期卷积 | $d_k=a_k b_k$ |
| 线性 $ax+b$ | 直流：$b+aC_0$；交流：$aC_k$ |

### 5.4 功率与 Parseval

$$P=\frac{1}{T_0}\int_{T_0}|x(t)|^2\,dt=\sum_{k=-\infty}^{\infty}|C_k|^2$$

周期冲激串的级数：

$$\sum_{k=-\infty}^{\infty}\frac{1}{T_0}e^{jk\omega_0 t}=\sum_n\delta(t-nT_0)$$

$$\sum_{k=-\infty}^{\infty}\frac{W}{T_0}\mathrm{sinc}\!\left(\frac{kW}{T_0}\right)e^{jk\omega_0 t}=\sum_n\mathrm{rect}\!\left(\frac{t-nT_0}{W}\right)$$

> 原稿此处还记有总谐波失真（THD）相关一项，字迹较潦草，形式为 $(1-2|C_1|^2/P)\cdot100\%$，使用前建议再核对课件。

## 6. 傅里叶变换（FT）

### 6.1 正变换与逆变换

$$F(\omega)\triangleq\int_{-\infty}^{\infty}f(t)\,e^{-j\omega t}\,dt$$

$$f(t)=\frac{1}{2\pi}\int_{-\infty}^{\infty}F(\omega)\,e^{j\omega t}\,d\omega$$

### 6.2 常用变换对

| 时域 | 频域 |
|---|---|
| $\delta(t-t_0)$ | $e^{-j\omega t_0}$ |
| $\delta(t)$ | $1$ |
| $1$ | $\delta(\omega/2\pi)=2\pi\,\delta(\omega)$ |
| $e^{-at}u(t)$ | $\dfrac{1}{j\omega+a}$ |
| $e^{j\omega_0 t}$ | $2\pi\,\delta(\omega-\omega_0)$ |
| $\mathrm{sgn}(t)$ | $\dfrac{2}{j\omega}$ |
| $\mathrm{rect}(t/T)$ | $T\,\mathrm{sinc}\!\left(\dfrac{T\omega}{2\pi}\right)$ |
| $e^{-a|t|}$ | $\dfrac{2a}{a^2+\omega^2}$ |
| $\cos(\omega_0 t)$ | $\pi\big[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)\big]$ |
| $\sin(\omega_0 t)$ | $\dfrac{\pi}{j}\big[\delta(\omega-\omega_0)-\delta(\omega+\omega_0)\big]$ |
| $\cos(\omega_0 t+\phi_0)$ | $\pi e^{j\phi_0}\delta(\omega-\omega_0)+\pi e^{-j\phi_0}\delta(\omega+\omega_0)$ |

- $\delta(\omega)$ 对应 $e^{j\omega t}$，是功率信号；$\delta(t)$ 包含所有频率成分。

### 6.3 变换性质

| 性质 | 时域 | 频域 |
|---|---|---|
| 尺度与平移 | $f(at+b)$ | $\dfrac{1}{|a|}e^{j\omega b/a}F(\omega/a)$ |
| 对偶性 | $F(t)$ | $2\pi f(-\omega)$ |
| 时域微分 | $\dfrac{d^k}{dt^k}f(t)$ | $(j\omega)^k F(\omega)$ |
| 频域微分 | $(-jt)^n f(t)$ | $\dfrac{d^n}{d\omega^n}F(\omega)$ |
| 频域微分（乘 $t$） | $t\,f(t)$ | $j\,\dfrac{d}{d\omega}F(\omega)$ |
| 频移 | $e^{j\omega_0 t}f(t)$ | $F(\omega-\omega_0)$ |
| 积分 | $\displaystyle\int_{-\infty}^{t}f(\tau)\,d\tau$ | $\dfrac{F(\omega)}{j\omega}+\pi F(0)\delta(\omega)$ |
| 共轭 | $f^*(t)$ | $F^*(-\omega)$ |
| 乘 $u(t)$ | $g(t)=f(t)*u(t)$ | $F(\omega)\,U(\omega)$ |

**取样值**

$$f(0)=\frac{1}{2\pi}\int_{-\infty}^{\infty}F(\omega)\,d\omega,\qquad F(0)=\int_{-\infty}^{\infty}f(t)\,dt$$

### 6.4 对称性

- $f(t)$ 为实 ⇒ $F(\omega)=F^*(-\omega)$（Hermitian 对称）。
- 实偶 ⇒ 频域实偶；实奇 ⇒ 频域纯虚奇。
- 偶：$F(\omega)=F(-\omega)$。

### 6.5 相关函数与功率谱

自相关：

$$\gamma_{xx}(t)=x(t)*x^*(-t)\;\longleftrightarrow\;S_{xx}(\omega)=|X(\omega)|^2$$

互相关：

$$\gamma_{xy}=x(t)*y^*(-t)\;\longleftrightarrow\;S_{xy}(\omega)=X(\omega)Y(\omega)$$

功率谱（有限长截取 $X_T$）：

$$P_x(\omega)=\lim_{T\to\infty}\frac{|X_T(\omega)|^2}{T}$$

### 6.6 离散时间傅里叶变换（DTFT）

$$X(\Omega)=\sum_{n=-\infty}^{\infty}x[n]\,e^{-j\Omega n},\qquad x[n]=\frac{1}{2\pi}\int_{2\pi}X(\Omega)\,e^{j\Omega n}\,d\Omega$$

周期性：$X(\Omega+2\pi)=X(\Omega)$。采样后与连续谱的关系：

$$X(\omega)=T_s X(\Omega),\quad |\omega|<\omega_s/2;\qquad X(\omega)=0,\quad \text{其他}$$

### 6.7 乘卷积对偶（时域–频域互换）

$$m(t)n(t)\;\longleftrightarrow\;\frac{1}{2\pi}M(\omega)*N(\omega)$$

$$m(t)*n(t)\;\longleftrightarrow\;M(\omega)N(\omega)$$

## 7. 采样与重建

### 7.1 系统框图

时域：

```
          p(t)
           │
           ▼
x(t) ──⊗──▶ x_s(t) ──▶ h(t) ──▶ x_r(t)
```

频域：

```
X(ω) ──▶ P(ω)/2π ──▶ X_s(ω) ──⊗──▶ X_r(ω)
                                  ▲
                               H(ω)
```

### 7.2 冲激串采样

$$p(t)=\sum_{n=-\infty}^{\infty}\delta(t-nT_s)$$

$$P(\omega)=\frac{2\pi}{T_s}\sum_{k=-\infty}^{\infty}\delta(\omega-k\omega_s)$$

采样信号：

$$x_s(t)=\sum_{n=-\infty}^{\infty}x(nT_s)\,\delta(t-nT_s)$$

$$X_s(\omega)=\frac{1}{2\pi}X(\omega)*P(\omega)=\frac{1}{T_s}\sum_{k=-\infty}^{\infty}X(\omega-k\omega_s)$$

若采样脉冲是周期矩形串：

$$p(t)=\sum_{n=-\infty}^{\infty}\frac{1}{\tau}\,\mathrm{rect}\!\left(\frac{t-nT_s}{\tau}\right),\qquad C_k=\frac{1}{T_s}\mathrm{sinc}\!\left(\frac{k\tau\omega_s}{2\pi}\right)$$

$$X_s(\omega)=\sum_k\frac{1}{T_s}\mathrm{sinc}\!\left(\frac{k\tau\omega_s}{2\pi}\right)X(\omega-k\omega_s)$$

### 7.3 混叠与抗混叠滤波

- 不混叠条件：$\omega_s>2W_{\max}$（否则发生 aliasing）。
- 重建低通滤波器截止频率需满足：

$$W_{\max}<\omega_c<\omega_s-W_{\max}$$

### 7.4 三种重建滤波器

**① 理想低通（sinc 插值）**

$$H(\omega)=T_s\,\mathrm{rect}\!\left(\frac{\omega}{2\omega_c}\right),\qquad h(t)=\frac{\omega_c T_s}{\pi}\mathrm{sinc}\!\left(\frac{\omega_c t}{\pi}\right)$$

$$x_r(t)=h(t)*x_s(t)=\sum_n x(nT_s)\frac{\omega_c T_s}{\pi}\mathrm{sinc}\!\left(\frac{\omega_c(t-nT_s)}{\pi}\right)$$

当 $\omega_r=\omega_s/2$（奈奎斯特速率）：

$$x_r(t)=\sum_n x(nT_s)\,\mathrm{sinc}\!\left(\frac{t-nT_s}{T_s}\right)$$

**② 零阶保持（ZOH，Zero-order hold）**

$$H(\omega)=T_s\,\mathrm{sinc}\!\left(\frac{\omega}{\omega_s}\right)e^{-j\omega T_s/2}$$

$$h(t)=\mathrm{rect}\!\left(\frac{t}{T_s}-\frac12\right),\qquad x(t)=\sum_n x(nT_s)\,\mathrm{rect}\!\left(\frac{t-nT_s}{T_s}-\frac12\right)$$

**③ 一阶保持（FOH，First-order hold）**

$$H(\omega)=T_s\,\mathrm{sinc}^2\!\left(\frac{\omega}{\omega_s}\right)$$

$$h(t)=\mathrm{tri}\!\left(\frac{t}{T_s}\right)=\mathrm{rect}\!\left(\frac{t}{T_s}\right)*\mathrm{rect}\!\left(\frac{t}{T_s}\right)\frac{1}{T_s}$$

$$x(t)=\sum_n x(nT_s)\,\mathrm{tri}\!\left(\frac{t-nT_s}{T_s}\right)$$

### 7.5 rect 与 sinc 的对偶

$$\mathrm{rect}\!\left(\frac{t}{2T}\right)\;\longrightarrow\;\frac{2\sin(\omega T/2)}{\omega}=T\,\mathrm{sinc}\!\left(\frac{\omega T}{2\pi}\right)$$

$$\frac{\sin(Wt)}{\pi t}\;\longrightarrow\;\mathrm{rect}\!\left(\frac{\omega}{2W}\right)=\frac{W}{\pi}\mathrm{sinc}\!\left(\frac{W}{\pi}t\right)$$

- 脉宽算例：若 sinc 首零点对应 $\sin(k\pi/4)/(k\pi)$，则 $W/T_0=1/4$，即 $W=T_0/4$。

## 8. 能量、功率与 RMS

### 8.1 能量信号

$$E=\int_{-\infty}^{\infty}|x(t)|^2\,dt=\frac{1}{2\pi}\int_{-\infty}^{\infty}|X(\omega)|^2\,d\omega$$

### 8.2 功率信号

$$P=\lim_{T\to\infty}\frac{1}{T}\int_{-T/2}^{T/2}|f(t)|^2\,dt$$

周期信号：

$$P=\frac{1}{T}\int_{-T/2}^{T/2}|f(t)|^2\,dt=\sum_k|C_k|^2=\frac{1}{2\pi}\int P_f(\omega)\,d\omega$$

其中功率谱 $P_f(\omega)=\lim_{T\to\infty}\frac{1}{T}|F_T(\omega)|^2$。

### 8.3 两类信号对照

- **能量信号**：$E<\infty,\ P=0$；平方可积，$F(\omega)$ 有限存在；重建满足 $\int|\tilde f(t)-f(t)|^2dt=0$。
- **功率信号**：$P\neq0,\ P<\infty,\ E\to\infty$。

### 8.4 RMS 宽度

时间 RMS：

$$T_{\mathrm{rms}}\triangleq\sqrt{\frac{\int_{-\infty}^{\infty}t^2|x(t)|^2\,dt}{\int_{-\infty}^{\infty}|x(t)|^2\,dt}}$$

频率 RMS：

$$\omega_{\mathrm{rms}}\triangleq\sqrt{\frac{\int_{-\infty}^{\infty}\omega^2|X(\omega)|^2\,d\omega}{\int_{-\infty}^{\infty}|X(\omega)|^2\,d\omega}}$$

## 9. 微分方程与系统函数

### 9.1 齐次解

猜测形式 $y(t)=Ce^{st}$，代入得特征方程：

$$\sum_{k=0}^{N}a_k s^k=0$$

重根 $s_i$（重数 $r$）时：

$$y_h(t)=(C_1+C_2t+\cdots+C_r t^{r-1})e^{s_i t}+\sum_{i}C_i e^{s_i t}$$

### 9.2 初始静止（Initial Rest）

$$x(t)=0\ (t<t_0),\qquad y(t)=0\ (t<t_0),\qquad \frac{d^{n-1}}{dt^{n-1}}y(t_0)=0$$

### 9.3 特解（强迫响应）

$$y_p(t)=P_0 x(t)+P_1\frac{d}{dt}x(t)+\cdots$$

按激励形式设特解：

| 激励 | 特解形式 |
|---|---|
| $t^n$ | $P_0+P_1 t+\cdots+P_n t^n$ |
| $k\,u(t)$ | $P$ |
| $e^{at}$ | $P e^{at}$（重根时 $Pt\,e^{at}$） |
| $\cos\omega t$ | $P\cos\omega t+Q\sin\omega t$ |

### 9.4 系统函数

拉普拉斯变换定义：

$$H(s)=\int_{-\infty}^{\infty}h(t)\,e^{-st}\,dt$$

有理形式：

$$H(s)=\frac{\sum_k b_k s^k}{\sum_k a_k s^k}$$

频率响应 $H(j\omega)$ 由 $H(s)$ 令 $s=j\omega$ 得到。

典型 RC 低通：

$$H(s)=\frac{1}{1+sRC}$$

- 低通：$\dfrac{1}{1+RCj\omega}$，截止频率 $1/RC$；
- 高通：$\dfrac{RCj\omega}{1+RCj\omega}$，截止频率 $1/RC$。

幅频示意（手绘重绘）：

```
低通 LP                        高通 HP
|  ┌──────┐                    |╲
| /        \                   | ╲
|/          \                  |  ╲
+──────┬──────▶ ω             +───┬──────▶ ω
      1/RC                        1/RC
```

## 10. 速查补充

- 周期信号与冲激串卷积：$x(t)*\sum_n\delta(t-nT_0)$，频域按周期 $T_0$ 复制 $X(\omega)$。
- 傅里叶级数系数相乘/卷积对应关系：时域相乘 ⇒ 系数卷积 $c_k=\sum_l a_l b_{k-l}$；时域周期卷积 ⇒ 系数相乘 $d_k=a_k b_k$。
- 表格法分部积分（处理 $t^n$ 乘三角函数）：导数列 $x^2\to2x\to2\to0$，积数列 $\cos mx\to\frac{1}{m}\sin mx\to\cdots$，交叉连线取符号。
