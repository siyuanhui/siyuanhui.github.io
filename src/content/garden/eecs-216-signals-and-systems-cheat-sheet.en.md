---
title: "EECS 216 Signals and Systems Cheat Sheet"
description: "A cheat sheet compiled from handwritten notes, covering basic signals and systems, convolution, Fourier series and transform, sampling and reconstruction, energy and power, differential equations, and system functions."
date: 2026-11-15
tags:
  - signals
  - systems
  - fourier
language: en
status: seedling
draft: false
translationKey: eecs-216-signals-and-systems-cheat-sheet
topic: mathematics
kind: reference
course: EECS 216
courses:
  - EECS 216
---

> Compiled from handwritten cheat sheets, covering basic signals and systems, convolution, Fourier series, Fourier transform, sampling and reconstruction, energy/power, differential equations, and system functions. Convention: $F(\omega)=\int f(t)e^{-j\omega t}\,dt$, inverse transform with the $1/(2\pi)$ factor; $\mathrm{sinc}(x)=\sin(\pi x)/(\pi x)$.

## 1. Basic Definitions

### 1.1 Signals and Systems

- **Signal**: a physical quantity that varies with time and space; essentially a function.
- **System**: a physical device that performs an operation on a signal; essentially a map (function).

### 1.2 Periodic Signals

There exists $T>0$ such that

$$x(t+T)=x(t)$$

- Two periodic signals are commensurate when $n_1T_1=n_2T_2$; $T$ is the fundamental period.
- A periodic signal extends one basic waveform:

$$x(t)=\sum_{n=-\infty}^{\infty}x_0(t-nT)$$

### 1.3 Even and Odd Signals

$$\text{Even:}\quad x(t)=x(-t)$$

$$\text{Odd:}\quad x(t)+x(-t)=0$$

Any signal decomposes into even and odd parts:

$$x_e(t)=\tfrac{1}{2}\big[x(t)+x(-t)\big],\qquad x_o(t)=\tfrac{1}{2}\big[x(t)-x(-t)\big]$$

### 1.4 Average Value, Energy, and Average Power

**Average value**

$$A\triangleq \lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}x(t)\,dt \;\;=\;\; \frac{1}{T}\int_{T}x(t)\,dt \quad\text{(periodic)}$$

**Energy**

$$E\triangleq \int_{-\infty}^{\infty}|x(t)|^2\,dt$$

**Average power**

$$P=\lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}x^2(t)\,dt \;\;=\;\; \frac{1}{T}\int_{T}x^2(t)\,dt \quad\text{(periodic)}$$

- **Energy signal**: $E<\infty \Rightarrow P=0$.
- **Power signal**: $E\to\infty$ and $P<\infty$.

## 2. Elementary Signals

### 2.1 Unit Step

$$u(t)\triangleq \begin{cases}1,& t>0\\[2pt]0,& t<0\end{cases}$$

$$u\!\left(\frac{t-t_0}{\tau}\right)=u(t-t_0),\qquad \frac{d}{dt}u(t)=\delta(t)$$

### 2.2 Rectangular Pulse

$$\mathrm{rect}(t)\triangleq \begin{cases}1,& -\tfrac12<t<\tfrac12\\[2pt]0,& \text{otherwise}\end{cases}=u\!\left(t+\tfrac12\right)-u\!\left(t-\tfrac12\right)$$

$$\mathrm{rect}\!\left(\frac{t-t_0}{\tau}\right)=u\!\left(\frac{t-t_0+\tau/2}{\tau}\right)-u\!\left(\frac{t-t_0-\tau/2}{\tau}\right)$$

- Parameters: $t_0$ is the center, $\tau$ is the width.
- Derivative:

$$\frac{d}{dt}\mathrm{rect}\!\left(\frac{t-t_0}{\tau}\right)=\frac{1}{\tau}\left[\delta\!\left(\frac{t-t_0+\tau/2}{\tau}\right)-\delta\!\left(\frac{t-t_0-\tau/2}{\tau}\right)\right]$$

### 2.3 Triangular Pulse

$$\mathrm{tri}(t)\triangleq (1-|t|)\,\mathrm{rect}\!\left(\frac{t}{2}\right)$$

$\mathrm{tri}\!\left(\frac{t-t_0}{\tau}\right)$ is centered at $t_0$ with width $2\tau$.

### 2.4 Properties of the Impulse $\delta(t)$

1. $\displaystyle\int_{-\infty}^{\infty}\delta(t-t_0)\,dt=1,\quad \forall t_0\in\mathbb{R}$
2. $\displaystyle\delta(at+b)=\frac{1}{|a|}\delta\!\left(t+\frac{b}{a}\right)$
3. $\delta(t)=\delta(-t)$ (even)
4. $\delta(t-t_0)=0,\quad t\neq t_0$
5. $\displaystyle\int_{-\infty}^{t}\delta(\tau)\,d\tau=u(t)$
6. **Sampling**: $x(t)\,\delta(t-t_0)=x(t_0)\,\delta(t-t_0)$
7. **Sifting**: $\displaystyle\int_{-\infty}^{\infty}x(t)\,\delta(t-t_0)\,dt=x(t_0)$

## 3. System Properties

### 3.1 Linearity

Homogeneity plus additivity:

$$T\big[\alpha_1 x_1(t)+\alpha_2 x_2(t)\big]=\alpha_1 T\big[x_1(t)\big]+\alpha_2 T\big[x_2(t)\big]$$

It also holds for integrals:

$$T\!\left[\int x(t,v)\,dv\right]=\int T\!\big[x(t,v)\big]\,dv$$

### 3.2 Stability (BIBO Stable)

Bounded-input bounded-output:

$$|x(t)|\le M_1 \;\Longrightarrow\; |y(t)|\le M_2$$

### 3.3 Invertibility

Each input maps to a unique output; an inverse system exists such that $h(t)*h_i(t)=\delta(t)$.

### 3.4 Causality

The output depends only on the present and past input: $x(t_0),\ t_0\le t$; the impulse response satisfies

$$h(t)=0,\quad t<0$$

### 3.5 Memoryless (Static)

The output depends only on the current instant: $t_0=t$; the impulse response is

$$h(t)=k\,\delta(t)$$

### 3.6 Time Invariance

$$\big[x(t)\xrightarrow{T}y(t)\big]\iff \big[x(t-t_0)\xrightarrow{T}y(t-t_0)\big]$$

"Delay then transform" equals "transform then delay":

```
x(t) ──delay t0──▶ x(t-t0) ──system T──▶ y(t-t0)
x(t) ──system T──▶ y(t)     ──delay t0──▶ y(t-t0)   (same result ⇒ TI)
```

- $x(at+b)$ is time-invariant only when $a=1$; otherwise it is not TI.
- Examples:
  - $y(t)=\displaystyle\int_{-\infty}^{t}x(\tau)\,d\tau$ ✔ TI
  - $y(t)=\displaystyle\int_{-t}^{t}x(\tau)\,d\tau$ ✗ not TI
  - $y(t)=\displaystyle\int_{t-1}^{t}x(\tau)\,d\tau$ ✔ TI

### 3.7 Summary via Impulse Response

| Property | Impulse-response condition |
|---|---|
| Causal | $h(t)=0,\ t<0$ |
| Memoryless | $h(t)=k\,\delta(t)$ |
| BIBO stable | $\displaystyle\int_{-\infty}^{\infty}|h(t)|\,dt<\infty$ |
| Invertible | $h(t)*h_i(t)=\delta(t)$ |

## 4. LTI Systems and Convolution

### 4.1 Impulse Response and Convolution Integral

The response to a unit impulse is the impulse response:

$$\delta(t)\xrightarrow{T}h(t)$$

Decompose the signal into impulses:

$$x(t)=\int_{-\infty}^{\infty}x(\tau)\,\delta(t-\tau)\,d\tau=x(t)*\delta(t)$$

The LTI output:

$$y(t)=x(t)*h(t)=\int_{-\infty}^{\infty}x(\tau)\,h(t-\tau)\,d\tau$$

### 4.2 Algebraic Properties of Convolution

- Commutative: $x*h=h*x$
- Associative: $(x*y)*z=x*(y*z)$
- Cascade: $x*(h_1*h_2)=(x*h_1)*h_2$
- Identity: $x(t)*\delta(t)=x(t)$
- Shift: $x(t)*\delta(t-t_0)=x(t-t_0)$; $\delta(t-t_0)*\delta(t-t_1)=\delta(t-t_0-t_1)$
- Combined shift: $x(t-t_0)*h(t-t_1)=y(t-t_0-t_1)$

Cascade block diagram:

```
x(t) ──▶ ┌──────┐ ──▶ ┌──────┐ ──▶ y(t)
         │ h1(t) │     │ h2(t) │
         └──────┘     └──────┘
Equivalent to y(t) = x(t) * h1(t) * h2(t)
```

### 4.3 Useful Convolution Properties

- Integral relation:

$$\int_{-\infty}^{\infty}y(t)\,dt=\left[\int_{-\infty}^{\infty}x(t)\,dt\right]\left[\int_{-\infty}^{\infty}h(t)\,dt\right]$$

- Scaling:

$$x(at)*y(at)=\frac{1}{|a|}y(at)$$

- Convolution with step (integration):

$$f(t)*u(t)=\int_{-\infty}^{t}f(\tau)\,d\tau$$

- Differentiation:

$$\frac{d}{dt}y(t)=\left[\frac{d}{dt}x(t)\right]*h(t)=\left[\frac{d}{dt}h(t)\right]*x(t)$$

### 4.4 Common Convolution Results

| Convolution | Result |
|---|---|
| $u(t)*u(t)$ | $t\,u(t)=r(t)$ |
| $u(t)*e^{-at}u(t)$ | $\dfrac{1}{a}\big(1-e^{-at}\big)u(t)$ |
| $f(t)*\sum_m\delta(t-mT)$ | $\displaystyle\sum_{m=-\infty}^{\infty}f(t-mT)$ |
| $\mathrm{rect}(t)*\mathrm{rect}(t)$ | $\mathrm{tri}(t)$ |
| $\dfrac{1}{a}\mathrm{rect}\!\left(\frac{t-t_0}{a}\right)*\mathrm{rect}\!\left(\frac{t-t_1}{a}\right)$ | $\mathrm{tri}\!\left(\frac{t-t_0-t_1}{a}\right)$ |
| $e^{-at}u(t)*e^{-bt}u(t)$ | $\dfrac{e^{-at}-e^{-bt}}{b-a}\,u(t)$ |
| $e^{-at}u(t)*e^{-at}u(t)$ | $t\,e^{-at}u(t)$ |

### 4.5 Step Response

$$s(t)=u(t)*h(t)=\int_{-\infty}^{t}h(\tau)\,d\tau$$

A step input $u(t)$ gives $s(t)$; the impulse response is the derivative of the step response:

$$h(t)=\frac{ds(t)}{dt}$$

## 5. Fourier Series (FS)

### 5.1 Analysis and Synthesis

Period $T_0$, fundamental angular frequency $\omega_0=2\pi/T_0$:

$$x(t)=\sum_{k=-\infty}^{\infty}C_k\,e^{jk\omega_0 t}$$

$$C_k=\frac{1}{T_0}\int_{T_0}x(t)\,e^{-jk\omega_0 t}\,dt,\qquad C_0=\frac{1}{T_0}\int_{T_0}x(t)\,dt$$

Coefficients can also be sampled from the Fourier transform: $C_k=\dfrac{1}{T_0}F(\omega)\big|_{\omega=k\omega_0}$.

### 5.2 Steady-State Response of an LTI System to a Periodic Input

$$x(t)=\sum_k C_k e^{jk\omega_0 t}\;\xrightarrow{h(t)}\;y(t)=\sum_k C_k\,H(jk\omega_0)\,e^{jk\omega_0 t}$$

where

$$H(jk\omega_0)=\int_{-\infty}^{\infty}h(t)\,e^{-jk\omega_0 t}\,dt$$

For sinusoidal components $x(t)=\sum_k A_k\cos(\omega_k t+\phi_k)$:

$$y(t)=\sum_k A_k|H(j\omega_k)|\cos\big(\omega_k t+\phi_k+\angle H(j\omega_k)\big)+H(0)A_0$$

### 5.3 Fourier Series Properties

| Operation | Coefficient change |
|---|---|
| Delay $b$: $x(t-b)$ | $C_k\,e^{jk\omega_0 b}$ |
| Scaling $x(at+b)$ | $\omega_1=a\omega_0$ |
| Reversal $t\to -t$ | $d_k=C_{-k}$ |
| Conjugation | $d_k=C_{-k}^{*}$ |
| Frequency shift $x(t)e^{j\omega_0 t N}$ | $d_k=C_{k-N}$ |
| Time differentiation | $H(jk\omega_0)=jk\omega_0$ |
| Multiplication $x_1x_2$ (coeffs $a_k,b_k$) | $c_k=\sum_l a_l b_{k-l}$ |
| Periodic convolution | $d_k=a_k b_k$ |
| Linear $ax+b$ | DC: $b+aC_0$; AC: $aC_k$ |

### 5.4 Power and Parseval

$$P=\frac{1}{T_0}\int_{T_0}|x(t)|^2\,dt=\sum_{k=-\infty}^{\infty}|C_k|^2$$

Series of a periodic impulse train:

$$\sum_{k=-\infty}^{\infty}\frac{1}{T_0}e^{jk\omega_0 t}=\sum_n\delta(t-nT_0)$$

$$\sum_{k=-\infty}^{\infty}\frac{W}{T_0}\mathrm{sinc}\!\left(\frac{kW}{T_0}\right)e^{jk\omega_0 t}=\sum_n\mathrm{rect}\!\left(\frac{t-nT_0}{W}\right)$$

> The original sheet also notes a total harmonic distortion (THD) item with rather messy handwriting, in the form $(1-2|C_1|^2/P)\cdot100\%$; verify against the course slides before using it.

## 6. Fourier Transform (FT)

### 6.1 Forward and Inverse Transform

$$F(\omega)\triangleq\int_{-\infty}^{\infty}f(t)\,e^{-j\omega t}\,dt$$

$$f(t)=\frac{1}{2\pi}\int_{-\infty}^{\infty}F(\omega)\,e^{j\omega t}\,d\omega$$

### 6.2 Common Transform Pairs

| Time domain | Frequency domain |
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

- $\delta(\omega)$ corresponds to $e^{j\omega t}$, a power signal; $\delta(t)$ contains every frequency.

### 6.3 Transform Properties

| Property | Time domain | Frequency domain |
|---|---|---|
| Scale and shift | $f(at+b)$ | $\dfrac{1}{|a|}e^{j\omega b/a}F(\omega/a)$ |
| Duality | $F(t)$ | $2\pi f(-\omega)$ |
| Time differentiation | $\dfrac{d^k}{dt^k}f(t)$ | $(j\omega)^k F(\omega)$ |
| Frequency differentiation | $(-jt)^n f(t)$ | $\dfrac{d^n}{d\omega^n}F(\omega)$ |
| Multiply by $t$ | $t\,f(t)$ | $j\,\dfrac{d}{d\omega}F(\omega)$ |
| Frequency shift | $e^{j\omega_0 t}f(t)$ | $F(\omega-\omega_0)$ |
| Integration | $\displaystyle\int_{-\infty}^{t}f(\tau)\,d\tau$ | $\dfrac{F(\omega)}{j\omega}+\pi F(0)\delta(\omega)$ |
| Conjugation | $f^*(t)$ | $F^*(-\omega)$ |
| Multiply by $u(t)$ | $g(t)=f(t)*u(t)$ | $F(\omega)\,U(\omega)$ |

**Sampled values**

$$f(0)=\frac{1}{2\pi}\int_{-\infty}^{\infty}F(\omega)\,d\omega,\qquad F(0)=\int_{-\infty}^{\infty}f(t)\,dt$$

### 6.4 Symmetry

- Real $f(t)$ $\Rightarrow$ $F(\omega)=F^*(-\omega)$ (Hermitian symmetry).
- Real and even $\Rightarrow$ real and even spectrum; real and odd $\Rightarrow$ purely imaginary and odd spectrum.
- Even: $F(\omega)=F(-\omega)$.

### 6.5 Correlation and Power Spectrum

Autocorrelation:

$$\gamma_{xx}(t)=x(t)*x^*(-t)\;\longleftrightarrow\;S_{xx}(\omega)=|X(\omega)|^2$$

Cross-correlation:

$$\gamma_{xy}=x(t)*y^*(-t)\;\longleftrightarrow\;S_{xy}(\omega)=X(\omega)Y(\omega)$$

Power spectrum (finite-window $X_T$):

$$P_x(\omega)=\lim_{T\to\infty}\frac{|X_T(\omega)|^2}{T}$$

### 6.6 Discrete-Time Fourier Transform (DTFT)

$$X(\Omega)=\sum_{n=-\infty}^{\infty}x[n]\,e^{-j\Omega n},\qquad x[n]=\frac{1}{2\pi}\int_{2\pi}X(\Omega)\,e^{j\Omega n}\,d\Omega$$

Periodicity: $X(\Omega+2\pi)=X(\Omega)$. Relation to the continuous spectrum after sampling:

$$X(\omega)=T_s X(\Omega),\quad |\omega|<\omega_s/2;\qquad X(\omega)=0,\quad \text{otherwise}$$

### 6.7 Multiplication–Convolution Duality

$$m(t)n(t)\;\longleftrightarrow\;\frac{1}{2\pi}M(\omega)*N(\omega)$$

$$m(t)*n(t)\;\longleftrightarrow\;M(\omega)N(\omega)$$

## 7. Sampling and Reconstruction

### 7.1 Block Diagram

Time domain:

```
          p(t)
           │
           ▼
x(t) ──⊗──▶ x_s(t) ──▶ h(t) ──▶ x_r(t)
```

Frequency domain:

```
X(ω) ──▶ P(ω)/2π ──▶ X_s(ω) ──⊗──▶ X_r(ω)
                                  ▲
                               H(ω)
```

### 7.2 Impulse-Train Sampling

$$p(t)=\sum_{n=-\infty}^{\infty}\delta(t-nT_s)$$

$$P(\omega)=\frac{2\pi}{T_s}\sum_{k=-\infty}^{\infty}\delta(\omega-k\omega_s)$$

Sampled signal:

$$x_s(t)=\sum_{n=-\infty}^{\infty}x(nT_s)\,\delta(t-nT_s)$$

$$X_s(\omega)=\frac{1}{2\pi}X(\omega)*P(\omega)=\frac{1}{T_s}\sum_{k=-\infty}^{\infty}X(\omega-k\omega_s)$$

If the sampling pulse is a periodic rectangular train:

$$p(t)=\sum_{n=-\infty}^{\infty}\frac{1}{\tau}\,\mathrm{rect}\!\left(\frac{t-nT_s}{\tau}\right),\qquad C_k=\frac{1}{T_s}\mathrm{sinc}\!\left(\frac{k\tau\omega_s}{2\pi}\right)$$

$$X_s(\omega)=\sum_k\frac{1}{T_s}\mathrm{sinc}\!\left(\frac{k\tau\omega_s}{2\pi}\right)X(\omega-k\omega_s)$$

### 7.3 Aliasing and Anti-Aliasing Filter

- No-aliasing condition: $\omega_s>2W_{\max}$ (otherwise aliasing occurs).
- The reconstruction low-pass cutoff must satisfy:

$$W_{\max}<\omega_c<\omega_s-W_{\max}$$

### 7.4 Three Reconstruction Filters

**① Ideal low-pass (sinc interpolation)**

$$H(\omega)=T_s\,\mathrm{rect}\!\left(\frac{\omega}{2\omega_c}\right),\qquad h(t)=\frac{\omega_c T_s}{\pi}\mathrm{sinc}\!\left(\frac{\omega_c t}{\pi}\right)$$

$$x_r(t)=h(t)*x_s(t)=\sum_n x(nT_s)\frac{\omega_c T_s}{\pi}\mathrm{sinc}\!\left(\frac{\omega_c(t-nT_s)}{\pi}\right)$$

When $\omega_r=\omega_s/2$ (Nyquist rate):

$$x_r(t)=\sum_n x(nT_s)\,\mathrm{sinc}\!\left(\frac{t-nT_s}{T_s}\right)$$

**② Zero-order hold (ZOH)**

$$H(\omega)=T_s\,\mathrm{sinc}\!\left(\frac{\omega}{\omega_s}\right)e^{-j\omega T_s/2}$$

$$h(t)=\mathrm{rect}\!\left(\frac{t}{T_s}-\frac12\right),\qquad x(t)=\sum_n x(nT_s)\,\mathrm{rect}\!\left(\frac{t-nT_s}{T_s}-\frac12\right)$$

**③ First-order hold (FOH)**

$$H(\omega)=T_s\,\mathrm{sinc}^2\!\left(\frac{\omega}{\omega_s}\right)$$

$$h(t)=\mathrm{tri}\!\left(\frac{t}{T_s}\right)=\mathrm{rect}\!\left(\frac{t}{T_s}\right)*\mathrm{rect}\!\left(\frac{t}{T_s}\right)\frac{1}{T_s}$$

$$x(t)=\sum_n x(nT_s)\,\mathrm{tri}\!\left(\frac{t-nT_s}{T_s}\right)$$

### 7.5 rect–sinc Duality

$$\mathrm{rect}\!\left(\frac{t}{2T}\right)\;\longrightarrow\;\frac{2\sin(\omega T/2)}{\omega}=T\,\mathrm{sinc}\!\left(\frac{\omega T}{2\pi}\right)$$

$$\frac{\sin(Wt)}{\pi t}\;\longrightarrow\;\mathrm{rect}\!\left(\frac{\omega}{2W}\right)=\frac{W}{\pi}\mathrm{sinc}\!\left(\frac{W}{\pi}t\right)$$

- Pulse-width example: if the first sinc zero corresponds to $\sin(k\pi/4)/(k\pi)$, then $W/T_0=1/4$, i.e. $W=T_0/4$.

## 8. Energy, Power, and RMS

### 8.1 Energy Signal

$$E=\int_{-\infty}^{\infty}|x(t)|^2\,dt=\frac{1}{2\pi}\int_{-\infty}^{\infty}|X(\omega)|^2\,d\omega$$

### 8.2 Power Signal

$$P=\lim_{T\to\infty}\frac{1}{T}\int_{-T/2}^{T/2}|f(t)|^2\,dt$$

Periodic:

$$P=\frac{1}{T}\int_{-T/2}^{T/2}|f(t)|^2\,dt=\sum_k|C_k|^2=\frac{1}{2\pi}\int P_f(\omega)\,d\omega$$

with power spectrum $P_f(\omega)=\lim_{T\to\infty}\frac{1}{T}|F_T(\omega)|^2$.

### 8.3 Two Signal Classes

- **Energy signal**: $E<\infty,\ P=0$; square-integrable, $F(\omega)$ exists and is finite; reconstruction satisfies $\int|\tilde f(t)-f(t)|^2dt=0$.
- **Power signal**: $P\neq0,\ P<\infty,\ E\to\infty$.

### 8.4 RMS Widths

Time RMS:

$$T_{\mathrm{rms}}\triangleq\sqrt{\frac{\int_{-\infty}^{\infty}t^2|x(t)|^2\,dt}{\int_{-\infty}^{\infty}|x(t)|^2\,dt}}$$

Frequency RMS:

$$\omega_{\mathrm{rms}}\triangleq\sqrt{\frac{\int_{-\infty}^{\infty}\omega^2|X(\omega)|^2\,d\omega}{\int_{-\infty}^{\infty}|X(\omega)|^2\,d\omega}}$$

## 9. Differential Equations and System Functions

### 9.1 Homogeneous Solution

Assume the form $y(t)=Ce^{st}$; substitution gives the characteristic equation:

$$\sum_{k=0}^{N}a_k s^k=0$$

For a repeated root $s_i$ with multiplicity $r$:

$$y_h(t)=(C_1+C_2t+\cdots+C_r t^{r-1})e^{s_i t}+\sum_{i}C_i e^{s_i t}$$

### 9.2 Initial Rest

$$x(t)=0\ (t<t_0),\qquad y(t)=0\ (t<t_0),\qquad \frac{d^{n-1}}{dt^{n-1}}y(t_0)=0$$

### 9.3 Particular (Forced) Response

$$y_p(t)=P_0 x(t)+P_1\frac{d}{dt}x(t)+\cdots$$

Choose the particular form by excitation type:

| Excitation | Particular form |
|---|---|
| $t^n$ | $P_0+P_1 t+\cdots+P_n t^n$ |
| $k\,u(t)$ | $P$ |
| $e^{at}$ | $P e^{at}$ ($Pt\,e^{at}$ for repeated root) |
| $\cos\omega t$ | $P\cos\omega t+Q\sin\omega t$ |

### 9.4 System Function

Laplace definition:

$$H(s)=\int_{-\infty}^{\infty}h(t)\,e^{-st}\,dt$$

Rational form:

$$H(s)=\frac{\sum_k b_k s^k}{\sum_k a_k s^k}$$

The frequency response $H(j\omega)$ follows from $H(s)$ by setting $s=j\omega$.

Typical RC low-pass:

$$H(s)=\frac{1}{1+sRC}$$

- Low-pass: $\dfrac{1}{1+RCj\omega}$, cutoff $1/RC$;
- High-pass: $\dfrac{RCj\omega}{1+RCj\omega}$, cutoff $1/RC$.

Magnitude sketches (redrawn from hand drawings):

```
Low-pass LP                    High-pass HP
|  ┌──────┐                    |╲
| /        \                   | ╲
|/          \                  |  ╲
+──────┬──────▶ ω             +───┬──────▶ ω
      1/RC                        1/RC
```

## 10. Quick Reference Notes

- Periodic signal convolved with an impulse train: $x(t)*\sum_n\delta(t-nT_0)$; the spectrum replicates $X(\omega)$ every $T_0$.
- Multiplication vs. convolution in the time domain: time multiplication $\Rightarrow$ coefficient convolution $c_k=\sum_l a_l b_{k-l}$; periodic convolution $\Rightarrow$ coefficient product $d_k=a_k b_k$.
- Tabular integration by parts (for $t^n$ times trigonometric functions): derivative column $x^2\to2x\to2\to0$, integral column $\cos mx\to\frac{1}{m}\sin mx\to\cdots$, connect diagonally with alternating signs.
