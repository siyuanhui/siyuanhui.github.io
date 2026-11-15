---
title: "The Physics End of Bandwidth: From Sinc Lobes to the Uncertainty Principle"
description: "A follow-on note on bandwidth: why a rectangular pulse transforms to a sinc, how aperture diffraction follows the same rule, and how that structure leads to the uncertainty principle."
date: 2026-11-15
tags:
  - bandwidth
  - fourier
  - uncertainty
language: en
status: seedling
draft: false
translationKey: physics-end-of-bandwidth
topic: physics
kind: note
---

## Why a Rectangular Pulse Gives a Sinc

Picking up the thread of bandwidth, start with a striking observation: take a rectangular pulse of width $T$ and apply the Fourier transform, and what comes out is a sinc waveform.

$$f(t)=\mathrm{rect}\!\left(\frac{t}{T}\right)\;\Longleftrightarrow\;F(\omega)=T\,\mathrm{sinc}\!\left(\frac{\omega T}{2}\right)$$

## Aperture Diffraction: The Same Integral in a Different Coat

Move to an aperture (slit diffraction) in physics. Along the aperture, the path difference to a far-field observation direction $\theta$ varies with position $x$, and the field writes as an integral:

$$E(\theta)=\int A(x)\,e^{-jk\Delta}\,dx=\int \mathrm{rect}\!\left(\frac{x}{D}\right)e^{jkx\theta}\,dx\propto \mathrm{sinc}\!\left(\frac{kD\theta}{2}\right)$$

The shape of this integral is itself a Fourier transform, and the result is again a sinc. The first zero on either side of the main lobe satisfies

$$k\theta_0 D=\text{const}$$

The product of "aperture width" and "angular spread" in space is a constant—the same rule as duration times bandwidth in the time domain.

## Reading Spatial Quantities as Temporal Ones

Both sides speak the same phase language: $\omega t=\phi$, $kx=\phi$, $\vec k\cdot\vec r=\phi$; a phase is either angular frequency times time, or wave vector times position.

Set $k_x=k\sin\theta\approx k\theta$, call it $\omega_x$, and call the aperture width $T_x$:

$$\omega_x T_x=\text{const}$$

This maps one-to-one onto $WT=\text{const}$ in the time domain, which makes the analogy much easier to see.

## The Ultimate Parallel: Position–Momentum, Time–Frequency

At this point an ultimate parallel comes into view. On one side is the Heisenberg uncertainty principle in quantum mechanics:

$$\Delta x\,\Delta p\ge \frac{\hbar}{2}$$

On the other is the time–frequency uncertainty relation in signal processing (rms widths):

$$\sigma_t\,\sigma_\omega\ge \frac{1}{2}$$

The bridge between them is the de Broglie relation: $p=\hbar k$, so $\Delta p_x=\hbar\,\Delta k_x$. Uncertainty in position versus wave vector, multiplied by $\hbar$, becomes uncertainty in position versus momentum; uncertainty in time versus angular frequency has exactly the same structure.

## Where the Inequality Comes From: Cauchy–Schwarz Leading to Non-Commutativity

To see why the two inequalities look alike, start from how they are derived. The shared foundation is the Cauchy–Schwarz inequality:

$$\langle u|u\rangle\,\langle v|v\rangle\ge|\langle u|v\rangle|^2$$

### Quantum side

Let $|\psi\rangle$ be normalized and define the centered operators

$$\Delta\hat x=\hat x-\langle x\rangle,\qquad \Delta\hat p=\hat p-\langle p\rangle$$

The variances are their inner products in the state:

$$\sigma_x^2=\langle(\Delta\hat x)^2\rangle,\qquad \sigma_p^2=\langle(\Delta\hat p)^2\rangle$$

Take $|u\rangle=\Delta\hat x|\psi\rangle$ and $|v\rangle=\Delta\hat p|\psi\rangle$, and substitute into Cauchy–Schwarz:

$$\sigma_x^2\sigma_p^2\ge|\langle\Delta\hat x\,\Delta\hat p\rangle|^2$$

Split the product by order of action into anticommutator and commutator parts:

$$\Delta\hat x\,\Delta\hat p=\frac{1}{2}\{\Delta\hat x,\Delta\hat p\}+\frac{1}{2}[\Delta\hat x,\Delta\hat p]$$

The braces are the anticommutator, the brackets the commutator. The anticommutator is Hermitian, so its expectation is real; the commutator is anti-Hermitian, so its expectation is purely imaginary. Squaring and adding the two parts only increases the modulus, hence

$$|\langle\Delta\hat x\,\Delta\hat p\rangle|^2\ge\frac{1}{4}\left|\langle[\Delta\hat x,\Delta\hat p]\rangle\right|^2$$

At this point the lower bound is set entirely by the commutator: whether it vanishes is what matters. The position operator is "multiply by $x$"; the momentum operator is $-i\hbar\dfrac{d}{dx}$. Apply them in sequence to an arbitrary wavefunction $\psi$:

$$[\hat x,\hat p]\psi=x\left(-i\hbar\frac{d\psi}{dx}\right)-\left(-i\hbar\frac{d(x\psi)}{dx}\right)=i\hbar\psi$$

Swapping the order changes the result, $xp\neq px$, so

$$[\hat x,\hat p]=i\hbar\neq 0$$

Substituting back:

$$\sigma_x^2\sigma_p^2\ge\frac{1}{4}|i\hbar|^2=\frac{\hbar^2}{4}\implies \sigma_x\sigma_p\ge\frac{\hbar}{2}$$

If the operators commuted, the commutator would be zero, the floor would collapse to zero, and Cauchy–Schwarz would give no restriction at all. It is this imaginary part left by non-commutativity that holds up the uncertainty floor.

### Parallel derivation on the signal side

The two signal-side rms widths correspond to the variances (normalized by signal energy):

$$
\tau_{\rm rms}^2=\int t^2|f(t)|^2dt,\qquad
\omega_{\rm rms}^2=\int\omega^2|F(\omega)|^2d\omega=\int|f'(t)|^2dt
$$

The time operator $\hat t$ is "multiply by $t$"; the frequency operator $\hat\omega=j\dfrac{d}{dt}$. Apply them in sequence to the signal $f$:

$$[\hat t,\hat\omega]f=t\left(j\frac{df}{dt}\right)-j\frac{d(tf)}{dt}=-jf$$

that is,

$$[\hat t,\hat\omega]=-j\neq 0$$

The structure is identical to $[\hat x,\hat p]=i\hbar$. Following the same Cauchy–Schwarz path:

$$\sigma_t^2\sigma_\omega^2\ge\frac{1}{4}|\langle[\hat t,\hat\omega]\rangle|^2=\frac{1}{4}\implies \sigma_t\sigma_\omega\ge\frac{1}{2}$$

## Operators and Their Bases

Following operators further leads to the relation between an operator and its basis: an operator brings forth its own basis. If

$$\hat A|\psi_n\rangle=a_n|\psi_n\rangle$$

then $|\psi_n\rangle$ is an eigenfunction of $\hat A$, and precisely the basis that diagonalizes the operator—the diagonal entries are the eigenvalues $[a_1,\dots,a_n]$.

The typical correspondences are:

- The time operator $\hat t$ (multiply by $t$) has eigenfunctions that are delta functions: $\delta(t-T_0)$;
- The derivative operator (that is, the frequency operator $\hat\omega$) has eigenfunctions that are complex-exponential plane waves $e^{j\omega t}$;
- In quantum mechanics, the basis of the position operator $\hat x$ is $\delta(x-x_0)$, and the basis of the momentum operator $\hat p$ is the plane wave $\dfrac{1}{\sqrt{2\pi\hbar}}e^{ipx/\hbar}$.

Viewed the other way around: expanded in the frequency domain, the time operator appears as a derivative; the derivative operator is the frequency operator. The two bases are Fourier duals of each other.

## The Fourier Transform as a Change of Basis

The last step is to treat the transform itself as a switch of basis. The forward transform uses the kernel $U(\omega,t)=e^{-j\omega t}$:

$$F(\omega)=\int U(\omega,t)\,f(t)\,dt$$

The inverse transform uses its conjugate (the inverse operator) $U^{-1}=U^*=e^{j\omega t}$:

$$f(t)=\int U^{-1}(\omega,t)\,F(\omega)\,d\omega$$

What the Fourier transform does is swap from the time basis to the frequency basis.

## Closing

Duration and bandwidth cannot both be maximized in signals, just as position and momentum cannot both be measured precisely in quantum mechanics; underneath sits the same mathematics: a pair of non-commuting conjugate variables, each with eigenfunctions forming a basis, and the Fourier transform moving back and forth between those two bases. Following bandwidth into physics finally connects it to the uncertainty principle.
