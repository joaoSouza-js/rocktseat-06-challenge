import { PermissionType } from "../enums/permissions-type.js";

export const PermissionPresets = {
    admin: [
        PermissionType.ADMIN_VIEW,
        PermissionType.ADMIN_CREATE,
        PermissionType.ADMIN_UPDATE
    ],

    deliverer: [
        PermissionType.DELIVERY_CREATE,
        PermissionType.DELIVERER_CREATE,
        PermissionType.DELIVERY_UPDATE,
    ],

    user: [
        PermissionType.VIEW,
        PermissionType.CREATE,
        PermissionType.UPDATE,
    ],

};