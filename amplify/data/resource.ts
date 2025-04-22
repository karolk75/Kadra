import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

// BIG TODO: ADD SECONDARY INDEXES WHERE YOU LIST THINGS !!!!!!!!!!!!!!!!
// For retriving lists by id
// And for sorting by createdAt
const schema = a.schema({
  // Enums
  UserType: a.enum(["PARENT", "FACILITY_ADMIN", "TEACHER"]),
  EnrollmentStatus: a.enum(["PENDING", "APPROVED", "REJECTED", "CANCELED"]),
  MessageStatus: a.enum(["SENT", "DELIVERED", "READ"]),
  VerificationType: a.enum(["UNVERIFIED", "PENDING", "VERIFIED"]),
  AttachmentType: a.enum(["FILE", "IMAGE", "AUDIO", "VIDEO"]),
  NotificationType: a.enum(["MESSAGE", "INFO", "APPOINTMENT", "SYSTEM"]),
  // 1. User
  User: a
    .model({
      email: a.string().required(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      phoneNumber: a.string(),
      userType: a.ref("UserType").required(),
      profileImageUrl: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      lastLoginAt: a.datetime(),
      verificationStatus: a.ref("VerificationType").required(),
      // Relationships
      children: a.hasMany("Child", "parentId"),
      adminFacility: a.hasOne("Facility", "adminId"),
      teacher: a.hasOne("Teacher", "userId"),
      sentMessages: a.hasMany("Message", "senderId"),
      conversations: a.hasMany("ConversationParticipant", "userId"),
      notifications: a.hasMany("Notification", "userId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read"]),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
    ]),

  // 2. Child
  Child: a
    .model({
      parentId: a.string().required(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      birthDate: a.date().required(),
      notes: a.string(),
      profileImageUrl: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      // Relationships
      parent: a.belongsTo("User", "parentId"),
      enrollments: a.hasMany("Enrollment", "childId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read"]),
    ]),

  // 3. Facility
  Facility: a
    .model({
      adminId: a.string().required(),
      name: a.string().required(),
      description: a.string(),
      address: a.string().required(),
      city: a.string().required(),
      postalCode: a.string().required(),
      phoneNumber: a.string(),
      email: a.string(),
      website: a.string(),
      logoUrl: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      // Relationships
      admin: a.belongsTo("User", "adminId"),
      teachers: a.hasMany("Teacher", "facilityId"),
      classes: a.hasMany("Class", "facilityId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read"]),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
    ]),

  // 4. Teacher
  Teacher: a
    .model({
      userId: a.string().required(),
      facilityId: a.string().required(),
      bio: a.string(),
      specialization: a.string(),
      profileImageUrl: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      // Relationships
      user: a.belongsTo("User", "userId"),
      facility: a.belongsTo("Facility", "facilityId"),
      classes: a.hasMany("ClassTeacher", "teacherId"),
      schedules: a.hasMany("Schedule", "teacherId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read"]),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
    ]),

  // 5. ClassCategory
  ClassCategory: a
    .model({
      name: a.string().required(),
      description: a.string(),
      iconUrl: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      // Relationships
      classes: a.hasMany("Class", "categoryId"),
    })
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
    ]),

  // 6. Class
  Class: a
    .model({
      facilityId: a.string().required(),
      categoryId: a.string(),
      name: a.string().required(),
      description: a.string(),
      ageMin: a.integer(),
      ageMax: a.integer(),
      pricePerSession: a.float(),
      durationMinutes: a.integer().required(),
      maxParticipants: a.integer(),
      iconUrl: a.string(),
      isActive: a.boolean().required().default(true),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      // Relationships
      facility: a.belongsTo("Facility", "facilityId"),
      category: a.belongsTo("ClassCategory", "categoryId"),
      teachers: a.hasMany("ClassTeacher", "classId"),
      schedules: a.hasMany("Schedule", "classId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read"]),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
    ]),

  // 7. ClassTeacher
  ClassTeacher: a
    .model({
      classId: a.string().required(),
      teacherId: a.string().required(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      // Relationships
      class: a.belongsTo("Class", "classId"),
      teacher: a.belongsTo("Teacher", "teacherId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read"]),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
    ]),

  // 8. Schedule
  Schedule: a
    .model({
      classId: a.string().required(),
      teacherId: a.string().required(),
      startTime: a.datetime().required(),
      endTime: a.datetime().required(),
      isCancelled: a.boolean().required().default(false),
      cancellationReason: a.string(),
      location: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      // Relationships
      class: a.belongsTo("Class", "classId"),
      teacher: a.belongsTo("Teacher", "teacherId"),
      enrollments: a.hasMany("Enrollment", "scheduleId"),
      attendances: a.hasMany("Attendance", "scheduleId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read"]),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
    ]),

  // 9. Enrollment
  Enrollment: a
    .model({
      childId: a.string().required(),
      scheduleId: a.string().required(),
      status: a.ref("EnrollmentStatus").required(),
      enrollmentDate: a.datetime().required(),
      notes: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      // Relationships
      child: a.belongsTo("Child", "childId"),
      schedule: a.belongsTo("Schedule", "scheduleId"),
      attendances: a.hasMany("Attendance", "enrollmentId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read"]),
    ]),

  // 10. Attendance
  Attendance: a
    .model({
      enrollmentId: a.string().required(),
      scheduleId: a.string().required(),
      isPresent: a.boolean(),
      notes: a.string(),
      attendanceDate: a.datetime().required(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      // Relationships
      enrollment: a.belongsTo("Enrollment", "enrollmentId"),
      schedule: a.belongsTo("Schedule", "scheduleId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read"]),
    ]),

  // 11. Conversation
  Conversation: a
    .model({
      title: a.string(),
      lastMessage: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      // Relationships
      participants: a.hasMany("ConversationParticipant", "conversationId"),
      messages: a.hasMany("Message", "conversationId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read"]),
    ]),

  // 12. ConversationParticipant
  ConversationParticipant: a
    .model({
      conversationId: a.string().required(),
      userId: a.string().required(),
      lastReadAt: a.datetime(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      // Relationships
      conversation: a.belongsTo("Conversation", "conversationId"),
      user: a.belongsTo("User", "userId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read", "update"]),
    ]),

  // 13. Message
  Message: a
    .model({
      conversationId: a.string().required(),
      senderId: a.string().required(),
      content: a.string().required(),
      status: a.ref("MessageStatus").required(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      // Relationships
      conversation: a.belongsTo("Conversation", "conversationId"),
      sender: a.belongsTo("User", "senderId"),
      attachments: a.hasMany("MessageAttachment", "messageId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read"]),
    ]),

  // 14. MessageAttachment
  MessageAttachment: a
    .model({
      messageId: a.string().required(),
      type: a.ref("AttachmentType").required(),
      uri: a.string().required(),
      name: a.string().required(),
      size: a.integer(),
      createdAt: a.datetime().required(),
      // Relationships
      message: a.belongsTo("Message", "messageId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read"]),
    ]),

  // 15. Notification
  Notification: a
    .model({
      userId: a.string().required(),
      title: a.string().required(),
      content: a.string().required(),
      isRead: a.boolean().required().default(false),
      type: a.ref("NotificationType").required(),
      relatedId: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
      // Relationships
      user: a.belongsTo("User", "userId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // apiKeyAuthorizationMode: {
    //   expiresInDays: 30,
    // },
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
    firstName: "John",
    lastName: "Doe",
    userType: "PARENT",
    verificationStatus: "UNVERIFIED",
    createdAt: new Date().toISOString()
  });
  return newUser;
};

// Create a new child
const createChild = async (parentId) => {
  const newChild = await client.models.Child.create({
    parentId: parentId,
    firstName: "Jane",
    lastName: "Doe",
    birthDate: "2018-01-01",
    createdAt: new Date().toISOString()
  });
  return newChild;
};

// Get facilities in a specific city
const getFacilitiesByCity = async (city) => {
  const { data: facilities } = await client.models.Facility.list({
    filter: { city: { eq: city } }
  });
  return facilities;
};

// Get classes for a facility with their categories
const getClassesForFacility = async (facilityId) => {
  const { data: classes } = await client.models.Class.list({
    filter: { facilityId: { eq: facilityId } }
  });
  
  // Get category details for each class
  const classesWithDetails = await Promise.all(classes.map(async (classItem) => {
    if (classItem.categoryId) {
      const category = await client.models.ClassCategory.get(classItem.categoryId);
      return { ...classItem, category };
    }
    return classItem;
  }));
  
  return classesWithDetails;
};

// Create an enrollment
const createEnrollment = async (childId, scheduleId) => {
  const newEnrollment = await client.models.Enrollment.create({
    childId: childId,
    scheduleId: scheduleId,
    status: "PENDING",
    enrollmentDate: new Date().toISOString(),
    createdAt: new Date().toISOString()
  });
  return newEnrollment;
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
