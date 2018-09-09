import { UserGroup } from "../../usergroups/shared/usergroup.model";

export interface Resource {
    id: string;
    method: string;
    name: string;
    listUserGroup?: UserGroup[]
}
