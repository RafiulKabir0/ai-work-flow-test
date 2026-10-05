/**
 * Centralized Bilingual Translation System (English & Bangla)
 * Covers all UI elements, navigation, tables, dialogs, status badges, forms, and messages.
 */

export const TRANSLATIONS = {
  en: {
    // App Header
    appName: 'Community Event Resource & Volunteer Tracker',
    appShortName: 'EventTracker',
    appSubtitle: 'Unified organizer workspace for events, volunteers, tasks & inventory',
    workspaceStatus: 'Live Workspace',

    // Navigation Tabs
    navDashboard: 'Dashboard',
    navEvents: 'Events',
    navVolunteers: 'Volunteer Assignments',
    navResources: 'Resources',

    // Dashboard Metric Cards
    metricTotalEvents: 'Total Events',
    metricActiveVolunteers: 'Active Volunteers',
    metricPendingTasks: 'Pending Tasks',
    metricResourceShortages: 'Resource Shortages',
    metricTotalEventsDesc: 'All scheduled & managed events',
    metricActiveVolunteersDesc: 'Assigned to active events (not completed)',
    metricPendingTasksDesc: 'Assignments pending confirmation',
    metricResourceShortagesDesc: 'Items with available < required',
    quickFilter: 'Quick Filter',
    viewAll: 'View All',
    breakdown: 'Breakdown',
    activeEventsCount: 'Active Events',
    upcomingEventsCount: 'Upcoming Events',
    completedEventsCount: 'Completed Events',
    confirmedVolunteers: 'Confirmed Assignments',
    completedTasks: 'Completed Tasks',
    sufficientResources: 'Sufficient Resources',

    // Common Actions & Buttons
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    saving: 'Saving...',
    update: 'Update',
    close: 'Close',
    actions: 'Actions',
    search: 'Search',
    filterByStatus: 'Filter by Status',
    allStatuses: 'All Statuses',
    confirm: 'Confirm',
    resetToSampleData: 'Reset to Sample Data',
    exportData: 'Export Data',
    exportCSV: 'Export CSV',
    exportJSON: 'Export JSON',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    status: 'Status',
    date: 'Date',
    location: 'Location',
    role: 'Role',
    contact: 'Contact',
    event: 'Event',
    selectEvent: 'Select an event',

    // Event Management
    eventsTitle: 'Event Management',
    eventsSubtitle: 'Schedule, track, and monitor community and campus events',
    addEvent: 'Add New Event',
    editEvent: 'Edit Event',
    eventName: 'Event Name',
    eventDate: 'Event Date',
    eventLocation: 'Location',
    eventStatus: 'Event Status',
    assignedVolunteersCount: 'Assigned Volunteers',
    searchEventsPlaceholder: 'Search events by name or location...',
    noEventsFound: 'No events found matching your search or filter.',
    noEventsPrompt: 'Click "Add New Event" to register an upcoming event.',

    // Volunteer Assignments
    volunteersTitle: 'Volunteer Assignments',
    volunteersSubtitle: 'Coordinate roles, contact methods, and assignment progression',
    addAssignment: 'Add Volunteer Assignment',
    editAssignment: 'Edit Assignment',
    volunteerName: 'Volunteer Name',
    volunteerRole: 'Role / Responsibility',
    contactMethod: 'Contact Method',
    assignmentStatus: 'Assignment Status',
    filterByAssignmentStatus: 'Filter Assignments',
    searchVolunteersPlaceholder: 'Search by volunteer name, role, or event...',
    noAssignmentsFound: 'No volunteer assignments match the current filter.',
    noAssignmentsPrompt: 'Click "Add Volunteer Assignment" to assign volunteers to events.',
    changeStatus: 'Change Status',
    quickStatusChange: 'Quick Status Change',

    // Resource Management
    resourcesTitle: 'Resource & Inventory Management',
    resourcesSubtitle: 'Monitor required vs. available inventory and resolve shortages',
    addResource: 'Add Resource',
    editResource: 'Edit Resource',
    resourceName: 'Resource Name',
    requiredQuantity: 'Required Quantity',
    availableQuantity: 'Available Quantity',
    shortageStatus: 'Availability Status',
    showShortagesOnly: 'Show Shortages Only',
    showAllResources: 'Show All Resources',
    searchResourcesPlaceholder: 'Search resources or events...',
    noResourcesFound: 'No resources match your filter criteria.',
    noResourcesPrompt: 'Click "Add Resource" to track materials and equipment.',

    // Status Names
    statusActive: 'Active',
    statusUpcoming: 'Upcoming',
    statusCompleted: 'Completed',
    statusPending: 'Pending',
    statusConfirmed: 'Confirmed',
    statusShortage: 'Shortage',
    statusSufficient: 'Sufficient',

    // Contact Methods
    contactEmail: 'Email',
    contactPhone: 'Phone',
    contactOther: 'Other',

    // Validation & Alerts
    requiredField: 'This field is required.',
    nameCannotBeBlank: 'Name cannot be blank.',
    quantityMustBeNumber: 'Quantity must be a valid number.',
    quantityNonNegative: 'Quantity must be non-negative (>= 0).',
    eventMustBeSelected: 'Please select a valid event.',
    savedSuccessfully: 'Record saved successfully!',
    updatedSuccessfully: 'Record updated successfully!',
    statusUpdated: 'Status updated to',
    resetSuccess: 'Application reset to initial sample data.',
    backupDownloaded: 'Backup file downloaded successfully.',

    // Business Rules Explanation Modal
    businessRulesTitle: 'Contest Business Rules',
    ruleShortage: 'Resource Shortage: Available < Required (Sufficient when Available >= Required)',
    rulePending: 'Pending Tasks: Count of assignments with "Pending" status',
    ruleActiveVolunteers: 'Active Volunteers: Volunteers assigned to "Active" events and NOT "Completed"',
    rulePersistence: 'Persistence: Saved in browser localStorage (survives refresh and language toggle)',

    // Footer
    footerText: 'Community Event Resource & Volunteer Tracker',
    cleanArchitecture: 'Client-Only Architecture • Zero Backend • Browser LocalStorage Persistence'
  },

  bn: {
    // App Header
    appName: 'কমিউনিটি ইভেন্ট রিসোর্স ও ভলান্টিয়ার ট্র্যাকার',
    appShortName: 'ইভেন্ট ট্র্যাকার',
    appSubtitle: 'ইভেন্ট, স্বেচ্ছাসেবক, অসমাপ্ত কাজ ও সামগ্রী ব্যবস্থাপনার সমন্বিত ড্যাশবোর্ড',
    workspaceStatus: 'লাইভ ওয়ার্কস্পেস',

    // Navigation Tabs
    navDashboard: 'ড্যাশবোর্ড',
    navEvents: 'ইভেন্টসমূহ',
    navVolunteers: 'স্বেচ্ছাসেবক দায়িত্ব',
    navResources: 'মালামাল ও রিসোর্স',

    // Dashboard Metric Cards
    metricTotalEvents: 'মোট ইভেন্ট',
    metricActiveVolunteers: 'সক্রিয় স্বেচ্ছাসেবক',
    metricPendingTasks: 'অপেক্ষমাণ কাজ',
    metricResourceShortages: 'সামগ্রী ঘাটতি',
    metricTotalEventsDesc: 'নিবন্ধিত ও পরিচালিত সর্বমোট ইভেন্ট',
    metricActiveVolunteersDesc: 'সক্রিয় ইভেন্টে নিযুক্ত (অসমাপ্ত দায়িত্ব)',
    metricPendingTasksDesc: 'অনুমোদনের অপেক্ষায় থাকা দায়িত্বসমূহ',
    metricResourceShortagesDesc: 'প্রয়োজনের তুলনায় কম মজুদ সামগ্রী',
    quickFilter: 'দ্রুত ফিল্টার',
    viewAll: 'সবগুলো দেখুন',
    breakdown: 'বিশ্লেষণ',
    activeEventsCount: 'সক্রিয় ইভেন্ট',
    upcomingEventsCount: 'আসন্ন ইভেন্ট',
    completedEventsCount: 'সম্পন্ন ইভেন্ট',
    confirmedVolunteers: 'নিশ্চিত দায়িত্ব',
    completedTasks: 'সম্পন্ন দায়িত্ব',
    sufficientResources: 'পর্যাপ্ত সামগ্রী',

    // Common Actions & Buttons
    add: 'যোগ করুন',
    edit: 'সম্পাদনা',
    delete: 'মুছুন',
    cancel: 'বাতিল',
    save: 'সংরক্ষণ করুন',
    saving: 'সংরক্ষণ হচ্ছে...',
    update: 'আপডেট করুন',
    close: 'বন্ধ করুন',
    actions: 'পদক্ষেপ',
    search: 'অনুসন্ধান করুন',
    filterByStatus: 'অবস্থা অনুযায়ী ফিল্টার',
    allStatuses: 'সকল অবস্থা',
    confirm: 'নিশ্চিত করুন',
    resetToSampleData: 'নমুনা তথ্যে রিসেট করুন',
    exportData: 'তথ্য এক্সপোর্ট',
    exportCSV: 'সিএসভি (CSV) এক্সপোর্ট',
    exportJSON: 'জেসন (JSON) ব্যাকআপ',
    lightMode: 'লাইট মোড',
    darkMode: 'ডার্ক মোড',
    status: 'অবস্থা',
    date: 'তারিখ',
    location: 'স্থান',
    role: 'ভূমিকা / দায়িত্ব',
    contact: 'যোগাযোগের মাধ্যম',
    event: 'ইভেন্ট',
    selectEvent: 'একটি ইভেন্ট নির্বাচন করুন',

    // Event Management
    eventsTitle: 'ইভেন্ট ব্যবস্থাপনা',
    eventsSubtitle: 'কমিউনিটি ও বিশ্ববিদ্যালয়ের ইভেন্টের সময়সূচি ও অগ্রগতি পর্যবেক্ষণ',
    addEvent: 'নতুন ইভেন্ট যোগ করুন',
    editEvent: 'ইভেন্ট সম্পাদনা করুন',
    eventName: 'ইভেন্টের নাম',
    eventDate: 'ইভেন্টের তারিখ',
    eventLocation: 'স্থান',
    eventStatus: 'ইভেন্টের অবস্থা',
    assignedVolunteersCount: 'নিযুক্ত স্বেচ্ছাসেবক',
    searchEventsPlaceholder: 'ইভেন্টের নাম বা স্থান দিয়ে খুঁজুন...',
    noEventsFound: 'খোঁজ অনুযায়ী কোনো ইভেন্ট পাওয়া যায়নি।',
    noEventsPrompt: 'নতুন ইভেন্ট নিবন্ধন করতে "নতুন ইভেন্ট যোগ করুন" চাপুন।',

    // Volunteer Assignments
    volunteersTitle: 'স্বেচ্ছাসেবক দায়িত্ব বণ্টন',
    volunteersSubtitle: 'ভূমিকা, যোগাযোগের তথ্য ও দায়িত্বের অগ্রগতি সমন্বয় করুন',
    addAssignment: 'নতুন দায়িত্ব বরাদ্দ করুন',
    editAssignment: 'দায়িত্ব সম্পাদনা করুন',
    volunteerName: 'স্বেচ্ছাসেবকের নাম',
    volunteerRole: 'দায়িত্ব / পদবী',
    contactMethod: 'যোগাযোগের মাধ্যম',
    assignmentStatus: 'দায়িত্বের অবস্থা',
    filterByAssignmentStatus: 'দায়িত্ব অনুযায়ী ফিল্টার',
    searchVolunteersPlaceholder: 'নাম, ভূমিকা বা ইভেন্ট অনুযায়ী খুঁজুন...',
    noAssignmentsFound: 'ফিল্টার অনুযায়ী কোনো দায়িত্ব বণ্টন পাওয়া যায়নি।',
    noAssignmentsPrompt: 'নতুন দায়িত্ব যোগ করতে "নতুন দায়িত্ব বরাদ্দ করুন" চাপুন।',
    changeStatus: 'অবস্থা পরিবর্তন করুন',
    quickStatusChange: 'দ্রুত অবস্থা বদলান',

    // Resource Management
    resourcesTitle: 'মালামাল ও সরঞ্জাম ব্যবস্থাপনা',
    resourcesSubtitle: 'প্রয়োজনীয় বনাম মজুদ মালামাল পর্যবেক্ষণ ও ঘাটতি নিরসন',
    addResource: 'নতুন সামগ্রী যোগ করুন',
    editResource: 'সামগ্রী সম্পাদনা করুন',
    resourceName: 'সামগ্রীর নাম',
    requiredQuantity: 'প্রয়োজনীয় পরিমাণ',
    availableQuantity: 'মজুদ পরিমাণ',
    shortageStatus: 'মজুদ অবস্থা',
    showShortagesOnly: 'কেবল ঘাটতি সামগ্রী দেখান',
    showAllResources: 'সকল সামগ্রী দেখান',
    searchResourcesPlaceholder: 'সামগ্রীর নাম বা ইভেন্ট দিয়ে খুঁজুন...',
    noResourcesFound: 'কোনো সামগ্রী পাওয়া যায়নি।',
    noResourcesPrompt: 'নতুন সরঞ্জাম যুক্ত করতে "নতুন সামগ্রী যোগ করুন" চাপুন।',

    // Status Names
    statusActive: 'সক্রিয় (Active)',
    statusUpcoming: 'আসন্ন (Upcoming)',
    statusCompleted: 'সম্পন্ন (Completed)',
    statusPending: 'অপেক্ষমাণ (Pending)',
    statusConfirmed: 'নিশ্চিত (Confirmed)',
    statusShortage: 'ঘাটতি (Shortage)',
    statusSufficient: 'পর্যাপ্ত (Sufficient)',

    // Contact Methods
    contactEmail: 'ইমেইল (Email)',
    contactPhone: 'ফোন (Phone)',
    contactOther: 'অন্যান্য (Other)',

    // Validation & Alerts
    requiredField: 'এই তথ্যটি প্রদান করা আবশ্যক।',
    nameCannotBeBlank: 'নাম কোনোভাবেই ফাঁকা রাখা যাবে না।',
    quantityMustBeNumber: 'পরিমাণ অবশ্যই একটি সঠিক সংখ্যা হতে হবে।',
    quantityNonNegative: 'পরিমাণ ঋণাত্মক হতে পারবে না (শূন্য বা বেশি হতে হবে)।',
    eventMustBeSelected: 'অনুগ্রহ করে একটি সঠিক ইভেন্ট বেছে নিন।',
    savedSuccessfully: 'তথ্য সফলভাবে সংরক্ষিত হয়েছে!',
    updatedSuccessfully: 'তথ্য সফলভাবে হালনাগাদ হয়েছে!',
    statusUpdated: 'অবস্থা পরিবর্তিত হয়েছে:',
    resetSuccess: 'অ্যাপ্লিকেশন প্রাথমিক নমুনা তথ্যে রিসেট করা হয়েছে।',
    backupDownloaded: 'ব্যাকআপ ফাইল সফলভাবে ডাউনলোড হয়েছে।',

    // Business Rules Explanation Modal
    businessRulesTitle: 'প্রতিযোগিতার ব্যবসায়িক নিয়মাবলী',
    ruleShortage: 'সামগ্রী ঘাটতি: মজুদ < প্রয়োজনীয় (মজুদ >= প্রয়োজনীয় হলে পর্যাপ্ত)',
    rulePending: 'অপেক্ষমাণ কাজ: "Pending" অবস্থায় থাকা দায়িত্বসমূহের মোট সংখ্যা',
    ruleActiveVolunteers: 'সক্রিয় স্বেচ্ছাসেবক: "Active" ইভেন্টে যুক্ত এবং "Completed" নয় এমন সদস্যবৃন্দ',
    rulePersistence: 'স্থায়িত্ব: ব্রাউজার localStorage-এ সংরক্ষিত (রিফ্রেশ এবং ভাষা পরিবর্তনে অবিকৃত থাকে)',

    // Footer
    footerText: 'কমিউনিটি ইভেন্ট রিসোর্স ও ভলান্টিয়ার ট্র্যাকার',
    cleanArchitecture: 'ক্লায়েন্ট-অনলি আর্কিটেকচার • ব্যাকএন্ডবিহীন • ব্রাউজার লোকাল স্টোরেজ নির্ভর'
  }
};
