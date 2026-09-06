# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

GitHub profile README: GitHub-Flavored Markdown, GitHub's permitted HTML subset, and repository-owned image assets. A local static preview may emulate GitHub for review, but the shipped profile must not depend on custom CSS, JavaScript, iframes, or a separate runtime.

## Users

The primary reader is an employee, WordPress or AI practitioner, open-source collaborator, or potential enterprise customer who has reached Noel's GitHub profile and wants to understand what he actually builds. General AI practitioners are welcome, but the WordPress concentration should emerge naturally from the work rather than through exaggerated positioning.

## Product Purpose

Turn Noel's GitHub profile into a concise, living index of his current work, writing, and way of building. Success means a first-time visitor quickly understands the relationship between his WordPress work, agent tooling, and creative experiments, then opens a relevant project or field note.

## Positioning

The profile is grounded in working software at the intersection of WordPress infrastructure and serious AI-agent workflows. It demonstrates that position through specific repositories, packages, and writing rather than generic AI claims, vanity metrics, or a long biography.

## Operating Context

The README appears above Noel's pinned repositories on GitHub and must remain useful in light and dark themes and at narrow widths. The current repository is a dormant 2019 React portfolio; Noel explicitly authorized replacing it completely. Development and review happen locally first. No changes may be pushed until Noel approves the demo.

## Capabilities and Constraints

- The public repository must remain named `noeltock/noeltock` with a non-empty root `README.md` on its default branch.
- GitHub renders GFM and a restricted HTML subset; shipping content cannot rely on page CSS, JavaScript, forms, iframes, video, or inline SVG.
- Theme-aware images use `<picture>` with light and dark assets.
- Important visuals and generated content are committed to the repository rather than hotlinked from fragile public widget services.
- The first screen must keep real project links easy to reach, including on mobile.
- The profile may use a GitHub Action to curate recent releases and writing, but an update failure must leave the last good content intact.

## Brand Commitments

Use Noel Tock's name and plain, direct voice. Let concrete work establish the WordPress-and-AI identity. Preserve the balance of readable prose, monospace notation, restrained but distinctive motion, and evidence-led presentation established by his personal AI page. Avoid badge walls, counters, trophies, generic skill icons, synthetic statistics, and inflated leadership claims.

## Evidence on Hand

Current work includes Prompt Relay, Block Runner, Codex Review, Accelerate AI Toolkit, Aphelion, Wesper, and Asciara. The article “The 5 Levels of Agentic WordPress” is the initial long-form evidence. `tiltShift.js` is established older work. Exact descriptions and destinations must be sourced from the live repositories, packages, or Noel's personal site before publication.

## Product Principles

1. Show the work before explaining the identity.
2. Curate relationships between projects instead of reproducing the pinned-repository list.
3. Use GitHub's native vocabulary as material, not as decoration.
4. Prefer repository-owned, durable assets and generated sections over third-party widgets.
5. Keep the profile concise above the fold and let deeper history remain optional.

## Accessibility & Inclusion

Every meaningful image needs useful alternative text; decorative animation needs an equivalent text structure and must not be the only path to project links. Motion should be calm, non-essential, and readable from a still first frame.
