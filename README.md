# OrçaPiso

A small React and TypeScript application that helps a flooring installer prepare an initial material and labor estimate from room dimensions and tile package details.

**Portfolio:** Marcos Neves · Marcos Solutions  
**Project type:** one-week front-end study  
**Status:** source code and calculation tests are included; the full Vite install/build and browser review still need to be run in an environment that can reach the npm registry.

## Business problem

Small flooring jobs are often estimated with manual calculations. It is easy to overlook package rounding, a cutting reserve, or the labor component. OrçaPiso puts those assumptions in one place and produces a clear estimate before a purchase or customer conversation.

The app uses fictional sample values and performs all calculations in the browser. It does not place orders, issue invoices, or replace a site measurement.

## Features

- Room dimensions and live area calculation.
- Tile dimensions, grout gap, cutting reserve, and tiles per package.
- Whole-package rounding so the estimate does not suggest buying a fraction of a box.
- Separate material and labor totals, plus an estimated cost per square meter.
- Input validation with field-level messages and focus on the first invalid field after submission.
- JSON export of the inputs and calculated estimate.
- Responsive layout and native form controls with associated labels.

## Calculation model

1. Room area = length × width.
2. Approximate tile grid pitch = (tile side + grout gap) for each side.
3. Base tile count = ceiling(room area ÷ approximate tile coverage).
4. Required tile count = ceiling(base tile count × (1 + reserve percentage)).
5. Boxes = ceiling(required tile count ÷ tiles per box).
6. Material cost = boxes × price per box.
7. Labor cost = room area × labor rate per square meter.

This is a simplified grid estimate. It does not calculate a detailed laying pattern or account for diagonal placement, irregular rooms, cut optimization, breakage beyond the selected reserve, thresholds, skirting, mortar, grout material, floor preparation, transport, taxes, or supplier-specific coverage. The grout adjustment is an approximation, not a construction specification.

## Tech stack

- React 18
- TypeScript 5
- Vite 5
- Node.js built-in test runner for calculation rules

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Test and build

```bash
npm test
npm run build
```

`npm test` compiles the calculation module with TypeScript and runs the Node.js test suite. The checked-in test suite covers validation boundaries, package rounding, grout-gap behavior, and cost totals.

The calculation tests were executed during preparation: **13 passed, 0 failed**. The complete React/Vite build and interactive browser checks were not run in this environment because the npm registry hostname could not be resolved (`EAI_AGAIN` / DNS lookup failure). Do not treat the full app as build-verified until `npm install`, `npm test`, and `npm run build` have been run locally.

## Accessibility notes

The interface uses visible labels associated with inputs, native controls, keyboard-operable buttons, `aria-invalid`, field error descriptions, a form-level alert, and focus management for the first invalid field. These are implementation choices, not a claim of WCAG conformance. A keyboard-only review, screen-reader review, and browser-based accessibility audit remain to be completed.

## Project structure

```text
src/
  App.tsx             React interface and interactions
  calculator.ts       Pure validation and calculation rules
  main.tsx            React entry point
  styles.css          Responsive visual styles
scripts/
  calculator.test.mjs Node.js test runner suite
```

## Demo scenario

The initial fictional example uses a 5.2 m × 3.4 m room, 60 cm × 60 cm tiles, a 2 mm grout gap, 10% reserve, 4 tiles per box, R$ 89.90 per box, and R$ 42.00/m² labor. Change the inputs and observe the package count and total update.

## Limitations and next steps

- No backend, database, authentication, or supplier price integration.
- No saved customer or project history.
- No detailed geometric layout or cutting plan.
- No browser screenshot or video is included because the interface could not be launched without installing dependencies.
- Next validation: install dependencies, run the full build, test keyboard navigation and error focus in a browser, then capture a real demo.
