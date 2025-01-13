# Frontend Code Challenge

The task of this code challenge is to add the functionality described below to this existing sample application: [https://github.com/dfds-frontend/frontend-dev-challenge](https://github.com/dfds-frontend/frontend-dev-challenge). Clone this project to get started.

The application is built using NextJS, TypeScript, Prisma, React Query, Tailwind, Zod, and [https://ui.shadcn.com/](https://ui.shadcn.com/) for ready-made components. It is expected that you will complete the tasks below using these technologies.

The challenge consists of various frontend tasks. Tailor your implementation as closely as possible to the description provided, and document any deviations.

### How to Start the Project

- Copy `.env.example` to `.env`
- Run `yarn db:reset`, `npm run db:reset`, or `pnpm db:reset`
- Start the project with `yarn dev`, `npm run dev`, or `pnpm dev`

The Swagger documentation for the Mock API is available at:
[http://localhost:3000/api-doc](http://localhost:3000/api-doc)

---

## Task 1 - Move to App Router

Refactor the existing Next.js page router to the new app router. The REST API used in the project should not be modified and should be treated as if it were external. Ensure the transition maintains all current functionality and adheres to Next.js best practices.

---

## Task 2 - Create New Voyage

At the root of the application, place a "Create" button on the top left of the list of mock voyages. When pressed, the button should open a [Sheet component](https://ui.shadcn.com/docs/components/sheet) with the form for creating a voyage inside. The form should have the following validations:

- All fields are required.
- Departure date and time should be before arrival date and time.

Refresh the list of voyages once a voyage has been successfully created. Display a [Toast component](https://ui.shadcn.com/docs/components/toast) with a success message.

### Form Implementation Options

You could use:

- **The new `useActionState`**: A state management feature suited for handling async actions like form submissions.
- **Zod and React Hook Form**: Leverage [Zod](https://github.com/colinhacks/zod) and [React Hook Form](https://react-hook-form.com/) for form validation and management.

Choose the approach that best fits the project structure and your way of working.

---

## Task 3 - Introduce UnitType Relation to Voyage

Enable adding at least 5 UnitTypes to a voyage. Ensure the selection of a minimum of 5 UnitTypes.

---

## Task 4 - Modify the List

Add a "unittypes" column to the voyages table. Display the unit type count for each voyage. Clicking on the unit type count opens a PopOver showing the selected UnitTypes using the [Popover component](https://ui.shadcn.com/docs/components/popover). The list should include:

- Name
- Default length

---

## Task 5 - Handling Voyage Deletion Error

Add error handling to inform the user when deleting a voyage fails. Display a [Toast component](https://ui.shadcn.com/docs/components/toast) with the appropriate error message.
