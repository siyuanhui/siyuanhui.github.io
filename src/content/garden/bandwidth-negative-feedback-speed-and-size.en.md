---
title: "Bandwidth, Negative Feedback, and the Tradeoff Between Speed and Size"
description: "A note on bandwidth as a system's speed of reaction, how negative feedback makes a system faster at the cost of gain, and the tradeoff between speed and size."
date: 2026-11-15
tags:
  - bandwidth
  - feedback
language: en
status: seedling
draft: false
translationKey: bandwidth-negative-feedback-speed-and-size
topic: interdisciplinary
kind: note
---

## A Goal, and How Long It Takes to Pay Off

Start with something concrete: set yourself the goal of doing 10 pull-ups. Feed that goal into the system, and the question is how long it takes to get there.

Patience is key in life. But beyond patience, systems differ in how fast they react to an input. Some keep up with changes quickly; others lag half a beat. That reaction ability is bandwidth.

## A First-Order System: Reaction Time in the Time Constant

Take the simplest first-order LTI system, with transfer function

$$H(s)=\frac{1}{1+\tau s}$$

Here $\tau$ is the system's reaction time—the time constant; in a circuit it is RC.

For a unit-step input $u(t)$, the time-domain response is

$$x(t)=1-e^{-t/\tau}$$

The constant 1 maps to $1/s$, and $e^{-t/\tau}$ maps to $1/(s+1/\tau)$. The shorter the reaction time, the faster the system follows, and the higher its bandwidth:

$$W_B=\frac{1}{\tau}$$

## Failing to React in Time Is a Kind of Insensitivity

If the input changes faster than the system can respond ($W>W_B$), it cannot react in time, and that input is filtered out.

Some relationships are like that: drifting near and far, shifting again before you have time to react. For such inputs, the system does not react in time—and that is not necessarily a bad thing. Feng puts it this way: the system has its own insensitivity, and it keeps the wrong input out. That's a good thing.

Seen this way, bandwidth is essentially how sensitive a system is to noise, to input variation. Some systems need to be sensitive; others need a little insensitivity.

## To Become More Sensitive, Add Negative Feedback

To make a system react faster and more sensitively, feedback is needed. Practical systems almost always use negative feedback rather than positive feedback.

Negative feedback resembles a small guard basketball player's stop-and-go: before reaching the target, accelerate and push off; after reaching it, stabilize and stop.

Let the forward amplifier gain be $A$, the feedback factor $B$, the input $\text{In}$, and the output $\text{Out}$. The amplifier sees $\text{In}+B\cdot\text{Out}$:

$$A(\text{In}+B\,\text{Out})=\text{Out}$$

Rearranging gives the closed-loop transfer function:

$$\frac{\text{Out}}{\text{In}}=\frac{A}{1-AB}$$

For negative feedback, $B=-\beta$ with $\beta>0$, and the closed-loop gain is

$$A_f(s)=\frac{A(s)}{1+\beta A(s)}$$

Treat the open-loop amplifier as first-order, $A(s)=A_0/(1+\tau s)$, substitute and simplify:

$$
A_f(s)=\frac{A_0}{(1+\beta A_0)+\tau s}
=\frac{A_0}{1+\beta A_0}\cdot\frac{1}{1+s\,\frac{\tau}{1+\beta A_0}}
$$

The closed-loop DC gain is

$$A_{f0}=\frac{A_0}{1+\beta A_0}$$

As $A_0$ tends to infinity, $A_{f0}\to 1/\beta$: the final gain is determined almost entirely by the feedback factor $\beta$, and how good the original amplifier was stops mattering.

The closed-loop time constant becomes

$$\tau_f=\frac{\tau}{1+\beta A_0}$$

The time constant shrinks, the response speeds up, and the system becomes more sensitive. The closed-loop pole sits at

$$
s=-\frac{1+\beta A_0}{\tau}=-\omega_f,\qquad
\omega_f=\frac{1+\beta A_0}{\tau}=\omega_o(1+\beta A_0)
$$

where $\omega_o=1/\tau$ is the open-loop bandwidth. The larger the original $A_0$, the more the bandwidth climbs after feedback—almost shooting through the roof.

## Speed and Size, Pick One

But feedback does not come for free. The product of closed-loop gain and closed-loop bandwidth stays constant:

$$A_f\cdot\omega_f=\text{const}$$

Substituting the results above, $A_{f0}\omega_f=\frac{A_0}{1+\beta A_0}\cdot\frac{1+\beta A_0}{\tau}=\frac{A_0}{\tau}$, the open-loop gain–bandwidth product. Feedback only redistributes gain and bandwidth; it does not change the product itself.

Push the gain down to open up bandwidth; hold onto the gain and the bandwidth has to narrow. A system cannot be both high-gain and fast; the emphasis has to be chosen according to need.

The same holds for life: wanting to be faster means you cannot be bigger; wanting to be bigger means you cannot be faster—the same in the NBA. That's tradeoff, that's life. What's important is what do you want, and choose the life you want.

## A Circuit Example: Source Degeneration

Source degeneration is one such negative-feedback structure: a resistor $R_s$ in series with the source feeds a fraction of the output current back to the input loop.

The feedback voltage is $V_{rs}=V_{in}-V_s$, equivalent to subtracting $I_{\text{out}}R_s$; the output current is $I_{\text{out}}=g_m V_{rs}$, and the feedback factor is $\beta=R_s$. The closed-loop transconductance is

$$G_{m,f}=\frac{-g_m}{1+g_m R_s}$$

When $g_m R_s\gg 1$:

$$G_{m,f}\approx -\frac{1}{R_s}$$

In exchange for giving up some gain, the circuit gets better linearity and stability.

## Closing

Bandwidth, in the end, is reaction speed—and sensitivity to noise. Negative feedback makes a system faster at the cost of some gain. It is the same in engineering as in choosing a path: first decide whether you want speed or size, then take the road that goes with it.
