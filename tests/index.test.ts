import { Authorize } from "../src";

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

test("Block access to creating tasks for a user.", () => {
  const authorized = authorize.can("user", "tasks.create");
  expect(authorized).toBe(false);
});

test("Allow access to reading tasks for a user.", () => {
  const authorized = authorize.can("user", "tasks.read");
  expect(authorized).toBe(true);
});

test("Allow access to reading tasks for a taskManager.", () => {
  const authorized = authorize.can("taskManager", "tasks.read");
  expect(authorized).toBe(true);
});

test("Allow access to creating tasks for a taskManager.", () => {
  const authorized = authorize.can("taskManager", "tasks.create");
  expect(authorized).toBe(true);
});

test("Allow access to creating tasks for an admin.", () => {
  const authorized = authorize.can("admin", "tasks.create");
  expect(authorized).toBe(true);
});

test("Sort roles asc.", () => {
  const roles = authorize.sort(["admin", "user", "taskManager"], "asc");
  expect(roles[0]).toBe("user");
});

test("Sort roles desc.", () => {
  const roles = authorize.sort(["admin", "user", "taskManager"], "desc");
  expect(roles[0]).toBe("admin");
});

test("Get role position.", () => {
  const rolePosition = authorize.getPosition("taskManager");
  expect(rolePosition).toBe(2);
});

test("Compare roles position.", () => {
  const result = authorize.compare("taskManager", "user");
  expect(result).toBe(1);
});
