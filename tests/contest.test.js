import test from 'node:test';
import assert from 'node:assert/strict';

import { INITIAL_EVENTS, INITIAL_ASSIGNMENTS, INITIAL_RESOURCES } from '../src/constants/initialData.js';
import { TRANSLATIONS } from '../src/constants/translations.js';
import {
  calculateResourceStatus,
  calculatePendingTasks,
  calculateActiveVolunteers,
  calculateResourceShortages,
  getAssignedVolunteerCount,
} from '../src/utils/calculations.js';

test('1. Initial Sample Data Metrics Validation', () => {
  const totalEvents = INITIAL_EVENTS.length;
  const activeVolunteers = calculateActiveVolunteers(INITIAL_EVENTS, INITIAL_ASSIGNMENTS);
  const pendingTasks = calculatePendingTasks(INITIAL_ASSIGNMENTS);
  const resourceShortages = calculateResourceShortages(INITIAL_RESOURCES);

  assert.strictEqual(totalEvents, 4, 'Total Events must initially be 4');
  assert.strictEqual(activeVolunteers, 2, 'Active Volunteers must initially be 2');
  assert.strictEqual(pendingTasks, 2, 'Pending Tasks must initially be 2');
  assert.strictEqual(resourceShortages, 2, 'Resource Shortages must initially be 2');
});

test('2. Initial Shortage Items Validation', () => {
  const shortages = INITIAL_RESOURCES.filter(
    (r) => calculateResourceStatus(r.requiredQuantity, r.availableQuantity) === 'Shortage'
  );
  assert.strictEqual(shortages.length, 2, 'Exactly 2 shortages initially');
  const names = shortages.map((s) => s.resourceName);
  assert.ok(names.includes('Chairs'), 'Chairs must be in shortages');
  assert.ok(names.includes('Projectors'), 'Projectors must be in shortages');
});

test('3. Add and Edit Event Flow', () => {
  const events = [...INITIAL_EVENTS];
  const newEvent = {
    id: 'evt-test-1',
    name: 'Hackathon 2026',
    date: '30 Oct 2026',
    location: 'Auditorium B',
    status: 'Upcoming',
  };
  events.push(newEvent);
  assert.strictEqual(events.length, 5, 'Adding event should increment total events');

  // Edit existing event
  const updatedEvents = events.map((e) =>
    e.id === 'evt-1' ? { ...e, location: 'New Hall' } : e
  );
  const target = updatedEvents.find((e) => e.id === 'evt-1');
  assert.strictEqual(target.location, 'New Hall');
  assert.strictEqual(updatedEvents.find((e) => e.id === 'evt-2').location, 'Seminar Hall');
});

test('4. Volunteer Status Toggle: Tanvir Hasan from Pending to Completed', () => {
  let assignments = JSON.parse(JSON.stringify(INITIAL_ASSIGNMENTS));

  // Before change
  assert.strictEqual(calculatePendingTasks(assignments), 2);
  assert.strictEqual(calculateActiveVolunteers(INITIAL_EVENTS, assignments), 2);

  // Change Tanvir Hasan (asg-2) from Pending to Completed
  assignments = assignments.map((a) =>
    a.id === 'asg-2' ? { ...a, status: 'Completed' } : a
  );

  // After change
  assert.strictEqual(calculatePendingTasks(assignments), 1, 'Pending tasks should decrease from 2 to 1');
  assert.strictEqual(calculateActiveVolunteers(INITIAL_EVENTS, assignments), 1, 'Active volunteers should decrease from 2 to 1');

  // Change back to Pending
  assignments = assignments.map((a) =>
    a.id === 'asg-2' ? { ...a, status: 'Pending' } : a
  );
  assert.strictEqual(calculatePendingTasks(assignments), 2, 'Pending tasks should increase back to 2');
  assert.strictEqual(calculateActiveVolunteers(INITIAL_EVENTS, assignments), 2, 'Active volunteers should increase back to 2');
});

test('5. Resource Availability Toggle: Chairs Available from 100 to 120', () => {
  let resources = JSON.parse(JSON.stringify(INITIAL_RESOURCES));

  // Initial check
  const chairsBefore = resources.find((r) => r.resourceName === 'Chairs');
  assert.strictEqual(calculateResourceStatus(chairsBefore.requiredQuantity, chairsBefore.availableQuantity), 'Shortage');
  assert.strictEqual(calculateResourceShortages(resources), 2);

  // Update Chairs Available Quantity to 120
  resources = resources.map((r) =>
    r.resourceName === 'Chairs' ? { ...r, availableQuantity: 120 } : r
  );

  const chairsAfter = resources.find((r) => r.resourceName === 'Chairs');
  assert.strictEqual(calculateResourceStatus(chairsAfter.requiredQuantity, chairsAfter.availableQuantity), 'Sufficient');

  // Verify Projectors remains Shortage
  const projectors = resources.find((r) => r.resourceName === 'Projectors');
  assert.strictEqual(calculateResourceStatus(projectors.requiredQuantity, projectors.availableQuantity), 'Shortage');

  // Total shortages count should now be 1
  assert.strictEqual(calculateResourceShortages(resources), 1, 'Resource Shortages should decrease to 1');
});

test('6. Quantity Validation Rules', () => {
  assert.strictEqual(calculateResourceStatus(100, 100), 'Sufficient');
  assert.strictEqual(calculateResourceStatus(100, 101), 'Sufficient');
  assert.strictEqual(calculateResourceStatus(100, 99), 'Shortage');
  assert.strictEqual(calculateResourceStatus(0, 0), 'Sufficient');
});

test('7. Bilingual Key Equivalence Check', () => {
  const enKeys = Object.keys(TRANSLATIONS.en);
  const bnKeys = Object.keys(TRANSLATIONS.bn);

  assert.strictEqual(enKeys.length, bnKeys.length, 'English and Bangla translations must have equal keys');
  for (const key of enKeys) {
    assert.ok(key in TRANSLATIONS.bn, `Bangla dictionary missing key: ${key}`);
    assert.ok(typeof TRANSLATIONS.bn[key] === 'string' && TRANSLATIONS.bn[key].length > 0, `Bangla key ${key} must not be empty`);
  }
});
