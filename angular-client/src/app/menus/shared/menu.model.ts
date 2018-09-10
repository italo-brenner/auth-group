import { UserGroup } from "../../usergroups/shared/usergroup.model";

export interface Menu {
    id: string;
    title: string;
    fontAwesome: string;
    link: string;
    listUserGroup?: UserGroup[]
}
