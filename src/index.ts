export class Authorize<
  Permissions extends Record<string, Record<string, string>>,
  Roles extends Record<
    string,
    Partial<
      {
        [K in keyof Permissions]:
          | Partial<{
              [N in keyof Permissions[K]]: boolean;
            }>
          | boolean;
      } & { all?: boolean }
    >
  >
> {
  readonly permissions: Permissions;
  readonly roles: Roles;

  constructor(permissions: Permissions, roles: Roles) {
    this.permissions = permissions;
    this.roles = roles;
  }

  can<T extends keyof Permissions>(
    role: keyof Roles,
    permission: `${T & string}.${keyof Permissions[T] & string}`
  ) {
    const [permGroup, permAction] = permission.split(".") as [
      T,
      keyof Permissions[T]
    ];
    const roleData = this.roles[role];
    if (!roleData) return false;
    if (roleData.all) return true;
    const rolePermissions = roleData[permGroup];
    if (!rolePermissions) return false;
    if (rolePermissions === true) return true;
    const roleActionPermission = rolePermissions[permAction as any];
    return roleActionPermission ?? false;
  }

  getPosition(role: keyof Roles) {
    const rolesKeys = Object.keys(this.roles).reverse();
    const rolePosition = rolesKeys.findIndex((r) => r === role);
    return rolePosition + 1;
  }

  compare(role1: keyof Roles, role2: keyof Roles) {
    const role1Position = this.getPosition(role1);
    const role2Position = this.getPosition(role2);
    if (role1Position === role2Position) return 0;
    return role1Position > role2Position ? 1 : 2;
  }

  sort(roles: (keyof Roles)[], order: "asc" | "desc" = "desc") {
    if (order === "asc") {
      return roles.sort((a, b) => {
        const aPosition = this.getPosition(a);
        const bPosition = this.getPosition(b);
        return aPosition - bPosition;
      });
    } else if (order === "desc") {
      return roles.sort((a, b) => {
        const aPosition = this.getPosition(a);
        const bPosition = this.getPosition(b);
        return bPosition - aPosition;
      });
    } else {
      throw new Error('The order parameter must be "asc" or "desc".');
    }
  }
}
