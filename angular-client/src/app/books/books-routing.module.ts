import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BooksComponent } from "./books.component";
import { BookListComponent } from "./book-list/book-list.component";
import { BookEditComponent } from "./book-edit/book-edit.component";
import { RoleGuardService as RoleGuard } from "../shared/service/role-guard.service";

const routes: Routes = [
  {
    path: "",
    component: BooksComponent,
    children: [
      { path: "", component: BookListComponent },
      {
        path: "new",
        component: BookEditComponent,
        canLoad: [RoleGuard],
        data: { expectedRole: ["ROLE_ROOT", "ROLE_BOOK"] }
      },
      {
        path: ":id",
        component: BookEditComponent,
        canLoad: [RoleGuard],
        data: { expectedRole: ["ROLE_ROOT", "ROLE_BOOK"] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
