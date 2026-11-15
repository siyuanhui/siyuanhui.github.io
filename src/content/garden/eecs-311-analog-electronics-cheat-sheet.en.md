---
title: "EECS 311 Analog Electronics Cheat Sheet"
description: "A cheat sheet compiled from three handwritten sheets, covering semiconductor basics and diodes, BJT, MOSFET, single-stage amplifiers, differential pairs, op-amps and feedback, frequency response, and the Miller effect."
date: 2026-11-15
tags:
  - analog
  - circuits
  - semiconductors
language: en
status: seedling
draft: false
translationKey: eecs-311-analog-electronics-cheat-sheet
topic: semiconductors
kind: reference
course: EECS 311
courses:
  - EECS 311
---

> Compiled from three handwritten cheat sheets, covering semiconductor basics and diodes, BJT, MOSFET, single-stage amplifiers, differential pairs, op-amps and feedback, frequency response, and the Miller effect. Notation: $V_T=kT/q$; $g_m$ transconductance, $r_o$ output resistance, $r_\pi$ base input resistance, $\eta=g_{mb}/g_m$. A few handwritten derivations are messy in the original and are flagged in place; verify against the course slides before relying on them.

## 1. Semiconductor Basics and Diode

### 1.1 Materials and Doping

- Donors (group V): P, As; acceptors (group III): B, Ga (Si is group IV).
- Charge neutrality: $x_n N_d=x_p N_a$; $N_d\uparrow \Rightarrow$ depletion width $x\downarrow$.
- Forward bias: depletion width $x\downarrow$; reverse bias: $x\uparrow$.
- Carrier concentration: $N_d=n_i e^{\phi/V_T}$, with $V_T=kT/q$.

### 1.2 Diode Large-Signal Equation

$$I_D=I_S\left(e^{qV_D/kT}-1\right)$$

$$V_D=\frac{kT}{q}\ln\!\left(\frac{I_D}{I_S}+1\right)$$

Voltage difference between two identical diodes at currents $I_1,I_2$:

$$\Delta V=\frac{kT}{q}\ln\!\left(\frac{I_1}{I_2}\right)=\text{const}\times T$$

## 2. BJT

### 2.1 Large-Signal Model

Current relations:

$$I_E=I_B+I_C,\qquad I_C=\beta I_B,\qquad I_B=\frac{I_C}{\beta},\qquad I_E=\frac{I_C}{\alpha},\qquad \alpha=\frac{\beta}{\beta+1}$$

Exponential law (NPN uses $V_{BE}$, PNP uses $V_{EB}$):

$$I_C=I_S\,e^{V_{BE}/V_T}$$

With Early effect:

$$I_C=I_S\,e^{V_{BE}/V_T}\left(1+\frac{V_{CE}}{V_A}\right)$$

Regions: Active / Saturation / Cutoff; in active mode $V_{BE}\approx0.7\,\text{V}$, $V_{BC}<0$.

### 2.2 Small-Signal Hybrid-π Model

$$g_m=\frac{I_C}{V_T}=\frac{\partial I_C}{\partial V_{BE}}$$

$$r_\pi=\frac{\beta}{g_m}=\frac{\partial V_{BE}}{\partial I_B}=\frac{\beta}{\partial I_C/\partial V_{BE}}$$

$$r_o=\frac{\partial V_{CE}}{\partial I_C}=\frac{V_A}{I_C}$$

T-model emitter resistance:

$$r_e=\frac{V_T}{I_E}=\frac{r_\pi}{1+\beta}$$

Terminal input resistance: B: $r_\pi$, C: $r_o$, E: $1/g_m$.

Hybrid-π small-signal model (sketch):

```
        rπ              gm vbe
B ──/\/\/\──┬──────────▶──────────┬── C
            │                      │
           vbe                    ro
            │                      │
E ─────────┴──────────────────────┴── E
```

## 3. MOSFET (NMOS)

### 3.1 Operating Regions

Cut-off / Saturation / Ohmic (triode).

**Triode region**

$$I_D=\mu_n C_{ox}\frac{W}{L}\left[(V_{GS}-V_{TH})V_{DS}-\tfrac12 V_{DS}^2\right]$$

**Saturation region**

$$I_D=\tfrac12\mu_n C_{ox}\frac{W}{L}(V_{GS}-V_{TH})^2(1+\lambda V_{DS})$$

Saturation condition: $V_{DS}>V_{GS}-V_{TH}=V_{OV}$; overdrive margin $V_{DS}-(V_{GS}-V_{TH})$.

### 3.2 Small-Signal Parameters

Transconductance, three equivalent forms:

$$g_m=\mu_n C_{ox}\frac{W}{L}(V_{GS}-V_{TH})(1+\lambda V_{DS})=\frac{\partial I_D}{\partial V_{GS}}$$

$$g_m=\sqrt{2\mu_n C_{ox}\frac{W}{L}I_D(1+\lambda V_{DS})}=\frac{2I_D}{V_{GS}-V_{TH}}=\frac{2I_D}{V_{OV}}$$

Output resistance:

$$r_o=\frac{\partial V_{DS}}{\partial I_D}=\frac{1}{\lambda I_D}$$

Body-effect transconductance:

$$g_{mb}=\frac{\partial I_D}{\partial V_{BS}}=\left(\frac{\partial I_D}{\partial V_{TH}}\right)\left(\frac{\partial V_{TH}}{\partial V_{BS}}\right)=\eta g_m$$

Threshold body effect:

$$V_{TH}=V_{TH0}+\gamma\left(\sqrt{|2\Phi_F+V_{SB}|}-\sqrt{|2\Phi_F|}\right)$$

$$\Phi_F=\frac{kT}{q}\ln\!\left(\frac{N_{sub}}{n_i}\right)$$

Overdrive voltage:

$$V_{OV}=\sqrt{\frac{2I_D}{\mu_n C_{ox}(W/L)}}$$

Triode on-resistance:

$$R_{on}\approx\frac{1}{\mu_n C_{ox}(W/L)(V_{GS}-V_T)}$$

MOS small-signal model (sketch):

```
G ──┬──────────────────────┬── D
    │   gm vgs             │ ro
   vgs                    gmb vbs
    │                      │
S ──┴──────────────────────┴── S
```

Input resistance (no body effect): $Z_{in}=\frac{1}{g_m}\parallel r_o\approx\frac{1}{g_m}$; with body effect: $Z_{in}=\frac{1}{g_m}\parallel\frac{1}{g_{mb}}\parallel r_o$.

## 4. Single-Stage Amplifiers

### 4.1 Common-Source CS (with source degeneration $R_s$)

$$R_{out}=\big(r_o+R_s+(g_m+g_{mb})r_o R_s\big)\parallel R_D\approx r_o\parallel R_D$$

$$G_m=\frac{-g_m}{1+g_m R_s}\approx-\frac{1}{R_s}$$

$$A_v=\frac{-g_m R_D}{1+g_m R_s}\longrightarrow-\frac{R_D}{R_s}$$

- No source degeneration: $A_v=-g_m R_D$; with degeneration: $A_v\approx -R_D/R_s$.

### 4.2 Common-Drain CD (Source Follower)

$$R_{out}=\frac{R_D+r_o}{1+(g_m+g_{mb})r_o}\parallel R_s\longrightarrow \frac{1}{g_m+g_{mb}}\parallel R_s$$

$$G_m=\frac{g_m}{1+R_D/r_o},\qquad A_v=\frac{g_m R_s}{1+g_m R_s+g_{mb}}\approx\frac{1}{1+\eta}$$

### 4.3 Common-Gate CG

$$R_{out}=\big(r_o+R_s+(g_m+g_{mb})r_o R_s\big)\parallel R_D$$

$$G_m=\frac{(g_m+g_{mb})r_o+1}{R_{out}},\qquad R_{in}=\frac{R_D+r_o}{1+(g_m+g_{mb})r_o}$$

$$A_v=R_o g_m(1+\eta)$$

### 4.4 BJT Counterparts

- Gain: $A_v=-g_m(R_C\parallel r_o)$.
- Equivalent collector resistance:

$$R_C=r_o+(R_E\parallel r_\pi)+g_m r_o(R_E\parallel r_\pi)$$

- Input resistance:

$$R_{in}=r_\pi\parallel\frac{r_o+R_C}{g_m r_o+1}=\frac{1}{g_m}+\frac{R_C}{g_m r_o}$$

## 5. Differential Pair

### 5.1 Differential and Common Mode

$$V_o=A_d V_{id}+A_{cm}V_{ic}$$

$$V_{id}=V_{i2}-V_{i1},\qquad V_{ic}=\tfrac12(V_{i1}+V_{i2})$$

$$CMRR=\left|\frac{A_d}{A_{cm}}\right|,\qquad CMRR_{dB}=20\log_{10}CMRR$$

### 5.2 Gain and Transconductance

$$A_v=\frac{g_{m1}}{g_{m2}}=\sqrt{\frac{(W/L)_1}{(W/L)_2}}=\frac{V_{GS2}-V_T}{V_{GS1}-V_T}$$

$$A_v\approx g_{m1}(r_{o1}\parallel r_{o2}),\qquad G_m=(g_{m1}+g_{m2})(r_{o1}\parallel r_{o2})$$

- Half circuit: each side contributes ½; tail current-source resistance $R_{SS}$.
- Differential transconductance with tail resistance:

$$G_m=-g_m\frac{r_o}{R_{SS}r_o+g_m r_o R_{SS}}$$

### 5.3 Active Load

- DC: devices are diode-connected; AC differential: equivalent to current sources.
- Sizing match: $C_1/C_2=S_1/S_2$ (area ratio, $W\times L$).
- Output swing: $(V_{O1}+V_{OL})/2$, $V_{O1}=V_{OD}$;

$$\frac{V_{DD}-V_{OL}}{R_D}=\tfrac12\mu_n C_{ox}\frac{W}{L}(V_{OL})^2,\qquad V_{OL}=V_{GS}-V_{TH}$$

## 6. Op-Amp and Feedback

### 6.1 Ideal Op-Amp

$Z_{in}\to\infty$, $Z_{out}\to0$, open-loop gain $A\to\infty$.

### 6.2 Inverting Amplifier

$$A_v=-\frac{R_2}{R_1},\qquad 1+\frac{R_2}{R_1},\qquad \beta=\frac{R_1}{R_1+R_2}$$

Closed-loop gain (finite open-loop $A$):

$$\frac{V_{out}}{V_{in}}=\frac{A}{1+A\beta}$$

### 6.3 Differential Amplifier

$$V_o=-\frac{R_2}{R_1}V_{i1}+\frac{1}{\beta}\frac{R_2}{R_1+R_2}V_{i2}$$

### 6.4 Loaded Output

$$V_{out,load}=V_{out,open}\frac{R_L}{R_{out}+R_L}=G_m V_{in}\frac{R_{out}R_L}{R_{out}+R_L}$$

## 7. Frequency Response, Poles, and Miller Effect

### 7.1 Complex-Frequency Impedance

$$s=j\omega,\qquad Z_C=\frac{1}{sC},\qquad Z_L=sL$$

Zero-pole form of the transfer function:

$$H(s)=\frac{V_o(s)}{V_i(s)}=k\,\frac{\pi(s-z)}{\pi(s-p)}$$

### 7.2 Decibels and −3 dB Bandwidth

$$|H(j\omega)|_{dB}=20\log|H(j\omega)|$$

$$20\log\frac{1}{\sqrt2}=-3\,\text{dB},\qquad f_{-3dB}=\frac{1}{2\pi\tau}$$

### 7.3 Single Pole (LHP)

$$A(j\omega)=\frac{A_0}{1+s/\omega_b},\qquad \omega_b=\frac{1}{\tau},\qquad f=\frac{1}{2\pi\tau}$$

Gain–bandwidth product: $A_0\omega_b=GBWP$.

Sum of time constants (open-circuit time-constant method):

$$\tau=\sum\frac{1}{\omega_i}=\sum\frac{1}{2\pi f_i}=\frac{1}{2\pi f}=\sum\tau_i$$

### 7.4 DC/AC Gains and First-Order Transfer Function

$$H^0=H(s)\big|_{DC},\qquad H'=H(s)\big|_{AC}$$

Time constant: $\tau=R_{seen}C$ (capacitor) or $\tau=L/R_{seen}$ (inductor).

First order:

$$H(s)=\frac{H^0+H'\tau s}{1+\tau s},\qquad z=-\frac{1}{\tau}\frac{H^0}{H'},\qquad p=-\frac{1}{\tau}$$

### 7.5 Dominant Pole and Second Order

- Dominant pole: $p=\sigma+j\omega$; the smallest $|\sigma|$ sets $\tau_{total}$.
- $\tau_2=R_{seen}C_2$, $\tau_{total}=\tau_1+\tau_2$, $\tau_1=R_{seen}C_1$.
- Exact second-order form:

$$H(s)=\frac{H^0}{(1+s/\omega_1)(1+s/\omega_2)}$$

−3 dB condition:

$$\left[1+\left(\frac{f}{f_1}\right)^2\right]\left[1+\left(\frac{f}{f_2}\right)^2\right]=2$$

### 7.6 Miller Effect

An impedance $Z$ bridging input and output reflects to the input/output side as:

$$Z_1=\frac{Z}{1-A_v},\qquad Z_2=\frac{Z}{1-1/A_v}$$

Equivalent capacitances:

$$C_1=C(1-A_v),\qquad C_2=C(1-1/A_v)$$

Miller zero: $V_x C_S=g_m V_x$,

$$f_z=\frac{g_m}{2\pi C_F},\qquad \omega_T=\frac{g_m}{C_{GD}},\qquad f_z=\frac{\omega_z}{2\pi}$$

### 7.7 CS Stage Bandwidth Estimate

$$\omega_{in}=\frac{1}{R_S\big[C_{GS}+(1+g_m R_D)C_{GD}\big]}$$

$$\omega_{out}=\frac{1}{R_D(C_{DB}+C_{GD})}$$

## 8. Quick Reference

- Decibel definition:

$$dB=10\log_{10}\frac{P_2}{P_1}=20\log_{10}\frac{V_2}{V_1}$$

- Current-sharing check: $V_{DS2}\downarrow$, $V_{S1}>V_{S2}$, compare $V_{GS1}<V_{GS2}$.
- The bias-network derivations for $R_1,R_2,R_3$ ($H^0,H',R_{in}$) are densely written in the original and are not transcribed line by line here; check against the worked examples in lecture.
