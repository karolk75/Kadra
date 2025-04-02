import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  // 1. Users
  User: a
    .model({
      email: a.string(),
      passwordHash: a.string(),
      userType: a.enum(['student', 'teacher', 'parent', 'admin']),
      firstName: a.string(),
      lastName: a.string(),
      phoneNumber: a.string(),
      profileImageUrl: a.string(),
      timezone: a.string().default("UTC"),
      locale: a.string().default("en-US"),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      lastLoginAt: a.datetime(),
      isActive: a.boolean().default(true),
      verificationStatus: a.enum(['unverified', 'pending', 'verified']),
      // Relationships
      student: a.hasOne('Student', 'userId'),
      teacher: a.hasOne('Teacher', 'userId'),
      sentMessages: a.hasMany('Message', 'senderId'),
      notifications: a.hasMany('Notification', 'userId'),
      conversations: a.hasMany('ConversationParticipant', 'userId'),
      preferences: a.hasOne('UserPreference', 'userId'),
      givenReviews: a.hasMany('Review', 'reviewerId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.guest().to(['read']),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),

  // 2. Students
  Student: a
    .model({
      userId: a.string(),
      dateOfBirth: a.date(),
      gradeLevel: a.string(),
      parentId: a.string(),
      schoolId: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      // Relationships
      user: a.belongsTo('User', 'userId'),
      parent: a.belongsTo('User', 'parentId'),
      school: a.belongsTo('School', 'schoolId'),
      appointments: a.hasMany('Appointment', 'studentId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.guest().to(['read']),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),

  // 3. Teachers
  Teacher: a
    .model({
      userId: a.string(),
      bio: a.string(),
      yearsOfExperience: a.integer(),
      education: a.string(),
      specializations: a.string().array(),
      hourlyRate: a.float(),
      availabilitySettings: a.json(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      // Relationships
      user: a.belongsTo('User', 'userId'),
      subjects: a.hasMany('TeacherSubject', 'teacherId'),
      schools: a.hasMany('TeacherSchool', 'teacherId'),
      appointments: a.hasMany('Appointment', 'teacherId'),
      availability: a.hasMany('Availability', 'teacherId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.guest().to(['read']),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),

  // 4. Schools
  School: a
    .model({
      name: a.string(),
      type: a.enum(['primary', 'middle', 'high', 'college', 'language', 'music', 'sport', 'art', 'other']),
      address: a.string(),
      city: a.string(),
      state: a.string(),
      postalCode: a.string(),
      country: a.string(),
      phone: a.string(),
      email: a.string(),
      website: a.string(),
      logoUrl: a.string(),
      latitude: a.float(),
      longitude: a.float(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      // Relationships
      teachers: a.hasMany('TeacherSchool', 'schoolId'),
      students: a.hasMany('Student', 'schoolId'),
      activities: a.hasMany('Activity', 'schoolId'),
      locations: a.hasMany('Location', 'schoolId'),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),

  // 5. Subjects
  Subject: a
    .model({
      name: a.string(),
      category: a.string(),
      iconUrl: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      // Relationships
      teachers: a.hasMany('TeacherSubject', 'subjectId'),
      activities: a.hasMany('Activity', 'subjectId'),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),

  // 6. Teacher-Subject Relationship
  TeacherSubject: a
    .model({
      teacherId: a.string(),
      subjectId: a.string(),
      proficiencyLevel: a.enum(['beginner', 'intermediate', 'advanced', 'expert']),
      createdAt: a.datetime(),
      // Relationships
      teacher: a.belongsTo('Teacher', 'teacherId'),
      subject: a.belongsTo('Subject', 'subjectId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.guest().to(['read']),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),

  // 7. Teacher-School Relationship
  TeacherSchool: a
    .model({
      teacherId: a.string(),
      schoolId: a.string(),
      position: a.string(),
      department: a.string(),
      startDate: a.date(),
      endDate: a.date(),
      isCurrent: a.boolean().default(true),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      // Relationships
      teacher: a.belongsTo('Teacher', 'teacherId'),
      school: a.belongsTo('School', 'schoolId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.guest().to(['read']),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),

  // 8. Activities
  Activity: a
    .model({
      name: a.string(),
      description: a.string(),
      category: a.string(),
      subjectId: a.string(),
      schoolId: a.string(),
      logoUrl: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      // Relationships
      subject: a.belongsTo('Subject', 'subjectId'),
      school: a.belongsTo('School', 'schoolId'),
      appointments: a.hasMany('Appointment', 'activityId'),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),

  // 9. Locations
  Location: a
    .model({
      name: a.string(),
      address: a.string(),
      city: a.string(),
      state: a.string(),
      postalCode: a.string(),
      country: a.string(),
      latitude: a.float(),
      longitude: a.float(),
      schoolId: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      // Relationships
      school: a.belongsTo('School', 'schoolId'),
      appointments: a.hasMany('Appointment', 'locationId'),
      recommendedItems: a.hasMany('RecommendedItem', 'locationId'),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),

  // 10. Appointments
  Appointment: a
    .model({
      studentId: a.string(),
      teacherId: a.string(),
      activityId: a.string(),
      locationId: a.string(),
      startTime: a.datetime(),
      endTime: a.datetime(),
      status: a.enum(['scheduled', 'confirmed', 'canceled', 'completed']),
      notes: a.string(),
      recurringPattern: a.json(),
      parentAppointmentId: a.string(),
      createdById: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      // Relationships
      student: a.belongsTo('Student', 'studentId'),
      teacher: a.belongsTo('Teacher', 'teacherId'),
      activity: a.belongsTo('Activity', 'activityId'),
      location: a.belongsTo('Location', 'locationId'),
      createdBy: a.belongsTo('User', 'createdById'),
      parentAppointment: a.belongsTo('Appointment', 'parentAppointmentId'),
      childAppointments: a.hasMany('Appointment', 'parentAppointmentId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
      // For participants, we need to use a more basic rule since custom rules have limitations
      allow.authenticated().to(['read', 'update']),
    ]),

  // 11. Conversations
  Conversation: a
    .model({
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      lastMessageAt: a.datetime(),
      // Relationships
      participants: a.hasMany('ConversationParticipant', 'conversationId'),
      messages: a.hasMany('Message', 'conversationId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
      allow.authenticated().to(['read', 'update']),
    ]),

  // 12. Conversation Participants
  ConversationParticipant: a
    .model({
      conversationId: a.string(),
      userId: a.string(),
      lastReadAt: a.datetime(),
      createdAt: a.datetime(),
      // Relationships
      conversation: a.belongsTo('Conversation', 'conversationId'),
      user: a.belongsTo('User', 'userId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
      // User can manage their own participation
      allow.authenticated().to(['read', 'update']),
    ]),

  // 13. Messages
  Message: a
    .model({
      conversationId: a.string(),
      senderId: a.string(),
      text: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      // Relationships
      conversation: a.belongsTo('Conversation', 'conversationId'),
      sender: a.belongsTo('User', 'senderId'),
      attachments: a.hasMany('MessageAttachment', 'messageId'),
      readStatus: a.hasMany('MessageReadStatus', 'messageId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
      // Participants of a conversation can access messages
      allow.authenticated().to(['read']),
    ]),

  // 14. Message Attachments
  MessageAttachment: a
    .model({
      messageId: a.string(),
      type: a.enum(['file', 'image', 'audio', 'video']),
      uri: a.string(),
      name: a.string(),
      size: a.integer(),
      mimeType: a.string(),
      createdAt: a.datetime(),
      // Relationships
      message: a.belongsTo('Message', 'messageId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
      // Participants of a conversation can access attachments
      allow.authenticated().to(['read']),
    ]),

  // 15. Message Read Status
  MessageReadStatus: a
    .model({
      messageId: a.string(),
      userId: a.string(),
      readAt: a.datetime(),
      // Relationships
      message: a.belongsTo('Message', 'messageId'),
      user: a.belongsTo('User', 'userId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
      // Users can manage their own read status
      allow.authenticated().to(['read', 'update']),
    ]),

  // 16. Notifications
  Notification: a
    .model({
      userId: a.string(),
      title: a.string(),
      message: a.string(),
      type: a.enum(['message', 'appointment', 'info', 'system']),
      relatedEntityType: a.string(),
      relatedEntityId: a.string(),
      isRead: a.boolean().default(false),
      createdAt: a.datetime(),
      readAt: a.datetime(),
      // Relationships
      user: a.belongsTo('User', 'userId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),

  // 17. Recommended Items
  RecommendedItem: a
    .model({
      title: a.string(),
      subtitle: a.string(),
      description: a.string(),
      category: a.enum(['school', 'activity', 'teacher', 'course']),
      backgroundImageUrl: a.string(),
      logoUrl: a.string(),
      locationId: a.string(),
      relatedEntityType: a.string(),
      relatedEntityId: a.string(),
      priority: a.integer().default(0),
      expirationDate: a.datetime(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      // Relationships
      location: a.belongsTo('Location', 'locationId'),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),

  // 18. User Preferences
  UserPreference: a
    .model({
      userId: a.string(),
      notificationPreferences: a.json().default({}),
      privacySettings: a.json().default({}),
      theme: a.string().default('default'),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      // Relationships
      user: a.belongsTo('User', 'userId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),

  // 19. Reviews
  Review: a
    .model({
      reviewerId: a.string(),
      entityType: a.enum(['teacher', 'school', 'activity']),
      entityId: a.string(),
      rating: a.float(),
      comment: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      // Relationships
      reviewer: a.belongsTo('User', 'reviewerId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.guest().to(['read']),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),

  // 20. Availability
  Availability: a
    .model({
      teacherId: a.string(),
      dayOfWeek: a.integer(), // 0-6 for Sunday-Saturday
      startTime: a.datetime(),
      endTime: a.datetime(),
      isRecurring: a.boolean().default(true),
      specificDate: a.date(), // For non-recurring availability
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      // Relationships
      teacher: a.belongsTo('Teacher', 'teacherId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.guest().to(['read']),
      allow.groups(['Admin']).to(['create', 'read', 'update', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*
CLIENT-SIDE CODE EXAMPLES (to be used in your React components)

Example of generating a client and performing CRUD operations:

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

// Create a new user
const createUser = async () => {
  const newUser = await client.models.User.create({
    email: "user@example.com",
    passwordHash: "hashed_password", // In production, handle this properly
    userType: "student",
    firstName: "John",
    lastName: "Doe",
    timezone: "UTC",
    locale: "en-US",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    verificationStatus: "unverified",
    isActive: true
  });
  return newUser;
};

// List all schools near a location
const getNearbySchools = async (latitude, longitude, radiusInKm) => {
  // Note: For actual distance-based queries, you'd need additional server-side logic
  // This is a simplified example
  const { data: schools } = await client.models.School.list({
    filter: {
      and: [
        { city: { eq: "YourCity" } },
        { state: { eq: "YourState" } }
      ]
    }
  });
  return schools;
};

// Get a teacher with their subjects and schools
const getTeacherDetails = async (teacherId) => {
  const teacher = await client.models.Teacher.get(teacherId);
  
  if (teacher) {
    // Get related subjects
    const { data: subjects } = await client.models.TeacherSubject.list({
      filter: { teacherId: { eq: teacherId } }
    });
    
    // Get related schools
    const { data: schools } = await client.models.TeacherSchool.list({
      filter: { teacherId: { eq: teacherId } }
    });
    
    return {
      teacher,
      subjects,
      schools
    };
  }
  
  return null;
};

// Update user preferences
const updateUserPreferences = async (userId, preferences) => {
  // First get existing preferences
  const { data: existingPrefs } = await client.models.UserPreference.list({
    filter: { userId: { eq: userId } },
    limit: 1
  });
  
  if (existingPrefs.length > 0) {
    // Update existing preferences
    return await client.models.UserPreference.update({
      id: existingPrefs[0].id,
      notificationPreferences: preferences.notifications,
      privacySettings: preferences.privacy,
      theme: preferences.theme,
      updatedAt: new Date().toISOString()
    });
  } else {
    // Create new preferences
    return await client.models.UserPreference.create({
      userId,
      notificationPreferences: preferences.notifications,
      privacySettings: preferences.privacy,
      theme: preferences.theme,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
};
*/

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
