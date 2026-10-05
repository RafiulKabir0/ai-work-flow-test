/**
 * Pure calculation functions for contest business logic
 */

/**
 * Calculate resource shortage status
 * Available < Required => 'Shortage'
 * Available >= Required => 'Sufficient'
 */
export function calculateResourceStatus(required, available) {
  const req = Number(required) || 0;
  const avail = Number(available) || 0;
  return avail < req ? 'Shortage' : 'Sufficient';
}

/**
 * Pending Tasks = number of assignments whose status is Pending
 */
export function calculatePendingTasks(assignments) {
  if (!Array.isArray(assignments)) return 0;
  return assignments.filter((a) => a.status === 'Pending').length;
}

/**
 * Active Volunteers = volunteers assigned to events whose status is Active
 * AND whose assignment status is NOT Completed.
 */
export function calculateActiveVolunteers(events, assignments) {
  if (!Array.isArray(events) || !Array.isArray(assignments)) return 0;

  // Build a lookup map of active event IDs and names for resilience
  const activeEventMap = new Map();
  events.forEach((evt) => {
    if (evt.status === 'Active') {
      activeEventMap.set(evt.id, true);
      activeEventMap.set(evt.name, true);
    }
  });

  // Filter assignments matching the rule
  const activeAssignments = assignments.filter((a) => {
    const isEventActive = activeEventMap.has(a.eventId) || activeEventMap.has(a.eventName);
    const isNotCompleted = a.status !== 'Completed';
    return isEventActive && isNotCompleted;
  });

  return activeAssignments.length;
}

/**
 * Calculate total resource shortages count
 */
export function calculateResourceShortages(resources) {
  if (!Array.isArray(resources)) return 0;
  return resources.filter((r) => calculateResourceStatus(r.requiredQuantity, r.availableQuantity) === 'Shortage').length;
}

/**
 * Get count of assigned volunteers for a specific event
 */
export function getAssignedVolunteerCount(event, assignments) {
  if (!Array.isArray(assignments) || !event) return 0;
  return assignments.filter(
    (a) => a.eventId === event.id || a.eventName === event.name
  ).length;
}
