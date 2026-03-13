# Active Context: HR On/Offboarding App

## Current State

**App Status**: ✅ Employee onboarding/offboarding app operational

The app is a fully functional HR tool for managing employee onboarding and offboarding processes with task checklists.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Database setup with simple in-memory database (development)
- [x] Employee schema (employees, onboarding_tasks, offboarding_tasks)
- [x] Dashboard page with employee overview
- [x] New employee form with auto-created onboarding tasks
- [x] Employee detail page with task management
- [x] Onboarding/offboarding workflow
- [x] Build and deployment fixes

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Dashboard with employee list | ✅ Done |
| `src/app/employees/new/page.tsx` | Add new employee form | ✅ Done |
| `src/app/employees/[id]/page.tsx` | Employee details & tasks | ✅ Done |
| `src/app/employees/[id]/actions.ts` | Server actions | ✅ Done |
| `src/db/schema.ts` | Database schema | ✅ Done |
| `src/db/index.ts` | Database client | ✅ Done |

## Features

- **Dashboard**: View all employees with status (active/onboarding/offboarding)
- **Onboarding**: Add new employees with 10 default onboarding tasks
- **Task Management**: Check off tasks as completed
- **Complete Onboarding**: Mark all tasks done to set employee to active
- **Offboarding**: Start offboarding process for active employees with 10 default tasks

## Database Schema

- `employees`: id, name, email, department, position, startDate, endDate, status, createdAt
- `onboarding_tasks`: id, employeeId, taskName, completed, completedAt
- `offboarding_tasks`: id, employeeId, taskName, completed, completedAt
