import { UserGroup } from "../../usergroups/shared/usergroup.model";

export interface User {
    id: string;
    username: string;
    password: string;
    userGroup: UserGroup
}
