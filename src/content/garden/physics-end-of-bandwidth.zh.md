---
title: "带宽的物理尽头：从 sinc 波瓣到不确定性原理"
description: "接着带宽这条线往下写的笔记：矩形脉冲为何变成 sinc，孔径衍射何以服从同一规律，以及这套结构如何接到不确定性原理。"
date: 2026-11-15
tags:
  - bandwidth
  - fourier
  - uncertainty
language: zh
status: seedling
draft: false
translationKey: physics-end-of-bandwidth
topic: physics
kind: note
---

## 方波出来的，为什么是 sinc

接着带宽这条线往下想。先从一个让人有点震惊的现象开始：把一个宽度为 $T$ 的矩形脉冲（rect）做傅里叶变换，得到的是一个 sinc 波形。

$$f(t)=\mathrm{rect}\!\left(\frac{t}{T}\right)\;\Longleftrightarrow\;F(\omega)=T\,\mathrm{sinc}\!\left(\frac{\omega T}{2}\right)$$

## 孔径衍射：同一道积分，换了件衣服

把目光移到物理里的孔径（狭缝衍射）。孔径上各点到远场观察方向 $\theta$ 的光程差随位置 $x$ 变化，场强写成积分：

$$E(\theta)=\int A(x)\,e^{-jk\Delta}\,dx=\int \mathrm{rect}\!\left(\frac{x}{D}\right)e^{jkx\theta}\,dx\propto \mathrm{sinc}\!\left(\frac{kD\theta}{2}\right)$$

这道积分的形状本身就是一次傅里叶变换，最后出来的依然是 sinc。主瓣两侧第一个零点满足

$$k\theta_0 D=\text{const}$$

空间上的「孔径宽度」和「角度展宽」乘起来是个常数——和时域里时宽乘频宽等于常数，是同一个规律。

## 把空间量读成时间量

两边其实是同一套相位语言：$\omega t=\phi$，$kx=\phi$，$\vec k\cdot\vec r=\phi$，相位都是「角频率乘时间」或者「波矢乘位置」。

令 $k_x=k\sin\theta\approx k\theta$，记作 $\omega_x$，孔径宽度记作 $T_x$，就有

$$\omega_x T_x=\text{const}$$

写法和时域的 $WT=\text{const}$ 一一对应，看起来就顺眼多了。

## 终极对照：位置–动量，时间–频率

走到这里，一个终极的对照就浮出来了。一边是量子力学的海森堡不确定性原理：

$$\Delta x\,\Delta p\ge \frac{\hbar}{2}$$

另一边是信号处理里的时频不确定关系（rms 宽度）：

$$\sigma_t\,\sigma_\omega\ge \frac{1}{2}$$

两者之间的桥是德布罗意关系：$p=\hbar k$，于是 $\Delta p_x=\hbar\,\Delta k_x$。位置对波矢的不确定，乘上 $\hbar$ 就是位置对动量的不确定；信号里时间对角频率的不确定，结构完全相同。

## 不等式的出处：从柯西–施瓦茨推到不对易

两个不等式长得这么像，要先看它们是怎么推出来的。共同的底座是柯西–施瓦茨不等式：

$$\langle u|u\rangle\,\langle v|v\rangle\ge|\langle u|v\rangle|^2$$

### 量子一侧

设 $|\psi\rangle$ 已归一化，定义中心化算符

$$\Delta\hat x=\hat x-\langle x\rangle,\qquad \Delta\hat p=\hat p-\langle p\rangle$$

方差就是它们在态上的内积：

$$\sigma_x^2=\langle(\Delta\hat x)^2\rangle,\qquad \sigma_p^2=\langle(\Delta\hat p)^2\rangle$$

取 $|u\rangle=\Delta\hat x|\psi\rangle$、$|v\rangle=\Delta\hat p|\psi\rangle$，代入柯西–施瓦茨：

$$\sigma_x^2\sigma_p^2\ge|\langle\Delta\hat x\,\Delta\hat p\rangle|^2$$

把乘积按作用顺序拆开，分成反对易部分和对易部分：

$$\Delta\hat x\,\Delta\hat p=\frac{1}{2}\{\Delta\hat x,\Delta\hat p\}+\frac{1}{2}[\Delta\hat x,\Delta\hat p]$$

花括号是反对易子，方括号是对易子。反对易子是厄米的，期望值为实数；对易子是反厄米的，期望值为纯虚数。两部分平方相加，模长平方只增不减，于是

$$|\langle\Delta\hat x\,\Delta\hat p\rangle|^2\ge\frac{1}{4}\left|\langle[\Delta\hat x,\Delta\hat p]\rangle\right|^2$$

到这一步，下限完全由对易子决定：对易子到底是不是零，成了关键。位置算符是「乘以 $x$」，动量算符是 $-i\hbar\dfrac{d}{dx}$，把它们先后作用在任意波函数 $\psi$ 上：

$$[\hat x,\hat p]\psi=x\left(-i\hbar\frac{d\psi}{dx}\right)-\left(-i\hbar\frac{d(x\psi)}{dx}\right)=i\hbar\psi$$

顺序换一下结果就不同，$xp\neq px$，所以

$$[\hat x,\hat p]=i\hbar\neq 0$$

代回原式：

$$\sigma_x^2\sigma_p^2\ge\frac{1}{4}|i\hbar|^2=\frac{\hbar^2}{4}\implies \sigma_x\sigma_p\ge\frac{\hbar}{2}$$

如果两个算符对易，对易子为零，这道下限就塌成零，柯西–施瓦茨给不出任何限制；正是不对易留下的这个虚部，撑起了不确定性的地板。

### 信号一侧的平行推导

信号侧的两套 rms 宽度与方差一一对应（按信号能量归一化）：

$$
\tau_{\rm rms}^2=\int t^2|f(t)|^2dt,\qquad
\omega_{\rm rms}^2=\int\omega^2|F(\omega)|^2d\omega=\int|f'(t)|^2dt
$$

时间算符 $\hat t$ 是「乘以 $t$」，频率算符 $\hat\omega=j\dfrac{d}{dt}$，同样把它们先后作用在信号 $f$ 上：

$$[\hat t,\hat\omega]f=t\left(j\frac{df}{dt}\right)-j\frac{d(tf)}{dt}=-jf$$

即

$$[\hat t,\hat\omega]=-j\neq 0$$

结构和 $[\hat x,\hat p]=i\hbar$ 一模一样。走同一条柯西–施瓦茨路径：

$$\sigma_t^2\sigma_\omega^2\ge\frac{1}{4}|\langle[\hat t,\hat\omega]\rangle|^2=\frac{1}{4}\implies \sigma_t\sigma_\omega\ge\frac{1}{2}$$

## 算符和它的基

顺着算符往下走，就碰到算符和基的关系：算符引出自己的基。如果

$$\hat A|\psi_n\rangle=a_n|\psi_n\rangle$$

$|\psi_n\rangle$ 就是 $\hat A$ 的本征函数，也正好是把这个算符对角化的那组基——对角矩阵元就是一串本征值 $[a_1,\dots,a_n]$。

典型的对应是这样：

- 时间算符 $\hat t$（乘以 $t$）的本征函数是 $\delta$ 函数：$\delta(t-T_0)$；
- 求导算符（也就是频率算符 $\hat\omega$）的本征函数是复指数平面波 $e^{j\omega t}$；
- 量子力学里，位置算符 $\hat x$ 的基是 $\delta(x-x_0)$，动量算符 $\hat p$ 的基是平面波 $\dfrac{1}{\sqrt{2\pi\hbar}}e^{ipx/\hbar}$。

换个角度看也一样：在频域里展开，时间算符表现为求导；求导算符就是频率算符。两套基互为傅里叶对偶。

## 傅里叶变换是一次基变换

最后一步，把变换本身看成基的切换。正变换用核 $U(\omega,t)=e^{-j\omega t}$：

$$F(\omega)=\int U(\omega,t)\,f(t)\,dt$$

逆变换用它的共轭（也就是逆算子）$U^{-1}=U^*=e^{j\omega t}$：

$$f(t)=\int U^{-1}(\omega,t)\,F(\omega)\,d\omega$$

傅里叶变换做的事情，就是在时间基和频率基之间换一套坐标系。

## 收尾

信号里的时宽与频宽不可兼得，量子里的位置与动量不可同时测准，底层是同一套数学：一对不对易的共轭变量，各自的本征函数构成一套基，而傅里叶变换就在这两套基之间来回切换。带宽思考走到物理这里，算是和不确定性原理接上了头。
