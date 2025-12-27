# Rental Car Maintenance & Mileage Tracking Specification

## Overview
This document describes how mileage tracking and periodic maintenance should work in a rental car management application.

---

## Car Mileage

- Each car has its **own mileage counter**.
- When a car is first added:
  - The mileage is **set by the user**.
  - If no value is provided, the default mileage is **0 km**.
- After **every completed rental**, the user must **update the car’s mileage**.
- Mileage updates are critical to ensure maintenance schedules remain accurate.

---

## Periodic Maintenance Rules

- Maintenance is managed using **distance-based counters (kilometers)**.
- Each maintenance task has a configurable interval.

### Examples
- Oil Change → every **10,000 km**
- Tire Rotation → every **20,000 km**
- Brake Inspection → every **30,000 km**

Each maintenance task stores:
- Last maintenance mileage
- Maintenance interval (km)
- Next maintenance due mileage

---

## Maintenance Monitoring Logic

- Whenever mileage is updated:
  - The system recalculates the remaining distance for all maintenance tasks.
  - If the current mileage is equal to or greater than the next due mileage, the task is flagged.

### Maintenance Status
- ✅ **Up to Date**
- ⚠️ **Due Soon** (approaching interval)
- ❌ **Overdue** (interval exceeded)

---

## Summaries & Insights

### Per-Car Summary
- Current mileage
- List of maintenance tasks with status
- Remaining kilometers until next maintenance
- Maintenance history log

### Fleet Summary
- Cars with overdue maintenance
- Cars approaching maintenance intervals
- Recently completed maintenance tasks

---

## Goal

The goal of this system is to:
- Keep vehicle mileage accurate
- Automate maintenance tracking
- Prevent missed or overdue maintenance
- Improve fleet reliability and operational efficiency

---

## Notes

- Mileage updates are **manual** and occur after rentals.
- Maintenance intervals are **fully configurable**.
- The system should prioritize clarity and visibility of maintenance status.
