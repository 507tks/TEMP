export const FieldErrors = (obj) => {
  for (const key in obj) {
    if (obj[key] === true) {
      return key;
    }
  }
  return null;
};

export const hasSubmodulePermission = (userPermissions, moduleKey, submoduleKey) => {
  if (!userPermissions) return false;

  const module = userPermissions.find((module) => module.moduleKey === moduleKey);

  if (module && module.submodules) {
    return module.submodules.some((submodule) => {
      return submodule.submoduleKey === submoduleKey && submodule.hasPermission;
    });
  }

  return false;
};


export const getRoleActionsForCollection = (role, collectionName) => {

  if (!role || !role.roleAccess) {
    console.error("Invalid role or roleAccess");
    return [];
  }
  if (role.roleAccess === "all") {
    return ["create", "read", "update", "delete"];
  }

  const collectionAccess = role.roleAccess.find(
    (access) => access.collectionName === collectionName
  );

  return collectionAccess ? collectionAccess.accessList : [];
}


export const filterActionsByAccess = (actions, role, collectionName) => {
  const actionToCRUDMap = {
    ADD_PATIENT: "create",
    SCHEDULE_SESSIONS:"create",
    SCHEDULE_APPOINTMENT: "create",
    UPDATE_PATIENT: "update",
    VIEW_APPOINTMENTS: "read",
    NOTES_PATIENT: "read",
    UPLOAD_DOCS_PATIENT: "create",
    DOWNLOAD_DOCS_PATIENT: "read",
    DELETE_PATIENT: "delete",

    ADD_INVOICE: "create",
    VIEW_INVOICE: "read",
    EDIT_INVOICE: "update",
    DELETE_INVOICE: "delete",
    SEND_INVOICE: "read",

    VIEW_MEDICINE: "read",
    ADD_MEDICINE: "create",
    UPDATE_MEDICINE: "update",
    DELETE_MEDICINE: "delete",
    UPDATE_STOCK: "update",
    UPDATE_STATE: "update",

    // New appointment and prescription-related actions
    ADD_PRESCRIPTION: "create",
    PRESCRIPTION_HISTORY: "read",
    NOTES_APPOINTMENT: "read",
    UPLOAD_DOCS_APPOINTMENT: "create",
    DOWNLOAD_DOCS_APPOINTMENT: "read",
    ALL_APPOINTMENTS: "read",
    RESCHEDULE_APPOINTMENT: "update",
    MARK_COMPLETE: "update",
    CANCEL_APPOINTMENT: "delete",
    ABSENT_APPOINTMENT:"delete",
    SEND_PRESCRIPTION: "create",

    CHANGE_ROLE: "update",
    DELETE_USER: "delete",

    EDIT_ROLE: "update",
    DELETE_ROLE: "delete"
  };

  const accessList = getRoleActionsForCollection(role, collectionName);

  return actions.filter((action) => accessList.includes(actionToCRUDMap[action.id]));
}


export const hasAccess = (role, collectionName, actionId) => {
  if (!role || !collectionName || !actionId) {
    return false;
  }

  const accessList = getRoleActionsForCollection(role, collectionName);

  const actionToCRUDMap = {
    ADD_PATIENT: "create",
    SCHEDULE_APPOINTMENT: "create",
    UPDATE_PATIENT: "update",
    VIEW_APPOINTMENTS: "read",
    NOTES_PATIENT: "read",
    UPLOAD_DOCS_PATIENT: "create",
    DOWNLOAD_DOCS_PATIENT: "read",
    DELETE_PATIENT: "delete",

    VIEW_MEDICINE: "read",
    ADD_MEDICINE: "create",
    UPDATE_MEDICINE: "update",
    DELETE_MEDICINE: "delete",
    UPDATE_STOCK: "update",
    UPDATE_STATE: "update",
    ADD_PRESCRIPTION: "create",
    PRESCRIPTION_HISTORY: "read",
    NOTES_APPOINTMENT: "read",
    UPLOAD_DOCS_APPOINTMENT: "create",
    DOWNLOAD_DOCS_APPOINTMENT: "read",
    ALL_APPOINTMENTS: "read",
    RESCHEDULE_APPOINTMENT: "update",
    MARK_COMPLETE: "update",
    CANCEL_APPOINTMENT: "delete",
    SEND_PRESCRIPTION: "create",

    ADD_USER: "create",
  };

  const requiredCrudAction = actionToCRUDMap[actionId];

  return accessList.includes(requiredCrudAction);
};
