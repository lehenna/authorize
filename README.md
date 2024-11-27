# @lehenna/authorize

> Implement a roles and permissions system in minutes.

## Installation

```bash
npm install @lehenna/authorize
```

# Usage

## Import and Initialize

You can define permissions and roles, then initialize the `Authorize` class:

```ts
import { Authorize } from "@lehenna/authorize";

const authorize = new Authorize(
  {
    users: {
      read: "",
      create: "",
      update: "",
      remove: "",
    },
    tasks: {
      read: "",
      create: "",
      update: "",
      remove: "",
    },
  },
  {
    admin: {
      all: true,
    },
    taskManager: {
      tasks: true,
    },
    user: {
      tasks: {
        read: true,
      },
    },
  }
);
```

## Check Permissions

Use the `can` method to check if a role has a specific permission:

```ts
const canReadTasks = authorize.can("user", "tasks.read"); // true
const canCreateTasks = authorize.can("user", "tasks.create"); // false
```

## Sort Roles

You can sort roles in ascending or descending order:

```ts
const sortedRolesAsc = authorize.sort(["admin", "user", "taskManager"], "asc");
console.log(sortedRolesAsc); // ['user', 'taskManager', 'admin']

const sortedRolesDesc = authorize.sort(
  ["admin", "user", "taskManager"],
  "desc"
);
console.log(sortedRolesDesc); // ['admin', 'taskManager', 'user']
```

## Compare Roles

Use the `compare` method to compare the hierarchy of two roles:

```ts
const comparisonResult = authorize.compare("taskManager", "user");
console.log(comparisonResult); // 1 (taskManager > user)
```

## Get Role Position

Get the position of a role in the hierarchy:

```ts
const rolePosition = authorize.getPosition("taskManager");
console.log(rolePosition); // 2
```

## License

[MIT License](/LICENSE.md)
