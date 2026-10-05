/**
 * AI DevFest 2026 Contest - Synthetic Sample Dataset
 * Exactly matching contest specifications.
 * No real personal or private data.
 */

export const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    name: 'Campus Career Fair',
    date: '12 Oct 2026',
    location: 'Main Auditorium',
    status: 'Active' // Active, Upcoming, Completed
  },
  {
    id: 'evt-2',
    name: 'Freshers Orientation',
    date: '18 Oct 2026',
    location: 'Seminar Hall',
    status: 'Upcoming'
  },
  {
    id: 'evt-3',
    name: 'Programming Workshop',
    date: '22 Oct 2026',
    location: 'Lab 4',
    status: 'Upcoming'
  },
  {
    id: 'evt-4',
    name: 'Community Clean-up',
    date: '25 Oct 2026',
    location: 'East Gate',
    status: 'Completed'
  }
];

export const INITIAL_ASSIGNMENTS = [
  {
    id: 'asg-1',
    volunteerName: 'Asha Rahman',
    eventId: 'evt-1',
    eventName: 'Campus Career Fair',
    role: 'Registration',
    contactMethod: 'Email',
    status: 'Confirmed' // Pending, Confirmed, Completed
  },
  {
    id: 'asg-2',
    volunteerName: 'Tanvir Hasan',
    eventId: 'evt-1',
    eventName: 'Campus Career Fair',
    role: 'Stage Support',
    contactMethod: 'Phone',
    status: 'Pending'
  },
  {
    id: 'asg-3',
    volunteerName: 'Nabila Karim',
    eventId: 'evt-2',
    eventName: 'Freshers Orientation',
    role: 'Welcome Desk',
    contactMethod: 'Email',
    status: 'Confirmed'
  },
  {
    id: 'asg-4',
    volunteerName: 'Siam Ahmed',
    eventId: 'evt-3',
    eventName: 'Programming Workshop',
    role: 'Lab Support',
    contactMethod: 'Email',
    status: 'Pending'
  },
  {
    id: 'asg-5',
    volunteerName: 'Mitu Akter',
    eventId: 'evt-4',
    eventName: 'Community Clean-up',
    role: 'Team Lead',
    contactMethod: 'Phone',
    status: 'Completed'
  }
];

export const INITIAL_RESOURCES = [
  {
    id: 'res-1',
    resourceName: 'Chairs',
    eventId: 'evt-1',
    eventName: 'Campus Career Fair',
    requiredQuantity: 120,
    availableQuantity: 100
  },
  {
    id: 'res-2',
    resourceName: 'Registration Forms',
    eventId: 'evt-1',
    eventName: 'Campus Career Fair',
    requiredQuantity: 200,
    availableQuantity: 250
  },
  {
    id: 'res-3',
    resourceName: 'Projectors',
    eventId: 'evt-3',
    eventName: 'Programming Workshop',
    requiredQuantity: 2,
    availableQuantity: 1
  },
  {
    id: 'res-4',
    resourceName: 'Name Badges',
    eventId: 'evt-2',
    eventName: 'Freshers Orientation',
    requiredQuantity: 150,
    availableQuantity: 150
  },
  {
    id: 'res-5',
    resourceName: 'Gloves',
    eventId: 'evt-4',
    eventName: 'Community Clean-up',
    requiredQuantity: 60,
    availableQuantity: 80
  }
];
