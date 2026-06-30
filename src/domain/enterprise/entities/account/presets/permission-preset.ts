import { PermissionType } from "../enums/permissions-type.js";

export const PermissionPresets = {
    admin: [
        PermissionType.ADMIN_VIEW,
        PermissionType.ADMIN_CREATE,
        PermissionType.ADMIN_UPDATE
    ],

    deliverer: [
        PermissionType.DELIVERER_CREATE,
        PermissionType.DELIVERER_UPDATE,
    ],

    deliver: [
        PermissionType.DELIVER_UPDATE,
        PermissionType.DELIVER_CREATE,
        PermissionType.DELIVER_VIEW
    ],

    user: [
        PermissionType.VIEW,
        PermissionType.CREATE,
        PermissionType.UPDATE,
    ],

};